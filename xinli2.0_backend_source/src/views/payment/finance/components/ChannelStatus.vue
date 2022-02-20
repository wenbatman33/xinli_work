<template>
  <!-- Channel status start -->
  <span :style="style">{{ content }}</span>
  <!-- Channel status end -->
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { ColorEnum } from '/@/enums/colorEnum';

  export default defineComponent({
    name: 'ChannelStatus',
    props: {
      status: {
        type: Number,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        if (props.status === 1) {
          return '启用';
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
