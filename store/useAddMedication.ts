import { IAddMedication } from "@/types/health/payload";
import { create } from "zustand";

// in your Zustand store
interface HealthStore {
	medicationFormData: Partial<IAddMedication>;
	setMedicationFormData: (data: Partial<IAddMedication>) => void;
	addMedicationProgress: number;
	setAddMedicationProgress: (progress: number) => void;
	patientId: string;
	setPatientId: (patientId: string) => void;
}

const useAddMedicationStore = create<HealthStore>((set) => ({
	medicationFormData: {},
	patientId: "",
	setMedicationFormData: (data) =>
		set((state) => ({
			medicationFormData: { ...state.medicationFormData, ...data },
		})),
	addMedicationProgress: 0,
	setAddMedicationProgress: (progress) =>
		set({ addMedicationProgress: progress }),
	setPatientId: (patientId) => set({ patientId }),
}));

export default useAddMedicationStore;
