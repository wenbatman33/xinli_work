<template lang="pug">
  #footer.p-3
    .d-flex.justify-content-center
      .mr-2 版权所有 © 2020 PLK
      .mr-2 |
      .d-flex
        .mr-2(
          style="cursor: pointer"
          @click="$router.push({ name: 'faq', query: { type: 6 } })"
        ) 关于PLK
        .mr-2(
          style="cursor: pointer"
          @click="$router.push({ name: 'faq', query: { type: 5 } })"
        ) 条款与规则
        router-link(to="/faq" style="color: #575759;") 帮助中心
</template>

<style lang="scss" scoped>
#footer {
  height: 50px;
  background-color: #1e1e1e;
  display: flex;
  flex-direction: column;
  color: #575759;
  font-size: 10px;
  justify-content: center;
  width: 100%;

  .title {
    font-size: 14px;
    color: #8e8e93;
  }
}
</style>
