<template lang="pug">
	.container-fluid
		.redire.text-center.py-4
			img.logo.mx-5.my-2(src="/static/img/logo.svg")
			.redire_title.my-2 官方备用通道
		.redire_cont.my-4
			ul.linkbtn.d-flex.justify-content-center.align-items-center.flex-column
				li
					a(href='/').mt-4.mx-3.py-3.px-4.d-flex.justify-content-between
						//- .linkspeed-g 28 ms 
						.linkname 18老虎城官网网址
				li
					a(href='/').mt-4.mx-3.py-3.px-4.d-flex.justify-content-between
						//- .linkspeed-g 52 ms 
						.linkname 备用网址 01
				li
					a(href='/').mt-4.mx-3.py-3.px-4.d-flex.justify-content-between
						//- .linkspeed-g 32 ms 
						.linkname 备用网址 02
				li
					a(href='/').mt-4.mx-3.py-3.px-4.d-flex.justify-content-between
						//- .linkspeed-r 88 ms 
						.linkname 备用网址 03
				li
					a(href='/').mt-4.mx-3.py-3.px-4.d-flex.justify-content-between
						//- .linkspeed-g 20 ms 
						.linkname 备用网址 04
				li
					a(href='/').mt-4.mx-3.py-3.px-4.d-flex.justify-content-between
						//- .linkspeed-y 67 ms 
						.linkname 备用网址 05
				li
					a(href='/').mt-4.mx-3.py-3.px-4.d-flex.justify-content-between
						//- .linkspeed-g 28 ms 
						.linkname 备用网址 06
				li
					a(href='/').mt-4.mx-3.py-3.px-4.d-flex.justify-content-between
						//- .linkspeed-g 15 ms 
						.linkname 备用网址 07
				li
					a(href='/').mt-4.mx-3.py-3.px-4.d-flex.justify-content-between
						//- .linkspeed-g 47 ms 
						.linkname 备用网址 08
</template>

<script>
export default {
  name: 'redirection',
};
</script>
<style lang="scss" scoped>
.container-fluid {
	width: 100%;
	height: 100%;
}
.redire {
	background: url("/static/img/pic-403-bg.png") 50% 40% no-repeat, linear-gradient(180deg, #002766, #001f52 38%, #001332);
	background-size: cover;
	color: #fff;
	img.logo {
		width: 100%;
		max-width: 200px;
		height: auto;
	};
}
.redire_cont{
  width: 100%;
  height: 100%;
	background: #fff;
	.linkbtn {
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
		li {
			width: 100%;
			max-width: 380px;
			a {
				border-radius: 4px;
				text-decoration: inherit;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
				border: solid 1px #e4e7ed;
				};
			.linkspeed-g {
				color: #67c23a;
			};
			.linkspeed-r {
				color: #fa5555;
			};
			.linkspeed-y {
				color: #faad14;
			};
			.linkname {
				color: #262626;
			};
		};
	};
}
</style>
