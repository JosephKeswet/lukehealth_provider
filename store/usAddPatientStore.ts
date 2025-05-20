// stores/useAddPatientStore.ts
import { create } from "zustand";

type Patient = {
	firstName: string;
	lastName: string;
	fullName: string; // computed from firstName + lastName
	email: string;
	phone: string;
	dateOfBirth: string;
	stateOfResidence: string;
	address: string;
	prescribingDoctorContact: string;
	emergencyContact: string;
	gender: "male" | "female" | string;
	weight: string;
	bloodGroup: string;
	genoType: string;
	medicalCondition: string;
	lifestyleConditions: string[];
	currentMedications: string[];
	takenHerbalMedications: boolean;
	dailyExercise: boolean;
};

type PatientStore = {
	patient: Patient;
	updateField: <K extends keyof Patient>(field: K, value: Patient[K]) => void;
	setPatient: (data: Partial<Patient>) => void;
	reset: () => void;
};

const initialState: Patient = {
	firstName: "",
	lastName: "",
	fullName: "",
	email: "",
	phone: "",
	dateOfBirth: "",
	stateOfResidence: "",
	address: "",
	prescribingDoctorContact: "",
	emergencyContact: "",
	gender: "",
	weight: "",
	bloodGroup: "",
	genoType: "",
	medicalCondition: "",
	lifestyleConditions: [],
	currentMedications: [],
	takenHerbalMedications: false,
	dailyExercise: false,
};

export const useAddPatientStore = create<PatientStore>((set) => ({
	patient: initialState,

	updateField: (field, value) => {
		set((state) => {
			// Update firstName or lastName, then compute fullName
			let newPatient = { ...state.patient, [field]: value };

			if (field === "firstName" || field === "lastName") {
				newPatient.fullName =
					`${newPatient.firstName} ${newPatient.lastName}`.trim();
			}

			return { patient: newPatient };
		});
	},

	setPatient: (data) =>
		set((state) => ({
			patient: {
				...state.patient,
				...data,
			},
		})),

	reset: () => set({ patient: initialState }),
}));
