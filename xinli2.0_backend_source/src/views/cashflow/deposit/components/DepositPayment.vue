<template>
  <span>{{ content }}</span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { DropdownItem } from '/@/api/payment/model/payChannelServiceModel';

  export default defineComponent({
    name: 'DepositPayment',
    props: {
      payment: {
        type: String,
      },
      methods: {
        type: Array as PropType<DropdownItem[]>,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        const list = props.methods || [];
        const item =
          list.find((element) => {
            const key = Object.keys(element)[0];
            return key === props.payment;
          }) || {};
        return Object.values(item)[0] || props.payment || '';
      });
      return {
        content,
      };
    },
  });
</script>
