<template lang="pug">
//- 分類排序列表
.flex.flex-col.items-stretch(ref='list')
  //- 分類排序物件
  GameTypeSortListItem(v-for='item in gameTypeList || []', :gameType='item', :key='item.id')
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import Sortable from 'sortablejs';
  import GameTypeSortListItem from '@/components/lobby/GameTypeSortListItem.vue';
  import type { GameType } from '@/api/game/model/game-group-model';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Game type list
     */
    gameTypeList?: GameType[];
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update game type list
     */
    (e: 'update:gameTypeList', gameTypeList: GameType[]): void;
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
   * List dom
   */
  const list = ref<HTMLElement>();

  /**
   * Watch list dom changed
   */
  watch(
    () => list.value,
    (list) => {
      if (list) {
        Sortable.create(list, {
          swap: true,
          handle: '.cursor-move',
          animation: 150,
          onEnd: (evt) => {
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;
            if (oldIndex != undefined && newIndex != undefined) {
              const gameTypeList = props.gameTypeList || [];
              const temp = gameTypeList[oldIndex];
              gameTypeList.splice(oldIndex, 1);
              gameTypeList.splice(newIndex, 0, temp);
              emit('update:gameTypeList', gameTypeList);
            }
          },
        });
      }
    }
  );
</script>
