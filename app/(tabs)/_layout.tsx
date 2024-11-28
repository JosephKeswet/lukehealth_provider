import { router, Tabs } from "expo-router";
import React from "react";

import {
	ChatBarIcon,
	DocsBarIcon,
	HomeBarIcon,
	PatientBarIcon,
	TabBarIcon,
} from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { routes } from "@/constants/routing";

import { Pressable, View } from "react-native";
import {
	ArrowBackIcon,
	EllipsisIcon,
	LukeHealthLogo,
	NotificationIcon,
	ProfileIcon,
} from "@/constants/icons";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name={routes.home}
				options={{
					title: "Overview",
					tabBarLabelStyle: {
						fontSize: 12,
					},
					tabBarIcon: ({ color, focused }) => (
						<HomeBarIcon color={color} />
						// <TabBarIcon
						// 	name={focused ? "home" : "home-outline"}
						// 	color={color}
						// />
					),
					headerLeft: () => (
						<View
							style={{
								paddingLeft: 20,
							}}
						>
							<LukeHealthLogo />
						</View>
					),
					headerShown: true,
					headerTitle: "",
					headerShadowVisible: true,

					headerRight: () => (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 16,
								paddingRight: 20,
							}}
						>
							<Pressable onPress={() => {}}>
								<ProfileIcon />
							</Pressable>
							<NotificationIcon />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name={routes.patient}
				options={{
					title: "Patient",
					tabBarIcon: ({ color, focused }) => <PatientBarIcon color={color} />,
					headerTitle: "Prescription Details",
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "400",
						color: "#282828",
					},
					headerShown: true,
					headerLeft: () => (
						<Pressable
							onPress={() => router.back()}
							style={{ flexDirection: "row", gap: 4, paddingLeft: 15 }}
						>
							<ArrowBackIcon />
						</Pressable>
					),
					headerRight: () => (
						<Pressable
							style={{ flexDirection: "row", gap: 4, paddingRight: 20 }}
						>
							<EllipsisIcon />
						</Pressable>
					),
					headerShadowVisible: false,
				}}
			/>
			<Tabs.Screen
				name={routes.chat}
				options={{
					title: "Chat",
					tabBarIcon: ({ color, focused }) => <ChatBarIcon color={color} />,
				}}
			/>
			<Tabs.Screen
				name={routes.docs}
				options={{
					title: "Chat",
					tabBarIcon: ({ color, focused }) => <DocsBarIcon color={color} />,
				}}
			/>
		</Tabs>
	);
}
