import { UpdateAccount } from '/@/api/authSystem/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'adminID',
    width: 80,
  },
  {
    title: '使用者帐号',
    dataIndex: 'account',
    width: 160,
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
          console.log(record)
          const params = {
            adminID: record.adminID,
            name: record.name,
            deptID: record.deptID,
            title: record.title,
            vpnIP: record.vpnIP,
            commentCategory: record.commentCategory,
            roleID: record.roles.length > 0 ? record.roles[0].roleID : 0,
            status: newStatus,
          }
          UpdateAccount(params)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改状态`);
            })
            .catch(() => {
              createMessage.error('修改状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '群组',
    dataIndex: 'roles',
    width: 120,
    slots: { customRender: 'roles' }
  },
  {
    title: '部门',
    dataIndex: 'deptID',
    width: 120,
    slots: { customRender: 'dept' }
  },
  {
    title: '职称',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '最后登入',
    dataIndex: 'lastLoginAt',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.lastLoginAt);
      let dateB = new Date(b.lastLoginAt);
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
  
];

const defaultItem = {
  label: '全部',
  value: '',
  key: '-1',
};

export const searchFormSchema = (fnGroupList, deptList): FormSchema[] => {
  return [
    {
      field: 'adminID',
      label: 'ID',
      component: 'Input',
      componentProps: {
        type: 'number',
      },
      colProps: { span: 6 },
    },
    {
      field: 'account',
      label: '使用者帐号',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      field: 'status',
      label: '状态',
      component: 'RadioButtonGroup',
      defaultValue: undefined,
      colProps: { span: 6 },
      componentProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '停用', value: 2 },
        ],
      },
    },
    {
      field: 'roles',
      label: '群组',
      component: 'Select',
      colProps: { span: 6 },
      componentProps: {
        placeholder: '请选择群组',
        options: [defaultItem].concat(
          fnGroupList.map((item) => {
            return {
              label: item.roleName,
              value: item.roleID,
              key: item.roleID,
            };
          })
        ),
      },
    },
    {
      field: 'deptID',
      label: '部门',
      component: 'Select',
      colProps: { span: 6 },
      componentProps: {
        placeholder: '请选择部门',
        options: [defaultItem].concat(
          deptList.map((item) => {
            return {
              label: item.deptName,
              value: item.deptID,
              key: item.deptID,
            };
          })
        ),
      },
    },
    {
      field: 'title',
      label: '职称',
      component: 'Input',
      colProps: { span: 6 },
    },
  ];
};

export const accountFormSchema: FormSchema[] = [
  {
    field: 'adminID',
    label: 'ID',
    component: 'Input',
    required: false,
    show: false,
    componentProps: {
      disabled: 'disabled'
    }
  },
  {
    field: 'account',
    label: '使用者帐号',
    component: 'Input',
    // helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    componentProps: {
      autoComplete: "new-password"
    },
    rules: [
      {
        required: true,
        message: '请输入使用者帐号',
      },
      {
        // @ts-ignore
        validator: async (rule, value) => {
          if (value.length < 6){
            return Promise.reject('密码长度不能小于6位');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    show: true,
    componentProps: {
      autoComplete: "new-password"
    },
  },
  {
    field: 'password2',
    label: '确认密码',
    component: 'InputPassword',
    show: true,
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (value !== values.password) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    required: true,
  },
  {
    field: 'email',
    label: 'Email',
    component: 'Input',
    required: true,
  },
  {
    label: '部门',
    field: 'deptID',
    component: 'Select',
    slot: 'deptSelect',
    required: true,
  },
  {
    field: 'title',
    label: '职称',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('职称不能为空');
          }
          if (value.length < 2) {
            /* eslint-disable-next-line */
            return Promise.reject('职称需两个字元以上');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'vpnIP',
    label: 'VPN IP',
    component: 'Input',
    required: true,
  },
  {
    label: '备注绑定词',
    field: 'commentCategory',
    component: 'Input',
    required: true,
  },
  {
    label: '状态',
    field: 'status',
    component: 'Input',
    show: false,
  },
  {
    label: '权限群组',
    field: 'fnRole',
    component: 'Select',
    slot: 'roleSelect',
  },
];

export const passwordFormSchema: FormSchema[] = [
  {
    field: 'adminID',
    label: 'ID',
    component: 'Input',
    required: true,
    show: true,
    componentProps: {
      disabled: 'disabled'
    }
  },
  {
    field: 'newpassword',
    label: '新密码',
    component: 'InputPassword',
    show: true,
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('值不能为空');
          }
          if (value.length < 6 || value.length > 20) {
            /* eslint-disable-next-line */
            return Promise.reject('密码 最小 6 最长设定为 20。');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'password2',
    label: '确认密码',
    component: 'InputPassword',
    show: true,
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('不能为空');
            }
            if (value !== values.newpassword) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];

export const myPasswordFormSchema: FormSchema[] = [
  {
    field: 'oldPassword',
    label: '旧密码',
    component: 'InputPassword',
    show: true,
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('值不能为空');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'newpassword',
    label: '新密码',
    component: 'InputPassword',
    show: true,
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('值不能为空');
          }
          if (value.length < 6 || value.length > 20) {
            /* eslint-disable-next-line */
            return Promise.reject('密码 最小 6 最长设定为 20。');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'password2',
    label: '确认密码',
    component: 'InputPassword',
    show: true,
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('不能为空');
            }
            if (value !== values.newpassword) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];