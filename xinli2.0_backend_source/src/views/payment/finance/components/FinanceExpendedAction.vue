<template>
  <!-- Table action start -->
  <TableAction :actions="actions" />
  <!-- Table action end -->
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { TableAction } from '/@/components/Table';
  import { deleteChannel } from '/@/api/payment/finance';
  import { putEditService } from '/@/api/payment/payChannelService';
  import { ChannelItem } from '/@/api/payment/model/financeModel';
  import { FinanceRecord } from './tableData';

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'FinanceExpendedAction',
    components: {
      TableAction,
    },
    props: {
      channelRecord: {
        type: Object as PropType<ChannelItem>,
      },
      financeRecord: {
        type: Object as PropType<FinanceRecord>,
      },
    },
    emits: ['reload'],
    setup(props, { emit }) {
      // Action list
      const actions = computed(() => {
        const targetAction = props.channelRecord?.status === 1 ? '停用' : '启用';
        const targetStatus = props.channelRecord?.status === 1 ? '0' : '1';
        return [
          {
            label: targetAction,
            onClick: async () => {
              // Edit pay channel service
              const response = await putEditService({
                id: String(props.channelRecord?.id),
                status: targetStatus,
                name: props.channelRecord?.name,
                payChannelID: props.channelRecord?.payChannelID,
                serviceCode: props.channelRecord?.serviceCode,
                note: props.channelRecord?.note,
                upperLimit: props.channelRecord?.upperLimit,
                lowerLimit: props.channelRecord?.lowerLimit,
                dayLimit: props.channelRecord?.dayLimit,
                fee: props.channelRecord?.fee,
                perFee: props.channelRecord?.perFee,
                method: props.channelRecord?.method,
              });

              // Validate response
              if (response.success) {
                // Notify success
                message.success(`${props.channelRecord?.name} ${targetAction}成功`);

                // Reload finance list
                emit('reload');
              } else {
                // Notify error
                message.error(`${props.channelRecord?.name} ${targetAction}失败`);
              }
            },
          },
          {
            label: '移除',
            onClick: async () => {
              // Remove finance channel
              const response = await deleteChannel({
                financeID: props.financeRecord?.id,
                payChannelServiceID: props.channelRecord?.id,
              });

              // Validate response
              if (response.success) {
                // Notify success
                message.success(`${props.channelRecord?.name} 移除成功`);

                // Reload finance list
                emit('reload');
              } else {
                // Notify error
                message.error(`${props.channelRecord?.name} 移除失败`);
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
