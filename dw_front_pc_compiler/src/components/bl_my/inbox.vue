<template lang="pug">
.BLOCK.CENTER.d-flex
  .wrap
    .content.p-4.my-2(v-if='step===1')
      div
        el-button(plain, @click='readedMessage') 设为已读
        el-button(plain, @click='deleteMessage') 删除消息
        //- el-button(plain, @click='resetMessage') 设为未读
        el-pagination.float-right(background='', layout='prev, pager, next', :total='memberInboxLength')
      div.my-2
        el-table(:data='memberInboxComputed', style='width: 100%',:row-class-name="tableRowClassName", @selection-change="handleSelectionChange")
          el-table-column(type="selection", width="55")
          el-table-column(prop='inboxUpdatedAt', label='时间', width='200')
            template(slot-scope='scope') 
              span {{scope.row.inboxUpdatedAt}}
          el-table-column(prop='inboxTitle', label='标题', width='240')
            template(slot-scope='scope') 
              span {{scope.row.inboxTitle}}
          el-table-column(prop='inboxContent', label='消息内容')
            template(slot-scope='scope') 
              span {{scope.row.inboxContent | noneHtmlCode}}
          el-table-column(width='100')
            template(slot-scope='scope') 
              el-button(type='primary', size='mini', @click='selectMessage(scope.row)') 查看
      div.my-2
        el-pagination.float-right.my-2(background='', layout='prev, pager, next', :total='memberInboxLength')
    .content.p-4(v-if='step===2')
      div
        //- p 
        //-   span.bread(@click='step=1') 我的消息 / 
        //-   span.breadTile {{selectMessageData.inboxTitle}}
        //-   el-button.float-right(plain, @click='step=1', size='mini') 返回
      .Breadcrumb
        span.highLight(@click='step=1')   我的消息 / 
        span {{selectMessageData.inboxTitle}}
        el-button.float-right(plain, @click='step=1', size='mini') 返回
      div.my-3
        h5.my-2 {{selectMessageData.inboxTitle}}
        el-divider
        div.inboxContent(v-html='selectMessageData.inboxContent')

</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      multipleSelection: [],
      selectArray: [],
      step: 1,
      selectMessageData: {},
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      let result = '';
      if (row.inboxStatus.value === 1) {
        result = 'messageVisited';
      } 
      return result;
    },
    handleSelectionChange(val) {
      const vm = this;
      vm.selectArray = [];
      vm.multipleSelection = val;
      vm.multipleSelection.forEach((item, index, array) => {
        vm.selectArray.push(item.id);
      });
    },
    readedMessage() {
      const vm = this;
      if (vm.selectArray.length > 0) {
        vm.patchMemberInbox(vm.selectArray, 1);
        vm.selectArray = [];
      } else {
        vm.$message({ message: '请选择已读消息', type: 'error' });
      }
    },
    resetMessage() {
      const vm = this;
      if (vm.selectArray.length > 0) {
        vm.patchMemberInbox(vm.selectArray, 0);
      } else {
        vm.$message({ message: '请选择已读消息', type: 'error' });
      }
    },
    deleteMessage() {
      const vm = this;
      if (vm.selectArray.length > 0) {
        vm.patchMemberInbox(vm.selectArray, 2);
      } else {
        vm.$message({ message: '请选择删除消息', type: 'error' });
      }
    },
    patchMemberInbox(data, status) {
      console.log(data);
      const vm = this;
      const payload = {};
      payload.id = data.toString();
      payload.status = { status };
      vm.$store.dispatch('member/MemberInboxPatch', payload)
        .then((res) => {
          // / 完成後更新資料
          this.$store.dispatch('member/MemberInbox');
        });
    },
    selectMessage(data) {
      const vm = this;
      vm.step = 2;
      vm.selectMessageData = data;
      vm.selectArray.push(data.id);
      vm.$matomo_my_inbox(data.id);
      if (data.inboxStatus.value === 0) vm.readedMessage(data.id);
    },
  },
  computed: {
    ...mapState('member', [
      'memberInbox',
      'memberInboxLength',
    ]),
    memberInboxComputed() {
      const result = this.memberInbox.filter(item => item.inboxStatus.value !== 2);
      return result;
    },
  },
};
</script>
<style lang="scss" scoped>
.highLight{
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: $DW_Color;
  a{
    text-decoration: none;
    color: $DW_Color;
  }
}
.inboxContent{
  img{
    max-width:100%;
  }
}
</style>
<style  lang="scss">
.el-table .messageVisited{
  background: $garyBlue_lightest;
}
</style>
