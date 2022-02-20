<template lang="pug">
  .container-fluid
    .bg-light.p-2.mb-2
      div 优惠活动：
        el-select.mx-2(v-model="promotionId", size="mini")
          el-option(
            v-for="online in onlineList",
            :key="online.id",
            :label="online.promotionTitle",
            :value="online.id"
          )
      el-card.my-2(shadow="always", v-if="promotionId")
        .d-flex.justify-content-between
          div(v-if="promotionData.promotionType") 类型： {{ promotionData.promotionType.display }} 
          div
            span.mx-1(v-if="promotionData.promotionApplyMethod") {{ promotionData.promotionApplyMethod.display }}申请
            span.mx-1(v-if="promotionData.promotionVerifyMethod") {{ promotionData.promotionVerifyMethod.display }}审核
            span.mx-1(v-if="promotionData.promotionSendMethod") {{ promotionData.promotionSendMethod.display }}派发
          div 参加人数： {{ dataTotal || 0 }}
    template(v-if="promotionId")
      data-filter.promotion--filter(ref="dataFilter", :filterList="filterList", @change="getData()")
        transition(name="fade")
          .promotion--batch.d-flex.justify-content-around.align-items-center(v-if="selection.length")
            el-button(v-if="buttonPerms.promotionPass", @click="batch(actionType.pass)") 批次通过
            el-button(v-if="buttonPerms.promotionFail", @click="batch(actionType.fail)") 批次失败
            el-button(v-if="buttonPerms.promotionSend", @click="batch(actionType.send)") 批次派发
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
      .row
        el-table(:data="tableData", height="63vh", @selection-change="handleSelectionChange", ref="table")
          el-table-column(v-if="canBatch", type="selection", align="center")
          el-table-column(v-if="fieldPerms.id", prop="id", label="单号", align="center")
            //- todo: 目前还没有 API 暂时跳过
            //- template(slot-scope="{ row }")
            //-   router-link(:to="{ path:'promotionApplyDetail', query: { title: row.id, id: row.id } }") {{ row.id }}
          el-table-column(
            v-if="fieldPerms.promotionDetailCreatedAt",
            label="申请时间",
            prop="promotionDetailCreatedAt",
            align="center",
            width="180"
          )
          el-table-column(v-if="fieldPerms.promotionDetailStatus", label="状态", align="center")
            template(slot-scope="{ row }")
              span {{ row.promotionDetailStatus.display }}
          el-table-column(v-if="fieldPerms.memberUserAccount", label="会员帐号", align="center", width="160")
            template(slot-scope="{ row }")
              member-display(
                :memberName="row.memberUserAccount",
                :memberId="row.memberId",
                :groups="row.memberGroupGroupName"
              )
          el-table-column(v-if="fieldPerms.promotionVerifyAt", label="审核时间", align="center", width="180")
            template(slot-scope="{ row }")
              span(v-if="new Date(row.promotionVerifyAt).getTime()") {{ row.promotionVerifyAt }}
              span(v-else) --
          el-table-column( v-if="fieldPerms.promotionSendAt", label="派发时间", align="center", width="180")
            template(slot-scope="{ row }")
              span(v-if="new Date(row.promotionSendAt).getTime()") {{ row.promotionSendAt }}
              span(v-else) --
          el-table-column(v-if="fieldPerms.promotionDetailUpdatedUser", label="操作人", align="center", width="100")
            template(slot-scope="{ row }")
              span {{ row.promotionDetailUpdatedUser.display }}
          el-table-column(v-if="fieldPerms.promotionDetailNote", prop="promotionDetailNote", show-overflow-tooltip, label="备注", align="center")
          el-table-column(label="操作", width="200", align="center")
            template(slot-scope="{ row }", v-if="fieldPerms.promotionDetailStatus")
              .text-left
                template(v-if="row.promotionDetailStatus.value === 2")
                  el-link.mx-1.text-success(
                    v-if="buttonPerms.promotionPass",
                    @click="action(row.id, row.memberUserAccount, actionType.pass)"
                  ) 通过
                  el-link.mx-1.text-danger(
                    v-if="buttonPerms.promotionFail",
                    @click="action(row.id, row.memberUserAccount, actionType.fail)"
                  ) 失败
                el-link.mx-1.text-success(
                  v-if="buttonPerms.promotionSend && row.promotionDetailStatus.value === 7",
                  @click="action(row.id, row.memberUserAccount, actionType.send)"
                ) 派发
                el-link.mx-1(
                  v-if="buttonPerms.promotionReject && row.promotionDetailStatus.value === 1",
                  @click="action(row.id, row.memberUserAccount, actionType.reject)"
                ) 退回
                //- 0參加優惠1已參加2待審核3待領取4已領取5失敗6已放棄
