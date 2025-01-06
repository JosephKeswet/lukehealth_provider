import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { routes } from "@/constants/routing";
import { Pressable } from "react-native";
import { ArrowBackIcon } from "@/constants/icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name={routes.note}
					options={{
						title: "Note",
						headerStyle: {
							backgroundColor: "#FAFAFA",
						},
						headerTitle: "Note",
						headerTitleStyle: {
							fontSize: 16,
							fontWeight: "400",
							color: "#282828",
						},
						headerShown: true,

						headerLeft: () => (
							<Pressable
								onPress={() => router.back()}
								style={{ flexDirection: "row", gap: 4 }}
							>
								<ArrowBackIcon />
							</Pressable>
						),

						headerShadowVisible: true,
					}}
				/>
				<Stack.Screen
					name={routes.create_note}
					options={{
						title: "Notes",
						headerStyle: {
							backgroundColor: "white",
						},
						headerTitle: "Notes",
						headerTitleStyle: {
							fontSize: 16,
							fontWeight: "400",
							color: "#282828",
						},
						headerShown: true,

						headerLeft: () => (
							<Pressable
								onPress={() => router.back()}
								style={{ flexDirection: "row", gap: 4 }}
							>
								<ArrowBackIcon />
							</Pressable>
						),

						headerShadowVisible: false,
					}}
				/>
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
