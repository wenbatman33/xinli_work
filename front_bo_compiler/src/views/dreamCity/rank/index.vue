<template lang="pug">
  .container-fluid
    .d-flex.justify-content-around.align-items-center
      el-date-picker(
        v-model="datetime",
        type="datetimerange",
        value-format="yyyy-MM-dd HH:mm:ss",
        :clearable="false",
        @change="getData()",
        style="min-width: 300px"
      )
      el-select(v-model="type", @change="getData()")
        el-option(v-for="(type, index) in types" :key="index" :label="type" :value="index")
      el-select(v-model="limit", @change="getData()")
        el-option(label="查询 10 人", :value="10")
        el-option(label="查询 50 人", :value="50")
        el-option(label="查询 100 人", :value="100")
    .row.mt-2
      el-table(:data="tableData", border, stripe)
        el-table-column(label="排名", prop="rank", align="center")
        el-table-column(label="会员帐号", prop="account", align="center")
        el-table-column(label="获胜次数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openDetail(row.memberId)") {{ row.winCount }}
    //- 抽屉
    el-drawer(:visible.sync="visible", direction="rtl", :modal-append-to-body="false", :withHeader="false", size="80%")
      el-table(:data="detailData", border, stripe)
        el-table-column(label="会员帐号", prop="account", align="center")
        el-table-column(label="场次", prop="sessions", align="center")
        el-table-column(label="投注时间", prop="betTime", align="center", width="160")
        el-table-column(label="投注内容", prop="betContent", align="center", width="80")
        el-table-column(label="投注金额", align="center", width="100")
          span(slot-scope="{ row }") {{ row.betAmount | formatMoney }}
</template>

<script>
import { getTypesAPI, getRankAPI, getRankDetailAPI } from '@/api/dreamCity/bet';

export default {
  data() {
    return {
      tableData: [],
      types: {},
      datetime: [],
      type: '',
      limit: 10,
      visible: false,
      detailData: [],
    }
  },
  created() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 30);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.datetime = [startDate + ' 00:00:00', endDate + ' 23:59:59'];
    getTypesAPI().then(response => {
      this.type = Object.keys(response.data.data)[0];
      this.types = response.data.data;
      this.getData();
    });
  },
  methods: {
    getData() {
      getRankAPI({
        start_date: this.datetime[0],
        end_date: this.datetime[1],
        type: this.type,
        limit: this.limit,
      })
      .then(response => {
        this.tableData = response.data.data;
      })
    },

    openDetail(member_id) {
      getRankDetailAPI({
        start_date: this.datetime[0],
        end_date: this.datetime[1],
        type: this.type,
        member_id
      })
      .then(response => {
        this.detailData = response.data.data;
        this.visible = true;
      })
    },
  }
}
</script>
