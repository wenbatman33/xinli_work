import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '使用者',
    dataIndex: 'account',
    width: 150,
  },
  {
    title: '动作',
    dataIndex: 'action',
    width: 130,
    slots: { customRender: 'action' },
  },
  {
    title: '对象',
    dataIndex: 'target',
    width: 300,
    align: 'left',
  },
  {
    title: '操作时间',
    dataIndex: 'time',
    width: 150,
  },
  {
    title: '内容',
    dataIndex: 'sub_data',
    slots: { customRender: 'subData' },
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'startDate',
    label: '开始日期',
    component: 'DatePicker',
    colProps: { span: 4 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    }
  },
  {
    field: 'endDate',
    label: '结束日期',
    component: 'DatePicker',
    colProps: { span: 4 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    }
  },
  {
    field: 'account',
    label: '使用者',
    component: 'Input',
    colProps: { span: 4 },
  },
];