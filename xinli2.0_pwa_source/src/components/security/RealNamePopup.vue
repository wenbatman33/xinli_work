<template lang="pug">
//- 真實姓名彈窗
Popup.h-full.bg-white(:show='show', :safeAreaInsetBottom='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.grid.grid-rows-content.justify-stretch
    //- 導覽欄
    BasicNav(:title='t("security_realname_title")')
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
      //- 真實姓名
      .mt-6
        BasicField(:value='realName', :error='realNameError', :iconLeft='iconUserPrimary', :placeholder='t("security_realname_hint")', @update:value='handleUpdateValue')

      //- 提示1
      .body2.mt-10
        span.text-primary.opacity-20 ●
        span.text-primary.opacity-40.pl-2 {{ t("security_realname_reminder1") }}

      //- 提示2
      .body2.mt-2
        span.text-primary.opacity-20 ●
        span.text-primary.opacity-40.pl-2 {{ t("security_realname_reminder2") }}

    //- 確認
    .px-8.pt-2.pb-12.flex.flex-col.items-stretch
      BasicButton(:loading='putNameLoading', :disabled='confirmDisabled', bg='accent100', size='large', @click='handleConfirmClick') {{ t("common_confirm") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref } from 'vue';
  import { Popup, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { putName } from '@/api/member/member';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicField from '@/components/field/BasicField.vue';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconUserPrimary = staticImgUrl('icon-user-primary.svg');

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
   * Real name
   */
  const realName = ref();

  /**
   * Real name error
   */
  const realNameError = ref();

  /**
   * Confirm button disabled
   */
  const confirmDisabled = ref(true);

  /**
   * Put name loading status
   */
  const putNameLoading = ref(false);

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
   * Handle update value
   */
  const handleUpdateValue = (value: string) => {
    realName.value = value;
    if (/[0-9a-zA-Z ]/.test(value)) {
      realNameError.value = t('security_realname_formatInvalid');
      confirmDisabled.value = true;
    } else {
      realNameError.value = undefined;
      confirmDisabled.value = value.length == 0;
    }
  };

  /**
   * Handle confirm button clicked
   */
  const handleConfirmClick = async () => {
    try {
      // Turn loading on
      putNameLoading.value = true;

      // Put name
      await putName({
        name: realName.value,
      });

      // Notify update success
      Toast({
        position: 'bottom',
        teleport: '#toast-container',
        message: t('common_updateSuccess'),
      });

      // Referesh me data
      emit('refresh');

      // Hide popup
      emit('update:show', false);
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn loading off
      putNameLoading.value = false;
    }
  };
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto 1fr auto;
  }
</style>
