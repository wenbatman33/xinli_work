import { FormSchema } from '/@/components/Form';
import type { DropdownItem } from '/@/api/promotion/model/listModel';

const defaultItem = {
  label: '全部',
  value: '',
  key: '',
};
export const searchSchemas = (
  status: DropdownItem[],
  promotionCondType: DropdownItem[]
): FormSchema[] => {
  return [
    {
      field: 'ID',
      component: 'Input',
      label: 'ID',
      colProps: { span: 8 },
      componentProps: {
        placeholder: '请输入ID',
      },
      show: false,
    },
    {
      field: 'name',
      component: 'Input',
      label: '优惠名称',
      colProps: { span: 8 },
      componentProps: {
        placeholder: '请输入优惠名称',
      },
    },
    {
      field: 'promotionCondType',
      component: 'Select',
      label: '模板',
      colProps: { span: 8 },
      componentProps: {
        placeholder: '请选择模板',
        options: [defaultItem].concat(
          promotionCondType.map((item) => {
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
      field: 'status',
      component: 'Select',
      label: '状态',
      colProps: { span: 8 },
      componentProps: {
        placeholder: '请选择状态',
        options: [defaultItem].concat(
          status.map((item) => {
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
      isAdvanced: true,
      field: 'startTime',
      component: 'Input',
      label: '优惠开始时间',
      slot: 'startTime',
      colProps: { span: 8 },
    },
    {
      isAdvanced: true,
      field: 'endTime',
      component: 'Input',
      label: '优惠结束时间',
      slot: 'endTime',
      colProps: { span: 8 },
    },
  ];
};
