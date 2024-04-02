import { io } from "socket.io-client";

let isSocketConnected = false;
const socket = io("http://localhost:5050");

socket.on("connect", () => isSocketConnected = true);

socket.on("disconnect", () => isSocketConnected = false);

export { socket, isSocketConnected };