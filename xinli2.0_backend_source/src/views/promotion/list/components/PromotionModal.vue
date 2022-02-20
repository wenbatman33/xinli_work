<template>
  <BasicModal
    :title="titleRef"
    width="1200px"
    @register="createPromotionModal"
    @ok="handleSubmit"
    @cancel="handleReset"
  >
    <BasicForm class="promotionForm" @register="createPromotionForm">
      <template #title_1>
        <b>优惠基本设定：</b>
      </template>

      <template #startTime="{ field, values }">
        <DatePicker
          :disabled="mode === 'ShowRowData'"
          :value="values[field]"
          format="YYYY/MM/DD"
          @update:value="setStarTimeField"
        />
        <TimePicker
          :disabled="mode === 'ShowRowData'"
          :value="values[field]"
          format="HH:mm"
          @update:value="setStarTimeField"
        />
        <span>~</span>
      </template>

      <template #endTime="{ field, values }">
        <DatePicker
          :disabled="mode === 'ShowRowData'"
          :value="values[field]"
          format="YYYY/MM/DD"
          @update:value="setEndTimeField"
        />
        <TimePicker
          :disabled="mode === 'ShowRowData'"
          :value="values[field]"
          format="HH:mm"
          @update:value="setEndTimeField"
        />
      </template>

      <template #cycleTime="{ field, values }">
        <DatePicker
          :disabled="mode === 'ShowRowData'"
          :value="values[field]"
          format="YYYY/MM/DD"
          @update:value="setCycleTimeField"
        />
      </template>

      <template #title_2>
        <b>优惠流程设定：</b>
      </template>

      <template #title_3>
        <b>优惠对象设定：</b>
      </template>

      <template #excludePromotion="{ field, values }">
        <Select
          :value="values[field]"
          :disabled="mode === 'ShowRowData'"
          mode="tags"
          option-label-prop="label"
          @update:value="setExcludePromotionTagField"
        >
          <SelectOption
            v-for="item in state.promotionExclude"
            :key="'tags+' + item.ID"
            :value="item.ID"
            :label="item.name"
          >
            {{ item.name }}
          </SelectOption>
        </Select>
      </template>

      <template #excludeMemberTag="{ field, values }">
        <Select
          v-model:value="values[field]"
          :disabled="mode === 'ShowRowData'"
          option-label-prop="label"
          mode="tags"
          @update:value="setExcludeMemberTagField"
        >
          <SelectOption
            v-for="item in props?.dropdownData?.tags"
            :key="'tags+' + item.id"
            :value="item.id"
            :label="item.name"
          >
            {{ item.name }}
          </SelectOption>
        </Select>
      </template>

      <template #allowMemberTag="{ field, values }">
        <Select
          v-model:value="values[field]"
          :disabled="mode === 'ShowRowData'"
          option-label-prop="label"
          mode="tags"
          @update:value="setAllowMemberTagField"
        >
          <SelectOption
            v-for="item in props?.dropdownData?.tags"
            :key="'tags+' + item.id"
            :value="item.id"
            :label="item.name"
          >
            {{ item.name }}
          </SelectOption>
        </Select>
      </template>

      <template #allowMemberID="{ field, values }">
        <Select
          :value="values[field]"
          :disabled="mode === 'ShowRowData'"
          mode="tags"
          option-label-prop="label"
        />
      </template>

      <template #allowVip="{ field, values }">
        <Select
          :value="values[field]"
          :disabled="mode === 'ShowRowData'"
          mode="tags"
          option-label-prop="label"
        />
      </template>

      <template #allowAgencyMember="{ field, values }">
        <Select
          :value="values[field]"
          :disabled="mode === 'ShowRowData'"
          mode="tags"
          option-label-prop="label"
        />
      </template>

      <template #title_4>
        <b>优惠说明：</b>
      </template>
    </BasicForm>
    <OtpModal @register="otpModalregister" @success="otpSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, reactive, h } from 'vue';
  import { BasicModal, useModalInner, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import type { FormSchema } from '/@/components/Table';
  import { createPromotion, putPromotion, getPromotionExclude } from '/@/api/promotion/list';
  import { message, DatePicker, TimePicker, Select } from 'ant-design-vue';
  import type { GetPromotionExcludeData } from '/@/api/promotion/model/listModel';
  import OtpModal from '/@/views/common/otp/otpModal.vue';

  const { Option: SelectOption } = Select;
  import { Tinymce } from '/@/components/Tinymce/index';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/image';

  const emit = defineEmits(['success', 'register']);
  const mode = ref<String>('');
  const props = defineProps({
    dropdownData: Object,
  });

  const [otpModalregister, { openModal: openOTP }] = useModal();

  const state = reactive({
    promotionExclude: [] as GetPromotionExcludeData[],
  });
  const currentID = ref(0);
  const name = ref('');
  const nameEn = ref('');
  let originRecord: any = {};
  const titleRef = computed(() => {
    let string = '';
    if (mode.value === 'Create') {
      string = '新增优惠';
    } else if (mode.value === 'Edit') {
      string = '优惠设定';
    } else if (mode.value === 'ShowRowData') {
      string = '查看优惠';
    }
    return string;
  });

  // const defaultItem = {
  //   label: '全部',
  //   value: '',
  //   key: '',
  // };

  const promotionFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'title_1',
        slot: 'title_1',
        label: '',
        component: 'Input',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'name',
        label: '名称',
        labelWidth: 40,
        component: 'Input',
        required: true,
        colProps: {
          span: 9,
        },
      },
      {
        field: 'withdrawTimes',
        label: '优惠流水倍数',
        labelWidth: 100,
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 1,
        },
        colProps: {
          span: 6,
        },
      },
      {
        field: 'applyTimes',
        label: '可参加次数',
        labelWidth: 80,
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 1,
        },
        colProps: {
          span: 5,
        },
      },
      {
        field: 'status',
        label: '启用',
        defaultValue: false,
        show: false,
        component: 'Switch',
        colProps: {
          span: 3,
        },
      },
      {
        field: 'cycleType',
        label: '优惠时间',
        labelWidth: 70,
        component: 'RadioButtonGroup',
        required: true,
        colProps: {
          span: 6,
        },
        componentProps: {
          buttonStyle: 'solid',
          options: [].concat(
            props?.dropdownData?.cycleType.map((item) => {
              return {
                label: Object.values(item)[0],
                value: Number(Object.keys(item)[0]),
                key: Number(Object.keys(item)[0]),
              };
            })
          ),
        },
      },
      {
        field: 'startTime',
        label: '',
        labelWidth: 0,
        component: 'Input',
        required: true,
        slot: 'startTime',
        colProps: {
          span: 6,
        },
      },
      {
        field: 'endTime',
        label: '',
        labelWidth: 0,
        component: 'Input',
        slot: 'endTime',
        required: true,
        colProps: {
          span: 6,
        },
      },
      {
        field: 'cycleTime',
        label: '至',
        labelWidth: 30,
        component: 'Input',
        slot: 'cycleTime',
        required: true,
        colProps: {
          span: 6,
        },
      },

      {
        field: 'maxBonus',
        label: '会员单次会员单次领取金额上限',
        labelWidth: 180,
        component: 'InputNumber',
        componentProps:{
          placeholder: '未填写则无领取上限',
          min: 1,
        },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'cycleMaxBonus',
        label: '每期派发总金额上限',
        labelWidth: 150,
        component: 'InputNumber',
        componentProps:{
          placeholder: '未填写则无领取上限',
          min: 1,
        },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'platformRegister',
        label: '新注册',
        labelWidth: 60,
        component: 'CheckboxGroup',
        componentProps: {
          options: [].concat(
            props?.dropdownData?.device.filter(item=>!Array.isArray(item)).map((item) => {
              return {
                label: Object.values(item)[0],
                value: Number(Object.keys(item)[0]),
                key: Number(Object.keys(item)[0]),
              };
            })
          ),
        },
        colProps: {
          span: 24,
        },
      },
      {
        field: 'platformLogin',
        label: '登入',
        labelWidth: 60,
        component: 'CheckboxGroup',
        componentProps: {
          options: [].concat(
            props?.dropdownData?.device.filter(item=>!Array.isArray(item)).map((item) => {
              return {
                label: Object.values(item)[0],
                value: Number(Object.keys(item)[0]),
                key: Number(Object.keys(item)[0]),
              };
            })
          ),
        },
        colProps: {
          span: 24,
        },
      },
      {
        field: 'depositServiceCode',
        label: '支付方式',
        labelWidth: 60,
        required: true,
        component: 'CheckboxGroup',
        componentProps: {
          options: [].concat(
            props?.dropdownData?.serviceCode.map((item) => {
              return {
                label: Object.values(item)[0],
                value: Object.keys(item)[0],
                key: Object.keys(item)[0],
              };
            })
          ),
        },
        colProps: {
          span: 24,
        },
      },

      // ----------------------------------------------
      {
        field: 'title_2',
        slot: 'title_2',
        label: '',
        component: 'Input',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'applyWay',
        label: '申请方式',
        labelWidth: 80,
        component: 'RadioGroup',
        required: true,
        colProps: {
          span: 24,
        },
        componentProps: {
          options: [].concat(
            props?.dropdownData?.way.map((item) => {
              return {
                label: Object.values(item)[0],
                value: Number(Object.keys(item)[0]),
                key: Number(Object.keys(item)[0]),
              };
            })
          ),
        },
      },
      {
        field: 'approveWay',
        label: '审核派发方式',
        labelWidth: 90,
        component: 'RadioGroup',
        required: true,
        colProps: {
          span: 12,
        },
        componentProps: {
          options: [].concat(
            //隐藏自助
            props?.dropdownData?.way.filter(item=>Object.keys(item)[0]!=='2').map((item) => {
              return {
                label: Object.values(item)[0],
                value: Number(Object.keys(item)[0]),
                key: Number(Object.keys(item)[0]),
              };
            })
          ),
        },
      },
      {
        field: 'approveCycle',
        label: '审核周期设定',
        labelWidth: 90,
        component: 'RadioGroup',
        required: true,
        colProps: {
          span: 12,
        },
        componentProps: {
          options: [].concat(
            props?.dropdownData?.approveCycle.map((item) => {
              return {
                label: Object.values(item)[0],
                value: Number(Object.keys(item)[0]),
                key: Number(Object.keys(item)[0]),
              };
            })
          ),
        },
      },
      {
        field: 'receiveWay',
        label: '领取方式',
        labelWidth: 80,
        component: 'RadioGroup',
        required: true,
        colProps: {
          span: 12,
        },
        componentProps: {
          options: [].concat(
            //隐藏自助
            props?.dropdownData?.way.filter(item=>Object.keys(item)[0]!=='2').map((item) => {
              return {
                label: Object.values(item)[0],
                value: Number(Object.keys(item)[0]),
                key: Number(Object.keys(item)[0]),
              };
            })
          ),
        },
      },

      // ----------------------------------------------
      {
        field: 'title_3',
        slot: 'title_3',
        label: '',
        component: 'Input',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'excludePromotion',
        slot: 'excludePromotion',
        label: '排除优惠',
        labelWidth: 150,
        component: 'Select',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'excludeMemberTag',
        slot: 'excludeMemberTag',
        label: '排除会员标签',
        labelWidth: 150,
        component: 'Input',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'allowMemberTag',
        slot: 'allowMemberTag',
        label: '允许会员标签',
        labelWidth: 150,
        component: 'Select',
        colProps: {
          span: 24,
        },
      },
      // 目前這階段暫時隱藏
      // {
      //   field: 'allowMemberID',
      //   slot: 'allowMemberID',
      //   label: '允许会员ID',
      //   labelWidth: 150,
      //   component: 'Select',
      //   colProps: {
      //     span: 24,
      //   },
      // },
      // {
      //   field: 'allowVip',
      //   slot: 'allowVip',
      //   label: '允许的VIP',
      //   labelWidth: 150,
      //   component: 'Select',
      //   colProps: {
      //     span: 24,
      //   },
      // },
      // {
      //   field: 'allowAgencyMember',
      //   slot: 'allowAgencyMember',
      //   label: '允许的代理下线会员',
      //   labelWidth: 150,
      //   component: 'Select',
      //   colProps: {
      //     span: 24,
      //   },
      // },
      // ----------------------------------------------
      {
        field: 'title_4',
        slot: 'title_4',
        label: '',
        component: 'Input',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'description',
        component: 'Input',
        label: '说明',
        colProps: {
          span: 24,
        },
        labelWidth: 60,
        render: ({ model, field }) => {
          return h(Tinymce, {
            value: model[field],
            showImageUpload: false,
            options: {
              menubar: false,
              toolbar:
                'redo undo | table | a11ycheck | formatselect bold forecolor backcolor | bullist numlist | link | removeformat',
              plugins: ['table'],
            },
            // plugins: 'table',
            onChange: (value: string) => {
              model[field] = value;
            },
          });
        },
      },
    ];
  });

  const [createPromotionForm, { updateSchema, setFieldsValue, resetFields, validate, setProps }] = useForm({
    labelWidth: 130,
    schemas: promotionFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const init = async (id?: number) => {
    const res = await getPromotionExclude({ ID: id });
    state.promotionExclude = res.list;
  };
  const [createPromotionModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    mode.value = data.mode;
    if (mode.value === 'Edit') {
      updateSchema({field: 'status', show: true});
      currentID.value = data.record.ID;
      init(currentID.value);
      data.record.status = data.record.status === 1 ? true : false;
      originRecord = data.record;
      setFieldsValue({ ...data.record });
      setProps({ disabled: false });
      setModalProps({ okText: '确定修改' });
    } else if (mode.value === 'ShowRowData') {
      updateSchema({field: 'status', show: true});
      currentID.value = data.record.ID;
      init(currentID.value);
      data.record.status = data.record.status === 1 ? true : false;
      originRecord = data.record;
      setFieldsValue({ ...data.record });
      setProps({ disabled: true });
      setModalProps({ okText: '编辑' });
      setFieldsValue({ showPersonalInfo: true, showWebBankInfo: true });
    } else if (mode.value === 'Create') {
      updateSchema({field: 'status', show: false});
      originRecord = {};
      setFieldsValue({status: false});
      init();
      setProps({ disabled: false });
      setModalProps({ okText: '确定新增' });
      setFieldsValue({ showPersonalInfo: false, showWebBankInfo: false });
    }
  });
  const setStarTimeField = (data) => setFieldsValue({ startTime: data });
  const setEndTimeField = (data) => setFieldsValue({ endTime: data });
  const setCycleTimeField = (data) => setFieldsValue({ cycleTime: data });
  const setExcludePromotionTagField = (data) => setFieldsValue({ excludePromotion: data });
  const setAllowMemberTagField = (data) => setFieldsValue({ allowMemberTag: data });
  const setExcludeMemberTagField = (data) => setFieldsValue({ excludeMemberTag: data });

  const handleReset = () => {
    currentID.value = 0;
    name.value = '';
    nameEn.value = '';
    resetFields();
  };
  const handleSubmit = async () => {
    try {
      const payload = await validate();
      if (payload.excludePromotion === undefined || payload.excludePromotion.length < 1)
        payload.excludePromotion = [];
      if (payload.excludeMemberTag === undefined || payload.excludeMemberTag.length < 1)
        payload.excludeMemberTag = [];
      if (payload.allowMemberTag === undefined || payload.allowMemberTag.length < 1)
        payload.allowMemberTag = [];
      if (payload.allowMemberID === undefined || payload.allowMemberID.length < 1)
        payload.allowMemberID = [];
      if (payload.allowAgencyMember === undefined || payload.allowAgencyMember.length < 1)
        payload.allowAgencyMember = [];
      if (payload.allowVip === undefined || payload.allowVip.length <= 1) payload.allowVip = [];

      setModalProps({ confirmLoading: true });
      if (mode.value === 'Edit') {
        payload.ID = currentID.value;
        payload.otp = '';
        if (payload.status === true || originRecord.status === true){
          payload.status = payload.status === true ? 1 : 2;
          openOTP(true, {payload});
        }else{
          payload.status = 2;
          const res = await putPromotion(payload);
          if (res.success) {
            message.success(`成功修改${payload.name}优惠`);
            emit('success');
            closeModal();
          }
        }
      } else if (mode.value === 'ShowRowData') {
        mode.value = 'Edit';
        setProps({ disabled: false });
        setModalProps({ okText: '确定修改' });
      } else {
        payload.status = 2;
        const res = await createPromotion(payload);
        if (res.success) {
          message.success(`成功修改${payload.name}优惠`);
          emit('success');
          closeModal();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };

  const otpSuccess = async (callback: any) => {
    const payload = callback.payload.payload;
    payload.otp = callback.otp;
    const res = await putPromotion(payload);
    if (res.success) {
      message.success(`成功修改${payload.name}优惠`);
      emit('success');
      closeModal();
    }
  };
</script>
