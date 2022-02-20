<template lang="pug">
.container-fluid
  .signatureDiv
    .container-fluid.p-0
      .col-12.my-3
        .DWBreadcrumb
          router-link(to='/') 首页
          span.mx-2 /
          span 每日签到
      .w-100.text-center
        img.signatureTitle(:src='signatureTitle')
        p.text-white(v-if='TaskSignatureTable.status') 本月免费补签剩余：{{TaskSignatureTable.status.freeCount-TaskSignatureTable.status.usedCount}} 次
        p.text-white 
          small 免费补签次数隔月将重新计算，不可跨月补签。
      .row.no-gutters
        .col-12.col-sm-12.col-md-12.col-lg-5.col-xl-5.text-center.signatureImage
          img(:src='signatureImage')
        .col-12.col-sm-12.col-md-12.col-lg-7.col-xl-7
          .row.px-5.mb-5
            .col-6.col-sm-6.col-md-6.col-lg-4.col-xl-3(v-for='(item, index, key) in TaskSignatureTable.table',v-if='key>=startDay && key<=endDay')
              .signatureDay(:class='{"signatureDayActive":(key+1)==currentDay }')
                //- 显示日期及星期
                p.text-center.my-2 {{dayFormat(index)}} ({{week_list[getWeekDay(index)]}})
                p.text-center
                  small {{TaskSignatureTable.status.point | commaFormatDefault}} 点积分
                p.text-center
                  img(:src='signaturebBonus')
                //- 过往天数layer 补签状态
                .signatureStatusDisabled(v-if='(key+1)<currentDay')
                  div.text-center.mt-5
                    img.mt-5(v-if='item==0 && (key+1)<currentDay', :src='signaturebBonusError')
                  div.text-center.signatureStatusbottom
                    el-button.signatureBtn.w-100(v-if='item==0 && (key+1)<currentDay && TaskSignatureTable.status.freeCount>0', type='primary', @click='submitHandleFreeSignature(index)' ) 补签
                //- 过往天数layer 已签状态
                .signatureStatus(v-if='item==1 && (key+1)<currentDay')
                  div.text-center.mt-5
                    img.mt-5(:src='signaturebBonusSucess')
                //- 当天盖板状态 可领取状态
                .signatureStatus(v-if='item==0 && (key+1)==currentDay')
                  div.text-center.signatureStatusbottom
                    el-button.signatureBtn.w-100(v-if='item==0 && (key+1)==currentDay', type='primary', @click='submitHandleTaskSignature') 领取
                //- 当天盖板状态 已领取状态
                .signatureStatusDisabled(v-if='item==1 && (key+1)==currentDay')
                  div.text-center.mt-5
                    img.mt-5(:src='signaturebBonusSucess')
            .col-6.col-sm-6.col-md-4.col-lg-4.col-xl-3
              .signatureDay.text-center
                p.my-5
                  el-button.signatureBtn(:disabled='startDay<1', type='primary', @click='pervWeek') 上一周
                p.my-5
                  el-button.signatureBtn(:disabled='endDay>=(31)', type='primary', @click='nextWeek') 下一周
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      week_list: ['日', '一', '二', '三', '四', '五', '六'],
      currentDay: new Date().getDate() ,
      startDay: 0,
      endDay: 6,
      openCollapse: false,
      dialogVisible: false,
      signatureImage: `${window.CDN_ASSETS}/static/img/SignatureImage.png`,
      signatureTitle: `${window.CDN_ASSETS}/static/img/SignatureTitle.png`,
      signaturebBonus: `${window.CDN_ASSETS}/static/img/SignatureBonus.png`,
      signaturebBonusSucess: `${window.CDN_ASSETS}/static/img/SignatureBonusSuccess.png`,
      signaturebBonusError: `${window.CDN_ASSETS}/static/img/SignatureBonusError.png`,
    };
  },
  computed: {
    ...mapState('mission', ['activeTask', 'memberAllTasks', 'TaskSignatureTable' ]),
  },
  methods: {
    dayFormat(val){ return this.$dayjs(val).format('MM-DD');},
    getWeekDay(val){return this.$dayjs(val).day();},
    pervWeek(){
      this.startDay-=7;
      this.endDay-=7;
    },
    nextWeek(){
      this.startDay+=7;
      this.endDay+=7;
    },
    submitHandleTaskSignature(){
      const payload = {};
      this.$store.dispatch('mission/submitTaskSignature', payload)
        .then((res)=>{
          this.$store.dispatch('wallet/getMemberWallet');
          this.$store.dispatch('mission/getTaskSignatureTable');
        });
    },
    submitHandleFreeSignature(index){
      const payload = { date:index };
      this.$store.dispatch('mission/submitFreeSignature',payload)
        .then((res)=>{
          this.$store.dispatch('wallet/getMemberWallet');
          this.$store.dispatch('mission/getTaskSignatureTable');
        });
    }
  },
  mounted() {
    // 取得當週日期
    // const d = new Date();
    // const date = d.getDate();
    // const day = d.getDay();
    // const weekOfMonth = Math.ceil((date + 6 - day)/7);
    this.startDay = (Math.floor((this.currentDay-1)/7)*7)
    console.log(this.currentDay)
    this.endDay = this.startDay+6
    this.$store.dispatch('mission/getTaskSignatureTable');
  },
};
</script>

<style lang="scss" scoped>
.signatureDiv{
  box-shadow: 0 2px 10px 0 rgba(0, 12, 28, 0.6);
  background-image: linear-gradient(to bottom, #061930 1%, #00324f 51%, #061930 99%);
}
.signatureTitle{
  img{
    width: 60%;
  }
}
/deep/.signatureBtn{
  border: none;
  background: linear-gradient(to left, #00efd1 100%, #00acea 0%);
  background: -webkit-gradient(linear, right top, left top, color-stop(100%, #00efd1), color-stop(0%, #00acea));
}
.signatureTitle{
  @include media_xs{
    max-height: 100px;
  }
  @include media_sm{
    max-height: 100px;
  }
  @include media_md{
    max-height: 100px;
    // width: 100%;
  }
  @include media_lg{
    max-height: 160px;
    width: auto;
  }
  @include media_xl{
    max-height: 160px;
    width: auto;
  }
}
.signatureImage{
  @include media_xs{
    // max-height: 240px;
  }
  @include media_sm{
    // max-height: 240px;
  }
  @include media_md{
    // max-height: 320px;
    width: 100%;
  }
  @include media_lg{
    // max-height: 620px;
    width: 100%;
  }
  @include media_xl{
    // max-height: 620px;
    width: 100%;
  }
  img{
    width: 100%;
    height: auto;
  }
}
.signatureDay{
  position: relative;
  color: white;
  height: 226px;
  border-radius: 8px;
  margin: 10px 0;
  // background: rgba(0, 0, 0, 0.59);
  border-radius: 8px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.59);
  border: solid 2px rgba(0, 0, 0, 0.59);
  overflow: hidden;
  .signatureBonus{
    height: 60%;
    width: auto;
  }
}
.signatureStatusDisabled{
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.59);
}
.signatureStatus{
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0);
}
.signatureStatusbottom{
  width: 100%;
  position: absolute;
  bottom: 0;
}
.signatureDayActive{
  border-radius: 8px;
  box-shadow: 0 0 12px 0 #47e4c2;
  border: solid 2px #47e4c2;
}
</style>
