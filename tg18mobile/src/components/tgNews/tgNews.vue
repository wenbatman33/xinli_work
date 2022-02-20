<template lang='pug'>
	section
		.bulletin
			.bulletintab
				ul
					li
						button(@click='FilterGroupId("")' :class='[(activeID === "") ?"bulletintab_active" : ""]')
							span 全部
					li(v-for="(item, key) in getNewsGroup")
						button(@click='FilterGroupId(item.GroupId)' :class='[(key === activeID) ?"bulletintab_active" : ""]')
							span {{item.GroupName}}
			.bulletinlist(v-if="getNewsList.length > 0")
				ul
					li(v-for="item in getNewsList")
						.bulletinlist_caption {{ item.NewsName }}
						.bulletinlist_content {{ summary(RemoveHTML(item.Content)) }}
						.bulletinlist_date {{ formatDate(item.Update_At) }}
						form
							.bulletin_btn(@click='ShowDialog(item.Content,item.NewsName, item.Sn ,item.Update_At)') 详细说明
			tgNoResult.tgError(v-else)
			el-dialog.bulletinMessage(:title='dialogTitle', :visible.sync='dialogShow', width='90%')
				h1 {{ dialogTitle }}
				h2 {{ dialogTime }}
				.dialogMessage(v-html='$options.filters.unescape(dialogMessage)')
				el-button(type='primary', @click='dialogShow = false') 确 定
</template>
<script>
import tgNoResult from '@/components/tgError/tgNoResult.vue';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    tgNoResult,
  },
  data() {
    return {
      activeID: '',
      dialogTitle: '',
      dialogMessage: '',
      dialogTime: '',
      dialogShow: false,
    };
  },
  methods: {
    RemoveHTML(str) {
      const regEx = /<[^>]*>/g;
      return str.replace(regEx, '');
    },
    FilterGroupId(id) {
      this.activeID = id;
      if (id === 0) {
        this.FilterNewsList('');
      } else {
        this.FilterNewsList(id);
      }			
    },
    FilterNewsList(GroupId = '') {
      const payload = {};
      payload.GroupId = GroupId;
      payload.NowTime = 1;
      this.$store.dispatch('news/NewsList', payload);
    },
    ShowDialog(html, title, Sn, Update_At) {
      const currentTime = new Date();
      window.localStorage.setItem(`tgNewsTime_${this.UserId}`, currentTime);
      this.$store.dispatch('news/CheckLastNewsTime', currentTime);
      this.dialogMessage = html;
      this.dialogTitle = title;
      this.dialogTime = Update_At;
      this.dialogShow = !this.dialogShow;
    },
    formatDate(value) {
      return moment(value).format('YYYY/MM/DD'); 
    },
    summary(value) {
      if (value.length > 41) {
        return `${value.slice(0, 41)}...`;
      }
      return value;
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
    ...mapState('news', [
      'newsNotify',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberInboxList',
      'MemberLogined',
      'MemberWallet',
    ]),
    getNewsList() {
      return this.$store.state.news.newsList;
    },
    getNewsGroup() {
      return this.$store.state.news.newsGroup;
    },
  },
  mounted() {
    // console.log(this.activeID)
  },
};
</script>
<style lang="scss" scoped>
	.tgError {
		float: left;
		width: 100%;
		min-height: 52vh;
		margin: 30px 0;
	}
	.dialogMessage{
		text-align: left;
		padding: 5vw 5vw 10vw;
	}
</style>
<style lang="scss">
	.dialogMessage{
		// table{
		// 	max-width: 100% !important;
		// }
		table,tr ,td{
			border: inset;
		}
	}
	.bulletinMessage {
		.el-dialog {
			float: left;
			margin: 5vw !important;
			border-radius: 0 !important;
			box-shadow: 0 !important;
		}
		.el-dialog__header {
			padding: 0;
		}
		.el-dialog__body {
			width: 100%;
			text-align: center;
			img {
				max-width: 100% !important;
			}
		}
		.el-dialog__title {
			display: none;
		}
		.el-dialog__headerbtn {
			display: block;
			float: right;
			width: 48px;
			height: 48px;
			background: url("/static/img/close.png") 0 0 no-repeat;
			background-size: contain;
			top: 3vw;
			right: 3vw;
		}
		.el-dialog__close {
			display: none;
		}
		.el-dialog__body {
			float: left;
			padding: 0;
		}
		.el-button {
			margin-bottom: 5vw;
		}
		h1 {
			padding: 10vw 5vw 5vw;
			font-size: 36px;
		}
		h2 {
			font-size: 26px;
		}
		.dialogMessage {
			font-size: 30px;
		}
	}
	/*-- Mobile --*/
	@media screen and (max-width: 750px) {
		.bulletinMessage {
			.el-dialog__headerbtn {
				width: 6.4vw;
				height: 6.4vw;
			}
			h1 {
				font-size: 4.8vw;
			}
			h2 {
				font-size: 3.47vw;
			}
			.dialogMessage {
				font-size: 4vw;
			}
		}
	}
</style>
