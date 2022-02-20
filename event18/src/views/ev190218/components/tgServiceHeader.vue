<template lang="pug">
  header
    .container-fluid
      .top.row.no-gutters.d-flex.justify-content-between
        .col-md-10.col-12.offset-md-1
          .row.no-gutters.px-1.py-3
      .nav.row.no-gutters.d-flex.justify-content-between
        .col-md-10.col-12.offset-md-1
          .row.no-gutters.px-1.py-1
            .col-md-6.col-4.text-left
                a(:href='siteHost')
                  img.logo(src='/static/img/logo.svg')
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
    };
  },
  components: {
  },
  computed: {
    ...mapState('index', [
      'siteHost',
    ]),
  },
  methods: {
  },
  created() {
  },
  mounted() {
  },
};
</script>
<style scoped lang="scss">
/*-- Header --*/

header {
  width: 100%;
  height: auto;
  box-shadow: 0 1px 16px 0 rgba(0,0,0,0.4);
  position: relative;
  z-index: 10;
  .top {
    width: 100%;
    background: rgba(250,219,20,1);
    color: rgba(38,38,38,1);
    font-size: 12px;
  };
}
</style>
