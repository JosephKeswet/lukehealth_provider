import React from "react";
import {
	Dimensions,
	SafeAreaView,
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	Pressable,
} from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import { ArrowLongIcon } from "@/constants/icons";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import EmptyNoteState from "@/features/notes/emptyNoteState";

export default function NoteScreen() {
	const { width } = Dimensions.get("window");
	const notesGap = Math.floor(width * 0.01);
	const notes = [
		{
			id: 1,
			title: "Note from Edna",
			description: "On current prescription outcomes & effects.",
			image: require("../../assets/images/empty-note.png"),
		},
		{
			id: 2,
			title: "Follow-Up Note",
			description: "Details regarding the follow-up consultation.",
			image: require("../../assets/images/empty-note.png"),
		},
		{
			id: 3,
			title: "Reminder",
			description: "Details about the upcoming appointment.",
			image: require("../../assets/images/empty-note.png"),
		},
		{
			id: 4,
			title: "Additional Note",
			description: "Further details about the prescription.",
			image: require("../../assets/images/empty-note.png"),
		},
		{
			id: 5,
			title: "Lab Results Note",
			description: "Summary of lab results for review.",
			image: require("../../assets/images/empty-note.png"),
		},
	];

	function onPress() {}

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView
				contentContainerStyle={[styles.scrollView, { gap: notesGap }]}
			>
				<View style={[styles.container, { gap: notesGap }]}>
					{/* Empty state condition */}
					{notes.length !== 0 ? (
						<EmptyNoteState
							onPress={() => router.push("/create-note")}
							buttonText="Create note"
							text="You have no notes. Click the button below to create a new note."
						/>
					) : (
						notes.map((note) => (
							<Pressable
								key={note.id}
								style={styles.noteContainer}
								onPress={() => router.push(`/note/${note.id}`)}
							>
								<Image
									source={note.image}
									contentFit="cover"
									transition={1000}
									style={styles.image}
								/>
								<View style={styles.textContainer}>
									<ThemedText style={styles.title}>{note.title}</ThemedText>
									<ThemedText
										numberOfLines={2}
										style={styles.description}
									>
										{note.description}
									</ThemedText>
								</View>
								<View style={styles.footer}>
									<ThemedText style={styles.viewNote}>View Note</ThemedText>
									<ArrowLongIcon />
								</View>
							</Pressable>
						))
					)}
				</View>
			</ScrollView>
			<FloatingActionButton onPress={() => {}} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "white",
	},
	scrollView: {
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	noteContainer: {
		borderColor: Colors.light.border,
		borderWidth: 1,
		borderRadius: 8,
		padding: 14,
		height: 186,
		width: "48%", // Two items per row
		backgroundColor: Colors.light.background,
		marginTop: 10,
	},
	image: {
		width: 38,
		height: 38,
		alignSelf: "flex-start",
	},
	textContainer: {
		paddingTop: 10,
		gap: 4,
	},
	title: {
		fontSize: 16,
		fontWeight: "400",
		color: Colors.primary.black,
		lineHeight: 21.6,
	},
	description: {
		fontSize: 12,
		fontWeight: "400",
		lineHeight: 16.2,
		color: "#545454",
	},
	footer: {
		marginTop: "auto",
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	viewNote: {
		fontSize: 12,
	},
	// Empty state styles
	emptyStateContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	emptyStateImage: {
		width: 100,
		height: 100,
	},
	emptyStateText: {
		marginTop: 10,
		fontSize: 16,
		color: Colors.primary.black,
	},
});
