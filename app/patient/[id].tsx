import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function Patient() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Patient {id}</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
