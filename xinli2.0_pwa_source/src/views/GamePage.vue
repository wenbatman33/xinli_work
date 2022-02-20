<template lang="pug">
//- 遊戲頁
.flex.flex-grow.flex-col.items-stretch
  //- 導覽欄
  .grid.grid-cols-nav.gap-3.items-center.pt-4.pb-2.px-2.bg-white
    //- 一鍵回收中
    .p-2(v-if='postRecycleLoading')
      Loading(type='spinner', size='24px')

    //- 關閉
    BasicButton(v-else, rounded='full', @click='handleCloseClick')
      img.p-2(:src='iconClosePrimary')

    //- 標題
    .headline3.text-primary.whitespace-nowrap.overflow-hidden.overflow-ellipsis AG真人娱乐

    //- 充值
    BasicButton(bg='primary5', textColor='primary', size='small', rounded='full', @click='handleRechargeClick') 充值

    //- 刷新
    BasicButton(rounded='full', @click='handleRefreshClick')
      img.p-2(:src='iconRefreshPrimary')

    //- 上一頁
    BasicButton(rounded='full', @click='handlePreviousClick')
      img.p-2(v-if='iframeStackCount > 1', :src='iconTriangleLeftPrimary')
      img.p-2(v-else, :src='iconTriangleLeftGray')

    //- 下一頁
    BasicButton(rounded='full', @click='handleNextClick')
      img.p-2(:src='iconTriangleRightGray')

  //- 遊戲內容
  iframe.flex-grow(ref='iframe', :onLoad='handleOnload')
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Loading } from 'vant';
  import { useRoute, useRouter } from 'vue-router';
  import { staticImgUrl } from '@/utils';
  import { postRecycle } from '@/api/game/game';
  import { useMemberStore } from '@/store/member-store';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconRefreshPrimary = staticImgUrl('icon-refresh-primary.svg');
  const iconTriangleLeftGray = staticImgUrl('icon-triangle-left-gray.svg');
  const iconTriangleRightGray = staticImgUrl('icon-triangle-right-gray.svg');
  const iconTriangleLeftPrimary = staticImgUrl('icon-triangle-left-primary.svg');
  const iconTriangleRightPrimary = staticImgUrl('icon-triangle-right-primary.svg');

  /**
   * Vue router
   */
  const route = useRoute();
  const router = useRouter();

  /**
   * Member store
   */
  const memberStore = useMemberStore();

  /**
   * iFrame DOM
   */
  const iframe = ref();

  /**
   * iFrame stack count
   */
  const iframeStackCount = ref(-1);

  /**
   * Post recycle api loading status
   */
  const postRecycleLoading = ref(false);

  /**
   * Handle close button clicked
   */
  const handleCloseClick = async () => {
    try {
      postRecycleLoading.value = true;
      const response = await postRecycle();
      memberStore.updateMoney(response?.data?.data?.money || 0);
    } catch (e) {
      // Exception handled by interceptor
    } finally {
      postRecycleLoading.value = false;
    }
    await router.replace({
      path: '/',
    });
  };

  /**
   * Handle recharge button clicked
   */
  const handleRechargeClick = () => {};

  /**
   * Handle refresh button clicked
   */
  const handleRefreshClick = () => {};

  /**
   * Handle previous button clicked
   */
  const handlePreviousClick = () => {};

  /**
   * Handle next button clicked
   */
  const handleNextClick = () => {};

  /**
   * Handle iframe onload
   */
  const handleOnload = () => {
    iframeStackCount.value += 1;
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    iframe.value.src = route.query.path;
  });
</script>

<style scoped lang="scss">
  .grid-cols-nav {
    grid-template-columns: auto 1fr auto auto auto auto;
  }
</style>
