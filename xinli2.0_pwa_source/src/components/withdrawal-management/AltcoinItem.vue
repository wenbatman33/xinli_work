<template lang="pug">
//- 虛擬貨幣提領地址物件
.flex.flex-col.items-stretch.p-4.mx-4.mt-2.shadow.rounded.bg-white(@click='handleItemClick')
  //- 名稱資訊
  .grid.grid-cols-names.gap-4.items-center
    //- 名稱
    .subtitle1.text-primary {{ name }}

    //- 類型
    .subtitle2.text-primary.opacity-60 {{ type }}

  //- 地址資訊
  .grid.grid-cols-address.gap-2.items-center.mt-2
    //- 地址
    .body2.text-primary.opacity-60.break-all {{ address }}

    //- 讀取中
    .p-2(v-if='deleteLoading')
      Loading(type='spinner', size='24px')

    //- 刪除
    BasicButton(v-else, :loading='deleteLoading', rounded='full', @click='handleDeleteClick')
      .p-2
        img.w-6.h-6(:src='iconDeletePrimary')

    //- 編輯
    BasicButton(v-if='!deleteLoading', rounded='full', @click='handleEditClick')
      .p-2
        img.w-6.h-6(:src='iconEditPrimary')

  //- 修改彈窗
  AddAltcoinPopup(v-model:show='showAddAltcoinPopup', :edit='true', :item='item', @refresh='handleRefresh')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed } from 'vue';
  import { Loading, Dialog, Toast } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import { deleteUSDT } from '@/api/member/member';
  import BasicButton from '@/components/button/BasicButton.vue';
  import AddAltcoinPopup from '@/components/withdrawal-management/AddAltcoinPopup.vue';
  import type { USDTItem } from '@/api/member/model/member-model';

  /**
   * Static icons
   */
  const iconDeletePrimary = staticImgUrl('icon-delete-primary.svg');
  const iconEditPrimary = staticImgUrl('icon-edit-primary.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Altcoin item
     */
    item?: USDTItem;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Click item
     */
    (e: 'clickItem', item?: USDTItem): void;

    /**
     * Refresh
     */
    (e: 'refresh'): void;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Component emit
   */
  const emit = defineEmits<Emits>();

  /**
   * Delete loading
   */
  const deleteLoading = ref(false);

  /**
   * Show add altcoin popup
   */
  const showAddAltcoinPopup = ref(false);

  /**
   * Name
   */
  const name = computed(() => {
    return props?.item?.name || '-';
  });

  /**
   * Type
   */
  const type = computed(() => {
    if (props?.item?.type == 1) {
      return 'ERC20';
    } else if (props?.item?.type == 2) {
      return 'TRC20';
    } else {
      return props?.item?.type || '-';
    }
  });

  /**
   * Address
   */
  const address = computed(() => {
    return props?.item?.address || '-';
  });

  /**
   * Handle item clicked
   */
  const handleItemClick = () => {
    emit('clickItem', props.item);
  };

  /**
   * Handle delete button clicked
   */
  const handleDeleteClick = () => {
    Dialog({
      theme: 'round-button',
      teleport: '#dialog-container',
      title: t('withdrawalManagement_altcoinDelete_title'),
      message: t('withdrawalManagement_altcoinDelete_message', { name: name.value }),
      confirmButtonText: t('common_confirm'),
      cancelButtonText: t('common_cancel'),
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async () => {
      try {
        // Turn on loading status
        deleteLoading.value = true;

        // Delete altcoin item
        await deleteUSDT({
          id: props.item?.id,
        });

        // Notify delete success
        Toast({
          position: 'bottom',
          teleport: '#toast-container',
          message: t('common_deleteSuccess'),
        });

        // Notify refresh altcoin list
        emit('refresh');
      } catch (e) {
        // Exception handled by interceptor
      } finally {
        // Turn off loading status
        deleteLoading.value = false;
      }
    });
  };

  /**
   * Handle edit button clicked
   */
  const handleEditClick = () => {
    showAddAltcoinPopup.value = true;
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    emit('refresh');
  };
</script>

<style scoped lang="scss">
  .grid-cols-names {
    grid-template-columns: 1fr auto;
  }

  .grid-cols-address {
    grid-template-columns: 1fr auto auto;
  }
</style>
