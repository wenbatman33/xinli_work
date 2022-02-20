<template>
  <BasicModal
    :title="titleRef"
    :width="500"
    @register="TransferModal"
    @ok="handleConfirm"
    @cancel="handleReset"
  >
    <BasicForm @register="TransferForm">
      <template #cardNo>
        <AutoComplete
          :value="state.value"
          :options="state.list"
          :filter-option="filterOption"
          style="width: 200px"
          :allowClear="true"
          placeholder="请输入银行卡号"
          @search="handleSearch"
          @select="onSelect"
          @change="onChange"
        />
        <p style="margin-top: 4px" v-if="state.value">
          银行名称: {{ state.selectOption.bankName }}
        </p>
        <p style="margin-top: 4px" v-if="state.value">
          <span style="margin-right: 4px">户名: {{ state.selectOption.accountName }}</span>
          <Tag v-if="state.selectOption.type == 1" color="blue">出款</Tag>
          <Tag v-if="state.selectOption.type == 2" color="orange">结算</Tag>
          <Tag v-if="state.selectOption.type == 3" color="pink">中转</Tag>
          <Tag v-if="state.selectOption.type == 4" color="green">仓库</Tag>
        </p>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import moment from 'moment';
  import { message, AutoComplete, Tag } from 'ant-design-vue';
  import { ref, computed, reactive, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import type { FormSchema } from '/@/components/Table';
  import type { GetBankCardsResponse } from '/@/api/payment/model/payBankCardModel';
  import { transferBankCard, getBankCardList } from '/@/api/payment/payBankCard';

  const titleRef = ref('轉帳');
  const currentID = ref<Number>(0);
  const state = reactive({
    value: '',
    list: [] as GetBankCardsResponse[],
    selectOption: {} as GetBankCardsResponse,
  });
  const [TransferModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    currentID.value = data.record.ID;
  });
  const TransferFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'amount',
        label: '金额',
        component: 'InputNumber',
        required: true,
        componentProps: { placeholder: '请输入金额' },
      },
      {
        field: 'cardNo',
        label: '银行卡号',
        component: 'AutoComplete',
        required: true,
        slot: 'cardNo',
        componentProps: {
          placeholder: '请输入银行卡号',
        },
      },
      {
        field: 'fee',
        label: '手续费',
        component: 'InputNumber',
        required: true,
        componentProps: { placeholder: '请输入手續費' },
      },
      {
        field: 'logTime',
        label: '入帐时间',
        component: 'DatePicker',
        required: true,
        componentProps: { placeholder: '请选择入帐时间' },
      },
      {
        field: 'note',
        label: '备注',
        component: 'InputTextArea',
        componentProps: {
          placeholder: '请输入备注',
          rows: 5,
        },
      },
    ];
  });
  const [TransferForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 80,
    schemas: TransferFormSchema,
    showActionButtonGroup: false,
  });
  const filterItem = (value) => {
    state.selectOption = state.list.filter((item) => item.cardNo === value)[0];
  };
  const onChange = (value) => {
    if (!value) {
      state.value = '';
      state.selectOption = {};
    }
  };
  const onSelect = (value) => {
    state.value = value;
    setFieldsValue({ cardNo: value });
    filterItem(value);
  };

  const handleSearch = async (searchText: string) => {
    const query = { cardNo: searchText };
    if (query.cardNo) {
      const data = await getBankCardList(query);
      data.list?.forEach((item) => (item.value = item.cardNo));
      state.list = data.list as unknown as any[];
    }
  };
  const filterOption = (input, option) => {
    setFieldsValue({ cardNo: input });
    return option.cardNo;
  };

  const handleConfirm = async () => {
    try {
      const payload = await validate();
      payload.bankcardID = currentID.value;
      payload.logTime = moment(payload.logTime).format('YYYY/MM/DD');
      const result = await transferBankCard(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  const ResError = () => {
    message.error(`转帐失败`);
    handleModalClose();
  };
  const ResSuccess = () => {
    message.success(`转帐成功`);
    handleModalClose();
    resetFields();
  };
  const handleReset = () => {
    handleModalClose();
  };
  const handleModalClose = () => {
    currentID.value = 0;
    state.value = '';
    resetFields();
    closeModal();
  };
  onMounted(() => {
    state.value = '';
  });
</script>
