<template lang="pug">
//- 幫助中心
.flex.flex-col.flex-grow.items-stretch.bg-white
  //- 導覽欄
  BasicNav.bg-white(:title='t("help_title")')
    //- 左側
    template(#left)
      //- 返回
      BackButton

  //- 搜尋欄
  .grid.grid-cols-field.items-center.bg-field.px-2
    //- 搜尋圖示
    BasicButton(rounded='full')
      .p-2
        img.w-6.h-6(:src='iconSearchPrimary')

    //- 輸入框
    Field.bg-transparent(:model-value='searchKeyword', :placeholder='t(`help_hint`)', @update:model-value='handleUpdateSearchKeyword')

    //- 分隔線
    .w-px.h-7.bg-primary.opacity-10

    //- 關閉
    BasicButton(v-if='displayClose', rounded='full', @click='handleCloseClick')
      .p-2
        img.w-6.h-6(:src='iconClosePrimary')

    //- 菜單
    BasicButton(v-else, rounded='full', @click='handleMenuClick')
      .p-2
        img.w-6.h-6(:src='iconBurgerPrimary')

  //- 首頁
  .flex.flex-col.items-stretch(v-if='path == `index`')
    //- 首頁分類列表
    CategoryItem(v-for='item in indexList', :item='item', @click-category='handleCategoryClick', @click-faq='handleFaqClick')

  //- 菜單
  .flex.flex-col.items-stretch(v-else-if='path == `menu`')
    //- 菜單分類列表
    CategoryItem(v-for='item in menuList', :item='item', @click-category='handleCategoryClick', @click-faq='handleFaqClick')

  //- 菜單詳細
  .flex.flex-col.items-stretch(v-else-if='path == `menuDetail`')
    //- 導覽路徑
    BreadCrumbs(:list='pathStack', @click-path='handlePathClick')

    //- 菜單詳細分類列表
    CategoryItem(:item='menuDetail', @click-faq='handleFaqClick')

  //- 搜尋結果
  .flex.flex-col.items-stretch(v-else-if='path == `searchResult`')
    //- 查無結果
    .flex.flex-col.items-center.mt-12(v-if='searchResultEmpty')
      //- 圖示
      img.w-18.h-18(:src='iconEmptySearch')

      //- 提示
      .mt-6.body2.text-primary.opacity-40 {{ t("help_empty") }}

    //- 搜尋分類列表
    CategoryItem(v-else, :item='searchResult', @click-faq='handleFaqClick')

  //- 問答
  .flex.flex-col.items-stretch(v-else-if='path == `faq`')
    //- 導覽路徑
    BreadCrumbs(:list='pathStack', @click-path='handlePathClick')

    //- 標題
    .headline1.text-primary.p-4 {{ faqItem.title }}

    //- 影片
    video(v-if='faqItem.isVideo', controls)
      source(:src='faqItem.videoUrl', type='video/mp4')

    //- 內容
    .body1.text-primary.p-4(v-html='faqItem.content')
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Field } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import faq from '@static/json/faq.json';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import FaqItem from '@/components/help-center/FaqItem.vue';
  import BreadCrumbs from '@/components/help-center/BreadCrumbs.vue';
  import CategoryItem from '@/components/help-center/CategoryItem.vue';
  import type { FaqItemClass } from '@/components/help-center/FaqItem.vue';
  import type { CategoryItemClass } from '@/components/help-center/CategoryItem.vue';
  import type { Path, PathStackItem } from '@/components/help-center/BreadCrumbs.vue';

  /**
   * Static icons
   */
  const iconSearchPrimary = staticImgUrl('icon-search-primary.svg');
  const iconBurgerPrimary = staticImgUrl('icon-burger-primary.svg');
  const iconClosePrimary = staticImgUrl('icon-close-primary.svg');
  const iconEmptySearch = staticImgUrl('icon-empty-search.svg');

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Current path
   */
  const path = ref<Path>('index');

  /**
   * Path stack
   */
  const pathStack = ref<PathStackItem[]>([{ path: path.value }]);

  /**
   * Search keyword
   */
  const searchKeyword = ref('');

  /**
   * Push path
   */
  const pushPath = (newPath: Path, faqData?: FaqItemClass, categoryData?: CategoryItemClass) => {
    // Update current path
    path.value = newPath;

    // First of path
    if (newPath == 'index' || newPath == 'menu' || newPath == 'searchResult') {
      pathStack.value = [
        {
          path: newPath,
        },
      ];
    } else {
      pathStack.value[pathStack.value.length] = {
        path: newPath,
        faqData,
        categoryData,
      };
    }
  };

  /**
   * Get faq list
   */
  const getFaqList = (categoryName?: string) => {
    return faq.data.filter((item) => {
      const itemCategoryName = item.categoryName || '';
      return itemCategoryName.length > 0 && itemCategoryName.indexOf(categoryName || '') > 0;
    });
  };

  /**
   * Index list
   */
  const indexList = ref<CategoryItemClass[]>([
    {
      id: 5,
      categoryName: t('help_general_problem'),
      faqList: getFaqList(t('help_general_problem')),
    },
    {
      id: 4,
      categoryName: t('help_account_problem'),
      faqList: getFaqList(t('help_account_problem')),
    },
  ]);

  /**
   * Menu list
   */
  const menuList = ref<CategoryItemClass[]>([
    {
      id: 0,
      categoryName: t('help_index'),
    },
    {
      id: 1,
      categoryName: t('help_learn_game'),
    },
    {
      id: 2,
      categoryName: t('help_browsing_problem'),
    },
    {
      id: 3,
      categoryName: t('help_funding_problem'),
    },
    {
      id: 4,
      categoryName: t('help_account_problem'),
    },
    {
      id: 5,
      categoryName: t('help_general_problem'),
    },
    {
      categoryName: t('help_game_problem'),
    },
    {
      categoryName: t('help_vip_problem'),
    },
  ]);

  /**
   * Menu detail
   */
  const menuDetail = ref<CategoryItemClass>({});

  /**
   * Search result
   */
  const searchResult = ref<CategoryItemClass>({});

  /**
   * Faq
   */
  const faqItem = ref<FaqItemClass>({});

  /**
   * Display close icon or not
   */
  const displayClose = computed(() => {
    return path.value == `menu` || path.value == `menuDetail` || path.value == `searchResult`;
  });

  /**
   * Search result empty
   */
  const searchResultEmpty = computed(() => {
    const faqList = searchResult.value.faqList || [];
    return faqList.length == 0;
  });

  /**
   * Handle update search keyword
   */
  const handleUpdateSearchKeyword = (keyword?: string) => {
    searchKeyword.value = keyword || '';
    if (keyword && keyword.length > 0) {
      const faqList = faq.data.filter((item) => {
        const itemTitle = item.title || '';
        return itemTitle.length > 0 && itemTitle.indexOf(keyword || '') > 0;
      });
      searchResult.value = {
        categoryName: t('help_search_result'),
        faqList,
      };
      pushPath(`searchResult`);
    } else {
      searchResult.value = {};
      pushPath(`index`);
    }
  };

  /**
   * Handle menu button clicked
   */
  const handleMenuClick = () => {
    pushPath('menu');
  };

  /**
   * Handle close button clicked
   */
  const handleCloseClick = () => {
    searchKeyword.value = '';
    pushPath('index');
  };

  /**
   * Handle category click
   */
  const handleCategoryClick = (item?: CategoryItemClass) => {
    if (item?.id == 0) {
      pushPath('index');
    } else {
      menuDetail.value = {
        ...item,
        faqList: getFaqList(item?.categoryName),
      };
      pushPath('menuDetail', undefined, item);
    }
  };

  /**
   * Handle faq click
   */
  const handleFaqClick = (item?: FaqItemClass) => {
    faqItem.value = item || {};
    pushPath('faq', item);
  };

  /**
   * Handle path click
   */
  const handlePathClick = (item: PathStackItem) => {
    // Update current path
    path.value = item.path;

    // Drop the path stack after clicked item
    const pathIndex = pathStack.value.findIndex((element) => {
      return element.path == item.path;
    });
    pathStack.value.splice(pathIndex + 1, pathStack.value.length - pathIndex - 1);
  };
</script>

<style scoped lang="scss">
  .grid-cols-field {
    grid-template-columns: auto 1fr auto auto;
  }

  .bg-field {
    background-color: rgba(7, 31, 68, 0.03);
  }
</style>
