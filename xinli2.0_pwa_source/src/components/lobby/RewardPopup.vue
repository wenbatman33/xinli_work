<template lang="pug">
//- 領獎專區彈窗
Popup.h-full.bg-background(:show='show', :safeAreaInsetBottom='true', :round='true', teleport='body', position='bottom', @update:show='handleUpdateShow')
  //- 彈窗內容
  .h-full.grid.grid-rows-content.justify-stretch
    //- 滑塊
    .justify-self-center.h-1.w-9.bg-primary.opacity-10.mt-2.rounded-full

    //- 導覽欄
    BasicNav(:title='t("lobby_reward")')
      //- 右側
      template(#right)
        //- 關閉
        BasicButton(rounded='full', @click='handleCloseClick')
          //- 關閉圖示
          img.p-2(:src='iconClosePrimary')

    //- 今日無獎勵
    .flex.flex-col.items-center.mt-24(v-if='empty')
      //- 無獎勵圖示
      img.w-18.h-18(:src='iconEmptyGift')

      //- 無獎勵標題
      .body1.text-primary.opacity-40.mt-6 {{ t("lobby_reward_empty") }}

    //- 獎勵列表
    RewardList(v-else, :itemList='rewardList')

    //- 一鍵全領
    .px-9.pt-2.pb-12.flex.flex-col.items-stretch(v-if='!empty')
      BasicButton(bg='accent100', size='large', @click='handleReceiveClick') {{ t("lobby_reward_receive") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed } from 'vue';
  import { Popup } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import RewardList from '@/components/lobby/RewardList.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconEmptyGift = staticImgUrl('icon-empty-gift.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Show popup
     */
    show: boolean;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update show
     */
    (e: 'update:show', show: boolean): void;
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
   * Reward list
   */
  const rewardList = ref([
    {
      item: '余额宝',
      name: '昨日利息收益',
      amount: '1000.60',
    },
    {
      item: '余额宝',
      name: '昨日利息收益',
      amount: '5.60',
    },
    {
      item: 'VIP 专属特权',
      name: '体育返水',
      amount: '146.60',
    },
    {
      item: 'VIP',
      name: 'VIP',
      amount: '88.88',
    },
  ]);

  /**
   * Reward list empty
   */
  const empty = computed(() => {
    return rewardList.value.length === 0;
  });

  /**
   * Handle update show
   */
  const handleUpdateShow = (show: boolean) => {
    emit('update:show', show);
  };

  /**
   * Handle close button clicked
   */
  const handleCloseClick = () => {
    emit('update:show', false);
  };

  /**
   * Handle receive button clicked
   */
  const handleReceiveClick = () => {
    rewardList.value = [];
  };
</script>

<style scoped lang="scss">
  .grid-rows-content {
    grid-template-rows: auto auto 1fr auto;
  }
</style>
