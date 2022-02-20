<template>
  <!-- Table action start -->
  <TableAction :actions="actions" />
  <!-- Table action end -->
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { TableAction } from '/@/components/Table';
  import { postFinanceAdd, deleteChannel } from '/@/api/payment/finance';
  import { GetServiceResponse } from '/@/api/payment/model/payChannelServiceModel';
  import { FinanceRecord } from './tableData';

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'AddAction',
    components: {
      TableAction,
    },
    props: {
      channelRecord: {
        type: Object as PropType<GetServiceResponse>,
      },
      financeRecord: {
        type: Object as PropType<FinanceRecord>,
      },
    },
    emits: ['reload'],
    setup(props, { emit }) {
      // Action list
      const actions = computed(() => {
        const channelList = props.financeRecord?.services || [];
        const channelItem = channelList.find((element) => {
          return element.id === props.channelRecord?.id;
        });
        const containsChannel = channelItem !== undefined;
        return [
          {
            label: containsChannel ? '移除' : '加入',
            onClick: async () => {
              if (containsChannel) {
                // Delete channel
                const response = await deleteChannel({
                  financeID: props.financeRecord?.id,
                  payChannelServiceID: props.channelRecord?.id,
                });

                // Validate response
                if (response.success) {
                  // Notify add success
                  message.success(`${props.channelRecord?.name} 移除成功`);

                  // Reload finance list
                  emit('reload');
                } else {
                  // Notify error
                  message.error(`${props.channelRecord?.name} 移除失败`);
                }
              } else {
                // Add channel
                const response = await postFinanceAdd({
                  financeID: props.financeRecord?.id,
                  payChannelServiceID: props.channelRecord?.id,
                });

                // Validate response
                if (response.success) {
                  // Notify add success
                  message.success(`${props.channelRecord?.name} 加入成功`);

                  // Reload finance list
                  emit('reload');
                } else {
                  // Notify error
                  message.error(`${props.channelRecord?.name} 加入失败`);
                }
              }
            },
          },
        ];
      });
      return {
        actions,
      };
    },
  });
</script>
