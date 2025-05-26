import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { SelectList } from "react-native-dropdown-select-list";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";
import { PlusRoundedIcon, XIcon } from "@/constants/icons";
import { router } from "expo-router";
import { useCustomMutation } from "@/frameworks/useCustomMutation";
import useNote from "@/hooks/mutations/useNote";
import useNoteService from "@/services/useNoteService";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import usePatientService from "@/services/usePatientService";
import { apiRoutes } from "@/constants/api";
import Loader from "@/components/Loader";
import { useNoteStore } from "@/store/useNoteStore";

export default function CreateNoteForm() {
	const { getPatients } = usePatientService();
	const { data } = useCustomQuery({
		queryFn: getPatients,
		queryKey: [apiRoutes.patients.get_provider_patients],
	});

	const patientOptions =
		data?.data?.map((patient: any) => ({
			key: patient.id,
			value: patient.fullName,
		})) || [];

	const {
		noteDetails,
		selectedCollaboratorId,
		setTitle,
		setNote,
		setPatientId,
		setSelectedCollaboratorId,
		addCollaborator,
		removeCollaborator,
		resetNote,
	} = useNoteStore();

	function handleAddCollaborator() {
		const selectedPatient = data?.data.find(
			(p: any) => p.id === selectedCollaboratorId
		);
		if (selectedPatient) addCollaborator(selectedPatient);
	}

	const handleCreateNote = () => {
		if (!noteDetails.title || !noteDetails.patientId) {
			alert("Please fill all required fields.");
			return;
		}

		router.push("/confirm-note");
	};

	return (
		<View style={styles.container}>
			<ThemedText style={styles.header}>Create New Note</ThemedText>

			<View style={styles.imageWrapper}>
				<Image
					source={require("@/assets/images/empty-note.png")}
					style={{ width: 62, height: 62 }}
				/>
			</View>

			<View style={styles.form}>
				<ThemedInput
					style={styles.input}
					value={noteDetails.title}
					onChangeText={setTitle}
					placeholder="Enter a title for your note"
					label="Title/Reason for note"
				/>

				{/* <ThemedInput
					style={styles.input}
					isMultiline
					value={noteDetails.note}
					onChangeText={setNote}

					placeholder="Enter a note"
					label="Note"
				/> */}

				<View>
					<ThemedText style={styles.labelText}>Select patient</ThemedText>
					<SelectList
						setSelected={setPatientId}
						data={patientOptions}
						save="key"
						boxStyles={styles.selectBox}
					/>
				</View>

				<View>
					<ThemedText style={styles.labelText}>Collaborators</ThemedText>
					<SelectList
						setSelected={setSelectedCollaboratorId}
						data={patientOptions}
						save="key"
						boxStyles={styles.selectBox}
					/>
				</View>

				<View style={styles.collaboratorRow}>
					<ThemedButton
						onPress={handleAddCollaborator}
						title="Collaborate"
						style={styles.collabButton}
						textStyle={{ fontSize: 12, color: Colors.primary.color }}
						icon={<PlusRoundedIcon />}
					/>
					<View style={styles.collaborators}>
						{noteDetails.collaborators.map((collab) => (
							<View
								key={collab.id}
								style={styles.collabChip}
							>
								<View style={styles.avatarCircle} />
								<ThemedText>{collab.fullName}</ThemedText>
								<Pressable
									onPress={() => removeCollaborator(collab.id)}
									style={{ marginLeft: 8 }}
								>
									<XIcon />
								</Pressable>
							</View>
						))}
					</View>
				</View>
			</View>

			<View style={styles.footer}>
				<ThemedButton
					onPress={() => router.back()}
					title="Cancel"
					style={styles.cancelButton}
					textStyle={{ fontSize: 16, color: Colors.primary.black }}
				/>
				<ThemedButton
					onPress={handleCreateNote}
					title="Create note"
					style={styles.createButton}
					textStyle={{ fontSize: 16, color: "white" }}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingTop: 16,
		borderRadius: 8,
		marginBottom: 16,
		borderColor: "#DADADA",
		borderWidth: 1,
	},
	header: {
		textAlign: "center",
		fontSize: 16,
		color: "#111111",
	},
	imageWrapper: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 20,
	},
	form: {
		flexDirection: "column",
		gap: 16,
		paddingHorizontal: 20,
	},
	input: {
		backgroundColor: "#F8F8F8",
		padding: 10,
		borderRadius: 8,
		marginBottom: 8,
	},
	labelText: {
		fontSize: 14,
		fontWeight: "400",
		marginBottom: 6,
		color: Colors.primary.black,
	},
	selectBox: {
		borderRadius: 8,
		borderColor: Colors.light.border,
		borderWidth: 1,
		backgroundColor: "transparent",
	},
	collaboratorRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	collabButton: {
		width: 118,
		height: 36,
		backgroundColor: "#EBFBF4",
	},
	collaborators: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	collabChip: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#E7E7FF",
		borderRadius: 32,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	avatarCircle: {
		width: 28,
		height: 28,
		backgroundColor: Colors.primary.color,
		borderRadius: 100,
		marginRight: 6,
	},
	footer: {
		backgroundColor: "#F8F8F8",
		height: 76,
		borderBottomRightRadius: 8,
		borderBottomLeftRadius: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 12,
		gap: 16,
	},
	cancelButton: {
		width: "45%",
		height: 44,
		backgroundColor: "white",
		borderRadius: 32,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#E8E8E8",
	},
	createButton: {
		width: "45%",
		height: 44,
		backgroundColor: Colors.primary.color,
		borderRadius: 32,
		justifyContent: "center",
		alignItems: "center",
	},
});
