import { ThemedInput } from "@/components/ThemedInput";
import { Colors } from "@/constants/Colors";
import { CloseIcon } from "@/constants/icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
	label: string;
	placeholder: string;
	values?: string[];
	onChange: (value: string) => void;
	inputValue: string;
};
export default function CustomInputWithSuggesstion({
	label,
	placeholder,
	values = [], // Array of snippets to display
	onChange, // Function to handle input change
	inputValue, // Current value of the input
}: Props) {
	const handleSnippetClick = (suggestion: string) => {
		onChange(suggestion); // Update the input value when a snippet is clicked
	};

	return (
		<View>
			<ThemedInput
				label={label}
				placeholder={placeholder}
				lightColor="#FFFFFF"
				darkColor="#1A4F55"
				keyboardType="default"
				value={inputValue} // Bind input value to state
				onChangeText={onChange} // Call the passed handler when text is changed
			/>
			<View
				style={{
					flexDirection: "row",
					gap: 8,
					flexWrap: "wrap",
					marginTop: 12,
				}}
			>
				{/* Dynamically render snippets */}
				{values.map((value, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => handleSnippetClick(value)}
					>
						<View
							style={{
								backgroundColor: Colors.primary.hightLightGreen,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								borderTopLeftRadius: 8,
								borderTopRightRadius: 8,
								borderBottomRightRadius: 8,
								paddingHorizontal: 8,
								paddingVertical: 4,
								alignSelf: "flex-start",
								gap: 8,
							}}
						>
							<Text
								style={{
									color: Colors.primary.green,
									fontWeight: "400",
									fontSize: 12,
								}}
							>
								{value}
							</Text>
							<CloseIcon />
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
}
