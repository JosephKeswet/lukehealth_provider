import { Colors } from "@/constants/Colors";
import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

export default function MedicationScreen() {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "first", title: "Ongoing" },
		{ key: "second", title: "Completed" },
	]);

	// Custom TabBar for styling
	const renderTabBar = (props: any) => (
		<TabBar
			{...props}
			style={styles.tabBar} // Apply custom background color
			indicatorStyle={styles.indicator} // Optional: Style the indicator
			labelStyle={styles.label} // Optional: Style the text
			activeColor={Colors.primary.color}
			inactiveColor="#808080"
		/>
	);

	function FirstItem() {
		return <View />;
	}

	function SecondItem() {
		return <View />;
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={SceneMap({
					// first: <FirstItem />,
					// second: <SecondItem />,
				})}
				onIndexChange={setIndex}
				initialLayout={{ width: 100 }}
				renderTabBar={renderTabBar} // Use custom TabBar
				style={styles.tabView}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	tabView: {
		backgroundColor: "white",
		// paddingHorizontal: 20,
	},
	tabBar: {
		backgroundColor: "white", // Blue background for the tab bar
	},
	indicator: {
		backgroundColor: Colors.primary.color, // Optional: White indicator for contrast
	},
	label: {
		// color: "white", // White text color for better visibility
		// fontWeight: "bold",
		color: "#3A8289", // White text color for better visibility
	},
});
