<template lang="pug">
  .d-flex.justify-content-between
    .header-left.d-inline-flex.pl-3
      blBreadcrumb
    .header-right
      headerSearch
      i.header-right-item(:class="isRefresh ? 'el-icon-loading' : 'el-icon-refresh'", @click="refresh")
      i.header-right-item.el-icon-full-screen(@click="screenfull")
      i.header-right-item.el-icon-time(v-if="hasLog", @click="logDrawerVisible = true")
      el-dropdown.header-right-item(trigger="click", @command="handleCommand")
        span.d-block {{ userEmail }}
          i.el-icon-arrow-down.el-icon--right
        el-dropdown-menu
          el-dropdown-item(icon="el-icon-edit", command="editPassword") 修改密码
          el-dropdown-item(icon="el-icon-delete", command="clearAllTabs") 清除所有Tab
          el-dropdown-item(icon="el-icon-eleme", command="logout", divided) logout
    //- 修改记录 drawer
    el-drawer(
      title="修改记录",
      :visible.sync="logDrawerVisible",
      :destroyOnClose="true",
      direction="rtl",
      size="60%"
    )
      UpdateLog
    //- 修改密碼
    el-dialog(
      v-if="editPasswordDialogVisible"
      :visible.sync="editPasswordDialogVisible",
      :show-close="false",
      :lock-scroll="true",
      width="30%"
    )
      editPassword(@close="editPasswordDialogVisible = false", @success="editPasswordSuccess()")
</template>

<script>
import blBreadcrumb from '@/components/blBreadcrumb';
import UpdateLog from '@/components/UpdateLog';
import screenfull from 'screenfull';
import editPassword from './editPassword.vue';
import headerSearch from './headerSearch.vue';

export default {
  components: {
    blBreadcrumb,
    UpdateLog,
    editPassword,
    headerSearch
  },
  data() {
    return {
      isRefresh: false,
      logDrawerVisible: false,
      editPasswordDialogVisible: false,
    };
  },
  computed: {
    userEmail() {
      return window.localStorage.userEmail
    },
    hasLog() {
      return this.$store.state.common.hasLog;
    }
  },
  methods: {
    screenfull() {
      if (! screenfull.enabled) {
        return this.$message({
          message: '您的浏览器不支援全萤幕',
          type: 'warning'
        })
      }

      screenfull.toggle();
    },
    refresh() {
      this.isRefresh = true;
      this.$store.dispatch('menu/refreshTab');

      setTimeout(function() {
        this.isRefresh = false;
      }.bind(this), 400)
    },
    handleCommand(command) {
      this[command]();
    },
    async logout() {
      await this.$store.dispatch('auth/logout');
      await this.$store.dispatch('menu/removeAllTab');
      this.$router.push('login');
    },
    editPassword() {
      this.editPasswordDialogVisible = true;
    },
    editPasswordSuccess() {
      this.editPasswordDialogVisible = false;
      this.$nextTick(() => {
        this.$swal('密码修改成功!', '请重新登入', 'success').then(() => {
          this.logout();
        });
      });
    },
    clearAllTabs() {
      this.$store.dispatch('menu/removeAllTab');
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.header-right {
  line-height: 50px;
  cursor: pointer;
  .header-right-item {
    display: inline-block;
    padding: 0 8px;
    font-size: 18px;
    color: #5a5e66;
  }
}
</style>
