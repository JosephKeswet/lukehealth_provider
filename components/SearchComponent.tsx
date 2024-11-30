import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { ThemedInput } from "./ThemedInput"; // Import your ThemedInput component
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

interface SearchComponentProps {
	data: string[]; // Array of items to search from
	onSearchResult?: (results: string[]) => void; // Callback to pass filtered results
}

export const SearchComponent = ({
	data,
	onSearchResult,
}: SearchComponentProps) => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		const filteredData = data.filter((item) =>
			item.toLowerCase().includes(query.toLowerCase())
		);
		if (onSearchResult) {
			onSearchResult(filteredData); // Notify parent of the filtered results
		}
	};

	return (
		<View style={styles.container}>
			<ThemedInput
				placeholder="Search for patients"
				// label="Search"
				value={searchQuery}
				onChangeText={handleSearch}
				style={{
					borderColor: "#F4F6F8",
				}}
				borderRadius={24}
				// lightColor={Colors.primary.lightGray}
				// darkColor={Colors.primary.darkGray}
			/>
			{searchQuery !== "" && (
				<FlatList
					data={data.filter((item) =>
						item.toLowerCase().includes(searchQuery.toLowerCase())
					)}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<View style={styles.resultItem}>
							<View
								style={{
									width: 32,
									height: 32,
									borderRadius: 16,
									backgroundColor: Colors.primary.color,
									justifyContent: "center",
									alignItems: "center",
								}}
							></View>
							<ThemedText style={styles.resultText}>{item}</ThemedText>
						</View>
					)}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	resultItem: {
		padding: 16,
		borderWidth: 1,
		borderColor: "#F6F6F6",
		width: "100%",
		height: 56,
		marginVertical: 8,
		flexDirection: "row",
		gap: 12,
		alignItems: "center",
		borderRadius: 8,
	},
	resultText: {
		fontSize: 16,
		color: Colors.primary.black,
	},
});
