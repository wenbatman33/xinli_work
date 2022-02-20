<template lang="pug">
van-nav-bar.p-4.bgColor
	template(#left)
		img.w-6(:src="staticPath+'/static/svg/back.svg'" @click="goBack")

	template(#title)
		van-row( v-if="prePath || nextPath")
			van-col(span="2")
				img.w-6(:src="staticPath+'/static/svg/v1_pre.svg'" @click="goTo(prePath)" v-if="prePath")
				img.w-6(:src="staticPath+'/static/svg/v1_pre.svg'" style="opacity: 0.5;" v-if="nextPath")
			van-col(span="20")
				h5.text-white.pingfang {{ navTitle }}
			van-col(span="2")
				img.w-6(:src="staticPath+'/static/svg/v1_next.svg'" @click="goTo(nextPath)" v-if="nextPath")
				img.w-6(:src="staticPath+'/static/svg/v1_next.svg'" style="opacity: 0.5;" v-if="prePath")
		h5.text-white.pingfang(v-else) {{ navTitle }}

</template>
<script lang="ts" setup>
	import { defineProps, computed } from 'vue';
	import { useRouter } from 'vue-router';
	import { SystemStore } from '@/store/systemStore';
	const staticPath = window.staticPath

	const systemStore = SystemStore();
	const navTitle = computed(() => props.name || systemStore.navTitle);
	// const path = path
	interface Props {
		name?: String;
		back?: String;
		prePath: String;
		nextPath: String;
	}
	const props = defineProps<Props>();
	const router = useRouter();
	const goTo = (path:String)  => {
		router.push({ path: String(path) });
	};
	const goBack = () => {
		if (!props.back) {
			router.go(-1);
			// router.push({ name: 'Home' });
		} else {
			router.push({ path: String(props.back) });
		}
	};
</script>
<style scoped>
	.van-cell::after,
	[class*='van-hairline']::after {
		display: none;
	}

	.bgColor {
		background: linear-gradient(101.58deg, #333333 3.4%, #1a1a1a 97.37%);
	}
</style>
