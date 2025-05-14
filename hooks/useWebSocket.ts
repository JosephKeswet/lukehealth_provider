import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL; //

export const useWebSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const newSocket = io(SOCKET_URL, {
			transports: ["websocket"], // Use WebSockets directly
		});

		newSocket.on("connect", () => {
			console.log("Connected to WebSocket Server");
		});

		newSocket.on("received-message", (message) => {
			console.log("Received message:", message);
		});

		newSocket.on("joined-room", (message) => {
			console.log("Joined room:", message);
		});

		newSocket.on("left-room", (message) => {
			console.log("Joined room:", message);
		});

		newSocket.on("typing-started", (message) => {
			console.log("Joined room:", message);
		});

		newSocket.on("typing-stopped", (message) => {
			console.log("Joined room:", message);
		});

		newSocket.on("seen", (message) => {
			console.log("Joined room:", message);
		});

		newSocket.on("disconnect", () => {
			console.log("Disconnected from WebSocket Server");
		});

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, []);

	return socket;
};
