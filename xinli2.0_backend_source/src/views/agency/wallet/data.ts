import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
import { ColorEnum } from '/@/enums/colorEnum';
import { getAgencyRankSettingOption } from '/@/api/agency/agency';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

const statusTagRender = (curVal) => {
  const color = curVal ? ColorEnum.SUCCESS : ColorEnum.ERROR;
  const text = curVal ? '线上' : '离线';
  return h(Tag, { color }, text);
};

export const adjustTypeOption = [
  {
    label: '特殊上分（上分）',
    value: 1,
  },
  {
    label: '佣金派发（上分）',
    value: 2,
  },
  {
    label: '会员上分（下分）',
    value: 3,
  },
  {
    label: '特殊扣款（下分）',
    value: 4,
  },
]

export const agencySearchSchema: FormSchema[] = [
  {
    field: 'agencyID',
    label: '代理ID',
    component: 'Input',
    colProps: {
      span: 6,
    },
  },
  {
    field: 'agencyAccount',
    label: '代理帐号',
    component: 'Input',
    colProps: {
      span: 6,
    },
  },
  {
    field: 'exactlyMatching',
    component: 'RadioGroup',
    label: ' ',
    defaultValue: 1,
    labelWidth: 50,
    componentProps: {
      options: [
        { label: '模糊搜寻', value: 1 },
        { label: '精确搜寻', value: 2 },
      ],
    },
    show: false,
    colProps: {
      span: 3,
    },
  },
];

export const agencyDetailSchema = [
  {
    field: 'id',
    label: '代理ID',
  },
  {
    field: 'account',
    label: '代理帐号',
  },
  {
    field: 'name',
    label: '代理姓名',
  },
  {
    field: 'agencyWallet',
    label: '钱包馀额',
  },
  {
    field: 'reivewAgencyTime',
    label: '成为代理日期',
  },
];

export const adjustFromSchema: FormSchema[] = [
  {
    field: 'type',
    label: '异动类型',
    component: 'Select',
    required: true,
    componentProps: {
      options: adjustTypeOption
    },
    colProps: {
      span: 6,
    }
  },
  {
    field: 'refMemberAccount',
    label: '会员帐号',
    component: 'Input',
    ifShow: ({model}) => {
      return model.type === 3 ? true : false;
    },
    colProps: {
      span: 6,
    }
  },
  {
    field: 'refMemberID',
    label: '会员帐号',
    component: 'Input',
    show: false,
  },
  {
    field: 'amount',
    label: '异动金额',
    component: 'InputNumber',
    componentProps: {
      min: 0,
    },
    required: true,
    helpMessage: '上分类型为增加 (输入为绿字)、下分为减少 (输入为红字)，只能输入数字，最多至小数点第二位',
  },
  {
    field: 'turnoverLimit',
    label: '流水限额',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 0,
    },
    helpMessage: '若异动为上分类型，此栏位输入之数字为增加流水；若异动为下分类型，此栏位输入之数字为减少流水；只能输入数字，最多至小数点第二位。非必填，若此栏位未输入，预设流水上分同「异动金额」、预设流水下分为0',
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    required: true,
  },
];

export const adjustCheckSchema = [
  {
    field: 'id',
    label: '代理ID',
  },
  {
    field: 'account',
    label: '代理帐号',
  },
  {
    field: 'agencyWallet',
    label: '钱包馀额',
  },
  {
    field: 'type',
    label: '异动类型',
    render: (val) => {
      return adjustTypeOption.find(item => item.value === Number(val))?.label;
    }
  },
  {
    field: 'amount',
    label: '异动金额',
  },
  {
    field: 'refMemberAccount',
    label: '会员帐号',
    show: (val) => {
      return val.type === 3 ? true : false;
    }
  },
  {
    field: 'turnoverLimit',
    label: '流水限额',
  },
  {
    field: 'remark',
    label: '备注',
  },
];

export const adjustReviewSchema = [
  {
    field: 'agencyID',
    label: '代理ID',
  },
  {
    field: 'agencyAccount',
    label: '代理帐号',
  },
  {
    field: 'balanceAfter',
    label: '钱包馀额',
  },
  {
    field: 'type',
    label: '异动类型',
    render: (val) => {
      return adjustTypeOption.find(item => item.value === Number(val))?.label;
    }
  },
  {
    field: 'amount',
    label: '异动金额',
  },
  {
    field: 'refMemberAccount',
    label: '会员帐号',
    show: (val) => {
      return val.type === 3 ? true : false;
    }
  },
  {
    field: 'turnoverLimit',
    label: '流水限额',
  },
  {
    field: 'remark',
    label: '备注',
  },
];