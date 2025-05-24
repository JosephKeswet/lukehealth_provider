import { tokenService } from "@/hooks/tokenService";
import { Message } from "@/types";
import * as SecureStore from "expo-secure-store";

export const formatDate = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: "short", // Mon
		month: "short", // Apr
		day: "numeric", // 3
	};
	return date.toLocaleDateString("en-US", options).toUpperCase();
};

export function formatIsoDateString(isoDateString: string): string {
	const date = new Date(isoDateString);
	if (isNaN(date.getTime())) {
		return "Invalid Date"; // fallback for invalid dates
	}

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	return date.toLocaleDateString(undefined, options);
}

// export const groupMessagesByDate = (messages: Message[]) => {
// 	const groups: { [key: string]: Message[] } = {};

// 	messages.forEach((message) => {
// 		const date = formatDate(new Date(message.createdAt).toDateString());
// 		if (!groups[date]) {
// 			groups[date] = [];
// 		}
// 		groups[date].push(message);
// 	});

// 	return Object.entries(groups);
// };

export const formatTime = (date: Date) => {
	// Format as "11:37AM"
	return date
		.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		})
		.toUpperCase();
};

export async function initializeTokens() {
	const refreshToken = await SecureStore.getItemAsync("refreshToken");
	if (refreshToken) {
		tokenService.setRefreshToken(refreshToken); // add this method to tokenService
	}

	const accessToken = await SecureStore.getItemAsync("token");
	if (accessToken) {
		tokenService.setToken(accessToken);
	}
}
