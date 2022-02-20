<template>
  <Tag class="m-1" :style="style">{{ content }}</Tag>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { ColorEnum } from '/@/enums/colorEnum';
  import { KeyValueItem } from '/@/api/cashflow/model/withdrawalModel';

  export default defineComponent({
    name: 'WithdrawalRiskCheck',
    components: {
      Tag,
    },
    props: {
      riskCheck: {
        type: Object as PropType<KeyValueItem>,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        if (props.riskCheck?.key === 1) {
          return '待審核\nreview';
        } else if (props.riskCheck?.key === 2) {
          return '退回\nreject';
        } else if (props.riskCheck?.key === 3) {
          return '完成\nsuccess';
        } else if (props.riskCheck?.key === 4) {
          return '';
        } else {
          return props.riskCheck?.value;
        }
      });

      // Color
      const color = computed(() => {
        if (props.riskCheck?.key === 1) {
          return ColorEnum.WARNING;
        } else if (props.riskCheck?.key === 2) {
          return ColorEnum.INFO;
        } else if (props.riskCheck?.key === 3) {
          return ColorEnum.SUCCESS;
        } else if (props.riskCheck?.key === 4) {
          return ColorEnum.DEFAULT;
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
