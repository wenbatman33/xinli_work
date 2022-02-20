<template lang="pug">
  .errorPage.d-flex.justify-content-center.align-items-center.flex-column
    img.logo.mb-4.my-4(src="/static/img/logo.svg")
    img.error404.mb-5.mx-5.px-5(src="/static/img/pic-404.svg")
    p.errorWording 很抱歉您访问的页面不存在
    a.backbtn.my-3.py-2.px-4(href='/') 返回首页
</template>

<script>
export default {
  name: 'Error404',
};
</script>
<style lang="scss" scoped>
.errorPage{
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(180deg, #002766, #001f52 38%, #001332);
  img.logo {
		width: 100%;
		max-width: 200px;
		height: auto;
	};
  img.error404 {
    width: 100%;
    max-width: 580px;
    height: auto;
  }
}
.errorWording{
  color: #fff;
}
.backbtn {
  background: #002766;
  color: #fff;
  border-radius: 4px;
  text-decoration: inherit;
}
</style>
