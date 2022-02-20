<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.mx-2(v-if="buttonPerms.agencyAddAgency", @click="addAgency") 新增代理
    .justify-content-end
      el-pagination(
        :background="true",
        :pager-count="5",
        layout="sizes, prev, pager, next, jumper, total",
        :page-sizes="[20, 50, 100, 200, 300, 400, 500]",
        :page-size="pageSize",
        :total="dataTotal",
        :current-page.sync="currentPage",
        @current-change="getData",
        @size-change="size => { pageSize = size; getData() }"
      )
    .row
      el-table(:data="tableData", border, stripe, height="70vh")
        el-table-column(label="代理编号", prop="agencyCode", align="center")
        el-table-column(label="代理帐号", prop="agencyAccount", align="center")
        el-table-column(label="代理名称", prop="agencyName", align="center")
        el-table-column(label="推广连结", prop="agencyPromotionLink", align="center")
          template(slot-scope="{ row }")
            span {{ row.agencyPromotionLink }}
            i.el-icon-copy-document.c-pointer(v-if="row.agencyPromotionLink", @click="copyUrl(row.agencyPromotionLink)")
        el-table-column(label="状态", align="center", width="90")
          template(slot-scope="{ row }")
            el-tag(type="danger", v-if="row.agencyIsFrozen") 冻结
            el-tag(type="success", v-else) 正常
        el-table-column(label="一级代理帐号", align="center", width="120", prop="agencyUpperAgencyAccount")
        el-table-column(label="佣金比例", align="center")
          span(slot-scope="{ row }") {{ row.agencyCommissionPercentage ? row.agencyCommissionPercentage + '%' : '预设' }}
        el-table-column(label="启用时间", prop="agencyCreatedAt", align="center", width="160")
        el-table-column(label="操作", align="center", width="200")
          template(slot-scope="{ row }")
            el-link.mx-1.text-primary(v-if="buttonPerms.agencyShowDetail", @click="detail(row)") 详细资料
            el-link.mx-1.text-primary(v-if="buttonPerms.agencyEditAgency", @click="editAgency(row)") 资料修改
            el-link.mx-1.text-primary(v-if="canEditCommission", @click="editCommission(row)") 佣金管理
            el-link.mx-1.text-primary(v-if="buttonPerms.agencyCashAdjust", @click="cashAdjust(row)") 资金调整
            el-link.mx-1.text-primary(v-if="buttonPerms.agencyEditCashGroup", @click="editCashGroup(row)") 金流群组管理
    //- agency form
    el-dialog(:visible.sync="formVisible", :title="formTitle", @close="formClose()", top="5vh")
      agencyForm(
        :data="agency"
        v-if="formVisible",
        @close="formVisible = false; formClose()",
        @success="addAgencySuccess()"
      )
    //- 详细资料 dialog
    el-dialog(:visible.sync="detailVisible", title="详细资料")
      .container-fluid
        .row
          .col-4 <b>代理编号:</b> {{ agencyDetail.agencyCode }}
          .col-4 <b>代理帐号:</b> {{ agencyDetail.agencyAccount }}
          .col-4 <b>代理名称:</b> {{ agencyDetail.agencyName }}
        .row.my-3
          .col-4 <b>启用日期:</b> {{ agencyDetail.agencyCreatedAt }}
          .col-4 <b>信箱:</b> {{ agencyDetail.agencyEmail }}
          .col-4 <b>手机:</b> {{ agencyDetail.agencyPhone }}
        .row.my-3
          .col-12 <b>推广链结:</b> {{ agencyDetail.agencyPromotionLink }}
            i.el-icon-copy-document.c-pointer(v-if="agencyDetail.agencyPromotionLink", @click="copyUrl(agencyDetail.agencyPromotionLink)")
    //- 佣金管理 dialog
    el-dialog(:visible.sync="commissionVisible", top="5vh", custom-class="commission-dialog", width="70%")
      template(slot="title")
        span 佣金管理
        el-tooltip
          i.el-icon-info.ml-3
          template(slot="content")
            p 设定完后2~3小时内将会生效。
            p 调整流水比例与佣金比例后将不再有等级区分。
            p 所有流水一律以调整的比例计算。
            p <br>若有一级代理：
            p 二级最高比例不可≥一级前月最高比例。
            p 一级本月流水比例降低，二级下月流水比例也会随之调低。
      el-divider(content-position="left") 佣金比例
      el-radio.d-block(v-model="self_percentage_adjustment" :label="false") 使用预设佣金等级比例
      .d-block
        el-radio(v-model="self_percentage_adjustment" :label="true") 佣金比例:
        el-input-number(
          v-model="self_percentage",
          :step="5",
          step-strictly,
          :min="5",
          :max="self_commission_max",
          :disabled="self_percentage_adjustment === false",
          name="input-number"
        )
        p.text-danger.my-1.ml-4 佣金比例最高为 {{ self_commission_max }}%, 以 5% 为调整距离
      el-divider(content-position="left") 返水比例
      p.text-danger.ml-5(v-show="noReturnPercentage") 佣金返水不计返水, 只计算负营利 (更改后于次月1日生效)
      .container-fluid
        //- 体育
        el-divider(content-position="left") 体育流水返水比例
        .d-block
          el-radio(v-model="sport_percentage_adjustment" label="no" v-if="checkChangeType('sport', false)") 不计算体育流水返水
        .d-block
          el-radio(v-model="sport_percentage_adjustment" label="default" v-if="checkChangeType('sport')") 使用预设佣金等级比例
        .d-block
          el-radio(v-model="sport_percentage_adjustment" label="yes" v-if="checkChangeType('sport')")
            span.mr-5 体育流水比例:
            el-input-number.mr-5(
              v-model="sport_return_percentage",
              :step="0.05",
              step-strictly,
              :min="0.05",
              :max="sport_return_max",
              :disabled="sport_percentage_adjustment !== 'yes'",
              name="input-number"
            )
            span.mr-5 流水佣金比例:
            el-input-number(
              v-model="sport_commission_percentage",
              :step="5",
              step-strictly,
              :min="5",
              :max="sport_commission_max",
              :disabled="sport_percentage_adjustment !== 'yes'",
              name="input-number"
            )
          p.text-danger.my-1.ml-4 体育返水比例最高为  1.5%, 以 0.05% 为调整距离
          p.text-danger.my-1.ml-4 流水佣金比例最高为 {{ sport_commission_max }}%, 以 5% 为调整距离
        //- 彩票
        el-divider(content-position="left") 彩票流水返水比例
        .d-block
          el-radio(v-model="lottery_percentage_adjustment" label="no" v-if="checkChangeType('lottery', false)") 不计算彩票流水返水
        .d-block
          el-radio(v-model="lottery_percentage_adjustment" label="default" v-if="checkChangeType('lottery')") 使用预设佣金等级比例
        .d-block
          el-radio(v-model="lottery_percentage_adjustment" label="yes" v-if="checkChangeType('lottery')")
            span.mr-5 彩票流水比例:
            el-input-number.mr-5(
              v-model="lottery_return_percentage",
              :step="0.05",
              step-strictly,
              :min="0.05",
              :max="lottery_return_max",
              :disabled="lottery_percentage_adjustment !== 'yes'",
              name="input-number"
            )
            span.mr-5 流水佣金比例:
            el-input-number(
              v-model="lottery_commission_percentage",
              :step="5",
              step-strictly,
              :min="5",
              :max="lottery_commission_max",
              :disabled="lottery_percentage_adjustment !== 'yes'",
              name="input-number"
            )
          p.text-danger.my-1.ml-4 彩票返水比例最高为  0.5%, 以 0.05% 为调整距离
          p.text-danger.my-1.ml-4 流水佣金比例最高为 {{ lottery_commission_max }}%, 以 5% 为调整距离
        //- 棋牌
        el-divider(content-position="left") 棋牌流水返水比例
        .d-block
          el-radio(v-model="board_percentage_adjustment" label="no" v-if="checkChangeType('board', false)") 不计算棋牌流水返水
        .d-block
          el-radio(v-model="board_percentage_adjustment" label="default" v-if="checkChangeType('board')") 使用预设佣金等级比例
        .d-block
          el-radio(v-model="board_percentage_adjustment" label="yes" v-if="checkChangeType('board')")
            span.mr-5 棋牌流水比例:
            el-input-number.mr-5(
              v-model="board_return_percentage",
              :step="0.05",
              step-strictly,
              :min="0.05",
              :max="board_return_max",
              :disabled="board_percentage_adjustment !== 'yes'",
              name="input-number"
            )
            span.mr-5 流水佣金比例:
            el-input-number(
              v-model="board_commission_percentage",
              :step="5",
              step-strictly,
              :min="5",
              :max="board_commission_max",
              :disabled="board_percentage_adjustment !== 'yes'",
              name="input-number"
            )
          p.text-danger.my-1.ml-4 棋牌返水比例最高为  1.4%, 以 0.05% 为调整距离
          p.text-danger.my-1.ml-4 流水佣金比例最高为 {{ board_commission_max }}%, 以 5% 为调整距离
        //- 真人
        el-divider(content-position="left") 真人流水返水比例
        .d-block
          el-radio(v-model="live_percentage_adjustment" label="no" v-if="checkChangeType('live', false)") 不计算真人流水返水
        .d-block
          el-radio(v-model="live_percentage_adjustment" label="default" v-if="checkChangeType('live')") 使用预设佣金等级比例
        .d-block
          el-radio(v-model="live_percentage_adjustment" label="yes" v-if="checkChangeType('live')")
            span.mr-5 真人流水比例:
            el-input-number.mr-5(
              v-model="live_return_percentage",
              :step="0.05",
              step-strictly,
              :min="0.05",
              :max="live_return_max",
              :disabled="live_percentage_adjustment !== 'yes'",
              name="input-number"
            )
            span.mr-5 流水佣金比例:
            el-input-number(
              v-model="live_commission_percentage",
              :step="5",
              step-strictly,
              :min="5",
              :max="live_commission_max",
              :disabled="live_percentage_adjustment !== 'yes'",
              name="input-number"
            )
          p.text-danger.my-1.ml-4 真人返水比例最高为  1.4%, 以 0.05% 为调整距离
          p.text-danger.my-1.ml-4 流水佣金比例最高为 {{ live_commission_max }}%, 以 5% 为调整距离
      .text-right
        el-button(@click="commissionVisible = false") 取消
        el-button(type="primary", @click="handleEditCommission()") 确认
    //- 资金调整 dialog
    el-dialog(
      title="代理资金调整",
      :visible.sync="adjustDialog.visible"
    )
      el-form(:model="adjustDialog.data", ref="adjustForm", label-width="auto", :rules="adjustRules")
        el-form-item(label="代理帐号")
          span {{ adjustDialog.agencyName }}
        el-form-item(v-if="fieldPerms.agencyCash", label="目前代理总资金")
          span {{ adjustDialog.cash | formatMoney }}
        el-form-item(label="类型", prop="modify_type")
          span 资金调整
        el-form-item(label="扣分或上分", required)
          el-radio-group(v-model="adjustDialog.data.sign_type")
            el-radio(:label="0") 扣分
            el-radio(:label="1") 上分
        el-form-item(label="调整金额", prop="amount")
          el-input(type="number",v-model.number="adjustDialog.data.amount", step="0.01", min="0.01")
        el-form-item(label="流水限制", prop="widthdraw_limit")
          el-input(type="number",v-model.number="adjustDialog.data.widthdraw_limit")
        el-form-item(label="备注内容", prop="note")
          el-input(type="textarea", v-model="adjustDialog.data.note", :autosize="{ minRows: 2, maxRows: 6 }")
        el-form-item
          el-button(@click="confirmAdjust()") 确认
    //- 确认资金调整 dialog
    el-dialog(title="系统提示", :visible.sync="confirmAdjustDialogVisible", center)
      h3.text-center 新增代理资金调整 是否送出？
      .bg-light.col-10.offset-1.mt-4.p-3
        .p-1 代理帐号: {{ adjustDialog.agencyName }}
          span(v-if="fieldPerms.agencyCash")  (调整前资金: {{ adjustDialog.cash | formatMoney }} 调整后资金: {{ adjustDialog.cash + (adjustDialog.data.amount * (adjustDialog.data.sign_type === 0 ? -1: 1)) | formatMoney }})
        .p-1 类型: 资金调整
        .p-1.text-danger(v-if="adjustDialog.data.sign_type === 0") 调整金额: {{ adjustDialog.data.amount * -1 }}
        .p-1(v-else) 调整金额: {{ adjustDialog.data.amount }}
        .p-1 流水限制: {{ adjustDialog.data.widthdraw_limit }}
        .p-1 备注: {{ adjustDialog.data.note }}
      .text-center.mt-4
        el-button(@click="confirmAdjustDialogVisible = false") 取消
        el-button(type="primary", @click="handleAdjust()") 完成
    //- 金流群组 dialog
    el-dialog(title="金流群组管理", :visible.sync="cashGroupDialog.visible")
      el-form(:model="cashGroupDialog.data", ref="cashGroupForm", label-width="auto", :rules="cashGroupRules")
        el-form-item(label="代理帐号", prop="")
          span {{ cashGroupDialog.agencyName }}
        el-form-item(label="银行卡群组", prop="deposit_group_id")
          el-select(v-model="cashGroupDialog.data.deposit_group_id")
            el-option(v-for="group in bankCardGroupOptions", :key="group.value", :label="group.label", :value="+group.value")
        el-form-item(label="三方金流群组", prop="third_group_id")
          el-select(v-model="cashGroupDialog.data.third_group_id")
            el-option(v-for="group in thirdGroupOptions", :key="group.value", :label="group.label", :value="+group.value")
        el-form-item
          el-button(@click="handleEditCashGroup()") 确认
