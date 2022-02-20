<template lang="pug">
.w-100
  .newsTitle 最新公告
  .newsContentWrap(v-if='newsDialogActive == -1')
    .newsItem(v-for='(item, index) in getIndexNews',:key='index', @click='selectNewsList(index)')
      .title.mt-3 {{item.newsTitle}}
        .date.float-right {{item.newsUpdatedAt}}
      p.mt-3(v-html='item.newsContent')
  .newsContentWrap(v-if='newsDialogActive!=-1')
    .newsItemSelected(v-for='(item, index) in getCurrentNews', :key='index')
      .title.mt-3 {{item.newsTitle}}
        .date.float-right {{item.newsUpdatedAt}}
      p.mt-3(v-html='item.newsContent')
  .newsButtonWarp.text-center
    el-button(v-if='newsDialogActive!=-1', type='primary', @click='backNewsList') 查看全部公告
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    newsDialogActive() {
      return this.$store.state.news.newsDialogActive;
    },
    getIndexNews() {
      return this.$store.state.news.indexNews;
    },
    getCurrentNews() {
      const result = this.$store.state.news.indexNews.filter((item, index) => index === this.newsDialogActive);
      return result;
    },
  },
  methods: {
    selectNewsList(index) {
      this.$store.commit('news/setNewsDialogActive', index);
      this.$router.push({ query: { card: 'bl_News', id: index } });
    },
    backNewsList() {
      this.$store.commit('news/setNewsDialogActive', -1);
      this.$router.push({ query: { card: 'bl_News' } });
    },
  },
  mounted() {
    const vm = this;
    const payload = { id: this.$route.query.id };
    // 如果有id 则执行selectNewsList()
    if (payload.id) this.selectNewsList(payload.id);
  },
};
</script>

<style lang="scss" scoped>
.newsTitle{
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  color: white;
  text-align: center;
  background-image: linear-gradient(274deg, $L_DW_Color, $L_DW_ColorDark);
}
.newsItem{
  cursor: pointer;
  padding: 10px 20px;
  min-height: 160px;
  box-shadow: inset 0 -1px 0 0 $garyBlue_lightest;
  .title {
    font-size: 16px;
    color: $DW_Color;
    .date{
      font-size: 14px;
      color: $garyBlue_Dark;
    }
  }
}
.newsItemSelected{
  padding: 10px 20px;
  min-height: 160px;
  box-shadow: inset 0 -1px 0 0 $garyBlue_lightest;
  .title {
    font-size: 16px;
    color: $DW_Color;
    .date{
      font-size: 14px;
      color: $garyBlue_Dark;
    }
  }
}
.newsContentWrap{
  height: 400px;
  overflow: hidden;
  overflow-y:auto;
}

.newsButtonWarp{
  height: 50px;
}
.readed{
  background-color: $garyBlue_lightest;
  .title {
    font-size: 16px;
    color: $garyBlue_Dark;
  }
}
.active{
  background-color: $DW_yellowAlpha_10;
  .title {
    font-size: 16px;
    color: $garyBlue_Dark;
  }
}
</style>
