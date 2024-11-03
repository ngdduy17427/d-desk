import { Socket, io } from "socket.io-client";

export class GameSocket {
  socket: Socket | undefined;

  init(): void {
    this.socket = io(String(process.env.NEXT_PUBLIC_SERVER_SOCKET_URL), {
      upgrade: false,
      transports: ["websocket"],
      reconnection: false,
    });
  }
  destroy(): void {
    this.socket?.disconnect();
  }

  on(event: string, listener: (...args: any) => void): void {
    this.socket?.on(event, listener);
  }
  emit(event: string, ...args: any): void {
    this.socket?.emit(event, ...args);
  }
}
