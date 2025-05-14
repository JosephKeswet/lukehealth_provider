import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";

// Configure notification behavior

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
		shouldShowBanner: true, // ✅ NEW
		shouldShowList: true, // ✅ NEW
	}),
});

export async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			console.log("Failed to get push token for push notification!");
			return;
		}

		// Get the token that uniquely identifies this device
		token = await Notifications.getExpoPushTokenAsync({
			projectId: Constants.expoConfig?.extra?.eas?.projectId,
		});
		// token = (await Notifications.getDevicePushTokenAsync()).data;
		console.log("push notification", token);

		return token;
	} else {
		console.log("Must use physical device for Push Notifications");
		return;
	}
}

export async function sendPushNotification(
	expoPushToken: string,
	title: string,
	body: string
) {
	const message = {
		to: expoPushToken,
		sound: "default",
		title: title,
		body: body,
		data: { someData: "goes here" },
		priority: "high",
	};

	await fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});
}

// Test notification function
export async function sendTestNotification(expoPushToken: string) {
	try {
		await sendPushNotification(
			expoPushToken,
			"Test Notification",
			"This is a test notification from Luke Health!"
		);
		console.log("Test notification sent successfully!");
	} catch (error) {
		console.error("Error sending test notification:", error);
	}
}

// Handle notification received while app is foregrounded
export function addNotificationReceivedListener(
	callback: (notification: Notifications.Notification) => void
) {
	return Notifications.addNotificationReceivedListener(callback);
}

// Handle notification response (when user taps notification)
export function addNotificationResponseReceivedListener(
	callback: (response: Notifications.NotificationResponse) => void
) {
	return Notifications.addNotificationResponseReceivedListener(callback);
}

// Remove notification listeners
export function removeNotificationSubscription(
	subscription: Notifications.Subscription
) {
	Notifications.removeNotificationSubscription(subscription);
}

// Schedule a local notification
export async function scheduleLocalNotification(
	title: string,
	body: string,
	trigger?: Notifications.NotificationTriggerInput
) {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: title,
			body: body,
			data: { data: "goes here" },
		},
		trigger: trigger || null,
	});
}

// Cancel all scheduled notifications
export async function cancelAllScheduledNotifications() {
	await Notifications.cancelAllScheduledNotificationsAsync();
}

// Get all pending notifications
export async function getAllPendingNotifications() {
	return await Notifications.getAllScheduledNotificationsAsync();
}
