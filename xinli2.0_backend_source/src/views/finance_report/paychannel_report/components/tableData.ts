import { BasicColumn } from '/@/components/Table/src/types/table';
import moment from 'moment';

export const tableColumns: BasicColumn[] = [
  // {
  //   title: 'id',
  //   dataIndex: 'id',
  //   width: 40,
  //   ifShow: false,
  // },
  {
    title: '交易时间',
    dataIndex: 'createdAt',
    width: 150,
    ellipsis: true,
    sorter: (a, b) => {
      const A = a.createdAt ? a.createdAt : '';
      const B = b.createdAt ? b.createdAt : '';
      return Number(new Date(A)) - Number(new Date(B));
    },
    format: (val) => moment(val).format('YYYY/MM/DD HH:mm:ss'),
  },
  {
    title: '科目',
    dataIndex: 'subjectID',
    width: 80,
    ellipsis: true,
    slots: {
      customRender: 'subjectID',
    },
  },
  {
    title: '收',
    dataIndex: 'in',
    width: 80,
    ellipsis: true,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '支',
    dataIndex: 'out',
    width: 80,
    ellipsis: true,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '手续费',
    dataIndex: 'fee',
    width: 80,
    ellipsis: true,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '结余',
    dataIndex: 'remainBalance',
    width: 80,
    ellipsis: true,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '冻结结余',
    dataIndex: 'frozenBalance',
    width: 80,
    ellipsis: true,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '相关单号',
    dataIndex: 'relationID',
    width: 80,
    ellipsis: true,
  },
  {
    title: '三方单号',
    dataIndex: 'thirdID',
    width: 80,
    ellipsis: true,
  },
  {
    title: '交易对象',
    dataIndex: 'targetType',
    width: 150,
    ellipsis: true,
    format: (val) => {
      /** 交易對象類型 0无对象 1商户号 2会员 3银行卡 4代理 */
      let target = '';
      if (Number(val) === 0) {
        target = '无对象';
      } else if (Number(val) === 1) {
        target = '商户号';
      } else if (Number(val) === 2) {
        target = '会员';
      } else if (Number(val) === 3) {
        target = '银行卡';
      } else if (Number(val) === 4) {
        target = '代理';
      }
      return target;
    },
  },
  {
    title: '执行人',
    dataIndex: 'editorName',
    width: 80,
    ellipsis: true,
  },
  {
    title: '备注',
    dataIndex: 'note',
    width: 100,
    ellipsis: true,
    slots: {
      customRender: 'note',
    },
  },
];
