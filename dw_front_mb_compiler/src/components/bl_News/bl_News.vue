<template lang="pug">
  .d-flex.align-items-center.news.px-3.w-100.overflow-hidden
    i.fas.fa-volume-up.mr-2.megaphone
    transition.marquee(name="marquee" tag="div")
      ul.d-flex.align-items-center.overflow-hidden.w-100.m-0(v-if="show")
        li(
          v-for="(item, index) in marquee"
          :key="item.id"
          @click="setCardOpen(item.id, item.newsTitle)"
        )
          span.marquee__item(v-if="index === currentNum") {{ item.newsTitle }}
</template>

<script>
export default {
  data() {
    return {
      image1: `${window.CDN_ASSETS}/static/img/iconWallet@3x.png`,
      currentNum: 0,
      form: {
        params: {
          platform: 1,
          device: 2,
        },
      },
      show: false,
      noMarquee: [
        {
          id: -999,
          newsTitle: '暂无公告资料',
        },
      ],
    };
  },
  methods: {
    init() {
      if (this.currentNum >= this.marquee.length - 1) {
        this.currentNum = 0;
        this.show = true;
      } else {
        setTimeout(() => {
          this.currentNum += 1;
          this.show = !this.show;
          this.init();
        }, 2000);
      }
    },
    setCardOpen(id, title) {
      if (id === -999) return;
      this.$matomo_News(title);
      this.$store.dispatch('index/setCardOpen', true);
      this.$store.dispatch('index/setCardName', {
        card: 'bl_News',
        id,
      });
      this.$store.commit('index/setAllNews', false);
    },
  },
  computed: {
    marquee() {
      if (this.$store.state.index.IndexMarquee.length === 0) {
        return this.noMarquee;
      } 
      return this.$store.state.index.IndexMarquee;
    },
  },
  created() {
    this.$store.dispatch('index/API_IndexMarquee', this.form).then((res) => {
      this.init();
    });
  },
};
</script>

<style lang="scss" scoped>
.news {
  color: $navy_dark;
  border: 1px solid black;
  border-radius: 15px;

  .megaphone {
    width: 16px;
    color: $navy_dark;
    line-height: 24px;
  }

  .marquee {
    width: 100%;
    overflow: hidden;
    display: flex;

    &__item {
      display: inline-block;
      white-space: nowrap;
    }
  }
}

.marquee-enter-active {
  transform: translateX(0px);
  transition: all 1s ease;
}

.marquee-leave-active {
  transform: translateX(0px);
  transition: all .5s ease;
}

.marquee-enter {
  transform: translateX(500px);
}

.marquee-leave-to {
  transform: translateX(-500px);
}
</style>
