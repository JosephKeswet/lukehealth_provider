export enum PatientCategoryStatus {
	OlderAdult = "I’m an Older Adult (65+)",
	ChronicCondition = "I have a chronic condition",
	MultipleMedications = "I’m taking multiple medications",
	RecentlyDischarged = "I just got discharged",
}

export enum UserCategory {
	Patient = "Patient",
	Provider = "Provider",
}

export enum GenderCategory {
	Male = "Male",
	Female = "Female",
}

export enum YesOrNoCategory {
	Yes = "Yes",
	No = "No",
}

export enum DoseType {
	Amartem = "Amartem Softgel",
	Aspirin = "Aspirin Tablet",
	Paracetamol = "Paracetamol Tablet",
	Ibuprofen = "Ibuprofen Tablet",
}

export const doseDetails = {
	[DoseType.Amartem]: {
		time: "10:00 PM",
		dose: "1 tablet per dose",
	},
	[DoseType.Aspirin]: {
		time: "8:00 AM",
		dose: "1 tablet per dose",
	},
	[DoseType.Paracetamol]: {
		time: "12:00 PM",
		dose: "1 tablet per dose",
	},
	[DoseType.Ibuprofen]: {
		time: "6:00 PM",
		dose: "2 tablets per dose",
	},
};

export enum ResponseState {
	Success = "success",
	Error = "error",
}
