<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable
      size="small"
      :dataSource="state.gameGroupsList"
      @register="gameGroupTable"
      :searchInfo="searchInfo"
      :loading="loading"
    >
      <template #gameGroups="{ record }">
        <span v-for="item in record.gameGroups" :key="item">{{ item + ' ' }} </span>
      </template>
      <template #gameLists="{ record }">
        <span v-for="item in record.gameLists" :key="item">{{ item + ' ' }} </span>
      </template>
      <template #status="{ record }">
        <Tag :color="statusColorMapping[record.status]">
          {{ statusMapping[record.status] }}
        </Tag>
      </template>
      <template #imageH5="{ record }">
        <img :src="apiUrl + '/file/' + record.imageH5" class="app-loading-logo" />
      </template>
      <template #imagePc="{ record }">
        <img :src="apiUrl + '/file/' + record.imagePc" class="app-loading-logo" />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleActive.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>

    <Modal1 @register="gamegroup" :minHeight="100" @reload="reloadEmit" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, onMounted, computed, ref } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { Tag } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import Modal1 from './components/Modal1.vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns } from './components/tableData';
  import { FormProps } from '/@/components/Form';
  import { getGameAgencyList } from '/@/api/game/gamegroup';
  import { ArrayItem } from '/@/api/game/model/gameModel';
  import { getGameListType } from '/@/api/game/gamelist';
  import { FormSchema } from '/@/components/Form';

  interface State {
    loading: boolean;
    searching: boolean;
    gameGroupsList: any;
    gameTypeList: ArrayItem[];
  }
  export default defineComponent({
    components: {
      Modal1,
      PageWrapper,
      BasicTable,
      TableAction,
      Tag,
    },
    setup() {
      const [gamegroup, { openModal: openModal1 }] = useModal();
      const globSetting = useGlobSetting();
      const apiUrl = globSetting.apiUrl;
      const loading = ref(false);
      const searchInfo = reactive<Recordable>({});
      const statusMapping = {
        0: '全部',
        1: '关闭',
        2: '开启',
      };
      const statusColorMapping = {
        0: 'yellow',
        1: '#f50',
        2: '#87d068',
      };
      const searchSchemas = (gameTypeList: ArrayItem[]): FormSchema[] => {
        return [
          {
            field: 'name',
            component: 'Input',
            label: '代理商名称',
            componentProps: {
              placeholder: '请输入厂商原始名称',
            },
          },
          {
            field: 'gameTypeID',
            component: 'Select',
            label: '游戏类型',
            componentProps: {
              options: gameTypeList.map((element) => {
                return {
                  label: element.value,
                  value: element.key,
                  key: element.key,
                };
              }),
            },
          },
          {
            field: 'status',
            component: 'Select',
            label: '状态',
            defaultValue: 0,
            componentProps: {
              options: [
                {
                  label: '关闭',
                  value: 1,
                  key: 1,
                },
                {
                  label: '开启',
                  value: 2,
                  key: 2,
                },
                {
                  label: '全部',
                  value: 0,
                  key: 0,
                },
              ],
            },
          },
        ];
      };

      // Component state
      const state = reactive<State>({
        loading: false,
        searching: false,
        gameGroupsList: [],
        gameTypeList: [],
      });
      const fetchGameGroupOption = async () => {
        const data = await getGameListType();
        state.gameTypeList = data?.list || [];
      };

      // Form config
      const formConfig = computed<FormProps>(() => {
        return {
          labelWidth: 70,
          showResetButton: false,
          showAdvancedButton: false,
          schemas: searchSchemas(state.gameTypeList),
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
      const [gameGroupTable, { reload }] = useTable({
        api: async (args: Object) => {
          try {
            const query = Object.assign({}, args);
            Object.keys(query).forEach((key) => {
              if (query[key] === undefined || query[key] === '') {
                delete query[key];
              }
            });
            const response = await getGameAgencyList(query);
            return response?.list || [];
          } catch (e) {
            // Exception handle by http utils
          } finally {
            // Revert loading state
            loading.value = false;
          }
        },
        showIndexColumn: false,
        columns: tableColumns,
        useSearchForm: true,
        formConfig: formConfig,
        canResize: true,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: {
            customRender: 'action',
          },
          fixed: undefined,
        },
      });

      // Handle active button clicked
      const handleActive = (record: Recordable) => {
        //console.warn('record', record.gameTypeList);
        openModal1(true, {
          id: record.id,
          name: record.name,
          gameGroups: record.gameGroups,
          gameLists: record.gameLists,
          status: record.status,
          srcH5: apiUrl + '/file/' + record.imageH5,
          srcPc: apiUrl + '/file/' + record.imagePc,
          imageH5: record.imageH5,
          imagePc: record.imagePc,
        });
        record.active = !record.active;
      };
      onMounted(() => {
        fetchGameGroupOption();
      });

      const reloadEmit = () => {
        reload();
      };

      return {
        gamegroup,
        openModal1,
        tableColumns,
        state,
        searchInfo,
        gameGroupTable,
        handleActive,
        statusMapping,
        statusColorMapping,
        apiUrl,
        reloadEmit,
        loading,
      };
    },
  });
</script>
