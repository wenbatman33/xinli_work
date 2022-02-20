import { defineStore } from 'pinia';
import { UserStore } from '@/store/userStore';
import type { GAMEAJAX_GameGroupLobbyGameTypeListDTO } from '@/api/model';
import { SystemStore } from '@/store/systemStore';

import { gameLoing } from '@/api';
import { playGame } from '@/utils';

interface IGame {
	lobby: GAMEAJAX_GameGroupLobbyGameTypeListDTO[];
	gameList: any[];
	currentgameID: number | undefined;
}

export const GameStore = defineStore({
	id: 'game',
	state: (): IGame => ({
		lobby: [],
		gameList: [],
		currentgameID: undefined,
	}),
	actions: {
		setLobby(data: any): void {
			this.lobby = data || [];
		},
		gameLoingHandle(id: string, openWay: number, type: number | undefined) {
			gameLoing({ gameListID: id }).then((res) => {
				if (res.data.statusCode === 0) {
					playGame(res?.data.data?.url, openWay, type);
					const systemStore = SystemStore();
					systemStore.gamerRoomListModelVisabled = false;
				}
			});
		},
	},
});
