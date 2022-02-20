<template lang="pug">
//- 提款管理頁面
.flex.flex-col.flex-grow.items-stretch.bg-withdrawal-management
  //- 導覽欄(relative)
  Nav.relative.z-10.opacity-0

  //- 導覽欄(fixed)
  Nav.fixed.z-20.top-0.left-0.right-0(v-model:type='type', @clickSort='handleSortClick')

  //- 銀行卡列表
  BankcardList(v-if='type == 1')

  //- 虛擬貨幣列表
  AltcoinList(v-else-if='type == 2')
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import Nav from '@/components/withdrawal-management/Nav.vue';
  import AltcoinList from '@/components/withdrawal-management/AltcoinList.vue';
  import BankcardList from '@/components/withdrawal-management/BankcardList.vue';

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Type
   */
  const type = ref(1);

  /**
   * Handle sort button clicked
   */
  const handleSortClick = () => {};
</script>

<style scoped lang="scss">
  .bg-withdrawal-management {
    background-color: #f5f5f5;
  }
</style>
