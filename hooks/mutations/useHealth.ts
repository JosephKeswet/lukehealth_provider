import { MutationAdapter } from "@/frameworks/adapters/mutationAdapter";
import { useStorage } from "../useStorage";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import { IHealthInfoResponse } from "@/types/health/responses";
import { router } from "expo-router";
import { IHealthInfo, IUpdateHealthInfo } from "@/types/health/payload";
import { ResponseState } from "@/constants/enums";
import { IUpdateHealthlInfoResponse } from "@/types/user/responses";
import { queryKeys } from "@/constants/queryKeys";
import { apiRoutes } from "@/constants/api";

export default function useHealth(mutationAdapter: MutationAdapter<any, any>) {
	const { saveCookie } = useStorage();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const handleHealthInfoFailed = ({ message }: IHealthInfoResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};
	const handleHealthInfoSuccess = ({ message }: IHealthInfoResponse) => {
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		router.push("/(tabs)");
	};
	const onboardHealthInfo = async (args: IHealthInfo) => {
		const sanitizedArgs = {
			...args,
			allergies: args.allergies.filter((allergy) => allergy.trim() !== ""), // Remove empty strings
		};

		const response = await mutationAdapter.mutate(sanitizedArgs);

		if (response.state === ResponseState.Success) {
			handleHealthInfoSuccess(response);
		} else {
			handleHealthInfoFailed(response);
		}
	};

	const handleUpdateHealthFailed = ({
		message,
	}: IUpdateHealthlInfoResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};
	const handleUpdateHealthSuccess = ({
		message,
	}: IUpdateHealthlInfoResponse) => {
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.user.getAuthUser],
		});
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.health.healthData],
		});
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		setTimeout(() => {
			router.push("/health-data");
		}, 1000);
	};
	const updateUserHealthInfo = async (args: IUpdateHealthInfo) => {
		const sanitizedArgs = {
			...args,
			// allergies: args.allergies
			// 	?.filter(allergy => typeof allergy === "string" && allergy.trim() !== "")
			// 	.map(allergy => allergy.toLowerCase()), // Remove empty strings and convert to lowercase

			lifestyleConditions: args.lifestyleConditions
				?.filter(
					(condition) =>
						typeof condition === "string" && condition.trim() !== ""
				)
				.map((condition) => condition.toLowerCase()), // Convert to lowercase
		};
		const response = await mutationAdapter.mutate(sanitizedArgs);

		if (response.state === ResponseState.Success) {
			handleUpdateHealthSuccess(response);
		} else {
			handleUpdateHealthFailed(response);
		}
	};

	return { onboardHealthInfo, updateUserHealthInfo };
}
