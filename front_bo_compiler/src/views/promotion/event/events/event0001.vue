<template lang="pug">
  .container-fluid
    .d-flex.align-items-center
      el-page-header.mr-4(@back="$emit('back')", content="召喚大神")
      el-button(:type="active === 'editPage' ? 'success' : ''", @click="active = 'editPage'") 活动编辑
      el-button(:type="active === 'rank' ? 'success' : ''", @click="openRank()") 排行榜
      el-button(@click="openEvent()") 活动显示
    template(v-if="active === 'editPage'")
      .d-flex.my-2.justify-content-between
        div
          el-select(v-model="date", @change="getData()")
            el-option(v-for="(betDate, index) in hasBetDate", :key="index", :label="betDate", :value="betDate")
          el-select.mx-2(v-model="category", @change="getData()")
            el-option(label="全部类别", :value="null")
            el-option(label="足球", :value="1")
            el-option(label="篮球", :value="2")
          el-select(v-model="status", @change="getData()")
            el-option(label="全部状态", :value="null")
            el-option(label="启用", :value="1")
            el-option(label="停用", :value="0")
        div
          el-button(type="primary", @click="editAllBetStatus(1)") 全部开启
          el-button(type="danger", @click="editAllBetStatus(0)") 全部停用
      .row.my-2
        el-table(:data="tableData", border, stripe, height="calc(100vh - 260px)")
          el-table-column(label="类别", align="center", prop="className", width="80")
          el-table-column(label="时间", align="center", prop="dateStart", width="160")
          el-table-column(label="赛事", align="center", prop="leagueName", width="200")
          el-table-column(label="参赛队伍", align="center", prop="team")
          el-table-column(label="状态", align="center", width="80")
            span(slot-scope="{ row }", :class="row.status.value ? 'text-success' : 'text-danger'")
              | {{ row.status.display }}
          el-table-column(label="操作", align="center", width="100")
            template(slot-scope="{ row }")
              el-button(@click="editBet(row)") 编辑
    template(v-if="active === 'rank'")
      .row.my-2
        el-date-picker(
          :value="rankWeek"
          @input="value => rankWeek = $options.filters.formatWeek(value)"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          :clearable="false",
          @change="getRank()"
        )
      .row.my-2
        el-table(:data="rankTableData")
          el-table-column(label="排名", prop="rankName", align="center")
          el-table-column(label="帐号", prop="account", align="center")
          el-table-column(label="假帐号提示", align="center")
            .text-danger(slot-scope="{ row }", v-if="row.memberId === 0") 假帐号
          el-table-column(label="目前胜场数", prop="winCount", align="center")
          el-table-column(label="目前投注额", align="center")
            span(slot-scope="{ row }") {{ row.betAmount | formatMoney }}
          el-table-column(label="预计获得奖金", align="center")
            span(slot-scope="{ row }") {{ row.bonus | formatMoney }}
    //- 編輯賽事 dialog
    el-dialog(:visible.sync="dialogVisible", title="编辑每日赛事")
      el-form(:model="targetBet", label-width="auto", ref="form", :rules="rules")
        el-form-item(label="类别")
          span {{ targetBet.className }}
        el-form-item(label="时间")
          span {{ targetBet.dateStart }}
        el-form-item(label="赛事", prop="leagueName")
          el-input(v-model="targetBet.leagueName", placeholder="赛事名称")
        el-form-item(label="参赛队伍", prop="team")
          el-input(v-model="targetBet.team", placeholder="请输入参赛队伍 vs 参赛队伍")
        el-form-item(label="状态")
          el-switch(
            v-model="targetBet.status",
            :active-value="1",
            :inactive-value="0",
            inactive-color="red"
          )
      el-button.w-100(type="info", @click="handleEditBet()") 更新至前台
</template>

<script>
import {
  getRankAPI,
  editBetAPI,
  getBetListAPI,
  getBetDateListAPI,
  editAllBetStatusAPI
} from '@/api/promotion/event0001.js';

export default {
  data() {
    return {
      tableData: [],
      active: 'editPage',
      rankTableData: [],
      rankWeek: '',
      rankOpened: false,
      date: '',
      hasBetDate: [],
      category: null,
      status: null,
      dialogVisible: false,
      targetBet: {},
      rules: {
        leagueName: [{ required: true, message: '赛事为必填' }],
        team: [{ required: true, message: '参赛队伍为必填' }]
      }
    }
  },
  created() {
    const now = new Date();
    this.date = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).substr(-2)}-${('0' + now.getDate()).substr(-2)}`;

    getBetDateListAPI().then(response => {
      this.hasBetDate = Object.keys(response.data.data).filter(date => response.data.data[date]);
    });

    this.getData();
  },
  methods: {
    getData() {
      getBetListAPI({
        dateStart: this.date + ' 00:00:00',
        dateEnd: this.date + ' 23:59:59',
        class: this.category,
        status: this.status
      })
      .then(response => {
        this.tableData = response.data.data;
      })
    },

    openEvent() {
      window.open(this.$parent.getEventUrl('0001'), 'blank');
    },

    openRank() {
      if (! this.rankOpened) {
        const now = new Date();
        const day = now.getDay();

        if(now.getDay() === 1) {
          now.setDate(now.getDate() - 7);
        } else {
          now.setDate(now.getDate() - day + 1);
        }

        this.rankWeek = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).substr(-2)}-${('0' + now.getDate()).substr(-2)}`;

        this.getRank();
        this.rankOpened = true;
      }

      this.active = 'rank';
    },

    getRank() {
      getRankAPI({ weekDate: this.rankWeek }).then(response => {
        this.rankTableData = response.data.data;
      });
    },

    editAllBetStatus(editStatus) {
      const APIData = {
        dateStart: this.date + ' 00:00:00',
        dateEnd: this.date + ' 23:59:59',
        editStatus
      }

      if (this.category !== null) {
        APIData.class = this.category;
      }

      if ( this.status !== null) {
        APIData.status = this.status;
      }

      editAllBetStatusAPI(APIData).then(() => {
        this.$message.success('状态修改成功！');
        this.getData();
      })
    },

    editBet(bet) {
      this.targetBet = Object.assign({}, bet);
      this.targetBet.status = this.targetBet.status.value;
      this.dialogVisible = true;
    },

    handleEditBet() {
      this.$refs.form.validate(valid => {
        if (valid) {
          editBetAPI(this.targetBet.id, {
            league_name: this.targetBet.leagueName,
            team: this.targetBet.team,
            status: this.targetBet.status
          }).then(() => {
            this.$message.success('编辑成功！');
            this.dialogVisible = false;
            this.getData(); // MARK:修改成功后 response 无回传该笔资料 故直接重抓
          })
        }
      })
    },
  },
}
</script>
