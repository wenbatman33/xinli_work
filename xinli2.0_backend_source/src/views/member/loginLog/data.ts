import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '会员帐号',
    dataIndex: 'account',
    width: 180,
  },
  {
    title: '实名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '注册时间',
    dataIndex: 'registeredAt',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.registeredAt);
      let dateB = new Date(b.registeredAt);
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
    title: '登入地点',
    dataIndex: 'loginArea',
    width: 120,
  },
  {
    title: '登入IP',
    dataIndex: 'loginIP',
    width: 120,
  },
  {
    title: '登入装置',
    dataIndex: 'loginDeviceID',
    width: 120,
  },
  {
    title: '登入设备',
    dataIndex: 'loginDeviceType',
    width: 120,
  },
  {
    title: '登入时间',
    dataIndex: 'createdAt',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
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
    title: '登入结果',
    dataIndex: 'success',
    width: 120,
    customRender: ({record}) => {
      return record.success === 1 ? '成功' : '失败';
    }
  },
  {
    title: '登入失败原因',
    dataIndex: 'failReason',
    width: 120,
    customRender: ({record}) => {
      let mess = '-';
      if (record.failReason === 2) {
        mess = '密码错误';
      } else if (record.failReason === 3) {
        mess = '帐号不存在';
      } else if (record.failReason === 4) {
        mess = '图形验证码错误';
      } else if (record.failReason === 5) {
        mess = '行为验证错误';
      } else if (record.failReason === 6) {
        mess = '简讯验证码错误';
      } else if (record.failReason === 7) {
        mess = '其他';
      }
      return mess;
    }
  },
];

export const searchFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'account',
      label: '会员帐号',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'loginIP',
      label: '登入IP',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'loginDeviceID',
      label: '登入装置',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      isAdvanced: false,
      field: 'loginTime',
      component: 'Input',
      label: '登入时间',
      slot: 'date',
      componentProps: {
        loginStartTime: 'loginStartTime',
        loginEndTime: 'loginEndTime',
      },
      colProps: {
        span: 12,
      },
    },
    {
      show: false,
      field: 'loginStartTime',
      component: 'Input',
      label: '登入时间开始',
    },
    {
      show: false,
      field: 'loginEndTime',
      component: 'Input',
      label: '登入时间结束',
    },
    {
      isAdvanced: false,
      field: 'registeredAt',
      component: 'Input',
      label: '注册时间',
      slot: 'registerDate',
      componentProps: {
        registerStartTime: 'registerStartTime',
        registerEndTime: 'registerEndTime',
      },
      colProps: {
        span: 12,
      },
    },
    {
      show: false,
      field: 'registerStartTime',
      component: 'Input',
      label: '注册时间开始',
    },
    {
      show: false,
      field: 'registerEndTime',
      component: 'Input',
      label: '注册时间结束',
    },
  ];
};
