import React from "react";
import {
	TouchableOpacity,
	Text,
	type TextProps,
	type ViewStyle,
	type TextStyle,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedButtonProps = {
	title: string; // Button text
	onPress: () => void; // Button press handler
	lightColor?: string; // Optional custom color for light theme
	darkColor?: string; // Optional custom color for dark theme
	style?: ViewStyle; // Custom styles for the button container
	textStyle?: TextStyle; // Custom styles for the text inside the button
	icon?: any;
};

export function ThemedButton({
	title,
	onPress,
	lightColor,
	darkColor,
	style,
	textStyle,
	icon,
}: ThemedButtonProps) {
	// Use the useThemeColor hook to get the theme-based background color
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"background"
	);

	// Use the useThemeColor hook for the text color (you can customize this too)
	const textColor = useThemeColor({ light: "white", dark: "white" }, "text");

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				{
					backgroundColor: Colors.primary.color,
					padding: 12,
					borderRadius: 8,
					flexDirection: icon ? "row" : "column",
					gap: 8,
					alignItems: "center",
				},
				style,
			]} // Combine background color and custom style
		>
			{icon}
			<Text
				style={[
					{ color: textColor ? textColor : "white", textAlign: "center" },
					textStyle,
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}
