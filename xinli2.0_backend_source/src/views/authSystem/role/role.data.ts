import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { updateRole } from '/@/api/authSystem/system';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'roleID',
    width: 60,
  },
  {
    title: '群组名称',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '启用',
        unCheckedChildren: '停用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 2;
          const { createMessage } = useMessage();
          const params = {
            roleID: record.roleID,
            roleName: record.roleName,
            note: record.note,
            status: newStatus,
          }
          updateRole(params)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改群组状态`);
            })
            .catch(() => {
              createMessage.error('修改群组状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '修改时间',
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
    title: '权限列表',
    dataIndex: 'authList',
    width: 100,
    slots: { customRender: 'authList' },
  },
  {
    title: '选单列表',
    dataIndex: 'menuList',
    width: 100,
    slots: { customRender: 'menuList' },
  },
  {
    title: '检视群组帐号',
    dataIndex: 'hasAuths',
    width: 120,
    slots: { customRender: 'hasAuths' },
  },
  {
    title: '备注',
    dataIndex: 'note',
  },
  {
    title: '启用人数',
    dataIndex: 'activeUsers',
    width: 80,
  },
  {
    title: '总人数',
    dataIndex: 'totalUsers',
    width: 80,
  },
];


export const formSchema: FormSchema[] = [
  {
    field: 'roleID',
    label: '群组ID',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => values.roleID,
    componentProps: { disabled: true },
  },
  {
    field: 'roleName',
    label: '群组名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'note',
    label: '备注',
    component: 'Input',
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('值不能为空');
          }
          if (value.length < 6 || value.length > 50) {
            /* eslint-disable-next-line */
            return Promise.reject('备注长度最小 6 最长设定为 50。');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
  },
];

export const authFormSchema: FormSchema[] = [
  {
    field: 'roleID',
    label: '群组ID',
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'roleName',
    label: '群组名称',
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    label: '',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];

export const hasAuthFormSchema: FormSchema[] = [
  {
    field: 'roleID',
    label: '群组ID',
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'roleName',
    label: '群组名称',
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'users',
    component: 'Select',
    label: '有此权限的帐号',
    slot: 'users_selector',
    defaultValue: [],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '群组名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'note',
    label: '备注',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: undefined,
    colProps: { span: 4 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
  },
];