import { create } from "zustand";

interface MedicationState {
	healthProgress: number; // Progress value between 0 and 1
	setHealthProgress: (progress: number) => void; // Setter function
	addMedicationProgress: number;
	setAddMedicationProgress: (progress: number) => void; // Setter function
	addPrescriptionProgress: number;
	setPrescriptionProgress: (progress: number) => void; // Setter function
}

const useHealthStore = create<MedicationState>((set) => ({
	healthProgress: 0.5, // Initial progress value
	setHealthProgress: (progress) =>
		set(() => ({ healthProgress: Math.min(Math.max(progress, 0), 1) })), // Ensure progress stays between 0 and 1,
	addMedicationProgress: 0,
	setAddMedicationProgress: (progress) =>
		set(() => ({ addMedicationProgress: Math.min(Math.max(progress, 0), 1) })), // Ensure progress stays between 0 and 1,
	addPrescriptionProgress: 0,
	setPrescriptionProgress: (progress) =>
		set(() => ({ addMedicationProgress: Math.min(Math.max(progress, 0), 1) })), // Ensure progress stays between 0 and 1,
}));

export default useHealthStore;
