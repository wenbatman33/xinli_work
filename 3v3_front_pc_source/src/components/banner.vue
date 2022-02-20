<template lang="pug">
  b-carousel#carousel-1.mt-4(
    v-model="slide"
    controls
    style="text-shadow: 1px 1px 2px #333; max-width: 1600px; cursor: pointer;"
  )
    b-carousel-slide(
      v-for="item in data"
      :key="item.id"
    )
      template(v-slot:img)
        .d-block.slide-image(
          @click="jump(item)"
          :style="{ backgroundImage: 'url(' + item.img + ')' }"
        )
</template>

type 0 不操作
type 1 跳轉
<script>
export default {
  props: ['data'],
  data() {
    return {
      slide: 0,
    };
  },
  methods: {
    jump(item) {
      if (item.type === 0) return;
      window.open(item.url);
    },
  },
};
</script>

<style lang="scss" scoped>
  #carousel-1 {
    height: 400px;
    width: 90%;
    margin: 0 auto;
  }

  .slide-image {
    height: 400px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
