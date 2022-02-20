<template lang="pug">
  #login
    Login
    bl_LoginVideo
</template>

<script>
import { mapState } from 'vuex';
import bl_LoginVideo from '@/components/bl_Login/bl_LoginVideo.vue';
import Login from '@/components/bl_Login/bl_Login.vue';

export default {
  components: {
    Login,
    bl_LoginVideo,
  },
  data() {
    return {
      video: '',
      windowWidth: 0,
      windowHeight: 0,
      videoStyle: '',
    };
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
  },
  created() {
    this.$store.dispatch('index/API_IndexBanner', {
      params: {
        banner_group_id: 5,
        banner_type: 2,
        platform: 1,
        device: 2,
      },
    }).then((res) => {
      // this.video = res.data.data[0].bannerVideoMobile;
    });
  },
};
</script>

<style lang="scss" scoped>
#login{
  width: 100%;
  height: 100%;
}
</style>