</template>

<script>
import { getOnlinePromotionsAPI, getApplyPromotionListAPI, changePromotionStatusAPI } from '@/api/promotion/promotion';

export default {
  data() {
    return {
      actionType: {
        pass: {
          value: 2,
          canDoStatus: 2,
          label: '通过'
        },
        fail: {
          value: 3,
          canDoStatus: 2,
          label: '失败',
          needNote: true,
        },
        send: {
          value: 4,
          canDoStatus: 7,
          label: '派发'
        },
        reject: {
          value: 1,
          canDoStatus: 1,
          label: '退回'
        }
      },
      canBatch: false,
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      onlineList: [],
      promotionId: null,
      promotionData: {},
      selection: [],
      filterList: [
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: {
              'all': '全部',
              0: '参加优惠',
              1: '已参加',
              2: '待审核',
              3: '领取奖励',
              4: '已领取',
              5: '失败',
              6: '已放弃',
              7: '待派发'
            },
          },
        },
        {
          label: '会员帐号',
          model: 'account',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '操作者',
          model: 'updated_user',
          component: 'filterInput',
          props: { type: 'text' }
        }
      ]
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (this.buttonPerms.promotionPass || this.buttonPerms.promotionFail || this.buttonPerms.promotionSend) {
      this.canBatch = true;
    }

    getOnlinePromotionsAPI().then(response => {
      this.onlineList = response.data.data;
    });
  },
  watch: {
    promotionId(value) {
      this.promotionData = this.onlineList.find(online => online.id === value);
      this.getData();
    }
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        promotion_id: this.promotionId
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getApplyPromotionListAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    handleSelectionChange(selection) {
      this.selection = selection;
    },
    handleClose() {
      this.$refs.table.clearSelection();
    },
    action(id, account, { label, needNote, value: action }) {
      if (needNote) {
        this.$swal({
          title: `优惠申请是否${label}`,
          html: `
            单号: ${id}<br>
            会员帐号: ${account}
          `,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '完成',
          cancelButtonText: '取消',
          reverseButtons: true,
          input: 'textarea',
          inputValidator: note => ! note && `必须填写${label}原因`
        }).then(({ value: note }) => {
          if (note) {
            this.handleBatchAPIResponse(changePromotionStatusAPI(id, { action, note }));
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          this.$swal('未完成', `${label}操作未执行`, 'error');
        });
      } else {
        this.handleBatchAPIResponse(changePromotionStatusAPI(id, { action }));
      }
      // changePromotionStatusAPI(id, { action }).then(response => {
      //   this.updateTableData(response.data.data);
      // })
    },
    batch({ label, canDoStatus, needNote, value: action }) {
      const canBatch = this.selection.filter(promotion => promotion.promotionDetailStatus.value === canDoStatus);
      if (canBatch.length === 0) {
        this.$message.warning(`无可${label}项目！`);
      }

      if (needNote) {
        this.$swal({
          title: `优惠申请是否${label}`,
          html: `
            共选取${this.selection.length}张优惠申请单<br>
            可批次处理共有 ${canBatch.length} 张
          `,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '完成',
          cancelButtonText: '取消',
          reverseButtons: true,
          input: 'textarea',
          inputValidator: note => ! note && `必须填写${label}原因`
        }).then(({ value: note }) => {
          if (note) {
            this.handleBatchAPIResponse(changePromotionStatusAPI(canBatch.map(item => item.id).join(), { action, note }));
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          this.$swal('未完成', `${label}操作未执行`, 'error');
        });
      } else {
        this.handleBatchAPIResponse(changePromotionStatusAPI(canBatch.map(item => item.id).join(), { action }));
      }
    },
    handleBatchAPIResponse(apiPromise) {
      apiPromise.then(response => {
        this.updateTableData(response.data.data);
        this.$refs.table.clearSelection();
      });
    },
    updateTableData(newDataArray) {
      let idString = '';
      newDataArray.map(newData => {
        idString += `${newData.id} `;
        this.$set(
          this.tableData,
          this.tableData.findIndex(tableData => tableData.id === newData.id),
          newData
        );
      });

      this.$message.success(`${idString}成功更动状态为 ${newDataArray[0].promotionDetailStatus.display}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.promotion--filter {
  position: relative;
  z-index: 10;
}

.promotion--batch {
  position: absolute;
  top: -30%;
  left: 0;
  width: 100%;
  bottom: -10%;
  z-index: 100;
  background-color: #f8f9fa;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

