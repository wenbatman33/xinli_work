<template>
  <BasicModal v-bind="$attrs" :autoSubmitOnEnter="true" :centered="true" :canFullscreen="false" @register="registerModal" title="请输入OTP" @visible-change="OTPModalChange" @ok="handleSubmit" :width="400" :minHeight="50">
    <slot></slot>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { useOTPStore } from '/@/store/modules/otp';
  import { defHttp } from '/@/utils/http/axios';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const OTPStore = useOTPStore();
      const { t } = useI18n();

      const otpSchema: FormSchema[] = [
        {
          field: 'otp',
          label: 'OTP',
          required: true,
          component: 'Input',
          componentProps: {
            placeholder: '请输入OTP',
          },
        },
      ];

      const [registerForm, { resetFields, validate }] = useForm({
        labelWidth: 50,
        schemas: otpSchema,
        showActionButtonGroup: false,
        autoFocusFirstItem: true,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        resetFields();
        setModalProps({ confirmLoading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          const params = Object.assign({}, values, OTPStore.requestParams);

          const response = await defHttp.request({
            method: OTPStore.requestMethod,
            url: OTPStore.requestUrl,
            params,
          });
          emit('success', response);
          closeModal();
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      const OTPModalChange = (status) => {
        if (status === false) {
          resetFields();
          OTPStore.openOTP(false);
        }
      };

      return { registerModal, registerForm, handleSubmit, OTPModalChange, t };
    },
  });
</script>
