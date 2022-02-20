<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div class="pagewrapper">
      <Alert
        message="提示"
        description="尚未绑定验证码，请绑定手机验证码"
        type="warning"
        class="alert" 
        show-icon
      />
      <Card>
        <div class="card">
          <QrCode v-if="!disabled" :value="qrCodeUrl" :width="500" :style="'margin: 0 auto;'" />
          <h1 v-if="disabled" class="text-2xl text-center">密钥已过期，请重新登入索取新的 qrcode</h1>
          <h1 v-else class="text-2xl text-center">请开启 Google Authenticator 后扫描 Qrcode 绑定验证码后重新进行登入</h1>
          <div class="text-center mt-10">
            <Button type="primary" @click="handleLogin">重新登入</Button>
          </div>
        </div>
      </Card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { QrCode } from '/@/components/Qrcode/index';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Alert, Button } from 'ant-design-vue';
  export default defineComponent({
    name: 'otp',
    components: {
      PageWrapper, Card, Alert, QrCode, Button,
    },
    setup() {
      const disabled = ref(false);
      if (sessionStorage.getItem('qrcode') === null) {
        disabled.value = true;
      }
      const qrCodeUrl = sessionStorage.getItem('qrcode');
      sessionStorage.removeItem('qrcode');

      const handleLogin = () => {
        location.href = '/login';
      };
      return{
        qrCodeUrl,
        disabled,
        handleLogin,
      }
    },
  });
</script>

<style lang="scss" scoped>
.pagewrapper{
  width: 50%;
  margin: 0 auto;
  padding-top: 10vh;
}
.card{
  width: 500px;
  margin: 0 auto;
}
</style>