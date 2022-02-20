<template lang='pug'>
	section
		.promotions
			.promotionstab
				ul
					li
						button(@click='FilterGroupId("")' :class='[(activeID === "") ?"promotionstab_active" : ""]')
							span 全部
					li(v-for="item in getPromotionsGroup")
						button(@click='FilterGroupId(item.GroupId)' :class='[(item.GroupId === activeID) ?"promotionstab_active" : ""]')
							span {{item.GroupName}}
			.promotionslist(v-if="getPromotionsList.length > 0")
				ul
					li(v-for="item in getPromotionsList")
						.promotionslist_img
							.imgBg(:style="{ backgroundImage: 'url(' + item.Images + ')',backgroundSize:'cover', backgroundPosition: 'top center' }")
						.promotionslist_caption {{ item.PromotionsName }}
						// .promotionslist_content {{ item.Content }}
						.promotionslist_content {{ summary(item.Content) }}
							// div(v-html='$options.filters.Unescape(item.LinkContent)') 
						form(v-if='item.LinkMethod == 1')
							.promotions_btn(@click='ShowDialog(item.LinkContent, item.PromotionsName)') 详细说明
						form(v-if='item.LinkMethod == 2')
							a(:href='item.LinkContent' target='_blank')
								.promotions_btn 详细说明
						form(v-if='item.LinkMethod == 3')
							.promotions_btn(@click='sendDialogMessage(item.LinkContent,item.PromotionsName, item.Images, item.Sn)') 详细说明
			tgNoResult(v-else)

			el-dialog.promotionMessage(:title='dialogTitle', :visible.sync='dialogShow', width='90%')
				.dialogMessage(v-html='$options.filters.unescape(dialogMessage)') 
				el-button(@click='dialogShow = false') 取 消
				el-button(type='primary', @click='dialogShow = false') 确 定
</template>
<script>
import tgNoResult from '@/components/tgError/tgNoResult.vue';
import router from '@/router/router';
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
      dialogShow: false,
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
    ShowDialog(html, title) {
      this.dialogMessage = html;
      this.dialogTitle = title;
      this.dialogShow = !this.dialogShow;
    },
    sendDialogMessage(html, title, img, SN) {      
      this.$store.commit('promotion/setDialogTitle', title, { root: true });
      this.$store.commit('promotion/setDialogMessage', html, { root: true });
      this.$store.commit('promotion/setDialogIMG', img, { root: true });
      router.push({ path: `/promotionDetail/${SN}` }); 
    },
    summary(value) {
      if (value.length > 37) {
        return `${value.slice(0, 37)}...`;
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
	.tgError {
		float: left;
		width: 100%;
		min-height: 52vh;
		margin: 30px 0;
	}
	.promotionslist_img{
		.imgBg{
			display: inline-block;
			width: 100%;
			max-width: 600px;
			min-height: 350px;
			margin: 70px 0 -70px;
			background: rgba(255,255,255,1);
			border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0,0,0,0.2);
			z-index: 10;
		}
	}
	.dialogMessage{
		padding: 10vw 5vw;
		text-align: left;
		overflow: auto;
	}
	/*-- Mobile --*/
	@media screen and (max-width: 750px) {
		.promotionslist_img{
			.imgBg{
				min-height: 46.67vw;
				margin: 9.33vw 0 -9.33vw;
			}
		}
	}
</style>
<style lang="scss">
	.promotionMessage {
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
	}
	/*-- Mobile --*/
	@media screen and (max-width: 750px) {
		.promotionMessage {
			.el-dialog__headerbtn {
				width: 6.4vw;
				height: 6.4vw;
			}
		}
	}
</style>
