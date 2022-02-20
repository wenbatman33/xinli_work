<template lang='pug'>
	footer 
		//- .copyright First Cagayan leisure and Resort Corporation
		.copyright 版权所有 © 2018 - 2019 18老虎城
			br
			router-link(to="/faqs?type=0") 常见问题
			||
			//- a(href="https://www.18tiger.net/") 切换成电脑版
			a(href="https://www.18tg.cc/") 更多VIP线路
			||
			a(@click='GA_home_servicemobile') 在线客服
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('member', [
      'MemberLogined',
    ]),
  },
};
</script>
<style lang="scss">

</style>
