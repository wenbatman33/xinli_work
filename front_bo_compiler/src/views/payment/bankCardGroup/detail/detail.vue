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
          el-form-item(v-if="fieldPerms.GroupBCardName", label="类型名称", prop="name")
            el-input(v-model="editGroupBlock.data.name")
          el-form-item(label="人数")
            el-input(readonly, :value="group.GroupBCardMemberNum", disabled)
          el-form-item(label="单笔限额", required)
            el-col(:span="11")
              el-form-item(prop="lower_limit")
                el-input(type="number", v-model.number="editGroupBlock.data.lower_limit", min="0")
            el-col.text-center(:span="2") ~
            el-col(:span="11")
              el-form-item(prop="up_limit")
                el-input(type="number", v-model.number="editGroupBlock.data.up_limit", min="0")
          el-row
            el-form-item(label="群组分类", prop="category")
              el-select(v-model="editGroupBlock.data.category")
                el-option(v-for="(category, index) in categories", :key="index", :value="index >> 0", :label="category")
          el-row
            el-form-item.bl-inline-100(label="可转出的银行卡群组", prop="transfer_out_group")
              el-select(v-model="editGroupBlock.data.transfer_out_group", multiple)
                el-option-group(label="🔄 点击重新获取群组 🔄", @click.native="fetchGroups()")
                  el-option(v-for="group in groups", :key="group.id", :value="group.id", :label="group.name")
          el-row
            el-form-item(label="备注", prop="note")
              el-input(type="textarea", v-model="editGroupBlock.data.note", :autosize="{ minRows: 2, maxRows: 6 }")
    //- Group 显示
    .alert.alert-secondary(v-else)
      .position-absolute(v-if="buttonPerms.editBankCardGroupInGroup", style="top: 0 ;right: 10px")
        el-link(:underline="false")
          i.el-icon-edit(@click="editGroup()")
      .d-flex.flex-row
        .mx-3(v-if="fieldPerms.GroupBCardName") 群组名称: {{ group.GroupBCardName }}
        .mx-3(v-if="fieldPerms.GroupBCardMemberNum") 人数: {{ group.GroupBCardMemberNum }}
        .mx-3(v-if="fieldPerms.GroupBCardLowerLimit || fieldPerms.GroupBCardUplimit")
          | 每笔限额: {{ group.GroupBCardLowerLimit }} ~ {{ group.GroupBCardUplimit }}
      .flex-row(v-if="fieldPerms.GroupBCardTransferOutGroup && group.GroupBCardTransferOutGroup.length")
        span.mr-3 可转出的银行卡群组:
        el-tag.mx-1(v-for="transferOutGroup in group.GroupBCardTransferOutGroup", :key="transferOutGroup.id")
          | {{ transferOutGroup.name }}
      .flex-row
        .mx-3(v-if="fieldPerms.GroupBCardCategory && group.GroupBCardCategory")
         | 群组分类: {{ group.GroupBCardCategory.display }}
      .flex-row
        .mx-3(v-if="fieldPerms.GroupBCardNote && group.GroupBCardNote")
          | 备注: {{ group.GroupBCardNote }}
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
      el-table(:data="tableData", height="60vh")
        el-table-column(v-if="fieldPerms.BCardNo|| fieldPerms.BCardVirtualNo", label="卡号", align="center", width="180")
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
        el-table-column(v-if="buttonPerms.deleteBankCardInGroup", label="管理", align="center")
          template(slot-scope="{ row }")
              el-link.text-primary(@click="deleteBankCard(row)") 移除
</template>

<script>
import { getBankCardGroupAPI, editBankCardGroupAPI, getBankCardGroupsAPI } from '@/api/payment/bankCardGroup';
import { getBankCardsAPI, deleteBankCardInGroupAPI } from '@/api/payment/bankCard';

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
      ],
      group: {
        GroupBCardTransferOutGroup: []
      },
      groups: [],
      needFetchGroups: true,
      editGroupBlock: {
        visible: false,
        data: {
          id: 0,
          name: '',
          item: '',
          note: '',
          transfer_out_group: []
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
        ],
        category: [
          { required: true, message: '需选择一个群组分类', trigger: 'submit' }
        ]
      },
      categories: {
        1: '存款卡',
        2: '出款卡',
        3: '中转卡',
        4: '三方结帐卡',
        5: '仓库卡'
      },
    };
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getBankCardGroupAPI(this.$route.query.id).then(response => {
      this.group = response.data.data[0];
    });

    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        group_id: this.$route.query.id // 特定金流群組 id
      };

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getBankCardsAPI(APIParams).then(
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
          name: this.group.GroupBCardName,
          note: this.group.GroupBCardNote,
          lower_limit: this.group.GroupBCardLowerLimit,
          up_limit: this.group.GroupBCardUplimit,
          transfer_out_group: [],
          category: this.group.GroupBCardCategory && this.group.GroupBCardCategory.value
        }
      };

      this.editGroupBlock.data.transfer_out_group = this.group.GroupBCardTransferOutGroup.map(group => group.id);

      if (this.needFetchGroups) {
        this.fetchGroups();
      }
    },
    submitEditGroup() {
      this.$refs.form.validate(valid => {
        if (!valid) return;

        const data = {
          id: this.editGroupBlock.data.id,
          name: this.editGroupBlock.data.name,
          note: this.editGroupBlock.data.note,
          lower_limit: this.editGroupBlock.data.lower_limit,
          up_limit: this.editGroupBlock.data.up_limit,
          show: 1,
          category: this.editGroupBlock.data.category
        };

        data.transfer_out_group = this.editGroupBlock.data.transfer_out_group;

        editBankCardGroupAPI(data.id, data).then(response => {
          // todo: 改名称后 tab 有误
          // this.$router.push({ query: { title: 123 } })
          this.group = response.data.data[0];
          this.editGroupBlock.visible = false;
          this.$message.success('银行卡金流群组 - 修改成功');
        });
      });
    },
    fetchGroups() {
      getBankCardGroupsAPI().then(response => {
        this.groups = response.data.data.reduce((result, group) => {
          if (group.id !== this.$route.query.id) {
            result.push({ id: group.id, name: group.GroupBCardName || group.id });
          }

          return result
        }, []);
        this.needFetchGroups = false;
      });
    },
    deleteBankCard(bankCard) {
      this.$swal({
        title: '确定移出？',
        text: `您即将移出银行卡 - ${bankCard.BCardNo}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认移出！',
        cancelButtonText: '取消'
      })
        .then(result => {
          if (result.value) {
            return deleteBankCardInGroupAPI(bankCard.id, { group_id: this.$route.query.id });
          }

          return Promise.reject();
        })
        .then(() => {
          this.getData();
          this.$message.success('银行卡 - 移出成功！');
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-select-group__title {
  cursor: pointer;
  color: #3f3f3f;
  font-weight: 600;
}
</style>

<style lang="scss">
.bl-inline-100 {
  width: 100%;
  .el-form-item__content {
    width: calc(100% - 200px);
    .el-select {
      width: 100%;
    }
  }
}
</style>

