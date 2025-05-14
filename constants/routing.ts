export const routes = {
	signup: "index",
	signin: "signin",
	verify_email: "verify-email",
	verify_account: "verify-account",
	reset_password: "reset-password",
	create_password: "create-password",
	forgot_password: "forgot-password",
	push_notification: "push-notification",
	home: "index",
	patients: "patients",
	patient: "patient/[id]",
	chat: "chat/[id]",
	chats: "chat",
	notes: "notes",
	note: "note/[id]", // dynamic route must be prefixed with the [id] parameter
	create_note: "create-note",
	note_create: "create/[id]", // dynamic route must be prefixed with the [id] parameter
	add_patient: "add-patient",
} as const;
