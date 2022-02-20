<template lang="pug">
//- 交易紀錄導覽欄
.flex.flex-col.items-stretch.bg-white
  //- 導覽欄
  BasicNav.bg-white(:title='t("transaction")')
    //- 左側
    template(#left)
      //- 返回
      BackButton

    //- 右側
    template(#right)
      //- 時間
      BasicButton(bg='white20', size='small', rounded='full', @click='handleTimeClick')
        .flex.flex-row.items-center
          .body2.text-primary {{ time?.name || "-" }}
          img.w-2.h-2.ml-2(:src='iconTriangleDownPrimary')

  //- 分類列表
  BasicCategory(:selected='category', content='grid', textColor='primary', :list='categoryList', @update:selected='handleUpdateSelectedCategory')
</template>

<script setup lang="ts">
  import { defineProps, defineEmit, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import BasicCategory from '@/components/category/BasicCategory.vue';

  /**
   * Static icons
   */
  const iconTriangleDownPrimary = staticImgUrl('icon-triangle-down-primary.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Selected time
     */
    time?: { id: number; name: string };

    /**
     * Category list
     */
    categoryList?: { id: number; name: string }[];

    /**
     * Category selected
     */
    category?: { id: number; name: string };
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Click time button
     */
    (e: 'clickTime'): void;

    /**
     * Update selected category
     */
    (e: 'update:category', category: { id: number; name: string }): void;
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
   * Handle time button clicked
   */
  const handleTimeClick = () => {
    emit('clickTime');
  };

  /**
   * Handle update selected category
   */
  const handleUpdateSelectedCategory = (selected: { id: number; name: string }) => {
    emit('update:category', selected);
  };
</script>
