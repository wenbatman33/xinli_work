import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'fnID',
    width: 100,
  },
  {
    title: '权限名称',
    dataIndex: 'fnName',
    width: 160,
    align: 'left',
  },
  {
    title: '权限key',
    dataIndex: 'fnKey',
    width: 160,
  },
  {
    title: '创建时间',
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
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   width: 120,
  //   customRender: ({ record }) => {
  //     if (!Reflect.has(record, 'pendingStatus')) {
  //       record.pendingStatus = false;
  //     }
  //     return h(Switch, {
  //       checked: record.status === 1,
  //       checkedChildren: '启用',
  //       unCheckedChildren: '停用',
  //       loading: record.pendingStatus,
  //       onChange(checked: boolean) {
  //         record.pendingStatus = true;
  //         const newStatus = checked ? 1 : 2;
  //         const { createMessage } = useMessage();
  //         const params = {
  //           roleID: record.roleID,
  //           roleName: record.roleName,
  //           note: record.note,
  //           status: newStatus,
  //         }
  //         updateRole(params)
  //           .then(() => {
  //             record.status = newStatus;
  //             createMessage.success(`已成功修改群组状态`);
  //           })
  //           .catch(() => {
  //             createMessage.error('修改群组状态失败');
  //           })
  //           .finally(() => {
  //             record.pendingStatus = false;
  //           });
  //       },
  //     });
  //   },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'fnID',
    label: 'ID',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => values.fnID,
    componentProps: { disabled: true },
  },
  {
    field: 'fnName',
    label: '权限名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'fnKey',
    label: '权限key',
    component: 'Input',
    componentProps:{
      placeholder: '选单权限一律以 __menu 开头',
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('值不能为空');
          }
          if (value.length < 4 || value.length > 100) {
            /* eslint-disable-next-line */
            return Promise.reject('权限功能 key 最小 4 最长设定为 100。');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'parentID',
    label: '上级权限',
    component: 'TreeSelect',

    componentProps: {
      replaceFields: {
        title: 'fnName',
        key: 'fnID',
        value: 'fnID',
      },
      getPopupContainer: () => document.body,
    },
    // required: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'fnID',
    label: 'ID',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'fnName',
    label: '权限名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'fnKey',
    label: '权限key',
    component: 'Input',
    colProps: { span: 6 },
  },
];