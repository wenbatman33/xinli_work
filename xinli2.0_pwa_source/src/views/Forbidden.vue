<template lang="pug">
//- 地區限制頁
.flex.flex-col.flex-grow.items-center.px-8.pb-16(:style='bg')
  //- 圖示
  img.w-16.h-16.mt-16(:src='iconMaintenanceLogo')

  //- 標題
  .headline1.text-primary.mt-10 {{ t("forbidden_title") }}

  //- IP中文標題
  .subtitle1.text-primary.opacity-60.mt-6(v-if='containsIp') {{ t("forbidden_ipCn") }}

  //- IP英文標題
  .body2.text-primary.opacity-60.mt-2(v-if='containsIp') {{ t("forbidden_ipEn") }}

  //- IP位置
  .headline1.text-primary.opacity-60.mt-2(v-if='containsIp') {{ ip }}

  //- 中文說明
  .paragraph2.text-primary.text-center.opacity-40.mt-6 {{ t("forbidden_contentCn") }}

  //- 英文說明
  .paragraph2.text-primary.text-center.opacity-40.mt-6 {{ t("forbidden_contentEn") }}

  //- 聯繫客服
  BasicButton.mt-6(bg='accent100', size='large') {{ t("forbidden_concat") }}
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import axios from 'axios';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconMaintenanceLogo = staticImgUrl('icon-maintenance-logo.svg');
  const iconForbiddenBackground = staticImgUrl('icon-forbidden-background.png');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * IP address
   */
  const ip = ref('');

  /**
   * Background
   */
  const bg = computed(() => {
    return {
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
      backgroundImage: `url(${iconForbiddenBackground})`,
    };
  });

  /**
   * Contains ip address
   */
  const containsIp = computed(() => {
    return ip.value != undefined && ip.value.length > 0;
  });

  /**
   * On component mounted
   */
  onMounted(() => {
    axios
      .create()
      .get('https://jsonip.com/')
      .then((response) => {
        ip.value = response.data?.ip || '';
      });
  });
</script>
