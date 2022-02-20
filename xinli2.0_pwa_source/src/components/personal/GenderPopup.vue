<template lang="pug">
//- 性別彈窗
Popup.bg-white(:show='show', :safeAreaInsetBottom='true', :round='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.flex.flex-col.items-stretch.pb-20
    //- 滑塊
    .self-center.h-1.w-9.bg-primary.opacity-10.mt-2.rounded-full

    //- 導覽欄
    BasicNav(:title='t("personal_gender")')
      //- 左側
      template(#left)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

    //- 男
    BasicButton(textColor='primary', content='stretch', @click='handleGenderClick(1)')
      .w-full.px-6.py-4.flex.flex-row.items-center.justify-between
        .subtitle1.text-primary.text-left {{ t("personal_gender_male") }}
        Loading.w-4.h-4(v-if='putDetailLoading')
        img.w-5.h-5(v-else-if='selected == 1', :src='iconCheckAccent')

    //- 分隔線
    .h-px.bg-primary.opacity-10

    //- 女
    BasicButton(textColor='primary', content='stretch', @click='handleGenderClick(2)') 
      .w-full.px-6.py-4.flex.flex-row.items-center.justify-between
        .subtitle1.text-primary.text-left {{ t("personal_gender_female") }}
        Loading.w-4.h-4(v-if='putDetailLoading')
        img.w-5.h-5(v-else-if='selected == 2', :src='iconCheckAccent')

    //- 分隔線
    .h-px.bg-primary.opacity-10
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed } from 'vue';
  import { Popup, Loading, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { putDetail } from '@/api/member/member';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconCheckAccent = staticImgUrl('icon-check-accent.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Show popup
     */
    show: boolean;

    /**
     * Selected gender
     */
    selected?: number;
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
   * Handle gender button clicked
   */
  const handleGenderClick = async (gender: number) => {
    try {
      // Turn refreshing on
      putDetailLoading.value = true;

      // Put detail
      await putDetail({
        gender,
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
</script>
