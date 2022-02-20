<template lang="pug">
//- 任务1
.missionCollapseItem.my-3(ref='head')
  .d-flex.flex-row.justify-content-between(@click='handleChange')
    div
      span.missionIconSuccess.el-icon-success.mr-2(v-if='memberAllTasks[1].taskCount === memberAllTasks[1].completeCount')
      span.missionIcon.el-icon-circle-check.mr-2(v-else)
      span.missionName {{`${memberAllTasks[1].name} (${memberAllTasks[1].completeCount}/${memberAllTasks[1].taskCount})`}}：
      span.missionDes {{`${memberAllTasks[1].title}`}}
    div.missionType {{memberAllTasks[1].type}}
  .content(ref='inner')
    p.missionType.text-center.my-3(v-html='memberAllTasks[1].content')
    .PersonInfoTableItem.d-flex.flex-row.justify-content-center.my-3.p-3
      el-button(type='primary', @click='gotoSignature') 开启签到板
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      openCollapse: false,
    };
  },
  computed: {
    ...mapState('mission', ['activeTask', 'memberAllTasks', 'TaskSignatureTable' ]),
  },
  methods: {
    handleChange(){
      const head = this.$refs['head'];
      const inner = this.$refs['inner'];
      this.openCollapse = !this.openCollapse; 
      if(this.openCollapse){
        head.style.height = (inner.offsetHeight+100)+'px';
      } else {
        head.style.height = '46px';
      }
    },
    checkAppIntro(){
      if (this.$route.query.missionType ==1) {
        this.handleChange();
      }
    },
    gotoSignature(){
      this.$router.push({ path: '/signature'});
    },
  },
  mounted () {
    // this.$store.dispatch('mission/getTaskSignatureTable');
  }
};
</script>

<style lang="scss" scoped>
.missiondDesTitle{
    padding: 5px 40px 2px 40px;
    font-size: 12px;
  }
  .missionName {
    font-size: 14px;
    color: white;
  }
  .missionDes {
    font-size: 14px;
    color: white;
    
    @include media_xs{
      display: none;
    }
    @include media_sm{
      display: inline-block;
    }
    @include media_md{
      display: inline-block;
    }
    @include media_lg{
      display: inline-block;
    }
    @include media_xl{
      display: inline-block;
    }
  }
  .missionType {
    font-size: 14px;
    color: $DW_ColorLight;
  }
  .missionIcon{
    font-size: 20px;
    color: $garyBlue_Dark;
  }
  .missionIconSuccess{
    font-size: 20px;
    color: $DW_greenMiddle;
  }
  .missionCollapseItem{
    cursor: pointer;
    height: 46px;
    border-radius: 12px;
    border: solid 1px rgba(57, 109, 238, 0.24);
    padding: 10px;
    background-color: rgba(57, 109, 238, 0.24);
    overflow: hidden;
    transition: height 0.3s;
  }
  .PersonInfoTableItem{
    width: 100%;
    min-height: 64px;
    line-height: 64px;
    border-radius: 12px;
    padding: 0 20px;
    border: solid 1px $DW_ColorLight;
    color: white;
  }
.signatureDialog{  
  /deep/.el-dialog__header{
    display: none;
  }
  /deep/.el-dialog__body{
    padding: 0;
  }
  .signatureTitle{
    position: fixed;
    margin: -100px;
  }
  .signatureDiv{
    box-shadow: 0 2px 10px 0 rgba(0, 12, 28, 0.6);
    background-image: linear-gradient(to bottom, #061930 1%, #00324f 51%, #061930 99%);
  }
  .signatureImage{
    max-height: 620px;
    width: 100%;
  }
  .signatureDay{
    color: white;
    height: 226px;
    border-radius: 8px;
    margin: 10px 0;
    background: rgba(0, 0, 0, 0.59);
    
    .signaturebBonus{
      width: 100%;
      height: auto;
    }
  }
}
</style>
