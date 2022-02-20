<template>
  <PageWrapper>
      <Row class="row" :gutter="[20, 20]">
        <Col :span="12">
          <Card>
            <Divider :orientation="'center'" style="font-size:1.5rem">PC 设定</Divider>
            <BasicForm @register="pcForm" @submit="handlePCSubmit"/>
          </Card>
        </Col>
        <Col :span="12">
          <Card>
            <Divider :orientation="'center'" style="color: #F00; font-size:1.5rem">H5 &amp; PWA 设定</Divider>
            <BasicForm @register="h5Form" @submit="handleH5Submit"/>
          </Card>
        </Col>
      </Row>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Row, Col, Divider } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Form/index';
  import { getLoginPCConfig, getLoginH5Config, updateLoginPCConfig, updateLoginH5Config, getAuthVendor } from '/@/api/systemManage/systemManage';
  import { useMessage } from '/@/hooks/web/useMessage';
  
  export default defineComponent({
    components: { PageWrapper, Card, Row, Col, BasicForm, Divider },
    setup() {
      const { createMessage } = useMessage();
      const closeOption = [{
        label: '关闭',
        value: 0,
      }];
      const options = ref(closeOption);
      onMounted(() => {
        getAuthVendor().then(res => {
          options.value = closeOption.concat(res.list);
        });
        getLoginPCConfig().then(res => {
          setPcForm(transformConfig(res));
        });
        getLoginH5Config().then(res => {
          setH5Form(transformConfig(res));
        });
      });

      const loginFormSchema: FormSchema[] = computed(()=>{ return [
        {
          field: 'registerVerify',
          label: '注册需行为验证',
          component: 'RadioButtonGroup',
          colProps: { span: 24 },
          defaultValue: '0',
          componentProps: {
            options: options.value.map((item) => {
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
            options: options.value.map((item) => {
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
      ];});
      const [pcForm, { setFieldsValue: setPcForm, getFieldsValue: getPcForm }] = useForm({
        labelWidth: 150,
        schemas: loginFormSchema,
        showResetButton: false,
        submitButtonOptions: {
          text: '储存 PC 设定'
        },
        actionColOptions: {
          span: 24,
        },
      });
      const [h5Form, { setFieldsValue: setH5Form, getFieldsValue: getH5Form }] = useForm({
        labelWidth: 150,
        schemas: loginFormSchema,
        showResetButton: false,
        submitButtonOptions: {
          text: '储存 H5 & PWA 设定'
        },
        actionColOptions: {
          span: 24,
        },
      });

      function transformConfig(data){
        return {
          registerVerify: data.register.verify ? 0 : data.register.verifyLine,
          loginVerify: data.login.verify ? 0 : data.login.verifyLine,
          loginSms: data.login.smsVerify,
          loginErrorLimit: data.login.errorLimit,
          loginLockTime: data.login.lockTime,
          loginLockLimit: data.login.lockLimit,
          loginSmsInterval: data.login.smsInterval,
          loginSmsLimit: data.login.smsLimit, 
          loginSmsGapTime: data.login.smsGapTime,
        }
      }

      function unTransformConfig(data){
        return {
          login: {
            verify: data.loginVerify === 0 ? true : false,
            smsVerify: data.loginSms,
            verifyLine: data.loginVerifyLine === 0 ? 0 : data.loginVerify,
            errorLimit: data.loginErrorLimit,
            lockTime: data.loginLockTime,
            lockLimit: data.loginLockLimit,
            smsInterval: data.loginSmsInterval,
            smsLimit: data.loginSmsLimit,
            smsGapTime: data.loginSmsGapTime,
          },
          register: {
            verify: data.registerVerify === 0 ? true : false,
            verifyLine: data.registerVerify === 0 ? 0 : data.registerVerify,
          }
        }
      }

      async function handlePCSubmit(){
        await updateLoginPCConfig(unTransformConfig(getPcForm()));
        createMessage.success('更新成功');
      }
      async function handleH5Submit(){
        await updateLoginH5Config(unTransformConfig(getH5Form()));
        createMessage.success('更新成功');
      }

      return { 
        pcForm,
        h5Form,
        handlePCSubmit,
        handleH5Submit,
      };
    }
  });
</script>
<style lang="scss" scoped>
::v-deep(.ant-divider-horizontal){
  margin: 8px 0 24px;
}
::v-deep(.ant-form-item-label .text-secondary){
  display: block;
}
::v-deep(.ant-form-item.suffix-item){
  .ant-form-item-control{
    margin-top: 0;
  }
  .suffix{
    flex: 2 1 0%;
  }
}
</style>