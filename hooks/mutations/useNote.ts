import { useStorage } from "../useStorage";

import { MutationAdapter } from "@/frameworks/adapters/mutationAdapter";
import { ResponseState } from "@/constants/enums";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../useToast";
import { Alert } from "react-native";
import { apiRoutes } from "@/constants/api";
import { IPatient } from "@/types/patient/payload";
import { router } from "expo-router";
import { ICreateNote } from "@/types/notes/payload";
import { useNoteStore } from "@/store/useNoteStore";

export default function useNote(mutationAdapter: MutationAdapter<any, any>) {
	const { saveCookie } = useStorage();
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { resetNote } = useNoteStore();

	const handleNoteFailed = ({ message }: any) => {
		toast({
			type: "error",
			text1: message,
		});
	};

	const handleNoteSuccess = ({ message }: any) => {
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
		resetNote();
		router.push(`/notes`);
	};

	const addNote = async (args: ICreateNote) => {
		Alert.alert(
			"Create note",
			"",
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
							handleNoteSuccess(response);
						} else {
							handleNoteFailed(response);
						}
					},
					style: "destructive",
				},
			],
			{ cancelable: true }
		);
	};

	return { addNote };
}
