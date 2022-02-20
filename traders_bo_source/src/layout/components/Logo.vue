<template>
  <div
    class="sidebar-logo-container text-left"
  >
    <transition name="sidebarLogoFade">
      <router-link
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="logo"
          :src="logo"
          class="sidebar-logo"
        >
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
    <div class="right-menu">
      <el-dropdown class="text-white pr-3 pt-1" trigger="click">
        <div>
          {{ name }}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown ">
          <router-link to="/password">
            <el-dropdown-item>
              修改密碼
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  data() {
    return {
      title: this.$store.state.settings.title,
      logo: (this.$store.state.settings.logo) ? window.location.href.replace(this.$route.fullPath, '') + '/' + this.$store.state.settings.logo : '',
      name: this.$store.getters.name
    }
  }, methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      await this.$store.dispatch('permission/resetRoutes')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      vertical-align: middle;
    }
  }

    .right-menu {
    float: right;
    height: 100%;
    line-height: 40px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

  }

}
</style>
