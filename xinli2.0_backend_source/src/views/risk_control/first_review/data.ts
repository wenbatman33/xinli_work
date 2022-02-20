import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'memberID',
    width: 80,
  },
  {
    title: '会员帐号',
    dataIndex: 'account',
    width: 150,
    slots: { customRender: 'account' }
  },
  {
    title: '代理来源',
    dataIndex: 'agent',
    width: 150,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 150,
  },
  {
    title: '注册IP',
    dataIndex: 'registerIp',
    width: 150,
    slots: { customRender: 'registerIp' }
  },
  {
    title: '注册装置',
    dataIndex: 'registerDevice',
    width: 150,
    slots: { customRender: 'registerDevice' }
  },
  {
    title: 'IP地区',
    dataIndex: 'ipLocation',
    width: 100,
  },
  {
    title: '手机地区',
    dataIndex: 'phoneLocation',
    width: 100,
  },
  {
    title: '银行卡地区',
    dataIndex: 'bankCardLocation',
    width: 100,
  },
  {
    title: '注册时间',
    dataIndex: 'registerDate',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.registerDate);
      let dateB = new Date(b.registerDate);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    },
  },
];

export const IPcolumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'memberID',
    width: 80,
  },
  {
    title: '会员帐号',
    dataIndex: 'account',
    width: 150,
  },
  {
    title: '代理来源',
    dataIndex: 'agent',
    width: 150,
  },
  {
    title: '注册时间',
    dataIndex: 'registerDate',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.registerDate);
      let dateB = new Date(b.registerDate);
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
    title: '登入时间',
    dataIndex: 'loginDate',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.loginDate);
      let dateB = new Date(b.loginDate);
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
    title: '注册IP',
    dataIndex: 'registerIp',
    width: 100,
  },
  {
    title: '注册装置',
    dataIndex: 'registerDevice',
    width: 100,
  },
  {
    title: '登入IP',
    dataIndex: 'loginIp',
    width: 100,
  },
  {
    title: '登入装置',
    dataIndex: 'loginDevice',
    width: 100,
  },
];
