<template lang="pug">
//- 導覽路徑
.flex.flex-row.items-start.p-4
  template(v-for='(item, index) in (list || [])')
    //- 路徑
    .subtitle3.text-accent(v-if='!lastIndex(index)', @click='handlePathClick(item)') {{ getPathName(item) }}

    //- 路徑(最後一筆)
    .subtitle3.text-primary.opacity-40(v-else) {{ getPathName(item) }}

    //- 箭頭
    .subtitle3.text-primary.opacity-40.px-2(v-if='!lastIndex(index)') ＞
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { FaqItemClass } from '@/components/help-center/FaqItem.vue';
  import type { CategoryItemClass } from '@/components/help-center/CategoryItem.vue';
import { emit } from 'process';

  /**
   * Path
   */
  export type Path = 'index' | 'menu' | 'menuDetail' | 'searchResult' | 'faq';

  /**
   * Path stack item
   */
  export interface PathStackItem {
    path: Path;
    faqData?: FaqItemClass;
    categoryData?: CategoryItemClass;
  }

  /**
   * Component props interface
   */
  interface Props {
    list?: PathStackItem[];
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Path clicked
     */
    (e: 'clickPath', item: PathStackItem): void;
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
   * Check index is last of list
   */
  const lastIndex = (index: number) => {
    const list = props.list || [];
    return index == list.length - 1;
  };

  /**
   * Get path
   */
  const getPathName = (item: PathStackItem) => {
    if (item.path == 'index') {
      return t('help_index');
    } else if (item.path == 'menu') {
      return t('help_menu');
    } else if (item.path == 'menuDetail') {
      return item?.categoryData?.categoryName || '-';
    } else if (item.path == 'searchResult') {
      return t('help_search_result');
    } else if (item.path == 'faq') {
      return item?.faqData?.title || '-';
    } else {
      return '-';
    }
  };

  /**
   * Handle path clicked
   */
  const handlePathClick = (path: PathStackItem) => {
    emits('clickPath', path)
  };
</script>
