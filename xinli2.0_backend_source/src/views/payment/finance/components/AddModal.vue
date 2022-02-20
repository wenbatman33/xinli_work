<template>
  <!-- Add modal start -->
  <BasicModal
    :visible="visible"
    :loading="state.loading"
    :title="title"
    :footer="null"
    width="80%"
    @update:visible="updateVisible"
  >
    <!-- Channel table start -->
    <BasicTable size="small" @register="registerTable">
      <!-- Table groups column start -->
      <template #groups="{ record: channelRecord }">
        <Tag v-for="(item, index) in channelRecord.groups" :key="index" class="m-1" color="green">
          {{ item }}
        </Tag>
      </template>
      <!-- Table groups column start -->

      <!-- Table status column start -->
      <template #status="{ text }">
        <ChannelStatus :status="text" />
      </template>
      <!-- Table status column end -->

      <!-- Table action column start -->
      <template #action="{ record: channelRecord }">
        <AddAction :channelRecord="channelRecord" :financeRecord="record" @reload="reload" />
      </template>
      <!-- Table action column end -->
    </BasicTable>
    <!-- Channel table end -->
  </BasicModal>
  <!-- Add modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watch } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FormProps } from '/@/components/Form';
  import { getChannel } from '/@/api/payment/finance';
  import { DropdownItem } from '/@/api/payment/model/payChannelServiceModel';
  import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';
  import { addColumns, FinanceRecord } from './tableData';
  import { addSchemas } from './formSchemas';
  import ChannelStatus from './ChannelStatus.vue';
  import AddAction from './AddAction.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Create loading */
    loading: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'AddModal',
    components: {
      Tag,
      BasicModal,
      BasicTable,
      ChannelStatus,
      AddAction,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<FinanceRecord>,
      },
      serviceCodes: {
        type: Array as PropType<DropdownItem[]>,
      },
      payGroups: {
        type: Array as PropType<GetPayGroupsResponse[]>,
      },
      bankcardGroups: {
        type: Array as PropType<GetPayGroupsResponse[]>,
      },
    },
    emits: ['update:visible', 'reload', 'register'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        loading: false,
      });

      // Title
      const title = computed(() => {
        const name = props.record?.name || '';
        return `充值显示管理\\${name} 加入`;
      });

      // Form config
      const formConfig = computed<FormProps>(() => {
        const serviceCodes = props.serviceCodes || [];
        const payGroups = props.payGroups || [];
        const bankcardGroups = props.bankcardGroups || [];
        return {
          showResetButton: false,
          showAdvancedButton: false,
          schemas: addSchemas(serviceCodes, payGroups, bankcardGroups),
          autoSubmitOnEnter: true,
          baseColProps: {
            style: {
              width: 'auto',
              padding: '0px 4px',
            },
            flex: 'auto',
          },
          labelCol: {
            style: {
              width: 'auto',
              padding: '0px 8px',
            },
          },
        };
      });

      // Data table definition
      const [registerTable, { reload: reloadTable }] = useTable({
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: true,
        canResize: false,
        bordered: true,
        columns: addColumns,
        formConfig: formConfig,
        pagination: {
          pageSize: 50,
        },
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: {
            customRender: 'action',
          },
        },
        api: async (args) => {
          const query = Object.assign({}, args);
          Object.keys(query).forEach((key) => {
            if (query[key] === undefined || query[key] === '' || query[key] === 0) {
              delete query[key];
            }
          });
          const response = await getChannel({
            ...query,
            financeID: props.record?.id,
          });
          const list = response.list || [];
          const existsList = props.record?.services || [];
          return list.filter((element) => {
            return (
              existsList.find((existsElement) => {
                return existsElement.id === element.id;
              }) === undefined
            );
          });
        },
      });

      // Update visible property
      const updateVisible = (visible) => {
        emit('update:visible', visible);
      };

      // Reload finance list
      const reload = () => {
        emit('reload');
      };

      // Watch record channel list changed
      watch(
        () => props.record?.services,
        () => {
          reloadTable();
        }
      );

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
        state,
        title,
        registerTable,
        updateVisible,
        reload,
      };
    },
  });
</script>
