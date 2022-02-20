<template lang="pug">
  .container-fluid(v-if="workspace")
    el-tabs(v-model="workspace", tab-position="right")
      el-tab-pane(v-if="buttonPerms.editUser", label="使用者资料", name="userDetail")
      el-tab-pane(v-if="buttonPerms.userLog", label="使用者操作记录", name="userLogs")
      keep-alive
        component(:is="workspace", :fieldPerms="fieldPerms", :buttonPerms="buttonPerms", :blockPerms="blockPerms")
</template>

<script>
  import userDetail from './userDetail.vue';
  import userLogs from './userLogs.vue';

  export default {
    components: {
      userDetail,
      userLogs,
    },
    data() {
      return {
        workspace: false,
      }
    },
    props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
    watch: {
      buttonPerms: {
        handler() {
          if (Object.prototype.hasOwnProperty.call(this.buttonPerms, 'editUser')) {
            this.workspace = 'userDetail';
          } else if (Object.prototype.hasOwnProperty.call(this.buttonPerms, 'userLog')) {
            this.workspace = 'userLogs';
          }
        },
        immediate: true
      }
    },
    mounted() {
      if (! this.$route.query.id) {
        this.$store.dispatch('menu/removeTab', this.$route.fullPath);
        this.$message.error('无使用者');
        return;
      }
    }
  }
</script>
