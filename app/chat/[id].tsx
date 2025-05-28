import React, { useRef, useState, useEffect, useCallback } from "react";
import {
	View,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
	Dimensions,
	Keyboard,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SendMessageIcon } from "@/constants/icons";
import { ThemedInput } from "@/components/ThemedInput";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { AuthSocketIO } from "@/utils/websocket";
import useChatService from "@/services/useChatService";
import { apiRoutes } from "@/constants/api";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import { IChatMessage } from "@/types/chat/responses";
import { useStorage } from "@/hooks/useStorage";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import useChat from "@/hooks/mutations/useChat";
import { useAttachmentOptions } from "@/hooks/useAttachmentOptions";
import { useQueryClient } from "@tanstack/react-query";
import { ISendChat } from "@/types/chat/payload";
import ChatHeader from "@/features/chat/ChatHeader";

const ChatScreen = () => {
	const { id } = useLocalSearchParams();
	const { getCookie } = useStorage();
	const { sendChat } = useChatService();
	const mutation = useCustomMutation(sendChat);
	const { sendMessage } = useChat(mutation);

	const [recipientFullName, setRecipientFullName] = useState<string>("");
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<IChatMessage[]>([]);
	const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
	const [isUserScrolling, setIsUserScrolling] = useState(false);

	const flatListRef = useRef<FlatList>(null);
	const wsRef = useRef<AuthSocketIO | null>(null);
	const isScrolling = useRef(false);

	// Get recipient name
	useEffect(() => {
		const getRecipientName = async () => {
			const recipient = await getCookie("recipientFullName");
			if (recipient) {
				setRecipientFullName(recipient);
			} else {
				console.error("No recipient name found");
			}
		};
		getRecipientName();
	}, [id]);

	// Fetch chat messages
	const { getChatMessages } = useChatService();
	const queryClient = useQueryClient();
	const { data, refetch } = useCustomQuery({
		queryKey: [apiRoutes.chat.getChatMessages, id as string],
		queryFn: () => getChatMessages({ recipientId: id as string }),
	});

	const chatMessages = data?.data;

	// Update messages with proper deduplication
	const updateMessages = useCallback((newMessages: IChatMessage[]) => {
		setMessages((prev) => {
			const messageMap = new Map(prev.map((msg) => [msg.id, msg]));
			newMessages.forEach((msg) => {
				if (msg.id) {
					messageMap.set(msg.id, { ...msg });
				}
			});
			const updatedMessages = Array.from(messageMap.values());
			return updatedMessages.sort(
				(a, b) =>
					new Date(a.createdAt || 0).getTime() -
					new Date(b.createdAt || 0).getTime()
			);
		});
	}, []);

	useEffect(() => {
		if (chatMessages) {
			updateMessages(chatMessages);
			if (!isUserScrolling) {
				scrollToLatestMessage();
			}
		}
	}, [chatMessages, updateMessages]);

	// Scroll to the latest message
	const scrollToLatestMessage = useCallback(() => {
		if (!isScrolling.current && messages.length > 0 && !isUserScrolling) {
			isScrolling.current = true;
			setTimeout(() => {
				flatListRef.current?.scrollToIndex({
					index: 0,
					animated: true,
					viewPosition: 0,
				});
				isScrolling.current = false;
			}, 150);
		}
	}, [messages.length, isUserScrolling]);

	// WebSocket setup
	useEffect(() => {
		const initializeSocketIO = async () => {
			const token = await SecureStore.getItemAsync("token");
			if (!token || !process.env.EXPO_PUBLIC_API_URL) return;

			wsRef.current = new AuthSocketIO(process.env.EXPO_PUBLIC_API_URL, token);

			wsRef.current.connect(
				() => setIsConnected(true),
				() => {
					queryClient.invalidateQueries({
						queryKey: [apiRoutes.chat.getChatMessages, id],
					});
					refetch();
				},
				(error: any) => setIsConnected(false),
				() => setIsConnected(false)
			);
		};

		initializeSocketIO();
		return () => wsRef.current?.close();
	}, [id, queryClient, refetch]);

	const handleSend = useCallback(() => {
		if (input.trim() === "" || !wsRef.current || !isConnected) return;

		const newMessage: ISendChat = {
			message: input.trim(),
			recipientId: id as string,
		};

		// Optimistic UI update
		setMessages((prev: any) => {
			const updatedMessages = [newMessage, ...prev];
			setTimeout(scrollToLatestMessage, 0);
			return updatedMessages;
		});

		// Send message to server
		sendMessage({
			message: newMessage.message,
			recipientId: id as string,
		});

		setInput("");
	}, [input, id, isConnected, sendMessage, scrollToLatestMessage]);

	const { attachmentOptions } = useAttachmentOptions({
		setMessages,
		setShowAttachmentMenu,
	});

	const { width } = Dimensions.get("window");

	const renderMessage = useCallback(
		({ item }: { item: IChatMessage }) => (
			<View
				style={[
					styles.messageBubble,
					item.userId !== id ? styles.userMessage : styles.receivedMessage,
				]}
			>
				<ThemedText
					style={[styles.messageText, item.userId !== id && styles.userText]}
				>
					{item.message}
				</ThemedText>
			</View>
		),
		[id]
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
				keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Adjusted offset
			>
				{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
				<View style={styles.innerContainer}>
					<ChatHeader name={recipientFullName} />
					<FlatList
						ref={flatListRef}
						data={messages.slice().reverse()}
						renderItem={renderMessage}
						keyExtractor={(item, index) => item.id || String(index)}
						contentContainerStyle={styles.messagesContainer}
						scrollEnabled={true}
						keyboardShouldPersistTaps="always"
						inverted={true}
						onScrollBeginDrag={() => setIsUserScrolling(true)}
						onScrollEndDrag={() =>
							setTimeout(() => setIsUserScrolling(false), 500)
						}
						onMomentumScrollBegin={() => setIsUserScrolling(true)}
						onMomentumScrollEnd={() =>
							setTimeout(() => setIsUserScrolling(false), 500)
						}
						onScrollToIndexFailed={(info) => {
							setTimeout(
								() => flatListRef.current?.scrollToEnd({ animated: true }),
								200
							);
						}}
						onTouchStart={(e: any) => {
							// Dismiss keyboard only if tapping outside the input
							if (e.target !== flatListRef.current) {
								Keyboard.dismiss();
							}
						}}
					/>
					<View style={styles.inputContainer}>
						{showAttachmentMenu && (
							<View style={styles.overlay}>
								<View style={[styles.attachmentMenu, { width: width - 20 }]}>
									{attachmentOptions.map((option) => (
										<TouchableOpacity
											key={option.label}
											style={styles.attachmentOption}
											onPress={option.action}
										>
											<Ionicons
												name={option.icon}
												size={24}
												color="#666"
											/>
											<ThemedText style={styles.attachmentLabel}>
												{option.label}
											</ThemedText>
										</TouchableOpacity>
									))}
								</View>
							</View>
						)}
						<ThemedInput
							style={styles.input}
							placeholder="Write a message..."
							value={input}
							onChangeText={setInput}
							blurOnSubmit={false}
							onSubmitEditing={handleSend}
						/>
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.attachButton}
								onPress={() => setShowAttachmentMenu(!showAttachmentMenu)}
							>
								<Ionicons
									name="attach"
									size={24}
									color="#666"
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.sendButton}
								onPress={handleSend}
							>
								<SendMessageIcon />
							</TouchableOpacity>
						</View>
					</View>
				</View>
				{/* </TouchableWithoutFeedback> */}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#fff",
	},
	container: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
	},
	messagesContainer: {
		flexGrow: 1,
		padding: 10,
	},
	messageBubble: {
		maxWidth: "75%",
		padding: 12,
		borderRadius: 6,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#E8E8E8",
	},
	userMessage: {
		backgroundColor: "#A0CEDD33",
		alignSelf: "flex-end",
	},
	receivedMessage: {
		backgroundColor: "#FFFFFF",
		alignSelf: "flex-start",
	},
	messageText: {
		fontSize: 14,
		color: "#111",
	},
	userText: {
		color: "#111",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#fff",
	},
	input: {
		flex: 1,
		height: 50,
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 16,
		paddingHorizontal: 15,
		paddingLeft: 40,
		backgroundColor: "#F5F5F5",
		fontSize: 16,
	},
	buttonContainer: {
		position: "absolute",
		right: 15,
		top: 15,
		flexDirection: "row",
		alignItems: "center",
	},
	sendButton: {
		padding: 8,
	},
	attachButton: {
		padding: 8,
	},
	overlay: {
		position: "absolute",
		top: -Dimensions.get("window").height,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		justifyContent: "flex-end",
	},
	attachmentMenu: {
		position: "absolute",
		bottom: 60,
		left: 10,
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	attachmentOption: {
		flexDirection: "column",
		alignItems: "center",
		padding: 10,
		width: "33%",
	},
	attachmentLabel: {
		marginTop: 5,
		fontSize: 16,
	},
});

export default ChatScreen;
