import { FormSchema } from '/@/components/Table';
import type { BannerCategoryItem } from '/@/api/operator/model/bannerModel';
import type { DropdownItem } from '/@/api/promotion/model/listModel';

const defaultItem = {
  label: '全部',
  value: '',
  key: '',
};
export const searchSchemas = (
  allCategory: BannerCategoryItem[],
  device: DropdownItem[]
): FormSchema[] => {
  return [
    {
      field: 'title',
      component: 'Input',
      label: '广告名称',
      colProps: { span: 8 },
      componentProps: {
        placeholder: '请输入广告名称',
      },
    },
    {
      field: 'bannerCategoryID',
      component: 'Select',
      label: '广告分类 ',
      colProps: { span: 8 },
      componentProps: {
        placeholder: '请输入广告分类',
        options:
          allCategory.map((element) => {
            return {
              label: element.name,
              value: String(element.bannerCategoryID),
              key: String(element.bannerCategoryID),
            };
          }) || [],
      },
    },
    {
      field: 'hidden',
      component: 'Select',
      label: '是否显示 ',
      colProps: { span: 8 },
      componentProps: {
        options: [
          {
            label: '全部',
            value: '',
            key: '',
          },
          {
            label: '显示',
            value: 'true',
            key: 'true',
          },
          {
            label: '隐藏',
            value: 'false',
            key: 'false',
          },
        ],
      },
    },
    {
      field: 'device',
      component: 'Select',
      label: '显示装置 ',
      colProps: { span: 8 },
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
      field: 'start',
      component: 'DatePicker',
      label: '上架时间 ',
      colProps: { span: 8 },
      componentProps: {
        placeholder: '请选择上架时间',
      },
    },
  ];
};
