import { apiRoutes, apiVersion } from "@/constants/api";
import { BaseResponse } from "@/types";
import {
	IAddPassword,
	IForgotPassword,
	IResetPasssword,
	IResetPassVerify,
	ISignIn,
	ISignUp,
	IVerifyEmail,
} from "@/types/auth/payload";
import {
	IAddPasswordResponse,
	IForgotPasswordResponse,
	IResendOtpResponse,
	IResetPassVerifyResponse,
	ISignInResponse,
	ISignUpResponse,
	IVerifyEmailResponse,
} from "@/types/auth/responses";
import { IUpdatePassword } from "@/types/user/payload";
import { IChangePasswordResponse } from "@/types/user/responses";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const signUp = async (payload: ISignUp): Promise<ISignInResponse> => {
	try {
		const { data } = await axios.post(
			`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.signup}`,
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

// export const googleAuthSignUp = async (payload: {
// 	token: string;
// }): Promise<ISignUpResponse> => {
// 	try {
// 		const { data } = await axios.post(
// 			`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.google_auth}`,
// 			payload
// 		);

// 		return data;
// 	} catch (error: any) {
// 		if (axios.isAxiosError(error)) {
// 			const axiosError = error;
// 			if (axiosError.response) {
// 				const errorMessage = axiosError?.response?.data?.message;
// 				return axiosError?.response?.data;
// 			}
// 		}
// 		console.error("Error:", error.message);
// 		throw error;
// 	}
// };

export const verifyEmail = async (
	payload: IVerifyEmail
): Promise<IVerifyEmailResponse> => {
	try {
		const token = await SecureStore.getItemAsync("token");

		const { data } = await axios.post(
			`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.verifyEmail}`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
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

export const resetPasswordVerification = async (
	payload: IResetPassVerify
): Promise<IResetPassVerifyResponse> => {
	try {
		const token = await SecureStore.getItemAsync("token");

		const { data } = await axios.post(
			`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.reset_pass_verify}`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
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
export const addPassword = async (
	payload: IAddPassword
): Promise<IAddPasswordResponse> => {
	try {
		const token = await SecureStore.getItemAsync("token");

		const { data } = await axios.post(
			`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.add_password}`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
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

export const signIn = async (payload: ISignIn): Promise<ISignInResponse> => {
	try {
		const { data } = await axios.post(
			`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.login}`,
			payload
		);
		console.log("service", data);

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

export const resendOtp = async (): Promise<IResendOtpResponse> => {
	try {
		const token = await SecureStore.getItemAsync("token");

		const { data } = await axios.get(
			`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.resend_otp}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
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

export const changePassword = async (
	payload: IUpdatePassword
): Promise<IChangePasswordResponse> => {
	try {
		const token = await SecureStore.getItemAsync("token");
		const { data } = await axios.patch(
			`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.user.changePassword}`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
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

export const forgotPassword = async (
	payload: IForgotPassword
): Promise<IForgotPasswordResponse> => {
	try {
		const { data } = await axios.get(
			`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.request_password_reset}?email=${payload.email}`
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

export const resetPassword = async (
	payload: IResetPasssword
): Promise<BaseResponse> => {
	try {
		const token = await SecureStore.getItemAsync("token");

		const { data } = await axios.post(
			`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.reset_password}`,
			payload,

			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
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
