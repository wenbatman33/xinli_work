<template lang="pug">
  .formWrap
    .px-3.pt-2
      .betGameRect.w-100.my-3(v-for='(item, index) in betGameList')
        .row.no-gutters
          .col-12.col-sm-12.col-md-12.col-lg-3.col-xl-3.p-2
            .ribbon
              i.ribbonBackside
              p {{item.status.display}}
              bl_GameTimeCounter(:time='item.date')
          .col-12.col-sm-12.col-md-12.col-lg-3.col-xl-3.p-2
            .d-flex.flex-column.justify-content-center.align-content-center.h-100
              .betGameInfo.d-flex.flex-column.justify-content-center.align-content-center.h-100.text-center.text-sm-center.text-md-center.text-lg-left.text-xl-left
                  p.betGameDate {{getDate(item.date)}}
                  p.betGameTime {{getTime(item.date)}} (北京时间)
                  p.betGameName {{item.name}}
          .col-12.col-sm-12.col-md-12.col-lg-3.col-xl-3.p-2.justify-content-center.align-content-center
            .d-flex.flex-column.justify-content-center.align-content-center.h-100
              .betGameTeams.mt-1.mt-lg-2.text-center.text-sm-center.text-md-center.text-lg-left.text-xl-left
                .row.no-gutters
                    .homeTeam.col-12.col-sm-12.col-md-12.col-lg-12.col-xl-12.mb-2
                      //-  隊名
                      span.homeIcon.mr-2 主
                      span {{item.home}}
                    .guestTeam.col-12.col-sm-12.col-md-12.col-lg-12.col-xl-12.mb-2
                      //-  隊名
                      span.guestIcon.mr-2  客
                      span {{item.guest}}
          .col-12.col-sm-12.col-md-12.col-lg-3.col-xl-3.p-2
            .d-flex.flex-column.justify-content-center.align-content-center.h-100
              .row.no-gutters.text-center.text-sm-center.text-md-center.text-lg-left.text-xl-left
                .col.col-4.col-sm-4.col-md-4.col-lg-12.col-xl-12.p-1(v-for='(subitem, subindex) in item.betTeam', v-if='item.betTeam.length>0')
                  el-radio-group(v-model='tasks[index].bet_team_id', v-if='tasks.length>0', :key='index',siz)
                    el-radio.choseTeamBtn(:label='subitem.value', :key='"r_"+index+"_"+subindex', border, size='small') {{subitem.display}}
      //- p {{betGameList}}
    //- 报名表單
    .px-3.pb-2
      P 报名页面
      //- p {{tasks}}
      //- p {{eventForm}}
      //- p {{eventFormObject}}
      el-form(:model="eventForm", ref='eventForm', :rules='eventFormRules', @submit.native.prevent='formSubmit("eventForm")')
        div.my-3(v-for='(item, key, index) in eventFormObject', v-if='Number(item.show)!==3')
          el-form-item.m-0(:prop="key" label-position='top' :label="item.name")
            el-input(v-model='eventForm[key]', placeholder='',  autocomplete='off')
        div.my-4
          el-form-item.my-1
            el-button.w-100(type="primary", native-type='submit', :disabled='eventFormValidate===false') 提交
    el-dialog(:visible.sync='successDialogVisible', :close-on-click-modal='false', :close-on-press-escape='false' :show-close='false', center)
      p.mb-3.text-center 您已成功参加活动！
      p
        el-button.w-100(type="primary", @click='clickFormSubmitSuccess') 确定
    el-dialog(:visible.sync='redirectDialogVisible', :close-on-click-modal='false', :close-on-press-escape='false' :show-close='false', center)
      p.text-center {{successCounter}} 秒后带您转跳网址
</template>
<script>
import bl_GameTimeCounter from '@/components/bl_Event_1/bl_GameTimeCounter';
import { mapState } from 'vuex';

