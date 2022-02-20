<template lang="pug">
  .container-fluid
    .d-flex.justify-content-around.align-items-center
      el-date-picker(
        v-model="timeRange",
        type="datetimerange",
        value-format="yyyy-MM-dd HH:mm:ss",
        :default-time="['00:00:00', '23:59:59']",
        :clearable="false",
        @change="getData()",
        style="min-width: 380px"
      )
      el-input.mx-2(v-model="account", placeholder="请输入会员帐号", @input="debounceGetData()")
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
      el-table(:data="tableData", border, stripe, height="75vh")
        el-table-column(v-if="fieldPerms.memberWalletAdjustId", label="流水号", align="center", prop="memberWalletAdjustId")
        el-table-column(v-if="fieldPerms.memberWalletAdjustOrderId", label="调整单号", align="center", prop="memberWalletAdjustOrderId", width="160")
        el-table-column(v-if="fieldPerms.memberWalletAdjustModifyType", label="调整原因", align="center", prop="memberWalletAdjustModifyType.display", width="120")
        el-table-column(v-if="fieldPerms.memberUserAccount", label="玩家帐号", align="center")
          template(slot-scope="{ row }")
            member-display(
              :memberName="row.memberUserAccount",
              :memberId="row.memberUserId",
              :groups="row.backendMemberGroupList"
            )
        el-table-column(v-if="fieldPerms.backendMemberRealname", label="玩家姓名", align="center", prop="backendMemberRealname")
        el-table-column(v-if="fieldPerms.memberWalletAdjustOldAmount", label="调整前金额", align="center", width="90")
          span(slot-scope="{ row }") {{ row.memberWalletAdjustOldAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.memberWalletAdjustAmount", label="调整金额", align="center")
          span(slot-scope="{ row }", :class="row.memberWalletAdjustAmount < 0 ? 'text-danger' : ''") {{ row.memberWalletAdjustAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.memberWalletAdjustWidthdrawLimit", label="流水限制", align="center")
          span(slot-scope="{ row }") {{ row.memberWalletAdjustWidthdrawLimit | formatMoney }}
        el-table-column(v-if="fieldPerms.memberWalletAdjustNote", label="备注", prop="memberWalletAdjustNote", align="center", show-overflow-tooltip)
        el-table-column(v-if="fieldPerms.memberWalletAdjustOrder", label="相关单号", align="center", prop="memberWalletAdjustOrder")
        el-table-column(v-if="fieldPerms.memberWalletAdjustStatus", label="状态", align="center", prop="memberWalletAdjustStatus.display")
        el-table-column(v-if="fieldPerms.memberWalletAdjustUpdatedAt", label="最后更新时间", align="center", prop="memberWalletAdjustUpdatedAt", width="160")
        el-table-column(v-if="fieldPerms.memberWalletAdjustEditor", label="操作者", align="center", prop="memberWalletAdjustEditor")
        el-table-column(v-if="fieldPerms.memberWalletAdjustId", label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            template(v-if="fieldPerms.memberWalletAdjustStatus && row.memberWalletAdjustStatus.value === 1")
              el-link.mx-1.text-success(
                v-if="buttonPerms.cashAdjustPass",
                @click="action(row.memberWalletAdjustId, 'pass')"
              ) 通过
              el-link.mx-1.text-danger(
                v-if="buttonPerms.cashAdjustReject",
                @click="action(row.memberWalletAdjustId, 'reject')"
              ) 拒绝
            el-link.mx-1.text-primary(
              v-if="buttonPerms.cashAdjustHasLogNeedId",
              @click="openUpdateLog(row.memberWalletAdjustId)"
            ) 修改记录
    //- 修改记录
    el-drawer(title="修改记录", :visible.sync="updateLogVisible", :destroyOnClose="true", direction="rtl", size="60%")
      UpdateLog(:tableId="updateLogId")
</template>

<script>
import debounce from 'lodash/debounce';
import { getAdjustListAPI, handleAdjustAPI } from '@/api/member/cashAdjust';
import UpdateLog from '@/components/UpdateLog';

export default {
  components: { UpdateLog },
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      timeRange: [],
      updateLogVisible: false,
      updateLogId: null,
      account: '',
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    // 需要预设带入今日日期
    const today = new Date();
    const todayString = new Date(today.getTime() - (today.getTimezoneOffset() * 60000 )).toISOString().split('T')[0];
    this.timeRange = [`${todayString} 00:00:00`, `${todayString} 23:59:59`];

    this.getData();

    this.debounceGetData = debounce(this.getData, 500);
  },
  methods: {
    getData() {
      getAdjustListAPI({
        per_page: this.pageSize,
        page: this.currentPage,
        start_time: this.timeRange[0],
        end_time: this.timeRange[1],
        account: this.account,
      })
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    action(id, action) {
      const actionText = {
        pass: '通过',
        reject: '拒绝'
      }

      this.$swal({
        title: '系统提示',
        text: `是否${actionText[action]}该笔玩家资金调整`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: actionText[action],
        cancelButtonText: '取消',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          return handleAdjustAPI[action](id);
        }

        return Promise.reject();
      })
      .then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(row => row.memberWalletAdjustId === response.data.data[0].memberWalletAdjustId),
          response.data.data[0]
        )
        this.$swal('成功！', `已${actionText[action]}该笔资金调整`, 'success');
      }).catch(() => {});
    },
    openUpdateLog(id) {
      this.updateLogId = id;
      this.updateLogVisible = true;
    }
  }
}
</script>
