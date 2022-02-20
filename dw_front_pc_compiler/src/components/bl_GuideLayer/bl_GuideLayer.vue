<template  lang="pug">
.guideLayer(v-if='guideShow')
  .guidePoint.item_1(v-if='memberLogined',:style='{"top":(guidePoint_1_postion.top)+"px", "left":(guidePoint_1_postion.left+100)+"px"}')
    img(:src='guidePoint_1_img')
  .guidePoint.item_1(v-else, :style='{"top":(guidePoint_1_postion.top-80)+"px", "left":(guidePoint_1_postion.left+50)+"px"}')
    img(:src='guidePoint_1_img')
  .guidePoint.item_2(:style='{"top":(guidePoint_2_postion.top-120)+"px", "left":(guidePoint_2_postion.left+150)+"px"}')
    img(:src='guidePoint_2_img')
  .guidePoint.item_3(:style='{"top":(guidePoint_3_postion.top+80)+"px", "left":(guidePoint_3_postion.left-180)+"px"}')
    img(:src='guidePoint_3_img')
  .guidePoint.item_4(:style='{"top":(guidePoint_4_postion.top)+"px", "left":(guidePoint_4_postion.left-80)+"px"}')
    img(:src='guidePoint_4_img')
  .guidePoint.item_5.gotIt(:style='{"top":(guidePoint_5_postion.y-81)+"px", "left":(guidePoint_5_postion.x-240)+"px"}', @click='setUserGuide')
    img(:src='guidePoint_5_img')
  
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      guidePoint_1_img: `${window.CDN_ASSETS}/static/img/guide/guide-1.png`,
      guidePoint_2_img: `${window.CDN_ASSETS}/static/img/guide/guide-2.png`,
      guidePoint_3_img: `${window.CDN_ASSETS}/static/img/guide/guide-3.png`,
      guidePoint_4_img: `${window.CDN_ASSETS}/static/img/guide/guide-4.png`,
      guidePoint_5_img: `${window.CDN_ASSETS}/static/img/guide/guide-5.png`,
      timer: null,
      guideShow: false,
      guidePoint_1_postion: {},
      guidePoint_2_postion: {},
      guidePoint_3_postion: {},
      guidePoint_4_postion: {},
      guidePoint_5_postion: {},
    };
  },
  computed: {
    ...mapState('member', ['memberLogined']),
  },
  methods: {
    reSize() {
      clearTimeout(this.timer);
      if (this.memberLogined) {
        this.guidePoint_1_postion = window.document.querySelector('.userStatus').getBoundingClientRect();
      } else {
        this.guidePoint_1_postion = window.document.querySelector('#loginBtn').getBoundingClientRect();
      }
      this.guidePoint_2_postion = window.document.querySelector('.dreamFundBG').getBoundingClientRect();
      this.guidePoint_3_postion = window.document.querySelector('#transactionlog').getBoundingClientRect();
      this.guidePoint_4_postion = window.document.querySelector('.bannerChannel').getBoundingClientRect();
      this.guidePoint_5_postion.x = window.document.body.clientWidth / 2;
      this.guidePoint_5_postion.y = window.document.body.clientHeight / 2;
      this.timer = setTimeout(() => {
        this.reSize();
      }, 1000);
    },
    setUserGuide() {
      window.localStorage.setItem('userGuide', true);
      this.$store.commit('userSetting/setUserGuide', false);
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reSize);
    clearTimeout(this.timer);
  },
  mounted() {
    window.addEventListener('resize', this.reSize);
    this.timer = setTimeout(() => {
      this.guideShow = true;
      this.reSize();
    }, 1000);
    if (this.$route.name !== 'index') {
      this.$store.commit('userSetting/setUserGuide', false);
    }
  },
};
</script>
<style lang="scss" scoped>
.guideLayer{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0,0,0,.7);
  .guidePoint{
    position: absolute;
  }
  .gotIt{
    cursor: pointer;
  }
}
</style>
