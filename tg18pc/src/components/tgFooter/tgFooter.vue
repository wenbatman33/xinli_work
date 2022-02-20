<template lang='pug'>
	.container-fluid.tgFooter
		.container
			.row
				.col-4
					.footer-title  服务承诺
					p 存款
						span.text-tgYellow {{PaymentTime.deposit_min}}
						| 分钟内到账，提款
						span.text-tgYellow {{PaymentTime.withdraw_min}}
						| 分钟内到账！
				.col-4
					.footer-title 平均存款时间
					.row
						.col-8
							.progress
								.progress-bar.bg-warning(role='progressbar',
																				:style='progressbarWidth',
																				aria-valuemin='0',
																				aria-valuemax='100')
						.col-4 {{PaymentTime.deposit_avg}}
				.col-4
					.footer-title 平均提款时间
					.row
						.col-8
							.progress
								.progress-bar.bg-warning(role='progressbar',
																				:style='progressbarWidth',
																				aria-valuemin='0',
																				aria-valuemax='100')
						.col-4 {{PaymentTime.withdraw_avg}}
			hr
			.row.mb-5
				.col-4
					.footer-title 关于我们
						.row
							.col-3
								img(src="/static/img/desktop_pagcor.png" style=" margin:15px 0px;")
							.col-9
								p 我们所提供的所有产品和服务, 是由菲律宾政府博彩委员会（PAGCOR）所授权和监管。选择我们, 您将拥有可靠的资金和优质的服务。 
				.col-4
					.footer-title 专业服务全年无休
					p 我们致力于建立一个友善与互信的环境，不管玩家何时何地有任何问题，都可以透过我们客服部门 24 小时在线服务。
					// ul.footerlinkList
					// 	li.fs2-li
					// 		img(src="/static/img/icon-apple.png")
					// 	li.fs2-li
					// 		img(src="/static/img/icon-android.png")
					// 	li.fs2-li
					// 		img(src="/static/img/icon-html-5.png")
				.col-4
					.footer-title 推荐使用的浏览器
					p 为了提供更好的用户体验, 建议您使用下列我们推荐的浏览器访问我们的网站。
						// span(@click="TOKENTIMEOUT") 。
					ul.footerlinkList
						li
							img(src="/static/img/ic_chrome.png")
						li
							img(src="/static/img/ic_firefox.png")
						li
							img(src="/static/img/ic_edge.png")
		.container-fluid.tgBottom
			.container
				.row
					.col-8
						.foot-block.d-flex.align-items-center
							router-link(to="/faq#faq1") 关于18老虎城
							span |
							router-link(to="/faq#faq2") 责任博彩
							span |
							router-link(to="/faq#faq3") 隐私政策
							span |
							router-link(to="/faq#faq4") 条款与规则
							span |
							router-link(to="/faq#faq5") 声明
							span |
							a(href='https://www.18tg.cc/') 更多VIP线路
					.col-4
						.foot-copy.d-flex.justify-content-end.align-items-center 版权所有 © 2018-2019 18老虎城
								br.clear-both
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      progressbarWidth: 'width: 0%',
    };
  },
  computed: {
    ...mapState('index', [
      'PaymentTime',
    ]),
  },
  methods: {
    TOKENTIMEOUT() {
      this.$store.dispatch('member/API_TOKENTIMEOUT');
    },
  },
  mounted() {
    const vm = this;
    setTimeout(() => {
      vm.progressbarWidth = 'width: 75%';
    }, 100);
    this.$store.dispatch('index/API_PaymentTime');
  },
};
</script>

<style lang="scss" scoped>
.tgFooter{
		padding: 30px 0 0 0;
		background-image: linear-gradient(259deg, #002766, #001332);
		box-shadow: inset 0 -1px 0 0 #262626;
		font-size: 14px;
		line-height: 1.5;
		color: #8c8c8c;
		.footer-title{
			padding: 0 0 10px 0;
			margin-bottom: 10px;
			font-size: 14px;
		}
		p{
			line-height: 2;
		}
		hr{
			border-top: 1px solid rgba(255, 255, 255, 0.12);
		}
	}
	.progress{
		height: 16px;
		background: rgba(255, 255, 255, 0.12);
	}
	.tgBottom{
		height: 50px;
		background: #000;
		line-height: 50px;
		box-shadow: inset 0 -1px 0 0 #262626;
		color: #8c8c8c;
	}
	.foot-block{
		height: 50px;
		text-align: left;
		font-family: PingFangTC;
		font-size: 12px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: 50px;
		a{
			margin: 0 6px;
			color: #8c8c8c;
		}
	}
	.foot-copy {
		text-align: right;
		height: 50px;
		font-family: PingFangTC;
		font-size: 12px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: 50px;
	}
	ul.footerlinkList{
		margin-top: 10px;
		li{
			display: inline-block;
			margin-left: 6px;
		}
	}
	.progress{
		.progress-bar{
			-webkit-transition: width 1s ease;
			transition: width 1s ease;
			animation-fill-mode: forwards;
		}
	}
	.fs2-li {
		width: 32px;
		height: 32px;
		border-radius: 100%;
		line-height: 32px;
		text-align: center;
		background-color: rgba(255,255,255,.2);
	}
	.black{
		color: #000;
	}
</style>
