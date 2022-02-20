<template lang="pug">
#Promo.pageContainer.min-h-screen
	.container.py-4
		.tabs.FLEX_R
			.rounded-full.border.py-2.px-4.mr-4.cursor-pointer(
					v-for='(item, index) in promotionLaunchedType' 
					:class='{"bg-xBlue text-white":( currentID === Number(Object.keys(item)[0]))}' 
					@click='changeTab(Number(Object.keys(item)[0]))') 
				//- img(v-show='currentID===index', :src='item.ActiveIcon')
				//- img(v-show='currentID!==index', :src='item.InactiveIcon')
				span {{Object.values(item)[0]}}

	.container.py-4(v-if='promoList.length>0')
		.promoList.grid.grid-cols-3.gap-4
			.col-span-1.bg-xBlue.bg-opacity-5.rounded.border.overflow-hidden.cursor-pointer(v-for='(pitem, index) in promoList' @click='showDetail(pitem)')
				img.w-full.aspect-video(:src='apiImgPath(pitem?.imageWeb)' @error='errorImg')
				.p-2
					.Subtitle_3.truncate {{ pitem?.name }}
					.Body_4.truncate {{ pitem?.startTime }}
	.container.py-4(v-else)
		.w-full.h-screen.CENTER_C.py-4
			img(:src='noFavorite')
			p.my-4 {{t('promo_empty_dec')}}

	a-modal(
		v-if='showPromoModal'
		width='100%',
		wrapClassName='promoModal',
		:visible='showPromoModal',
		:mask-closable='true',
		:footer='null',
		@cancel='closeModel')
		PromoModal
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { getPromotion, getPromotionDropdown } from '@/api';
	import { useRoute, useRouter } from 'vue-router';
	import { apiImgPath, errorImg } from '@/utils';
	import type { PAYMENTAJAX_PromotionListResponseData, BACKENDAJAX_KeyValue } from '@/api/model';
	import PromoModal from '@/components/Promotion/PromotionModal.vue';

	const route = useRoute();
	const router = useRouter();

	const noFavorite = `${window.staticPath}/static/img/promotion/no_event.png`;

	const All_Active = `${window.staticPath}/static/img/icon/promotion/All_Active.svg`;
	const Game_Active = `${window.staticPath}/static/img/icon/promotion/Game_Active.svg`;
	const Live_Active = `${window.staticPath}/static/img/icon/promotion/Live_Active.svg`;
	const Lottery_Active = `${window.staticPath}/static/img/icon/promotion/Lottery_Active.svg`;
	const Chess_Active = `${window.staticPath}/static/img/icon/promotion/Chess_Active.svg`;
	const Slot_Active = `${window.staticPath}/static/img/icon/promotion/Slot_Active.svg`;
	const Fish_Active = `${window.staticPath}/static/img/icon/promotion/Fish_Active.svg`;
	const Other_Active = `${window.staticPath}/static/img/icon/promotion/Other_Active.svg`;
	const All_Inactive = `${window.staticPath}/static/img/icon/promotion/All_Inactive.svg`;
	const Game_Inactive = `${window.staticPath}/static/img/icon/promotion/Game_Inactive.svg`;
	const Live_Inactive = `${window.staticPath}/static/img/icon/promotion/Live_Inactive.svg`;
	const Lottery_Inactive = `${window.staticPath}/static/img/icon/promotion/Lottery_Inactive.svg`;
	const Chess_Inactive = `${window.staticPath}/static/img/icon/promotion/Chess_Inactive.svg`;
	const Slot_Inactive = `${window.staticPath}/static/img/icon/promotion/Slot_Inactive.svg`;
	const Fish_Inactive = `${window.staticPath}/static/img/icon/promotion/Fish_Inactive.svg`;
	const Other_Inactive = `${window.staticPath}/static/img/icon/promotion/Other_Inactive.svg`;
	const promoImg = `${window.staticPath}/static/img/icon/promotion/promoImg.png`;
	const pomoDetailImg = `${window.staticPath}/static/img/promotion/pomoDetail.jpg`;

	const { t } = useI18n();

	const currentID = ref(0);
	const showPromoModal = ref(false);
	// const showPromoModalHanddle = () => (showPromoModal.value = true);

	const closeModel = () => {
		router.push('/promotion');
		showPromoModal.value = false;
	};

	const promoDetail = ref({});

	const promotionLaunchedType = ref([] as BACKENDAJAX_KeyValue[]);
	const promoTabs = ref([
		{ name: '全部', ActiveIcon: All_Active, InactiveIcon: All_Inactive },
		{ name: '体育电竞', ActiveIcon: Game_Active, InactiveIcon: Game_Inactive },
		{
			name: '真人娱乐城',
			ActiveIcon: Live_Active,
			InactiveIcon: Live_Inactive,
		},
		{
			name: '彩票',
			ActiveIcon: Lottery_Active,
			InactiveIcon: Lottery_Inactive,
		},
		{ name: '棋牌', ActiveIcon: Chess_Active, InactiveIcon: Chess_Inactive },
		{ name: '老虎机', ActiveIcon: Slot_Active, InactiveIcon: Slot_Inactive },
		{ name: '捕鱼王', ActiveIcon: Fish_Active, InactiveIcon: Fish_Inactive },
		{ name: '其他', ActiveIcon: Other_Active, InactiveIcon: Other_Inactive },
	]);
	const promoList = ref([] as PAYMENTAJAX_PromotionListResponseData[]);
	const changeTab = (id: number) => {
		currentID.value = id;
		init(id);
	};
	const showDetail = (item: any) => {
		router.push(`/promotion/${item.id}`).then(() => {
			showPromoModal.value = true;
		});
	};
	const init = async (id = 0) => {
		const res = await getPromotion({ type: id });
		const dropdownRes = await getPromotionDropdown();

		promotionLaunchedType.value = dropdownRes?.data?.data?.promotionLaunchedType || [];

		promoList.value = res?.data?.data?.list || [];
	};
	onMounted(() => {
		init();
		route.params.id ? (showPromoModal.value = true) : (showPromoModal.value = false);
	});
</script>
