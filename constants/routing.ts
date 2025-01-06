export const routes = {
	signup: "index",
	home: "index",
	patient: "patient",
	chat: "chat",
	notes: "notes",
	note: "note/[id]", // dynamic route must be prefixed with the [id] parameter
	create_note: "create-note",
} as const;
