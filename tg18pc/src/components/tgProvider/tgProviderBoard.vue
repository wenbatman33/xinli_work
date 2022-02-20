<template lang='pug'>
  .Provider
    .row
      .col-4.providerItem.my-3(v-for="item in boardProvider",v-if='item.Status!=0')
        router-link(:to='"/board?game="+item.GroupName', v-on:click.native='GA_home_platform(item.GroupId)')
          .d-flex
            .providerImage.text-center.mx-2(:style='{background:item.ColorCode}')
              img(:src='item.Images')
            .providerName.text-center {{item.CompanyName}} 
</template>
<script>
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('index', [
      'boardProvider',
    ]),
    getSlotList() {
      let str = '';
      this.boardProvider.forEach((obj) => {
        str += `${obj.GroupName} `;
      });
      return str;
    },
  },
};
</script>
<style lang="scss" scoped>
.Provider{
  width: 400px;
}
.providerItem{
  a:hover{
    text-decoration: none;
  }
  &:hover{
    .providerName{
      text-decoration: underline;
    }
  }
}
.providerImage{
  width: 100%;
  margin-right: 0;
  border-radius: 100%;
  width: 28px;
  height: 28px;
  line-height: 28px;
  img{
    width: 28px;
    height: 28px;
  }
}
.providerName{
  line-height: 28px;
  color: #fff;
  text-decoration: none;
}
.other{
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: #fadb14;
}
</style>
