<template lang="pug">
//- 生日彈窗
Popup.bg-white(:show='show', :safeAreaInsetBottom='true', :round='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.flex.flex-col.items-stretch.pb-20
    //- 滑塊
    .self-center.h-1.w-9.bg-primary.opacity-10.mt-2.rounded-full

    //- 導覽欄
    BasicNav(:title='t("personal_birthday")')
      //- 左側
      template(#left)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

      //- 右側
      template(#right)
        //- 完成
        BasicButton(:loading='putDetailLoading', size='small', textColor='primary', @click='handleDoneClick') {{ t("common_done") }}

    //- 提示
    .mt-8.px-8
      .body1.text-primary.opacity-40 {{ t("personal_birthday_remainder") }}

    //- 生日選擇
    DatetimePicker.mt-4(:showToolbar='false', :minDate='minDate', :maxDate='maxDate', type='date', @change='handleChange')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed } from 'vue';
  import { Popup, DatetimePicker, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { putDetail } from '@/api/member/member';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import dayjs from 'dayjs';

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
   * Selected date
   */
  const selected = ref(dayjs().format('YYYY-MM-DD'));

  /**
   * Patch loading status
   */
  const putDetailLoading = ref(false);

  /**
   * Min date
   */
  const minDate = computed(() => {
    return dayjs().add(-100, 'year').toDate();
  });

  /**
   * Max date
   */
  const maxDate = computed(() => {
    return dayjs().add(-15, 'year').toDate();
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
   * Handle done button clicked
   */
  const handleDoneClick = async () => {
    try {
      // Turn refreshing on
      putDetailLoading.value = true;

      // Put detail
      await putDetail({
        birthday: selected.value,
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
   * Handle change
   */
  const handleChange = (evt: any) => {
    selected.value = dayjs(evt).format('YYYY-MM-DD');
  };
</script>
