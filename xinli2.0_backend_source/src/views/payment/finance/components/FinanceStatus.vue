<template>
  <!-- Finance status start -->
  <span :style="style">{{ content }}</span>
  <!-- Finance status end -->
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { ColorEnum } from '/@/enums/colorEnum';

  export default defineComponent({
    name: 'FinanceStatus',
    props: {
      status: {
        type: Number,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        if (props.status === 1) {
          return '开启';
        } else {
          return '关闭';
        }
      });

      // Text color
      const color = computed(() => {
        if (props.status === 1) {
          return ColorEnum.SUCCESS;
        } else {
          return ColorEnum.ERROR;
        }
      });

      // Style
      const style = computed(() => {
        return {
          color: color.value,
        };
      });
      return {
        content,
        style,
      };
    },
  });
</script>
