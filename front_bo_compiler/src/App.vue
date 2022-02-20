<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  input, button, select, optgroup, textarea {
    line-height: normal; // bootstrap4 - inherit
  }

  .el-input .el-input__count .el-input__count-inner {
    background: transparent;
  }
}
</style>

