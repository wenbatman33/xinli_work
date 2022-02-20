<template lang="pug">
//- 提款單頁面
.flex-grow.grid.grid-rows-content.justify-stretch
  //- 導覽欄
  BasicNav(:title='t("withdrawal_order_title")')
    //- 左側
    template(#left)
      //- 關閉
      BackButton(:src='iconClosePrimary')

    //- 右側
    template(#right)
      //- 客服
      ChatButton

  //- 頁面內容
  .flex.flex-col.items-stretch
    //- 灰色區塊
    .flex.flex-col.items-center.bg-gray.px-4.py-6
      //- 訂單狀態
      .subtitle1.text-accent.opacity-80 {{ t("withdrawal_order_audit") }}

      //- 訂單金額
      .headline2.text-primary {{ commaFormat(1000) }}

    //- 白色區塊
    .flex.flex-col.items-stretch
      //- 銀行卡資訊
      .grid.grid-cols-info.gap-3.items-center.px-5.py-4.bg-gray.mt-6.mx-8
        //- 圖示
        img.w-6.h-6(:src='""', @error='errorImg')

        //- 資訊
        .flex.flex-col.items-stretch
          //- 名稱
          .headline3.text-primary {{ "工商银行" }}

          //- 卡號
          .body1.text-primary.opacity-60 {{ "**** **** **** ***7 888" }}

      //- 提款金額
      .grid.grid-cols-info.gap-3.mt-6.mx-8
        //- 標題
        .body2.text-primary.opacity-40 {{ t("withdrawal_order_amount") }}

        //- 數值
        .col-span-2.subtitle2.text-primary.text-right {{ commaFormat(1000) }}

      //- 申請日期
      .grid.grid-cols-info.gap-3.mt-4.mx-8
        //- 標題
        .body2.text-primary.opacity-40 {{ t("withdrawal_order_date") }}

        //- 數值
        .col-span-2.subtitle2.text-primary.text-right {{ "2021年07月23日 13:42" }}

      //- 訂單編號
      .grid.grid-cols-info.gap-3.mt-4.mx-8
        //- 標題
        .body2.text-primary.opacity-40 {{ t("withdrawal_order_serial") }}

        //- 數值
        .subtitle2.text-primary.text-right {{ id }}

        //- 複製
        img.w-4.h-4(:src='iconCopyPrimary40', @click='handleCopySerialClick')

  //- 按鈕
  .px-8.pt-8.pb-12.flex.flex-col.items-stretch
    //- 查看交易紀錄
    BasicButton(bg='accent10', textColor='accent', size='large', @click='handleRecordClick') {{ t("withdrawal_order_record") }}

    //- 完成
    BasicButton.mt-4(bg='accent100', size='large', @click='handleConfirmClick') {{ t("withdrawal_order_confirm") }}
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { staticImgUrl, errorImg, commaFormat, copy } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconCopyPrimary40 = staticImgUrl('icon-copy-primary40.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const route = useRoute();
  const router = useRouter();

  /**
   * Order id
   */
  const id = computed(() => {
    return String(route.params.id) || '';
  });

  /**
   * Handle copy serial button clicked
   */
  const handleCopySerialClick = () => {
    copy(id.value);
  };

  /**
   * Handle record button clicked
   */
  const handleRecordClick = () => {
    router.push({
      path: '/transaction',
    });
  };

  /**
   * Handle confirm button clicked
   */
  const handleConfirmClick = () => {};
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }

  .bg-gray {
    background: rgba(7, 31, 68, 0.03);
  }

  .grid-cols-info {
    grid-template-columns: auto 1fr auto;
  }
</style>
