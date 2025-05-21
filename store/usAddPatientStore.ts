// stores/useAddPatientStore.ts
import { IPatient } from "@/types/patient/payload";
import { create } from "zustand";

type PatientStore = {
	patient: IPatient;
	updateField: <K extends keyof IPatient>(field: K, value: IPatient[K]) => void;
	setPatient: (data: Partial<IPatient>) => void;
	reset: () => void;
};

const initialState: IPatient = {
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
