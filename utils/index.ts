import { Message } from "@/types";

export const formatDate = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: "short", // Mon
		month: "short", // Apr
		day: "numeric", // 3
	};
	// return date.toLocaleDateString("en-US", options).toUpperCase();
};
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
