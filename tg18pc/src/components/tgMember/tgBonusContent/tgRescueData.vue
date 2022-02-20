<template lang='pug'>
.col-12
  .DatePicker.text-right.mt-2.mb-2
    el-date-picker(v-if='DateRange.length>0'
                    v-model="DateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    @change="(value) => changeHandler(value)")
  div(v-if='MemberBonus.MemberRescueLog.data_list')
    el-table(:data="MemberBonus.MemberRescueLog.data_list" border style="width: 100%" sortable='')
      el-table-column(type="expand")
        template(slot-scope="props")
          el-form.demo-table-expand(label-position="left" inline="")
            el-form-item(label="备注")
              span {{ props.row.Notes2 }}
      el-table-column(label="平台" prop="ChannelName" width="80" sortable='')
      el-table-column(label="日期(GMT＋8)" prop="CalcDate" width="150" sortable='')
      el-table-column(label="负盈利" prop="CalcCash" sortable='')
        template(slot-scope="scope")
          span ￥{{scope.row.CalcCash | commaFormat }}
      el-table-column(label="救援金额" prop="ModifyCash" sortable='')
        template(slot-scope="scope")
          span ￥{{scope.row.ModifyCash | commaFormat }}
      //- el-table-column(label="救援金比例" prop="OfferRate"   :formatter="percentageOfferRate" sortable='')
      el-table-column(label="转出限制" prop="BonusLimit" sortable='')
        template(slot-scope="scope")
          span(v-if='scope.row.BonusLimitType==1') 流水满
          span(v-if='scope.row.BonusLimitType==2') 游戏钱包满
          br
          span ￥{{scope.row.BonusLimit | commaFormat }}
      el-table-column(label="提款要求" prop="WithDrawLimit" sortable='')
        template(slot-scope="scope")
          span 有效流水满
          br
          span ￥{{scope.row.WithDrawLimit | commaFormat }}
      el-table-column(label="状态" prop="Status"  sortable='')
        template(slot-scope="scope")
          span.text-warning(v-if='scope.row.Status==1') {{ formatStatus(scope.row.Status) }}
          //- el-button(v-if='scope.row.Status==1' type="primary" size="mini" @click='ApplyOffer(scope.row, scope.row.Sn,2)')  取消申请
          el-button(v-if='scope.row.Status==2' type="primary" size="mini" @click='ApplyOffer(scope.row, scope.row.Sn,1)')  {{ formatStatus(scope.row.Status) }}
          span.text-success(v-if='scope.row.Status==3') {{ formatStatus(scope.row.Status) }}
          span.text-danger(v-if='scope.row.Status==4') {{ formatStatus(scope.row.Status) }}
          //- Status == 5  顯示已派送
          span.text-success(v-if='scope.row.Status==5') {{ formatStatus(scope.row.Status) }} {{searchGroupId(scope.row.DeliveryGroupId)}}
          //- Status == 777 顯示放棄按鈕
          el-button(v-if='scope.row.Status==777', type="warning", size="mini", @click='BonusGiveUp(scope.row.Sn)')  放弃
          span.text-danger(v-if='scope.row.Status==6') {{ formatStatus(scope.row.Status) }}
  tgError(v-else)
  div.mt-1.mb-1.text-right(v-if='getTotalPages>0')
    el-pagination(@current-change="handleCurrentChange"  :current-page.sync="currentPages" background="" layout="prev, pager, next" :total="getTotalPages" :page-size='30')
  //- tgReceiveBonus
  el-dialog(width='900px', :visible.sync='applyBonus_dialogShow', append-to-body='' center)
    tgReceiveBonus(:Sn='applyData.Sn',
    :dialogShow='applyBonus_dialogShow',
    :applyBonusArray='applyBonusArray',
    :applyBonusData='applyBonusData',
    :rowData = 'rowData',
    @applyBonus_dialogHide='applyBonus_dialogHide',
    @ApplyOfferConfirm='ApplyOfferConfirm')
  el-dialog.BonusGiveUp_dialog(width='900px', title='请确认是否放弃此笔红利？',  :visible.sync='BonusGiveUp_dialogShow', append-to-body='', center)
    p.text-center.my-3 若放弃，此笔期间产生之赢利与优惠红利将会全数扣除。
    p.text-center.mt-5
      el-button(@click="BonusGiveUp_dialogShow = false") 取 消
      el-button(type="primary" @click="ApplyBonusGiveUp(BonusGiveUpSn)") 确 定
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import tgError from '@/components/tgError/tgError.vue';
import tgReceiveBonus from '@/components/tgMember/tgBonusContent/tgReceiveBonus.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import router from '@/router/router';

export default {
  components: {
    tgError,
    tgReceiveBonus,
  },
  data() {
    return {
      currentPages: 1,
      EndDate: '',
      StartDate: '',
      DateRange: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() + (30 * 24 * 60 * 60 * 1000) || time.getTime() < (Date.now() - (90 * 24 * 60 * 60 * 1000));
        },
      },
      rowData: '',
      applyGroupName: '',
      applyData: {
        Sn: '',
        CompanyName: '',
        GroupId: '',
        Status: '',
      },
      applyBonusArray: [],
      applyBonusData: '',
      applyBonus_dialogShow: false,
      BonusGiveUp_dialogShow: false,
      BonusGiveUpSn: '',
    };
  },
  computed: {
    ...mapState('index', [
      'AllProvider',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberBonus',
    ]),
    getTotalPages() {
      return Number(this.MemberBonus.MemberRescueLog.total_rows);
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPages = val;
      this.getAPI();
    },
    changeHandler(value) {
      this.currentPages = 1;
      this.getAPI();
    },
    percentageOfferRate(row, column) {
      return `${row[column.property]} %`;
    },
    formatStatus(value) {
      const target = this.MemberBonus.MemberRescueOther;
      let Status = '';
      Object.keys(target).map((key, index) => {
        if (value === key) {
          Status = target[key];
        }
        return Status;
      });
      return Status;
    },
    // - 重新取得api
    getAPI() {
      if (this.UserId) {
        const payload = {
          UserId: this.UserId,
          Page: this.currentPages,
          PageLimit: 30,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
        };
        this.$store.dispatch('member/MemberGetCashLog_rescue', payload);
        this.$store.dispatch('member/MemberRefreshUserOfferCount');
      }
    },
    BonusGiveUp(Sn) {
      this.BonusGiveUpSn = Sn;
      this.BonusGiveUp_dialogShow = true;
    },
    // - 從row data 發出申請事件
    ApplyBonusGiveUp(Sn) {
      const vm = this;
      const payload = {};
      this.applyData.Sn = Sn;
      payload.Sn = this.applyData.Sn;
      payload.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/BonusGiveUp/rescue`, payload)
        .then((res) => {
          if (res.data.status === 1) {
            vm.getAPI();
          } else {
            vm.$message({ message: res.data.error_message, type: 'error' });
            vm.getAPI();
          }
          vm.BonusGiveUp_dialogShow = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // - 從row data 發出申請事件
    ApplyOffer(rowData, Sn, Status) {
      const vm = this;
      const payload = {};
      this.applyData.Sn = Sn;
      this.applyData.Status = Status;
      payload.Sn = this.applyData.Sn;
      payload.UserId = this.UserId;
      payload.Status = this.applyData.Status;
      if (Status === 1) {
        axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetBonusGameWallet/rescue`, payload)
          .then((res) => {
            console.log(res);
            vm.applyBonusData = res.data.data.BonusData;
            vm.applyBonusArray = res.data.data.GroupList;
            vm.applyBonus_dialogShow = true;
          });
      }
    },
    // - 從component 發出确认领取事件
    ApplyOfferConfirm(payload) {
      const vm = this;
      console.log(payload);
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/ApplyOffer/rescue`, payload)
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.getAPI();
            vm.applyBonus_dialogHide();
            vm.$message({
              message: res.data.message,
              type: 'success',
              duration: 1500,
              onClose() {
                vm.jumpGamePage(payload);
              },
            });
          } else {
            vm.$message({
              message: res.data.error_message, 
              type: 'error',
              duration: 1500,
            });
            vm.getAPI();
            vm.applyBonus_dialogHide();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // - 關閉dialog
    applyBonus_dialogHide() {
      this.applyBonus_dialogShow = false;
    },
    // - 轉跳頁面
    jumpGamePage(payload) {
      if (payload.GameType === 1 || payload.GameType === '1') {
        router.push({ path: '/slot', query: { game: payload.GroupName } });
      } else if (payload.GameType === 2 || payload.GameType === '2') {
        router.push({ path: '/fishing', query: { game: payload.GroupName } });
      } else if (payload.GameType === 3 || payload.GameType === '3') {
        router.push({ path: '/board', query: { game: payload.GroupName } });
      } else if (payload.GameType === 4 || payload.GameType === '4') {
        router.push({ path: '/arcade', query: { game: payload.GroupName } });
      }
    },
    // - 透過fGroupId filter index AllProvider 取得CompanyName
    searchGroupId(id) {
      const result = this.AllProvider.filter(item => item.GroupId === id);
      let resultTxt;
      if (result.length > 0) {
        resultTxt = result[0].CompanyName;
      } else {
        resultTxt = '';
      }
      return resultTxt;
    },
  },
  mounted() {
    const EndDateFormated = moment().format('YYYY-MM-DD');
    const StartDateFormated = moment().subtract(30, 'days').format('YYYY-MM-DD');
    this.EndDate = EndDateFormated;
    this.StartDate = StartDateFormated;
    this.DateRange[0] = StartDateFormated;
    this.DateRange[1] = EndDateFormated;
    this.getAPI();
  },
};
</script>
<style lang="scss" scoped>

</style>
