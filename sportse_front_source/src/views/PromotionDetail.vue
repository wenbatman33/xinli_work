<template lang='pug'>
.pageContent.page
  .p-3
    .container
      .row.no-gutters
        .col-12.text-left.text-sm-left.my-3
          router-link(to='/promotion')
            h5 
              .i.fas.fa-angle-left.mr-2
              | 回優惠列表
      .row(v-if='CurrentBanner.length>0')
        .col-12.my-2
          .promotionItem
            img(:src='CurrentBanner[0].bannerImages' width='100%')
            h5.my-3.px-2 {{CurrentBanner[0].bannerTitle}}
            p.fs13.Gray_c7.text-center.my-3.px-2 {{CurrentBanner[0].bannerSubtitle}}
            #promotionContent.fs13.my-3.px-2(v-html='CurrentBanner[0].bannerContent')
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {},
  computed: {
    ...mapState('setting', ['DeviceIsPc']),
    ...mapState('index', ['CurrentBanner']),
  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    this.$store.dispatch('index/getCurrentBanner', this.$route.query.id)
      .then((res) => {
        if (res.data.data.length <= 0) {
          this.$router.push('/promotion');
        }
      })
      .catch((error) => {
        this.$router.push('/promotion');
      });
  },
};
</script>
<style lang='scss' scoped>
.page{
  background: $gray_f5;
}
.gameList{
  .title{
    border-left: 8px solid #000 ;
    .moreLink{
      cursor: pointer;
      color: $Color_2;
    }
  }
}
.promotionItem{
  border-radius: 12px;

  overflow: hidden;
  .gameInfo{
    font-size: 12px;
    .gameName, .divider{
      color:#fff;
    }
    .moreInfo{
      cursor: pointer;
      color:#fff;
    }
  }
}

.teamName{
  color: #fff;
  overflow : hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.teamScore{
  color: #fff;
}
.gameBetBTN{
  cursor: pointer;
  margin: 0px 4px;
  padding: 0 4px;
  color: #fff;
  line-height: 24px;
  text-align: center;
  border-radius: 12px;
  font-size: 12px;
  border: solid 1px #ffffff;
  background-color: rgba(2, 119, 189, 0.15);
  &:hover{
    background-color: rgba(2, 119, 189, 0.5);
  }
  .odds{
    color: $Color_1;
  }
}
.rounddDropdown{
  border-radius: 24px;
  overflow: hidden;
}
.seriesGameName{
  border-left: 8px solid $Color_2 ;
  padding-left: 10px;
  .moreLink{
    cursor: pointer;
    color: $Color_2;
  }
}
.Amount{
  color: white;
  height: 42px;
  line-height: 42px;
  background: $Color_1;
  border-radius: 4px;
}

#promotionContent{
  table,tr,td{
    border: 1px solid #333333;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
  }
}
</style>
<style lang='scss'>
#promotionContent{
  table,tr,td{
    border: 1px solid #333333;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
  }
  a{
    text-decoration: underline;
  }
  img{
    max-width: 100%;
    height: auto;
  }
}
</style>
