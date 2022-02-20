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

export const subAgencySchemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '代理ID：',
    slot: 'id',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '代理姓名：',
    slot: 'name',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'account',
    component: 'Input',
    label: '代理帳號：',
    slot: 'account',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '手機號：',
    slot: 'phone',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'email',
    component: 'Input',
    label: '信箱：',
    slot: 'email',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'reivewAgencyTime',
    component: 'Input',
    label: '成為代理時間：',
    slot: 'reivewAgencyTime',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'parentAgencyID',
    component: 'Input',
    label: '當前總代ID：',
    colProps: {
      span: 8,
    },
    slot: 'parentAgencyID',
  },
  {
    field: 'parentAgencyAccount',
    component: 'Input',
    label: '當前總代帳號：',
    colProps: {
      span: 8,
    },
    slot: 'parentAgencyAccount',
  },
  {
    field: 'parentAgencyName',
    component: 'Input',
    label: '當前總代姓名：',
    colProps: {
      span: 8,
    },
    slot: 'parentAgencyName',
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'agencyPassword',
    label: '代理後臺密碼：',
    component: 'Input',
    slot: 'agencyPassword',
  },
  {
    field: 'status',
    label: '代理帳號狀態：',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '正常',
          value: 1,
          key: 1,
        },
        {
          label: '黑名單',
          value: 3,
          key: 3,
        },
      ],
    },
    colProps: {
      span: 3,
    },
  },
  {
    field: 'depositLimit',
    label: '存款限制：',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '允許',
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
          label: '允許',
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
    label: '是否計算傭金：',
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
    label: '傭金類型：',
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
