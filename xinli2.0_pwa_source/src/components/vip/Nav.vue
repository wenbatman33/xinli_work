<template lang="pug">
//- VIP導覽欄
.flex.flex-col.items-stretch.bg-white
  //- 導覽欄
  BasicNav(:title='t("vip_title")')
    //- 左側
    template(#left)
      .flex.flex-row.items-center
        BackButton
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';

  /**
   * Vue i18n
   */
  const { t } = useI18n();
</script>
