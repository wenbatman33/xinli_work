<template lang="pug">
	.gamaPage.d-flex.justify-content-center.align-items-center.flex-column
		img.logo.mb-4.my-4(src="/static/img/logo.svg")
		img.error505.mx-5.px-5(src="/static/img/pic-505.svg")
		p.errorWording.my-4 505 频繁访问
		p.errorWording.align-items-center.text-center 很抱歉当前访问的次数过多，请稍後再试
			br
			| 如有任何疑问请联系我们的 
			a.servicebtn(onclick="LC_API.open_chat_window();") 在线客服
			br
			| 我们将竭诚为您服务
</template>

<script>
export default {
  name: 'Error505',
};
</script>
<style lang="scss" scoped>
.gamaPage{
	width: 100%;
	height: 100vh;
	background: linear-gradient(180deg, #002766, #001f52 38%, #001332);
	img.logo {
		width: 100%;
		max-width: 200px;
		height: auto;
	};
	img.error505 {
		width: 100%;
		max-width: 580px;
		height: auto;
	}
}
.errorWording{
	color: #fff;
	font-size: 100%;
	line-height: 30px;
	.servicebtn {
		color: #1890ff;
		text-decoration: inherit;
		cursor: pointer;
		&:hover {
			color: #1890ff;
		}
	}
}
@media screen and (max-width: 360px) {
	.errorWording{
		font-size: 4.2vw;
	}
}
</style>
