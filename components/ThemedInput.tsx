import React, { useState } from "react";
import {
	TextInput,
	StyleSheet,
	View,
	TextInputProps,
	Text,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor"; // Assuming you have this hook
import { Colors } from "@/constants/Colors";

interface ThemedInputProps extends TextInputProps {
	lightColor?: string;
	darkColor?: string;
	placeholder: string;
	label?: string; // Optional label prop
	onChangeText?: (text: string) => void; // Optional onChange handler
	borderRadius: number;
}

export function ThemedInput({
	lightColor,
	darkColor,
	placeholder,
	label, // Optional label
	borderRadius,
	onChangeText, // Optional onChange handler
	...otherProps
}: ThemedInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const borderColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"border"
	);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	// Handle the input change and forward it to the parent component
	const handleChange = (text: string) => {
		if (onChangeText) {
			onChangeText(text); // Call the parent's onChange if provided
		}
	};

	return (
		<View style={styles.inputContainer}>
			{/* Render label if provided */}
			{label && (
				<Text
					style={[
						styles.label,
						{ color: isFocused ? Colors.primary.color : "#2D3648" },
					]}
				>
					{label}
				</Text>
			)}

			<TextInput
				{...otherProps}
				placeholder={placeholder}
				placeholderTextColor={borderColor} // You can change this if you want a specific color for placeholder
				style={[
					styles.input,
					{
						borderColor: isFocused ? Colors.primary.color : "#F6F6F6", // Primary color on focus
						backgroundColor: isFocused ? "white" : "#F6F6F6",
						borderRadius: borderRadius,
					},
				]}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChangeText={handleChange} // Forward the text change to the parent handler
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
	},
	label: {
		fontSize: 14,
		fontWeight: "400",
		marginBottom: 6,
	},
	input: {
		height: 45,
		borderWidth: 1,
		borderRadius: 8,
		paddingLeft: 12,
		fontSize: 16,
	},
});
