import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import {
	registerForPushNotificationsAsync,
	addNotificationReceivedListener,
	addNotificationResponseReceivedListener,
	removeNotificationSubscription,
} from "@/utils/pushNotifications";
import useNotificationService from "@/services/useNotificationService";

export function usePushNotifications() {
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();
	const { addExpoToken } = useNotificationService();
	useEffect(() => {
		// Register for push notifications
		registerForPushNotificationsAsync().then((token) => {
			if (token) {
				addExpoToken(token.data);
				// Here you would typically send this token to your backend
			}
		});

		// Listen for incoming notifications while app is foregrounded
		notificationListener.current = addNotificationReceivedListener(
			(notification) => {
				console.log("Received notification:", notification);
			}
		);

		// Listen for user interaction with notifications
		responseListener.current = addNotificationResponseReceivedListener(
			(response) => {
				console.log("Notification response:", response);
			}
		);

		// Cleanup listeners on unmount
		return () => {
			if (notificationListener.current) {
				removeNotificationSubscription(notificationListener.current);
			}
			if (responseListener.current) {
				removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	return {
		// Add any additional methods or state you want to expose
	};
}
