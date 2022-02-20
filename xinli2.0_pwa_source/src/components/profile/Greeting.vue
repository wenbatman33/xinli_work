<template lang="pug">
//- 我的招呼語
.grid.grid-cols-greeting.gap-2.pl-4.pr-2.py-4
  //- 已登入招呼語
  .flex.flex-row.items-center(v-if='authorized()')
    .headline1.text-white {{ t("profile_greeting", { name: userName }) }}
    Loading.ml-4(v-if='loading', type='spinner', size='24px')

  //- 未登入招呼語
  .headline1.text-white(v-else) {{ t("profile_unauthorizedTitle") }}

  //- 客服
  ChatButton(:src='iconChatWhite70')
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { Loading } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl, authorized } from '@/utils';
  import { getMe } from '@/api/member/member';
  import ChatButton from '@/components/button/ChatButton.vue';
  import type { MeData } from '@/api/member/model/member-model';

  /**
   * Static icons
   */
  const iconChatWhite70 = staticImgUrl('icon-chat-white70.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Loading status
   */
  const loading = ref(false);

  /**
   * Me data
   */
  const meData = ref<MeData>({});

  /**
   * User name
   */
  const userName = computed(() => {
    return meData.value.account || '';
  });

  /**
   * Get me data
   */
  const getMeData = async () => {
    if (authorized()) {
      try {
        // Turn loading on
        loading.value = true;

        // Get me data
        const response = await getMe();
        meData.value = response?.data?.data || {};
      } catch (e) {
        // Exception handled by interceptors
      } finally {
        // Turn loading off
        loading.value = false;
      }
    }
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getMeData();
  });
</script>

<style scoped lang="scss">
  .grid-cols-greeting {
    grid-template-columns: 1fr auto;
  }
</style>
