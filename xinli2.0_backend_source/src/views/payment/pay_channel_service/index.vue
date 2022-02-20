<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="serviceTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增线路</a-button>
      </template>

      <template #name="{ record }">
        <a class="mx-2" @click="showRowData(record)">
          {{ record.name }}
        </a>
      </template>

      <template #groups="{ record }">
        <Tag v-for="(item, key) in record.groups" :key="String(key)" class="m-1" color="green">
          {{ item.value }}
        </Tag>
      </template>
      <template #status="{ record }">
        <span v-if="String(record.status) === '1'" :style="`color:${ColorEnum.SUCCESS}`">启用</span>
        <span v-if="String(record.status) === '0'" :style="`color:${ColorEnum.ERROR}`">停用</span>
      </template>

      <template #action="{ record }">
        <TableAction
          :dropDownActions="[
            { label: '编辑', onClick: () => handleEdit(record) },
            { label: '组别设定', onClick: () => handleGetGroupExclude(record) },
            { label: '帐务明细', onClick: () => openNewWindow(record) },
          ]"
          :actions="changeStausActions(record)"
        />
      </template>
    </BasicTable>
    <ServiceModal
      :serviceCodeRef="serviceDropdownRes.serviceCode"
      :payChannelRef="serviceDropdownRes.payChannel"
      @register="editServiceModal"
      @success="handleSuccess"
    />
    <GroupsModal @register="editGroupsModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, computed, h } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { message, Tag } from 'ant-design-vue';
  import SortableWrapper from '/@/components/Sortable/SortableWrapper.vue';

  import { useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { tableColumns } from './components/tableData';
  import { searchSchemas } from './components/searchSchemas';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  // modal
  import ServiceModal from './components/ServiceModal.vue';
  import GroupsModal from './components/GroupsModal.vue';
  // type
  import type { TableActionType } from '/@/components/Table';
  import type { FormProps } from '/@/components/Form';
  import type { EditRecordRow, ActionItem } from '/@/components/Table';
  import { ColorEnum } from '/@/enums/colorEnum';

  import type {
    DropdownItem,
    GetServiceResponse,
    PutEditServiceParams,
  } from '/@/api/payment/model/payChannelServiceModel';

  // api
  import {
    getService,
    getServiceById,
    getServiceGroupsExclude,
    putEditService,
    putServiceSort,
    getChannelDropdown,
  } from '/@/api/payment/payChannelService';

  interface IState {
    dataList: GetServiceResponse[];
    oldIndex: number;
    newIndex: number;
    tableAction?: TableActionType;
  }

  const route = useRoute();
  const router = useRouter();

  const state = reactive<IState>({
    dataList: [],
    oldIndex: 0,
    newIndex: 0,
  });

  const serviceDropdownRes = reactive({
    serviceCode: [] as DropdownItem[],
    method: [] as DropdownItem[],
    payChannelName: [] as DropdownItem[],
    payChannel: [] as DropdownItem[],
    bankGroups: [] as DropdownItem[],
    thirdGroups: [] as DropdownItem[],
  });
  const [editServiceModal, { openModal: openServiceModal }] = useModal();
  const [editGroupsModal, { openModal: openGroupsModal }] = useModal();

  // 取得支付方式
  const fetchDropdownData = async () => {
    const ChannelDropdownRes = await getChannelDropdown();
    // 线路名称
    serviceDropdownRes.serviceCode = ChannelDropdownRes.serviceCode || [];
    serviceDropdownRes.method = ChannelDropdownRes.method || [];
    serviceDropdownRes.payChannelName = ChannelDropdownRes.payChannelName || [];
    serviceDropdownRes.payChannel = ChannelDropdownRes.payChannel || [];
    serviceDropdownRes.bankGroups = ChannelDropdownRes.bankGroups || [];
    serviceDropdownRes.thirdGroups = ChannelDropdownRes.thirdGroups || [];
  };

  const removeEmptyQuery = (queryObject: any) => {
    const query = queryObject;
    Object.keys(query).forEach((key) => {
      if (query[key] === undefined || query[key] === '') {
        delete query[key];
      } else {
        query[key] = String(query[key]);
      }
    });
    return query;
  };
  const fetchData = async (obj: any) => {
    const query = removeEmptyQuery(Object.assign({}, route.query, obj));
    let data;
    if (JSON.stringify(route.query) !== JSON.stringify(query)) {
      router.push({ query: query });
    } else {
      data = await getService(query);
      await fetchDropdownData();
      state.dataList = data.list as GetServiceResponse[];
    }
    return data;
  };
  const handleCreate = () =>
    openServiceModal(true, { isUpdate: false, isDisabled: false, mode: 'Create' });

  const handleGetGroupExclude = async (record: EditRecordRow) => {
    const type = record.serviceCode === 'gw' ? 2 : 1;
    const res = await getServiceGroupsExclude({ id: record.id, type: type });
    const rowGroups = record?.groups?.map((item) => {
      return { title: item.value, label: item.value, value: item.value, key: item.key } || [];
    });
    const allGroups = res?.groups?.map((item) => {
      return { title: item.value, label: item.value, value: item.value, key: item.key } || [];
    });
    if (res) {
      openGroupsModal(true, { rowGroups, allGroups, record });
    }
  };
  // 编辑修改金流组别
  const handleEdit = async (record: EditRecordRow) => {
    const res = await getServiceById({ id: record.id, type: record.type });
    record.id = res.id;
    record.name = res.name;
    record.rate = res.rate;
    record.amount = res.amount;
    record.remain = res.remain;
    record.limit = res.limit;
    // record.perFee = res.perFee;
    record.fee = res.fee;
    record.status = res.status;
    record.serviceCode = [res.serviceCode];
    record.note = res.note;
    record.upperLimit = res.upperLimit;
    record.lowerLimit = res.lowerLimit;
    record.payChannelID = res.payChannelID;

    openServiceModal(true, { record, isUpdate: true, isDisabled: false, mode: 'Edit' });
  };
  const showRowData = (record) => {
    openServiceModal(true, { record, isUpdate: true, isDisabled: true, mode: 'ShowRowData' });
  };
  // 操作功能 编辑修改金流组别
  const changeStausActions = (record: EditRecordRow): ActionItem[] => {
    return [
      {
        label: Number(record.status === 1) ? '停用' : '启用',
        onClick: () => handleChangeStatus(record),
      },
    ];
  };
  // 另開商户号与线路明细
  const openNewWindow = (record) => {
    const newUrl = router.resolve({
      path: `/finance_report/paychannel_report`,
      query: { payChannelService: String(record.name) },
    });
    window.open(newUrl.href, '_blank');
  };
  // 重整资料
  const handleChangeStatus = async (record: EditRecordRow) => {
    const {
      id,
      status,
      name,
      payChannelID,
      device,
      serviceCode,
      note,
      upperLimit,
      lowerLimit,
      dayLimit,
      fee,
      perFee,
    } = record;

    const payload: PutEditServiceParams = {};
    payload.status = status === 1 ? '0' : '1';
    payload.id = id;
    payload.name = name;
    payload.payChannelID = payChannelID;
    payload.device = device;
    payload.serviceCode = serviceCode;
    payload.note = note;
    payload.upperLimit = upperLimit;
    payload.lowerLimit = lowerLimit;
    payload.dayLimit = dayLimit;
    payload.fee = fee;
    payload.perFee = perFee;
    const result = await putEditService(payload);
    if (result.success) {
      payload.status === '1' ? message.success(`已启用`) : message.success(`已停用`);
      reload();
    }
  };

  // Form config
  const formConfig = computed<FormProps>(() => {
    const { serviceCode, method, payChannelName, payChannel, bankGroups, thirdGroups } =
      serviceDropdownRes;
    return {
      labelWidth: 100,
      autoAdvancedLine: 1,
      schemas: searchSchemas(
        serviceCode,
        method,
        payChannelName,
        payChannel,
        bankGroups,
        thirdGroups
      ),
      autoSubmitOnEnter: true,
    };
  });
  const [serviceTable, { reload, getDataSource, getForm }] = useTable({
    api: fetchData,
    showIndexColumn: false,
    columns: tableColumns,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn: (info) => info,
    formConfig: formConfig,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: {
        customRender: 'action',
      },
    },
    components: {
      body: {
        wrapper: h(SortableWrapper, {
          onStart: (e) => {
            state.oldIndex = e.oldIndex;
          },
          onEnd: (e: any) => {
            state.newIndex = e.newIndex;
            handleSort();
            const dataSource = getDataSource() || [];

            const temp = dataSource[e.oldIndex];
            dataSource.splice(e.oldIndex, 1);
            dataSource.splice(e.newIndex, 0, temp);
          },
        }),
      },
    },
  });
  const handleSort = async () => {
    const payload = {
      id: state.dataList[state.oldIndex].id,
      sort: state.dataList[state.newIndex].id,
    };
    await putServiceSort(payload);
    // reload();
  };
  const handleSuccess = () => {
    reload();
  };

  onMounted(() => {
    if (route.query) {
      getForm().setFieldsValue({
        name: route?.query?.name,
        status: route?.query?.status,
        serviceCode: route?.query?.serviceCode,
        method: route?.query?.method,
        payChannelID: route?.query?.payChannelID,
        bankGroupID: route?.query?.bankGroupID,
        thirdGroupID: route?.query?.thirdGroupID,
        field: route?.query?.field,
        order: route?.query?.order,
      });
    }
  });
</script>

<style lang="scss" scoped></style>
