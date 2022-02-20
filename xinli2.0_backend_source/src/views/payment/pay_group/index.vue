<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="payGroupTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增金流组别</a-button>
      </template>

      <template #remark="{ record }">
        <Tooltip placement="topLeft">
          <template #title>
            <span>{{ record.remark }}</span>
          </template>
          <span>{{ record.remark }}</span>
        </Tooltip>
      </template>

      <template #updatedAt="{ record }">
        <span>{{ moment(record.updatedAt).format('YYYY/MM/DD HH:mm:ss') }}</span>
      </template>

      <template #payChannelServiceCnt="{ record }">
        <a href="/payment/pay_channel_service" target="_blank">{{ record.payChannelServiceCnt }}</a>
      </template>

      <template #action="{ record }">
        <TableAction
          :dropDownActions="[
            { label: '加入会员', onClick: () => handleAddMember(record) },
            { label: '查看线路', onClick: () => openNewWindow(record) },
          ]"
          :actions="createActions(record)"
        />
      </template>
    </BasicTable>

    <PayGroupModal @register="CreatePayGroupModal" @success="handleSuccess" />
    <MemberModal @register="AddMemberModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import moment from 'moment';
  import { reactive, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Tooltip } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { tableColumns } from './components/tableData';
  import { searchSchemas } from './components/searchSchemas';
  import { getPayGroups } from '/@/api/payment/payGroup';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  // import type { PutPayGroupParams } from '/@/api/payment/model/payGroupModel';
  import type { EditRecordRow, ActionItem } from '/@/components/Table';
  import PayGroupModal from './components/PayGroupModal.vue';
  import MemberModal from './components/MemberModal.vue';

  const route = useRoute();
  const router = useRouter();

  const searchInfo = reactive<Recordable>({});
  const [CreatePayGroupModal, { openModal: openPayGroupModal }] = useModal();
  const [AddMemberModal, { openModal: openMemberModal }] = useModal();

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
  const fetchData = async (obj) => {
    // type类型 [1三方2银行卡]
    obj.type = '1';
    const query = removeEmptyQuery(Object.assign({}, route.query, obj));
    let data;
    if (JSON.stringify(route.query) !== JSON.stringify(query)) {
      router.push({ query: query });
    } else {
      data = await getPayGroups(query);
    }
    return data.list || [];
  };

  const [payGroupTable, { reload, getForm }] = useTable({
    api: fetchData,
    showIndexColumn: false,
    columns: tableColumns,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn: (info) => info,
    formConfig: {
      labelWidth: 70,
      schemas: searchSchemas,
      autoSubmitOnEnter: true,
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: {
        customRender: 'action',
      },
    },
  });
  // 重整资料
  const handleSuccess = () => reload();
  // 新增金流组别
  const handleCreate = () => {
    openPayGroupModal(true, { isUpdate: false });
  };
  const openNewWindow = (record: EditRecordRow) => {
    // thirdGroupID 三方金流
    const newUrl = router.resolve({
      path: `/payment/pay_channel_service`,
      query: { status: 1, thirdGroupID: String(record.ID) },
    });
    window.open(newUrl.href, '_blank');
  };
  // 编辑修改金流组别
  const handleEdit = (record: EditRecordRow) => {
    openPayGroupModal(true, { record, isUpdate: true });
  };
  // 加入会员
  const handleAddMember = (record: EditRecordRow) => {
    openMemberModal(true, { record });
  };
  // 操作功能 编辑修改金流组别
  const createActions = (record: EditRecordRow): ActionItem[] => {
    return [
      {
        label: '编辑',
        onClick: () => handleEdit(record),
      },
    ];
  };
  onMounted(() => {
    if (route.query) {
      getForm().setFieldsValue({
        name: route?.query?.name,
        field: route?.query?.field,
        order: route?.query?.order,
      });
    }
  });
</script>
<style lang="scss" scoped></style>
