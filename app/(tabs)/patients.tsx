import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { SearchComponent } from "@/components/SearchComponent";
import EmptyPatientState from "@/components/EmptyPatientState";
import { FloatingActionButton } from "@/components/FloatingActionButton";

export default function PatientScreen() {
	const items = [
		"Kate Tanner",
		"Rick Wright",
		"Sarah Landlin",
		"Devon Miles",
		"Sandra Thompson",
	];

	const handleSearchResult = (results: string[]) => {
		console.log("Filtered Results:", results);
	};

	const bottomSheetRef = useRef<any>(null);

	const openBottomSheet = () => bottomSheetRef.current?.open();
	const closeBottomSheet = () => bottomSheetRef.current?.close();

	return (
		<View
			style={{
				backgroundColor: "white",
				height: "100%",
			}}
		>
			<SearchComponent
				data={items}
				onSearchResult={handleSearchResult}
			/>
			{/* <EmptyPatientState /> */}
			{/* <FloatingActionButton onPress={openBottomSheet} /> */}
		</View>
	);
}

const styles = StyleSheet.create({});
