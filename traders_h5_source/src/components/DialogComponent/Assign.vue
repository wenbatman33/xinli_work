<template lang="pug">
.w-full(v-if='MemberInfo && MemberData')
  .w-full
    p.text-lg.mb-8 上分点数 
    p.mt-4(v-if='MemberInfo.identity.value===2') 代理
    p.mt-4(v-if='MemberInfo.identity.value===3') 交易员
    el-select.w-full(v-model='Val', placeholder='请选择')
      el-option(v-for='item in MemberSubList', :key='item.id', :label='item.account+" "+item.name', :value='item.id')
  .w-full.my-4
    .text-blue-500 目前可用點數： {{MemberData.point}}
    el-input(v-model.trim='formData.point', placeholder='请输入上分点数')
    .text-xs.text-right.text-blue-500 需輸入整數
  .w-full.my-4.text-right
    el-button(@click='closeDialog') 取消
    el-button(type='primary', @click='assign') 确认
</template>

<script>
import { mapState } from 'vuex';
import { MemberSubListAPI, PointAssignAPI } from '@/api';


export default {
  computed: {
    ...mapState('member', ['MemberData', 'MemberInfo', 'MemberSubList', 'SubMemberignId']),
    Val: {
      get() {
        return this.$store.state.member.SubMemberignId;
      },
      set(id) {
        this.$store.commit('member/setSubMemberignId', id);
      },
    },
  },
  data() {
    return {
      formData: {
        member_id: '',
        point: '',
      }, 
    };
  },

  methods: {
    closeDialog() {
      this.$store.commit('setting/setDialogHide');
    },
    assign() {
      this.formData.member_id = this.$store.state.member.SubMemberignId;
      this.formData.point = Number(this.formData.point);
      PointAssignAPI(this.formData).then((res) => {
        this.$message({
          message: '上分完成！',
          type: 'success',
          showClose: true,
        });
        this.$store.commit('setting/setDialogHide');
        this.$store.dispatch('member/Member');
      });
    },
  },
};
</script>
