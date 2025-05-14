export interface ICreateNote {
	title: string;
	note: string;
	collaboratorIds?: string[];
	patientId: string;
}
