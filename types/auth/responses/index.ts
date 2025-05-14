import { BaseResponse } from "@/types";

export interface ISignUpResponse extends BaseResponse {
	token: string;
	data: {
		otp: number;
	};
}

export interface IVerifyEmailResponse extends BaseResponse {
	password: string;
	token: string;
	refreshToken: string;
}

export interface IAddPasswordResponse extends BaseResponse {
	data: {
		userId: string;
	};
	token: string;
	refreshToken: string;
}

export interface ISignInResponse extends BaseResponse {
	data: {};
	token: string;
	refreshToken: string;
}

export interface IResendOtpResponse extends BaseResponse {}

export interface IRefreshTokenResponse extends BaseResponse {
	data: {};
	token: string;
	refreshToken: string;
}

export interface IForgotPasswordResponse extends BaseResponse {}

export interface IResetPassVerifyResponse extends BaseResponse {}
