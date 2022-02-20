<template lang="pug">
//- 任务3
.missionCollapseItem.my-3(ref='head')
  .d-flex.flex-row.justify-content-between(@click='handleChange')
    div
      span.missionIconSuccess.el-icon-success.mr-2(v-if='memberAllTasks[3].taskCount === memberAllTasks[3].completeCount')
      span.missionIcon.el-icon-circle-check.mr-2(v-else)
      span.missionName {{`${memberAllTasks[3].name} (${memberAllTasks[3].completeCount}/${memberAllTasks[3].taskCount})`}}：
      span.missionDes {{`${memberAllTasks[3].title}`}}
    div.missionType {{memberAllTasks[3].type}}
  .content(ref='inner')
    p.missionType.text-center.my-3(v-html='memberAllTasks[3].content')
    //- p.missionType.text-center.my-3 每日登入梦工厂签到可获得梦基金，详细请见签到面板，另外每月签到累计达 3/7/14/21/28 天都可再额外获得梦基金呦～任务奖励 : 见签到面板
    p.missionType.text-center.my-3.text-white 发红包时段(北京时间GMT+8) : 02:30～02:40、15:30～15:40、19:30～19:40、23:30～23:40 
    .PersonInfoTableItem.my-3.p-3
      p.text-white.text-center(v-if='bonusTimes') 今日剩余抢红包次数 ：{{bonusTimes}} 次
      p.text-white.text-center(v-else) 今日剩余抢红包次数
      p.text-white.text-center
        el-button(type='primary', @click='openBonus') 抢红包
  el-dialog.clearDialog(:visible.sync='dialogVisible', :width='dialogWidth')
    .closeButton(@click='closeCommandDialog')
      i.fas.fa-times
    .redEnvelopes(:style='{background:redEnvelopesBg}')
      .top(:class='{"envelopeOpen": openEnvelopes}')
        img.w-100(:src='imgPath+"pic_redenvelope-bg-top--png.png"'  
                  :srcset='imgPath+"pic_redenvelope-bg-top--png@2x.png 2x, "+imgPath+"pic_redenvelope-bg-top--png@3x.png 3x"')
      .title(:class='{"titleShow": openEnvelopes}')
        img.w-100(:src='imgPath+"pic-redenvelope-title-open.png"'  
                  :srcset='imgPath+"pic-redenvelope-title-open@2x.png 2x, "+imgPath+"pic-redenvelope-title-open@3x.png 3x"')
      .bonusPoint(:class='{"bonusPointShow": openEnvelopes}') {{bonusPoint}}
        span 点
      .text-center.my-3
        .bonusBtn.my-3(:class='{"bonusBtnShow": openEnvelopes}', @click='closeCommandDialog') 查看其他任务
        
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      openCollapse: false,
      dialogVisible: false,
      dialogWidth:'40%',
      imgPath:`${window.CDN_ASSETS}/static/img/redEnvelopes/`,
      redEnvelopesBg:`url(${window.CDN_ASSETS}/static/img/redEnvelopes/pic_redenvelope-bg.png)`,
      openEnvelopes:false,
      bonusPoint: 1,
    };
  },
  computed: {
    ...mapState('mission', ['activeTask', 'memberAllTasks', 'TaskBonus', 'bonusTimes' ]),
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
    closeCommandDialog() {
      this.dialogVisible = false;
      this.openEnvelopes = false;
    },
    openBonus(){
      this.getBonus();
      // 開發時顯示動畫
      // this.dialogVisible = true;
      //     setTimeout(() => {
      //       this.openRedEnvelopes();
      //     }, 500);
    },
    getBonus(){
      const payload = {};
      this.$store.dispatch('mission/getTaskBonus', payload)
        .then((res)=>{
          console.log(res)
          this.dialogVisible = true;
          setTimeout(() => {
            this.openRedEnvelopes();
          }, 500);
          // 返回的點數 傳至 this.bonusPoint;
          this.bonusPoint = res.data.data[0].point;
          this.$store.dispatch('mission/getMemberAllTasks');
          this.$store.dispatch('mission/getBonusTimes');
        }).catch((error) => {
          console.log(error)
        });
    },
    checkAppIntro(){
      if (this.$route.query.missionType ==3) {
        this.handleChange();
      }
    },
    resize(){
      if(window.innerWidth < 500){
        this.dialogWidth = '80%'
      } else{
        this.dialogWidth = '424px'
      }
    },
    openRedEnvelopes(){
      this.openEnvelopes = true;
    },
  },
  mounted () {
    this.$store.dispatch('mission/getBonusTimes');
    this.checkAppIntro();
    window.addEventListener('resize', this.resize);
    this.resize();
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
  .redEnvelopes{
    width: 100%;
    min-height: 560px;
    background-image: linear-gradient(to bottom, #d60000, #a00000);
    color: white;
    .top{
      transform: scaleY(1);
      transform-origin: top center;
      transition-duration: 1s;
    }
    .envelopeOpen{
      transform: scaleY(0);
    }
    .bonusPoint{
      width: 100%;
      text-align: center;
      font-size: 2rem;
      opacity: 0;
      transition: opacity .5s;
    }
    .bonusPointShow{
      opacity: 1;
      transition-delay: 1s;
    }
    .bonusBtn{
      display: inline-block;
      color: white;
      width: 204px;
      height: 38px;
      line-height: 38px;
      border-radius: 24px;
      background-image: linear-gradient(to top, #b30011, #ff4f14);
      opacity: 0;
      transition: opacity .5s;
    }
    .bonusBtnShow{
      opacity: 1;
      transition-delay: 1.2s;
    }
    .title{
      position: absolute;
      width: 100%;
      top:0;
      padding: 0 10px;
      opacity: 0;
      transition: opacity .5s;
    }
    .titleShow{
      opacity: 1;
      transition-delay: 0.8s;
    }
  }
  .clearDialog{
    .el-dialog{
      border-radius: 8px !important;
    }
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
      padding: 0 !important;
    }
  }
  .closeButton{
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: -32px;
    width: 24px;
    height: 24px;
    box-shadow: 0 0 12px 0 $balckAlpha_30, 0 0 12px 0 $balckAlpha_30;
    border-radius: 100%;
    background-color: white;
    text-align: center;
    line-height: 24px;
    opacity: 1;
    transition: 0.3s
  }
</style>

