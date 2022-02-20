<template lang="pug">
.row.no-gutters
  .d-flex.Marquee.flex-row.w-100
    .title.text-center 
      i.fas.fa-volume-up.mx-2
    .info.flex-grow-1(v-if='getIndexNews.length>0')
      //- p {{getIndexNews}}
      transition(name="slide-fade")
        p.newsButton(v-for='(item, index) in getIndexNews', v-if='index===currentNum',:key='index', @click='openNewsDialog(index, item.newsTitle)') {{item.newsTitle}}
    .info.flex-grow-1(v-else)
        p.noIndexNews 暂无公告资料
</template>
<script>
let loop;
export default {
  data() {
    return {
      currentNum: 1,
    };
  },
  computed: {
    getIndexNews() {
      return this.$store.state.news.indexNews;
    },
  },
  methods: {
    init() {
      const vm = this;
      setTimeout(() => {
        if (vm.currentNum >= (vm.$store.state.news.indexNews.length - 1)) {
          vm.currentNum = 0;
        } else {
          vm.currentNum += 1;
        }
        vm.init();
      }, 4000);
    },
    openNewsDialog(index, title) {
      this.$matomo_news(title);
      this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_News' });
      this.$store.commit('news/setNewsDialogActive', index);
      this.$router.push({ query: { card: 'bl_News', id: index } });
    },
  },
  mounted() {
    const vm = this;
    const payload = {
      platform: 1,
      device: 1,
    };
    this.$store.dispatch('news/API_IndexNews', payload)
      .then((res) => {
        vm.init();
      });
  },
};
</script>
<style lang="scss" scoped>
.Marquee{
  position: relative;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  width: 100%;
  overflow: hidden;
  .title {
    width: 40px;
    color: white;
    line-height: 50px;
    i{
      font-size: $text-20;
    }
  }
  .info{
    overflow : hidden;
    height:40px;
    p{
      margin: 0;
    }
  }
  .MarqueeTxt{
    position: absolute;
  }
  .slide-fade-enter-active {
    transition: all 1.5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter{
    transform: translateX(1300px);
  }
  .slide-fade-enter-to, .slide-fade-leave{
    transform: translateX(0px);
  }
  .slide-fade-leave-to{
    transform: translateX(-500px);
  }
  .newsButton{
    color: white;
    cursor: pointer;
  }
  .noIndexNews{
    color: white;
  }
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .Marquee{
    .title {
      color: $L_DW_Color;
    }
    .newsButton{
      color: black;
    }
    .noIndexNews{
      color: black;
    }
  }
}
</style>
