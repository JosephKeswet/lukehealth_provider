import axios from "axios";

export default axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
		// "Access-Control-Allow-Origin": "*",
		// "Access-Control-Allow-Methods": "POST",
		// "Access-Control-Allow-Headers": "Content-Type, Authorization",
	},
});
export const axiosAuth = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
		// "Access-Control-Allow-Origin": "*",
		// "Access-Control-Allow-Methods": "POST",
		// "Access-Control-Allow-Headers": "Content-Type, Authorization",
	},
});
