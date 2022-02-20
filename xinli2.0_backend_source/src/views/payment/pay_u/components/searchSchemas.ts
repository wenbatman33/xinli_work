import { FormSchema } from '/@/components/Table';

export const searchSchemas = (): FormSchema[] => {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '帐户名称',
      colProps: { span: 4 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请输入帐户名称',
      },
    },
    {
      field: 'useType',
      component: 'Select',
      label: '用途',
      colProps: { span: 4 },
      // defaultValue: '',
      componentProps: {
        // options: [defaultItem],
        options: [
          {
            label: '全部',
            key: '-1',
            value: -1
          },
          {
            label: '无',
            key: '0',
            value: '0'
          },
          {
            label: '出款',
            key: '1',
            value: '1'
          },
          {
            label: '结算',
            key: '2',
            value: '2'
          },
          {
            label: '中转',
            key: '3',
            value: '3'
          },
          {
            label: '仓库',
            key: '4',
            value: '4'
          },
        ]
      },
    },
    {
      field: 'type',
      component: 'Select',
      label: '钱包类型',
      colProps: { span: 4 },
      // defaultValue: '',
      componentProps: {
        // options: [defaultItem],
        options: [
          {
            label: '全部',
            key: '0',
            value: '0',
          },
          {
            label: 'ERC',
            key: '2',
            value: '2',
          },
          {
            label: 'TRC',
            key: '3',
            value: '3',
          },
        ]
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态',
      colProps: { span: 4 },
      // defaultValue: '',
      componentProps: {
        placeholder: '请选择状态',
        options: [
          {
            label: '全部',
            key: '0',
            value: 0,
          },
          {
            label: '启用',
            key: '1',
            value: 1,
          },
          {
            label: '停用',
            key: '2',
            value: 2,
          },
        ]
      },
    },
  ];
};