</template>

<script>
import {
  getAgenciesAPI,
  getAgencyCommissionAPI,
  editAgencyCommissionAPI,
  agencyCashAdjustAPI,
  editAgencyCashGroupAPI,
} from '@/api/agency/agency';
import { getMemeberGroupFullListAPI } from '@/api/member/memberGroup';
import agencyForm from './_form.vue';

export default {
  components: { agencyForm },
  data() {
    const validateWidthdrawLimit = (rule, value, callback) => {
      if (Math.sign(value) !== 1) return callback(new Error('必须为正数'));
      value < this.adjustDialog.data.amount ? callback(new Error('不得小于调整金额')) : callback() ;
    }

    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        {
          label: '状态',
          model: 'is_frozen',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '正常', 1: '冻结' },
          },
        },
        { label: '代理帐号', model: 'account', component: 'filterInput', props: { type: 'text' }},
        { label: '代理编号', model: 'code', component: 'filterInput', props: { type: 'text' }},
        { label: '代理名称', model: 'name', component: 'filterInput', props: { type: 'text' }},
        { label: '启用时间', model: 'time', component: 'filterDatePicker', props: { type: 'datetimerange' } }
      ],
      formTitle: '',
      formVisible: false,
      agencyDetail: {},
      detailVisible: false,
      agency: {},
      commissionVisible: false,
      returnDefault: 0.05,
      commissionDefault: 40,
      allowChangeType: true,
      allTypes: [
        'sport',
        'lottery',
        'board',
        'live',
        'games',
      ],
      currentTypes: [],
      returnTypes: [],

      self_percentage_adjustment: false,
      self_percentage: 40,
      self_commission_max: 55,

      sport_percentage_adjustment: 'no',
      sport_return_percentage: 0.05,
      sport_return_max: 100,
      sport_commission_percentage: 40,
      sport_commission_max: 55,

      lottery_percentage_adjustment: 'no',
      lottery_return_percentage: 0.05,
      lottery_return_max: 100,
      lottery_commission_percentage: 40,
      lottery_commission_max: 55,

      board_percentage_adjustment: 'no',
      board_return_percentage: 0.05,
      board_return_max: 100,
      board_commission_percentage: 40,
      board_commission_max: 55,

      live_percentage_adjustment: 'no',
      live_return_percentage: 0.05,
      live_return_max: 100,
      live_commission_percentage: 40,
      live_commission_max: 55,

      editCommissionId: 0,
      adjustDialog: {
        visible: false,
        agencyId: '',
        agencyName: '',
        cash: 0,
        data: {
          agency_id: '',
          modify_type: 1,
          sign_type: 0,
          amount: '',
          widthdraw_limit: '',
          note: '',
        },
      },
      confirmAdjustDialogVisible: false,
      adjustRules: {
        amount: [
          { required: true, min: 0.01, type: 'number', message: '金额必须大于0.01' },
        ],
        widthdraw_limit: [
          { required: true, type: 'number', message: '流水限制为数字值', trigger: 'submit'},
          { validator: validateWidthdrawLimit, trigger: 'submit'},
        ],
        note: [{ required: true, message: '备注为必填' }],
      },
      cash: 0,
      wallet: 1,
      cashGroupDialog: {
        visible: false,
        agencyId: '',
        agencyName: '',
        data: {
          deposit_group_id: '',
          third_group_id: '',
        },
      },
      cashGroupRules: {
        deposit_group_id: [{ required: true, message: '必须选择一个群组' }],
        third_group_id: [{ required: true, message: '必须选择一个群组' }],
      },
      thirdGroupOptions: [],
      bankCardGroupOptions: [],
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  computed: {
    canEditCommission() {
      return this.buttonPerms.agencyEditCommission
        && this.fieldPerms.agencySelfPercentageAdjustment
        && this.fieldPerms.agencyCommissionPercentage
        && this.fieldPerms.agencyCommissionPercentageLimit;
    },
    noReturnPercentage() {
      return this.sport_percentage_adjustment === 'no'
        && this.lottery_percentage_adjustment === 'no'
        && this.board_percentage_adjustment === 'no'
    }
  },
  created() {
    this.getData();
    getMemeberGroupFullListAPI(null, { mode: 1 }).then(response => {
      // MARK: 目前没有可以确保的key 拿到正确的群组, 若各环境资料库 确定不变 可用 value 7:三方 8:银行卡
      this.thirdGroupOptions = response.data.data[0].children;
      this.bankCardGroupOptions = response.data.data[1].children;
      this.needFetchCashGroups = false;
    })
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      if (APIParams.time) {
        APIParams.start_time = APIParams.time[0];
        APIParams.end_time = APIParams.time[1];
        delete APIParams.time;
      }

      getAgenciesAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },

    checkChangeType(type, status = true) {
      if (this.allowChangeType) return true;
      if (this.currentTypes.includes(type) === status) return true;
      return false;
    },

    addAgency() {
      this.formTitle = '新增代理';
      this.formVisible = true;
    },

    copyUrl(url) {
      this.$copyText(url).then(() => {
        this.$notify.success({message: '复制成功', duration: 777});
      });
    },

    detail(agency) {
      this.agencyDetail = agency;
      this.detailVisible = true;
    },

    addAgencySuccess() {
      this.formVisible = false,
      this.getData();
    },

    editAgency(agency) {
      this.formTitle = '资料修改';
      this.agency = agency;
      this.formVisible = true;
    },

    formClose() {
      this.agency = {};
    },

    editCommission({ agencyId: id }) {
      // MARK: 规格很复杂, 请参阅: https://www.dropbox.com/scl/fi/8sw8al3qtzb5r50qv9oho/.paper?dl=0&rlkey=33hff288ncktktk9vot5439di 或洽 Marty

      // API取得佣金资讯
      getAgencyCommissionAPI(id).then(response => {
        const info = response.data.data[0];

        this.self_percentage_adjustment = info.agencySelfPercentageAdjustment;
        this.self_commission_max = info.agencyCommissionPercentageLimit;
        this.self_percentage = info.agencySelfPercentageAdjustment ? info.agencyCommissionPercentage : this.commissionDefault;

        this.allowChangeType = info.agencyAllowChangeType;
        this.currentTypes = info.agencyReturnPercentageTypes;
        this.returnTypes = info.agencyReturnPercentageTypes;

        this.allTypes.map((type) => {
          if (info.agencyReturnPercentageTypes.includes(type)) {
            const upperType = type[0].toUpperCase() + type.slice(1);
            this[`${type}_percentage_adjustment`]= info[`agency${upperType}PercentageAdjustment`]
            this[`${type}_return_percentage`]= info[`agency${upperType}ReturnBetPercent`]
            this[`${type}_return_max`]= info[`agency${upperType}PercentageLimit`]
            this[`${type}_commission_percentage`]= info[`agency${upperType}BetCommissionPercent`]
            this[`${type}_commission_max`]= info[`agency${upperType}CommissionPercentageLimit`]

            if (info[`agency${upperType}PercentageAdjustment`]) {
              this[`${type}_percentage_adjustment`] = 'yes';
            } else {
              this[`${type}_percentage_adjustment`] = 'default';
            }
          }
          else {
            this[`${type}_percentage_adjustment`] = 'no';
          }
        })

        this.editCommissionId = id;
        this.commissionVisible = true;
      });
    },

    handleEditCommission() {
      this.allTypes.forEach((type) => {
        if (this[`${type}_percentage_adjustment`] !== 'no' && !this.returnTypes.includes(type)) {
          this.returnTypes.push(type);
        } else if (this[`${type}_percentage_adjustment`] === 'no' && this.returnTypes.includes(type)) {
          this.returnTypes.splice(this.returnTypes.findIndex(item => item === type), 1);
        } else return;
      })

      editAgencyCommissionAPI(this.editCommissionId, {
        self_percentage_adjustment: this.self_percentage_adjustment,
        self_percentage: this.self_percentage,
        return_percentage_types: this.returnTypes,
        sport_percentage_adjustment: this.sport_percentage_adjustment === 'yes',
        sport_return_bet_percent: this.sport_return_percentage,
        sport_bet_commission_percent: this.sport_commission_percentage,
        lottery_percentage_adjustment: this.lottery_percentage_adjustment === 'yes',
        lottery_return_bet_percent: this.lottery_return_percentage,
        lottery_bet_commission_percent: this.lottery_commission_percentage,
        board_percentage_adjustment: this.board_percentage_adjustment === 'yes',
        board_return_bet_percent: this.board_return_percentage,
        board_bet_commission_percent: this.board_commission_percentage,
      })
      .then(() => {
        this.getData();
        this.commissionVisible = false;
        this.$message.success('佣金比例调整成功');
      }, () => {
        this.$message.error('佣金比例调整失败！请洽服务人员。');
      })
    },

    cashAdjust(agency) {
      this.adjustDialog.data.sign_type = 0;
      this.adjustDialog.data.amount = '';
      this.adjustDialog.data.widthdraw_limit = '';
      this.adjustDialog.data.note = '';
      this.adjustDialog.data.agency_id = agency.agencyId;
      this.adjustDialog.agencyName = agency.agencyAccount;
      this.adjustDialog.cash = agency.agencyCash;
      this.adjustDialog.visible = true;
      this.$nextTick(() => {
        this.$refs.adjustForm.resetFields();
      });
    },

    confirmAdjust() {
      this.$refs.adjustForm.validate(valid => {
        if (valid) this.confirmAdjustDialogVisible = true;
      });
    },

    handleAdjust() {
      agencyCashAdjustAPI(this.adjustDialog.data)
      .then(response => {
        if (this.fieldPerms.agencyCash) {
          const index = this.tableData.findIndex(agency => agency.agencyId === this.adjustDialog.data.agency_id);
          this.tableData[index].agencyCash = response.data.data[0].cash;
        }
        this.adjustDialog.visible = false;
        this.confirmAdjustDialogVisible = false;
        this.$message.success('资金调整已成功');
      })
    },

    editCashGroup(agency) {
      this.cashGroupDialog.agencyId = agency.agencyId;
      this.cashGroupDialog.agencyName = agency.agencyName;
      this.cashGroupDialog.data.deposit_group_id = agency.agencyDepositGroup && agency.agencyDepositGroup.group_id;
      this.cashGroupDialog.data.third_group_id = agency.agencyThirdGroup && agency.agencyThirdGroup.group_id;
      this.cashGroupDialog.visible = true;
    },

    handleEditCashGroup() {
      this.$refs.cashGroupForm.validate(valid => {
        if (valid) {
          editAgencyCashGroupAPI(this.cashGroupDialog.agencyId, this.cashGroupDialog.data).then(() => {
            // MARK: 有回传整笔资料 但大表没有显示群组 暂不做处理
            this.$message.success('修改金流群组成功');
            this.cashGroupDialog.visible = false;
          });
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
  /deep/ .commission-dialog > .el-dialog__body {
    padding-top: 0px;
  }
</style>
