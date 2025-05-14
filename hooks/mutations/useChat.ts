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
import { IJoinRoomResponse, ISendChatResponse } from "@/types/chat/responses";
import { IJoinRoom, ISendChat } from "@/types/chat/payload";

export default function useChat(mutationAdapter: MutationAdapter<any, any>) {
	const { saveCookie } = useStorage();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const handleJoinRoomFailed = ({ message }: IJoinRoomResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};
	const handleJoinRoomSuccess = (
		{ message }: IJoinRoomResponse,
		recipientId: string,
		recipientFullName: string
	) => {
		saveCookie("recipientFullName", recipientFullName);
		// toast({
		// 	type: "success", // or 'error' or 'delete'
		// 	text1: message,
		// });
		router.push(`/chat/${recipientId}`);
	};
	const joinChatRoom = async (args: IJoinRoom, recipientFullName: string) => {
		const response = await mutationAdapter.mutate(args);

		if (response.state === ResponseState.Success) {
			handleJoinRoomSuccess(response, args.recipientId, recipientFullName);
		} else {
			handleJoinRoomFailed(response);
		}
	};

	const handleSendMessageFailed = ({ message }: ISendChatResponse) => {
		toast({
			type: "error", // or 'error' or 'delete'
			text1: message,
		});
	};
	const handleSendMessageSuccess = ({ message }: ISendChatResponse) => {
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.chat.getChatMessages],
		});
		toast({
			type: "success", // or 'error' or 'delete'
			text1: message,
		});
	};
	const sendMessage = async (args: ISendChat) => {
		const response = await mutationAdapter.mutate(args);

		if (response.state === ResponseState.Success) {
			handleSendMessageSuccess(response);
		} else {
			handleSendMessageFailed(response);
		}
	};

	return {
		joinChatRoom,
		sendMessage,
	};
}
