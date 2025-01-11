import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
// import VoiceCallItem from "@/patient/features/home/VoiceCallItem";
import RBSheet from "react-native-raw-bottom-sheet";
import { useBottomSheet } from "@/hooks/useBottomSheet";
// import ContactOptionSheet from "@/patient/features/home/ContactOptionSheet";
// import ChatItem from "@/patient/features/chat/ChatItem";
import { router } from "expo-router";
import ChatItem from "@/features/chat/ChatItem";
import ContactOptionSheet from "@/features/home/ContactOptionSheet";

const { height } = Dimensions.get("window");
export default function ChatMainScreen() {
	const {
		sheetRef: callSheetRef,
		openSheet: openCallSheet,
		closeSheet: closeCallSheet,
	} = useBottomSheet();
	const handleCallPress = () => {
		router.push(`/chat/${1}`);
		// openCallSheet();
	};

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<ChatItem
					name="Dr. Ama"
					onCallPress={handleCallPress}
				/>
				<ChatItem
					name="Edna"
					onCallPress={handleCallPress}
				/>
				<RBSheet
					ref={callSheetRef}
					height={250}
					openDuration={250}
					customStyles={{
						container: styles.bottomSheetContainer,
					}}
				>
					<ContactOptionSheet closeBottomSheet={closeCallSheet} />
				</RBSheet>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		backgroundColor: "white",
		height,
	},
	bottomSheetContainer: {
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "white",
	},
});
