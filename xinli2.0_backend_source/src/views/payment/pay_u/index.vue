<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="payUTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增USDT帐户</a-button>
      </template>

      <template #useType="{ record }">
        <Tag v-if="record.useType == 1" color="blue">出款</Tag>
        <Tag v-if="record.useType == 2" color="orange">结算</Tag>
        <Tag v-if="record.useType == 3" color="pink">中转</Tag>
        <Tag v-if="record.useType == 4" color="green">仓库</Tag>
      </template>

      <template #address="{ record }">
        <p class="mb-1">
          <span class="mr-2">地址: {{ record.address }}</span>
          <Icon
            icon="ant-design:copy-outlined"
            class="cursor-pointer"
            @click="handleCopy(record.address)"
          />
        </p>
      </template>

      <template #status="{ record }">
        <span v-if="String(record.status) === '1'" :style="`color:${ColorEnum.SUCCESS}`">启用</span>
        <span v-if="String(record.status) === '2'" :style="`color:${ColorEnum.ERROR}`">停用</span>
      </template>

      <template #action="{ record }">
        <TableAction
          :dropDownActions="[
            { label: '编辑', onClick: () => handleEdit(record), auth: '__btn_usdtaddress_copy' },
            { label: '充值商户号', onClick: () => handleMoneyOut(record) },
            { label: '商户下发', onClick: () => handleMoneyIn(record) },
            // { label: '转帐', onClick: () => handleTransfer(record) },
            // { label: '冻结', onClick: () => handleLockBankCard(record) },
            // { label: '解除冻结', onClick: () => handleUnlockBankCard(record) },
          ]"
          :actions="[
            {
              label: Number(record.status === 1) ? '停用' : '启用',
              onClick: () => handleChangeStatus(record),
              auth: '__btn_usdtaddress_copy',
            },
            { label: '帐务明细', onClick: () => openNewWindow(record) },
          ]"
        />
      </template>
    </BasicTable>

    <UcardModal
      @register="editUcardModal"
      @success="handleSuccess"
    />
    <MoneyInModal @register="moneyInModal" @success="handleSuccess" />
    <MoneyOutModal @register="moneyOutModal" @success="handleSuccess" />
    <!-- <LockModal @register="lockBankCardModal" @success="handleSuccess" />
    <TransferModal @register="transferModal" @success="handleSuccess" /> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Icon } from '/@/components/Icon';
  import { message, Tag } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { tableColumns } from './components/tableData';
  import { searchSchemas } from './components/searchSchemas';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import UcardModal from './components/UcardModal.vue';
  import { getUcardList, editUcard } from '/@/api/payment/payU';
  import { ColorEnum } from '/@/enums/colorEnum';
  // import type
  // import type { EditRecordRow, ActionItem } from '/@/components/Table';
  import type { FormProps } from '/@/components/Form';
  // import LockModal from './components/LockModal.vue';
  // import TransferModal from './components/TransferModal.vue';
  import MoneyInModal from './components/MoneyIn.vue';
  import MoneyOutModal from './components/MoneyOut.vue';

  const route = useRoute();
  const router = useRouter();

  // const [transferModal, { openModal: openTransferModalModal }] = useModal();
  // const [lockBankCardModal, { openModal: openLockBankCardModal }] = useModal();
  const [editUcardModal, { openModal: openUcardModal }] = useModal();
  const [moneyInModal, { openModal: openMoneyInModal }] = useModal();
  const [moneyOutModal, { openModal: openMoneyOutModal }] = useModal();

  const searchInfo = reactive<Recordable>({});

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
    const query = removeEmptyQuery(Object.assign({}, route.query, obj));
    let data;
    if (JSON.stringify(route.query) !== JSON.stringify(query)) {
      router.push({ query: query });
    } else {
      data = await getUcardList(query);
    }
    return data.list || [];
  };

  // Form config
  const formConfig = computed<FormProps>(() => {
    return {
      labelWidth: 70,
      showResetButton: false,
      autoSubmitOnEnter: true,
      autoAdvancedLine: 1,
      schemas: searchSchemas(),
    };
  });
  const [payUTable, { reload, getForm }] = useTable({
    api: fetchData,
    showIndexColumn: false,
    columns: tableColumns,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn: (info) => info,
    formConfig: formConfig,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      slots: {
        customRender: 'action',
      },
    },
  });

  const handleSuccess = () => {
    reload();
  };
  // const handleLockBankCard = (record) => {
  //   openLockBankCardModal(true, { record, mode: 'lock' });
  // };
  // const handleUnlockBankCard = (record) => {
  //   openLockBankCardModal(true, { record, mode: 'unlock' });
  // };
  // 新增銀行卡
  const handleCreate = () => {
    openUcardModal(true, { isUpdate: false, isDisabled: false, mode: 'Create' });
  };
  // 轉帳
  // const handleTransfer = (record) => {
  //   openTransferModalModal(true, { record });
  // };
  // 商户下发
  const handleMoneyIn = (record) => {
    openMoneyInModal(true, { record });
  };
  // 充值商户号
  const handleMoneyOut = (record) => {
    openMoneyOutModal(true, { record });
  };
  // 編輯
  const handleEdit = (record) => {
    openUcardModal(true, { record, isUpdate: true, isDisabled: false, mode: 'Edit' });
  };
  // 另開U帳戶明细
  const openNewWindow = (record) => {
    const newUrl = router.resolve({
      path: `/finance_report/usdt_report`,
      query: { usdtID: String(record.id) },
    });
    window.open(newUrl.href, '_blank');
  };
  // 复制功能
  const handleCopy = (str: string) => {
    const inputElement = document.createElement('input');
    inputElement.value = str || '';
    inputElement.style.position = 'fixed';
    inputElement.style.top = '-9999';
    inputElement.style.left = '-9999';
    document.body.appendChild(inputElement);
    inputElement.focus();
    inputElement.select();
    try {
      const success = document.execCommand('copy');
      success ? message.success('复制成功') : message.error('复制失败');
    } catch (err) {
      message.error('复制失败');
    } finally {
      document.body.removeChild(inputElement);
    }
  };

  const handleChangeStatus = async (record) => {
    const params = record;
    params.status = Number(record.status === 1) ? 2 : 1,
    await editUcard(params);
    message.success(`成功修改${params.name}`);
    reload();
  };

  onMounted(() => {
    if (route.query) {
      getForm().setFieldsValue({
        name: route?.query?.name,
        useType: route?.query?.useType,
        type: route?.query?.type,
        status: route?.query?.status,
      });
    }
  });
</script>
<style lang="scss" scoped>
  ::v-deep(.ant-table-fixed-left) {
    width: 203px !important;

    .ant-table-fixed {
      width: 203px !important;
    }
  }
</style>
