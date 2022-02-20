<template>
  <BasicModal
    :title="titleRef"
    width="1280px"
    @register="createBannerModal"
    @ok="handleConfirm"
    @cancel="handleReset"
  >
    <BasicForm @register="agencyForm">
      <template #type="{ values, schema }">
        <span>是否为固定分成：</span>
        <RadioGroup button-style="solid" :value="values[schema.field]">
          <RadioButton
            value="2"
            @click="
              setFieldsValue({ type: 2 });
              state.type = 2;
            "
            >是</RadioButton
          >
          <RadioButton
            value="1"
            @click="
              setFieldsValue({ type: 1 });
              state.type = 1;
            "
            >否</RadioButton
          >
        </RadioGroup>
      </template>
      <template #title_1>
        <b>群组条件设定：</b>
      </template>
      <template #title_2>
        <div class="flex justify-center">
          <b style="color: #ce2a2a; text-align: center">
            {{ state.type === 1 ? 'S' : 'S~F' }}
          </b>
        </div>
      </template>
      <template #title_3>
        <div class="flex justify-center">
          <b style="color: #ff8219; text-align: center">A</b>
        </div>
      </template>
      <template #title_4>
        <div class="flex justify-center">
          <b style="color: #fb0; text-align: center">B</b>
        </div>
      </template>
      <template #title_5>
        <div class="flex justify-center">
          <b style="color: #a22db9; text-align: center">C</b>
        </div>
      </template>
      <template #title_6
        ><div class="flex justify-center">
          <b style="color: #6e3fe7; text-align: center">D</b>
        </div>
      </template>
      <template #title_7>
        <div class="flex justify-center">
          <b style="color: #2577e0; text-align: center">E</b>
        </div>
      </template>
      <template #title_8>
        <div class="flex justify-center">
          <b style="color: #00b1a3; text-align: center">F</b>
        </div>
      </template>
      <template #rowTitle_1>
        <p>当月净营利：</p>
      </template>
      <template #rowTitle_2>
        <p>活跃会员数：</p>
      </template>
      <template #rowTitle_3>
        <p>佣金分成：</p>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { message, Radio } from 'ant-design-vue';
  const { Group: RadioGroup, Button: RadioButton } = Radio;
  import { computed, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import type { FormSchema } from '/@/components/Table';
  import { createAgencyRankSetting, updateAgencyRankSetting } from '/@/api/agency/agency';
  const emit = defineEmits(['reload', 'register']);
  const state = reactive({
    mode: '',
    currentID: 0,
    type: 1,
  });

  const titleRef = computed(() => {
    let string = '';
    if (state.mode === 'Create') {
      string = '新增佣金群组';
    } else if (state.mode === 'Edit') {
      string = '编辑佣金群组';
    }
    return string;
  });
  const agencyFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'id',
        component: 'Input',
        label: '群组ID:',
        colProps: {
          span: 8,
        },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'groupName',
        label: '佣金群组名称',
        labelWidth: 120,
        required: true,
        component: 'Input',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'type',
        label: '',
        slot: 'type',
        labelWidth: 120,
        component: 'Input',
        colProps: {
          span: 8,
        },
      },

      {
        field: 'title_1',
        slot: 'title_1',
        label: '',
        component: 'Input',
        colProps: {
          span: 3,
        },
      },
      {
        field: 'title_2',
        slot: 'title_2',
        label: '',
        component: 'Input',
        colProps: {
          span: state.type === 1 ? 3 : 21,
        },
      },
      {
        field: 'title_3',
        slot: 'title_3',
        label: '',
        component: 'Input',
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
      },
      {
        field: 'title_4',
        slot: 'title_4',
        label: '',
        component: 'Input',
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
      },
      {
        field: 'title_5',
        slot: 'title_5',
        label: '',
        component: 'Input',
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
      },
      {
        field: 'title_6',
        slot: 'title_6',
        label: '',
        component: 'Input',
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
      },
      {
        field: 'title_7',
        slot: 'title_7',
        label: '',
        component: 'Input',
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
      },
      {
        field: 'title_8',
        slot: 'title_8',
        label: '',
        component: 'Input',
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
      },
      // -------------------------
      {
        field: 'rowTitle_1',
        slot: 'rowTitle_1',
        label: '',
        component: 'Input',
        colProps: {
          span: 3,
        },
      },
      {
        field: 'rank1MinProfit',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 9999999,
          addonAfter: '元',
        },
        colProps: {
          span: state.type === 1 ? 3 : 21,
        },
        rules: [
          {
            pattern: /^\d{1,7}$/,
            message: '范围在 0~9,999,999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank2MinProfit',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 9999999,
          addonAfter: '元',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,7}$/,
            message: '范围在 0~9,999,999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank3MinProfit',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 9999999,
          addonAfter: '元',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,7}$/,
            message: '范围在 0~9,999,999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank4MinProfit',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 9999999,
          addonAfter: '元',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,7}$/,
            message: '范围在 0~9,999,999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank5MinProfit',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 9999999,
          addonAfter: '元',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,7}$/,
            message: '范围在 0~9,999,999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank6MinProfit',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 9999999,
          addonAfter: '元',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,7}$/,
            message: '范围在 0~9,999,999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank7MinProfit',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 9999999,
          addonAfter: '元',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,7}$/,
            message: '范围在 0~9,999,999',
            trigger: ['change', 'blur'],
          },
        ],
      },

      // -------------------------
      {
        field: 'rowTitle_2',
        slot: 'rowTitle_2',
        label: '',
        component: 'Input',
        colProps: {
          span: 3,
        },
      },
      {
        field: 'rank1ActiveMemberCount',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 999,
          addonAfter: '人',
        },
        colProps: {
          span: state.type === 1 ? 3 : 21,
        },
        rules: [
          {
            pattern: /^\d{1,3}$/,
            message: '范围在 0~999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank2ActiveMemberCount',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 999,
          addonAfter: '人',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,3}$/,
            message: '范围在 0~999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank3ActiveMemberCount',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 999,
          addonAfter: '人',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,3}$/,
            message: '范围在 0~999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank4ActiveMemberCount',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 999,
          addonAfter: '人',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,3}$/,
            message: '范围在 0~999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank5ActiveMemberCount',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 999,
          addonAfter: '人',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,3}$/,
            message: '范围在 0~999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank6ActiveMemberCount',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 999,
          addonAfter: '人',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,3}$/,
            message: '范围在 0~999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank7ActiveMemberCount',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 999,
          addonAfter: '人',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,3}$/,
            message: '范围在 0~999',
            trigger: ['change', 'blur'],
          },
        ],
      },
      // -------------------------
      {
        field: 'rowTitle_3',
        slot: 'rowTitle_3',
        label: '',
        component: 'Input',
        colProps: {
          span: 3,
        },
      },
      {
        field: 'rank1CommissionPercent',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 100,
          addonAfter: '%',
        },
        colProps: {
          span: state.type === 1 ? 3 : 21,
        },
        rules: [
          {
            pattern: /^\d{1,2}$/,
            message: '范围在 0~99',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank2CommissionPercent',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 100,
          addonAfter: '%',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,2}$/,
            message: '范围在 0~99',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank3CommissionPercent',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 100,
          addonAfter: '%',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,2}$/,
            message: '范围在 0~99',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank4CommissionPercent',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 100,
          addonAfter: '%',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,2}$/,
            message: '范围在 0~99',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank5CommissionPercent',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 100,
          addonAfter: '%',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,2}$/,
            message: '范围在 0~99',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank6CommissionPercent',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 100,
          addonAfter: '%',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,2}$/,
            message: '范围在 0~99',
            trigger: ['change', 'blur'],
          },
        ],
      },
      {
        field: 'rank7CommissionPercent',
        label: '',
        component: 'Input',
        required: true,
        componentProps: {
          type: 'number',
          allowClear: false,
          min: 0,
          max: 100,
          addonAfter: '%',
        },
        show: () => state.type === 1,
        colProps: {
          span: 3,
        },
        rules: [
          {
            pattern: /^\d{1,2}$/,
            message: '范围在 0~99',
            trigger: ['change', 'blur'],
          },
        ],
      },
    ];
  });

  const [agencyForm, { setFieldsValue, resetFields, validateFields }] = useForm({
    labelWidth: 80,
    rowProps: { gutter: 10 },
    schemas: agencyFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
      style: { margin: 10 },
    },
  });

  const [createBannerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    state.mode = data.mode;
    state.currentID = data?.record?.id;
    console.warn('DD', data.type);
    state.type = data?.record?.type;
    setFieldsValue({
      id: data?.record?.id,
      groupName: data?.record?.groupName,
      type: data?.record?.type,
      rank1MinProfit: data?.record?.rankContent[0].minProfit,
      rank1ActiveMemberCount: data?.record?.rankContent[0].activeMemberCount,
      rank1CommissionPercent: data?.record?.rankContent[0].commissionPercent,
      rank2MinProfit: data?.record?.rankContent[1].minProfit,
      rank2ActiveMemberCount: data?.record?.rankContent[1].activeMemberCount,
      rank2CommissionPercent: data?.record?.rankContent[1].commissionPercent,
      rank3MinProfit: data?.record?.rankContent[2].minProfit,
      rank3ActiveMemberCount: data?.record?.rankContent[2].activeMemberCount,
      rank3CommissionPercent: data?.record?.rankContent[2].commissionPercent,
      rank4MinProfit: data?.record?.rankContent[3].minProfit,
      rank4ActiveMemberCount: data?.record?.rankContent[3].activeMemberCount,
      rank4CommissionPercent: data?.record?.rankContent[3].commissionPercent,
      rank5MinProfit: data?.record?.rankContent[4].minProfit,
      rank5ActiveMemberCount: data?.record?.rankContent[4].activeMemberCount,
      rank5CommissionPercent: data?.record?.rankContent[4].commissionPercent,
      rank6MinProfit: data?.record?.rankContent[5].minProfit,
      rank6ActiveMemberCount: data?.record?.rankContent[5].activeMemberCount,
      rank6CommissionPercent: data?.record?.rankContent[5].commissionPercent,
      rank7MinProfit: data?.record?.rankContent[6].minProfit,
      rank7ActiveMemberCount: data?.record?.rankContent[6].activeMemberCount,
      rank7CommissionPercent: data?.record?.rankContent[6].commissionPercent,
    });
    if (state.mode === 'Create') {
      setModalProps({ okText: '确定新增' });
    } else if (state.mode === 'Edit') {
      setModalProps({ okText: '确定修改' });
    }
  });
  const handleReset = () => {};
  const handleConfirm = () => {
    if (state.mode === 'Create') {
      createSubmit();
    } else if (state.mode === 'Edit') {
      editSubmit();
    }
  };
  const createSubmit = async () => {
    try {
      const payload = await validateFields();
      const param = {
        groupName: payload.groupName,
        type: payload.type,
        rank1MinProfit: payload.rank1MinProfit,
        rank1ActiveMemberCount: payload.rank1ActiveMemberCount,
        rank1CommissionPercent: payload.rank1CommissionPercent,
        rank2MinProfit: payload.rank2MinProfit,
        rank2ActiveMemberCount: payload.rank2ActiveMemberCount,
        rank2CommissionPercent: payload.rank2CommissionPercent,
        rank3MinProfit: payload.rank3MinProfit,
        rank3ActiveMemberCount: payload.rank3ActiveMemberCount,
        rank3CommissionPercent: payload.rank3CommissionPercent,
        rank4MinProfit: payload.rank4MinProfit,
        rank4ActiveMemberCount: payload.rank4ActiveMemberCount,
        rank4CommissionPercent: payload.rank4CommissionPercent,
        rank5MinProfit: payload.rank5MinProfit,
        rank5ActiveMemberCount: payload.rank5ActiveMemberCount,
        rank5CommissionPercent: payload.rank5CommissionPercent,
        rank6MinProfit: payload.rank6MinProfit,
        rank6ActiveMemberCount: payload.rank6ActiveMemberCount,
        rank6CommissionPercent: payload.rank6CommissionPercent,
        rank7MinProfit: payload.rank7MinProfit,
        rank7ActiveMemberCount: payload.rank7ActiveMemberCount,
        rank7CommissionPercent: payload.rank7CommissionPercent,
      };
      console.warn('payload', payload);
      const result = await createAgencyRankSetting(param);
      result.id ? ResSuccess() : ResError();
      emit('reload');
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  const editSubmit = async () => {
    try {
      const payload = await validateFields();
      console.warn('payload', payload);
      const param = {
        groupID: state.currentID,
        groupName: payload.groupName,
        type: payload.type,
        rank1MinProfit: payload.rank1MinProfit,
        rank1ActiveMemberCount: payload.rank1ActiveMemberCount,
        rank1CommissionPercent: payload.rank1CommissionPercent,
        rank2MinProfit: payload.rank2MinProfit,
        rank2ActiveMemberCount: payload.rank2ActiveMemberCount,
        rank2CommissionPercent: payload.rank2CommissionPercent,
        rank3MinProfit: payload.rank3MinProfit,
        rank3ActiveMemberCount: payload.rank3ActiveMemberCount,
        rank3CommissionPercent: payload.rank3CommissionPercent,
        rank4MinProfit: payload.rank4MinProfit,
        rank4ActiveMemberCount: payload.rank4ActiveMemberCount,
        rank4CommissionPercent: payload.rank4CommissionPercent,
        rank5MinProfit: payload.rank5MinProfit,
        rank5ActiveMemberCount: payload.rank5ActiveMemberCount,
        rank5CommissionPercent: payload.rank5CommissionPercent,
        rank6MinProfit: payload.rank6MinProfit,
        rank6ActiveMemberCount: payload.rank6ActiveMemberCount,
        rank6CommissionPercent: payload.rank6CommissionPercent,
        rank7MinProfit: payload.rank7MinProfit,
        rank7ActiveMemberCount: payload.rank7ActiveMemberCount,
        rank7CommissionPercent: payload.rank7CommissionPercent,
      };
      const result = await updateAgencyRankSetting(param);
      result.groupID ? ResSuccess() : ResError();
      emit('reload');
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  const ResError = () => {
    state.mode === 'Edit' ? message.error(`编辑佣金群组失败`) : message.error(`新增佣金群组失败`);
    closeModal();
  };
  const ResSuccess = () => {
    state.mode === 'Edit'
      ? message.success(`编辑佣金群组成功`)
      : message.success(`新增佣金群组成功`);
    closeModal();
  };
</script>
