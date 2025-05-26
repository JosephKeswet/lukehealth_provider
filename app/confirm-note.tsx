import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { View, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import useNoteService from "@/services/useNoteService";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import useNote from "@/hooks/mutations/useNote";
import { useNoteStore } from "@/store/useNoteStore";
import Loader from "@/components/Loader";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import usePatientService from "@/services/usePatientService";
import { apiRoutes } from "@/constants/api";

export default function CreateNoteScreen() {
	const { id } = useLocalSearchParams();
	const { noteDetails, setNote, resetNote } = useNoteStore();
	// Setup mutation and store update hooks
	const { createNote } = useNoteService();
	const { getPatientOverview } = usePatientService();

	const mutation = useCustomMutation(createNote);
	const { addNote } = useNote(mutation);
	const { data: overviewData, isPending: isOverviewPending } = useCustomQuery({
		queryFn: () =>
			getPatientOverview({ patientId: noteDetails.patientId as string }),
		queryKey: [apiRoutes.patients.get_patient_overview, id as string],
	});

	const handleSaveNote = async () => {
		// if (!id) return;

		try {
			// Call the mutation to create note

			// Update the local store with the new note
			addNote({
				note: noteDetails.note,
				patientId: noteDetails.patientId as string,
				title: noteDetails.title,
				collaboratorIds: noteDetails.collaborators.map((collab) => collab.id),
			});

			// Navigate back to notes list
		} catch (error) {
			console.error("Failed to save note:", error);
			// Optionally show some UI error feedback here
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.avatarContainer}>
					<View style={styles.nameBadge}>
						<ThemedText style={styles.nameBadgeText}>
							From: Pharm. Edna
						</ThemedText>
					</View>

					<View style={styles.collaboratorsRow}>
						{noteDetails.collaborators.map((collab) => (
							<ThemedText
								key={collab.id}
								style={styles.collaboratorName}
							>
								{collab.fullName}
							</ThemedText>
						))}
					</View>
				</View>

				{/* <View style={styles.headerRow}>
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
				</View> */}
				<ThemedText style={styles.title}>
					Add Note for : {overviewData?.data?.fullName}
				</ThemedText>
				<TextInput
					style={styles.textInput}
					placeholder="Type your note here..."
					multiline
					value={noteDetails.note}
					onChangeText={setNote}
				/>
				<View style={styles.buttonRow}>
					{/* <ThemedButton
						title="Cancel"
						onPress={() => resetNote()}
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
					/> */}
					<ThemedButton
						title="Save Note"
						onPress={handleSaveNote}
						style={{
							width: "100%",
							borderRadius: 32,
						}}
						textStyle={{
							fontWeight: "500",
							fontSize: 14,
						}}
					/>
				</View>
			</View>
			{mutation.isPending && <Loader />}
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
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
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
	collaboratorsRow: {
		backgroundColor: "#E8E8E8",
		width: 111,
		height: 26,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},

	collaboratorName: {
		fontSize: 10,
		fontWeight: "500",
		color: "#255A4E",
	},
});
