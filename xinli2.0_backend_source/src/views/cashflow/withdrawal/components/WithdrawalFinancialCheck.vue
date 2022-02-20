<template>
  <Tag class="m-1" :style="style">{{ content }}</Tag>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { ColorEnum } from '/@/enums/colorEnum';
  import { KeyValueItem } from '/@/api/cashflow/model/withdrawalModel';

  export default defineComponent({
    name: 'WithdrawalFinancialCheck',
    components: {
      Tag,
    },
    props: {
      financialCheck: {
        type: Object as PropType<KeyValueItem>,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        if (props.financialCheck?.key === 1) {
          return '待审核\nreview';
        } else if (props.financialCheck?.key === 2) {
          return '退回\nreject';
        } else if (props.financialCheck?.key === 3) {
          return '完成\nsuccess';
        } else if (props.financialCheck?.key === 6) {
          return '审核中\nreviewing';
        } else {
          return props.financialCheck?.value;
        }
      });

      // Color
      const color = computed(() => {
        if (props.financialCheck?.key === 1) {
          return ColorEnum.WARNING;
        } else if (props.financialCheck?.key === 2) {
          return ColorEnum.INFO;
        } else if (props.financialCheck?.key === 3) {
          return ColorEnum.SUCCESS;
        } else if (props.financialCheck?.key === 6) {
          return ColorEnum.WARNING;
        } else {
          return ColorEnum.DEFAULT;
        }
      });

      // Style
      const style = computed(() => {
        return {
          color: color.value,
          border: `1px solid ${color.value}`,
          background: '#00000000',
          whiteSpace: 'pre-wrap !important',
        };
      });
      return {
        content,
        style,
      };
    },
  });
</script>
