import { axiosAuth } from "@/libs/axios";
import { tokenService } from "./tokenService";
import { useRefreshToken } from "./useRefreshToken";
import { useStorage } from "./useStorage";
import { router, usePathname } from "expo-router";
import { routes } from "@/constants/routing";
import React from "react";

const useAxiosAuth = () => {
	const { deleteCookie } = useStorage();
	const { handleRefreshToken } = useRefreshToken();
	const pathname = usePathname();

	// Setup interceptors once immediately
	React.useEffect(() => {
		const requestIntercept = axiosAuth.interceptors.request.use(
			(config) => {
				const token = tokenService.getToken();
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

				if (error?.response?.status === 401 && !prevRequest?.sent) {
					prevRequest.sent = true;
					try {
						// console.log("test");
						await handleRefreshToken();
						// console.log(tokenService.getToken());
						prevRequest.headers[
							"Authorization"
						] = `Bearer ${tokenService.getToken()}`;
						return axiosAuth(prevRequest);
					} catch (refreshError) {
						if (pathname === `/${routes.signin}`) {
							deleteCookie("token");
							deleteCookie("refreshToken");
							router.push("/signin");
						}
						return Promise.reject(refreshError);
					}
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosAuth.interceptors.request.eject(requestIntercept);
			axiosAuth.interceptors.response.eject(responseIntercept);
		};
	}, []);

	return axiosAuth;
};

export default useAxiosAuth;
