import { create } from "zustand";

interface PatientState {
	patientProgress: number; // Progress value between 0 and 1
	setPatientProgress: (progress: number) => void; // Setter function
}

const usePatientStore = create<PatientState>((set) => ({
	patientProgress: 0.2, // Initial progress value
	setPatientProgress: (progress) =>
		set(() => ({ patientProgress: Math.min(Math.max(progress, 0), 1) })), // Ensure progress stays between 0 and 1,
}));

export default usePatientStore;
