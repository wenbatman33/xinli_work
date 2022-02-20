<template lang="pug">
  .container-fluid
    .d-flex.justify-content-between
      el-date-picker(
        v-model="timeRange",
        type="daterange",
        value-format="yyyy-MM-dd",
        :clearable="false",
        @change="getData()",
        style="min-width: 300px"
      )
      el-button.mb-2(@click="addBet") 新增赛事
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
      el-table(:data="tableData", border, stripe, height="75vh")
        el-table-column(label="赛事时间", prop="date", align="center", width="180")
        el-table-column(label="上架位置", align="center", width="120")
          span(slot-scope="{ row }") {{ row.platform.map(platform => platform.display).join(' / ') }}
        el-table-column(label="类型", prop="type.display", align="center", width="100")
        el-table-column(label="联赛", prop="name", align="center", show-overflow-tooltip)
        el-table-column(label="主队 vs 客队", align="center", width="150")
          span(slot-scope="{ row }") {{ row.home }} vs {{ row.guest }}
        el-table-column(label="投注选项", align="center", width="180", show-overflow-tooltip)
          template(slot-scope="{ row }")
            span(v-for="(item, index) in row.betItem") {{ item.display }}
              span(v-if="index !== row.betItem.length - 1") /
        el-table-column(label="最小投注额", align="center", width="100")
          span(slot-scope="{ row }") {{ row.min | formatMoney }}
        el-table-column(label="最高投注额", align="center", width="120")
          span(slot-scope="{ row }") {{ row.max | formatMoney }}
        el-table-column(label="状态", prop="status.display", align="center", width="100")
        el-table-column(label="赛事结果", prop="win.display", align="center", width="100")
        el-table-column(label="操作", align="center", width="160")
          template(v-if="! (row.isSend || row.status.value === 2)", slot-scope="{ row }")
            template(v-if="row.win.value === 0")
              el-link.mx-1.text-primary(@click="editBet(row)") 编辑
              el-link.mx-1.text-danger(v-if="row.status.value", @click="editBetStatus(row, 0)") 停用
              el-link.mx-1.text-success(v-else, @click="editBetStatus(row, 1)") 开启
              el-link.mx-1.text-primary(@click="inputResult(row)") 输入结果
              el-link.mx-1.text-danger(@click="cancel(row)") 取消竟猜
            template(v-else)
              el-link.mx-1.text-primary(@click="updateResult(row)") 更新结果
              el-link.mx-1.text-primary(@click="givePoint(row)") 派发梦基金
    //- bet dialog
    el-dialog(
      :title="dialogTitle",
      :visible.sync="dialogVisible",
      width="66%",
      top="10vh"
      destroy-on-close
    )
      //- label-width auto 会导致重整会有Error (https://github.com/ElemeFE/element/issues/17617)
      el-form(:model="formData", :rules="rules", ref="betForm", :label-width="dialogVisible ? 'auto' : ''")
        el-form-item(label="上架位置", prop="platform")
          el-checkbox-group(v-model="formData.platform")
            el-checkbox(:label="1") 在线
            el-checkbox(:label="2") 线下
        el-form-item(label="赛事日期、時間", prop="date")
          el-date-picker(v-model="formData.date", type="datetime", format="yyyy-MM-dd HH:mm", value-format="yyyy-MM-dd HH:mm", :clearable="false")
        el-form-item(label="赛事类型", prop="type")
          el-select(v-model="formData.type")
            el-option(v-for="(type, index) in types" :key="index" :label="type" :value="+index")
        el-form-item(label="联赛", prop="name")
          el-input(v-model="formData.name")
        //- MARK: logo 暂无确认规格
        el-form-item(label="主队 vs 客队", prop="team")
          .d-flex.justify-content-between
            el-input(v-model="formData.home")
            .w-25.text-center VS
            el-input(v-model="formData.guest")
        el-form-item(label="投注选项(多选)", prop="bet_item")
          el-checkbox-group(v-model="formData.bet_item")
            el-checkbox(v-for="(type, index) in betTypes", :key="index", :label="index") {{ type }}
        el-form-item(label="最小投注额", prop="min")
          el-input(v-model.number="formData.min")
        el-form-item(label="最高投注额", prop="max")
          el-input(v-model.number="formData.max")
        el-form-item(label="赔率")
          span 1 : 1
        el-form-item(label="开启", prop="status")
          el-switch(v-model="formData.status", :inactive-value="0", :active-value="1")
        .text-right
          el-button(@click="dialogVisible = false") 取消
          el-button(type="primary", @click="handleSubmit") 确认
    //- 输入结果 dialog
    el-dialog(
      :title="resultDialogTitle",
      :visible.sync="resultDialogVisible",
      width="66%",
      top="10vh",
      destroy-on-close
    )
      el-card
        .container(style="font-size: 16px")
          .row.mb-3
            .col-3 赛事日期、時間
            .col-9 {{ resultData.date }}
          .row.mb-3
            .col-3 赛事类型
            .col-9 {{ resultData.type && resultData.type.display }}
          .row.mb-3
            .col-3 联赛
            .col-9 {{ resultData.name }}
          .row.mb-3
            .col-3 主队 vs 客队
            .col-9 {{ resultData.home }} vs {{ resultData.guest }}
          .row.mb-3
            .col-3 投注选项
            .col-9
              el-radio(
                v-for="(type, index) in betTypes",
                :key="index",
                :value="resultData.betItem && resultData.betItem.some(item => +item.value === +index) ? +index : 0",
                :label="+index",
                disabled
              ) {{ type }}
          .row.mb-3
            .col-3 结果(单选)
            .col-9
              el-radio-group(v-if="resultData.betItem", v-model="result", size="mini")
                el-radio-button(
                  v-for="item in resultData.betItem",
                  :key="item.value",
                  :label="item.value"
                ) {{ item.display }}
          .row
            .col-12.text-right
              el-button(@click="resultDialogVisible = false") 取消
              el-button(type="primary", @click="handleInputResult") 确认

