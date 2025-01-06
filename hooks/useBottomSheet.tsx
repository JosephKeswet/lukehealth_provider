import { useRef } from "react";

export function useBottomSheet() {
	const sheetRef = useRef<any>(null);

	const openSheet = () => sheetRef.current?.open();
	const closeSheet = () => sheetRef.current?.close();

	return { sheetRef, openSheet, closeSheet };
}
