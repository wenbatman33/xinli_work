<template lang="pug">
  .container-fluid
    //- Group 修改
    .alert.alert-dark(v-if="editGroupBlock.visible")
      .position-absolute(style="top: 0 ;right: 10px")
        el-link.mx-3(:underline="false")
          i.el-icon-close(@click="editGroupBlock.visible = false; editGroupBlock.data = {}")
        el-link(:underline="false")
          i.el-icon-check(@click="submitEditGroup()")
      .d-flex.flex-row
        el-form(:model="editGroupBlock.data", :inline="true", size="mini", ref="form", :rules="rules", status-icon)
          el-form-item(v-if="fieldPerms.GPMerchantName", label="类型名称", prop="name")
            el-input(v-model="editGroupBlock.data.name")
          el-form-item(label="人数")
            el-input(readonly, :value="group.GPMerchantMembers", disabled)
          el-form-item(label="单笔限额", required)
            el-col(:span="11")
              el-form-item(prop="lower_limit")
                el-input(type="number", v-model.number="editGroupBlock.data.lower_limit", min="0")
            el-col.text-center(:span="2") ~
            el-col(:span="11")
              el-form-item(prop="up_limit")
                el-input(type="number", v-model.number="editGroupBlock.data.up_limit", min="0")
          el-row
          el-form-item(label="备注", prop="note")
            el-input(type="textarea", v-model="editGroupBlock.data.note", :autosize="{ minRows: 2, maxRows: 6 }")
    //- Group 显示
    .alert.alert-secondary(v-else)
      .position-absolute(v-if="buttonPerms.editPaymentGrouptInGroup", style="top: 0 ;right: 10px")
        el-link(:underline="false")
          i.el-icon-edit(@click="editGroup()")
      .d-flex.flex-row
        .mx-3(v-if="fieldPerms.GPMerchantName") 群组名称: {{ group.GPMerchantName }}
        .mx-3(v-if="fieldPerms.GPMerchantMembers") 人数: {{ group.GPMerchantMembers }}
        .mx-3(v-if="fieldPerms.GPMerchantLimitString") 每笔限额: {{ group.GPMerchantLimitString }}
      .flex-row
        .mx-3(v-if="fieldPerms.GPMerchantNote && group.GPMerchantNote")
          span 备注: {{ group.GPMerchantNote }}
    //- 过滤资料
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
    //- 分页 表格上方
    .justify-content-end
      el-pagination(
        :background="true",
        :hide-on-single-page="true",
        :pager-count="5",
        layout="sizes, prev, pager, next, jumper, total",
        :page-sizes="[20, 50, 100, 200, 300, 400, 500]",
        :page-size="pageSize",
        :total="dataTotal",
        :current-page.sync="currentPage",
        @current-change="getData",
        @size-change="size => { pageSize = size; getData() }"
      )
    //- Table
    .row
      el-table(:data="tableData", height="70vh")
        el-table-column(v-if="fieldPerms.gateName", prop="gateName", label="通道名称", align="center", width="250")
        el-table-column(v-if="fieldPerms.gateServiceCode", label="支付方式", align="center", width="120")
          template(slot-scope="{ row }")
            | {{ row.gateService.display }}
        el-table-column(v-if="fieldPerms.gateSn", prop="gateSn", label="商户编号", align="center", width="180")
        el-table-column(v-if="fieldPerms.gateRemainAmount", label="剩馀可用馀额", align="center", width="120")
          template(slot-scope="{ row }")
            | {{ row.gateRemainAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.gateStatus", label="上下架", align="center")
          template(slot-scope="{ row }")
            | {{ row.gateStatus.display }}
        el-table-column(v-if="fieldPerms.gateShow", label="状态", align="center")
          template(slot-scope="{ row }")
            | {{ row.gateShow.display }}
        el-table-column(v-if="fieldPerms.gateNote", label="备注", align="center")
          template(slot-scope="{ row }")
            line-clamp(:content="row.gateNote")
        el-table-column(v-if="buttonPerms.deletePaymentChannelInGroup", label="管理", align="center")
          template(slot-scope="{ row }")
              el-link.text-primary(@click="deleteChannel(row)") 移除
</template>

<script>
import {
  getPaymentGroupAPI,
  editPaymentGroupAPI,
  getPaymentChannelWithGroup,
  deleteChannelInGroupAPI
} from '@/api/payment/paymentGroup';

export default {
  data() {
    const checkLowerLimit = (rule, value, callback) => {
      if (value > this.editGroupBlock.data.up_limit) {
        callback(new Error('下限不得超过上限'));
      }

      callback();
    };

    const checkUpLimit = (rule, value, callback) => {
      if (value < this.editGroupBlock.data.lower_limit) {
        callback(new Error('上限不得低于下限'));
      }

      callback();
    };

    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        {
          label: '状态',
          model: 'show',
          component: 'filterSelect',
          props: {
            options: { all: '全部', 0: '隐藏', 1: '显示' }
          }
        },
        {
          label: '上下架',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { all: '全部', 0: '下架', 1: '上架' }
          }
        },
        {
          label: '支付方式',
          model: 'service_code',
          component: 'filterSelect',
          props: {
            options: {}
          }
        },
        {
          label: '通道名称',
          model: 'name',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '商户编号',
          model: 'merchant_sn',
          component: 'filterInput',
          props: { type: 'text' }
        }
      ],
      group: {},
      editGroupBlock: {
        visible: false,
        data: {
          id: 0,
          name: '',
          item: '',
          note: '',
          is_unique: false
        }
      },
      rules: {
        name: [
          { required: true, message: '群组名称为必填', trigger: 'submit' },
          { max: 20, message: '群组名称最多20个字元' }
        ],
        note: [{ max: 200, message: '群组名称最多200个字元' }],
        lower_limit: [
          { required: true, message: '单笔下限为必填' },
          { type: 'number', message: '单笔下限为数字值' },
          { validator: checkLowerLimit, trigger: 'submit' }
        ],
        up_limit: [
          { required: true, message: '单笔上限为必填' },
          { type: 'number', message: '单笔上限为数字值' },
          { validator: checkUpLimit, trigger: 'submit' }
        ]
      }
    };
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getPaymentGroupAPI(this.$route.query.id).then(response => {
      this.group = response.data.data[0];
    });

    this.getData();
  },
  computed: {
    serviceCode() {
      return this.$store.state.payment.serviceCode;
    }
  },
  watch: {
    serviceCode: {
      handler() {
        this.filterList.find(filter => filter.model === 'service_code').props.options = this.serviceCode;
      },
      immediate: true
    }
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage
      };

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getPaymentChannelWithGroup(this.$route.query.id, APIParams).then(
        response => {
          this.tableData = response.data.data;
          this.dataTotal = response.data.meta.pagination.total;
          this.currentPage = response.data.meta.pagination.current_page;
        }
      );
    },
    editGroup() {
      this.editGroupBlock = {
        visible: true,
        data: {
          id: this.group.id,
          name: this.group.GPMerchantName,
          note: this.group.GPMerchantNote,
          lower_limit: this.group.GPMerchantLowerLimit,
          up_limit: this.group.GPMerchantUpLimit
        }
      };
    },
    submitEditGroup() {
      this.$refs.form.validate(valid => {
        if (!valid) return;

        editPaymentGroupAPI(
          this.editGroupBlock.data.id,
          this.editGroupBlock.data
        ).then(response => {
          // todo: 改名称后 tab 有误
          // this.$router.push({ query: { title: 123 } })
          this.group = response.data.data[0];
          this.editGroupBlock.visible = false;
          this.$message.success('三方金流群组 - 修改成功');
        });
      });
    },
    deleteChannel(channel) {
      this.$swal({
        title: '确定移出？',
        text: `您即将移出 ${channel.gateName || '通道'}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认移出！',
        cancelButtonText: '取消'
      })
        .then(result => {
          if (result.value) {
            return deleteChannelInGroupAPI(this.$route.query.id, { pay_channel_service_id: channel.id });
          }

          return Promise.reject();
        })
        .then(() => {
          this.getData();
          this.$message.success('通道 - 移出成功！');
        })
        .catch(() => {});
    }
  }
};
</script>
