<template>
  <Switch :checked="checked" @click="handleStatusClick" />
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Switch } from 'ant-design-vue';
  import { putPayoutNaviStatus } from '/@/api/cashflow/withdrawal';

  export default defineComponent({
    name: 'PayoutNaviStatus',
    components: {
      Switch,
    },
    props: {
      id: {
        type: Number,
      },
      status: {
        type: Number,
      },
    },
    emits: ['reload'],
    setup(props, { emit }) {
      // Checked
      const checked = computed(() => {
        return props?.status === 1;
      });

      // Handle status switch clicked
      const handleStatusClick = async () => {
        await putPayoutNaviStatus({
          id: props?.id,
          status: props?.status === 1 ? 2 : 1,
        });
        emit('reload');
      };
      return {
        checked,
        handleStatusClick,
      };
    },
  });
</script>
