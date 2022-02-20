import Vuex from 'vuex';
import user from '@/store/modules/user';
import config from '@/store/modules/config';
import tasks from '@/store/modules/tasks';
import socket from '@/store/modules/socket';
import game from '@/store/modules/game';

export default Vuex.createStore({
	modules: {
		user,
		config,
		tasks,
		socket,
		game,
	},
});
