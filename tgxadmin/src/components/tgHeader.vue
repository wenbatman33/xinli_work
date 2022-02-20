<template lang="pug">
  el-container
    el-header.row.no-gutters
      .col
        el-button.header-button-style(icon='el-icon-menu', size='', type='text', circle='', @click="switch_menu()")
        el-dropdown.text-style.header-dropdown(trigger='click')
          span.el-dropdown-link
            | {{this.$store.state.member.user_info.admin_username}}
            i.ml-2.el-icon-arrow-down.el-icon--right
          el-dropdown-menu(slot='dropdown')
            el-dropdown-item(@click.native='handleClickSignOut') 登出帳號
        el-badge.text-style.badge-style.mr-5(:value='pending_num', :max='99')
          router-link(:to="{name:'tgEventList'}")
            el-button.header-button-style(icon='el-icon-bell', size=' ', type='text', circle='')
</template>
<script>
export default {
  mounted() {
    this.init();
  },
  data() {
    return {
      pending_num: 0
    };
  },
  watch: {
    $route: function(newValue, oldValue) {
      this.init();
    }
  },
  methods: {
    init() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserEventList",
        data: {
          Status: 0
        }
      })
        .then(function(response) {
          self.pending_num = response.data.data.total_rows;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    handleClickSignOut() {
      let self = this;
      this.$gAuth.signOut(function() {
        self.$store.dispatch("member/MemberLogout", self.memberData);
      });
    },
    switch_menu() {
      let self = this;
      self.$store.commit("switch_menu", !self.$store.state.hide_menu);
    }
  }
};
</script>