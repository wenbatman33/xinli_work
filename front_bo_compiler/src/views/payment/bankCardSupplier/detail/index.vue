<template lang="pug">
  .container-fluid
    .row
      .col-12
        //- 卡商明細 - 修改卡商
        .alert.alert-dark(v-if="editGroupBlock.visible")
          .position-absolute(style="top: 0 ;right: 10px")
            el-link.mx-3(:underline="false")
              i.el-icon-close(@click="editGroupBlock.visible = false; editGroupBlock.data = {}")
            el-link(:underline="false")
              i.el-icon-check(@click="submitEditGroup()")
          .d-flex.flex-row.mt-4
            el-form.w-75(:model="editGroupBlock.data", ref="form",:rules="rules", label-width="100px")
              el-form-item(label="卡商代号", prop="supplier_code")
                el-input(type="text", v-model="editGroupBlock.data.supplier_code")
              el-form-item(label="联络人", prop="supplier_contact_person")
                el-input(type="text", v-model="editGroupBlock.data.supplier_contact_person")
              el-form-item(label="联络方式", prop="supplier_contact_info")
                el-input(type="text", v-model="editGroupBlock.data.supplier_contact_info")
              el-form-item(label="备注")
                el-input(type="textarea", v-model="editGroupBlock.data.remark", :autosize="{ minRows: 5, maxRows: 6}")
              el-form-item(label="上架")
                el-switch(
                  v-model="editGroupBlock.data.status",
                  :inactive-value="0",
                  inactive-text="停用",
                  :active-value="1",
                  active-text="启用")
        //- 卡商明细 - 显示卡商
        .alert.alert-secondary(v-else)
          .position-absolute(style="top: 0 ;right: 10px")
            el-link(:underline="false")
              i.el-icon-edit(@click="editGroup()")
          .d-flex.flex-row.my-3
            .mx-3() 卡商代号: {{ group.supplier_code }}
            .mx-3() 联络人: {{ group.supplier_contact_person }}
            .mx-3() 联络方式: {{ group.supplier_contact_info }}
          .d-flex.flex-row.my-3
            .mx-3() 下架:
              el-switch(
                  v-if='group.status',
                  v-model="group.status.value",
                  :inactive-value="0",
                  inactive-text="停用",
                  :active-value="1",
                  active-text="启用"
                  disabled)
          .d-flex.flex-row.my-3
            .mx-3() 备注: {{ group.remark }}
    .row(v-if='Object.keys(tableData).length>0')
      .col-12
        data-filter.mt-3(ref="dataFilter", :filterList="filterList", @change="getData()")
        .text-right
          el-link.mx-2(:underline="false")
            el-tooltip(content="点击更新资料", effect="light", @click.native="getData()")
              span
                i.el-icon-refresh 取得资料时间: {{ getDataAt }}
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
      .col-12
        el-table(:data="tableData", height="75vh")
          el-table-column(v-if="fieldPerms.BCardGroupName", label="金流群组", align="center", width="120")
            template(slot-scope="{ row }")
              el-tag {{ row.BCardGroupName.display }}
          el-table-column(v-if="fieldPerms.BCardNo || fieldPerms.BCardVirtualNo", label="卡号", align="center", width="180")
            template(slot-scope="{ row }")
              span(v-if="row.BCardNo") {{ row.BCardNo }}
              span(v-if="row.BCardVirtualNo") <br> ({{ row.BCardVirtualNo }})
          el-table-column(v-if="fieldPerms.BCardName", prop="BCardName", label="银行名称", align="center", width="140")
          el-table-column(v-if="fieldPerms.BCardHolder", prop="BCardHolder", label="户名", align="center", width="80")
          el-table-column(v-if="fieldPerms.BCardLimit", label="每日上限", align="center", width="120")
            template(slot-scope="{ row }")
              | {{ row.BCardLimit | formatMoney }}
          el-table-column(
            v-if="fieldPerms.BCardTransIn || fieldPerms.BCardTransOut",
            label="进/出",
            align="center",
            width="160"
          )
            template(slot-scope="{ row }")
              span(v-if="fieldPerms.BCardTransIn") {{ row.BCardTransIn }}
              span(v-else) --
              span &nbsp;/&nbsp;
              span(v-if="fieldPerms.BCardTransOut") {{ row.BCardTransOut }}
              span(v-else) --
          el-table-column(v-if="fieldPerms.BCardBalance", label="帐户馀额", align="center", width="80")
            template(slot-scope="{ row }")
              | {{ row.BCardBalance | formatMoney }}
          el-table-column(v-if="fieldPerms.BCardShow", label="上下架", align="center")
            template(slot-scope="{ row }")
              | {{ row.BCardShow.display }}
          el-table-column(v-if="fieldPerms.BCardStatus", label="状态", align="center")
            template(slot-scope="{ row }")
              | {{ row.BCardStatus.display }}
          el-table-column(v-if="fieldPerms.BCardNote", label="备注", align="center")
            template(slot-scope="{ row }")
              line-clamp(:content="row.BCardNote")
          el-table-column(label="管理", width="180", align="center")
            template(slot-scope="{ row }")
              el-link.text-primary.mx-2(type="primary")
                router-link(
                  :to="{ path:'bankCardDetail', query: { title: `银行卡 - ${row.BCardNo}`, id: row.id } }"
                ) 编辑


</template>

<script>
import { getBankCardsAPI } from '@/api/payment/bankCard';
import { getSingleBankCardSupplierAPI, editBankCardSupplieAPI } from '@/api/payment/bankCardSupplier';

export default {
  props: ['fieldPerms', 'buttonPerms', 'blockPerms', 'account'],
  data() {
    return {
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      getDataAt: '',
      group:{},
      tableData:{},
      editGroupBlock: {
        visible: false,
        data: {
          supplier_code: '',
          supplier_contact_person: '',
          supplier_contact_info: '',
          remark: '',
          status: 0
        }
      },
      rules: {
        supplier_code: [
          { required: true, message: '卡商代号为必填' }
        ],
        supplier_contact_person: [
          { required: true, message: '联络人为必填' }
        ],
        supplier_contact_info: [
          { required: true, message: '联络方式为必填' }
        ],
      },
      filterList: [
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { all: '全部', 0: '下架', 1: '上架' }
          }
        },
        {
          label: '上下架',
          model: 'show',
          component: 'filterSelect',
          props: {
            options: { all: '全部', 0: '隐藏', 1: '显示' }
          }
        },
        {
          label: '卡号',
          model: 'bank_card_no',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '银行名称',
          model: 'bank_name',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '户名',
          model: 'bank_cardholder',
          component: 'filterInput',
          props: { type: 'text' }
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData() {
      getSingleBankCardSupplierAPI(this.$route.query.id).then(response => {
        this.group = response.data.data[0];
      });

      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        supplier_id: this.$route.query.id
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getBankCardsAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
        this.getDataAt = new Date().toLocaleString();
      });
    },
    editGroup(){
      this.editGroupBlock = {
        visible: true,
        data: {
          supplier_code: this.group.supplier_code,
          supplier_contact_person: this.group.supplier_contact_person,
          supplier_contact_info: this.group.supplier_contact_info,
          remark: this.group.remark,
          status: this.group.status.value,
        }
      };
    },
    submitEditGroup(){
      this.$refs.form.validate(valid => {
        if (valid) {
          editBankCardSupplieAPI(this.$route.query.id, this.editGroupBlock.data).then(() => {
            this.$message.success('修改成功！');
            this.editGroupBlock.visible = false
            this.getData()
          });
        }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
