import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import { ColorEnum } from '/@/enums/colorEnum';

import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const memberDetailSchema= [
  {
    field: 'id',
    label: 'ID',
  },
  {
    field: 'account',
    label: '帳號',
  },
  {
    field: 'ip',
    label: 'IP',
    render: (curVal, data) => {
      return `${curVal}(${data.ipArea})`;
    },
  },
  {
    field: 'status',
    label: '登入状态',
    render: (val) => {
      if (val === 1){
        return '启用';
      }else if(val === 2){
        return '停用';
      }else if(val === 3){
        return '锁定';
      }else{
        return '不明状态';
      }
    },
  },
  {
    field: 'depositLimit',
    label: '存款状态',
    render: (val) => {
      return val === 1 ? '启用':'停用';
    },
  },
  {
    field: 'withdrawLimit',
    label: '提款状态',
    render: (val) => {
      return val === 1 ? '启用':'停用';
    },
  },
  {
    field: 'name',
    label: '实名',
  },
  {
    field: 'phone',
    label: '电话',
    render: (curVal, data) => {
      return `${curVal}(${data.phoneArea})`;
    },
  },
  {
    field: 'email',
    label: '邮箱',
  },
  {
    field: 'address',
    label: '地址',
  },
  {
    field: 'bankcardGroups.name',
    label: '银行卡金流组别',
  },
  {
    field: 'paymentGroups.name',
    label: '三方金流组别',
  },
  {
    field: 'bankcardArea',
    label: '银行卡隶属地',
  },
  {
    field: 'usdts',
    label: 'USDT',
    render: (curVal) => {
      const target = curVal || [];
      const defaultVal = target.find(item=>item.is_default === 1);
      const text = defaultVal ? defaultVal.address: target.length === 0 ? '':curVal[0].address;
      return text;
    }
  },
  {
    field: 'vipLevel',
    label: 'VIP等级/状态',
    render: (val) => {
      return val === 0 ? '-' : `LV:${val}`;
    }
  },
  {
    field: 'currentStatus',
    label: '线上状态',
    render: (curVal) => {
      const color = curVal ? ColorEnum.SUCCESS:ColorEnum.ERROR;
      const text = curVal ? '线上':'离线';
      return h(Tag, { color }, ()=>text);
    }
  },
  
];

export const userFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    required: false,
    show: false,
    componentProps: {
      disabled: 'disabled'
    }
  },
  {
    field: 'account',
    label: '帐号',
    component: 'Input',
    required: false,
    show: false,
    componentProps: {
      disabled: 'disabled'
    }
  },
  {
    field: 'name',
    label: '实名',
    component: 'Input',
  },
  {
    field: 'phone',
    label: '电话',
    component: 'Input',
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
  },
  {
    field: 'address',
    label: '地址',
    component: 'Input',
  },
  {
    field: 'status',
    label: '登入状态',
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
    field: 'depositLimit',
    label: '存款状态',
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
    field: 'withdrawLimit',
    label: '提款状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
  },
];

export const passwordFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '用戶ID',
    component: 'Input',
    show: true,
    componentProps: {
      disabled: 'disabled'
    }
  },
  {
    field: 'password',
    label: '新密码',
    component: 'InputPassword',
    show: true,
    componentProps: {
      autocomplete: 'off'
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('值不能为空');
          }
          const pw_regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
          if (!pw_regex.test(value)) {
            /* eslint-disable-next-line */
            return Promise.reject('需 8-16 个字元，至少一个英文大写字母和至少一个数字，不可使用特殊符号');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'password2',
    label: '确认密码',
    component: 'InputPassword',
    show: true,
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('不能为空');
            }
            if (value !== values.password) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];

export const walletTotalSchema= [
  {
    field: 'totalMoney',
    label: '钱包总额',
    span: '2',
  },
  {
    field: 'totalDeposit',
    label: '总存款',
  },
  {
    field: 'totalWithdraw',
    label: '总提款',
  },
  {
    field: 'totalWin',
    label: '总输赢',
  },
  {
    field: 'totalBonus',
    label: '总红利',
  },
  {
    field: 'totalRate',
    label: '总流水',
  },
  {
    field: 'totalRefound',
    label: '总返水',
  },
  {
    field: 'totalLock',
    label: '冻结馀额',
  },
  
];

export const depositSchema= [
  {
    field: 'amount',
    label: '存款总额',
  },
  {
    field: 'max',
    label: '最大金额',
  },
  {
    field: 'count',
    label: '存款笔数',
  },
  {
    field: 'avg',
    label: '平均金额',
  },
];

export const commentFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'commentCategory',
    label: '绑定词',
    component: 'Input',
    required: true,
    componentProps: {
      disabled: 'disabled'
    }
  },
  {
    field: 'title',
    label: '简述',
    component: 'Input',
    required: true,
  },
  {
    field: 'content',
    label: '全文',
    component: 'InputTextArea',
    required: false,
    componentProps:{
      autoSize: { minRows: 5, maxRows: 10 }
    }
  },
];

export const contentSchema = [
  {
    field: 'content',
    label: '全文',
    span: 3
  },
  {
    field: 'creator',
    label: '建立者',
  },
  {
    field: 'category',
    label: '綁定詞',
    span: 2,
  },
  {
    field: 'createdAt',
    label: '建立时间',
  },
  {
    field: 'updator',
    label: '修改者',
  },
  {
    field: 'updatedAt',
    label: '最后修改时间',
  },
]

export const depositTableColumn: BasicColumn[] = [
  {
    title: '流水号',
    dataIndex: 'id',
    width: 180,
  },
  {
    title: '更新者',
    dataIndex: 'editorName',
    width: 80,
  },
  {
    title: '备注',
    dataIndex: 'note',
    width: 120,
    align: 'left'
  },
  {
    title: '方式',
    dataIndex: 'type',
    width: 60,
    slots: {
      customRender: 'type',
    },
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: 120,
  },
  {
    title: '时间',
    dataIndex: 'updatedAt',
    width: 120,
  },
];
