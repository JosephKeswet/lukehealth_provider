import { useEffect, useState } from "react";
import { routes } from "@/constants/routing";
import { axiosAuth } from "@/libs/axios";
import { useStorage } from "./useStorage";
import { useRefreshToken } from "./useRefreshToken";
import { router, usePathname } from "expo-router";
import * as SecureStore from "expo-secure-store";

const useAxiosAuth = () => {
	const { deleteCookie } = useStorage();
	const [token, setToken] = useState<string | null>(null);
	const [isTokenLoaded, setIsTokenLoaded] = useState(false); // Track token loading state
	const { handleRefreshToken } = useRefreshToken();
	const pathname = usePathname();

	// Function to fetch token from SecureStore
	const getValueFor = async (key: string) => {
		let result = await SecureStore.getItemAsync(key);
		return result || null; // Return null if nothing is stored
	};

	// Fetch token on mount
	useEffect(() => {
		const fetchToken = async () => {
			const storedToken = await getValueFor("token");
			setToken(storedToken);
			setIsTokenLoaded(true); // Mark token as loaded
		};
		fetchToken();
	}, []);

	// Apply Axios interceptors only after token is loaded
	useEffect(() => {
		if (!isTokenLoaded) return; // Don't set interceptors until token is ready

		const requestIntercept = axiosAuth.interceptors.request.use(
			(config) => {
				if (token) {
					config.headers["Authorization"] = `Bearer ${token}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axiosAuth.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;

				// Retry only once
				if (error?.response?.status === 401 && !prevRequest?.sent) {
					prevRequest.sent = true;
					try {
						const { token: newToken } = await handleRefreshToken();
						setToken(newToken); // Update token state
						prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
						return axiosAuth(prevRequest);
					} catch (refreshError) {
						if (pathname === `/${routes.signin}`) {
							console.error("Failed to refresh token:", refreshError);
							deleteCookie("token");
							deleteCookie("refreshToken");
							router.push("/signin");
							return Promise.reject(refreshError);
						} else {
							return axiosAuth(prevRequest);
						}
					}
				}
				return Promise.reject(error);
			}
		);

		// Cleanup interceptors on unmount
		return () => {
			axiosAuth.interceptors.request.eject(requestIntercept);
			axiosAuth.interceptors.response.eject(responseIntercept);
		};
	}, [token, isTokenLoaded]);

	return axiosAuth;
};

export default useAxiosAuth;
