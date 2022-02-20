<template lang="pug">
	.errorPage.d-flex.justify-content-center.align-items-center.flex-column
		img.logo.mb-4.my-4(src="/static/img/logo.svg")
		img.error403.mb-4.mx-3.px-5(src="/static/img/pic-403.svg")
		p.errorWording.mb-4 403 禁止访问
		p.errorWording.align-items-center.text-center 您所在的地区已被禁止访问我们网站，敬请见谅
			br
			| 如有任何疑问请联系我们的 
			a.servicebtn(onclick="LC_API.open_chat_window();") 在线客服
			br
			| 我们将竭诚为您服务
</template>

<script>
export default {
  name: 'Error403',
};
</script>
<style lang="scss" scoped>
.errorPage{
	width: 100%;
	height: 100vh;
	background: url("/static/img/pic-403-bg.png") 50% 100% no-repeat, linear-gradient(180deg, #002766, #001f52 38%, #001332);
	background-size: contain;
	img.logo {
		width: 100%;
		max-width: 200px;
		height: auto;
	};
	img.error403 {
		width: 100%;
		max-width: 240px;
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
