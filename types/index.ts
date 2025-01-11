// Define the type for a message
export type Message = {
	id: string;
	text: string;
	isUser: boolean;
	createdAt: Date; // Date object
};
