<template lang="pug">
.container-fluid.h-100
  .row
    .col-12(v-if='topBanner')
      img.w-100(:src='topBanner')
  .row.my-3.px-2.justify-content-center
    .col-12.col-sm-12.col-md-12.col-lg-3.d-none.d-lg-block(v-if='indexBanner.length>0')
      img.adBnner(:src='indexBanner[0].bannerImagePc', @click='bannerClick(indexBanner[0].bannerLinkPc)')
    .col-12.col-sm-12.col-md-12.col-lg-6
      bl_FormObject(v-if='eventData.length>0')
    .col-12.col-sm-12.col-md-12.col-lg-3.d-none.d-lg-block(v-if='indexBanner.length>0')
      img.adBnner(:src='indexBanner[1].bannerImagePc', @click='bannerClick(indexBanner[1].bannerLinkPc)')
</template>

<script>
import { mapState } from 'vuex';
import bl_FormObject from '@/components/bl_Event_1/bl_FormObject';

export default {
  data () {
    return {
      topBanner: ''
    }
  },
  components: {
    bl_FormObject,
  },
  computed: {
    ...mapState('event_1', ['betGameList', 'eventData', 'indexBanner']),
  },
  methods: {
    bannerClick(Url){
      // console.log(Url)
      window.location.href = Url;
    }
  },
  mounted () {
    this.$store.dispatch('event_1/getBetGameList');
    this.$store.dispatch('event_1/getEventData', this.$route.params.id)
      .then((res)=>{
        this.topBanner = res.data.data[0].visionImage;

        if(res.data.data[0].status.value !== 1){
          this.$router.push({ path: '/error' });
        }
      })
      .catch((error) => {
        this.$router.push({ path: '/error' });
      });
    const payload = { banner_group_id: 6, device: 1, platform: 1, banner_type:1 };
    this.$store.dispatch('event_1/API_IndexBanner', payload);
  }
};
</script>

<style lang="scss" scoped>
.topBnner{
  width: 100%;
}
.adBnner{
  cursor: pointer;
  width: 100%;
  border-radius: 16px;
}
</style>


