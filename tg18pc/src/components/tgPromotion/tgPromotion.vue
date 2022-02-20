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
              div(v-for="item in getPromotionsGroup")
                button.btn.m-1(@click='FilterGroupId(item.GroupId)' :class='[(item.GroupId === activeID) ?"btn-tgBlueDark" :  "btn-outline-tgBlueDark"  ]')
                  span {{item.GroupName}}
      .row.justify-content-center
        .col-12.mt-5.mb-5(v-for="item in getPromotionsList")
          .d-flex.justify-content-center.align-items-center
            .bg
            .promotionCard
              .row.no-gutters
                .col-6
                  .imgBg(:style="{ backgroundImage: 'url(' + item.Images + ')',backgroundSize:'cover', backgroundPosition: 'top center' }")
                .col-6.p-3.d-flex.flex-column
                  h3.title {{ item.PromotionsName }}
                  p.mt-4 {{ substrContent(item.Content) }}
                  // div(v-html='$options.filters.Unescape(item.LinkContent)')
                  div.text-right
                    .promotionBtn(v-if='item.LinkMethod == 1' )
                      .btn.btn-primary(@click='ShowDialog(item.LinkContent, item.PromotionsName,item.Sn)') 详细说明
                    .promotionBtn(v-if='item.LinkMethod == 2')
                      a(:href='item.LinkContent' target='_blank' @click='GA_event_decribe(item.Sn)')
                        .btn.btn-primary 详细说明
                    .promotionBtn(v-if='item.LinkMethod == 3')
                      .btn.btn-primary(@click='gotoPromotionsDetail(item.Sn)') 详细说明
      el-dialog(:title='dialogTitle', :visible.sync='promotionDialogShow', width='50%')
        .dialogMessage(v-html='$options.filters.unescape(dialogMessage)')
</template>
<script>
import router from '@/router/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      activeID: '',
      dialogTitle: '',
      dialogMessage: '',
      promotionDialogShow: false,
    };
  },
  methods: {
    FilterGroupId(id) {
      this.activeID = id;
      this.FilterPromotionsList(id);
    },
    FilterPromotionsList(GroupId = '') {
      const payload = {};
      payload.GroupId = GroupId;
      payload.Status = 1;
      payload.NowTime = 1;
      this.$store.dispatch('promotion/PromotionsList', payload);
    },
    substrContent(str) {
      return `${str.substr(0, 100)}...`;
    },
    ShowDialog(html, title, Sn) {
      this.dialogMessage = html;
      this.dialogTitle = title;
      this.promotionDialogShow = !this.promotionDialogShow;
      this.GA_event_decribe(Sn);
    },
    gotoPromotionsDetail(Sn) {
      this.GA_event_decribe(Sn);
      router.push({ path: `/promotionDetail/${Sn}` });
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
    getPromotionsList() {
      return this.$store.state.promotion.promotionsList;
    },
    getPromotionsGroup() {
      return this.$store.state.promotion.promotionsGroup;
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
  .promotionBtn{
    margin-top: 40px;
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
      font-size: 26px!important;
      font-weight: 500!important;
      font-style: normal!important;
      font-stretch: normal!important;
      line-height: 1.31!important;
      letter-spacing: normal!important;
      overflow : hidden!important;
      text-overflow : ellipsis!important;
      white-space : nowrap!important;
      color: #262626!important;
    }
    p{
      line-height: 1.5;
    }
    .des{
      overflow: hidden!important;
      display: -webkit-box!important;
      -webkit-box-orient: vertical!important;
      -webkit-line-clamp: 2!important;
    }
  }
  .dialogMessage{
    height: 400px;
    margin: 10px 0;
    overflow: auto;
  }
</style>
