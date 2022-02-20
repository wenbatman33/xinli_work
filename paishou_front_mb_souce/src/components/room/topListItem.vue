<template lang="pug">
//- 貢獻榜第四名後
.top-list-item
    .w-full.flex.flex-row.items-center.px-4.py-2
        //- 等級
        .rank.text-sm.font-bold {{ rank }}

        //- 頭像
        img.w-12.h-12.rounded-full.object-cover.ml-4(:src='item?.avatar || ""', @error='errorAvatarImg')
        
        //- 暱稱
        .name.text-sm.ml-4(:class='{ "invisible": item.is_blank === true }') {{ item.user_nicename || "-" }}
        
        //- 等級
        img.h-4.ml-4(:src='levelThumb || ""', @error='errorLevelImg', :class='{ "invisible": item.is_blank === true }')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    props: {
        item: Object,
        rank: Number,
    },
    setup(props) {
		// Vuex store
		const store = useStore();

		// 等級圖片
		const levelThumb = computed(() => {
			const levelList = store?.state?.config?.levelList || [];
			const levelItem = levelList.find((element) => {
				return element?.levelid === props?.item?.level;
			});
			return levelItem?.thumb || '';
		});

		// 頭像圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/room/img-color-block@3x.png';
		};
		return {
            levelThumb,
			errorAvatarImg,
			errorLevelImg,
		};
    },
}
</script>
<style lang="scss" scoped>
.top-list-item {
    width: 100%;
}
.rank {
    color: #303133;
}
.name {
	color: #303133;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>