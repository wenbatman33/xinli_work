<template lang='pug'>
.pageContent.page
  .p-3
    .container
      .row.no-gutters
        .col-12.text-left.text-sm-left.my-3
          router-link(to='/news')
            h5 
              .i.fas.fa-angle-left.mr-2
              | 公告列表
      .row(v-if='CurrentNews.length>0')
        .col-12.my-2
          .promotionItem
            h5.T_Color_2.my-3.px-2 {{CurrentNews[0].newsTitle}}
            p.fs12.Gray_c7.my-3.px-2 {{CurrentNews[0].newsCreatedAt}}
            p.fs14.my-3.px-2 {{CurrentNews[0].newsContent}}
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {},
  computed: {
    ...mapState('setting', ['DeviceIsPc']),
    ...mapState('index', ['CurrentNews']),
  },
  data() {
    return {
    };
  },
  methods: {
    
  },
  mounted() {
    this.$store.dispatch('index/getCurrentNews', this.$route.query.id)
      .then((res) => {
        if (res.data.data.length <= 0) {
          this.$router.push('/news');
        }
      })
      .catch((error) => {
        this.$router.push('/news');
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

</style>
