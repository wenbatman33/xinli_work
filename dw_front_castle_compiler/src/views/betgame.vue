<template lang="pug">
.container-fluid
  el-form(:model='betForm', ref='betFormREF', :rules='betFormRules', @submit.native.prevent='')
    .container.betGameWarp.mb-5
      //- 切换选单
      .row.no-gutters.my-3
        .col-12.my-3
          .DWBreadcrumb
            router-link(to='/') 首页
            span.mx-2 /
            span 赛事投注
        bl_betMenuBtn
      .row.no-gutters.my-3
        bl_betGameBanner
      .betGameRect.py-3
        .row.no-gutters.my-3(v-if='dataLoaded')
          .col-12.mt-4
            p.text-white.text-center {{singleGameData[0].date}}
            p.text-white.text-center {{singleGameData[0].name}}
          .col-12.mt-3
            .betGameTeams.text-center
              .row.no-gutters
                .homeTeam.col-5
                  p.text-center.my-3
                    span.homeIcon 主
                  p.text-center.my-3
                    span {{singleGameData[0].home}}
                    span.mx-3(v-if='singleGameData[0].win.value===1') {{singleGameData[0].win.display}}
                    span.mx-3(v-if='singleGameData[0].win.value===3') {{singleGameData[0].win.display}}
                .col-2
                  p.text-center
                    img.vsIcon(:src='img1')
                .guestTeam.col-5.text-center
                  p.text-center.my-3
                    span.guestIcon 客
                  p.text-center.my-3
                    span {{singleGameData[0].guest}}
                    span.mx-3(v-if='singleGameData[0].win.value===2') {{singleGameData[0].win.display}}
                    span.mx-3(v-if='singleGameData[0].win.value===3') {{singleGameData[0].win.display}}
              .row
                .col-12
                  p.text-center.my-3.px-5
                    el-form-item(prop='team_id')
                      .row
                        //- 由 api給予 投注選項
                        .betBtn.col.mx-2(v-for='(item, index) in singleGameData[0].betTeam', @click='chosseTeam(item.value)', :class='{"betBtnActive": (betForm.team_id===item.value)}') {{item.display}}
                        //- .betBtn.col.mx-2(@click='chosseTeam(1)', :class='{"betBtnActive": (betForm.team_id===1)}') 主队胜
                        //- .betBtn.col.mx-2(@click='chosseTeam(3)', :class='{"betBtnActive": (betForm.team_id==3)}')  和局
                        //- .betBtn.col.mx-2(@click='chosseTeam(2)', :class='{"betBtnActive": (betForm.team_id==2)}')  客队胜
      .betGameRect_bet.py-3
        .row.no-gutters.my-3(v-if='dataLoaded')
          .col-12
            p.text-center.my-3 梦基金余额: {{memberWallet.point | commaFormatDefault}}
            p.text-center.my-3.px-5
              el-form-item(prop='point')
                el-input(v-model='betForm.point', type='number', :min='singleGameData[0].min', :max='singleGameData[0].max' :placeholder='`输入限额 ${singleGameData[0].min}～${singleGameData[0].max} 的投注金额`')
            p.text-center
              el-button.w-50.betBtnPrimary(:disabled='betForm.team_id==="" || betForm.point<singleGameData[0].min  || betForm.point>singleGameData[0].max ', round, @click='submitForm("betFormREF")') 下好离手
            p.text-center.my-3 ※ 请注意：确认投注将无法更改 ※
</template>
<script>
import bl_betMenuBtn from '@/components/bl_bet/bl_betMenuBtn.vue';
import bl_betGameBanner from '@/components/bl_bet/bl_betGameBanner.vue';
import bl_betGameItem from '@/components/bl_bet/bl_betGameItem.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

let minNum=0;
let maxNum=0;
export default {
  components: {
    bl_betMenuBtn,
    bl_betGameBanner,
    bl_betGameItem,
  },
  data () {
    const check_point = (rule, value, callback) => {
      if (value <minNum | value >maxNum) {
        callback(new Error(`输入限额 ${minNum}～${maxNum} 的投注金额`));
      } else{
        callback();
      }
    };
    return {
      img1:`${window.CDN_ASSETS}/static/img/dw/pic-vs@3x.png`,
      dataLoaded:false,
      betForm:{
        game_id:'',
        team_id:'',
        point:'',
      },
      betFormRules: {
        point: [
          { validator: check_point, trigger: ['blur', 'change'] },
          { required: true, message: '请输投注金额', trigger: ['blur', 'change']},
        ],
        team_id: [{ required: true, message: '请选择队伍', trigger: ['blur', 'change']}],
      },
    }
  },
  computed: {
    ...mapState('bet', ['singleGameData']),
    ...mapState('wallet', ['memberWallet']),
  },
  methods: {
    chosseTeam(val){
      this.betForm.team_id = val;
    },
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate((valid) => {
        this.$store.dispatch('bet/submitTaskGameBet', this.betForm)
          .then((res)=>{
            vm.$message({ message: '投注成功', type: 'success' });
            vm.$router.push({ path: '/betlog'}).catch((err) => {});
          });
      });
    },
  },
  mounted() {
    const vm = this;
    const payload = {id: this.$route.query.id}
    this.$store.dispatch('bet/getSingleBetGameList',payload)
      .then((res)=>{
        vm.dataLoaded = true
        vm.betForm.game_id = res.data.data[0].id;
        minNum= this.singleGameData[0].min;
        maxNum= this.singleGameData[0].max;
      });
    // this.$store.dispatch('bet/getBetGameList');
  },
};
</script>

<style lang="scss" scoped>
.betGameWarp{
  min-height: 500px;
}

.betGameRect {
  position: relative;
  border-radius: 8px 8px 0 0;
  color: white;
  background: linear-gradient(to left, $DW_ColorLight, $DW_Color 100%);
}
.betGameRect_bet {
  position: relative;
  border-radius: 0 0 8px 8px;
  background: white
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
.betBtn{
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  border: solid 1px $DW_ColorLight;
  display: inline-block;
  background-color: $DW_ColorAlpha_20;
}
.betBtnActive{
  color: white;
  background-color: $DW_ColorLight;
}
/deep/.betBtnPrimary{
  color: white;
  border-color: $DW_red;
  background: $DW_red;
  &:disabled{
    border-color: $garyBlue_Darkest;
    background: $garyBlue_Darkest;
  }
}

</style>
