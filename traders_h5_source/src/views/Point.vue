<template lang="pug">
.w-full.scrollWrap(v-if='MemberData')
  .headerBar
    p.text-center 点数
    .backBtn
      router-link(to='/')
        span.mx-2
          i.fas.fa-angle-left
        span Back
  .container.mx-auto
    .w-full.text-center
      RandomText.my-3(TAG='h2', :TXT='MemberData.point', delayTime='0', LoopTime='10000', SIZE='50px', COLOR='#BC9CFF')
      RandomText.my-3(TAG='p', TXT='可用點數',delayTime='600', LoopTime='10000', SIZE='14px', COLOR='#330000')
    .w-full.overflow-auto(v-infinite-scroll='init', :infinite-scroll-disabled='disabled')
      .w-full.walletItem(v-for='(item, index) in MemberPointLog')
        .flex
          .flex.justify-center.items-center(class='w-1/12')
            i.fas.fa-arrow-alt-circle-up.text-myPurple.fs24(v-if='item.refer_type.value===2')
            i.fas.fa-arrow-alt-circle-down.text-myTeal.fs24(v-else)
          .flex.flex-col.justify-center(class='w-1/2')
            p.text-sm utrader
            p.text-lg.font-semibold.text-myPurple(v-if='item.refer_type.value===2') - {{item.point}}
            p.text-lg.font-semibold.text-myTeal(v-else) + {{item.point}}
            p.text-sm.text-gray-400 {{item.created_at}}
          .flex.flex-col.items-end.fs14.px-3(class='w-5/12')
            p.text-sm.text-gray-700  {{item.refer_type.display}}
            p.text-base.font-semibold.text-gray-700  餘額 {{item.after_point}}
</template>

<script>
import RandomText from '@/components/RandomText/RandomText.vue';
import { mapState } from 'vuex';

export default {
  components: {
    RandomText,
  },
  data() {
    return {
      allLog: 0,
      loading: false,
      payload: {
        current_page: 0,
        per_page: 20,
      },
    };
  },
  computed: {
    ...mapState('member', ['MemberData', 'MemberInfo', 'MemberPointLog']),
    disabled() {
      return this.loading;
    },
  },
  methods: {
    init() {
      // this.loading = true;
      const current = this.payload.current_page;
      const per_page = this.payload.per_page;
      setTimeout(() => {
        if (this.allLog === 0) {
          this.payload.current_page += 1;
          this.getData();
        } else if ((current * per_page) < this.allLog) {
          this.payload.current_page += 1;
          this.getData();
        }
        // this.loading = false;
      }, 2000);
    },
    getData() {
      this.$store.dispatch('member/getMemberPointLog', this.payload)
        .then((res) => {
          this.allLog = res.data.meta.pagination.total;
        });
    },
  },
  mounted() {
    // this.$store.commit('member/cleanMemberPointLog');
    // this.init();
  },
};
</script>
<style lang='scss' scoped>
.floatCard{
  min-height: 180px;
  background: #FFFFFF;
  box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
  border-radius: 4px;
}
.walletItem{
  min-height: 90px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.06);
}
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}
.mscroll{
  height: 100vh;
  overflow-y: auto;
}
.scrollWrap{
  min-height: 1400px;
}
</style>
