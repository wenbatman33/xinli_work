<template>
  <BasicModal v-bind="$attrs" title="新增他人银行卡" width="400px" :minHeight="100" :height="100" @cancel="init">
    <div class="text-center">
      <Input v-model:value="name" :maxlength="12" style="width: 300px" addonBefore="银行卡用户名" />
      <a-button type="primary" :disabled="name.trim() === '' || name.length < 2" @click="setName"> 确定 </a-button>
      <p class="message mt-4">{{ message }}</p>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Input } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { SetOtherCard } from '/@/api/member/member';
  import { BasicModal } from '/@/components/Modal';

  const route = useRoute();
  const userID = Number(route.params?.id);
  const name = ref('');
  const message = ref('');

  const init = () => {
    name.value = '';
    message.value = '';
  };

  const setName = async() => {
    const params = {
      memberID: userID,
      name: name.value,
    }
    const setAjax = await SetOtherCard(params);
    if (setAjax !== false){
      otpSuccess();
    }
  }

  const otpSuccess = () => {
    message.value = '已新增：' + name.value;
    name.value = '';
  }

  defineExpose({
    otpSuccess
  })

</script>
<style lang="scss" scoped>
  .message {
    color: red;
    font-size: 1.5rem;
  }
</style>