
<template lang="pug">
.grid.grid-flow-col.grid-rows-2.p-2.border-2.rounded-md.border-primaryLight.flex.flex-row.justify-start
  .row-span-2
    van-icon.text-primaryLight(size="2rem" name="paid")
  .col-span-2.font-bold.text-primary.ml-5 {{$t('wallet_wallet_03')}}
  .col-span-2.text-white.bodoni.ml-5 {{ commaFormat(walletBalance) }}
  .row-span-2.scale-75.absolute.right-12
    van-button.font-bold.text-black.border.bg-primaryLight.border-primaryLight( v-show="name" round @click='handelClick')
      | {{name}}
</template>
<script lang="ts" setup>
	import { ref  } from 'vue';
  import {commaFormat} from '@/utils'
  import { UserStore } from '@/store/userStore';
  const userStore = UserStore();
  const walletBalance = ref(userStore.agencyInfo.walletBalance||0)
  const emit = defineEmits(['click']);
  const props = defineProps({
  buttonName: String,
  })
  const name = ref(props.buttonName || '')
  const  handelClick = () => {emit('click');}
</script>