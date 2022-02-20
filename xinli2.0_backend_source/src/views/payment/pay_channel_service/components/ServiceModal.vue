<template>
  <BasicModal @register="createServiceModal" :title="titleRef" width="75%" @ok="handleSubmit">
    <BasicForm @register="createServiceForm">
      <template #perFee="{ values, schema }">
        <div class="flex flex-row items-center">
          <span class="flex-shrink-0 px-4">金額 x</span>
          <Input
            type="number"
            :disabled="mode === 'ShowRowData'"
            :value="values[schema.componentProps.feeField]"
            @update:value="setFields(schema.componentProps.feeField, $event)"
          />
          <span class="flex-shrink-0 px-4">‰ ＋ 單筆</span>
          <Input
            type="number"
            :disabled="mode === 'ShowRowData'"
            :value="values[schema.componentProps.perFeeField]"
            @update:value="setFields(schema.componentProps.perFeeField, $event)"
          />
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { message, Input } from 'ant-design-vue';
  import { ref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  // type
  import type { FormSchema } from '/@/components/Table';
  // api
  import { createService, putEditService } from '/@/api/payment/payChannelService';
  import type { DropdownItem } from '/@/api/payment/model/payChannelServiceModel';

  const emit = defineEmits(['success', 'register']);
  const props = defineProps({
    serviceCodeRef: Array as PropType<Array<DropdownItem>>,
    payChannelRef: Array as PropType<Array<DropdownItem>>,
  });

  const isUpdate = ref(false);
  const mode = ref<String>('');
  const titleRef = computed(() => {
    let string = '';
    if (mode.value === 'Create') {
      string = '新增线路';
    } else if (mode.value === 'Edit') {
      string = '编辑线路';
    } else if (mode.value === 'ShowRowData') {
      string = '查看线路';
    }
    return string;
  });

  const [createServiceModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    mode.value = data.mode;
    setModalProps({ confirmLoading: false });
    isUpdate.value = data.isUpdate;
    if (mode.value === 'Edit') {
      setFieldsValue({ ...data.record });
      setProps({ disabled: false });
      setModalProps({ okText: '确定修改' });
    } else if (mode.value === 'ShowRowData') {
      setFieldsValue({ ...data.record });
      setProps({ disabled: true });
      setModalProps({ okText: '编辑' });
      setFieldsValue({ showPersonalInfo: true, showWebBankInfo: true });
    } else if (mode.value === 'Create') {
      setProps({ disabled: false });
      setModalProps({ okText: '确定新增' });
      setFieldsValue({ showPersonalInfo: false, showWebBankInfo: false });
    }

    if (data.isUpdate) setFieldsValue({ ...data.record });
  });

  const handleSubmit = async () => {
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
  const createSubmit = async () => {
    try {
      const payload = await validate();
      // type 2 新增為銀行卡組別
      payload.type = 2;
      payload.device = payload.device && payload?.device.toString();
      payload.serviceCode = String(...payload.serviceCode);
      const result = await createService(payload);
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
      // type 2 新增為銀行卡組別
      payload.type = 2;
      payload.device = payload.device && payload?.device.toString();
      payload.serviceCode = String(...payload.serviceCode);
      setModalProps({ confirmLoading: true });
      const result = await putEditService(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };

  const setFields = (field: String, value: any) => {
    setFieldsValue({
      [`${field}`]: value,
    });
  };
  const ResError = () => {
    isUpdate.value ? message.error(`编辑线路失败`) : message.error(`新增线路失败`);
    emit('success');
    closeModal();
  };
  const ResSuccess = () => {
    isUpdate.value ? message.success(`编辑线路成功`) : message.success(`新增线路成功`);
    emit('success');
    closeModal();
  };

  const createServiceFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'id',
        label: 'id',
        component: 'Input',
        show: false,
      },
      {
        field: 'payChannelID',
        label: '商户号',
        component: 'Select',
        required: true,
        componentProps: {
          placeholder: '请选择商户号',
          options: props.payChannelRef?.map((item) => {
            return {
              label: item.value as string,
              value: item.key as string,
              key: item.key as string,
            };
          }),
          disabled: mode.value === 'Edit',
        },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'status',
        label: '启用状态',
        component: 'Switch',
        defaultValue: 0,
        componentProps: {
          checkedValue: 1,
          unCheckedValue: 0,
        },
        colProps: {
          span: 12,
        },
      },
      // {
      //   field: 'payChannelID',
      //   label: '商户号',
      //   component: 'Select',
      //   required: true,
      //   componentProps: {
      //     placeholder: '请选择商户号',
      //     options: props.payChannelRef?.map((item) => {
      //       return {
      //         label: item.value as string,
      //         value: item.key as string,
      //         key: item.key as string,
      //       };
      //     }),
      //   },
      //   colProps: {
      //     span: 12,
      //   },
      // },
      {
        field: 'name',
        label: '线路名称',
        component: 'Input',
        required: true,
        componentProps: {
          placeholder: '请输入线路名称',
        },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'device',
        label: '支援装置',
        component: 'RadioButtonGroup',
        componentProps: {
          // 目前暫時封印
          disabled: true,
          options: [
            {
              label: 'PC',
              value: '1',
            },
            {
              label: 'H5',
              value: '2',
            },
          ],
        },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'serviceCode',
        label: '支付方式',
        component: 'CheckboxGroup',
        required: true,
        // ------
        componentProps: {
          options:
            props.serviceCodeRef &&
            props.serviceCodeRef.map((item) => {
              return {
                label: Object.values(item)[0],
                value: Object.keys(item)[0],
                key: Object.keys(item)[0],
              };
            }),
        },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'note',
        label: '备注',
        component: 'InputTextArea',
        required: true,
        componentProps: {
          placeholder: '请输入备注',
        },
        colProps: {
          span: 24,
        },
      },
      {
        field: 'lowerLimit',
        label: '单笔下限',
        component: 'Input',
        required: true,
        componentProps: {
          placeholder: '请输入单笔下限',
        },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'upperLimit',
        label: '单笔上限',
        component: 'Input',
        required: true,
        componentProps: {
          placeholder: '请输入单笔上限',
        },
        colProps: {
          span: 12,
        },
      },

      {
        field: 'dayLimit',
        label: '每日限额',
        component: 'Input',
        required: true,
        componentProps: {
          placeholder: '请输入每日限额',
        },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'fee',
        label: '每千手续费',
        component: 'InputNumber',
        required: true,
        componentProps: {
          placeholder: '请输入每千手续费',
        },
        colProps: {
          span: 12,
        },
        show: false,
      },
      {
        field: 'perFee',
        label: '手续费',
        component: 'InputNumber',
        required: true,
        slot: 'perFee',
        componentProps: {
          placeholder: '请输入手续费',
          feeField: 'fee',
          perFeeField: 'perFee',
        },
        colProps: {
          span: 24,
        },
      },
    ];
  });
  const [createServiceForm, { setFieldsValue, resetFields, validate, setProps }] = useForm({
    schemas: createServiceFormSchema,
    showActionButtonGroup: false,
    labelWidth: 120,
    actionColOptions: {
      span: 24,
    },
  });
</script>
