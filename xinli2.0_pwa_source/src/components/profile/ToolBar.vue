<template lang="pug">
//- 我的工具列
.grid.grid-cols-tool-bar.items-center.py-4.px-2.transition-all.duration-1000(v-if='authorized()')
  //- 功能列
  .grid.grid-cols-func.items-center
    //- 充值
    BasicButton(size='medium', rounded='normal', @click='handleDepositClick')
      .flex.flex-row.items-center
        img.w-5.h-5(:src='iconDepositWhite')
        .subtitle1.text-white.ml-2 {{ t("profile_recharge") }}

    //- 分隔線
    .w-px.h-5.bg-white.opacity-40

    //- 提款
    BasicButton(size='medium', rounded='normal', @click='handleWithdrawalClick')
      .flex.flex-row.items-center
        img.w-5.h-5(:src='iconWithdrawalWhite')
        .subtitle1.text-white.ml-2 {{ t("profile_withdrawal") }}

  //- 客服
  ChatButton(v-if='showChat', :src='iconChatWhite70')
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { staticImgUrl, authorized } from '@/utils';
  import ChatButton from '@/components/button/ChatButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconChatWhite70 = staticImgUrl('icon-chat-white70.svg');
  const iconDepositWhite = staticImgUrl('icon-deposit-white.svg');
  const iconTransferWhite = staticImgUrl('icon-transfer-white.svg');
  const iconWithdrawalWhite = staticImgUrl('icon-withdrawal-white.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Show chat button
     */
    showChat?: boolean;
  }

  const props = defineProps<Props>();

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * Handle deposit button clicked
   */
  const handleDepositClick = () => {
    router.push({
      path: '/deposit',
    });
  };

  /**
   * Handle withdrawal button clicked
   */
  const handleWithdrawalClick = () => {
    router.push({
      path: '/withdrawal',
    });
  };
</script>

<style scoped lang="scss">
  .grid-cols-tool-bar {
    grid-template-columns: 1fr auto;
  }

  .grid-cols-func {
    grid-template-columns: 1fr 1px 1fr;
  }
</style>
