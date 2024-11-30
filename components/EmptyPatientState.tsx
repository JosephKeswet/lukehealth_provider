import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { AppointmentIcon, PlusRoundedIcon } from "@/constants/icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";

export default function EmptyPatientState() {
	const { height } = useWindowDimensions();
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				height: height,
				gap: 16,
				paddingBottom: height / 3,
			}}
		>
			<AppointmentIcon />
			<ThemedText style={styles.noDataText}>
				You have no patient. Click the button below to add a beneficiary
			</ThemedText>
			<ThemedButton
				title="Add Prescription"
				onPress={() => {}}
				lightColor="#3A8289" // Custom color for light theme
				darkColor="#1A4F55" // Custom color for dark theme
				style={{
					backgroundColor: "#F8F8F81A",
					borderWidth: 1,
					borderColor: Colors.light.border,
					borderRadius: 100,
				}}
				textStyle={{
					color: Colors.primary.black,
					fontWeight: "400",
				}} // Custom text style
				icon={<PlusRoundedIcon />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	noDataText: {
		textAlign: "center",
		color: "#666666",
	},
});