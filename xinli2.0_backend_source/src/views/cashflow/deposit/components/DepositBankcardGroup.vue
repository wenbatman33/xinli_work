<template>
  <span>{{ content }}</span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';

  export default defineComponent({
    name: 'DepositBankcardGroup',
    props: {
      bankcardGroupId: {
        type: Number,
      },
      bankcardGroups: {
        type: Array as PropType<GetPayGroupsResponse[]>,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        const list = props.bankcardGroups || [];
        const item =
          list.find((element) => {
            return element.ID === props.bankcardGroupId;
          }) || {};
        return item.name || '';
      });
      return {
        content,
      };
    },
  });
</script>
