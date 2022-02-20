<template lang='pug'>
  .container-fluid.slotGamesContainer
    .container
      .row
        .slotPromotion
            .el-row
              .el-col.el-col-24 
                h2 {{ promotionData.name }}
                p(v-html="promotionData.html")
</template>
<script>
import _ from 'lodash';
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      promotionData: {},
    };
  },
  methods: {},
  computed: {
    getUrlID() {
      return this.$route.params.id;
    },
  },
  mounted() {
    const vm = this;
    axios.get(`http://localhost:3000/promotion/${this.$route.params.id}`)
      .then((response) => {
        console.log(response);
        vm.promotionData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang="scss" scoped>
  .slotPromotion{
    padding: 20px 0;
    min-height:400px;
  }
</style>
