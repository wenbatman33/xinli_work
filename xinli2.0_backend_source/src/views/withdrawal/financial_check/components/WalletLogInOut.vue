<template>
  <span>{{ content }}</span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { InOutType } from '/@/api/money/model/moneyModel';

  export default defineComponent({
    name: 'WalletLogInOut',
    props: {
      inOut: {
        type: Number,
      },
      inOutTypeList: {
        type: Array as PropType<InOutType[]>,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        const inOutType = props?.inOutTypeList?.find((inOutType) => {
          return inOutType.inOutTypeID == props?.inOut;
        });
        if (inOutType) {
          return inOutType.inOutTypeName;
        } else {
          return props.inOut;
        }
      });

      return {
        content,
      };
    },
  });
</script>
