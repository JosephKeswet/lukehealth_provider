import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ArrowBackIcon } from "@/constants/icons";
import { router } from "expo-router";

interface VoiceCallItemProps {
	name: string;
	// onCallPress: () => void;
}

const ChatHeader: React.FC<VoiceCallItemProps> = ({ name }) => {
	return (
		<>
			<View style={styles.container}>
				<Pressable
					onPress={() => router.back()}
					style={{ flexDirection: "row", gap: 4 }}
				>
					<ArrowBackIcon />
				</Pressable>
				<View style={styles.profileCircle} />
				<View style={styles.textContainer}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<ThemedText style={styles.nameText}>{name}</ThemedText>
					</View>
					<View style={styles.callContainer}>
						<ThemedText
							style={styles.activeStatus}
							// onPress={onCallPress}
						>
							Active 5 Minutes Ago
						</ThemedText>
					</View>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 83,
		borderBottomColor: "#DADADA99",
		borderBottomWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
		paddingHorizontal: 20,
	},
	profileCircle: {
		width: 56,
		height: 56,
		backgroundColor: Colors.primary.color,
		borderRadius: 800,
	},
	textContainer: {
		flexDirection: "column",
		gap: 4,
		flex: 1,
	},
	nameText: {
		color: Colors.primary.black,
		fontSize: 16,
		fontWeight: "500",
	},
	callContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	activeStatus: {
		color: "#808080",
		fontWeight: "400",
		fontSize: 14,
	},
});

export default ChatHeader;
