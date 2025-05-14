import { ComplianceStatusEnum } from "@/constants/enums";
import { BaseResponse } from "@/types";

export interface IHealthInfoResponse extends BaseResponse {}

export interface IVital {
	id: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	bloodPressure: string;
	bloodSugar: string;
	time: string;
	date: string;
	bloodPressureStatus: string | null;
	bloodSugarStatus: string | null;
	pulse: string;
}

export interface Prescription {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	userId: string;
	drugVariantId: string;
	status: string | null;
	issueDate: string | null;
	tag: string | null;
	drug: string;
	notes: string | null;
	dosage: number;
	frequencyOfUsage: string;
	dosageUnit: string | null;
	numberOfDays: number | null;
	form: string | null;
	route: string;
	diagnosis: string;
	prescribingClinic: string;
	startDate: string;
	endDate: string;
	isCompleted: boolean;
	additionalDetails: string;
	prescriptionUrl: string;
	compliances: any[]; // Adjust the type if compliances have a specific structure
	dose: string;
}

export interface IGetMedicationsResponse extends BaseResponse {
	data: Prescription[];
}

export interface IGetCompletedMedicationsResponse extends BaseResponse {
	data: {
		medications: Prescription[];
	};
}

export interface ICompliance {
	id: string;
	userId: string;
	medicationId: string;
	date: string;
	status: ComplianceStatusEnum;
	doseTime: string;
}

export interface IMarkComplianceResponse extends BaseResponse {}

export interface IVitalsResponse extends BaseResponse {
	data: IVital[];
}
