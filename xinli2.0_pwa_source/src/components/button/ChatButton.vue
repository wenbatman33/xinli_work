<template lang="pug">
//- 客服按鈕
BasicButton(rounded='full', @click='handleChatClick')
  //- 按鈕圖示
  slot
    img.p-2(:src='src || iconChatPrimary')
</template>

<script setup lang="ts">
  import { staticImgUrl } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconChatPrimary = staticImgUrl('icon-chat-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Image source
     */
    src?: string;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Handle back button clicked
   */
  const handleChatClick = () => {
    console.log('show chat modal.');
  };
</script>
