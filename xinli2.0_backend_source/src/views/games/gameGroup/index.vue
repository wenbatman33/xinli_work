<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable
      size="small"
      :dataSource="state.gameGroupsList"
      @register="gameGroupTable"
      :searchInfo="searchInfo"
      :loading="loading"
    >
      <template #walletType="{ record }">
        {{ walletTypeMapping[record.walletType] }}
      </template>
      <!-- <template #currencyTypeList="{ record }">
        <template v-for="item in record.currencyTypeList" :key="item.key">
          <Tag color="green" style="margin-right: 5px">
            {{ item.value }}
          </Tag>
        </template>
      </template> -->
      <template #currencyTypes="{ record }">
        <!-- <template v-for="item in record.currencyTypes" :key="item.key">
          <Tag color="green" style="margin-right: 5px">
            {{ item.value }}
          </Tag>
        </template> -->
        {{ record.currencyTypes }}
      </template>
      <template #gameType="{ record }">
        <span>{{ record.gameType.name }} </span>
      </template>
      <template #openWay="{ record }">
        {{ openWayMapping[record.openWay] }}
      </template>
      <template #status="{ record }">
        <Tag :color="statusColorMapping[record.status]">
          {{ statusMapping[record.openWay] }}
        </Tag>
      </template>
      <template #imageH5="{ record }">
        <Image
          v-if="record.imageH5"
          style="width: 100%; border-radius: 4px"
          :src="apiUrl + '/file/' + record.imageH5"
          :fallback="errorImg"
        />
      </template>
      <template #imagePc="{ record }">
        <Image
          v-if="record.imagePc"
          style="width: 100%; border-radius: 4px"
          :src="apiUrl + '/file/' + record.imagePc"
          :fallback="errorImg"
        />
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
  import { Tag, Image } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import Modal1 from './components/Modal1.vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { searchSchemas } from './components/searchSchemas';
  import { tableColumns } from './components/tableData';
  import { FormProps } from '/@/components/Form';
  import { getGameListType } from '/@/api/game/gamelist';
  import { getGameGroups, getGameAgencyOption } from '/@/api/game/gamegroup';
  import { GameGroupOptionItem, ArrayItem } from '/@/api/game/model/gameModel';

  interface State {
    loading: boolean;
    searching: boolean;
    gameGroupsList: any;
    agencyTypeList: GameGroupOptionItem[];
    gameTypeList: ArrayItem[];
  }
  export default defineComponent({
    components: {
      Modal1,
      PageWrapper,
      BasicTable,
      TableAction,
      Tag,
      Image,
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
        3: '维护中',
      };
      const walletTypeMapping = {
        0: '全部',
        1: '單一',
        2: '转帐',
      };
      const openWayMapping = {
        1: '游戏大厅',
        2: '游戏列表',
        3: '进入游戏',
      };
      const statusColorMapping = {
        0: 'yellow',
        1: '#f50',
        2: '#87d068',
        3: 'yellow',
      };
      const errorImg =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==';
      // Component state
      const state = reactive<State>({
        loading: false,
        searching: false,
        gameGroupsList: [],
        agencyTypeList: [],
        gameTypeList: [],
      });
      const fetchGameGroupOption = async () => {
        const data = await getGameAgencyOption();
        state.agencyTypeList = data?.list || [];
      };
      const fetchGameTypeListOption = async () => {
        const data = await getGameListType();
        state.gameTypeList = data?.list || [];
      };

      // Form config
      const formConfig = computed<FormProps>(() => {
        return {
          labelWidth: 70,
          showResetButton: false,
          showAdvancedButton: false,
          schemas: searchSchemas(state.gameTypeList, state.agencyTypeList),
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
            const response = await getGameGroups(query);
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
        //console.warn('record', record.currencyTypeList);
        openModal1(true, {
          id: record.id,
          gameAgencyName: record.gameAgencyName,
          walletType: walletTypeMapping[record.walletType],
          openWay: openWayMapping[record.openWay],
          name: record.name,
          displayName: record.displayName,
          currencyTypeList: record.currencyTypes,
          gameTypeID: record.gameType.id,
          gameTypeName: record.gameType.name,
          sort: record.sort,
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
        fetchGameTypeListOption();
      });

      const reloadEmit = () => {
        reload();
      };

      return {
        gamegroup,
        openModal1,
        tableColumns,
        walletTypeMapping,
        state,
        searchInfo,
        gameGroupTable,
        handleActive,
        statusMapping,
        statusColorMapping,
        apiUrl,
        reloadEmit,
        openWayMapping,
        loading,
        errorImg,
      };
    },
  });
</script>
