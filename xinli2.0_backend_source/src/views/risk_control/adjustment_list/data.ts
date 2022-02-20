import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { adjustReasonOptions } from '/@/views/risk_control/adjustment/data';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '交易ID',
    dataIndex: 'transactionID',
    width: 200,
  },
  {
    title: '会员名称',
    dataIndex: 'memberName',
    width: 180,
  },
  {
    title: '上/下分',
    dataIndex: 'adjustmentType',
    width: 120,
    customRender: ({record}) => {
      return record.adjustmentType === 1 ? '上分':'下分';
    }
  },
  {
    title: '申请单名称',
    dataIndex: 'subject',
    width: 180,
  },
  {
    title: '调整原因',
    dataIndex: 'reason',
    width: 180,
    customRender: ({record}) => {
      return adjustReasonOptions.find(item => item.value === record.reason)?.label;
    }
  },
  {
    title: '金额',
    dataIndex: 'finalAmount',
    width: 180,
  },
  {
    title: '交易时间',
    dataIndex: 'verifyAt',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.verifyAt);
      let dateB = new Date(b.verifyAt);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.updatedAt);
      let dateB = new Date(b.updatedAt);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  {
    title: '更新者',
    dataIndex: 'updateUser',
    width: 180,
  },
  {
    title: '交易状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return record.status === 1 ? '通过':'回绝';
    }
  },
];

export const searchFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'memberName',
      label: '会员',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      field: 'reason',
      label: '调整原因',
      component: 'Select',
      colProps: { span: 6 },
      componentProps: {
        options: adjustReasonOptions,
      },
    },
    {
      field: 'status',
      label: '交易状态',
      component: 'Select',
      colProps: { span: 6 },
      componentProps: {
        options: [
        {
          label: '通过',
          value: 1,
          key: 1,
        },
        {
          label: '回绝',
          value: 2,
          key: 2,
        },],
      },
    },
    {
      field: 'transactionID',
      label: '交易ID',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'updateUser',
      label: '更新者',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      isAdvanced: false,
      field: 'verifyDate',
      component: 'Input',
      label: '交易时间',
      slot: 'date',
      componentProps: {
        verifyDateStart: 'verifyDateStart',
        verifyDateEnd: 'verifyDateEnd',
      },
      colProps: {
        span: 18,
      },
    },
    {
      show: false,
      field: 'verifyDateStart',
      component: 'Input',
      label: '交易时间开始',
    },
    {
      show: false,
      field: 'verifyDateEnd',
      component: 'Input',
      label: '交易时间结束',
    },
  ];
};
