import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '帐号',
    dataIndex: 'account',
    width: 120,
    slots: { customRender: 'account' }
  },
  {
    title: '实名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '帐户馀额',
    dataIndex: 'money',
    width: 200,
  },
  {
    title: '线上状态',
    dataIndex: 'current_status',
    width: 100,
    slots: { customRender: 'online' },
  },
  {
    title: '登入状态',
    dataIndex: 'status',
    width: 100,
    slots: { customRender: 'status' },
  },
  {
    title: '注册时间',
    dataIndex: 'created_at',
    width: 180,
  },
  {
    title: '最后访问时间',
    dataIndex: 'last_login_at',
    width: 180,
  },
  {
    title: '注册IP',
    dataIndex: 'register_ip',
    width: 120,
  },
  {
    title: '最后登入IP',
    dataIndex: 'last_login_ip',
    width: 120,
  },
  {
    title: '代理商ID',
    dataIndex: 'agency',
    width: 120,
  },
  {
    title: '三方金流组别',
    dataIndex: 'payment_groups',
    width: 120,
  },
  {
    title: '银行卡金流组别',
    dataIndex: 'bankcard_groups',
    width: 120,
  },
];

export const loginColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '帐号',
    dataIndex: 'account',
    width: 120,
  },
  {
    title: '实名',
    dataIndex: 'name',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'account',
    label: '帐号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'name',
    label: '会员姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'phone',
    label: '电话号码',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'address',
    label: '会员地址',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'email',
    label: '会员email',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'payment_group',
    label: '三方金流组别',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'bankcard_group',
    label: '银行卡组别',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'last_login_at',
    label: '最后访问时间',
    component: 'DatePicker',
    colProps: { span: 6 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    }
  },
  {
    field: 'created_at_start',
    label: '注册时间（起始）',
    component: 'DatePicker',
    colProps: { span: 6 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    }
  },
  {
    field: 'created_at_end',
    label: '注册时间（结束）',
    component: 'DatePicker',
    colProps: { span: 6 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    }
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    colProps: { span: 6 },
    labelWidth: 80,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
        { label: '锁定', value: 3 },
      ],
    },
  },
  {
    field: 'agency',
    label: '代理ID',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'tag',
    label: '标签',
    component: 'Input',
    labelWidth: 60,
    colProps: { span: 6 },
    slot: 'tagSearch'
  },
  {
    field: 'withdraw_limit',
    label: '提款状态',
    component: 'RadioButtonGroup',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: 'normal', value: 1 },
        { label: 'hold', value: 2 },
      ],
    },
  },
  {
    field: 'deposit_limit',
    label: '存款状态',
    component: 'RadioButtonGroup',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: 'normal', value: 1 },
        { label: 'hold', value: 2 },
      ],
    },
  },
  {
    field: 'email_cert',
    label: 'email 绑定',
    component: 'RadioButtonGroup',
    colProps: { span: 6 },
    labelWidth: 100,
    componentProps: {
      options: [
        { label: 'Bind', value: 1 },
        { label: 'UnBind', value: 2 },
      ],
    },
  },
  {
    field: 'name_cert',
    label: '实名绑定',
    component: 'RadioButtonGroup',
    labelWidth: 100,
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: 'Bind', value: 1 },
        { label: 'UnBind', value: 0 },
      ],
    },
  },
  {
    field: 'today_deposit',
    label: '今日存款',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const loginFormSchema: FormSchema[] = [
  {
    field: 'status',
    label: '设定状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
        { label: '锁定', value: 3 },
      ],
    },
  },
  {
    field: 'comment',
    label: '备注',
    required: true,
    component: 'Input',
  },
  
];

export const moneyFormSchema: FormSchema[] = [
  {
    field: 'type',
    label: '存、提款',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '存款', value: 1 },
        { label: '提款', value: 2 },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
  },
  {
    field: 'comment',
    label: '备注',
    required: true,
    component: 'Input',
  },
  
];

export const payFormSchema: FormSchema[] = [
  {
    field: 'bankGroupID',
    component: 'Select',
    label: '银行卡金流群组',
    slot: 'bankgroup',
    
  },
  {
    field: 'payGroupID',
    component: 'Select',
    label: '三方金流群组',
    slot: 'paygroup',
  },
  {
    field: 'comment',
    label: '备注',
    required: true,
    component: 'Input',
  },
  
];

