import { io } from "socket.io-client";

let isSocketConnected = false;
let socket;

const connectSocket = (userId) => {
    socket = io("http://localhost:5050", {
        auth: {
            userId
        }
    });
    socket.on("connect", () => {
        console.log("socket connection established.");
        isSocketConnected = true
    });
    socket.on("disconnect", () => isSocketConnected = true);
}

const disconnectSocket = (userId) => {
    if (isSocketConnected) {
        socket.emit("user_offline", { userId });
        socket.close();
        isSocketConnected = false;
    }
}

export { socket, isSocketConnected, connectSocket, disconnectSocket };