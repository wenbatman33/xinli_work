<template lang="pug">
  .container-fluid
    el-tabs(
      v-if="buttonPerms.addBankCardInGroup",
      v-model="workspace",
      tab-position="right"
    )
      el-tab-pane(label="群组资料", name="detail")
      el-tab-pane(v-if="buttonPerms.addBankCardInGroup", label="新增银行卡", name="addBankCard")
      keep-alive
        component(:is="workspace", :fieldPerms="fieldPerms", :buttonPerms="buttonPerms", :blockPerms="blockPerms")
    detail(v-else, :fieldPerms="fieldPerms", :buttonPerms="buttonPerms", :blockPerms="blockPerms")

</template>

<script>
import detail from './detail.vue';
import addBankCard from './addBankCard.vue';

export default {
  components: { detail, addBankCard },
  data() {
    return {
      workspace: 'detail'
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (! this.$route.query.id) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      this.$message.error('无此银行卡金流群组！');
    }
  }
}
</script>