const check_account = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入5~15位半形英文、数字或下划线'));
  } else if (!(/^[a-zA-Z0-9_]{5,15}$/.test(value))) {
    callback(new Error('请输入5~15位半形英文、数字或下划线'));
  } else {
    callback();
  }
};
const check_Phone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输手机号'));
  } else if (!/^(1)\d{10}$/.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
};
const account = [
  { required: true, message: '请输入5~15位半形英文、数字或下划线', trigger: ['blur', 'change'] },
  { validator: check_account, trigger: ['blur', 'change'] },
  { min: 5, max: 15, message: '请输入5~15位半形英文、数字或下划线', trigger: 'blur'}
];
const email = [
  { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
];
const phone = [
  { required: true, message: '请输入联系电话', trigger: ['blur', 'change'] },
  { validator: check_Phone, trigger: ['blur', 'change'] },
];
export default {
  components: {
    bl_GameTimeCounter
  },
  computed: {
    ...mapState('event_1', ['betGameList', 'eventData']),
  },
  data() {
    return {
      successDialogVisible: false,
      redirectDialogVisible: false,
      radioTasks:[],
      tasks:[],
      eventForm:{},
      eventFormValidate: false,
      eventFormRules: {},
      eventFormObject: {},
      successRedirectionSecond:0,
      successRedirectionUrl:'',
      successCounter:0,
    };
  },
  watch: {
    betGameList(val){
      console.log(val)
      const vm = this;
      Object.values(val).forEach(function(item, key){
        const temp ={
          "game_id": item.id,
          "bet_team_id": ''
        }
        vm.tasks.push(temp)
      });
    },
    eventForm: {
      handler(val) {
        this.$refs.eventForm.validate((valid) => {
          if(valid) this.eventFormValidate =true;
        })
      },
      deep: true,
    },
  },
  methods: {
    init(){
      const vm = this;
      const  JsonData = JSON.parse(this.eventData[0].formField);
      Object.values(JsonData).forEach(function(item, key){
        if(item.validator ==='phone' && Number(item.show) !==3){
          vm.eventFormRules['phone'] = phone;
          // item.show =2 為非必填
          if(Number(item.show)===2){
            vm.eventFormRules['phone'][0].required=false
          }
        } else if(item.validator ==='email' && Number(item.show) !==3){
          vm.eventFormRules['email'] = email;
          // item.show =2 為非必填
          if(Number(item.show)===2){
            vm.eventFormRules['email'][0].required=false
          }
        } else if(item.validator ==='account' && Number(item.show) !==3){
          vm.eventFormRules['account'] = account;
          // item.show =2 為非必填
          if(Number(item.show)===2){
            vm.eventFormRules['account'][0].required=false
          }
        } else{
          if(Number(item.show)===1){ 
            vm.eventFormRules[item.input]= [];
            vm.eventFormRules[item.input].push({required: true, message: `请输入${item.name}`,})
          }
        }
      });
      // 活動id
      this.eventForm.enactment_id = this.$route.params.id;
      this.eventFormObject = JsonData;
      this.successRedirectionSecond = this.eventData[0].pageJump.second;
      this.successRedirectionUrl = this.eventData[0].pageJump.url;
      this.successRedirectionstatus = this.eventData[0].pageJump.status;
      this.betGameList.forEach(function(item, key){
        const temp ={
          "game_id": item.id,
          "bet_team_id": ''
        }
        vm.tasks.push(temp)
      });

      
    },
    getDate(val){
      return this.$dayjs(val).format('YYYY-MM-DD')
    },
    getTime(val){
      return this.$dayjs(val).format('HH:mm')
    },
    radioClick(gameId, val, index){
      const arr = [gameId, val];
      if (this.tasks.length<=0){
        console.log(arr)
        this.tasks.push(arr)
      } else {
        this.tasks[index]= arr;
      }
    },
    formSubmit(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        if(valid) {
          // 篩選去掉未投注為空的賽事
          const arr = vm.tasks.filter(item=>item.bet_team_id!=='');
          vm.eventForm['tasks'] = arr;
          this.eventFormValidate = false;
          this.$axios.post('/api/Event0002/Frontend/RegEvent',this[form])
            .then((res) => {
              this.formSubmitSuccess();
            });
        }
      });
    },
    formSubmitSuccess () {
      this.successDialogVisible = true
    },
    clickFormSubmitSuccess (){
      if(this.successRedirectionstatus===0){
        this.$refs['eventForm'].resetFields();
      } else {
        this.successRedirect();
      }
    },
    successRedirect () {
      this.successDialogVisible = false
      const vm = this;
      vm.successCounter = vm.successRedirectionSecond;
      vm.redirectDialogVisible =true
      const counter = setInterval(() => {
        vm.successCounter -=1;
      }, 1000);
      setTimeout(() => {
        window.location.replace(vm.successRedirectionUrl);
        clearInterval(counter);
      }, vm.successRedirectionSecond*1000);
    }
  },
  mounted () {
    this.init();
    // this.formSubmitSuccess();
  }
};
</script>
<style lang='scss' scoped>
  .formWrap{
    width: 100%;
    min-height: 484px;
    border-radius: 16px;
    box-shadow: 0 0 20px 0 rgba(57, 109, 238, 0.5);
    background-color: #ffffff;
    /deep/ .el-form-item{
      .el-form-item__label{
        line-height: 30px !important;
        margin-bottom: 0 !important;
      }
    }
  }
  .betGameRect {
    position: relative;
    // height: 124px;
    min-height: 100px;
    border-radius: 8px;
    color: white;
    background: linear-gradient(to left, $DW_ColorLight, $DW_Color 100%);
    .ribbon{
      position: relative;
      background-image: linear-gradient(to bottom, #e4364b, $DW_red);
      width: 100px;
      height: 60px;
      top: -18px;
      left: 0px;
      text-align: center;
      margin: auto;
      padding-top: 8px;
      font-size: 12px;
      margin-bottom: 32px;
    }
    .ribbon:before{
      content: "";
      position: absolute;
      bottom: -32px;
      left: 0;
      width: 0;
      height: 0;
      border-top: 32px solid $DW_red;
      border-right: 70px solid transparent;
    }
    .ribbon:after{
      content: "";
      position: absolute;
      bottom: -32px;
      right: 0;
      width: 0;
      height: 0;
      border-top: 32px solid $DW_red;
      border-left: 70px solid transparent;
    }
    i.ribbonBackside {
      content: "";
      position: absolute;
      left: auto;
      right: -10px;
      top: 0px;
      border: 5px solid transparent;
      border-color: transparent transparent #b30039 #b30039  ;
    }
    .vsIcon{
      margin-top: 30px;
      width: 48px;
      height: 28px;
    }
    .homeIcon{
      width: 22px;
      height: 22px;
      color: white;
      font-size: 14px;
      border-radius: 4px;
      text-align: center;
      display: inline-block;
      background-color: $DW_red;
    }
    .guestIcon{
      display: inline-block;
      width: 22px;
      height: 22px;
      color: white;
      font-size: 14px;
      border-radius: 4px;
      text-align: center;
      display: inline-block;
      background-color: $DW_ColorLight;
    }
    .betGameInfo{
      height: 100%;
      .betGameDate{
        margin: 5px 0;
        font-size: 14px;
        line-height: 1;
        color: white;
      }
      .betGameTime{
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        line-height: 1;
        color: white;
      }
      .betGameName{
        margin: 10px 0;
        font-size: 14px;
        line-height: 1;
        color: white;
      }
    }
    .choseTeamBtn {
      cursor: pointer;
      display: inline-block;
      height: 30px;
      border-radius: 19px;
      text-align: center;
      background-color: #2c3245;
      border: none;
      color: #999;
      font-size: 12px;
    }
    .is-checked{
      /deep/.el-radio__label {
        color: $DW_ColorLight !important;
      }
      /deep/.el-radio__inner{
        border-color: $DW_ColorLight !important;
        background: $DW_ColorLight !important;
      }
      
    }
  }
</style>
