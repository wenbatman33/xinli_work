<template lang="pug">
  el-menu.collapseMenu(:default-active="activeMenu")
    //- Logo
    .sidebar-logo-container
      router-link.sidebar-logo-link(to="/dashboard")
        img.sidebar-logo(src="/favicon.ico")
        h1.sidebar-title {{ title }}
    //- Sidebar
    .sidebar-container
      el-submenu(v-for="(item ,key) in filterMenuTree", :index="`${item.id}`", :key="item.id")
        template(slot="title")
          i(:class="iconArray[key]")
          span(slot="title") {{ item.funcName }}
        el-menu-item-group.is-active
          el-menu-item(
            v-for="(subItem ,key) in item.subNode",
            :key="subItem.id",
            :index="subItem.path",
            :class="{ 'is-active': subItem.path === activeMenu }"
            @click="checkRouter(subItem.path)"
          ) {{ subItem.funcName }}
    //- Sidebar footer
    .sidebar-footer.text-center.bg-dark.text-light {{ version() }}
</template>

<script>
import { mapState } from 'vuex';
import { TITLE } from '@/config/server';

export default {
  data () {
    return {
      title: TITLE,
      iconArray:[
        'el-icon-location',
        'el-icon-menu',
        'el-icon-document',
        'el-icon-setting',
        'el-icon-paperclip',
        'el-icon-mobile',
        'el-icon-files',
        'el-icon-cpu',
        'el-icon-thumb',
        'el-icon-camera',
        'el-icon-brush',
        'el-icon-guide',
        'el-icon-odometer',
        'el-icon-place',
        'el-icon-c-scale-to-original',
      ]
    }
  },
  computed: {
    ...mapState('menu', [
      'menuTree',
      'activeMenu'
    ]),
    filterMenuTree() {
      return this.menuTree && this.menuTree.filter(menu => Boolean(menu.subNode.length));
    }
  },
  methods: {
    checkRouter(path) {
      if (
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?/.test(
          path
        )
      ) {
        window.open(path, 'blank');
      } else {
        if (this.$route.fullPath !== path) {
          this.$router.push({ path: path });
        }
      }
    },
    version() {
      const element = document.querySelector('meta[name="buildAt"]');

      return element && element.getAttribute('content');
    },
  }
};
</script>

<style lang="scss">
.collapseMenu {
  width: 200px;
  .el-submenu {
    width: 200px;
  }

  .sidebar-container {
    height: calc(100% - 70px);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .sidebar-footer {
    width: 200px;
    height: 20px;
    position: fixed;
    bottom: 0;
  }
}

.el-menu-item {
  a {
    color: #303133;
    text-decoration: none;
  }
}

.el-menu-item-group__title {
  padding: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #1c0e35;
  text-align: center;
  overflow: hidden;
  .sidebar-logo-link {
    display: inline-block;
    height: 100%;
    width: 100%;
    .sidebar-logo {
      margin-top: -10px;
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    .sidebar-title {
      display: inline-block;
      margin-left: 12px;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}

</style>
