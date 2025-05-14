import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { router } from "expo-router";
import {
	registerForPushNotificationsAsync,
	sendTestNotification,
} from "@/utils/pushNotifications";

export default function PushNotificationScreen() {
	const { height } = Dimensions.get("window"); // Get the height of the device screen
	const [pushToken, setPushToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function handlePress() {
		router.dismissAll();
		router.replace("/(tabs)");

		// try {
		// 	setIsLoading(true);
		// 	// Request push notification permissions
		// 	const token = await registerForPushNotificationsAsync();
		// 	if (token) {
		// 		console.log("Push notification token:", token);
		// 		setPushToken(token.data);
		// 	}
		// 	// Wait a moment to ensure state is updated
		// 	await new Promise((resolve) => setTimeout(resolve, 100));
		// 	// Navigate to health info screen
		// 	router.replace("/health-info");
		// } catch (error) {
		// 	console.error("Error requesting push notification permissions:", error);
		// 	router.replace("/health-info");
		// } finally {
		// 	setIsLoading(false);
		// }
	}

	async function handleTestNotification() {
		if (pushToken) {
			try {
				await sendTestNotification(pushToken);
			} catch (error) {
				console.error("Error sending test notification:", error);
			}
		} else {
			console.log("No push token available");
		}
	}

	return (
		<SafeAreaView style={[styles.safeAreaView, { height }]}>
			<View style={styles.buttonContainer}>
				<View
					style={{
						paddingHorizontal: 20,
						marginBottom: 100,
					}}
				>
					<ThemedText
						type="defaultSemiBold"
						style={{
							fontSize: 18,
							fontWeight: "500",
							textAlign: "center",
						}}
					>
						Turn notification on
					</ThemedText>
					<ThemedText
						style={{
							fontSize: 14,
							fontWeight: "400",
							textAlign: "center",
						}}
					>
						That way you get timely reminders for your medications and
						appointments, helping you stay on track with your health.
					</ThemedText>
				</View>
				<ThemedButton
					title={isLoading ? "Processing..." : "Proceed"}
					onPress={handlePress}
					lightColor="#3A8289" // Custom color for light theme
					darkColor="#1A4F55" // Custom color for dark theme
					style={styles.button}
					textStyle={styles.buttonText} // Custom text style
					disabled={isLoading}
				/>
				<ThemedButton
					title="Send Test Notification"
					onPress={handleTestNotification}
					lightColor="#3A8289"
					darkColor="#1A4F55"
					style={styles.button}
					textStyle={styles.buttonText}
					disabled={!pushToken}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		backgroundColor: "white",
		flex: 1, // This will make the SafeAreaView take the full screen height
	},
	buttonContainer: {
		paddingHorizontal: 20,
		marginTop: "auto", // Push the button to the bottom of the screen
	},
	button: {
		marginBottom: 20,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "600",
	},
});
