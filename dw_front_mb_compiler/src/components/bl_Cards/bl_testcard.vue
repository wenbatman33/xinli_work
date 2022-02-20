<template lang="pug">
  div
    GameList
    //- h1(v-for="item in 20") hello world
</template>

<script>
import GameList from '@/components/bl_GameList/bl_GameList.vue';
export default {
  components: {
    GameList,
  }
}
</script>

<style lang="scss" scoped>
.test {
  width: 100%;
  height: 500px;
  background-color: red;
}
</style>

