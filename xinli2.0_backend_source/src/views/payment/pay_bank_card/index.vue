<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="payGroupTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增银行卡</a-button>
      </template>

      <template #cardNo="{ record }">
        <a class="mx-2" @click="showRowData(record)">
          {{ record.cardNo }}
        </a>
        <Icon
          icon="ant-design:copy-outlined"
          class="cursor-pointer"
          @click="handleCopy(record.cardNo)"
        />
      </template>

      <template #bankName="{ record }">
        <span>{{ record.bankName }}</span>
        <br />
        <span>{{ record.bankCode }}</span>
      </template>
      <template #type="{ record }">
        <Tag v-if="record.type == 1" color="blue">出款</Tag>
        <Tag v-if="record.type == 2" color="orange">结算</Tag>
        <Tag v-if="record.type == 3" color="pink">中转</Tag>
        <Tag v-if="record.type == 4" color="green">仓库</Tag>
      </template>

      <template #bankAccount="{ record }">
        <p class="mb-1">
          <span class="mr-2">帐号: {{ record.bankAccount }}</span>
          <Icon
            icon="ant-design:copy-outlined"
            class="cursor-pointer"
            @click="handleCopy(record.bankAccount)"
          />
        </p>
        <p class="mb-1">
          <span class="mr-2">密码: {{ record.loginPw }}</span>
          <Icon
            icon="ant-design:copy-outlined"
            class="cursor-pointer"
            @click="handleCopy(record.loginPw)"
          />
        </p>
        <p class="mb-1">
          <span class="mr-2">U密: {{ record.uPw }}</span>
          <Icon
            icon="ant-design:copy-outlined"
            class="cursor-pointer"
            @click="handleCopy(record.uPw)"
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
            { label: '帐务明细', onClick: () => openNewWindow(record) },
            { label: '编辑', onClick: () => handleEdit(record) },
            { label: '转帐', onClick: () => handleTransfer(record) },
            { label: '冻结', onClick: () => handleLockBankCard(record) },
            { label: '解除冻结', onClick: () => handleUnlockBankCard(record) },
          ]"
          :actions="changeStausActions(record)"
        />
      </template>
    </BasicTable>

    <BankCardModal
      :status="bankCardDropdownRes.status"
      :type="bankCardDropdownRes.type"
      :gender="bankCardDropdownRes.gender"
      :banks="bankCardDropdownRes.banks"
      :province="bankCardDropdownRes.province"
      @register="editBankCardModal"
      @success="handleSuccess"
    />
    <LockModal @register="lockBankCardModal" @success="handleSuccess" />
    <TransferModal @register="transferModal" @success="handleSuccess" />
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
  import BankCardModal from './components/BankCardModal.vue';
  import { getBankCardList, getBankCardDropdown, putBankCard } from '/@/api/payment/payBankCard';
  import { ColorEnum } from '/@/enums/colorEnum';
  // import type
  import type { EditRecordRow, ActionItem } from '/@/components/Table';
  import type { FormProps } from '/@/components/Form';
  import LockModal from './components/LockModal.vue';
  import TransferModal from './components/TransferModal.vue';

  import type {
    DropdownItem,
    BankList,
    ProvinceList,
    PutBankCardParams,
  } from '/@/api/payment/model/payBankCardModel';

  const route = useRoute();
  const router = useRouter();

  const [transferModal, { openModal: openTransferModalModal }] = useModal();
  const [lockBankCardModal, { openModal: openLockBankCardModal }] = useModal();
  const [editBankCardModal, { openModal: openBankCardModal }] = useModal();

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
      data = await getBankCardList(query);
      await fetchDropdownData();
    }
    return data.list || [];
  };

  const bankCardDropdownRes = reactive({
    status: [] as DropdownItem[],
    type: [] as DropdownItem[],
    gender: [] as DropdownItem[],
    banks: [] as BankList[],
    province: [] as ProvinceList[],
  });
  // Form config
  const formConfig = computed<FormProps>(() => {
    const { status, type, gender, banks, province } = bankCardDropdownRes;
    return {
      labelWidth: 70,
      showResetButton: false,
      autoSubmitOnEnter: true,
      autoAdvancedLine: 1,
      schemas: searchSchemas(status, type, gender, banks, province),
    };
  });
  const [payGroupTable, { reload, getForm }] = useTable({
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
  const handleLockBankCard = (record) => {
    openLockBankCardModal(true, { record, mode: 'lock' });
  };
  const handleUnlockBankCard = (record) => {
    openLockBankCardModal(true, { record, mode: 'unlock' });
  };
  // 新增銀行卡
  const handleCreate = () => {
    openBankCardModal(true, { isUpdate: false, isDisabled: false, mode: 'Create' });
  };
  // 轉帳
  const handleTransfer = (record) => {
    openTransferModalModal(true, { record });
  };
  // 編輯
  const handleEdit = (record) => {
    openBankCardModal(true, { record, isUpdate: true, isDisabled: false, mode: 'Edit' });
  };
  // 顯示單筆資料
  const showRowData = (record) => {
    openBankCardModal(true, { record, isUpdate: true, isDisabled: true, mode: 'ShowRowData' });
  };
  // 另開銀行卡明细
  const openNewWindow = (record) => {
    const newUrl = router.resolve({
      path: `/finance_report/bankcard_report`,
      query: { cardNo: String(record.cardNo) },
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
  // 操作功能
  const changeStausActions = (record: EditRecordRow): ActionItem[] => {
    return [
      {
        label: Number(record.status === 1) ? '停用' : '启用',
        onClick: () => handleChangeStatus(record),
      },
    ];
  };
  // 重整资料
  const handleChangeStatus = async (record: EditRecordRow) => {
    const {
      ID,
      cardNo,
      payBankID,
      accountName,
      type,
      dayUpper,
      limitLower,
      limitUpper,
      broker,
      province,
      city,
      branch,
      status,
      note,
      bankAccount,
      oriLoginPw,
      oriUPw,
      oriWithdrawalPw,
      loginPw,
      uPw,
      withdrawalPw,
      identity,
      gender,
      verifyDate,
      phone,
    } = record;

    const payload: PutBankCardParams = {};
    payload.status = Number(status) === 1 ? 2 : 1;
    payload.ID = ID;
    payload.cardNo = cardNo;
    payload.payBankID = payBankID;
    payload.accountName = accountName;
    payload.type = type;
    payload.dayUpper = dayUpper;
    payload.dayUpper = dayUpper;
    payload.limitLower = limitLower;
    payload.limitUpper = limitUpper;
    payload.broker = broker;
    payload.province = province;
    payload.city = city;
    payload.branch = branch;
    payload.note = note;
    payload.bankAccount = bankAccount;
    payload.oriLoginPw = oriLoginPw;
    payload.oriUPw = oriUPw;
    payload.oriWithdrawalPw = oriWithdrawalPw;
    payload.loginPw = loginPw;
    payload.uPw = uPw;
    payload.withdrawalPw = withdrawalPw;
    payload.identity = identity;
    payload.gender = gender;
    payload.verifyDate = verifyDate;
    payload.phone = phone;
    const result = await putBankCard(payload);
    if (result.success) {
      Number(payload.status) === 1 ? message.success(`已启用`) : message.success(`已停用`);
      reload();
    }
  };
  // 重新排列省市阵列 塞入城市列表
  const createNewProvinceList = (ciytData) => {
    const newProvinceList: ProvinceList[] = [];
    ciytData.forEach((item) => {
      let resultKey;
      const resultItem = newProvinceList.filter((newItem, index) => {
        resultKey = index;
        return newItem.province_id === item.province_id;
      });
      if (resultItem.length === 0) {
        newProvinceList.push({
          province: item.province,
          province_id: item.province_id,
          city: [{ id: item.id, name: item.name }],
        });
      } else {
        newProvinceList[resultKey].city.push({ id: item.id, name: item.name });
      }
    });
    return newProvinceList;
  };
  // 取得DropdownData
  const fetchDropdownData = async () => {
    const res = await getBankCardDropdown();
    const newProvinceList = createNewProvinceList(res.city);
    bankCardDropdownRes.status = res.status || [];
    bankCardDropdownRes.type = res.type || [];
    bankCardDropdownRes.gender = res.gender || [];
    bankCardDropdownRes.banks = res.banks || [];
    bankCardDropdownRes.province = newProvinceList || [];
  };

  onMounted(() => {
    if (route.query) {
      getForm().setFieldsValue({
        cardNo: route?.query?.cardNo,
        accountName: route?.query?.accountName,
        type: route?.query?.type,
        status: route?.query?.status,
        payBankID: route?.query?.payBankID,
        field: route?.query?.field,
        order: route?.query?.order,
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
