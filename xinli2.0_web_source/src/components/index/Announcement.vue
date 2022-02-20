<template lang="pug">
.Marquee.w-full.h-20.FLEX_R.overflow-hidden
	.CENTER.flex-shrink-0.items-center.px-4
		SvgIcon.w-5.h-5.text-xRed.mx-2(:name='"#Announcement"')
		span.text-xRed.font-semibold {{t('announcement')}}
	.CENTER.flex-grow.relative.overflow-hidden(v-if='announcementList.length>0')
		.MarqueeContent.flex.flex-nowrap.truncate(:class='{"MarqueePaused": MarqueePaused === true }' :style='MarqueeStyle')
			.FLEX_R.mr-8(v-for='item in announcementList' @mouseover='MarqueePaused=true' @mouseout='MarqueePaused=false' )
				.flex-shrink-0.truncate(@click='showAnnouncement=true') {{ item?.title }}
	
	a-modal.radiusModal(
		:visible='showAnnouncement'
		width='752px' 
		centered, 
		:mask-closable='true', 
		:keyboard='false', 
		:okText='t("closeButton")'
		:cancel='false'
		:cancelButtonProps='{style:{"display": "none"}}'
		:closable='false'
		@ok="closeModel"
		@cancel='closeModel')
		h5 {{t('announcement_list')}}

		.p-4.overflow-y-auto(:class='"h-[500px]"')
			.FLEX_C_CENTER.h-48.border-b.py-4(v-for='item in announcementList')
				p.font-semibold {{ item?.title }}
				p.line-clamp-2(v-html='item?.context')


</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { SystemStore } from '@/store/systemStore';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import { useRoute, useRouter } from 'vue-router';
	import type { EVENTAJAX_GetAnnouncementResponseData } from '@/api/model';
	import { EventStore } from '@/store/eventStore';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const eventStore = EventStore();

	const showAnnouncement = ref(false);

	const MarqueePaused = ref(false);
	const announcementList = computed(() => eventStore.announcementList);
	const MarqueeStyle = computed(() => `animation-duration: ${announcementList.value.length * 8}s`);
	const closeModel = () => {
		showAnnouncement.value = false;
	};
</script>

<style lang="scss" scoped>
	.MarqueeContent {
		position: absolute;
		animation: mymove;
		// animation-duration: 30s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	@keyframes mymove {
		0% {
			left: 110%;
		}

		100% {
			left: -140%;
		}
	}
	.MarqueePaused {
		animation-play-state: paused;
	}
</style>
