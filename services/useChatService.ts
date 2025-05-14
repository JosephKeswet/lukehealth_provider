import { apiRoutes, apiVersion } from "@/constants/api";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { BaseResponse } from "@/types";
import {
	IJoinRoom,
	IRetrieveChatMessages,
	ISendChat,
} from "@/types/chat/payload";
import {
	IChatHistoriesResponse,
	IChatMessagesResponse,
	IJoinRoomResponse,
	ISendChatResponse,
} from "@/types/chat/responses";
import axios from "axios";

export default function useChatService() {
	const axiosAuth = useAxiosAuth();

	const getChatHistories = async (): Promise<IChatHistoriesResponse> => {
		try {
			const { data } = await axiosAuth.get(
				`${apiVersion}${apiRoutes.chat.getChatHistories}`
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			// Handle other errors
			console.error("Error:", error.message);
			throw error;
		}
	};

	const getChatMessages = async (
		payload: IRetrieveChatMessages
	): Promise<IChatMessagesResponse> => {
		const { recipientId } = payload;

		try {
			const { data } = await axiosAuth.get(
				`${apiVersion}${apiRoutes.chat.getChatMessages}?recipientId=${recipientId}`
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			// Handle other errors
			console.error("Error:", error.message);
			throw error;
		}
	};

	const joinRoom = async (payload: IJoinRoom): Promise<IJoinRoomResponse> => {
		try {
			const { data } = await axiosAuth.post(
				`${apiVersion}${apiRoutes.chat.joinRoom}`,
				payload
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			// Handle other errors
			console.error("Error:", error.message);
			throw error;
		}
	};

	const sendChat = async (payload: ISendChat): Promise<ISendChatResponse> => {
		try {
			const { data } = await axiosAuth.post(
				`${apiVersion}${apiRoutes.chat.sendChat}`,
				payload
			);
			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			// Handle other errors
			console.error("Error:", error.message);
			throw error;
		}
	};
	return {
		getChatHistories,
		getChatMessages,
		joinRoom,
		sendChat,
	};
}
