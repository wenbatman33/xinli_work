<template lang="pug">
//- 添加銀行卡彈窗
Popup.h-full.bg-white(:show='show', :safeAreaInsetBottom='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.grid.grid-rows-content.justify-stretch
    //- 導覽欄
    BasicNav(:title='t("withdrawalManagement_bankcardAdd")')
      //- 左側
      template(#left)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

      //- 右側
      template(#right)
        //- 客服
        ChatButton

    //- 頁面內容
    .flex.flex-col.items-stretch.overflow-y-auto
      //- 銀行卡模擬
      .flex.flex-col.items-center.bg-simluator.py-6
        //- 銀行卡
        .flex.flex-col.items-stretch.shadow.rounded-md.bg-white.px-4.pt-4.pb-7.w-52
          //- 姓名資訊
          .grid.grid-cols-names.gap-2.items-center
            //- 真實姓名
            .subtitle1.text-primary.opacity-40 {{ realName }}

            //- 銀行圖示
            img.w-8.h-8(:src='iconBankAccent')

          //- 帳戶資訊
          .mt-7.subtitle3.text-primary.text-center.opacity-40 {{ accountTransform }}

      //- 表單資訊
      .flex.flex-col.items-stretch.px-8
        //- 持卡人姓名標題
        .mt-6.subtitle1.text-primary {{ t("withdrawalManagement_bankcardAdd_realName") }}

        //- 持卡人姓名
        .mt-4.body1.text-primary {{ realName }}

        //- 銀行卡號標題
        .mt-6.subtitle1.text-primary {{ t("withdrawalManagement_bankcardAdd_account") }}

        //- 銀行卡號
        BasicField.mt-4(v-model:value='account', :placeholder='t("withdrawalManagement_bankcardAdd_accountHint")')

        //- 提示1
        .body2.mt-12
          span.text-primary.opacity-20 ●
          span.text-primary.opacity-40.pl-2 {{ t("withdrawalManagement_bankcardAdd_reminder1") }}

        //- 提示2
        .body2.mt-2
          span.text-primary.opacity-20 ●
          span.text-primary.opacity-40.pl-2 {{ t("withdrawalManagement_bankcardAdd_reminder2") }}

    //- 確認
    .px-8.pt-2.pb-12.flex.flex-col.items-stretch
      BasicButton(:loading='postLoading', :disabled='confirmDisabled', bg='accent100', size='large', @click='handleConfirmClick') {{ t("withdrawalManagement_bankcardAdd_confirm") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, watch } from 'vue';
  import { Popup, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { postBankcard, postBankcardOther } from '@/api/member/member';
  import { LocalStorageKeys } from '@/utils/constants';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicField from '@/components/field/BasicField.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconBankAccent = staticImgUrl('icon-bank-accent.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Show popup
     */
    show: boolean;

    /**
     * Real name
     */
    realName?: string;

    /**
     * Other bankcard
     */
    otherBankcard?: boolean;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update show
     */
    (e: 'update:show', show: boolean): void;

    /**
     * Refresh bankcard list
     */
    (e: 'refresh'): void;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Component emits
   */
  const emit = defineEmits<Emits>();

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Account
   */
  const account = ref('');

  /**
   * Post bankcard loading status
   */
  const postLoading = ref(false);

  /**
   * Account transform
   */
  const accountTransform = computed(() => {
    const accountValue = account.value || '';
    const cs = [];
    for (var i = 0; i < 19; i++) {
      if (i < accountValue.length) {
        cs[i] = accountValue[i];
      } else {
        cs[i] = '-';
      }
    }
    const combined = cs.reduce((prev, curr, index) => {
      if (index > 0 && (index + 1) % 4 == 0) {
        return prev + curr + ' ';
      } else {
        return prev + curr;
      }
    }, '');
    return combined;
  });

  /**
   * Confirm button disabled status
   */
  const confirmDisabled = computed(() => {
    return !/^\w{18,22}$/.test(account.value);
  });

  /**
   * Handle close button clicked
   */
  const handleCloseClick = () => {
    emit('update:show', false);
  };

  /**
   * Handle update show
   */
  const handleUpdateShow = (show: boolean) => {
    emit('update:show', show);
  };

  /**
   * Handle confirm button clicked
   */
  const handleConfirmClick = async () => {
    try {
      // Turn refreshing on
      postLoading.value = true;

      // Post bankcard
      if (props?.otherBankcard == true) {
        await postBankcardOther({
          bankNo: account.value,
          name: props.realName,
        });
      } else {
        await postBankcard({
          bankNo: account.value,
          name: props.realName,
        });
      }

      // Notify add success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('common_addSuccess'),
      });

      // Notify refresh bankcard list
      emit('refresh');

      // Hide popup
      emit('update:show', false);
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      postLoading.value = false;
    }
  };

  /**
   * Watch show changed
   */
  watch(
    () => props.show,
    (value) => {
      if (value) {
        account.value = '';
      }
    }
  );
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }

  .bg-simluator {
    background: #f5f5f5;
  }

  .grid-cols-names {
    grid-template-columns: 1fr auto;
  }
</style>
