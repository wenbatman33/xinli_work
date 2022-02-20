<template>
  <div class="flex flex-col items-center" :style="style">
    <span>{{ cn }}</span>
    <span>{{ en }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { ColorEnum } from '/@/enums/colorEnum';
  import { KeyValueItem } from '/@/api/cashflow/model/withdrawalModel';

  export default defineComponent({
    name: 'WithdrawalStatus',
    props: {
      status: {
        type: Object as PropType<KeyValueItem>,
      },
    },
    setup(props) {
      // Chinese status text
      const cn = computed(() => {
        if (props.status?.key === 1) {
          return '待审核';
        } else if (props.status?.key === 2) {
          return '待出款';
        } else if (props.status?.key === 3) {
          return '退回';
        } else if (props.status?.key === 4) {
          return '出款中';
        } else if (props.status?.key === 5) {
          return '完成';
        } else if (props.status?.key === 6) {
          return '出款失败';
        } else {
          return props.status;
        }
      });

      // English status text
      const en = computed(() => {
        if (props.status?.key === 1) {
          return 'review';
        } else if (props.status?.key === 2) {
          return 'Ｗait';
        } else if (props.status?.key === 3) {
          return 'reject';
        } else if (props.status?.key === 4) {
          return 'Paying';
        } else if (props.status?.key === 5) {
          return 'Success';
        } else if (props.status?.key === 6) {
          return 'fail';
        } else {
          return '';
        }
      });

      // Text color
      const color = computed(() => {
        if (props.status?.key === 1) {
          return ColorEnum.WARNING;
        } else if (props.status?.key === 2) {
          return ColorEnum.WARNING;
        } else if (props.status?.key === 3) {
          return ColorEnum.INFO;
        } else if (props.status?.key === 4) {
          return ColorEnum.WARNING;
        } else if (props.status?.key === 5) {
          return ColorEnum.SUCCESS;
        } else if (props.status?.key === 6) {
          return ColorEnum.ERROR;
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
