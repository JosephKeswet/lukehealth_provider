import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { useState } from "react";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Image } from "expo-image";

export default function CreateNoteScreen() {
	const { id } = useLocalSearchParams();
	const [note, setNote] = useState("");

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.headerRow}>
					<View style={styles.avatarContainer}>
						<View style={styles.nameBadge}>
							<ThemedText style={styles.nameBadgeText}>
								From: Pharm. Edna
							</ThemedText>
						</View>
						<Image
							source={require("../../assets/images/avatar-note.png")}
							contentFit="cover"
							transition={1000}
							style={styles.avatarImage}
						/>
					</View>
					<ThemedText style={styles.date}>Dec 25, 2024</ThemedText>
				</View>
				<ThemedText style={styles.title}>
					Add Note for Prescription ID: {id}
				</ThemedText>
				<TextInput
					style={styles.textInput}
					placeholder="Type your note here..."
					multiline
					value={note}
					onChangeText={setNote}
				/>
				<View style={styles.buttonRow}>
					<ThemedButton
						title="Cancel"
						onPress={() => setNote("")}
						style={{
							width: "45%",
							borderRadius: 32,
							backgroundColor: "white",
							borderColor: Colors.primary.color,
							borderWidth: 1,
						}}
						textStyle={{
							color: Colors.primary.color,
							fontWeight: "500",
							fontSize: 14,
						}}
					/>
					<ThemedButton
						title="Save Note"
						onPress={() => {
							console.log("Note saved:", note);
							router.push("/(tabs)/notes");
						}}
						style={{
							width: "45%",
							borderRadius: 32,
						}}
						textStyle={{
							fontWeight: "500",
							fontSize: 14,
						}}
					/>
				</View>
			</View>
			{/* <FloatingActionButton /> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "white",
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	avatarContainer: {
		position: "relative",
		width: 125,
	},
	nameBadge: {
		backgroundColor: "#DDE9E6",
		width: 111,
		height: 26,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
	nameBadgeText: {
		fontSize: 10,
		fontWeight: "500",
		color: "#255A4E",
	},
	avatarImage: {
		width: 26,
		height: 24,
		position: "absolute",
		right: 0,
	},
	date: {
		fontSize: 10,
		color: "#828282",
		lineHeight: 13.5,
		fontWeight: "400",
	},
	title: {
		fontSize: 24,
		color: "#404040",
		fontWeight: "500",
		lineHeight: 32,
		paddingTop: 10,
	},
	textInput: {
		flex: 1,
		// borderWidth: 1,
		// borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		fontSize: 14,
		textAlignVertical: "top",
		marginTop: 10,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 16,
		marginTop: 20,
	},
});
