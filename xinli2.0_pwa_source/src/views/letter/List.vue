<template lang="pug">
//- 站內信列表頁面
.flex.flex-col.flex-grow.items-stretch.bg-notice-list
  //- 導覽欄(relative)
  Nav.relative.z-10.opacity-0

  //- 導覽欄(fixed)
  Nav.fixed.z-20.top-0.left-0.right-0(v-model:editMode='editMode')

  //- 下拉刷新
  PullRefresh.relative.z-10.flex-grow(v-model='refreshing', @refresh='handleRefresh')
    //- 無站內信
    .flex.flex-col.items-center.pt-40(v-if='empty')
      //-圖示
      img.w-18.h-18(:src='iconNoMailGray')

      //-訊息
      .mt-6.body1.text-primary.opacity-40 {{ t("letter_epmty") }}

    //- 站內信列表
    .flex.flex-col.items-stretch.pt-2.pb-6(v-else)
      //- 站內信物件
      BasicButton(v-for='item in letterList', content='stretch', bg='#ffffff', rounded='md', @click='handleItemClick(item)')
        //- 物件內容
        .flex.flex-col.items-stretch
          //- 勾選框與文字內容
          .grid.grid-cols-content.pt-4
            //- 勾選框
            .pl-4(v-if='editMode')
              img.w-6.h-6(v-if='item.selected', :src='iconCheckboxChecked')
              img.w-6.h-6(v-else, :src='iconCheckboxUncheck')
            .w-0(v-else)

            //- 文字內容
            .flex.flex-col.items-stretch.px-4
              //- 標題列
              .grid.grid-cols-title.gap-2.items-center
                //- 未讀圖示
                .w-2.h-2.rounded-full.bg-accent(v-if='item.status != 3')
                .w-2.h-2(v-else)

                //- 標題
                .headline3.text-primary.text-left.whitespace-nowrap.overflow-hidden.overflow-ellipsis(v-if='item.status != 3') {{ item.title }}
                .body1.text-primary.text-left.whitespace-nowrap.overflow-hidden.overflow-ellipsis(v-else) {{ item.title }}

              //- 日期
              .mt-2.ml-4.body2.text-primary.text-left.opacity-40 {{ getDate(item) }}

          //- 分隔線
          .mt-4.h-px.bg-primary.opacity-20

  //- 工具列(relative)
  ToolBar.relative.z-10.opacity-0(v-if='editMode')

  //- 工具列(fixed)
  ToolBar.fixed.z-20.bottom-0.left-0.right-0(v-if='editMode', :readAllLoading='readAllLoading', :deleteLoading='deleteLoading', @readAll='handleReadAllClick', @delete='handleDeleteClick')
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { PullRefresh } from 'vant';
  import { staticImgUrl } from '@/utils';
  import { getLetterList, putLetter, deleteLetter } from '@/api/event/event';
  import Nav from '@/components/letter/ListNav.vue';
  import ToolBar from '@/components/letter/ToolBar.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import dayjs from 'dayjs';
  import type { LetterItem } from '@/api/event/model/event-model';

  /**
   * Static icons
   */
  const iconCheckboxChecked = staticImgUrl('icon-checkbox-checked.svg');
  const iconCheckboxUncheck = staticImgUrl('icon-checkbox-uncheck.svg');
  const iconNoMailGray = staticImgUrl('icon-no-mail-gray.svg');

  /**
   * Selectable letter item
   */
  export interface SelectableLetterItem extends LetterItem {
    selected: boolean;
  }

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Vue router
   */
  const router = useRouter();

  /**
   * Edit mode
   */
  const editMode = ref(false);

  /**
   * Read all loading status
   */
  const readAllLoading = ref(false);

  /**
   * Delete loading status
   */
  const deleteLoading = ref(false);

  /**
   * Refreshing status
   */
  const refreshing = ref(false);

  /**
   * Letter list
   */
  const letterList = ref<SelectableLetterItem[]>([]);

  /**
   * Letter list empty
   */
  const empty = computed(() => {
    return letterList.value.length == 0;
  });

  /**
   * Get letter
   */
  const getLetter = async () => {
    try {
      // Turn refreshing on
      refreshing.value = true;

      // Get letter list
      const response = await getLetterList();

      // Update letter list
      const list = response.data?.data?.list || [];
      letterList.value = list.map((element) => {
        return {
          selected: false,
          ...element,
        };
      });
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      refreshing.value = false;
    }
  };

  /**
   * Get date string
   */
  const getDate = (item: SelectableLetterItem) => {
    const sendAt = item.sendAt || '';
    if (sendAt) {
      try {
        return dayjs(sendAt, 'YYYY-MM-DD HH:MM:ss').format('YYYY年MM月DD日 HH:MM');
      } catch (e) {
        return sendAt;
      }
    } else {
      return '';
    }
  };

  /**
   * Handle refresh trigger
   */
  const handleRefresh = () => {
    getLetter();
  };

  /**
   * Handle item click
   */
  const handleItemClick = async (item: SelectableLetterItem) => {
    if (editMode.value) {
      item.selected = !item.selected;
    } else if (item.id) {
      try {
        await putLetter({
          ID: item.id,
        });
      } catch (e) {
        // Exception handled by interceptors
      }
      router.push({
        path: `/letter/detail/${item.id}`,
      });
    }
  };

  /**
   * Handle read all button clicked
   */
  const handleReadAllClick = async () => {
    try {
      // Turn refreshing on
      readAllLoading.value = true;

      // Put letter
      for (var i = 0; i < letterList.value.length; i++) {
        if (letterList.value[i].selected) {
          await putLetter({
            ID: letterList.value[i].id,
          });
        }
      }

      // Refresh letter list
      await getLetter();
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      readAllLoading.value = false;
    }
  };

  /**
   * Handle delete button clicked
   */
  const handleDeleteClick = async () => {
    try {
      // Turn refreshing on
      deleteLoading.value = true;

      // Delete letter
      for (var i = 0; i < letterList.value.length; i++) {
        if (letterList.value[i].selected) {
          await deleteLetter({
            ID: letterList.value[i].id,
          });
        }
      }

      // Refresh letter list
      await getLetter();
    } catch (e) {
      // Exception handled by interceptors
    } finally {
      // Turn refreshing off
      deleteLoading.value = false;
    }
  };

  /**
   * On component mounted
   */
  onMounted(() => {
    getLetter();
  });
</script>

<style scoped lang="scss">
  .grid-cols-content {
    grid-template-columns: auto 1fr;
  }

  .grid-cols-title {
    grid-template-columns: auto 1fr;
  }
</style>
