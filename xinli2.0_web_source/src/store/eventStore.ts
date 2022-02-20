import { defineStore } from 'pinia';
import { getEventAnnouncement, getEventLetterList, getEventBanner } from '@/api';
import type {
	EVENTAJAX_GetAnnouncementResponseData,
	EVENTAJAX_GetBannerResponseData,
	EVENTAJAX_GetLetterResponseData,
} from '@/api/model';

interface IEvent {
	announcementList: EVENTAJAX_GetAnnouncementResponseData[];
	letterList: EVENTAJAX_GetLetterResponseData[];
	unReadCount: number;
	banner_1: EVENTAJAX_GetBannerResponseData[];
	banner_2: EVENTAJAX_GetBannerResponseData[];
	banner_3: EVENTAJAX_GetBannerResponseData[];
	banner_4: EVENTAJAX_GetBannerResponseData[];
	banner_5: EVENTAJAX_GetBannerResponseData[];
}

export const EventStore = defineStore({
	id: 'setting',
	state: (): IEvent => ({
		announcementList: [],
		letterList: [],
		unReadCount: 0,
		banner_1: [],
		banner_2: [],
		banner_3: [],
		banner_4: [],
		banner_5: [],
	}),
	actions: {
		async getEventAnnouncementList() {
			const res = await getEventAnnouncement();
			this.announcementList = res?.data?.data?.list || [];
		},
		async getEventLetterListAction() {
			const payload = { page: 1, pageSize: 20 };
			const res = await getEventLetterList(payload);
			this.letterList = res?.data?.data?.list || [];
			const unReadCount = res?.data?.data?.list?.filter((item: any) => item.status === 2).length;
			this.unReadCount = unReadCount || 0;
		},
		async getIndexPageBanner() {
			const banner_1 = await getEventBanner({ categortyID: 3 });
			const banner_2 = await getEventBanner({ categortyID: 4 });
			const banner_3 = await getEventBanner({ categortyID: 5 });
			const banner_4 = await getEventBanner({ categortyID: 6 });
			const banner_5 = await getEventBanner({ categortyID: 7 });
			this.banner_1 = banner_1.data.data?.list || [];
			this.banner_2 = banner_2.data.data?.list || [];
			this.banner_3 = banner_3.data.data?.list || [];
			this.banner_4 = banner_4.data.data?.list || [];
			this.banner_5 = banner_5.data.data?.list || [];
		},
	},
});
