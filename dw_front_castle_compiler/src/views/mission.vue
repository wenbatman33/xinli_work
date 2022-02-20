<template lang="pug">
.container-fluid
  .container.missionList#missionList
    .row
      .col-12.my-3
        .DWBreadcrumb
          router-link(to='/') 首页
          span.mx-2 /
          span 赚梦基金
      .col-12.text-center
        img.headImg(:src='headImg')
        .pageTitle.text-white.my-3 完成梦工厂任务，赚取梦基金！
        .pageDec.text-white.my-3 完成简易任务，获得更多奖励！想知道怎么获得梦基金？完成下方梦工厂指定任务，立即获得奖励。
        hr
    .missiondDesTitle.d-flex.flex-row.justify-content-between
      span.text-white 任务名称
      span.text-white 任务状态
    .missionCollapse(v-if='memberAllTasks.length>0')
      //- 任务们
      a#missionType0
      bl_TaskPersonInfo(v-if='apiReady')
      a#missionType1
      bl_TaskSignatureTable(v-if='apiReady')
      a#missionType2
      bl_TaskShareLink(v-if='apiReady')
      a#missionType3
      bl_TaskBonus(v-if='apiReady')
</template>
<script>
import bl_TaskPersonInfo from '@/components/bl_Mission/bl_TaskPersonInfo.vue';
import bl_TaskSignatureTable from '@/components/bl_Mission/bl_TaskSignatureTable.vue';
import bl_TaskShareLink from '@/components/bl_Mission/bl_TaskShareLink.vue';
import bl_TaskBonus from '@/components/bl_Mission/bl_TaskBonus.vue';
import VueQRCodeComponent from 'vue-qrcode-component'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    VueQRCodeComponent,
    bl_TaskPersonInfo,
    bl_TaskSignatureTable,
    bl_TaskShareLink,
    bl_TaskBonus,
  },
  data() {
    return {
      apiReady: false,
      headImg:`${window.CDN_ASSETS}/static/img/pic-shopping-mission.png`,
    };
  },
  computed: {
    ...mapState('mission', [
      'memberAllTasks',
      ]),
  },
  methods: {
  },
  mounted() {
    this.$store.dispatch('mission/getMemberAllTasks')
      .then((res)=>{
        this.apiReady= true;
        if (this.$route.query.missionType ==3) {
          const st = window.document.getElementById('missionType'+ this.$route.query.missionType).offsetTop;
          window.document.getElementById('mainContent').scrollTop = st-50;
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.missionList{
  padding-bottom: 50px;
  min-height: 500px;
  .headImg{
    width: 80%;
    max-width: 600px;
    height: auto;
  }
  .pageTitle{
    font-size: 22px;
    font-weight: bold;
    @include media_lg{
      font-size: 30px;
    }
    @include media_xl{
      font-size: 30px;
    }
  }
  .pageDec{
    font-size: 14px;
  }
}
</style>
