<template>
  <div class="flex flex-col items-center" :style="style">
    <span>{{ cn }}</span>
    <span>{{ en }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { ColorEnum } from '/@/enums/colorEnum';

  export default defineComponent({
    name: 'PayoutNaviPaying',
    props: {
      paying: {
        type: Boolean,
      },
    },
    setup(props) {
      // Chinese text
      const cn = computed(() => {
        if (props?.paying === true) {
          return '出款中';
        } else {
          return '空闲';
        }
      });

      // English text
      const en = computed(() => {
        if (props?.paying === true) {
          return 'paying';
        } else {
          return 'available';
        }
      });

      // Text color
      const color = computed(() => {
        if (props?.paying === true) {
          return ColorEnum.WARNING;
        } else {
          return ColorEnum.SUCCESS;
        }
      });

      // Style
      const style = computed(() => {
        return {
          color: color.value,
        };
      });
      return {
        cn,
        en,
        style,
      };
    },
  });
</script>
