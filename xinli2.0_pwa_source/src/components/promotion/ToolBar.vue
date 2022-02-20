<template lang="pug">
//- 優惠詳細功能列
.flex.flex-col.items-stretch.bg-white.shadow.pb-6
  //- 水平排列
  .flex.flex-row.items-center.px-4.mt-3
    //- 狀態
    .caption.text-white.py-1.px-3.rounded(:class='status.class') {{ status.name }}

    //- 期間
    .body3.text-primary.opacity-40.ml-2 {{ status.time }}

  //- 分隔線
  .mt-3.px-4(v-if='status.code == "active"')
    .w-full.h-px.bg-primary.opacity-5

  //- 參加按鈕
  .mt-2.px-4.grid.grid-cols-2.gap-2(v-if='status.code == "active"')
    BasicButton.w-full(
      v-for='apply in applyPromotionList',
      :disabled='apply.applyStatus == 2',
      :class='apply.columnClass',
      :loading='applingId != undefined && apply.id == applingId',
      bg='accent100',
      size='large',
      @click='handleApplyClick(apply)'
    ) {{  apply.applyStatus == 2 ? t('promotion_applied') : apply.name || ""  }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { Dialog } from 'vant';
  import { authorized, showLoginDialog } from '@/utils';
  import { getMe } from '@/api/member/member';
  import { postApplyPromotion } from '@/api/payment/promotion';
  import BasicButton from '@/components/button/BasicButton.vue';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';
  import type { PromotionItem, ApplyPromotionItem } from '@/api/payment/model/promotion-model';

  /**
   * Class apply item
   */
  interface ClassApplyPromotionItem extends ApplyPromotionItem {
    columnClass: string;
  }

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Promotion item
     */
    item?: PromotionItem;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Refresh promotion data
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
   * Vue router
   */
  const router = useRouter();

  /**
   * Appling id
   */
  const applingId = ref<number | undefined>(undefined);

  /**
   * Status
   */
  const status = computed(() => {
    var startTime: Dayjs;
    try {
      startTime = dayjs(props.item?.startTime, 'YYYY-MM-DD HH:mm:ss');
    } catch (e) {
      startTime = dayjs();
    }
    var endTime: Dayjs;
    try {
      endTime = dayjs(props.item?.endTime, 'YYYY-MM-DD HH:mm:ss');
    } catch (e) {
      endTime = dayjs();
    }
    const time = `${startTime.format('YYYY年MM月DD日')} - ${endTime.format('YYYY年MM月DD日')}`;
    const current = dayjs();
    if (props.item?.type == '4') {
      return {
        code: 'other',
        name: '',
        class: 'hidden',
        time: props.item?.startTime ? time : '',
      };
    } else if (current.isAfter(endTime)) {
      return {
        code: 'expired',
        name: t('promotion_expired'),
        class: 'bg-primary',
        time,
      };
    } else if (current.isAfter(startTime)) {
      return {
        code: 'active',
        name: t('promotion_active'),
        class: 'bg-accent',
        time,
      };
    } else {
      return {
        code: 'apporaching',
        name: t('promotion_apporaching'),
        class: 'bg-primary opacity-40',
        time,
      };
    }
  });

  /**
   * Apply promotion list
   */
  const applyPromotionList = computed<ClassApplyPromotionItem[]>(() => {
    const list = props?.item?.promotion || [];
    const length = list.length;
    return list.map<ClassApplyPromotionItem>((element, index) => {
      let columnClass;
      if (length <= 1) {
        columnClass = 'col-span-2';
      } else if (index % 2 == 1) {
        columnClass = '';
      } else if (index % 2 == 0 && index < length - 1) {
        columnClass = '';
      } else {
        columnClass = 'col-span-2';
      }
      return {
        ...element,
        loading: false,
        columnClass,
      };
    });
  });

  /**
   * Handle apply button clicked
   */
  const handleApplyClick = async (item: ClassApplyPromotionItem) => {
    if (!authorized()) {
      // Login required
      showLoginDialog();
    } else if (item.applyStatus == 2) {
      // Skip if already apply
    } else {
      try {
        // Turn loading on
        applingId.value = item.id;

        // Get me data
        const meResponse = await getMe();

        // Check name and phone verified
        const meData = meResponse?.data?.data || {};
        const name = meData.name || '';
        const phoneCert = meData.phoneCert == '1';
        if (name.length <= 0 || !phoneCert) {
          Dialog({
            theme: 'round-button',
            teleport: '#dialog-container',
            title: t('promotion_verifyProfileTitle'),
            message: t('promotion_verifyProfileMessage'),
            confirmButtonText: t('promotion_verifyProfileButton'),
            cancelButtonText: t('common_cancel'),
            showConfirmButton: true,
            showCancelButton: true,
          }).then((dialog) => {
            router.push({
              path: '/security',
            });
          });
          return;
        }

        // Apply promotion
        const applyResponse = await postApplyPromotion({
          promotionID: item?.id,
        });

        // Show message
        if (applyResponse.data?.data?.success == true) {
          emit('refresh');
          Dialog({
            theme: 'round-button',
            teleport: '#dialog-container',
            title: t('promotion_applySuccess'),
            confirmButtonText: t('common_confirm'),
            showConfirmButton: true,
            showCancelButton: false,
          }).then(() => {});
        } else {
          Dialog({
            theme: 'round-button',
            teleport: '#dialog-container',
            title: t('promotion_applyFailed'),
            confirmButtonText: t('common_confirm'),
            showConfirmButton: true,
            showCancelButton: false,
          }).then(() => {});
        }
      } catch (e) {
        // Exception handled by interceptors
      } finally {
        // Turn loading off
        applingId.value = undefined;
      }
    }
  };
</script>
