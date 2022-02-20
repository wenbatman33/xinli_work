<template  lang="pug">
.registerDialog.row.no-gutters
  .tab-group.w-100.d-flex.flex-row
    .tab-button.w-50(@click='changeTab(1)', :class='[tabActive==1 ? "active" : "" ]') 使用账号注册
    .tab-button.w-50(@click='changeTab(2)', :class='[tabActive==2 ? "active" : "" ]') 手机快捷注册
  .BLOCK.mt-3
    .row.no-gutters(v-if='tabActive === 1')
      bl_RegisterFrom
    .row.no-gutters(v-if='tabActive === 2')
      bl_MobileRegisterFrom
</template>
<script>
import bl_RegisterFrom from '@/components/bl_Register/bl_RegisterFrom.vue';
import bl_MobileRegisterFrom from '@/components/bl_Register/bl_MobileRegisterFrom.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  name: 'bl_Register',
  components: {
    bl_RegisterFrom,
    bl_MobileRegisterFrom,
  },
  computed: {
    ...mapState('dialog', [
      'tabActive',
    ]),
  },
  watch: {
    tabActive(val) {
      if (val === 1) {
        this.$router.push({ path: this.$route.fullPath, query: { type: 'account' } });
      } else if (val === 2) {
        this.$router.push({ path: this.$route.fullPath, query: { type: 'phone' } });
      }
    },
  },
  methods: {
    changeTab(num) {
      this.$store.commit('dialog/setTabActive', num);
    },
  },
  mounted() {
    if (this.$route.query.type === 'phone') {
      this.changeTab(2);
    } else {
      this.changeTab(1);
      this.$router.push({ path: this.$route.fullPath, query: { type: 'account' } });
    }
  },
};
</script>
