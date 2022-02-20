<template lang='pug'>
  .container-fluid.tgPromotion
    .container.mt-5.mb-5
      .row.mt-5.mb-5
        .col-12
          .d-flex.justify-content-center.align-items-center
            .PromotionsList.d-flex.align-items-center
              div
                button.btn.m-1(@click='FilterGroupId("")'   :class='[(activeID == "") ? "btn-tgBlueDark" :  "btn-outline-tgBlueDark"  ]')
                  span 全部
              div(v-for="item in getNewsGroup")
                button.btn.m-1(@click='FilterGroupId(item.GroupId)' :class='[(item.GroupId === activeID) ?"btn-tgBlueDark" :  "btn-outline-tgBlueDark"  ]')
                  span {{item.GroupName}}
      .row.justify-content-center
        .col-12.mt-5.mb-5(v-for="item in getNewsList")
          .d-flex.justify-content-center.align-items-center
            .bg
            .promotionCard
              .row.no-gutters
                .col-12.p-5.d-flex.flex-column
                  h3 {{ item.NewsName }}
                  p.mt-2 {{ removeHtmlTag(item.Content) }}
                  p.mt-2
                    small {{ item.Update_At }}
                  div.infoBtn.text-right
                    .btn.btn-primary(@click='ShowDialog(item.Content,item.NewsName, item.Sn ,item.Update_At)') 详细说明
      el-dialog(:title='dialogTitle', :visible.sync='newsDialogShow', width='50%')
        .dialogMessage(v-html='$options.filters.unescape(dialogMessage)')
        p {{dialogTime}}
</template>
<script>
import _ from 'lodash';
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      activeID: '',
      dialogTitle: '',
      dialogMessage: '',
      dialogTime: '',
      newsDialogShow: false,
    };
  },
  methods: {
    FilterGroupId(id) {
      this.activeID = id;
      this.FilterNewsList(id);
    },
    FilterNewsList(GroupId = '') {
      const payload = {};
      payload.GroupId = GroupId;
      payload.NowTime = 1;
      this.$store.dispatch('news/NewsList', payload);
    },
    removeHtmlTag(str) {
      let content = str.replace(/<(?:.|\n)*?>/gm, '');
      content = `${content.substr(0, 120)}...`;
      return content;
    },
    substrContent(str) {
      return `${str.substr(0, 120)}...`;
    },
    ShowDialog(html, title, Sn, Update_At) {
      const currentTime = new Date();
      window.localStorage.setItem(`tgNewsTime_${this.UserId}`, currentTime);
      this.$store.dispatch('news/CheckLastNewsTime', currentTime);
      this.dialogMessage = html;
      this.dialogTitle = title;
      this.dialogTime = Update_At;
      this.newsDialogShow = !this.newsDialogShow;
    },
  },
  filters: {
    unescape(html) {
      return html
        .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    },
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
      'MemberData',
    ]),
    getNewsList() {
      return this.$store.state.news.newsList;
    },
    getNewsGroup() {
      return this.$store.state.news.newsGroup;
    },
  },
};
</script>
<style lang="scss" scoped>
  .tgPromotion{
    min-height: 600px;
  }
  .slotPromotion{
    padding: 20px 0;
    min-height:400px;
  }
  .bg{
    position: absolute;
    width: 780px;
    height: 280px;
    top: -20px;
    border-radius: 4px;
    margin-left: 150px;
    background-image: linear-gradient(to bottom, #002766, #001332);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    z-index:1;
  }
  .PromotionsList{
    width:880px;
  }
  .promotionCard{
    position: relative;
    width:880px;
    height:240px;
    overflow:hidden;
    z-index:2;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    .imgBg{
      height:240px;
    }
    h3{
      font-size: 26px !important;
      font-weight: 500 !important;
      font-style: normal !important;
      font-stretch: normal !important;
      line-height: 1.31 !important;
      letter-spacing: normal !important;
      color: #262626 !important;
    }
    p{
      line-height: 1.5;
    }
    .des{
      overflow: hidden !important;
      display: -webkit-box !important;
      -webkit-box-orient: vertical!important;
      -webkit-line-clamp: 2 !important;
    }
  }
  .dialogMessage{
    min-height: 250px;
    margin: 10px 0;
  }
  .infoBtn{
    position: absolute;
    right: 30px;
    top: 180px
  }

</style>
<style lang="scss">
.dialogMessage{
  min-height: 250px;
  margin: 10px 0;
  img{
    max-width: 100% !important;
  }
  table,tr ,td{
    border: inset;
  }
}
</style>

