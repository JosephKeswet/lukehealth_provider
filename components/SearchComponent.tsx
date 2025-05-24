import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { ThemedInput } from "./ThemedInput"; // Import your ThemedInput component
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import { MessageIcon, PhoneIcon } from "@/constants/icons";
import { router } from "expo-router";

interface SearchComponentProps {
	data: { fullName: string; id: string }[]; // Array of items to search from
	onSearchResult?: (results: string[]) => void; // Callback to pass filtered results
}

export const SearchComponent = ({
	data,
	onSearchResult,
}: SearchComponentProps) => {
	const [searchQuery, setSearchQuery] = useState("");

	// const handleSearch = (query: string) => {
	// 	setSearchQuery(query);
	// 	const filteredData = data.filter((item) =>
	// 		item.toLowerCase().includes(query.toLowerCase())
	// 	);
	// 	if (onSearchResult) {
	// 		onSearchResult(filteredData); // Notify parent of the filtered results
	// 	}
	// };

	return (
		<View style={styles.container}>
			{/* <ThemedInput
				placeholder="Search for patients"
				value={searchQuery}
				onChangeText={handleSearch}
				style={{
					borderColor: "#F4F6F8",
					borderRadius: 24,
				}}
			/> */}
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<Pressable
						onPress={() => router.push(`/patient/${item.id}`)}
						style={styles.resultItem}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 10,
							}}
						>
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
							<View>
								<ThemedText style={styles.resultText}>
									{item.fullName}
								</ThemedText>
								<ThemedText
									style={{
										fontSize: 11,
										color: "#808080",
										fontWeight: "500",
									}}
								>
									54,61kg
								</ThemedText>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								gap: 10,
							}}
						>
							<PhoneIcon />
							<MessageIcon />
						</View>
					</Pressable>
				)}
			/>
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
		height: 72,
		marginVertical: 8,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 8,
	},
	resultText: {
		fontSize: 16,
		color: Colors.primary.black,
	},
});
