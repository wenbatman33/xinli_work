<template>
  <tbody ref="tbody">
    <slot></slot>
  </tbody>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, nextTick } from 'vue';
  import Sortable from './Sortable';

  export default defineComponent({
    name: 'SortableWrapper',
    emits: ['start', 'end'],
    setup(_props, { emit }) {
      const tbody = ref<any>(null);
      watch(
        () => tbody.value,
        () => {
          nextTick(() => {
            if (tbody.value) {
              Sortable.create(tbody.value, {
                swap: true,
                handle: '.handle',
                onStart: (evt) => {
                  emit('start', evt);
                },
                onEnd: (evt) => {
                  emit('end', evt);
                },
              });
            }
          });
        }
      );
      return {
        tbody,
      };
    },
  });
</script>
