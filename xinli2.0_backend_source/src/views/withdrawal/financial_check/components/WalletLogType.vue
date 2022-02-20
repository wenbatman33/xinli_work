<template>
  <Tag class="m-1" :style="style">{{ content }}</Tag>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { UseType } from '/@/api/money/model/moneyModel';

  export default defineComponent({
    name: 'WalletLogType',
    components: {
      Tag,
    },
    props: {
      type: {
        type: Number,
      },
      useTypeList: {
        type: Array as PropType<UseType[]>,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        const useType = props?.useTypeList?.find((useType) => {
          return useType.useTypeID == props?.type;
        });
        if (useType) {
          return useType.useTypeName;
        } else {
          return props.type;
        }
      });

      // Color
      const color = computed(() => {
        if (props.type == 1) {
          return '#01A39D';
        } else if (props.type == 2) {
          return '#404244';
        } else if (props.type == 3) {
          return '#FF3857';
        } else if (props.type == 4) {
          return '#D0C9D6';
        } else if (props.type == 6) {
          return '#F0453A';
        } else if (props.type == 7) {
          return '#F0453A';
        } else if (props.type == 10) {
          return '#01A39D';
        } else if (props.type == 11) {
          return '#D0C9D6';
        } else if (props.type == 12) {
          return '#D0C9D6';
        } else if (props.type == 13) {
          return '#D0C9D6';
        } else if (props.type == 14) {
          return '#D0C9D6';
        } else if (props.type == 15) {
          return '#D0C9D6';
        } else if (props.type == 16) {
          return '#D0C9D6';
        } else {
          return props.type;
        }
      });

      // Style
      const style = computed(() => {
        return {
          color: color.value,
          border: `1px solid ${color.value}`,
          background: '#00000000',
          whiteSpace: 'pre-wrap',
        };
      });
      return {
        content,
        style,
      };
    },
  });
</script>
