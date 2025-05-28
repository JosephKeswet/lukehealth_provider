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
	ScrollView,
	RefreshControl,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { MaterialIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useLocalSearchParams } from "expo-router";
import { useCustomQuery } from "@/frameworks/useCustomQuery";
import usePatientService from "@/services/usePatientService";
import { apiRoutes } from "@/constants/api";
import {
	IPatientHealthData,
	IPatientMedication,
	IPatientOverviewData,
} from "@/types/patient/responses";
import Loader from "@/components/Loader";
import { useQueryClient } from "@tanstack/react-query";

export default function Patient() {
	const [index, setIndex] = React.useState(0);
	const [refreshing, setRefreshing] = React.useState(false);
	const { getPatientOverview, getPatientMedication, getPatientHealthData } =
		usePatientService();
	const [routes] = React.useState([
		{ key: "first", title: "Overview" },
		{ key: "second", title: "Medications" },
		{ key: "third", title: "HealthData" },
		{ key: "fourth", title: "Docs" },
	]);
	const { id } = useLocalSearchParams();
	const { data: overviewData, isPending: isOverviewPending } = useCustomQuery({
		queryFn: () => getPatientOverview({ patientId: id as string }),
		queryKey: [apiRoutes.patients.get_patient_overview, id as string],
	});

	const { data: medicationData, isPending: isMedicationPending } =
		useCustomQuery({
			queryFn: () => getPatientMedication({ patientId: id as string }),
			queryKey: [apiRoutes.patients.get_patient_medication, id as string],
		});

	const { data: healthData, isPending: isHealthPending } = useCustomQuery({
		queryFn: () => getPatientHealthData({ patientId: id as string }),
		queryKey: [apiRoutes.patients.get_patient_health_data, id as string],
	});

	const overview = overviewData?.data as IPatientOverviewData;
	const medication = (medicationData?.data as IPatientMedication[]) ?? [];
	const health = healthData?.data as IPatientHealthData;
	console.log("overview", overview);
	const tabLoadingState: { [key: number]: boolean } = {
		0: isOverviewPending,
		1: isMedicationPending,
		2: isHealthPending,
	};

	const isCurrentTabLoading = tabLoadingState[index];

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
	const queryClient = useQueryClient();

	const onRefresh = async () => {
		setRefreshing(true);
		await Promise.all([
			queryClient.invalidateQueries({
				queryKey: [apiRoutes.patients.get_patient_overview, id],
			}),
			queryClient.invalidateQueries({
				queryKey: [apiRoutes.patients.get_patient_medication, id],
			}),
			queryClient.invalidateQueries({
				queryKey: [apiRoutes.patients.get_patient_health_data, id],
			}),
		]);
		setRefreshing(false);
	};
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<ScrollView
				style={{ flex: 1 }}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				{/* Profile Header */}
				<View style={styles.profileHeader}>
					<Image
						source={{ uri: "https://via.placeholder.com/100" }}
						style={styles.profileImage}
					/>
					<View style={styles.profileInfo}>
						<Text style={styles.profileName}>
							{overview?.fullName ?? "N/A"}
						</Text>
						<Text style={styles.profileDetails}>
							{overview?.email ?? "N/A"}
						</Text>
					</View>
					<TouchableOpacity onPress={openMenuSheet}>
						<MaterialIcons
							name="more-vert"
							size={24}
							color={Colors.primary.black}
						/>
					</TouchableOpacity>
				</View>

				{/* TabView */}
				<TabView
					navigationState={{ index, routes }}
					renderScene={SceneMap({
						first: () =>
							isOverviewPending ? <Loader /> : <Overview data={overview} />,
						second: () =>
							isMedicationPending ? (
								<Loader />
							) : (
								<Medications
									data={medication}
									id={id as string}
								/>
							),
						third: () =>
							isHealthPending ? <Loader /> : <HealthData data={health} />,
						fourth: Docs,
					})}
					onIndexChange={setIndex}
					initialLayout={{ width: 100 }}
					renderTabBar={renderTabBar}
					style={styles.tabView}
				/>
			</ScrollView>

			{/* RBSheet remains outside ScrollView */}
			<RBSheet
				ref={menuSheetRef}
				height={150}
				openDuration={250}
				customStyles={{ container: styles.bottomSheetContainer }}
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
