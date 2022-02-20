<template lang="pug">
.flex.justify-center
	.home_content.FLEX_R.justify-between.items-start
		.content.mx-4
			h3.my-4.text-psV3Red  活动与公告
			.notice_container
				router-view
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.home_content {
	width: 1200px;
	position: relative;
	min-height: 800px;
	margin: 20px auto;
}
.notice {
	width: 1200px;
	min-height: 800px;
	margin: 20px auto;
	position: relative;
}
.left {
	width: 182px;
	background: #fff;
	border-radius: 8px;
	padding: 20px;
	position: fixed;
	left: calc((100% - 1200px) / 2);
}
.right {
	width: 182px;
	position: fixed;
	right: calc((100% - 1200px) / 2);
}
.content {
	width: 1200px;
	.notice_title {
		padding: 10px 0;
		font-size: 16px;
		font-weight: bolder;
	}
}
</style>
