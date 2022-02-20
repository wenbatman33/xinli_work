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
    name: 'DepositStatus',
    props: {
      status: {
        type: Number,
      },
    },
    setup(props) {
      // Chinese status text
      const cn = computed(() => {
        if (props.status === 1) {
          return '处理中';
        } else if (props.status === 2) {
          return '失败';
        } else if (props.status === 3) {
          return '完成';
        } else {
          return props.status;
        }
      });

      // English status text
      const en = computed(() => {
        if (props.status === 1) {
          return 'progressing';
        } else if (props.status === 2) {
          return 'Fail';
        } else if (props.status === 3) {
          return 'Success';
        } else {
          return '';
        }
      });

      // Text color
      const color = computed(() => {
        if (props.status === 1) {
          return ColorEnum.WARNING;
        } else if (props.status === 2) {
          return ColorEnum.ERROR;
        } else if (props.status === 3) {
          return ColorEnum.SUCCESS;
        } else {
          return ColorEnum.DEFAULT;
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
