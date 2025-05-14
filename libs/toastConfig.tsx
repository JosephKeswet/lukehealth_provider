import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

interface CustomToastProps extends BaseToastProps {
	text1?: string;
	text2?: string;
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "90%",
		height: 52,
		padding: 12,
		borderRadius: 8,
	},
	errorContainer: {
		backgroundColor: "#FEF3F2",
		borderWidth: 1,
		borderColor: "#D92D20",
	},
	successContainer: {
		backgroundColor: "#ECFDF3",
		borderWidth: 1,
		borderColor: "#ABEFC6",
	},
	errorText: {
		color: "#D92D20",
		fontSize: 12,
		fontWeight: "600",
	},
	successText: {
		color: "#067647",
		fontSize: 12,
		fontWeight: "600",
	},
	secondaryText: {
		color: "white",
	},
});

const toastConfig = {
	error: ({ text1, text2 }: CustomToastProps) => (
		<View style={[styles.container, styles.errorContainer]}>
			{text1 && <Text style={styles.errorText}>{text1}</Text>}
			{text2 && <Text style={styles.secondaryText}>{text2}</Text>}
		</View>
	),
	success: ({ text1, text2 }: CustomToastProps) => (
		<View style={[styles.container, styles.successContainer]}>
			{text1 && <Text style={styles.successText}>{text1}</Text>}
			{text2 && <Text style={styles.secondaryText}>{text2}</Text>}
		</View>
	),
	delete: ({ text1, text2 }: CustomToastProps) => (
		<View style={[styles.container, styles.errorContainer]}>
			{text1 && <Text style={styles.errorText}>{text1}</Text>}
			{text2 && <Text style={styles.secondaryText}>{text2}</Text>}
		</View>
	),
};

export default toastConfig;
