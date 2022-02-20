<template lang="pug">
  #dashboard.w-100
    .d-flex.flex-column.align-items-center.overflow-auto.w-100(style="flex: 1;")
      Banner(:data="bannerList")
      img.py-4.image(:src="img_text")
      HotGameList(:data="hotList")
    Footer
</template>

<script>
import Banner from '@/components/banner.vue';
import HotGameList from '@/components/hotGameList.vue';
import Footer from '@/components/footer.vue';

export default {
  name: 'dashboard',
  components: {
    Banner,
    HotGameList,
    Footer,
  },
  data() {
    return {
      img_text: `${process.env.VUE_APP_STATIC}/img/text.svg`,
      bannerList: [],
      hotList: [],
      noticeList: [],
    };
  },
  methods: {
    checkLogin() {
      if (!window.localStorage.getItem('token')) {
        this.$store.commit('admin/SET_LOGIN', false);
      }
    },
    getData() {
      this.$store.dispatch('admin/getGameIndex', {
        cate_id: 1,
      }).then((res) => {
        this.bannerList = res.data.data.banner;
        this.hotList = res.data.data.hot;
        this.noticeList = res.data.data.notice;
      });
    },
  },
  created() {
    this.checkLogin();
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
#dashboard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.image {
  z-index: 10;
  max-width: 40vmax;
}
</style>
