<template lang='pug'>
.faq_content
	h1 关于18老虎城
	p 18老虎城是新利18Luck的系列网站，并且是最具规模且成长最快的在线游戏网站，我们不但提供专业的赌场老虎机游戏，同时也持续努力开发新游戏，期望提供高质量的线上娱乐项目，让玩家拥有最新颖、最精彩的游戏体验。
	p 游戏种类繁多，支援快速存取款
	p 我们各大老虎机主流平台商合作，提供现今最受欢迎的游戏方式。专业且便利的多管道快速支付，奠定我们高品质线上服务，让您轻松享乐无负担。
	p 诚信运营，菲律宾政府颁发合法博彩牌照
	p 18老虎城 拥有菲律宾合法执照，该执照是由菲律宾政府博彩委员会 PAGCOR (Philippine Amusement and Gaming Corporation) 颁发，选择我们, 您将拥有可靠的资金和优质的服务。
	p 同时18老虎城 还拥有由 iTech Labs 出具的随机数发生器认证，证明用于 CTXM 博彩系统的随机数发生器严格遵从相关标准（随机发生器根据奥尔德尼岛博彩管理委员会和马恩岛标准进行测试）。
	p 即时专业服务，全年无休
	p 对于玩家，我们致力于建立一个友善与互信的环境，不管玩家何时何地有任何问题，都可以透过我们客服部门 24 小时即时在线服务询问，我们将以最快的方式来回答与解决您的疑惑。
	p 请不要犹豫，您可以于任何时间透过以下管道联系我们：
	p 点击页面中 
		a(@click='GA_home_servicemobile(MemberLogined)') 在线客服
	p 信息把关，安全有保障
	p 所有用户提供的个人信息，其传送都将通过安全端口 (SSL 128 bit encryption Standard) 并存放在公众无法进入的保密环境之下。此外所有数据的内部出入都将受到限制及严密的监控。
	p 18老虎城不遗余力建立一个资讯安全的环境，保障玩家在18老虎城 的博彩体验安全无忧。
	p
		img(src="static/img/logo_itechLabs.png")
		| 此证书由 iTech Labs 出具, 证明用于 CTXM 博彩系统的随机数发生器严格遵从相关标准*。
	p * 随机发生器根据奥尔德尼岛博彩管理委员会和马恩岛标准进行测试。
</template>
<script>
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    getMemberLogined() {
      return this.$store.state.member.MemberLogined;
    },
    ...mapState('member', [
      'MemberLogined',
    ]),
  },
};
</script>
<style lang="scss">
	
</style>
<style lang="scss" scoped>
	
</style>
