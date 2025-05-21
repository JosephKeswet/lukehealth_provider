import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { X } from "lucide-react-native";

export interface CustomToastProps extends BaseToastProps {
	text1?: string;
	text2?: string;
	cancelable?: boolean;
	onCancel?: () => void; // 👈 optional cancel handler
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "90%",
		height: 52,
		paddingHorizontal: 12,
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
		color: "#475467",
		fontSize: 12,
		marginTop: 2,
	},
	textContainer: {
		flex: 1,
	},
	closeButton: {
		marginLeft: 12,
		padding: 4,
	},
});

const toastConfig = {
	error: ({ text1, text2, cancelable, onCancel }: CustomToastProps) => (
		<View style={[styles.container, styles.errorContainer]}>
			<View style={styles.textContainer}>
				{text1 && <Text style={styles.errorText}>{text1}</Text>}
				{text2 && <Text style={styles.secondaryText}>{text2}</Text>}
			</View>
			{cancelable && (
				<Pressable
					onPress={() => {
						Toast.hide();
						onCancel?.(); // 👈 call the passed function
					}}
					style={styles.closeButton}
				>
					<X
						color="#D92D20"
						size={16}
					/>
				</Pressable>
			)}
		</View>
	),

	success: ({ text1, text2 }: CustomToastProps) => (
		<View style={[styles.container, styles.successContainer]}>
			<View style={styles.textContainer}>
				{text1 && <Text style={styles.successText}>{text1}</Text>}
				{text2 && <Text style={styles.secondaryText}>{text2}</Text>}
			</View>
		</View>
	),

	delete: ({ text1, text2 }: CustomToastProps) => (
		<View style={[styles.container, styles.errorContainer]}>
			<View style={styles.textContainer}>
				{text1 && <Text style={styles.errorText}>{text1}</Text>}
				{text2 && <Text style={styles.secondaryText}>{text2}</Text>}
			</View>
		</View>
	),
};

export default toastConfig;
