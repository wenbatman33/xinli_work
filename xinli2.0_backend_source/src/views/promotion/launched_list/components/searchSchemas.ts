import { FormSchema } from '/@/components/Form';
import type { DropdownItem } from '/@/api/promotion/model/listModel';

const defaultItem = {
  label: '全部',
  value: '',
  key: '',
};
export const searchSchemas = (
  status: DropdownItem[],
  device: DropdownItem[],
  display: DropdownItem[]
): FormSchema[] => {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '优惠名称',
      colProps: { span: 6 },
      defaultValue: '',
      componentProps: {
        placeholder: '请输入优惠名称',
      },
    },
    {
      field: 'display',
      component: 'Select',
      label: '显示',
      colProps: { span: 6 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择显示',
        options: [defaultItem].concat(
          display.map((item) => {
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
      colProps: { span: 6 },
      // defaultValue: '',
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
      field: 'device',
      component: 'Select',
      label: '装置',
      colProps: { span: 6 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择装置',
        options: [defaultItem].concat(
          device.map((item) => {
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
