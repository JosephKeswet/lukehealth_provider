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
import * as Progress from "react-native-progress";

import { useColorScheme } from "@/hooks/useColorScheme";
import { routes } from "@/constants/routing";
import { Pressable } from "react-native";
import { ArrowBackIcon } from "@/constants/icons";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import toastConfig from "@/libs/toastConfig";
import usePatientStore from "@/store/usePatientStore";
import useHealthStore from "@/store/useHealthStore";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const patientProgress = usePatientStore((state) => state.patientProgress);
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: 2 } },
	});
	const addMedicationProgress = useHealthStore(
		(state) => state.addMedicationProgress
	);

	const setAddMedicationProgress = useHealthStore(
		(state) => state.setAddMedicationProgress
	);

	const setPatientProgress = usePatientStore(
		(state) => state.setPatientProgress
	);

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
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={routes.signup}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={routes.signin}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={routes.create_password}
						options={{
							headerShown: false,
							gestureEnabled: false,
						}}
					/>
					<Stack.Screen
						name={routes.forgot_password}
						options={{
							headerShown: false,
							gestureEnabled: false,
						}}
					/>
					<Stack.Screen
						name={routes.reset_password}
						options={{
							headerShown: false,
							gestureEnabled: false,
						}}
					/>
					<Stack.Screen
						name={routes.verify_email}
						options={{
							headerShown: false,
							gestureEnabled: false,
						}}
					/>
					<Stack.Screen
						name={routes.verify_account}
						options={{
							headerShown: false,
							gestureEnabled: false,
						}}
					/>
					<Stack.Screen
						name={routes.push_notification}
						options={{
							headerShown: false,
							gestureEnabled: false,
						}}
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
					<Stack.Screen
						name={routes.confirm_note}
						options={{
							title: "Create",
							headerStyle: {
								backgroundColor: "white",
							},
							headerTitle: "Create",
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
					<Stack.Screen
						name={routes.patient}
						options={{
							title: "Patient",
							headerStyle: {
								backgroundColor: "white",
							},
							headerTitle: "Patient",
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
					<Stack.Screen
						name={routes.add_patient}
						options={{
							headerTitle: "", // Hide default header title
							// headerBackTitle: "Health Information",
							headerShadowVisible: false,
							headerBackTitleStyle: {
								fontSize: 14,
							},
							headerTintColor: "#282828",
							headerRight: () => (
								<Progress.Bar
									progress={patientProgress}
									width={135}
									height={2}
									color={Colors.primary.color}
								/>
							),
							headerLeft: ({ canGoBack }) => (
								<Pressable
									onPress={() => {
										if (patientProgress > 0.2) {
											setPatientProgress(patientProgress - 0.2);
										} else {
											router.back();
										}
									}}
									style={{ flexDirection: "row", gap: 4 }}
								>
									<ArrowBackIcon />
									<ThemedText>New Patient</ThemedText>
								</Pressable>
							),
						}}
					/>

					<Stack.Screen
						name={routes.add_medication}
						options={{
							headerTitle: "", // Hide default header title
							// headerBackTitle: "Health Information",
							headerShadowVisible: false,
							headerBackTitleStyle: {
								fontSize: 14,
							},
							headerTintColor: "#282828",
							headerRight: () => (
								<Progress.Bar
									progress={addMedicationProgress}
									width={135}
									height={2}
									color={Colors.primary.color}
								/>
							),
							headerLeft: () => (
								<Pressable
									onPress={() => {
										if (addMedicationProgress > 0) {
											setAddMedicationProgress(addMedicationProgress - 0.5);
										} else {
											router.back();
										}
									}}
									style={{ flexDirection: "row", gap: 4 }}
								>
									<ArrowBackIcon />
									<ThemedText>Add New Medication</ThemedText>
								</Pressable>
							),
						}}
					/>
					<Stack.Screen
						name={routes.chat}
						options={{
							title: "Chat",
							headerStyle: {
								backgroundColor: "#FAFAFA",
							},
							headerTitle: "Chat",
							headerTitleStyle: {
								fontSize: 16,
								fontWeight: "400",
								color: "#282828",
							},
							headerShown: false,

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
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
			<Toast config={toastConfig} />
		</QueryClientProvider>
	);
}
