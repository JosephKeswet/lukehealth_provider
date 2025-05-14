import { BaseResponse } from "@/types";

export interface Notification {
	id: string;
	userId: string;
	title: string;
	message: string;
	isRead: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

export interface IGetAllNotifications extends BaseResponse {
	data: Notification[];
}
