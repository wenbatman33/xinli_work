<template lang="pug">
.relative.h-16.relative(:class='cheskUser')
	.CENTER_BETWEEN.rounded-full.h-full.px-2(:class='comboLevel')

		img.AVATAR.w-12.h-12(:src='dataList.Avatar', @error='errorPersonImg')
		.FLEX_C.truncate.w-20
			img.w-7(v-if='filterUserLevel(dataList.Uid)', :src='userLevelThumb(filterUserLevel(dataList.Uid))')
			.name.text-white(v-if='filterUserName(dataList.Uid)') {{filterUserName(dataList.Uid)}}
			
		img.w-12.h-12(:src='dataList.GiftIcon')
		.CENTER.FLEX_C.py-2.pr-4
			.FLEX_R
				.comboNumber x
				.comboNumberItem(v-for='subItem in tranNumberArray(dataList.Count)')
					comboNumber(:countnumber='subItem')
			.comboNumberDes Combo
</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, toRaw, watch } from 'vue';
import comboNumber from '@/components/room/combo/comboNumber.vue';
import { userLevelThumb, errorPersonImg } from '@/utils';

export default {
	props: ['dataList'],
	components: {
		comboNumber,
	},
	setup(props, { emit }) {
		const store = useStore();
		const ROOM_MEMBER_LIST = computed(() => store.state.socket.roomMemberList || '');
		// ---------------------------
		const state = reactive({
			newUser: false,
			ending: false,
			timer: null,
			showTimes: 3500,
		});
		const cheskUser = computed(() => {
			let style = '';
			if (state.newUser) {
				style = 'outSide moveToRight';
			} else if (state.ending) {
				style = 'moveOut';
			} else {
				style = 'moveToRight';
			}
			return style;
		});
		const filterUserName = (Uid) => {
			const user = ROOM_MEMBER_LIST.value.filter((item) => item.uid === String(Uid));
			return user[0].uname;
		};
		const filterUserLevel = (Uid) => {
			const user = ROOM_MEMBER_LIST.value.filter((item) => item.uid === String(Uid));
			return Number(user[0].level);
		};

		const comboLevel = computed(() => {
			let level = '';
			if (props.dataList?.Count >= 2 && props.dataList?.Count <= 29) {
				level = 'level1';
			} else if (props.dataList?.Count >= 30 && props.dataList?.Count >= 199) {
				level = 'level2';
			} else if (props.dataList?.Count >= 200 && props.dataList?.Count >= 299) {
				level = 'level3';
			} else if (props.dataList?.Count >= 300) {
				level = 'level4';
			}
			return level;
		});
		watch(
			() => props.dataList.Uid,
			(newVal, oldVal) => {
				newVal !== oldVal ? init() : oldUser();
				countDown();
			},
			{ deep: true }
		);
		const init = () => {
			clearTimeout(state.timer);
			state.newUser = true;
			state.ending = false;
		};
		const oldUser = () => {
			clearTimeout(state.timer);
			state.newUser = false;
			state.ending = false;
		};
		const countDown = () => {
			state.timer = setTimeout(() => {
				state.ending = true;
				console.log('countDown');
			}, state.showTimes);
		};
		// ---------------------------
		onMounted(() => {
			console.log(ROOM_MEMBER_LIST.value);
		});
		onUnmounted(() => {
			clearTimeout(state.timer);
		});
		// ------------------------------------------------------------------
		const tranNumberArray = (newVal = '0') => {
			const str = String(newVal);
			const arr = [];
			for (let i = 0; i < str.length; i++) {
				arr.push(str.charAt(i));
			}
			return arr;
		};
		return {
			store,
			state,
			tranNumberArray,
			errorPersonImg,
			comboLevel,
			cheskUser,
			init,
			oldUser,
			countDown,
			userLevelThumb,
			ROOM_MEMBER_LIST,
			filterUserName,
			filterUserLevel,
		};
	},
};
</script>
<style lang="scss" scoped>
.outSide {
	left: -300px;
}
.moveToRight {
	left: 0;
	animation: 0.3s toRight linear;
}
.moveOut {
	left: 600px;
	animation: 0.3s toOutside linear;
}
@keyframes toRight {
	from {
		opacity: 0;
		left: -300px;
	}
	to {
		opacity: 1;
		left: 0px;
	}
}
@keyframes toOutside {
	from {
		opacity: 1;
		left: 0px;
	}
	to {
		opacity: 0;
		left: -300px;
	}
}
.comboNumber {
	color: #fff;
	padding: 2px;
	font-size: 24px;
	font-weight: bold;
	font-style: italic;
	-webkit-text-stroke: 8px transparent;
	-webkit-background-clip: text;
}
.comboNumberDes {
	color: #fff;
	padding: 2px;
	font-size: 14px;
	font-weight: bold;
	font-style: italic;
	-webkit-text-stroke: 8px transparent;
	-webkit-background-clip: text;
}
.level1 {
	color: #fff;
	background-image: linear-gradient(to bottom, #2ab5f7, #4232f3);
	.comboNumber,
	.comboNumberDes {
		background: linear-gradient(to bottom, #4232f3, #2ab5f7);
		-webkit-background-clip: text;
	}
}
.level2 {
	color: #fff;
	background-image: linear-gradient(to bottom, #1730ce, #d72cdd);
	.comboNumber,
	.comboNumberDes {
		background: linear-gradient(to bottom, #d72cdd, #1730ce);
		-webkit-background-clip: text;
	}
}
.level3 {
	color: #fff;
	background-image: linear-gradient(to bottom, #db3069, #f99f00);
	.comboNumber,
	.comboNumberDes {
		background: linear-gradient(to bottom, #ff00e4, #4800ff);
		-webkit-background-clip: text;
	}
}
.level4 {
	color: #fff;
	background-image: linear-gradient(to bottom, #d600ff, #ff0000);
	.comboNumber,
	.comboNumberDes {
		background: linear-gradient(to bottom, #4232f3, #2ab5f7);
		-webkit-background-clip: text;
	}
}
</style>
