<template lang="pug">
  //- 單則公告
  .news(v-if="AllNews === false && News[0] !== undefined")
    .news__header 公告內容
    .news__main
      .news__main__title {{ News[0].newsTitle }}
      .news__main__time {{ News[0].newsCreatedAt }}
      .news__main__content(v-html="News[0].newsContent")
    button.news__button(href="#" @click="allNews") 查看全部公告
  //- 全部公告
  .allNews(v-else-if="AllNews === true && News[0] !== undefined")
    .allNews__header 最新公告
    .allNews__main
      .allNews__item(v-for="item in IndexNews" :key="item.id" @click="oneNews(item.id)")
        .allNews__item__title {{ item.newsTitle }}
        .allNews__item__content(v-html="item.newsContent")
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      form: {
        params: {
          platform: 1,
          device: 2,
        }
      }
    }
  },
  methods: {
    allNews() {
      this.$store.commit('index/setAllNews', true);
      this.$store.dispatch('index/setCardName', {
        card: 'bl_News',
      });
    },
    oneNews(id) {
      this.$store.dispatch('index/API_News', id).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$store.commit('index/setAllNews', false);
        }
      });
      this.$store.dispatch('index/setCardName', {
        card: 'bl_News',
        id,
      });
    },
  },
  computed: {
    ...mapState('index', [
      'News',
      'IndexNews',
      'AllNews',
    ]),
  },
  created() {
    if (this.$route.query.id !== undefined) {
      this.$store.dispatch('index/API_News', this.$route.query.id);
    } else {
      this.$store.commit('index/setAllNews', true);
    }
    this.$store.dispatch('index/API_IndexNews', this.form);
  }
};
</script>

<style lang="scss" scoped>
.news {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__header {
    font-size: $text-20;
    font-weight: bold;
    color: $card-title;
    padding: $width-24 0;
    border-bottom: 1px solid $origin-light;
    display: flex;
    justify-content: center;
  }

  &__main {
    padding: $width-28 $width-24 0;
    overflow: auto;
    flex: 1;
    word-break: break-all;

    &__title {
      font-size: $text-20;
      color: $theme;
      margin-bottom: $width-16;
    }

    &__time {
      font-size: $text-16;
      color: $navy_light;
      margin-bottom: $width-8;
    }

    &__content {
      font-size: $text-16;
      color: $navy_light;
      margin-bottom: 10vh;
    }
  }

  &__button {
    text-align: center;
    padding: $width-20 0;
    background-color: $theme;
    color: white;
    font-size: $text-20;
    border: none;
  }
}

.allNews {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__header {
    font-size: $text-20;
    font-weight: bold;
    color: $card-title;
    padding: $width-24 0;
    border-bottom: 1px solid $origin-light;
    display: flex;
    justify-content: center;
  }

  &__main {
    overflow: auto;
    flex: 1;

    .allNews__item {
      padding: $width-24;
      border-bottom: 1px solid $origin_light;
      word-break: break-all;

      &__title {
        font-size: $text-16;
        color: $theme;
        margin-bottom: $width-8;
      }

      &__content {
        font-size: $text-16;
        color: $navy_light;
      }
    }
  }
}


</style>
