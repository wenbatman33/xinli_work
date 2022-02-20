<template>
  <!-- Maintain status start -->
  <span :style="style">{{ content }}</span>
  <!-- Maintain status end -->
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { ColorEnum } from '/@/enums/colorEnum';

  export default defineComponent({
    name: 'FinanceStatus',
    props: {
      maintain: {
        type: Number,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        if (props.maintain === 1) {
          return '维护中';
        } else {
          return '正常';
        }
      });

      // Text color
      const color = computed(() => {
        if (props.maintain === 1) {
          return ColorEnum.ERROR;
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
        content,
        style,
      };
    },
  });
</script>
