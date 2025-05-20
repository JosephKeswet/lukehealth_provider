import { apiRoutes, apiVersion } from "@/constants/api";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { IVerifyEmail } from "@/types/auth/payload";
import { IVerifyEmailResponse } from "@/types/auth/responses";
import { IUpdateHealthInfo } from "@/types/health/payload";
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

export default function useUserService() {
	const axiosAuth = useAxiosAuth();
	const verifyEmail = async (
		payload: IVerifyEmail
	): Promise<IVerifyEmailResponse> => {
		try {
			const { data } = await axiosAuth.post(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.verifyEmail}`,
				payload
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

	const getAuthUser = async (): Promise<any> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.user.getAuthUser}`
			);
			return data;
		} catch (error: any) {
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

	const getProfileInfo = async (): Promise<IGetProfileResponse> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${apiVersion}${apiRoutes.user.getUserInfo}`
			);
			return data;
		} catch (error: any) {
			console.error("Error:", error.message);
			throw error;
		}
	};

	const getProfileData = async (): Promise<IGetProfileDataResponse> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${apiVersion}${apiRoutes.user.profileData}`
			);
			return data;
		} catch (error: any) {
			console.error("Error:", error.message);
			throw error;
		}
	};

	const getHealthData = async (): Promise<IGetHealthDataResponse> => {
		// if (checkAuthRoutes(pathname)) {
		//   return;
		// }

		try {
			const { data } = await axiosAuth.get(
				`${apiVersion}${apiRoutes.health.healthData}`
			);
			return data;
		} catch (error: any) {
			console.error("Error:", error.message);
			throw error;
		}
	};

	const updateHealthInfo = async (
		payload: IUpdateHealthInfo
	): Promise<IUpdateHealthlInfoResponse> => {
		try {
			const { data } = await axiosAuth.patch(
				`${apiVersion}${apiRoutes.health.updateHealthInfo}`,
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

	const changePassword = async (payload: IUpdatePassword): Promise<any> => {
		try {
			const { data } = await axiosAuth.patch(
				`${apiVersion}${apiRoutes.user.changePassword}`,
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

	const toggleNotifications = async (
		payload: IToggleNotifications
	): Promise<any> => {
		try {
			const { data } = await axiosAuth.patch(
				`${apiVersion}${apiRoutes.user.toggleNotifications}`,
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

	const updateProfileInfo = async (
		payload: IUpdatePersonalInfo
	): Promise<IUpdatePersonalInfoResponse> => {
		try {
			const { data } = await axiosAuth.patch(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.user.updatePersonalInfo}`,
				payload
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
		updateHealthInfo,
		changePassword,
		toggleNotifications,
		getProfileInfo,
		getProfileData,
		getHealthData,
		verifyEmail,
		updateProfileInfo,
		getAuthUser,
	};
}
