import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CreateNoteForm from "@/features/notes/createNoteForm";

export default function CreateNote() {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "white",
			}}
		>
			<View
				style={{
					paddingHorizontal: 20,
					paddingTop: 50,
				}}
			>
				<CreateNoteForm />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
