export type IPatient = {
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
