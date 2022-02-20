<template lang='pug'>
.container-fluid
	tgFix
	tgSmNavi
	.content
		section
			.faq
				.faq_caption(ref='faq_caption')
					span 7 x 24 全天候客服团队时刻准备为您服务，把您的疑问都放心交给我们。
					form
						.faq_caption_btn(@click='GA_home_servicemobile(MemberLogined)') 在线客服
					//- form
						.faq_caption_btn(to="") 联系客服信箱
				.faqinput(:class='[scrolled ? "floting" : "" ]')
					ul
						li
							select#faqcategory.faqcategory(v-model="selected" @change='handchange')
								option(:value='0') 关于18老虎城
								option(:value='1') 责任博彩
								option(:value='2') 隐私政策
								option(:value='3') 条款与规则
								option(:value='4') 声明
				tgFaqs1(v-if="selected == 0")
				tgFaqs2(v-if="selected == 1")
				tgFaqs3(v-if="selected == 2")
				tgFaqs4(v-if="selected == 3")
				tgFaqs5(v-if="selected == 4")
	tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgFaqs1 from '@/components/tgFaqs/tgFaqs1.vue';
import tgFaqs2 from '@/components/tgFaqs/tgFaqs2.vue';
import tgFaqs3 from '@/components/tgFaqs/tgFaqs3.vue';
import tgFaqs4 from '@/components/tgFaqs/tgFaqs4.vue';
import tgFaqs5 from '@/components/tgFaqs/tgFaqs5.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgFix,
    tgSmNavi,
    tgFaqs1,
    tgFaqs2,
    tgFaqs3,
    tgFaqs4,
    tgFaqs5,
    tgFooter,
  },
  computed: {
    ...mapState('member', [
      'MemberLogined',
    ]),
  },
  data() {
    return {
      selected: Number(this.$route.query.type),
      scrolled: false,
      height: 0,
      topheight: 0,
    };
  },
  methods: {
    handchange(e) {
      console.log(this.selected);
    },
    handleScroll() {
      this.scrolled = window.scrollY > this.topheight;
    },
    handleResize() {
      this.height = document.body.scrollHeight;
      this.topheight = this.$refs.faq_caption.clientHeight + 100;
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>
<style lang="scss">
	
</style>
<style lang="scss" scoped>
	.floting{
		position: fixed;
		background: rgba(255,255,255,1);
		top: 0;
	}
</style>
