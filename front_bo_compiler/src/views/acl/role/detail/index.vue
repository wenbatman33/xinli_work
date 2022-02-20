<template lang="pug">
  .container-fluid(v-if="workspace")
    el-tabs(v-model="workspace", tab-position="right")
      el-tab-pane(label="群组人员", name="detail")
      el-tab-pane(v-if="buttonPerms.editPermission", label="权限设定", name="permission")
      el-tab-pane(v-if="buttonPerms.editField", label="栏位显示", name="field")
      //- MARK: PM畫面有設計 但給後端的清單無此修改記錄 因此暫無ＡＰＩ可串
      //- el-tab-pane(v-if="buttonPerms.groupLog", label="修改记录", name="updateLog")
      el-tab-pane(v-if="buttonPerms.addUser", label="新增成员", name="addUser")
      keep-alive
        component(:is="workspace", :fieldPerms="fieldPerms", :buttonPerms="buttonPerms", :blockPerms="blockPerms")

</template>

<script>
  import detail from './detail.vue';
  import permission from './permission.vue';
  import field from './field.vue';
  // import updateLog from './updateLog.vue';
  import addUser from './addUser.vue';

  export default {
    components: {
      detail,
      permission,
      field,
      // updateLog,
      addUser
    },
    data() {
      return {
        workspace: 'detail',
      }
    },
    props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
    created() {
      if (! this.$route.query.id) {
        this.$store.dispatch('menu/removeTab', this.$route.fullPath);
        this.$message.error('无此群组！');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
