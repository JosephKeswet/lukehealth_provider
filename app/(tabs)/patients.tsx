import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { SearchComponent } from "@/components/SearchComponent";
import EmptyPatientState from "@/components/EmptyPatientState";
import usePatientService from "@/services/usePatientService";
import { useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/constants/api";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
// import { FloatingActionButton } from "@/components/FloatingActionButton";

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

	const { getPatients } = usePatientService();
	const queryClient = useQueryClient();
	useEffect(() => {
		queryClient.invalidateQueries({
			queryKey: [apiRoutes.patients.get_provider_patients],
		});
	}, []);

	const { data, refetch } = useCustomQuery({
		queryFn: getPatients,
		queryKey: [apiRoutes.patients.get_provider_patients],
	});
	console.log(data);

	return (
		<View
			style={{
				backgroundColor: "white",
				height: "100%",
			}}
		>
			<SearchComponent
				data={data?.data}
				onSearchResult={handleSearchResult}
			/>
			{/* <EmptyPatientState /> */}
			{/* <FloatingActionButton onPress={openBottomSheet} /> */}
		</View>
	);
}

const styles = StyleSheet.create({});
