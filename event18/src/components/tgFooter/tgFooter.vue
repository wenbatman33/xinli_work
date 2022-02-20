<template lang='pug'>
footer 
	.container-fluid
		.copyright.row.no-gutters.d-flex.justify-content-center
			.text-center.px-2.py-3 版权所有 © 2019 18老虎城
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
/*-- Footer --*/
footer {
  width: 100%;
  height: auto;
  background: rgba(0,0,0,1);
}

.copyright {
  width: 100%;
  color: rgba(232,232,232,1.0);
  font-size: 12px;
  box-sizing: border-box;
  a {
    color: rgba(232,232,232,1.0);
    text-decoration: none;
    &:hover {
      color: rgba(24,144,255,1.0);
    }
  };
}
</style>
