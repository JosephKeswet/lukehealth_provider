// store/useNoteStore.ts
import { create } from "zustand";

interface Patient {
	id: string;
	fullName: string;
}

interface NoteDetails {
	title: string;
	note: string;
	patientId: string | null;
	collaborators: Patient[];
}

interface NoteState {
	noteDetails: NoteDetails;
	selectedCollaboratorId: string | null;
	setTitle: (title: string) => void;
	setNote: (note: string) => void;
	setPatientId: (id: string) => void;
	setSelectedCollaboratorId: (id: string | null) => void;
	addCollaborator: (patient: Patient) => void;
	removeCollaborator: (id: string) => void;
	resetNote: () => void;
}

export const useNoteStore = create<NoteState>((set) => ({
	noteDetails: {
		title: "",
		note: "",
		patientId: null,
		collaborators: [],
	},
	selectedCollaboratorId: null,

	setTitle: (title) =>
		set((state) => ({
			noteDetails: { ...state.noteDetails, title },
		})),
	setNote: (note) =>
		set((state) => ({
			noteDetails: { ...state.noteDetails, note },
		})),
	setPatientId: (id) =>
		set((state) => ({
			noteDetails: { ...state.noteDetails, patientId: id },
		})),
	setSelectedCollaboratorId: (id) => set({ selectedCollaboratorId: id }),

	addCollaborator: (patient) =>
		set((state) => {
			if (!state.noteDetails.collaborators.some((c) => c.id === patient.id)) {
				return {
					noteDetails: {
						...state.noteDetails,
						collaborators: [...state.noteDetails.collaborators, patient],
					},
				};
			}
			return state;
		}),

	removeCollaborator: (id) =>
		set((state) => ({
			noteDetails: {
				...state.noteDetails,
				collaborators: state.noteDetails.collaborators.filter(
					(c) => c.id !== id
				),
			},
		})),

	resetNote: () =>
		set({
			noteDetails: {
				title: "",
				note: "",
				patientId: null,
				collaborators: [],
			},
			selectedCollaboratorId: null,
		}),
}));
