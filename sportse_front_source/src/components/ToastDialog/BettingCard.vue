<template lang='pug'>
.BettingCard
  .container.p-3
    .row
      .col-6
        P.bettingType 讓球
        P.gameName 英格蘭足球超級聯賽
        P.teamName 奧克拉荷馬雷霆 V.S. 洛杉磯湖人
      .col-6
        h5.T_Color_2.text-right @1.6 
        p.text-right 奧克拉荷馬雷霆 -1.5
      .col-12
        h3.bettingAmount.text-right {{ bettingAmount | commaFormatDefault }}
        .F_BETWEEN
          small 請使用數字鍵盤
          small 錢包餘額: {{maxValue | commaFormat}}
    .row
      .col-12
        .row
          .col
            .computerBtn(@click='countNum(50)') +50
          .col
            .computerBtn(@click='countNum(100)') +100
          .col
            .computerBtn(@click='countNum(250)') +250
          .col
            .computerBtn(@click='setMaxValue')  最高
    hr.my-2
    .row
      .col-12
        .row
          .col-4
            .computerBtn(@click='countStr(7)') 7
          .col-4
            .computerBtn(@click='countStr(8)') 8
          .col-4
            .computerBtn(@click='countStr(9)') 9
          .col-4
            .computerBtn(@click='countStr(4)') 4
          .col-4
            .computerBtn(@click='countStr(5)') 5
          .col-4
            .computerBtn(@click='countStr(6)') 6
          .col-4
            .computerBtn(@click='countStr(1)') 1
          .col-4
            .computerBtn(@click='countStr(2)') 2
          .col-4
            .computerBtn(@click='countStr(3)') 3
          .col-4
            .computerBtn(@click='countStr(0)') 0
          .col-4
            .computerBtn(@click='resetNum') C
          
          .col-4
            .computerBtn(@click='rounding')
              i.fas.fa-backspace
    .row.my-3
      .col-12
        el-button.w-100(type="primary", :disabled='bettingAmount<=0', @click='gotoBettingSuccess') 確認提交
</template>

<script>

export default {
  data() {
    return {
      bettingAmount: 0,
      maxValue: 99999,
    };
  },
  methods: {
    countNum(num) {
      if ((this.bettingAmount + num) >= this.maxValue) { 
        this.bettingAmount = this.maxValue;
      } else { 
        this.bettingAmount += num;
      }
    },
    countStr(str) {
      const count = Number(String(this.bettingAmount) + String(str));
      if ((count >= this.maxValue)) {
        this.bettingAmount = this.maxValue;
      } else { 
        this.bettingAmount = count;
      }
    },
    setMaxValue() {
      this.bettingAmount = this.maxValue;
    },
    resetNum() {
      this.bettingAmount = 0;
    },
    rounding() {
      let temp = String(this.bettingAmount);
      temp = temp.substr(0, String(temp.length) - 1);
      this.bettingAmount = Number(temp) || 0;
    },
    gotoBettingSuccess() {
      this.$store.dispatch('dialog/closeToastDialog');
      this.$router.push('/bettingsuccess');
    },
  },
};
</script>

<style lang='scss' scoped>
.BettingCard{
  .bettingAmount{
    padding: 4px;
    border-radius: 8px;
    border: solid 1px #b3b3b3;
  }
  .computerBtn{
    cursor: pointer;
    margin: 8px 0;
    height: 44px;
    font-size: 20px;
    color: $Color_2;
    text-align: center;
    line-height: 44px;
    border-radius: 8px;
    border: solid 1px $Color_2;
    background-color: rgba(2, 119, 189, 0.09);
    &:hover, &:active{
      color:#fff;
      background-color: rgba(2, 119, 189, 0.3);
    }
  }
}
</style>
