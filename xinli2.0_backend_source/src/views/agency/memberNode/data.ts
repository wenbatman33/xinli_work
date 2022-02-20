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

export const memberNodeSchemas: FormSchema[] = [
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注：',
    colProps: {
      span: 8,
    },
    rules: [{ min: 0, max: 40, message: '長度不能超過40', trigger: 'blur' }],
  },
];
export const accountFormSchema: FormSchema[] = [
  {
    field: 'agencyPassword',
    label: '代理后台密码：',
    component: 'Input',
    slot: 'agencyPassword',
  },
  {
    field: 'status',
    label: '代理帐号状态：',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '正常',
          value: 1,
          key: 1,
        },
        {
          label: '黑名单',
          value: 3,
          key: 3,
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'depositLimit',
    label: '存款限制：',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '允许',
          value: 1,
          key: 1,
        },
        {
          label: '禁止',
          value: 2,
          key: 2,
        },
      ],
    },
    colProps: {
      span: 3,
    },
  },
  {
    field: 'withdrawLimit',
    label: '提款限制：',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '允许',
          value: 1,
          key: 1,
        },
        {
          label: '禁止',
          value: 2,
          key: 2,
        },
      ],
    },
    colProps: {
      span: 3,
    },
  },
  {
    field: 'giveOffer',
    label: '是否计算佣金：',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '是',
          value: 1,
          key: 1,
        },
        {
          label: '否',
          value: 2,
          key: 2,
        },
      ],
    },
    colProps: {
      span: 3,
    },
  },
  {
    field: 'rankGroupID',
    label: '佣金类型：',
    component: 'ApiSelect',
    componentProps: () => {
      return {
        api: getAgencyRankSettingOption,
        resultField: 'list',
        // use name as label
        labelField: 'value',
        // use id as value
        valueField: 'key',
        // not request untill to select
        immediate: true,
      };
    },
    colProps: {
      span: 3,
    },
  },
];
