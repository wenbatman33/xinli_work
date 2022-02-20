<template lang="pug">
//- 返回按鈕
BasicButton(rounded='full', @click='handleBackClick')
  //- 按鈕圖示
  img(:class='noPadding === true ? "p-0" : "p-2"', :src='src || iconArrowLeftPrimary')
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { staticImgUrl } from '@/utils';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconArrowLeftPrimary = staticImgUrl('icon-arrow-left-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Image source
     */
    src?: string;

    /**
     * Destination path
     */
    dest?: string;

    /**
     * No image padding
     */
    noPadding?: boolean;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * Handle back button clicked
   */
  const handleBackClick = () => {
    if (props?.dest) {
      window.location.href = props?.dest || '';
    } else {
      router.back();
    }
  };
</script>
