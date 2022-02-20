import { FormSchema } from '/@/components/Form';
import type { DropdownItem } from '/@/api/payment/model/payChannelServiceModel';

const defaultItem = {
  label: '全部',
  value: '',
  key: '',
};
export const searchSchemas = (
  serviceCode: DropdownItem[],
  method: DropdownItem[],
  payChannelName: DropdownItem[],
  payChannel: DropdownItem[],
  bankGroups: DropdownItem[],
  thirdGroups: DropdownItem[]
): FormSchema[] => {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '线路名称',
      colProps: { span: 8 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择线路名称',
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '线路状态',
      colProps: { span: 8 },
      // defaultValue: '1',
      componentProps: {
        placeholder: '请选择线路状态',
        options: [
          {
            label: '全部',
            value: '',
            key: '',
          },
          {
            label: '启用',
            value: '1',
            key: '1',
          },
          {
            label: '停用',
            value: '0',
            key: '0',
          },
        ],
      },
    },
    {
      field: 'serviceCode',
      component: 'Select',
      label: '支付方式',
      colProps: { span: 8 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择支付方式',
        options: [defaultItem].concat(
          serviceCode.map((item) => {
            return {
              label: Object.values(item)[0],
              value: Object.keys(item)[0],
              key: Object.keys(item)[0],
            };
          })
        ),
      },
    },
    {
      field: 'method',
      component: 'Select',
      label: '结帐方式',
      colProps: { span: 8 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择结帐方式',
        options: [defaultItem].concat(
          method.map((item) => {
            return {
              label: Object.values(item)[0],
              value: Object.keys(item)[0],
              key: Object.keys(item)[0],
            };
          })
        ),
      },
    },
    // {
    //   field: 'payChannelNameID',
    //   component: 'Select',
    //   label: '商户',
    //   colProps: { span: 8 },
    //   defaultValue: '',
    //   componentProps: {
    //     placeholder: '请选择商户',
    //     options: [defaultItem].concat(
    //       payChannelName.map((item) => {
    //         return {
    //           label: item.value as string,
    //           value: item.key as string,
    //           key: item.key as string,
    //         };
    //       })
    //     ),
    //   },
    // },
    {
      field: 'payChannelID',
      component: 'Select',
      label: '商户号',
      colProps: { span: 8 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择商户号',
        options: [defaultItem].concat(
          payChannel.map((item) => {
            return {
              label: String(item.value),
              value: String(item.key),
              key: String(item.key),
            };
          })
        ),
      },
    },
    {
      field: 'bankGroupID',
      component: 'Select',
      label: '银行卡金流组别',
      colProps: { span: 8 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择银行卡金流组别',
        options: [defaultItem].concat(
          bankGroups.map((item) => {
            return {
              label: String(item.value),
              value: String(item.key),
              key: String(item.key),
            };
          })
        ),
      },
    },
    {
      field: 'thirdGroupID',
      component: 'Select',
      label: '三方金流組別',
      colProps: { span: 8 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择三方金流組別',
        options: [defaultItem].concat(
          thirdGroups.map((item) => {
            return {
              label: String(item.value),
              value: String(item.key),
              key: String(item.key),
            };
          })
        ),
      },
    },
  ];
};
