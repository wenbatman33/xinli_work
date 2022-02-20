<template lang="pug">
  .gamaPage.d-flex.justify-content-center.align-items-center.flex-column
    img.logo.my-0.mx-3(src="/static/img/logo.svg" width='300')
    i.loadingIocn.my-2(class="el-icon-loading")
    p.loadingWording 加载中
</template>

<script>
export default {
  name: 'Loading',
};
</script>
<style scoped>
.gamaPage{
  width: 100%;
  height: 100%;
  background-image: linear-gradient(286deg, #0088da, #0050b3);
}
.loadingIocn{
  color: #fff;
  font-size: 24px;
}
.loadingWording{
  color: #fff;
}
</style>
