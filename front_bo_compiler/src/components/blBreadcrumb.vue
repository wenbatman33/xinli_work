<template lang="pug">
  el-breadcrumb(separator='/')
    transition-group(name="breadcrumb")
      el-breadcrumb-item(
        v-for="(breadcrumb, index) in breadcrumbList",
        :key="breadcrumb.title",
        :to="breadcrumbList.length - 1 === index ? '' : breadcrumb.path"
      ) {{ breadcrumb.title }}
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';

export default {
  data() {
    return {
      breadcrumbList: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.path === '/dashboard') {
          this.breadcrumbList = [{ title: '首页' }];
        } else {
          const breadcrumbList = cloneDeep(this.$store.getters['menu/getAllPath'](this.$route.params.pathMatch));

          if (this.$route.query && this.$route.query.title && breadcrumbList) {
            breadcrumbList[breadcrumbList.length - 1].title = this.$route.query.title;
          }

          if (this.$route.query && this.$route.query.parent) {
            const parent = JSON.parse(this.$route.query.parent);
            breadcrumbList[breadcrumbList.length - 2].title = parent.title;
            breadcrumbList[breadcrumbList.length - 2].path = parent.path;
          }

          this.breadcrumbList = breadcrumbList;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  display: inline-block;
  line-height: 50px;
  margin-left: 8px;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
