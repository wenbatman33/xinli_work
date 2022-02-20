<template lang="pug">
//- 注單列表導覽欄
BasicNav.bg-primary.pb-4
  //- 左側
  template(#left)
    .pl-2
      .headline1.text-white {{ t("bet_title") }}

  //- 右側
  template(#right)
    //- 選單
    .pr-2
      BasicButton(bg='white20', size='small', rounded='full', @click='handleTimeClick')
        .flex.flex-row.items-center.p-1
          .body2.text-wihte {{ time?.name || "-" }}
          img.w-2.h-2.ml-2(:src='IconArrowDownWhite')
</template>

<script setup lang="ts">
  import { defineProps, defineEmit } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { staticImgUrl } from '@/utils';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Static icons
   */
  const IconArrowDownWhite = staticImgUrl('icon-arrow-down-white.svg');

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Selected time
     */
    time?: { id: number; name: string };
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Click time button
     */
    (e: 'clickTime'): void;
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
</script>
