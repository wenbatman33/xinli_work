<template lang="pug">
//- 微信號彈窗
Popup.h-full.bg-white(:show='show', :safeAreaInsetBottom='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.grid.grid-rows-content.justify-stretch
    //- 導覽欄
    BasicNav(:title='t("personal_weixin")')
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
    .flex.flex-col.items-stretch.overflow-y-auto.px-8
      //- 提示
      .body1.text-primary.opacity-40.mt-8 {{ t("personal_weixin_remainder") }}

      //- 微信號
      BasicField.mt-6(v-model:value='account', :error='accountError', :placeholder='t("personal_weixin_hint")')

    //- 確認
    .px-8.pt-2.pb-12.flex.flex-col.items-stretch
      BasicButton(:loading='putDetailLoading', bg='accent100', size='large', @click='handleConfirmClick') {{ t("common_confirm") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, watch } from 'vue';
  import { Popup, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { putDetail } from '@/api/member/member';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicField from '@/components/field/BasicField.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Show popup
     */
    show: boolean;
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
     * Refresh personal data
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
   * Patch loading status
   */
  const putDetailLoading = ref(false);

  /**
   * Account
   */
  const account = ref('');

  /**
   * Account error msg
   */
  const accountError = ref('');

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
      // Verify account format
      if (!/^[0-9a-zA-Z_-]{6,20}$/.test(account.value)) {
        accountError.value = t('personal_weixin_formatInvalid');
        return;
      }

      // Turn refreshing on
      putDetailLoading.value = true;

      // Put detail
      await putDetail({
        wechatID: account.value,
      });

      // Notify update success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('common_updateSuccess'),
      });

      // Refresh me data
      emit('refresh');

      // Hide popup
      emit('update:show', false);
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      putDetailLoading.value = false;
    }
  };

  /**
   * Watch account changed
   */
  watch(
    () => account.value,
    () => {
      accountError.value = '';
    }
  );
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }
</style>
