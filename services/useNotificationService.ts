import { apiRoutes, apiVersion } from "@/constants/api";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { BaseResponse } from "@/types";
import { IVerifyEmail } from "@/types/auth/payload";
import { IVerifyEmailResponse } from "@/types/auth/responses";
import { IUpdateHealthInfo } from "@/types/health/payload";
import { IGetAllNotifications } from "@/types/notifications/responses";
import {
	IToggleNotifications,
	IUpdatePassword,
	IUpdatePersonalInfo,
} from "@/types/user/payload";
import {
	IGetAuthUser,
	IGetHealthDataResponse,
	IGetProfileDataResponse,
	IGetProfileResponse,
	IUpdateHealthlInfoResponse,
	IUpdatePersonalInfoResponse,
} from "@/types/user/responses";
import axios from "axios";

export default function useNotificationService() {
	const axiosAuth = useAxiosAuth();

	const getAllNotifications = async (): Promise<IGetAllNotifications> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${apiVersion}${apiRoutes.notifications.getAllNotifications}`
			);
			return data;
		} catch (error: any) {
			console.log(error);
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};

	const getUnreadNotifications = async (): Promise<IGetAllNotifications> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${apiVersion}${apiRoutes.notifications.getUnreadNotifications}`
			);
			return data;
		} catch (error: any) {
			console.log(error);
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};

	const markAsRead = async (notificationId: string): Promise<BaseResponse> => {
		try {
			const { data } = await axiosAuth.patch(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.notifications.markAsRead}/${notificationId}`,
				{}
			);

			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					const errorMessage = axiosError?.response?.data?.message;
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};

	const markAllAsRead = async (): Promise<BaseResponse> => {
		try {
			const { data } = await axiosAuth.post(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.notifications.markAllAsRead}`,
				{}
			);

			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					const errorMessage = axiosError?.response?.data?.message;
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};

	const addFirebaseToken = async (
		firebaseToken: string
	): Promise<BaseResponse> => {
		try {
			const { data } = await axiosAuth.post(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.notifications.add_push_token}`,
				{
					firebaseToken,
				}
			);
			console.log(data);

			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					const errorMessage = axiosError?.response?.data?.message;
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};

	const addExpoToken = async (expoToken: string): Promise<BaseResponse> => {
		try {
			const { data } = await axiosAuth.post(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.notifications.add_expo_token}`,
				{
					expoToken,
				}
			);

			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const axiosError = error;
				if (axiosError.response) {
					const errorMessage = axiosError?.response?.data?.message;
					return axiosError?.response?.data;
				}
			}
			console.error("Error:", error.message);
			throw error;
		}
	};
	return {
		getAllNotifications,
		getUnreadNotifications,
		markAllAsRead,
		markAsRead,
		addFirebaseToken,
		addExpoToken,
	};
}