</template>

<script>
import {
  getBetListAPI,
  getTypesAPI,
  getBetTypesAPI,
  addBetAPI,
  editBetAPI,
  editBetWinAPI,
  givePointAPI,
  cancelBetAPI,
} from '@/api/dreamCity/bet';

export default {
  data() {
    const checkTeam = (rule, value, callback) => {
      if (this.formData.home && this.formData.guest) {
        callback();
      }

      callback(new Error('赛事队伍必须填写'));
    }

    const checkLowLimit = (rule, value, callback) => {
      if (value > this.formData.max) {
        callback(new Error('下限不得超过上限'));
      }

      callback();
    };

    const checkUpLimit = (rule, value, callback) => {
      if (value < this.formData.min) {
        callback(new Error('上限不得低于下限'));
      }

      callback();
    };

    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      timeRange: [],
      dialogVisible: false,
      dialogTitle: '',
      resultDialogVisible: false,
      resultDialogTitle: '',
      resultData: {},
      result: '',
      types: {},
      betTypes: {},
      formData: {
        platform: [],
        date: '',
        type: 1,
        name: '',
        home: '',
        home_logo_id: 0,
        guest: '',
        guest_logo_id: 0,
        bet_item: [],
        min: 10,
        max: 500,
        status: 1
      },
      rules: {
        platform: [
          { required: true, message: '最少需选择一个上架位置', trigger: 'submit' }
        ],
        date: [
          { required: true, message: '必须选择赛事日期', trigger: 'submit'}
        ],
        type: [
          { required: true, message: '必须选择一种赛事类型', trigger: 'submit' }
        ],
        name: [
          { required: true, message: '联赛名称为必填', trigger: 'submit' }
        ],
        team: [
          { required: true, validator: checkTeam, trigger: 'submit'}
        ],
        min: [
          { required: true, message: '最小投注额为必填', trigger: 'submit' },
          { validator: checkLowLimit, trigger: 'submit' }
        ],
        max: [
          { required: true, message: '最高投注额为必填', trigger: 'submit' },
          { validator: checkUpLimit, trigger: 'submit' }
        ],
        bet_item: [
          { type: 'array', required: true, message: '必须选择一种投注选项', trigger: 'submit' }
        ],
        status: [
          { required: true, message: '上下架为必填', trigger: 'submit' }
        ]
      },
    }
  },
  created() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 30);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.timeRange = [startDate, endDate];

    this.getData();

    getTypesAPI().then(response => {
      this.formData.type = Object.keys(response.data.data)[0];
      this.types = response.data.data;
    });

    getBetTypesAPI().then(response => {
      this.betTypes = response.data.data;
    })
  },
  methods: {
    getData() {
      getBetListAPI({
        per_page: this.pageSize,
        page: this.currentPage,
        start_time: this.timeRange[0],
        end_time: this.timeRange[1]
      }).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    addBet() {
      this.dialogTitle = '新增赛事';
      this.formData = {
        platform: [],
        date: '',
        type: 1,
        name: '',
        home: '',
        home_logo_id: 0,
        guest: '',
        guest_logo_id: 0,
        bet_item: [],
        min: 10,
        max: 500,
        status: 1
      }
      this.dialogVisible = true;
    },
    editBet(bet) {
      this.formData.platform = bet.platform.map(platform => platform.value);
      this.formData.id = bet.id;
      this.formData.date = bet.date;
      this.formData.type = bet.type.value;
      this.formData.name = bet.name;
      this.formData.home = bet.home;
      this.formData.home_logo_id = bet.home_logo_id;
      this.formData.guest = bet.guest;
      this.formData.guest_logo_id = bet.guest_logo_id;
      this.formData.bet_item = bet.betItem.map(item => item.value);
      this.formData.min = bet.min;
      this.formData.max = bet.max;
      this.formData.status = bet.status.value;

      this.dialogTitle = '编辑赛事';
      this.dialogVisible = true;
    },
    handleSubmit() {
      this.$refs.betForm.validate(valid => {
        if (valid) {
          const request = this.formData.id ? this.handleEditBet : this.handleAddBet;
          const data = Object.assign({}, this.formData);

          data.bet_item = data.bet_item.join();
          data.date += ':00';

          request(data);
        }
      })
    },
    handleAddBet(data) {
      return addBetAPI(data).then(() => {
        this.getData();
        this.dialogVisible = false;
        this.$message.success('新增赛事成功');
      });
    },
    handleEditBet(data) {
      return editBetAPI(data.id, data).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(bet => bet.id === response.data.data[0].id),
          response.data.data[0]
        );
        this.dialogVisible = false;
        this.$message.success('编辑赛事成功');
      })
    },
    editBetStatus(bet, status) {
      const data = Object.assign({}, bet);

      data.status = status;
      data.type = data.type.value;
      data.bet_item = data.betItem.map(item => item.value).join();
      data.date += ':00';
      data.platform = data.platform.map(platform => platform.value);

      editBetAPI(bet.id, data).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(bet => bet.id === response.data.data[0].id),
          response.data.data[0]
        )
        this.$swal('成功！', `赛事【${bet.name}】已成功${['停用', '开启'][status]}`, 'success');
      })
    },
    inputResult(bet) {
      this.resultData = bet;
      this.result = bet.betItem[0].value;
      this.resultDialogTitle = '输入结果';
      this.resultDialogVisible = true;
    },
    updateResult(bet) {
      this.resultData = bet;
      this.result = bet.win.value;
      this.resultDialogTitle = '更新结果';
      this.resultDialogVisible = true;
    },
    handleInputResult() {
      editBetWinAPI(this.resultData.id, { win: this.result }).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(bet => bet.id === response.data.data[0].id),
          response.data.data[0]
        );
        this.resultDialogVisible = false;
        this.$message.success('输入结果成功');
      })
    },
    givePoint(bet) {
      this.$swal({
        title: '系统提示',
        text: '是否派发梦基金',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          return givePointAPI(bet.id);
        }

        return Promise.reject();
      })
      .then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(bet => bet.id === response.data.data[0].id),
          response.data.data[0]
        );
        this.$swal('成功！', '梦基金已派发', 'success');
      }).catch(() => {
        this.$swal('未完成', '派发失败！请稍后在试', 'error');
      })
    },
    cancel(bet) {
      this.$swal({
        title: '取消竟猜 是否送出?',
        html: `
          赛事时间：${bet.date}<br>
          类型：${bet.type.display}<br>
          联赛：${bet.name}<br>
          赛事：${bet.home} vs ${bet.guest}
        `,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '完成',
        cancelButtonText: '取消',
        reverseButtons: true,
        input: 'textarea',
        inputValidator: remark => ! remark && '必须填写取消原因'
      }).then(({ value: note }) => {
        if (note) {
          return cancelBetAPI(bet.id, { note });
        }

        return Promise.reject();
      })
      .then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(bet => bet.id === response.data.data[0].id),
          response.data.data[0]
        )
        this.$swal('成功！', '已取消该竞猜', 'success');
      }).catch(() => {
         this.$swal('未完成', '该操作未完成', 'error');
      })
    },
  }
}
</script>
