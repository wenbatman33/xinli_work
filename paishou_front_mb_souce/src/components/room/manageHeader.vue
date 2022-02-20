<template lang="pug">
//- 管理彈窗表頭
.flex.flex-col.items-stretch
    //- 功能按鈕
    .flex.flex-row-reverse.justify-between.items-center
        //- 關閉按鈕
        van-button.w-8.h-8.p-1.rounded-full.bg-transparent.border-transparent(@click='clickClose')
            img.w-full.h-full.Object-contain(src='/publicAssets/img/icon-close-gray@3x.png')

        //- 返回按鈕
        van-button.w-8.h-8.p-1.rounded-full.bg-transparent.border-transparent(v-if='back', @click='clickBack')
            img.w-full.h-full.Object-contain(src='/publicAssets/img/room/icon-arrow-left-gray@3x.png')

    //- 用戶資訊
    .flex.flex-col.justify-center.items-center
        //- 頭像
        img.w-28.h-28.rounded-full.border-avatar.object-cover(:src='avatar', @error='errorAvatarImg')

        //- 等級
        img.h-4.mt-2.object-conatin(:src='level', @error='errorLevelImg')

        //- 暱稱
        .text-xs.text-uname.font-bold.mt-2 {{ uname }}
</template>
<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    props: {
        item: Object,
        back: Boolean,
    },
    emits: ['click-close', 'click-back'],
    setup(props, { emit }) {
		// Vuex store
		const store = useStore();

        // 用戶頭像圖片
        const avatar = computed(() => {
            return props?.item?.uhead || '';
        });

		// 用戶等級圖片
		const level = computed(() => {
			const levelId = props?.item?.level || 1;
			const levelList = store?.state?.config?.levelList || [];
			const levelItem = levelList.find((element) => element.levelid == levelId);
			return levelItem?.thumb || '';
		});

        // 用戶暱稱
        const uname = computed(() => {
            return props?.item?.uname || '';
        });

		// 用戶圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/default-level@3x.png';
		};
        
		// 點擊關閉
		const clickClose = () => {
			emit('click-close');
		};

        // 點擊返回
        const clickBack = () => {
            emit('click-back');
        };
        return {
            avatar,
			level,
            uname,
            errorAvatarImg,
            errorLevelImg,
            clickClose,
            clickBack,
        };
    },
};
</script>
<style lang="scss" scoped>
.border-avatar {
    border: 4px solid #a62337;
}
.text-uname {
    color: #4a4a4a;
}
</style>
