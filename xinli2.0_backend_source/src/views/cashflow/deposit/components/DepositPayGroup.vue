<template>
  <span>{{ content }}</span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';

  export default defineComponent({
    name: 'DepositPayGroup',
    props: {
      payGroupId: {
        type: Number,
      },
      payGroups: {
        type: Array as PropType<GetPayGroupsResponse[]>,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        const list = props.payGroups || [];
        const item =
          list.find((element) => {
            return element.ID === props.payGroupId;
          }) || {};
        return item.name || '';
      });
      return {
        content,
      };
    },
  });
</script>
