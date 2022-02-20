import { FormSchema } from '/@/components/Table';
import type { DropdownItem, BankList, CityList } from '/@/api/payment/model/payBankCardModel';

const defaultItem = {
  label: '全部',
  value: '',
  key: '',
};

export const searchSchemas = (
  status: DropdownItem[],
  type: DropdownItem[],
  gender: DropdownItem[],
  banks: BankList[],
  city: CityList[]
): FormSchema[] => {
  return [
    {
      field: 'cardNo',
      component: 'Input',
      label: '卡号',
      colProps: { span: 8 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请输入卡号',
      },
    },
    {
      field: 'accountName',
      component: 'Input',
      label: '户名',
      colProps: { span: 8 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请输入户名',
      },
    },
    {
      field: 'type',
      component: 'Select',
      label: '卡片用途',
      colProps: { span: 8 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择卡片用途',
        // options: [defaultItem],
        options: [defaultItem].concat(
          type.map((element) => {
            return {
              label: Object.values(element)[0],
              value: Object.keys(element)[0],
              key: Object.keys(element)[0],
            };
          })
        ),
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态',
      colProps: { span: 8 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择状态',
        options: [defaultItem].concat(
          status.map((element) => {
            return {
              label: Object.values(element)[0],
              value: Object.keys(element)[0],
              key: Object.keys(element)[0],
            };
          })
        ),
      },
    },
    {
      field: 'payBankID',
      component: 'Select',
      label: '银行名称',
      colProps: { span: 8 },
      defaultValue: '',
      componentProps: {
        placeholder: '请选择银行名称',
        options: [defaultItem].concat(
          banks.map((element) => {
            return {
              label: element.bankName,
              value: element.id,
              key: element.bankCode,
            };
          })
        ),
      },
    },
  ];
};
