<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3
      el-breadcrumb.col-12(separator-class='el-icon-arrow-right')
        el-breadcrumb-item(
          v-for="breadcrumb in breadcrumbs"
          :key="breadcrumb.Sn"
          :to="breadcrumb.Path ? { name: breadcrumb.Path.replace('/', '') } : undefined"
        ) {{ breadcrumb.Name }} 
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: []
    }
  },
  mounted: function() {
    axios.post(process.env.VUE_APP_APIHOST + "Admin/BakingBreadcrumb", {
      uri: this.$route.path
    }).then(response => {
      this.breadcrumbs = response.data.data
    })
  }
}
</script>
