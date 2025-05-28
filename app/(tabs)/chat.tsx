import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { router } from "expo-router";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import useChatService from "@/services/useChatService";
import { apiRoutes } from "@/constants/api";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import useChat from "@/hooks/mutations/useChat";
import Loader from "@/components/Loader";
import * as SecureStore from "expo-secure-store";
import { AuthSocketIO } from "@/utils/websocket";
import { ThemedText } from "@/components/ThemedText";
import ChatItem from "@/features/chat/ChatItem";
import ContactOptionSheet from "@/features/home/ContactOptionSheet";
import usePatientService from "@/services/usePatientService";

const { height } = Dimensions.get("window");
export default function ChatScreen() {
	const { getChatHistories, joinRoom } = useChatService();
	const { getPatients } = usePatientService();
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const wsRef = useRef<AuthSocketIO | null>(null);

	const mutation = useCustomMutation(joinRoom);
	const { joinChatRoom } = useChat(mutation);
	const {
		sheetRef: callSheetRef,
		openSheet: openCallSheet,
		closeSheet: closeCallSheet,
	} = useBottomSheet();
	const handleChatPress = (payload: {
		recipientId: string;
		recipientFullName: string;
	}) => {
		const { recipientId, recipientFullName } = payload;
		joinChatRoom({ recipientId }, recipientFullName);
	};

	const { data, isPending, refetch } = useCustomQuery({
		queryKey: [apiRoutes.patients.get_provider_patients],
		queryFn: getPatients,
	});

	const patients = data?.data || [];

	useEffect(() => {
		const initializeSocketIO = async () => {
			const token = await SecureStore.getItemAsync("token");
			if (!token) {
				console.error("No token found");
				return;
			}

			const baseUrl = process.env.EXPO_PUBLIC_API_URL;
			// const baseUrl = "https://api-dev.yourluke.com"; // must be https not wss

			if (!baseUrl) {
				console.error("No API URL found");
				return;
			}

			wsRef.current = new AuthSocketIO(baseUrl, token);

			wsRef.current.connect(
				// onConnect
				() => {
					console.log("Connected to Socket.IO");
					setIsConnected(true);
				},
				// onMessage
				(data: any) => {
					console.log("Received socket message:", data);

					if (data.type === "received-message" && data.message) {
						refetch(); // or append directly to local message list
					}
				},
				// onError
				(error: any) => {
					console.error("Socket.IO error:", error);
					setIsConnected(false);
				},
				// onDisconnect
				() => {
					console.log("Socket.IO disconnected");
					setIsConnected(false);
				}
			);
		};

		initializeSocketIO();

		return () => {
			wsRef.current?.close();
		};
	}, []);

	return (
		<View style={styles.container}>
			{patients.length === 0 ? (
				<View style={styles.emptyState}>
					<ThemedText style={styles.emptyText}>
						No chat histories found. Start a new conversation!
					</ThemedText>
				</View>
			) : (
				patients.map((patient: { fullName: string; id: string }) => (
					<View key={patient.id}>
						<ChatItem
							name={patient.fullName}
							onChatPress={(id: string) =>
								handleChatPress({
									recipientId: id,
									recipientFullName: patient.fullName,
								})
							}
							recipientId={patient.id}
						/>
					</View>
				))
			)}

			<RBSheet
				ref={callSheetRef}
				height={250}
				openDuration={250}
				customStyles={{
					container: styles.bottomSheetContainer,
				}}
			>
				<ContactOptionSheet closeBottomSheet={closeCallSheet} />
			</RBSheet>
			{mutation.isPending && <Loader />}
			{isPending && <Loader />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		backgroundColor: "white",
		height,
	},
	bottomSheetContainer: {
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "white",
	},
	emptyState: {
		flex: 1,
		// justifyContent: "center",
		alignItems: "center",
		marginTop: 180,
	},
	emptyText: {
		fontSize: 16,
		color: "#888",
		textAlign: "center",
	},
});
