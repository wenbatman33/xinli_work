import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_WS_HOST, {
  autoConnect: false,
  forceNew: true,
});

export default socket;
