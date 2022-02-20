<template lang="pug">
.relative.flex.flex-col.flex-shrink-0.items-center.p-4.ml-2(:class='{ "bg-black-card": type == "black", "bg-gold-card": type == "gold" }')
  //- 背景圖片
  img.absolute.z-10.top-0.right-0(:src='bg')

  //- 獎勵名稱
  .z-20.flex.flex-row.items-center
    img.w-4.h-4(:src='icon')
    .body1.text-content.ml-2
      span VIP
      span.ml-1 {{ level }}
      span.ml-2 {{ name }}

  //- 獎勵圖片
  img.z-20.mt-6.h-11.w-11(v-if='image', :src='image')

  //- 獎勵金額
  .z-20.text-content.opacity-60.mt-6(v-else)
    span.font-currency ¥
    span.font-amount.ml-2 {{ amount || 0 }}

  //- 獎勵條件
  .z-20.font-rule.text-content.opacity-80.mt-4 
    span {{ t("vip_rewardLevelRequired") }}
    span.ml-1 VIP
    span.ml-1 {{ level }}

  //- 聯繫在線客服
  BasicButton.z-20.self-stretch.bg-reached.mt-2(v-if='status == -99', size='medium', @click='handleConcatClicked')
    .subtitle3.text-reached {{ t("vip_rewardConcat") }}

  //- 僅限生日當天
  BasicButton.z-20.self-stretch.bg-reached.mt-2(v-else-if='status == -98', size='medium')
    .subtitle3.text-reached {{ t("vip_rewardOnlyBirthday") }}

  //- 已領取
  BasicButton.z-20.self-stretch.bg-reached.mt-2(v-else-if='status == 1', size='medium')
    .subtitle3.text-white.opacity-60 {{ t("vip_rewardReceived") }}

  //- 立即領取
  BasicButton.z-20.self-stretch.bg-reached.mt-2(v-else-if='status == 2', size='medium', :loading='loading', @click='handleReceiveClicked')
    .subtitle3.text-reached {{ t("vip_rewardReached") }}

  //- 未達條件
  BasicButton.z-20.self-stretch.bg-unreached.mt-2(v-else, size='medium')
    .subtitle3.text-white.opacity-60 {{ t("vip_rewardUnreached") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { useI18n } from 'vue-i18n';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Card type
     */
    type: 'black' | 'gold';

    /**
     * Background icon
     */
    bg?: string;

    /**
     * Required level
     */
    level?: number;

    /**
     * Reward name
     */
    name?: string;

    /**
     * Reward icon
     */
    icon?: string;

    /**
     * Reward amount
     */
    amount?: number;

    /**
     * Reward image
     */
    image?: string;

    /**
     * Status
     */
    status?: number;

    /**
     * Loading
     */
    loading?: boolean;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Click receive button
     */
    (e: 'click-receive'): void;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Component emits
   */
  const emits = defineEmits<Emits>();

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Handle receive button clicked
   */
  const handleReceiveClicked = () => {
    emits('click-receive');
  };

  /**
   * Handle concat button clicked
   */
  const handleConcatClicked = () => {};
</script>

<style scoped lang="scss">
  .bg-gold-card {
    background: linear-gradient(180deg, #ac8954 0%, #eccc95 100%);
    border-radius: 12px;

    .bg-reached {
      background: linear-gradient(180deg, #c8a674 0%, #ebc994 100%);
      border-radius: 4px;
    }

    .text-content {
      color: #ffffff;
    }

    .text-reached {
      color: #ffffff;
    }
  }

  .bg-black-card {
    background: linear-gradient(180deg, #1c1c1d 0%, #46484c 99.99%, #393a3e 100%);
    border-radius: 12px;

    .bg-reached {
      background: linear-gradient(180deg, #c8a674 0%, #ebc994 100%);
      border-radius: 4px;
    }

    .text-content {
      color: #d8b782;
    }

    .text-reached {
      color: #000000;
      opacity: 0.8;
    }
  }

  .bg-unreached {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .font-currency {
    font-family: Helvetica Neue;
    font-style: normal;
    font-weight: 300;
    font-size: 22px;
    line-height: 27px;
  }

  .font-amount {
    font-family: Helvetica Neue;
    font-style: normal;
    font-weight: 300;
    font-size: 36px;
    line-height: 44px;
  }

  .font-rule {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 15px;
  }
</style>
