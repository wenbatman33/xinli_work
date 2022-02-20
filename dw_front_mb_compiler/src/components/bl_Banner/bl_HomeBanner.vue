<template lang="pug">
  .homebanner(:class="{'bg': HomeBanner}")
    .homebanner__content(v-if="HomeBanner")
      a(:href="link" target="_blank")
        img.homebanner__content__image(:src="image")
      i.far.fa-times-circle.homebanner__cancel(@click="close")
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      image: '',
      link: '',
      query: {
        params: {
          banner_group_id: 2,
          device: 2,
          platform: 1,
        },
      },
    };
  },
  methods: {
    close() {
      this.$store.commit('index/setHomeBannerDisplay', false);
    },
  },
  computed: {
    ...mapState('index', [
      'HomeBannerDisplay',
    ]),
  },
  created() {
    this.$store.dispatch('index/API_IndexBanner', this.query).then((res) => {
      if (res.data.data.length > 0) {
        this.image = res.data.data[0].bannerImageMobile;
        this.link = res.data.data[0].bannerLinkMobile;
        this.$store.commit('index/setHomeBannerDisplay', true);
      } else {
        this.$store.commit('index/setHomeBannerDisplay', false);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.homebanner {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  &__content {
    width: 80%;
    height: 60vh;
    text-align: center;

    &__image {
      width: 100%;
      height: 100%;
    }
  }

  &__cancel {
    font-size: 32px;
    color: white;
  }
}

.bg {
  background-color: rgba(0, 0, 0, 0.48);
}
</style>
