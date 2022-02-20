<template lang="pug">
//- 基礎分類
.w-full.overflow-x-auto(ref='container', :class='content')
  //- 分類列表
  BasicButton.px-4.pt-2.pb-1(v-for='(item, index) in (list || [])', rounded='normal', :class='`item-${index}`', :textColor='textColor', @click='handleCategoryClick($event, item)')
    //- 垂直排序
    .flex.flex-col.items-center
      //- 水平排列
      .flex.flex-row.justify-center.items-center
        //- 預覽
        p.w-0.invisible.headline2.whitespace-nowrap {{ item.name }}

        //- 文字
        p.transition-all.duration-300.whitespace-nowrap(:class='item.id === selected?.id ? "headline2" : "subtitle1 opacity-60"') {{ item.name }}

      //- 選中標記
      .w-4.h-1.mt-1.bg-accent.rounded-full.transition-opacity.duration-300(:class='item.id === selected?.id ? "opacity-100" : "opacity-0"')
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Category item interface
   */
  export interface CategoryItem {
    id: number;
    name: string;
  }

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Content
     */
    content?: 'flex' | 'grid';

    /**
     * Text color
     */
    textColor?: string;

    /**
     * Selected category
     */
    selected?: CategoryItem;

    /**
     * Category list
     */
    list?: CategoryItem[];
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update selected category
     */
    (e: 'update:selected', index: { id: number; name: string }): void;
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
   * Container
   */
  const container = ref<HTMLElement | undefined>();

  /**
   * Content
   */
  const content = computed(() => {
    if (props.content == 'grid') {
      const length = props?.list?.length || 1;
      return `grid grid-cols-${length} items-center`;
    } else {
      return 'flex flex-row flex-nowrap items-center pl-14';
    }
  });

  /**
   * Handle category item clicked
   * @param index Clicked index
   */
  const handleCategoryClick = (event: Event, item: CategoryItem) => {
    emit('update:selected', item);
  };

  /**
   * Watch selected category changed
   */
  watch(
    () => [container.value, props.list, props.selected],
    () => {
      setTimeout(() => {
        const list = props.list;
        const selected = props.selected;
        const containerElement = container.value;
        if (list && selected && containerElement) {
          const index = list.findIndex((element) => {
            return element.id == selected.id;
          });
          if (index >= 0) {
            const elements = container.value?.getElementsByClassName(`item-${index}`);
            if (elements) {
              const element = elements[0] as HTMLElement;
              if (element) {
                element.scrollIntoView({
                  block: 'start',
                  behavior: 'smooth',
                  inline: 'nearest',
                });
              }
            }
          }
        }
      }, 100);
    }
  );
</script>

<style scoped lang="scss">
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  .grid-cols-1 {
    grid-template-columns: 1fr;
  }

  .grid-cols-2 {
    grid-template-columns: 1fr 1fr;
  }

  .grid-cols-3 {
    grid-template-columns: 1fr 1fr;
  }

  .grid-cols-4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
</style>
