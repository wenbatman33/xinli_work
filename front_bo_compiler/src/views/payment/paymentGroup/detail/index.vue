<template lang="pug">
  .container-fluid
    el-tabs(
      v-if="buttonPerms.addPaymentChannelInGroup",
      v-model="workspace",
      tab-position="right"
    )
      el-tab-pane(label="群组资料", name="detail")
      el-tab-pane(v-if="buttonPerms.addPaymentChannelInGroup", label="新增通道", name="addChannel")
      keep-alive
        component(:is="workspace", :fieldPerms="fieldPerms", :buttonPerms="buttonPerms", :blockPerms="blockPerms")
    detail(v-else, :fieldPerms="fieldPerms", :buttonPerms="buttonPerms", :blockPerms="blockPerms")

</template>

<script>
import detail from './detail.vue';
import addChannel from './addChannel.vue';

export default {
  components: { detail, addChannel },
  data() {
    return {
      workspace: 'detail'
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (! this.$route.query.id) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      this.$message.error('无此三方金流群组！');
    } else {
      this.$store.dispatch('payment/fetchServiceCode');
    }
  }
}
</script>
