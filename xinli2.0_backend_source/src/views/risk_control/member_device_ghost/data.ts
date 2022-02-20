import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

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
    title: '实名',
    dataIndex: 'realName',
    width: 150,
  },
  {
    title: '代理来源',
    dataIndex: 'agent',
    width: 150,
  },
  {
    title: '注册IP',
    dataIndex: 'registerIp',
    width: 150,
  },
  {
    title: '最后登入IP',
    dataIndex: 'loginIp',
    width: 100,
  },
  {
    title: '注册时间',
    dataIndex: 'registerDate',
    width: 180,
  },
  {
    title: '最后登入时间',
    dataIndex: 'loginDate',
    width: 180,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 100,
    slots: { customRender: 'tags' }
  },
];

export const devices_columns: BasicColumn[] = [
  {
    title: '装置ID',
    dataIndex: 'deviceID',
    width: 80,
  },
  {
    title: '总人数',
    dataIndex: 'totalMemberCount',
    width: 150,
  },
  {
    title: '锁帐号人数',
    dataIndex: 'lockMemberCount',
    width: 150,
  },
  {
    title: '多帐号Tag数',
    dataIndex: 'multiAccountTags',
    width: 100,
  },
  {
    title: '关联代理号',
    dataIndex: 'relateAgent',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'memberName',
    label: '会员名称',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'deviceID',
    label: '装置ID',
    component: 'Input',
    colProps: { span: 4 },
  },
];