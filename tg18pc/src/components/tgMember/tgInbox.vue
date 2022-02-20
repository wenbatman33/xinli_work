<template lang='pug'>
  .tgDeposit
    .row.m-1
      .col-12
        el-tabs.w-100(v-model='activeName', type='border-card')
          el-tab-pane(label='站內信', name='1')
            .row.m-1
              .col-12
                el-button(type='primary' @click='deletesInbox') 刪除
              .col-12
                div.d-flex.justify-content-between.mt-2.mb-2
                el-table(v-if='MemberInboxList'
                        :data="MemberInboxList.data_list"
                        ref="table1" border style="width: 100%"
                        @selection-change="handleSelectionChange"
                        @row-click='showDialog'
                        :row-class-name='tableRowClassName')
                  el-table-column(type="selection" width="55")
                  el-table-column.cursor(prop='Create_At', label='日期', width='120')
                    template(slot-scope="scope")
                      div.cursor {{ scope.row.Create_At | momentDate}}
                  el-table-column.cursor(prop='Title', label='主题' width='300')
                    template(slot-scope="scope")
                      div.cursor {{ scope.row.Title }}
                  el-table-column.cursor.ContentCell(prop='Content', label='内文')
                    template(slot-scope="scope")
                      div.cursor.inboxContent {{removeHtmlTag(scope.row.Content)}}
                tgError(v-else)
                div.mt-1.mb-1.text-right(v-if='getTotalPages>0')
                  el-pagination(@current-change="handleCurrentChange"  :current-page.sync="currentPages" background="" layout="prev, pager, next" :total="getTotalPages" :page-size='30')
          el-dialog(:title='dialogMessage.Title', :visible.sync='dialogShow', width='50%')
            .dialogMessage.my-2(v-html='dialogMessage.Content')
            p {{dialogMessage.Create_At}}
</template>
<script>
import tgError from '@/components/tgError/tgError.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgError,
  },
  data() {
    return {
      activeName: '1',
      dialogShow: false,
      dialogMessage: [],
      inboxList: [],
      currentPages: 1,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'MemberData',
      'MemberInboxList',
    ]),
    getTotalPages() {
      return Number(this.MemberInboxList.total_rows);
    },
    getUrlID: {
      get() {
        const path = this.$route.path.split('/');
        const parHash = path[3];
        return this.activeName;
      },
    },
  },
  methods: {
    removeHtmlTag(str) {
      let content = str.replace(/<(?:.|\n)*?>/gm, '');
      content = `${content.substr(0, 46)}...`;
      return content;
    },
    tableRowClassName({ row, Status }) {
      if (row.Status === '0') {
        return 'unread';
      } else if (row.Status === '1') {
        return 'readed';
      } else if (row.Status === '2') {
        return 'delete';
      }
      return '';
    },
    cell({
      row, column, rowIndex, columnIndex,
    }) {
      if (columnIndex === '4') {
        return 'ContentCell';
      }
      return 'ContentCell';
    },
    handleSelectionChange(val) {
      this.inboxList = val;
    },
    handleCurrentChange(val) {
      this.currentPages = val;
      this.getAPI();
    },
    deletesInbox() {
      const deleteList = [];
      const vm = this;
      // let map1 = this.deleteList.map(function callback(currentValue[, index[, array]]) {
      this.inboxList.map((obj) => {
        deleteList.push(obj.Sn);
        return '';
      });
      const payload = {};
      payload.UserName = this.UserName;
      payload.Page = 1;
      payload.PageLimit = 30;
      payload.Sn = deleteList.toString();
      this.$store.dispatch('member/MemberInboxDelete', payload);
    },
    showDialog(row) {
      const payload = {}; 
      payload.UserName = this.UserName;
      payload.PageLimit = 30;
      payload.Sn = row.Sn;
      payload.Status = '1';
      this.$store.dispatch('member/MemberInboxReaded', payload);
      this.dialogMessage = row;
      this.dialogShow = true;
      this.GA_member_inbox(payload.Sn);
    },
    substrContent(str) {
      return `${str.substr(0, 100)}...`;
    },
  },
};
</script>
<style lang="scss" scoped>
  .el-tabs__content{
    min-height: 600px;
    margin: 0;
  }
  .tgDeposit{
    min-height: 600px;
  }
  .tgDepositMain {
    min-height: 600px;
    border-radius: 4px;
    background-color: #ffffff;
    border: solid 1px #d9d9d9;
  }
  .cursor{
    cursor: pointer;
  }
</style>
<style lang="scss">
.unread {
  background-color: #FFFCEC !important;
}
.readed {
  background-color: #fff !important;
}
.delete {
  background-color: #ccc !important;
}
.ContentCell{
  .cell{
    width: 200px;
    overflow : hidden!important;
    text-overflow : ellipsis!important;
    white-space : nowrap!important;
  }
  // background-color: #f90 !important;
}
.inboxContent{
  overflow : hidden!important;
  text-overflow: ellipsis!important;
  display: -webkit-box!important;
  -webkit-line-clamp: 2!important;
  -webkit-box-orient: vertical!important;
}
</style>
