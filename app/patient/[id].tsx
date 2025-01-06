import { Colors } from "@/constants/Colors";
import HealthData from "@/features/patient/HealthData";
import Medications from "@/features/patient/Medications";
import Overview from "@/features/patient/Overview";
import React, { useRef } from "react";
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { MaterialIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { useBottomSheet } from "@/hooks/useBottomSheet";

export default function Patient() {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "first", title: "Overview" },
		{ key: "second", title: "Medications" },
		{ key: "third", title: "HealthData" },
		{ key: "fourth", title: "Docs" },
	]);

	// Bottom sheet references and methods from useBottomSheet
	const {
		sheetRef: menuSheetRef,
		openSheet: openMenuSheet,
		closeSheet: closeMenuSheet,
	} = useBottomSheet();

	// Custom TabBar for styling
	const renderTabBar = (props: any) => (
		<TabBar
			{...props}
			tabStyle={{
				width: "auto",
			}}
			style={styles.tabBar}
			indicatorStyle={styles.indicator}
			labelStyle={styles.label}
			activeColor={Colors.primary.color}
			inactiveColor="#808080"
		/>
	);

	// Custom scene for the Docs tab
	const Docs = () => (
		<View style={{ flex: 1, backgroundColor: "white" }}>
			<Text>Docs Tab Content</Text>
		</View>
	);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			{/* Profile Header */}
			<View style={styles.profileHeader}>
				<Image
					source={{ uri: "https://via.placeholder.com/100" }} // Replace with the actual profile image URL
					style={styles.profileImage}
				/>
				<View style={styles.profileInfo}>
					<Text style={styles.profileName}>John Doe</Text>
					<Text style={styles.profileDetails}>tienlapspktnd@gmail.com</Text>
				</View>

				{/* Ellipsis Icon */}
				<TouchableOpacity onPress={openMenuSheet}>
					<MaterialIcons
						name="more-vert"
						size={24}
						color={Colors.primary.black}
					/>
				</TouchableOpacity>
			</View>

			{/* RBSheet for the menu */}
			<RBSheet
				ref={menuSheetRef}
				height={150}
				openDuration={250}
				customStyles={{
					container: styles.bottomSheetContainer,
				}}
			>
				<View style={styles.menuContainer}>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => alert("Chat With Patient")}
					>
						<Text style={styles.menuText}>Chat With Patient</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => alert("Call patient")}
					>
						<Text style={styles.menuText}>Call patient</Text>
					</TouchableOpacity>
				</View>
			</RBSheet>

			{/* TabView */}
			<TabView
				navigationState={{ index, routes }}
				renderScene={SceneMap({
					first: Overview,
					second: Medications,
					third: HealthData,
					fourth: Docs,
				})}
				onIndexChange={setIndex}
				initialLayout={{ width: 100 }}
				renderTabBar={renderTabBar}
				style={styles.tabView}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	tabView: {
		backgroundColor: "white",
	},
	tabBar: {
		backgroundColor: "white",
	},
	indicator: {
		backgroundColor: Colors.primary.color,
	},
	label: {
		color: "#3A8289",
		fontSize: 12,
	},
	profileHeader: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		justifyContent: "space-between",
	},
	profileImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 16,
	},
	profileInfo: {
		flex: 1,
	},
	profileName: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.primary.black,
		lineHeight: 24,
	},
	profileDetails: {
		fontSize: 13,
		color: "#666666",
		lineHeight: 18,
		paddingTop: 4,
		paddingBottom: 8,
	},
	bottomSheetContainer: {
		backgroundColor: "white",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		padding: 16,
	},
	menuContainer: {
		flex: 1,
	},
	menuItem: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#EEE",
	},
	menuText: {
		fontSize: 16,
		color: Colors.primary.black,
	},
});
