import { defineStore } from 'pinia';
import { LocalStorageKeys } from '@/utils/constants';

/**
 * Environment
 */
const ENV = import.meta.env;

/**
 * Code for manually close web socket
 */
const MANUALLY_COLSE = 3001;

/**
 * Socket message
 */
interface Message {
  data?: string;
  datetime?: string;
  msgCode?: number;
  status?: string;
  statusCode?: number;
  traceid?: string;
}

/**
 * Socket data
 */
interface Data {
  memberID?: string;
  cmd?: string;
  msg?: string;
}

/**
 * Socket store
 */
export const useSocketStore = defineStore({
  id: 'socket',
  state: () => {
    return {
      socket: undefined as WebSocket | undefined,
      keepAliveIntervalID: undefined as NodeJS.Timer | undefined,
    };
  },
  actions: {
    /**
     * Connect web socket
     */
    connect() {
      try {
        // Close old web socket
        this.close();

        // Retrieve token
        const token = window.localStorage.getItem(LocalStorageKeys.TOKEN);

        // Connect if token exists
        if (token != undefined && token.length > 0) {
          // Create new web socket
          const url = `${ENV.VITE_SOCKET_URL}?token=${token}`;
          const socket = new WebSocket(url);
          this.socket = socket;

          // Register message event listener
          socket.onmessage = (evt) => {
            const message = JSON.parse(evt.data) as Message;
            const data = JSON.parse(message.data || '{}') as Data;
            console.log(`message received: member id = ${data.memberID}, cmd = ${data.cmd}, msg = ${data.msg}`);
          };

          // Register close event listener
          socket.onclose = (evt) => {
            // Reconnect if connection interrupt and token is not changed
            if (evt.code != MANUALLY_COLSE) {
              setTimeout(() => {
                this.connect();
              }, 5000);
            }
          };

          // Clear previous keep alive interval
          if (this.keepAliveIntervalID) {
            clearInterval(this.keepAliveIntervalID);
          }

          // Sending data to keep alive
          this.keepAliveIntervalID = setInterval(() => {
            const data: Data = {
              cmd: 'keep-alive',
            };
            this.socket?.send(JSON.stringify(data));
          }, 50 * 1000);
        }
      } catch (e) {}
    },

    /**
     * Close web socket
     */
    close() {
      try {
        this.socket?.close(MANUALLY_COLSE, 'manually close web socket');
      } catch (e) {}
    },
  },
});
