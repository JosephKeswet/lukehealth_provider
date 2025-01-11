import React, { useRef, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	SafeAreaView,
	Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SendMessageIcon } from "@/constants/icons";
import ChatHeader from "@/features/chat/ChatHeader";
import { Message } from "@/types";
import { formatTime } from "@/utils";

const ChatScreen = () => {
	const { height } = Dimensions.get("screen");

	// Pre-filled chat messages
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			text: "Hey! How are you doing?",
			isUser: false,
			createdAt: new Date("2025-01-05T10:00:00Z"),
		},
		{
			id: "2",
			text: "I’m good, how about you?",
			isUser: true,
			createdAt: new Date("2025-01-05T10:01:00Z"),
		},
		{
			id: "3",
			text: "Doing well, thanks! What’s up?",
			isUser: false,
			createdAt: new Date("2025-01-05T10:02:00Z"),
		},
		{
			id: "4",
			text: "Not much, just working on a project.",
			isUser: true,
			createdAt: new Date("2025-01-05T10:03:00Z"),
		},
		{
			id: "5",
			text: "Sounds interesting! Need any help?",
			isUser: false,
			createdAt: new Date("2025-01-05T10:05:00Z"),
		},
	]);

	const [input, setInput] = useState("");
	const flatListRef = useRef<FlatList>(null); // Ref for FlatList

	// Scroll to the end when a new message is added
	useEffect(() => {
		if (flatListRef.current) {
			flatListRef.current.scrollToEnd({ animated: true });
		}
	}, [messages]);

	// Function to send a message
	const handleSend = () => {
		if (input.trim() === "") return;

		setMessages((prevMessages) => [
			...prevMessages,
			{
				id: Date.now().toString(),
				text: input,
				isUser: true,
				createdAt: new Date(), // Add the current timestamp
			},
		]);
		setInput("");
	};

	const groupMessagesByDate = (messages: Message[]) => {
		const groups: { [key: string]: Message[] } = {};

		messages.forEach((message) => {
			const date = new Date(message.createdAt).toDateString(); // Group by date (e.g., "Mon Jan 01 2025")
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(message);
		});

		return Object.entries(groups); // Returns an array of [date, messages[]]
	};

	const groupedMessages = groupMessagesByDate(messages); // Grouped by date
	const flatMessages = groupedMessages.flatMap(([date, msgs]) => [
		{ type: "date", date }, // Section header for date
		...msgs.map((msg) => ({ type: "message", ...msg })), // Individual messages
	]);

	const renderItem = ({ item }: { item: any }) => {
		if (item.type === "date") {
			return (
				<View style={styles.dateContainer}>
					<Text style={styles.dateText}>
						{item.date}
						{formatTime(new Date(item.date))}
					</Text>
				</View>
			);
		}

		// Render regular message
		return (
			<View
				style={[
					styles.messageBubble,
					item.isUser ? styles.userMessage : styles.receivedMessage,
				]}
			>
				<ThemedText
					style={[styles.messageText, item.isUser && styles.userText]}
				>
					{item.text}
				</ThemedText>
			</View>
		);
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				height,
			}}
		>
			<View style={styles.container}>
				<View>
					<ChatHeader name="Dr Ama" />
				</View>
				{/* Chat Messages */}
				<FlatList
					ref={flatListRef} // Attach ref to FlatList
					data={flatMessages}
					renderItem={renderItem}
					keyExtractor={(item: any) =>
						item.type === "date" ? item.date : item.id.toString()
					}
					contentContainerStyle={styles.messagesContainer}
					onContentSizeChange={() =>
						flatListRef.current?.scrollToEnd({ animated: true })
					}
				/>

				{/* Input Box */}
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Write your message here..."
						value={input}
						onChangeText={setInput}
					/>
					<TouchableOpacity
						style={styles.sendButton}
						onPress={handleSend}
					>
						<SendMessageIcon />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FAFAFA", // Light gray background
	},
	messagesContainer: {
		flexGrow: 1,
		justifyContent: "flex-start",
		paddingHorizontal: 10,
		// paddingBottom: 10,
	},
	messageBubble: {
		maxWidth: "75%",
		padding: 12,
		borderRadius: 6,
		marginBottom: 10,
		borderColor: "#E8E8E8",
		borderWidth: 1,
	},
	userMessage: {
		backgroundColor: "#A0CEDD33", // iMessage blue bubble for the user
		alignSelf: "flex-end",
		borderColor: "#3A828933",
	},
	receivedMessage: {
		backgroundColor: "#FFFFFF", // Light gray bubble for received messages
		alignSelf: "flex-start",
	},
	messageText: {
		fontSize: 16,
		color: "#111111",
	},
	userText: {
		color: "#111111", // White text for user messages
	},
	inputContainer: {
		padding: 10,
		// paddingBottom: 30, // Space from the bottom
		// backgroundColor: "#fff",
	},
	inputWrapper: {
		position: "relative", // Allows the send button to be positioned inside
	},
	input: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		borderColor: "#E8E8E8", // Light gray border for input
		borderRadius: 16,
		paddingHorizontal: 15,
		backgroundColor: "#F5F5F5", // Light gray background for input
		fontSize: 16,
		paddingRight: 50, // Add space for the button
	},
	sendButton: {
		position: "absolute",
		right: 15,
		top: 15, // Center the button vertically
		borderRadius: 15,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	sendButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 14,
	},
	dateContainer: {
		alignSelf: "center",
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: 15,
		marginVertical: 10,
	},
	dateText: {
		fontSize: 10,
		color: "#808080", // Gray text for the date
		fontWeight: "500",
	},
});

export default ChatScreen;
