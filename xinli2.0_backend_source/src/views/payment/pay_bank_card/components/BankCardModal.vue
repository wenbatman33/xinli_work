<template>
  <BasicModal
    :title="titleRef"
    width="80%"
    @register="createBankCardModal"
    @ok="handleConfirm"
    @cancel="handleReset"
  >
    <BasicForm @register="createPayGroupForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { ref, computed, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import type { FormSchema } from '/@/components/Table';
  import { createBankCard, putBankCard } from '/@/api/payment/payBankCard';

  import type {
    DropdownItem,
    BankList,
    ProvinceList,
    CityItem,
  } from '/@/api/payment/model/payBankCardModel';

  const emit = defineEmits(['success', 'register']);
  const props = defineProps({
    status: Array as PropType<Array<DropdownItem>>,
    type: Array as PropType<Array<DropdownItem>>,
    gender: Array as PropType<Array<DropdownItem>>,
    banks: Array as PropType<Array<BankList>>,
    province: Array as PropType<Array<ProvinceList>>,
  });

  const state = reactive({
    record: {},
  });
  const mode = ref<String>('');
  const status = ref<Boolean>(false);
  const currentID = ref(0);
  const city = ref<Array<CityItem>>([]);
  const titleRef = computed(() => {
    let string = '';
    if (mode.value === 'Create') {
      string = '新增银行卡';
    } else if (mode.value === 'Edit') {
      string = '编辑银行卡';
    } else if (mode.value === 'ShowRowData') {
      string = '查看银行卡';
    }
    return string;
  });

  const bankcardFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'cardNo',
        label: '银行卡号',
        component: 'Input',
        required: true,
        componentProps: { placeholder: '请输入银行卡号' },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'accountName',
        label: '户名',
        component: 'Input',
        required: true,
        componentProps: { placeholder: '请输入户名' },
        colProps: {
          span: 12,
        },
      },
      {
        // 要换成select
        field: 'bankCode',
        label: '银行名称',
        component: 'Select',
        required: true,
        componentProps: {
          options:
            props.banks &&
            props.banks.map((element) => {
              return {
                label: element.bankName,
                value: element.id,
                key: element.bankCode,
              };
            }),
        },
        colProps: {
          span: 24,
        },
      },

      {
        field: 'province',
        label: '开户省',
        component: 'Select',
        // required: true,
        colProps: {
          span: 8,
        },
        componentProps: ({ formModel }) => {
          return {
            options:
              props.province &&
              props.province.map((element) => {
                return {
                  label: element.province,
                  value: element.province_id,
                  key: element.province_id,
                };
              }),
            onChange: (e) => {
              setCityList(e);
              formModel.city = undefined;
            },
          };
        },
      },
      {
        // 要换成select
        field: 'city',
        label: '开户城市',
        component: 'Select',
        // required: true,
        componentProps: {
          options: city.value.map((element) => {
            return {
              label: element.name,
              value: element.id,
              key: element.id,
            };
          }),
        },
        colProps: {
          span: 8,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.province !== undefined;
        },
      },
      {
        // 要换成select
        field: 'branch',
        label: '开户分行',
        component: 'Input',
        // required: true,
        componentProps: { placeholder: '请输入开户分行' },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'broker',
        label: '卡商',
        component: 'Input',
        // required: true,
        componentProps: { placeholder: '请输入卡商' },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'verifyDate',
        label: '验卡日期',
        component: 'DatePicker',
        required: true,
        componentProps: { autocomplete: 'new-password' },
        colProps: {
          span: 12,
        },
      },

      {
        field: 'limitLower',
        label: '单笔下限',
        component: 'InputNumber',
        // required: true,
        componentProps: { placeholder: '请输入单笔下限', min: 0 },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'limitUpper',
        label: '单笔上限',
        component: 'InputNumber',
        // required: true,
        componentProps: { placeholder: '请输入单笔上限', min: 0 },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'dayUpper',
        label: '每日上限',
        component: 'InputNumber',
        // required: true,
        componentProps: { placeholder: '请输入每日上限', min: 0 },
        colProps: {
          span: 8,
        },
      },

      {
        field: 'type',
        label: '用途',
        component: 'Select',
        required: true,
        componentProps: {
          options:
            props.type &&
            props.type.map((element) => {
              return {
                label: Object.values(element)[0],
                value: Number(Object.keys(element)[0]),
                key: Number(Object.keys(element)[0]),
              };
            }),
        },
        colProps: {
          span: 8,
        },
      },

      {
        field: 'status',
        label: '状态',
        component: 'Switch',
        defaultValue: 2,
        componentProps: {
          checkedValue: 1,
          unCheckedValue: 2,
        },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'originalAmount',
        label: '初始金额',
        component: 'InputNumber',
        // required: true,
        componentProps: {
          placeholder: '请输入初始金额',
          autocomplete: 'new-password',
          min: 0,
          disabled: mode.value !== 'Create',
        },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'note',
        label: '备注',
        component: 'InputTextArea',
        componentProps: { placeholder: '请输入备注' },
        colProps: {
          span: 24,
        },
      },
      // ------------------
      {
        field: 'showWebBankInfo',
        label: '编辑网银信息',
        component: 'Switch',
        defaultValue: () => (mode.value === 'ShowRowData' ? true : false),
        colProps: {
          span: 24,
        },
      },
      {
        field: 'bankAccount',
        label: '网银帐号',
        component: 'Input',
        componentProps: { placeholder: '请输入网银帐号' },
        colProps: {
          span: 12,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.showWebBankInfo === true;
        },
      },
      {
        field: 'oriLoginPw',
        label: '网银原始密码',
        component: 'Input',
        componentProps: { placeholder: '请输入网银原始密码' },
        colProps: {
          span: 12,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.showWebBankInfo === true;
        },
      },
      {
        field: 'oriLoginPw',
        label: '原始U盾密码',
        component: 'Input',
        componentProps: { placeholder: '请输入原始U盾密码' },
        colProps: {
          span: 12,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.showWebBankInfo === true;
        },
      },
      {
        field: 'oriWithdrawalPw',
        label: '原始取款密码',
        component: 'Input',
        componentProps: { placeholder: '请输入原始取款密码' },
        colProps: {
          span: 12,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.showWebBankInfo === true;
        },
      },
      {
        field: 'loginPw',
        label: '网银登入密码',
        component: 'Input',
        componentProps: { placeholder: '请输入网银登入密码', autocomplete: 'new-password' },
        colProps: {
          span: 12,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.showWebBankInfo === true;
        },
      },
      {
        field: 'uPwd',
        label: '网银U盾密码',
        component: 'Input',
        componentProps: { placeholder: '请输入网银U盾密码', autocomplete: 'new-password' },
        colProps: {
          span: 12,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.showWebBankInfo === true;
        },
      },
      {
        field: 'withdrawalPw',
        label: '网银取款密码',
        component: 'Input',
        componentProps: { placeholder: '请输入网银取款密码' },
        colProps: {
          span: 12,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.showWebBankInfo === true;
        },
      },

      // ------------------
      {
        field: 'showPersonalInfo',
        label: '编辑开户人信息',
        component: 'Switch',
        defaultValue: () => (mode.value === 'Edit' ? true : false),
        colProps: {
          span: 24,
        },
      },
      {
        field: 'identity',
        label: '开户人身份证件号',
        component: 'Input',
        componentProps: { placeholder: '请输入开户人身份证件号' },
        colProps: {
          span: 12,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.showPersonalInfo === true;
        },
      },
      {
        field: 'gender',
        label: '性别',
        component: 'RadioGroup',
        componentProps: {
          options:
            props.gender &&
            props.gender.map((item) => {
              return {
                label: Object.values(item)[0],
                value: Number(Object.keys(item)[0]),
                key: Number(Object.keys(item)[0]),
              };
            }),
        },
        colProps: {
          span: 12,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.showPersonalInfo === true;
        },
      },
      {
        field: 'phone',
        label: '对应手机号',
        component: 'Input',
        componentProps: { placeholder: '请输入对应手机号' },
        colProps: {
          span: 12,
        },
        show: (renderCallbackParams) => {
          return renderCallbackParams.values.showPersonalInfo === true;
        },
      },
    ];
  });

  const [createPayGroupForm, { setFieldsValue, resetFields, validate, setProps }] = useForm({
    labelWidth: 130,
    schemas: bankcardFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const [createBankCardModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    mode.value = data.mode;
    state.record = data.record;
    currentID.value = data?.record?.ID;
    if (mode.value === 'Edit') {
      status.value = data.record.status;
      // const stringData = data.record.map((item) => String(item));
      setCityList(data.record.province);
      setFieldsValue({ ...data.record, showPersonalInfo: true, showWebBankInfo: true });
      setProps({ disabled: false });
      setModalProps({ okText: '确定修改' });
    } else if (mode.value === 'ShowRowData') {
      setCityList(data.record.province);
      setFieldsValue({ ...data.record });
      setProps({ disabled: true });
      setModalProps({ okText: '编辑' });
      setFieldsValue({ showPersonalInfo: true, showWebBankInfo: true });
    } else if (mode.value === 'Create') {
      setProps({ disabled: false });
      setModalProps({ okText: '确定新增' });
      setFieldsValue({ showPersonalInfo: false, showWebBankInfo: false });
    }
  });

  const setCityList = (province: string) => {
    city.value = [];
    try {
      city.value =
        (props?.province &&
          props?.province.filter((item) => item.province_id === String(province))[0].city) ||
        [];
    } catch {
      city.value = [];
      setTimeout(() => {
        setFieldsValue({ city: undefined, province: undefined });
      }, 500);
    }
  };
  const createSubmit = async () => {
    try {
      const payload = await validate();
      currentID.value !== 0 && (payload.ID = currentID.value);
      payload.payBankID = Number(payload.bankCode);
      const result = await createBankCard(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  const editSubmit = async () => {
    try {
      const payload = await validate();
      currentID.value !== 0 && (payload.ID = currentID.value);
      payload.payBankID =
        props.banks &&
        props.banks.filter((item) => {
          return item.bankCode === payload.bankCode;
        })[0].id;
      const result = await putBankCard(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };

  const handleConfirm = () => {
    if (mode.value === 'Create') {
      createSubmit();
    } else if (mode.value === 'Edit') {
      editSubmit();
    } else if (mode.value === 'ShowRowData') {
      mode.value = 'Edit';
      setProps({ disabled: false });
      setModalProps({ okText: '确定修改' });
    }
  };

  const ResError = () => {
    mode.value === 'Edit' ? message.error(`编辑银行卡失败`) : message.error(`新增银行卡失败`);
    handleModalClose();
  };
  const ResSuccess = () => {
    mode.value === 'Edit' ? message.success(`编辑银行卡成功`) : message.success(`新增银行卡成功`);
    handleModalClose();
  };
  const handleModalClose = () => {
    emit('success');
    currentID.value = 0;
    closeModal();
  };
  const handleReset = () => {
    currentID.value = 0;
    resetFields();
  };
</script>
