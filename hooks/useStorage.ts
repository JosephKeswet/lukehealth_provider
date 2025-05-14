import * as SecureStore from "expo-secure-store";
export function useStorage() {
	// Save access token
	const saveCookie = async (key: string, value: string) => {
		try {
			await SecureStore.setItemAsync(key, value);
			console.log(`${key} saved!`);
		} catch (error) {
			console.error(`Error saving ${key}:`, error);
		}
	};

	// Retrieve access token
	const getCookie = async (key: string) => {
		try {
			const token = await SecureStore.getItemAsync(key);
			return token as string;
		} catch (error) {
			console.error("Error retrieving :", error);
			return null;
		}
	};

	// Delete access token
	const deleteCookie = async (key: string) => {
		try {
			await SecureStore.deleteItemAsync(key);
			console.log("Access token deleted!");
		} catch (error) {
			console.error("Error deleting access token:", error);
		}
	};
	return { saveCookie, getCookie, deleteCookie };
}
