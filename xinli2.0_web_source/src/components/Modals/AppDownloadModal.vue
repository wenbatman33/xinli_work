<template lang="pug">
a-modal.radiusNoPaddingModal(:visible='systemStore.appDownloadVisabled',  width='520px', centered, :footer='null', :mask-closable='false', :keyboard='false', @cancel='closeModel')
	.appDownloadBg.p-8(:style='{ "background-image": "url(" + currentBg + ")" }')
		h5.my-4 {{t('appdownload_titile')}}
		.tab(:class='{"tabType2": activeKey===0}' )
			.tabItem(:class='{"tabItem_Active": activeKey===0}' @click='activeKey=0') {{t('appdownload_tab_1')}}
			.tabItem(:class='{"tabItem_Active": activeKey===1}' @click='activeKey=1') {{t('appdownload_tab_2')}}
		
		.xinliApp.text-center.animate-fadeIn(v-if='activeKey===0')
			.CENTER_C.my-20
				h5 {{t('appdownload_app_1_desc')}}
				qrcode-vue.shadow-lg.my-8(:value='"http://google.com"' :margin='4' :size='150')
				.text-white {{t('appdownload_app_qrcode_text')}}

		.sportApp.text-center.animate-fadeIn(v-if='activeKey===1')
			.CENTER_C.my-20
				h5 {{t('appdownload_app_2_desc')}}
				qrcode-vue.shadow-lg.my-8(:value='"http://nba.com"' :margin='4' :size='150')
				.text-white {{t('appdownload_app_qrcode_text')}}

	
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { SystemStore } from '@/store/systemStore';
	import QrcodeVue from 'qrcode.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const luckapp = `${window.staticPath}/static/img/appDownload/luckapp@2x.png`;
	const sportapp = `${window.staticPath}/static/img/appDownload/sportapp@2x.png`;

	const systemStore = SystemStore();
	const activeKey = ref(0);
	const closeModel = () => {
		systemStore.appDownloadToggle(false);
	};
	const currentBg = computed(() => (activeKey.value === 0 ? luckapp : sportapp));
</script>
<style lang="scss" scoped>
	.tab {
		display: flex;
		position: relative;
		overflow: hidden;
		flex-direction: row;

		justify-content: flex-start;
		align-items: center;
		background: #fff;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 100px;
		overflow: hidden;
		&::before {
			content: '';
			display: block;
			position: absolute;
			z-index: 0;
			left: 50%;
			width: 50%;
			top: 0;
			bottom: 0;
			background: #f0453a;
			border-radius: inherit;
			-webkit-transition: 0.3s ease;
			transition: 0.3s ease;
		}
	}
	.tabType2 {
		&::before {
			content: '';
			display: block;
			position: absolute;
			z-index: 0;
			left: 0;
			width: 50%;
			top: 0;
			bottom: 0;
			background: #f0453a;
			border-radius: inherit;
			-webkit-transition: 0.3s ease;
			transition: 0.3s ease;
		}
	}
	.tabItem {
		width: 50%;
		padding-top: 12px;
		padding-bottom: 12px;
		text-align: center;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.6);
		border-radius: inherit;
		cursor: pointer;
		position: relative;
		z-index: 1;
		-webkit-transition: 0.3s ease;
		transition: 0.3s ease;
	}
	.tabItem_Active {
		color: #fff;
		font-weight: 600;
	}
	.appDownloadBg {
		background-position: bottom;
		background-size: 100%;
		background-repeat: no-repeat;
	}
</style>
