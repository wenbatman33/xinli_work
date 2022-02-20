<template lang="pug">
//- 獎勵列表
.flex.flex-col.items-stretch.overflow-y-auto
  //- 獎勵物件
  RewardItem(v-for='item in itemList', :item='item.item', :name='item.name', :amount='item.amount')
</template>

<script setup lang="ts">
  import { defineProps, ref } from 'vue';
  import RewardItem from '@/components/lobby/RewardItem.vue';

  /**
   * Component props interface
   */
   interface Props {
     /**
      * Reward list
      */
    itemList: {
      item: string;
      name: string;
      amount: string;
    }[];
  }

  /**
   * Component props
   */
   const props = defineProps<Props>();
</script>
