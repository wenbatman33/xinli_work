<template lang="pug">
a-config-provider(:locale="locale")
	#main
		headerNav(v-if='route.path!=="/maintain" && route.name!=="room"')
		.appContainer
			router-view
		foot(v-if='route.path!=="/maintain" && route.name!=="room"')
		loginModel
		rechargeModale(v-if='showRechargeModal')
		backpackModal
		gameModal
		allTasks
		.fixed.FLEX_C.bottom-24.right-8.z-20
			img.w-24.cursor-pointer.mb-4(v-if='route.name!=="room" && state.serviceIconForOlympic?.slide_pic', :src='state.serviceIconForOlympic?.slide_pic', @click='gotoDeepLink(state.serviceIconForOlympic?.slide_url)')
			img#CTA_Button_1.w-24.cursor-pointer(:src='state.serviceIcon', @click='CTA_Click')
</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import headerNav from '@/components/headerNav';
import foot from '@/components/footer';
import loginModel from '@/components/loginModel';
import rechargeModale from '@/components/recharge/rechargeModale';
import backpackModal from '@/components/backpackList/backpackModal';
import gameModal from '@/components/game/gameModal';
import allTasks from '@/components/tasks/allTasks';
import { deepLink } from '@/utils';
import { getUserNotification, slideList } from '@/api';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { notification } from 'ant-design-vue';
import { matomo_notice, matomo_cta_click } from '@/matomoEvent';

let timer = null;
export default {
	components: {
		headerNav,
		foot,
		loginModel,
		rechargeModale,
		backpackModal,
		gameModal,
		allTasks,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			serviceIcon: null,
			serviceIconForOlympic: null,
		});
		const UID = computed(() => store.state.user.uid || '');
		const showRechargeModal = computed(() => store.state.user.showRechargeModal);
		const showBackpackModal = computed(() => store.state.user.showBackpackModal);
		// store
		const isLogin = computed(() => store.state.user.token !== '' && store.state.user.uid !== '');
		const locale = zhCN;

		const checkPushMsg = () => {
			if (isLogin.value === true) {
				getUserNotification().then((res) => {
					const array = res.data.list;
					// const array = [{ Id: '3577', title: '測試立即進入直播間！', content: '測試立即進入直播間！', link_type: '1', link: '524682' }];
					array.forEach((element) => {
						notification.open({
							message: element.title,
							description: element.content,
							placement: 'bottomRight',
							style: { 'border-radius': '20px', cursor: 'pointer' },
							onClick: () => {
								matomo_notice();
								if (Number(element.link_type) === 1) {
									let routeUrl = router.resolve(`/room/${element.link}`);
									window.open(routeUrl.href, '_blank');
								} else if (Number(element.link_type) === 2) {
									window.open(element.link);
								} else if (Number(element.link_type) === 3) {
									router.push('/');
								}
							},
						});
					});
				});
				timer = setTimeout(() => {
					checkPushMsg();
				}, 60000);
			}
		};
		const CTA_Click = () => {
			matomo_cta_click(route.path);
			window.LC_API.open_chat_window();
		};
		const gotoDeepLink = (link) => {
			deepLink(link);
		};
		onUnmounted(() => {
			clearTimeout(timer);
		});
		onMounted(() => {
			slideList({ slide_cid: 26 }).then((res) => {
				state.serviceIcon = res?.data?.list[0]?.slide_pic;
			});
			slideList({ slide_cid: 28 }).then((res) => {
				state.serviceIconForOlympic = res.data.list ? res.data.list[0] : '';
			});
			// ie 不支援 window.location.origin 因此 補上polyfill
			if (!window.location.origin) window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

			store.dispatch('config/GET_CURRENT_CLASS_LIST');
			store.dispatch('config/GET_CONFIG').then((res) => {
				// maintain_switch ='1' 為全站維修中 必須導向maintain頁面
				if (Number(res.data.maintain_switch) === 1) {
					router.push('/maintain');
				}
				// 國殤日 更換css模式
				if (res.data.dark_mode === 1) {
					const root = document.querySelector('body');
					root.setAttribute('class', 'dark_mode');
				}
			});
			store.dispatch('user/UPDATE_USER_INFO');
			checkPushMsg();
		});

		return {
			store,
			state,
			route,
			locale,
			UID,
			showRechargeModal,
			showBackpackModal,
			isLogin,
			checkPushMsg,
			CTA_Click,
			gotoDeepLink,
		};
	},
};
</script>
<style lang="scss" scoped>
#main {
	position: relative;
	min-width: 1200px;
}
.appContainer {
	position: relative;
}
</style>
<style lang="scss">
.ant-col {
	width: 100%;
}
.ant-modal {
	padding-bottom: 0px !important;
}
.ant-checkbox-checked .ant-checkbox-inner {
	background-color: #a62337 !important;
	border-color: #a62337 !important;
}
</style>
