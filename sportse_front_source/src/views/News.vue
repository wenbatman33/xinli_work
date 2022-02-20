<template lang='pug'>
.pageContent.page
  .p-3
    .row.no-gutters
      .col-12.text-center.text-sm-left.my-3
        h5 
          .i.fas.fa-volume-up.mr-2
          | 網站公告
    .row
      .col-12.col-sm-6.col-md-4.col-lg-3.my-2(v-for='(item, index) in NewsList')
        .newsItem.p-3(@click='gotonewsdetail(item.id)')
          p.fs12.my-3.px-2.Gray_c7 {{item.newsCreatedAt}}
          h5.my-3.px-2.T_Color_2 {{item.newsTitle}}
          p.fs13.my-3.px-2 {{item.newsContent}}
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {},
  computed: {
    ...mapState('setting', ['DeviceIsPc']),
    ...mapState('index', ['NewsList']),
    
  },
  data() {
    return {
    };
  },
  methods: {
    gotonewsdetail(id) {
      this.$router.push(`/newsdetail?id=${id}`);
    },
  },
  mounted() {},
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
.newsItem{
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgba(150, 150, 150, 0.5);
  background-color: #ffffff;
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
