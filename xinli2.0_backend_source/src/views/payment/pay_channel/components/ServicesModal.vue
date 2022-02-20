<template>
  <!-- Services modal start -->
  <BasicModal
    :visible="visible"
    :title="title"
    :footer="null"
    width="80%"
    @update:visible="updateVisible"
  >
    <!-- Services table start -->
    <BasicTable @register="registerTable">
      <!-- Table groups column start -->
      <template #groups="{ record: channelRecord }">
        <Tag v-for="item in channelRecord.groups" :key="item.key" class="m-1" color="green">
          {{ item.value }}
        </Tag>
      </template>
      <!-- Table groups column start -->

      <!-- Table status column start -->
      <template #status="{ text }">
        <ServiceStatus :status="text" />
      </template>
      <!-- Table status column end -->
    </BasicTable>
    <!-- Services table end -->
  </BasicModal>
  <!-- Services modal end -->
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getService } from '/@/api/payment/payChannelService';
  import { PayChannelItem } from '/@/api/payment/model/payChannelModel';
  import ServiceStatus from './ServiceStatus.vue';
  import { servicesColumns } from './tableData';

  export default defineComponent({
    name: 'ServicesModal',
    components: {
      Tag,
      BasicModal,
      BasicTable,
      ServiceStatus,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<PayChannelItem>,
      },
    },
    emits: ['update:visible'],
    setup(props, { emit }) {
      // Title
      const title = computed(() => {
        return `${props.record?.sn} 线路列表`;
      });

      // Data table definition
      const [registerTable, { reload }] = useTable({
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: false,
        canResize: false,
        bordered: true,
        columns: servicesColumns,
        pagination: {
          pageSize: 50,
          hideOnSinglePage: true,
        },
        api: async () => {
          const response = await getService({
            payChannelID: props.record?.id,
          });
          return response.list || [];
        },
      });

      // Update visible
      const updateVisible = (visible) => {
        emit('update:visible', visible);
      };

      // Watch visible state changed
      watch(
        () => props.visible,
        (visible) => {
          if (visible) {
            reload();
          }
        }
      );
      return {
        title,
        registerTable,
        updateVisible,
      };
    },
  });
</script>
