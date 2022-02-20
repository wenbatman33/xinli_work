<template>
	<a-carousel arrows :dots="false">
		<template #prevArrow>
			<div class="custom-slick-arrow" style="left: 10px; zindex: 1">
				<left-circle-outlined />
			</div>
		</template>
		<template #nextArrow>
			<div class="custom-slick-arrow" style="right: 10px">
				<right-circle-outlined />
			</div>
		</template>
		<div v-for="(item, index) in state.tempData" :key="index">
			<div class="avatar">
				<img :src="item.avatar || '/publicAssets/img/v3/default.png'" />
			</div>
			<div class="anchorName text-xs text-psV3Red">{{ item.user_nicename }}</div>
		</div>
	</a-carousel>
</template>

<script>
import { computed, onMounted, reactive, ref, toRaw } from 'vue';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
export default {
	components: {
		LeftCircleOutlined,
		RightCircleOutlined,
	},
	setup() {
		const state = reactive({
			tempData: [
				{ id: 524567, user_nicename: '喜脉', avatar: 'https://imgcdn.njetp.com/uploads/d298e87611e3dc50fccb3aed62c6bac6.png', signature: '' },
				{ id: 524571, user_nicename: '希希', avatar: 'https://imgcdn.njetp.com/uploads/2233e558d4411cdf22e8643171b761ad.jpg', signature: '' },
				{ id: 524589, user_nicename: '张张', avatar: 'https://img.paishou88.com/upload/38fcac3bf6fe0ed000e1defcf172376b.jpg', signature: '' },
				{ id: 524595, user_nicename: '一号球场', avatar: 'https://img.paishou88.com/upload/7b9c472faf2095b8512da8f4522c8999.jpg', signature: '' },
				{ id: 524545, user_nicename: '十三哥', avatar: 'https://imgcdn.njetp.com/uploads/7aaf108f464ee3768c4dc061029b6c8a.png', signature: '' },
				{ id: 524553, user_nicename: '糖糖乐', avatar: 'https://imgcdn.njetp.com/uploads/5d92aae70800431788420c2dc7397834', signature: '' },
			],
		});
		return {
			state,
		};
	},
};
</script>
<style lang="scss" scoped>
/* For demo */
.ant-carousel ::v-deep(.slick-slide) {
	text-align: center;
	height: 400px;
	background: #364d79;
	overflow: hidden;
}

.ant-carousel ::v-deep(.slick-arrow.custom-slick-arrow) {
	width: 25px;
	height: 25px;
	font-size: 25px;
	color: #fff;
	background-color: rgba(31, 45, 61, 0.11);
	opacity: 0.3;
}
.ant-carousel ::v-deep(.custom-slick-arrow:before) {
	display: none;
}
.ant-carousel ::v-deep(.custom-slick-arrow:hover) {
	opacity: 0.5;
}

.ant-carousel ::v-deep(.slick-slide h3) {
	color: #fff;
}
.custom-slick-arrow {
	z-index: 1;
}
.avatar {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
