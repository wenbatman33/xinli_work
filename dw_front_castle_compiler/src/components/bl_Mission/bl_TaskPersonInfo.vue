<template lang="pug">
//- 任务0
.missionCollapseItem.my-3(ref='head', v-if='Object.keys(TaskPersonInfoTable).length>0')
  .d-flex.flex-row.justify-content-between(@click='handleChange')
    div
      span.missionIconSuccess.el-icon-success.mr-2(v-if='memberAllTasks[0].taskCount === memberAllTasks[0].completeCount')
      span.missionIcon.el-icon-circle-check.mr-2(v-else)
      span.missionName {{`${memberAllTasks[0].name} (${memberAllTasks[0].completeCount}/${memberAllTasks[0].taskCount})`}}：
      span.missionDes {{`${memberAllTasks[0].title}` }}
    div.missionType {{memberAllTasks[0].type}}
  .content(ref='inner', v-if='TaskPersonInfoTable')
    p.missionType.text-center.my-3(v-html='memberAllTasks[0].content')
    .PersonInfoTableItem.d-flex.flex-row.justify-content-between.my-3(v-for='(item, index, key) in TaskPersonInfoTable', v-if='key<5') 
      div
        span.missionIconSuccess.el-icon-success.mr-2(v-if='item !== -1')
        span.missionIcon.el-icon-circle-check.mr-2(v-else)
        span 完善个人资料 : {{personInfoTableObj.index}} {{personInfoTableObj[index]}}
      div
        el-button(v-if='item===-1', type='info', @click='checkPersonal(index)') 去完善
        el-button(v-if='item===0', type='primary',  @click='submitTaskPersonInfo(key+1)') 领奖 
        el-button(v-if='item===1', type='info') 已领取
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      activeNames: ['1'],
      openCollapse: false,
      personInfoTableObj:{ name: '姓名', birthday: '生日', phone: '手机',  mail: '邮箱',  bankcard: '银行卡' },
    };
  },
  computed: {
    ...mapState('index', ['MAINDOMAIN']),
    ...mapState('mission', ['activeTask', 'memberAllTasks', 'TaskPersonInfoTable' ]),
  },
  methods: {
    handleChange(){
      const head = this.$refs['head'];
      const inner = this.$refs['inner'];
      this.openCollapse = !this.openCollapse; 
      console.log(inner.offsetHeight)
      if(this.openCollapse){
        head.style.height = (inner.offsetHeight+100)+'px';
      } else {
        head.style.height = '46px';
      }
    },
    checkPersonal(index){
      if(index === 'name' || index==='birthday'){
        if (window.navigator.userAgent.indexOf('Android') > 0) {
          try {
            window.android.app_gopersonal();
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            window.webkit.messageHandlers.app_gopersonal.postMessage('app_gopersonal');
          } catch (error) {
            console.log(error);
          }
        }
        setTimeout(() => {
          window.location.href = `${this.MAINDOMAIN}/my/personal`;
        }, 1000);
      } else {
        if (window.navigator.userAgent.indexOf('Android') > 0) {
          try {
            window.android.app_godetail();
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            window.webkit.messageHandlers.app_godetail.postMessage('app_godetail');
          } catch (error) {
            console.log(error);
          }
        }
        setTimeout(() => {
          window.location.href = `${this.MAINDOMAIN}/my/detail`;
        }, 1000);
      }
    },
    submitTaskPersonInfo(key){
      const payload = { type: key };
      this.$store.dispatch('mission/submitTaskPersonInfo', payload)
        .then((res)=>{
          this.$store.dispatch('wallet/getMemberWallet');
          this.$store.dispatch('mission/getTaskSignatureTable');
        });
    },
    checkAppIntro(){
      if (this.$route.query.missionType ==0) {
        this.handleChange();
      }
    }
  },
  mounted () {
    this.$store.dispatch('mission/getTaskPersonInfoTable').then((res)=>{
      this.checkAppIntro();
    }).catch((err) => {
      this.checkAppIntro();
    });
  }
};
</script>

<style lang="scss" scoped>
.Collapse{
  overflow: hidden;
  height: 40px;

}
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
</style>
