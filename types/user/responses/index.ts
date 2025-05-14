import { BaseResponse } from "@/types";

export interface IGetAuthUser extends BaseResponse {
	data: {
		id: string;
		fullName: string;
		activePatients: number;
	};
}
export interface IGetProfileResponse extends BaseResponse {
	data: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		emailNotifications: boolean;
		pushNotifications: boolean;
		emailVerified: boolean;
		phoneVerified: boolean;
		weight: null;
		bloodPressure: null;
		bloodSugar: null;
		pulse: null;
	};
}
export interface IGetProfileDataResponse extends BaseResponse {
	data: {
		email: string;
		phone: null;
		firstName: string;
		lastName: string;
		dateOfBirth: string;
		address: null;
	};
}
export interface IGetHealthDataResponse extends BaseResponse {
	data: {
		bloodGroup: null;
		genoType: null;
		weight: null;
		allergies: string[];
		medicalCondition: "diabetes";
		otherMedicalConditions: [];
		lifestyleConditions: [];
		familyMedicalHistory: [];
		emergencyContact: string;
	};
}
export interface IToggleNotificationsResponse extends BaseResponse {}
export interface IUpdatePersonalInfoResponse extends BaseResponse {}
export interface IUpdateHealthlInfoResponse extends BaseResponse {}
export interface IChangePasswordResponse extends BaseResponse {}
