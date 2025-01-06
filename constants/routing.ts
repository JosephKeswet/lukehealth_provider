export const routes = {
	signup: "index",
	home: "index",
	patients: "patients",
	patient: "patient/[id]",
	chat: "chat",
	notes: "notes",
	note: "note/[id]", // dynamic route must be prefixed with the [id] parameter
	create_note: "create-note",
	note_create: "create/[id]", // dynamic route must be prefixed with the [id] parameter
} as const;
