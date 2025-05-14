import { ResponseState } from "@/constants/enums";

// Define the type for a message
export type Message = {
	id: string;
	text: string;
	isUser: boolean;
	createdAt: Date; // Date object
};

export interface BaseResponse {
	state: ResponseState;
	status: number;
	message: string;
	token?: string;
	refreshToken?: string;
}
