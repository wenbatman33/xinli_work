import { FormSchema } from '/@/components/Form/index';
export const loginFormSchema = (options): FormSchema[] => {
  return [
    {
      field: 'registerVerify',
      label: '注册需行为验证',
      component: 'RadioButtonGroup',
      colProps: { span: 24 },
      defaultValue: '0',
      componentProps: {
        options: options.map((item) => {
          return {
            label: item.label,
            value: item.value,
            key: item.value,
          };
        }),
      },
    },
    {
      field: 'loginVerify',
      label: '登入需行为验证',
      component: 'RadioButtonGroup',
      colProps: { span: 24 },
      defaultValue: '0',
      componentProps: {
        options: options.map((item) => {
          return {
            label: item.label,
            value: item.value,
            key: item.value,
          };
        }),
      },
    },
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '',
    },
    {
      field: 'loginSms',
      label: '二阶段简讯验证',
      subLabel: '关闭时改为验证手机号码',
      component: 'Switch',
      colProps: { span: 24 },
      defaultValue: false,
    },
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '设定登入锁定条件',
    },
    {
      field: 'loginErrorLimit',
      label: '连续错误锁定次数',
      component: 'Input',
      colProps: { span: 24 },
      suffix: '次（连续错误达此数字时锁定）',
    },
    {
      field: 'loginLockTime',
      label: '锁定时间',
      component: 'Input',
      colProps: { span: 24 },
      suffix: '秒（间隔多少时间可再次登入）',
    },
    {
      field: 'loginLockLimit',
      label: '客服锁死次数',
      component: 'Input',
      colProps: { span: 24 },
      suffix: '次（连续错误达此数字时锁定，需客服解锁）',
    },
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '简讯发送间隔与次数',
    },
    {
      field: 'loginSmsInterval',
      label: '简讯发送间隔',
      component: 'Input',
      colProps: { span: 24 },
      suffix: '秒（过指定秒数后，会员才能再次要求简讯）',
    },
    {
      field: 'loginSmsLimit',
      label: '发送次数',
      component: 'Input',
      colProps: { span: 24 },
      suffix: '次（达此数字时不再提供简讯发送锁定暂不发验证码）',
    },
    {
      field: 'loginSmsGapTime',
      label: '连续错误间隔时间',
      component: 'Input',
      colProps: { span: 24 },
      suffix: '秒（连续错误达发送次数时，隔此秒数后再发验证码）',
    },
  ];
};