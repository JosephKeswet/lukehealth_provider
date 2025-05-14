import { MutationAdapter } from "@/frameworks/adapters/mutationAdapter";
import { useStorage } from "../useStorage";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import { IHealthInfoResponse } from "@/types/health/responses";
import { router } from "expo-router";
import {
	IHealthInfo,
	ILogVitals,
	IUpdateHealthInfo,
} from "@/types/health/payload";
import { ResponseState } from "@/constants/enums";
import { IUpdateHealthlInfoResponse } from "@/types/user/responses";
import { queryKeys } from "@/constants/queryKeys";
import { apiRoutes } from "@/constants/api";
import { BaseResponse } from "@/types";

export default function useLogVital(
	mutationAdapter: MutationAdapter<any, any>
) {
	const { saveCookie } = useStorage();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const handleLogVitalFailed = ({ message }: BaseResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};
	const handleLogVitalSuccess = ({ message }: BaseResponse) => {
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.medication.get_vitals],
		});
		router.push("/log-vital-history");
	};
	const handleLogVital = async (args: ILogVitals) => {
		const response = await mutationAdapter.mutate(args);

		if (response.state === ResponseState.Success) {
			handleLogVitalSuccess(response);
		} else {
			handleLogVitalFailed(response);
		}
	};

	return {
		handleLogVital,
	};
}
