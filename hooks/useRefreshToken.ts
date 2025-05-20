"use client";

import { apiRoutes, apiVersion } from "@/constants/api";
import axios from "axios";
import { useStorage } from "./useStorage";
import { IRefreshTokenResponse } from "@/types/auth/responses";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { tokenService } from "./tokenService";

export const useRefreshToken = () => {
	const { getCookie, saveCookie } = useStorage();
	// const [refreshToken, setRefreshToken] = useState<string | null>(null);

	// // Function to fetch token from SecureStore
	// const getValueFor = async (key: string) => {
	// 	let result = await SecureStore.getItemAsync(key);
	// 	return result || null; // Return null if nothing is stored
	// };

	// // Fetch token on mount
	// useEffect(() => {
	// 	const fetchToken = async () => {
	// 		const storedToken = await getValueFor("refreshToken");

	// 		if (storedToken) {
	// 			setRefreshToken(storedToken);
	// 		} else {
	// 			console.warn("No token found in SecureStore");
	// 			setRefreshToken(null); // Optional: explicitly set null if no token
	// 		}
	// 	};
	// 	fetchToken();
	// }, []);

	const handleRefreshToken = async (): Promise<string> => {
		const refreshToken = tokenService.getRefreshToken();
		console.log(refreshToken);
		if (!refreshToken) {
			throw new Error("No refresh token found");
		}

		try {
			const { data } = await axios.post<any>(
				`${process.env.EXPO_PUBLIC_API_URL}${apiVersion}${apiRoutes.auth.refreshToken}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${refreshToken}`,
					},
				}
			);

			console.log("data", data);

			tokenService.setToken(data.token);
			// Optionally update refreshToken too if your API sends a new one:
			if (data.refreshToken) {
				tokenService.setRefreshToken(data.refreshToken);
				await SecureStore.setItemAsync("refreshToken", data.refreshToken);
			}

			await SecureStore.setItemAsync("token", data.token);

			return data.token;
		} catch (error: any) {
			// handle error logging same as before
			throw error;
		}
	};

	return { handleRefreshToken };
};
