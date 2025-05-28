import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

interface VoiceCallItemProps {
	name: string;
	recipientId: string;
	onChatPress: (recipientId: string) => void;
}

const ChatItem: React.FC<VoiceCallItemProps> = ({
	name,
	recipientId,
	onChatPress,
}) => {
	return (
		<Pressable
			onPress={() => onChatPress(recipientId)}
			style={styles.container}
		>
			<View style={styles.profileCircle} />
			<View style={styles.textContainer}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<ThemedText style={styles.nameText}>{name}</ThemedText>
					<ThemedText
						style={{
							fontSize: 11,
							color: "#A0A0A0",
							fontWeight: "500",
						}}
					>
						Now
					</ThemedText>
				</View>
				<View style={styles.callContainer}>
					<ThemedText
						style={styles.callText}
						onPress={() => onChatPress(recipientId)}
					>
						Click here to start messaging!
					</ThemedText>
				</View>
			</View>
		</Pressable>
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
		fontSize: 18,
		fontWeight: "500",
	},
	callContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	callText: {
		color: "#808080",
		fontWeight: "500",
	},
});

export default ChatItem;
