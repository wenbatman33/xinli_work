<template lang="pug">
.jigsawFloat.absolute(class='z-[999] bottom-[100px] left-[100px]', v-if='state.show')
	.w-28.h-28.cursor-pointer(@click='getJigsaw')
		img(:src='state.jigsawInfo?.img')

</template>

<script>
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import { computed, onMounted, onUnmounted, reactive } from 'vue';
import { event011Get, event011Receive } from '@/api';

export default {
	setup(props, { emit }) {
		const state = reactive({
			show: false,
			jigsawInfo: null,
			jigsawInterval: null,
		});
		const store = useStore();
		const UID = computed(() => store.state.user.uid || '');
		const TOKEN = computed(() => store.state.user.token || '');
		const getJigsaw = () => {
			state.jigsawInfo?.get === false;
			// Post body
			const payload = {
				id: state.jigsawInfo?.id || 0,
			};

			event011Receive(payload)
				.then((res) => {
					state.show = false;
					if (res.data.success === true) {
						message.info(<a href='/event/jigsaw'>恭喜获得拼图一块! 请至活动页查看</a>);
					}
					endInterval();
				})
				.catch((err) => {
					state.show = false;
					message.warning('今日已领取完毕');
					endInterval();
					// console.log(err)
				});
		};
		const endInterval = () => {
			clearInterval(state.jigsawInterval);
		};
		const init = () => {
			const param = {
				uid: UID.value || '',
				token: TOKEN.value || '',
			};
			state.jigsawInterval = setInterval(() => {
				event011Get(param)
					.then((res) => {
						state.jigsawInfo = res?.data;
						state.show = !state.jigsawInfo?.get;
					})
					.catch((err) => {
						endInterval();
					});
			}, 1000 * 60 * 10);
		};
		onUnmounted(() => {
			clearInterval(state.jigsawInterval);
		});
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			TOKEN,
			UID,
			init,
			getJigsaw,
			endInterval,
		};
	},
};
</script>
<style lang="scss" scoped></style>
