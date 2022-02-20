<template lang='pug'>
.w-full.border-b(:class='{"bg-gray-100": (MEMBER.frozen.value==1)}')
  .flex.p-4.items-center.cursorP(@click='toggleItem')
    div(class='w-4/12')
      i.fas.fa-lock.text.sm.text-gray-400(v-if='MEMBER.frozen.value===1')
      span {{MEMBER.account+' '+MEMBER.name}}
    div.text-center(class='w-3/12')
      p.text-myGreen {{MEMBER.fee}}‰ 
    div.text-right(class='w-4/12')
      p.text-myGreen {{MEMBER.amount}}
    div.text-center(class='w-1/12')
      .btn.text-center
        i.fas.fa-angle-down(v-if='!itemOpen')
        i.fas.fa-angle-up(v-if='itemOpen')
      //- i.fas.fa-angle-up
  transition(name='slide-fade')
    .w-full.bg-gray-200(v-if='itemOpen')
      .flex.justify-between.floatCard.p-4
        .text-sm(class='w-1/2') 目前可用点数
        .text-right.text-myGreen(class='w-1/2')  {{MEMBER.point}}
      .flex.justify-between.px-4.py-2.text-myPurple
        .flex.flex-col.justify-center.items-center.cursorP.py-2(class='w-4/12 hover:bg-purple-200', @click='assign(MEMBER.id)')
          .icon52.flex.justify-center.items-center
            i.far.fa-smile
          p.text-sm 上分点数
        .flex.flex-col.justify-center.items-center.cursorP.py-2(class='w-4/12 hover:bg-purple-200', @click='showFeeDialog(MEMBER.id, MEMBER.fee, MEMBER.account, MEMBER.name)')
          .icon52.flex.justify-center.items-center
            i.fas.fa-dollar-sign
          p.text-sm 分润调整
        .flex.flex-col.justify-center.items-center.cursorP.py-2(class='w-4/12 hover:bg-purple-200', @click='frozen(MEMBER.id, MEMBER.frozen.value)')
          .icon52.flex.justify-center.items-center
            i.fas.fa-user-lock(v-if='MEMBER.frozen.value===0')
            i.fas.fa-unlock-alt(v-else)
          p.text-sm(v-if='MEMBER.frozen.value===0') 冻结
          p.text-sm(v-else) 启用
  el-dialog(title='修改分润(单位：‰)', :width='Width', :visible.sync='dialogVisible', :lock-scroll='true', :close-on-click-modal='false', append-to-body)
    p.text-blue-500 请输分润千分比(修改上限：2‰)
    el-input(v-model.trim='formData.fee', placeholder='请输分润比例')
    .w-full.my-4.text-right
      el-button(@click='closeDialog') 取消
      el-button(type='primary', @click='changeFee') 确认
</template>
<script>
import Assign from '@/components/DialogComponent/Assign.vue';
import { MembeFrozenAPI, MembeFeeAPI } from '@/api';
import { mapState } from 'vuex';

export default {
  name: 'RandomText',
  props: ['MEMBER'],
  data() {
    return {
      itemOpen: false,
      dialogVisible: false,
      Width: '95%',
      formData: {
        fee: '',
        member_id: '',
      },
    };
  },
  computed: {
    ...mapState('setting', ['windowWidth', 'windowHeight', 'deviceIsPc']),
    ...mapState('member', ['SubMemberignId']),
  },
  watch: {
    deviceIsPc(val) {
      if (val) { 
        this.Width = '60%'; 
      } else {
        this.Width = '95%';
      }
    },
  },
  methods: {
    toggleItem() {
      this.itemOpen = !this.itemOpen;
    },
    assign(id) {
      this.$store.commit('member/setSubMemberignId', id);
      this.$store.commit('setting/setDialogShow');
      this.$store.commit('setting/setDialogComponent', Assign);
    },
    frozen(id, frozen) {
      let messageText = '';
      let messageTitle = '';
      let successMessage = '';
      if (frozen === 0) {
        messageTitle = '冻结';
        messageText = '确认是否要冻结此用户.提醒您！冻结后，用户将不可再登入。';
        successMessage = '已冻结';
      } else {
        messageTitle = '启用';
        messageText = '确认是否要启用此用户！';
        successMessage = '已启用';
      }
      this.$confirm(messageText, messageTitle, {
        customClass: 'frozenMsgBox',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const payload = {
          frozen: (frozen === 0) ? 1 : 0,
          member_id: id,
        };
        MembeFrozenAPI(payload)
          .then((res) => {
            this.$message({
              type: 'success',
              message: successMessage,
            });
            this.$store.dispatch('member/getMemberSubList');
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消冻结',
        });          
      });
    },
    showFeeDialog(id, fee, account, name) {
      this.$store.commit('member/setSubMemberignId', id);
      this.dialogVisible = true;
      this.formData.member_id = id;
      this.formData.fee = fee;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.formData.member_id = '';
      this.formData.fee = '';
    },
    changeFee() {
      this.formData.fee = Number(this.formData.fee);
      MembeFeeAPI(this.formData)
        .then((res) => {
          this.$message({
            type: 'success',
            message: `${this.MEMBER.account} ${this.MEMBER.name} 分潤修改為: ${this.formData.fee}‰ `,
          });
          this.dialogVisible = false;
          this.$store.dispatch('member/getMemberSubList');
        });
    },
  },
  mounted() {
  },
};
</script>
<style lang='scss' scoped>
.btn{
  width: 40px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  margin: 0 auto;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}
hr{
  margin: 0;
}
.icon52{
  margin: 0;
  text-align: centerr;
  width: 52px;
  height: 42px;
}
.msgBox{
  width: 95%;
}
</style>
<style lang='scss'>
.frozenMsgBox{
  width: 80%;
  max-width: 800px;
}
</style>
