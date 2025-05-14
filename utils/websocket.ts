import { io, Socket } from "socket.io-client";

export class AuthSocketIO {
	private socket: Socket | null = null;
	private token: string;
	private url: string;
	private reconnectAttempts: number = 0;
	private maxReconnectAttempts: number = 5;
	private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

	constructor(url: string, token: string) {
		this.url = url;
		this.token = token;
	}

	connect(
		onConnect?: () => void,
		onMessage?: (data: any) => void,
		onError?: (error: any) => void,
		onDisconnect?: () => void
	) {
		this.socket = io(this.url, {
			transports: ["websocket"],
			extraHeaders: {
				Authorization: `Bearer ${this.token}`,
			},
		});

		this.socket.on("connect", () => {
			this.reconnectAttempts = 0;
			onConnect?.();
		});

		this.socket.on("received-message", (data: any) => {
			onMessage?.(data);
		});

		this.socket.on("connect_error", (error) => {
			console.error("Socket.IO connect error:", error);
			onError?.(error);
			this.handleReconnection(onConnect, onMessage, onError, onDisconnect);
		});

		this.socket.on("disconnect", () => {
			onDisconnect?.();
			this.handleReconnection(onConnect, onMessage, onError, onDisconnect);
		});
	}

	private handleReconnection(
		onConnect?: () => void,
		onMessage?: (data: any) => void,
		onError?: (error: any) => void,
		onDisconnect?: () => void
	) {
		if (this.reconnectAttempts < this.maxReconnectAttempts) {
			this.reconnectAttempts++;
			const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

			this.reconnectTimeout = setTimeout(() => {
				console.log(
					`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
				);
				this.connect(onConnect, onMessage, onError, onDisconnect);
			}, delay);
		}
	}

	send(event: string, data: any) {
		if (this.socket?.connected) {
			this.socket.emit(event, data);
			return true;
		}
		return false;
	}

	close() {
		if (this.reconnectTimeout) {
			clearTimeout(this.reconnectTimeout);
		}
		this.socket?.disconnect();
	}

	get isConnected() {
		return !!this.socket?.connected;
	}
}
