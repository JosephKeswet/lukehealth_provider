export interface IRetrieveChatMessages {
	recipientId: string;
}

export interface IJoinRoom {
	recipientId: string;
}

export interface ISendChat {
	message: string;
	recipientId: string;
}
