<template lang="pug">
//- 充值訂單導覽欄
BasicNav.bg-white(:title='title')
  //- 左側
  template(#left)
    //- 關閉
    BackButton(:src='iconClosePrimary')

  //- 右側
  template(#right)
    //- 客服
    ChatButton
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import ChatButton from '@/components/button/ChatButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Title
     */
    title?: string;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();
</script>
