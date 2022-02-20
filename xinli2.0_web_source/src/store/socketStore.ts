import { defineStore } from 'pinia';

const ENV = import.meta.env;
interface ISocket {
	SOCKET: any;
}

interface Message {
	data?: string;
	datetime?: string;
	msgCode?: number;
	status?: string;
	statusCode?: number;
	traceid?: string;
}
interface Data {
	memberID?: string;
	cmd?: string;
	msg?: string;
}
const MANUALLY_COLSE = 3001;

export const SocketStore = defineStore({
	id: 'socket',

	state: (): ISocket => ({
		SOCKET: null,
	}),

	getters: {},

	actions: {
		connect(token: string) {
			const url = `${window.socketUrl}?token=${token}`;
			const socket = new WebSocket(url);
			let windowInterval: number;
			socket.onmessage = (evt) => {
				const message = JSON.parse(evt.data) as Message;
				const data = JSON.parse(message.data || '{}') as Data;
				console.log(`message received: member id = ${data.memberID}, cmd = ${data.cmd}, msg = ${data.msg}`);
			};
			socket.onopen = () => {
				let actions = { message: 'testMsg' };
				windowInterval = window.setInterval(() => {
					socket.send(JSON.stringify(actions));
				}, 50000);
			};
			socket.onerror = () => {};
			socket.onclose = (event) => {
				if (event.code != MANUALLY_COLSE) {
					this.connect(token);
				} else {
					clearInterval(windowInterval);
				}
			};
			this.SOCKET = socket;
		},
		close() {
			this.SOCKET?.close(MANUALLY_COLSE, 'manually close web socket');
		},
	},
});
