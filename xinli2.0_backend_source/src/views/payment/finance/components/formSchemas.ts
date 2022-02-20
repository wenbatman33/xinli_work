import { FormSchema } from '/@/components/Form';
import { FinanceItem } from '/@/api/payment/model/financeModel';
import { DropdownItem } from '/@/api/payment/model/payChannelServiceModel';
import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';

/**
 * Finance form schemas
 * @returns Form schema array
 */
export const financeSchemas: FormSchema[] = [
  {
    field: 'status',
    component: 'Select',
    label: '显示状态',
    defaultValue: '0',
    colProps: {
      span: 10,
    },
    componentProps: {
      options: [
        {
          label: '全部',
          value: '0',
          key: '0',
        },
        {
          label: '开启',
          value: '1',
          key: '1',
        },
        {
          label: '关闭',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    field: 'maintain',
    component: 'Select',
    label: '维护状态',
    defaultValue: '0',
    colProps: {
      span: 10,
    },
    componentProps: {
      options: [
        {
          label: '全部',
          value: '0',
          key: '0',
        },
        {
          label: '维护中',
          value: '1',
          key: '1',
        },
        {
          label: '正常',
          value: '2',
          key: '2',
        },
      ],
    },
  },
];

/**
 * Edit form schemas
 * @returns Form schema array
 */
export const editSchemas = (record?: FinanceItem): FormSchema[] => {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '前台名称',
      defaultValue: record?.name || '',
      required: true,
      componentProps: {
        placeholder: '请输入名称',
      },
    },
    {
      field: 'note',
      component: 'InputTextArea',
      label: '备注',
      defaultValue: record?.note || '',
    },
    {
      field: 'nums',
      component: 'Input',
      label: '同时启用线路数量',
      defaultValue: record?.nums || 0,
      rules: [
        {
          required: true,
        },
        {
          pattern: /^\d+$/,
          message: '数量必须是正整数',
        },
      ],
      componentProps: {
        type: 'number',
        min: 0,
      },
    },
    {
      field: 'status',
      component: 'Switch',
      label: '前台显示',
      defaultValue: record?.status,
      componentProps: {
        checkedValue: 1,
        unCheckedValue: 2,
      },
    },
    {
      field: 'maintain',
      component: 'Switch',
      label: '维护状态',
      defaultValue: record?.maintain,
      componentProps: {
        checkedValue: 1,
        unCheckedValue: 2,
      },
    },
  ];
};

/**
 * Add modal form schemas
 * @param serviceCodes 支付方式列表
 * @param payGroups 三方金流群組列表
 * @param bankcardGroups 存款卡金流群組列表
 * @returns Form schema array
 */
export const addSchemas = (
  serviceCodes: DropdownItem[],
  payGroups: GetPayGroupsResponse[],
  bankcardGroups: GetPayGroupsResponse[]
): FormSchema[] => {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '线路名称',
      colProps: {
        span: 5,
      },
      componentProps: {
        placeholder: '请输入线路名称',
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态',
      defaultValue: 0,
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '启用',
            value: 1,
            key: 1,
          },
          {
            label: '停用',
            value: 2,
            key: 2,
          },
        ],
      },
    },
    {
      field: 'serviceCode',
      component: 'Select',
      label: '支付方式',
      colProps: {
        span: 5,
      },
      defaultValue: '',
      componentProps: {
        options: [
          {
            label: '全部',
            value: '',
            key: '',
          },
        ].concat(
          serviceCodes.map((element) => {
            const key = Object.keys(element)[0];
            const value = element[key];
            return {
              label: value,
              value: key,
              key: key,
            };
          })
        ),
      },
    },
    {
      field: 'payGroupID',
      component: 'Select',
      label: '三方金流组别',
      colProps: {
        span: 5,
      },
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: '全部' as unknown,
            value: 0 as unknown,
            key: 0 as unknown,
          },
        ].concat(
          payGroups.map((element) => {
            return {
              label: element.name,
              value: element.ID,
              key: element.ID,
            };
          })
        ),
      },
    },
    {
      field: 'bankGroupID',
      component: 'Select',
      label: '银行卡金流组别',
      colProps: {
        span: 5,
      },
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: '全部' as unknown,
            value: 0 as unknown,
            key: 0 as unknown,
          },
        ].concat(
          bankcardGroups.map((element) => {
            return {
              label: element.name,
              value: element.ID,
              key: element.ID,
            };
          })
        ),
      },
    },
  ];
};
