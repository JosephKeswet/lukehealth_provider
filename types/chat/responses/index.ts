import { BaseResponse } from "@/types";

export interface IChatHistoriesResponse extends BaseResponse {
	data: {
		histories: ChatHistory[];
	};
}

export interface ChatHistory {
	partner: {
		id: string;
		firstName: string;
		lastName: string;
		fullName: string;
		email: string;
	};
	lastMessage: {
		id: string;
		seen: boolean | null;
		message: string;
		createdAt: string; // or `Date` if you parse it
	};
}

export interface IChatMessagesResponse extends BaseResponse {
	data: IChatMessage[];
}

export interface IChatMessage {
	id: string;
	userId: string;
	recipientId: string;
	message: string;
	seen: boolean | null;
	isMutableUntil: string; // ISO date string
	fileUrl: string | null;
	createdAt: string; // ISO date string
	deletedAt: string | null;
	updatedAt: string | null;
}

export interface IJoinRoomResponse extends BaseResponse {
	data: {
		roomId: string;
	};
}

export interface ISendChatResponse extends BaseResponse {}
