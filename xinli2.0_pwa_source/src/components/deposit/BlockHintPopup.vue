<template lang="pug">
//- 瀏覽器阻擋提示彈窗
Popup.h-full.bg-white(:show='show', :safeAreaInsetBottom='true', :round='true', :closeable='false', teleport='body', position='bottom')
  //- 彈窗內容
  .h-full.grid.grid-rows-content.justify-stretch
    //- 滑塊
    .justify-self-center.h-1.w-9.bg-primary.opacity-10.mt-2.rounded-full

    //- 導覽欄
    BasicNav(:title='t("deposit_blockHintTitle")')
      //- 右側
      template(#right)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

    //- 提示內容(Safari)
    .flex.flex-col.items-stretch.overflow-y-auto.py-6.px-8(v-if='isSafari()')
      //- 內文
      .paragraph1.text-primary.whitespace-pre-wrap.break-all {{ t("deposit_blockHintSafariMessage") }}

      //- 截圖
      img.mt-6(:src='iconBlockHintSafari')

    //- 提示內容(Chrome)
    .flex.flex-col.items-stretch.overflow-y-auto.py-6.px-8(v-else)
      //- 內文
      .paragraph1.text-primary.whitespace-pre-wrap.break-all {{ t("deposit_blockHintAndroidMessage") }}

      //- 截圖
      img.mt-6(:src='iconBlockHintAndroid')

      //- 提示標題
      .headline3.text-accent.mt-6 {{ t("deposit_blockHintHintTitle") }}

      //- 提示內容
      .paragraph1.text-primary.whitespace-pre-wrap.break-all.mt-1 {{ t("deposit_blockHintHintMessage") }}

    //- 底部按鈕
    .px-9.pt-2.pb-12.flex.flex-col.items-stretch
      //- 不再提示
      CheckboxButton(v-model:checked='skip')
        .body2.text-primary {{ t("deposit_blockHintSkip") }}

      //- 關閉
      BasicButton.mt-2(bg='accent100', size='large', @click='handleCloseClick') {{ t("common_close") }}
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Popup } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl, isSafari } from '@/utils';
  import { LocalStorageKeys } from '@/utils/constants';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import CheckboxButton from '@/components/button/CheckboxButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconBlockHintSafari = staticImgUrl('icon-block-hint-safari.png');
  const iconBlockHintAndroid = staticImgUrl('icon-block-hint-android.png');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Show popup
   */
  const show = ref(false);

  /**
   * Skip next time
   */
  const skip = ref(false);

  /**
   * Handle close button clicked
   */
  const handleCloseClick = () => {
    if (skip.value) {
      window.localStorage.setItem(LocalStorageKeys.SKIP_DEPOSIT_BLOCK_HINT, '1');
    } else {
      window.localStorage.removeItem(LocalStorageKeys.SKIP_DEPOSIT_BLOCK_HINT);
    }
    show.value = false;
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    const skip = window.localStorage.getItem(LocalStorageKeys.SKIP_DEPOSIT_BLOCK_HINT);
    if (skip != '1') {
      show.value = true;
    }
  });
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto auto 1fr auto;
  }
</style>
