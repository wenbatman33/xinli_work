<template lang="pug">
//- 站內信工具列
.flex.flex-col.items-stretch
  //- 分隔線
  .h-px.bg-primary.opacity-20

  //- 工具列內容
  .flex.flex-row.justify-between.items-center.pt-4.px-2.pb-12.bg-white
    //- 全部已讀
    BasicButton(:loading='readAllLoading', size='medium', textColor='primary', @click='handleReadAllClick') {{ t("common_readAll") }}

    //- 刪除
    BasicButton(:loading='deleteLoading', size='medium', textColor='primary', @click='handleDeleteClick') {{ t("common_delete") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { useI18n } from 'vue-i18n';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Component props interface
   */
  interface Props {
    readAllLoading?: boolean;
    deleteLoading?: boolean;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Read all button click
     */
    (e: 'readAll'): void;

    /**
     * Delete button click
     */
    (e: 'delete'): void;
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
   * Handle read all button clicked
   */
  const handleReadAllClick = () => {
    emit('readAll');
  };

  /**
   * Handle delete button clicked
   */
  const handleDeleteClick = () => {
    emit('delete');
  };
</script>
