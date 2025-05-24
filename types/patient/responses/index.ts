import { BaseResponse } from "@/types";

export interface IPatientOverviewResponse extends BaseResponse {
	data: IPatientOverviewData;
}

export interface IPatientOverviewData {
	id: string;
	fullName: string;
	email: string;
	phone: string;
	dateOfBirth: string; // ISO date string
	medicalCondition: string;
	otherMedicalConditions: string[];
	age: number;
	vitals: Vitals | null; // assuming vitals may be another interface or null
}

export interface Vitals {
	// Define structure if available, otherwise keep empty or `any`
	[key: string]: any;
}

export interface IPatientMedication {
	id: string;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
	deletedAt: string | null;
	userId: string;
	drugVariantId: string;
	status: string | null;
	issueDate: string | null;
	tag: string | null;
	notes: string;
	dosage: number;
	frequencyOfUsage: string;
	dosageUnit: string;
	numberOfDays: number;
	form: string | null;
	route: string;
	diagnosis: string;
	prescribingClinic: string;
	startDate: string; // ISO date string
	endDate: string; // ISO date string
	streak: number;
	isCompleted: boolean;
	additionalDetails: string | null;
	prescriptionUrl: string;
	drug: string;
}

export interface IPatientMedicationResponse extends BaseResponse {
	data: IPatientMedication[];
}

export interface IPatientHealthData {
	id: string;
	fullName: string;
	email: string;
	bloodGroup: string;
	genoType: string;
	weight: string;
	allergies: any[]; // Can specify more if you know the structure
	otherMedicalConditions: any[]; // Same as above
	medicalCondition: string;
}

export interface IPatientHealthDataResponse {
	data: IPatientHealthData;
}

export interface ISearchPatientResponse extends BaseResponse {
	data: {
		id: string;
		fullName: string;
		email: string;
		phone: string | null;
		dateOfBirth: string | null;
		stateOfResidence: string | null;
		address: string | null;
		prescribingDoctorContact: string | null;
		emergencyContact: string | null;
	};
}
