import { useStorage } from "../useStorage";

import { MutationAdapter } from "@/frameworks/adapters/mutationAdapter";
import { ResponseState } from "@/constants/enums";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import { Alert } from "react-native";
import { apiRoutes } from "@/constants/api";
import { IPatient } from "@/types/patient/payload";
import { router } from "expo-router";

export default function usePatient(mutationAdapter: MutationAdapter<any, any>) {
	const { saveCookie } = useStorage();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const handleAddPatientFailed = ({ message }: any) => {
		if (message === "A user with this email or full name already exists.") {
			Alert.alert(
				"Duplicate User",
				message,
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Go Back",
						onPress: () => router.push("/(tabs)"),
						style: "default",
					},
				],
				{ cancelable: true }
			);
		} else {
			toast({
				type: "error",
				text1: message,
			});
		}
	};

	const handleAddPatientSuccess = ({ message }: any) => {
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		router.push(`/(tabs)`);
	};

	const onboardNewPatient = async (args: IPatient) => {
		Alert.alert(
			"Add patient",
			"Are you sure you want to onboard this patient?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Confirm",
					onPress: async () => {
						const response = await mutationAdapter.mutate(args);
						if (response.state === ResponseState.Success) {
							handleAddPatientSuccess(response);
						} else {
							handleAddPatientFailed(response);
						}
					},
					style: "destructive",
				},
			],
			{ cancelable: true }
		);
	};

	return { onboardNewPatient };
}
