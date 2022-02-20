<template lang="pug">
//- 主播詳細資訊
.w-full.flex-grow.pt-4.pb-8.bg-anchor-detail
    //- 主播資訊
    .grid.grid-cols-anchor.items-center.gap-4.bg-white.p-4
        //- 頭像
        img.w-14.h-14.rounded-full.object-cover(:src='avatar', @error='errorAvatarImg')

        //- 資訊
        .flex.flex-col.items-stretch.overflow-hidden
            //- 等級與房號
            .flex.flex-row.items-center
                //- 等級
                img.h-3(:src='anchorLevel || ""', @error='errorLevelImg')

                //- 房號
                .text-uid.text-xs.ml-2 房号 {{ uid }}

            //- 暱稱
            .text-name.text-lg.font-bold.mt-1 {{ anchorName }}

            //- 簽名
            .text-signature.text-xs.mt-1 {{ signature }}

        //- 關注按鈕
        van-button.w-8.h-8.p-2.shadow.rounded-full(:class='{ "bg-followed": isattent }', :loading='attentLoading', @click='clickFollow')
            img.w-full.h-full(v-if='isattent', src='/publicAssets/img/room/icon-heart-white@3x.png')
            img.w-full.h-full(v-else, src='/publicAssets/img/room/icon-heart@3x.png')
            template(#loading)
                van-loading.w-full.h-full(v-if='isattent', type='spinner', color='#ffffff')
                van-loading.w-full.h-full(v-else, type='spinner', color='#a62337')

    //- 直播間資訊
    .grid.grid-cols-2.gap-2.justify-center.items-center.bg-white.p-4
        //- 熱度
        .flex.flex-col.items-center
            .text-header.text-sm.font-bold {{ heat }}
            .text-value.text-sm.mt-1  热度

        //- 粉絲數
        .flex.flex-col.items-center
            .text-header.text-sm.font-bold {{ fans }}
            .text-value.text-sm.mt-1  粉丝关注

    //- 主播排行榜
    .flex.flex-col.bg-white.p-4.mt-2
        //- 標題
        .flex.flex-row.items-center
            img.w-4.h-4(src='/publicAssets/img/room/icon-rank@3x.png')
            .text-header.text-sm.font-bold.ml-2 主播排行榜

        //- 排行
        .grid.grid-cols-2.gap-2.mt-2
            //- 富豪排名
            .flex.flex-col
                .text-rank.text-sm 主播富豪榜排名
                .text-rank.text-3xl.font-bold.mt-1 no.{{ zillionaireRank }}

            //- 明星排名
            .flex.flex-col
                .text-rank.text-sm 主播明星榜排名
                .text-rank.text-3xl.font-bold.mt-1 no.{{ starRank }}

    //- 預約賽事
    .flex.flex-col.bg-white.p-4.mt-2
        //- 標題
        .flex.flex-row.items-center
            img.w-4.h-4(src='/publicAssets/img/room/field-h@3x.png')
            .text-header.text-sm.font-bold.ml-2 主播预约赛事

        //- 暫無預約賽事
        .mt-2(v-if='isAppointmentEmpty')
            .text-empty.text-sm 暂无预约赛事

        //- 賽事列表
        .mt-2(v-else)
            appointment-item(v-for='item in appointmentList', :item='item')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { commaFormat } from '@/utils';
import { matomo_room_follow, matomo_room_unfollow } from '@/matomoTrackEvent.js';
import appointmentItem from '@/components/room/appointmentItem.vue';

export default {
    components: {
        appointmentItem,
    },
	setup() {
        // Vuex store
        const store = useStore();

		// 是否為登入狀態
		const isLogin = computed(() => {
			return store.getters['user/IS_LOGIN'];
		});

		// 主播頭像
		const avatar = computed(() => {
			return store?.state?.socket?.anchorInfo?.avatar || '';
		});

		// 主播等級圖片
		const anchorLevel = computed(() => {
			const levelAnchor = store?.state?.socket?.anchorInfo?.level_anchor || 1;
			const levelAnchorList = store?.state?.config?.levelanchor || [];
			return levelAnchorList.find((element) => element.levelid === levelAnchor)?.thumb || '';
		});

        // 房號
        const uid = computed(() => {
            return store?.state?.socket?.uid || '';
        });

		// 主播名稱
		const anchorName = computed(() => {
			return store?.state?.socket?.anchorInfo?.user_nicename || '';
		});

        // 主播簽名
        const signature = computed(() => {
            return store?.state?.socket?.anchorInfo?.signature || '暂无签名';
        });

		// 是否正在關注/取消關注主播
		const attentLoading = computed(() => {
			return store?.state?.socket?.attentLoading === true;
		});

		// 是否關注主播
		const isattent = computed(() => {
			return store?.state?.socket?.isattent === 1;
		});

        // 熱度
        const heat = computed(() => {
            try {
                return commaFormat(store?.state?.socket?.heatInfo?.room_heat || 0);
            } catch (e) {
                return store?.state?.socket?.heatInfo?.room_heat || 0;
            }
        });

        // 粉絲數
        const fans = computed(() => {
            try {
                return commaFormat(store?.state?.socket?.roomInfo?.fans || 0);
            } catch (e) {
                return store?.state?.socket?.roomInfo?.fans || 0;
            }
        });

        // 主播富豪榜排名
        const zillionaireRank = computed(() => {
            return store?.state?.socket?.rankInfo?.zillionaire_rank || '';
        });

        // 主播明星榜排名
        const starRank = computed(() => {
            return store?.state?.socket?.rankInfo?.star_rank || '';
        });

        // 主播預約賽事
        const appointmentList = computed(() => {
            return store?.state?.socket?.appointmentList || [];
        });

		// 主播預約賽事是否為空
		const isAppointmentEmpty = computed(() => {
			return !appointmentList.value || appointmentList.value.length === 0;
		});

		// 頭像圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/default-level@3x.png';
		};

		// 點擊關注按鈕
		const clickFollow = () => {
			// Validate login state
			if (!isLogin.value) {
				window.localStorage.setItem('tempUrl', route.path);
				router.push('/login');
				return;
			}

			// Previous attent state
			const prevIsattent = isattent.value === 1;

			// Set attent
			store.dispatch('socket/SET_ATTENT')

			// Matomo track
			const anchorName = store?.state?.socket?.anchorInfo?.user_nicename || '';
			const anchorUid = store?.state?.socket?.anchorInfo?.id || '';
			if (prevIsattent) {
				matomo_room_unfollow(anchorName, anchorUid);
			} else {
				matomo_room_follow(anchorName, anchorUid);
			}
		};
		return {
            avatar,
            anchorName,
            anchorLevel,
            signature,
            uid,
            heat,
            fans,
            attentLoading,
            isattent,
            zillionaireRank,
            starRank,
            appointmentList,
			isAppointmentEmpty,
            errorAvatarImg,
            errorLevelImg,
            clickFollow,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-anchor-detail {
	background: #fafafa;
}
.grid-cols-anchor {
    grid-template-columns: auto 1fr auto;
}
.text-uid {
    color: #AFAFAF;
}
.text-name {
    color: #191919;
}
.bg-followed {
	background: #f8b62d;
}
.text-header {
	color: #303133;
}
.text-value {
	color: #909399;
}
.text-rank {
	color: #A62337;
}
.text-empty {
	color: #909399;
}
</style>