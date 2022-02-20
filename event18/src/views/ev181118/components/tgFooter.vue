<template lang='pug'>
footer 
	.container-fluid
		.copyright.row.no-gutters.d-flex.justify-content-center
			.text-center.px-2.py-3 版权所有 © 2018 18老虎城
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('index', [
      'siteHost',
    ]),
  },
};
</script>
<style scoped lang='scss'>
</style>
