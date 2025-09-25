import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8007";

export function createSocket(token) {
    return io(SOCKET_URL, {
        autoConnect: false, // on peut choisir de ne pas connecter directement
        auth: {
            token: token || null,
        }
    });
}
