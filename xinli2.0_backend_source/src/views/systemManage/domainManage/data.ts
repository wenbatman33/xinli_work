import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '域名名称',
    dataIndex: 'name',
    width: 180,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: '设定名称&显示名称',
    dataIndex: 'displayName',
    width: 180,
  },
  {
    title: '域名',
    dataIndex: 'domain',
    width: 250,
  },
  {
    title: '备注',
    dataIndex: 'note',
    width: 180,
  },
];

export const groupSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => values.id,
    componentProps: { disabled: true },
  },
  {
    field: 'name',
    label: '域名名称',
    component: 'Input',
    required: true,
    componentProps: {
      maxlength: 20,
    }
  },
  {
    field: 'sort',
    label: '排序',
    component: 'Input',
    required: true,
    defaultValue: 99,
    rules: [
      {
        pattern: /^\+?[1-9][0-9]*$/,
        message: '请输入正整数',
        trigger: 'blur',
        required: true,
      },
    ],
  },
  {
    field: 'setName',
    label: '设定名称＆显示名称',
    component: 'Input',
    required: true,
  },
];

export const domainSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => values.id,
    componentProps: { disabled: true },
  },
  {
    label: '隶属群组',
    field: 'groupID',
    component: 'Select',
    required: true,
    slot: 'group',
  },
  {
    field: 'name',
    label: '域名名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'displayName',
    label: '设定名称＆显示名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'domain',
    label: '域名',
    component: 'Input',
    required: true,
    rules: [
      {
        pattern: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
        message: '请输入合法域名',
        trigger: 'blur',
        required: true,
      },
    ],
  },
  {
    field: 'note',
    label: '备注',
    component: 'Input',
    componentProps: {
      maxlength: 40,
    }
  },
];
