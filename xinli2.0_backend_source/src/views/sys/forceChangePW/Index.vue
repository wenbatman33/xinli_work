<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div class="pagewrapper">
      <Alert
        message="警告"
        description="距离最后一次修改密码已经超过30天，请设定新密码"
        type="warning"
        class="alert" 
        show-icon
      />
      <Card class="card">
        <BasicForm @register="registerForm" />
      </Card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { myPasswordFormSchema } from '/@/views/authSystem/account/account.data';
  import { UpdatePassword } from '/@/api/authSystem/system';
  import { Card, Alert } from 'ant-design-vue';

  export default defineComponent({
    name: 'ForceChangePW',
    components: { PageWrapper, BasicForm, Card, Alert },
    setup() {
      const [registerForm, { validate }] = useForm({
        labelWidth: 100,
        schemas: myPasswordFormSchema,
        showResetButton: false,
        submitButtonOptions: {
          text: '修改密码'
        },
        actionColOptions: {
          span: 24,
        },
        submitFunc: submitPW
      });

      async function submitPW() {
        try{
          const values = await validate();
          // TODO custom api
          console.log(values);
          const params = {
            oldPassword: values.oldPassword,
            password: values.newpassword,
          }
          await UpdatePassword(params);
          alert('密码修改完成，请使用新密码重新登入');
          location.href = "/login";
        } finally {
          
        }
      }

      return {
        registerForm
      };
    },
  });
</script>

<style lang="scss" scoped>
.pagewrapper{
  width: 50%;
  margin: 0 auto;
  padding-top: 10vh;
}
</style>