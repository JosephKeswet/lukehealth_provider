"use client";

import { apiRoutes, apiVersion } from "@/constants/api";
import { routes } from "@/constants/routing";
import axios from "axios";
import Cookies from "js-cookie";
import { useStorage } from "./useStorage";
import { IRefreshTokenResponse } from "@/types/auth/responses";

export const useRefreshToken = () => {
	const { getCookie, saveCookie } = useStorage();
	const refreshToken = getCookie("refreshToken");
	async function handleRefreshToken(): Promise<IRefreshTokenResponse> {
		try {
			const { data } = await axios.post<IRefreshTokenResponse>(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.refreshToken}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${refreshToken}`,
					},
				}
			);
			console.log("refresh", data);
			saveCookie("token", data.token); // Update token cookie with new token
			saveCookie("refreshToken", data.refreshToken); // Update refresh token cookie with new refresh token
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
	}

	handleRefreshToken();

	return {
		handleRefreshToken,
	};
};
