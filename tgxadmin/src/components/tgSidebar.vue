<template lang="pug">
  el-aside.sidebar-style.menu-style(:class="{'menu-style-hide':hide_menu}")
    .logo-style.py-1
      router-link(:to="{name:'index'}")
        img.pl-3.pt-2(src="@/assets/img/logo.svg")
      el-button.header-button-style.sidebar-button-style(icon='el-icon-close', size='', type='text', circle='', @click="switch_menu()")
    div
      el-menu(unique-opened=true)
        el-submenu(v-for="(main_item, main_index) in auth_tree", :index='main_index', :key="main_index")
          template(slot='title')
            i.fas {{main_index}}
          div(v-for="(sub_item, sub_index) in main_item")
            template(v-if="sub_item.Path")
              a.menutext-style(:href='sub_item.Path', onClick="return false;")
                el-menu-item.menuitem-style(v-if="sub_item.Menu == 1", :index='sub_item.Path', :key="sub_item.Sn", :class="(routerName == sub_item.Path) ? 'is-active': '' ", @click="router_check(sub_item.Path) ") 
                  span {{sub_item.Name}}
            el-menu-item-group(v-else)
              template(slot='title') ∥ {{sub_index}}
              a.menutext-style(v-for="(fun_item, fun_index) in sub_item", :href='fun_item.Path', onClick="return false;")
                el-menu-item.menuitem-style(v-if="fun_item.Menu == 1", :index='fun_item.Path', :key="fun_item.Sn", :class='(routerName == fun_item.Path)? "is-active": ""', @click="router_check(fun_item.Path) ") 
                  span {{fun_item.Name}}
        div.sidebar-footer
</template>
<script>
import { mapState } from "vuex";
export default {
  mounted() {
    let self = this;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      self.$store.commit("switch_menu", true);
    }
    axios({
      method: "post",
      url: process.env.VUE_APP_APIHOST + "Admin/GetAdminMenu",
      data: {
        UserId: self.$store.state.member.user_info.admin_userid
      }
    })
      .then(function(response) {
        self.auth_tree = response.data.data;
      })
      .catch(function(error) {
        // console.log(error);
      });
  },
  computed: {
    ...mapState("common", ["routerName"]),
    ...mapState(["hide_menu"])
  },
  watch: {
    $route: function(newValue, oldValue) {
      let self = this;
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        self.$store.commit("switch_menu", true);
      }
    }
  },
  data() {
    return {
      auth_tree: []
    };
  },
  methods: {
    switch_menu() {
      let self = this;
      self.$store.commit("switch_menu", !self.$store.state.hide_menu);
    },
    router_check(goto_path) {
      if (
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
          goto_path
        )
      ) {
        window.open(goto_path, "blank");
      } else {
        this.$router.push({ path: goto_path });
      }
    }
  }
};
</script>
