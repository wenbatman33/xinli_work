<template lang="pug">
.page
  .headBg
  .p-3.h-100.d-flex.flex-column
    //- 標题
    h2.text-white.mt-3
      .icon(:style="`background-image: url(${soundIcon})`")
      span.ml-2 {{ $t('announcement.name') }}
    //- 狀態card
    .row.no-gutters.my-4
      .btn.btn-lg.btn-light.mr-2.position-relative(
        @click="clickHandle(0)"
        :class="{ active: selectBtnNum === 0 }"
      )
        span.mr-2
          img(:src="img_letter")
        span {{ $t('announcement.inbox.name') }}
        .dot(v-show="hasUnread")
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(1)", :class="{ active: selectBtnNum === 1 }")
        span.mr-2
          img(:src="img_notification")
        span {{ $t('announcement.announcement.name') }}
    //- 公告表格
    .table3V3Wrap.overflow-auto(style="height: calc(100vh - 250px)")
      table.table3V3(v-if="selectBtnNum === 1")
        thead
          tr
            th.text-center(width="10%")
            th.text-center(width="25%") {{ $t('announcement.announcement.date') }}
            th(width="55%") {{ $t('announcement.announcement.content') }}
            th.text-center(width="10%")
        tbody(v-if="tableData.length")
          template(v-for="item in tableData")
            tr(
               @click="item.Collapse = !item.Collapse"
            )
              td.text-center(
                style="color: red; font-weight: bold;"
              ) {{ item.is_top === 1 ? $t('announcement.announcement.top') : '' }}
              td.text-center {{ (item.sent_at || item.online_begin) | toDateTime }}
              td {{item.title}}
              td.text-center(align="center")
                p.collapseLink
                  span {{ item.Collapse ? $t('announcement.close') : $t('announcement.open') }}
                    img.ml-2(v-if="item.Collapse" :src="img_chevron_up_light")
                    img.ml-2(v-else :src="img_chevron_right_down")
            tr.collapseContent(v-if='item.Collapse')
              td(colspan="4" v-html="item.content")
        tbody(v-else)
          tr
            td
            td {{ $t('announcement.announcement.nodata') }}
            td
      //- 站內信
      table.table3V3(v-else)
        thead
          tr
            th.text-center(width="20%") {{ $t('announcement.inbox.date') }}
            th(width="70%") {{ $t('announcement.inbox.content') }}
            th.text-center(width="10%")
        tbody(v-if="inboxList.length")
          template(v-for="item in inboxList")
            tr(
              :class="item.status === 2 ? 'font-weight-bold' : ''"
               @click="read(item);"
            )
              td.text-center {{ (item.sent_at || item.created_at) | toDateTime }}
              td {{item.title}}
              td.text-center(align="center")
                p.collapseLink
                  span {{ checkCollapse(item.id) ? $t('announcement.close') : $t('announcement.open') }}
                    img.ml-2(v-if="checkCollapse(item.id)" :src="img_chevron_up_light")
                    img.ml-2(v-else :src="img_chevron_right_down")
            tr.collapseContent(v-if='checkCollapse(item.id)')
              td(colspan="3" v-html="item.content")
        tbody(v-else)
          tr
            td
            td {{ $t('announcement.inbox.nodata') }}
            td
</template>

<script>
export default {
  name: 'announcement',
  components: {},
  data() {
    return {
      soundIcon: `${process.env.VUE_APP_STATIC}/img/sound-white.svg`,
      img_letter: `${process.env.VUE_APP_STATIC}/img/letter.svg`,
      img_notification: `${process.env.VUE_APP_STATIC}/img/notification.svg`,
      img_chevron_up_light: `${process.env.VUE_APP_STATIC}/img/chevron-up-light.svg`,
      img_chevron_right_down: `${process.env.VUE_APP_STATIC}/img/chevron-right-down.svg`,
      selectBtnNum: 1,
      imgUrl: `${process.env.VUE_APP_STATIC}/img/pic-transaction.png`,
      tableData: [],
      activeInbox: [],
    };
  },
  computed: {
    inboxList() {
      return this.$store.state.notice.inbox;
    },
    hasUnread() {
      return this.$store.state.notice.inbox.findIndex((item) => item.status === 2) > -1;
    },
  },
  created() {
    this.getNotice(this.$route.query.id);
  },
  methods: {
    async clickHandle(num) {
      await this[['getInbox', 'getNotice'][num]]();
      this.selectBtnNum = num;
    },

    // 個人訊息(站內信)
    async getInbox() {
      if (window.localStorage.getItem('token')) {
        await this.$store.dispatch('notice/fetchInbox');
      } else {
        this.$store.dispatch('admin/setLoginModal', true);
      }
    },

    // 站內信 - 已讀(未讀加粗體)
    read(inbox) {
      if (this.activeInbox.includes(inbox.id)) {
        this.activeInbox.splice(this.activeInbox.findIndex((item) => item === inbox.id), 1);
      } else {
        this.activeInbox.push(inbox.id);
      }
      if (inbox.status === 2) {
        const targetInbox = inbox;
        this.$store.dispatch('notice/editInbox', {
          id_arr: [targetInbox.id],
        }).then(() => {
          this.getInbox();
        });
      }
    },

    checkCollapse(id) {
      return this.activeInbox.includes(id);
    },

    // 网站公告
    getNotice(id) {
      this.$store.dispatch('notice/fetchNotices').then((res) => {
        this.tableData = res.data.data.list.map((item) => {
          this.$set(item, 'Collapse', item.id === Number(id));
          return item;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.active{
  color: #ffffff;
  border-color: #f76b1c !important;
  background: #f76b1c !important;
  span{
    color: #ffffff;
  }
  img{
    filter:invert(100%);
  }
}

.collapseLink{
  cursor: pointer;
  font-size: 14px;
  color: #f76b1c;
  margin: 0;
}
.collapseContent{
  width: 100%;
  color: #8e8e93;
  background-color: #e1e2e3;
  box-shadow: inset 0 -1px 0 0 #ebeef5;
}

.icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  background-size: cover;
  vertical-align: bottom;
}

.dot {
  width: 8px;
  height: 8px;
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 50%;
  background-color: red;
}
</style>
