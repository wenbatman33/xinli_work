<template lang="pug">
//- 充值導覽欄
.flex.flex-col.items-stretch.bg-white
  //- 導覽欄
  BasicNav(:title='t("deposit_title")')
    //- 左側
    template(#left)
      BackButton

    //- 右側
    template(#right)
      ChatButton
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import ChatButton from '@/components/button/ChatButton.vue';

  /**
   * Vue i18n
   */
  const { t } = useI18n();
</script>
