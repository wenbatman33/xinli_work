<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="新增代理"
    @visible-change="handleVisibleChange"
    :showOkBtn="false"
    :cancelText="'返回'"
    width="50%"
  >
    <div class="pt-3px pr-3px">
      <a-form layout="vertical" :rules="rules" :model="formBasicData" ref="formBasicRef">
        <a-form-item label="會員帳號：" name="memberAccount">
          <a-input v-model:value="formBasicData.memberAccount" placeholder="請輸入會員帳號" />
        </a-form-item>
        <a-form-item>
          <a-button round type="primary" @click="formCheckSubmit">檢查</a-button>
        </a-form-item>
      </a-form>
      <BasicForm @register="registerForm" :model="model" />
    </div>
    <template #insertFooter>
      <a-button v-if="formBasicData.showOK" type="primary" @click="handleConfirm">確認</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import {
    checkMemberDetail,
    getAgencyRankSettingOption,
    setMemberToAgency,
  } from '/@/api/agency/agency';
  import { message, Form, Input, Button } from 'ant-design-vue';

  const schemas: FormSchema[] = [
    {
      field: 'account',
      component: 'Input',
      label: '代理帳號：',
      rules: [{ required: true, message: '必填' }],
      colProps: {
        span: 8,
      },
    },
    {
      field: 'password',
      label: '密碼：',
      component: 'InputPassword',
      required: true,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'passwordRepeat',
      label: '確認密碼',
      component: 'InputPassword',
      required: true,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '姓名：',
      rules: [{ required: true, message: '必填' }],
      colProps: {
        span: 8,
      },
    },
    {
      field: 'giveOffer',
      label: '是否計算傭金：',
      component: 'Select',
      defaultValue: 1,
      componentProps: {
        options: [
          {
            label: '是',
            value: 1,
            key: 1,
          },
          {
            label: '否',
            value: 2,
            key: 2,
          },
        ],
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'rankGroupID',
      label: '傭金類型：',
      component: 'ApiSelect',
      componentProps: () => {
        return {
          api: getAgencyRankSettingOption,
          resultField: 'list',
          // use name as label
          labelField: 'value',
          // use id as value
          valueField: 'key',
          // not request untill to select
          immediate: false,
        };
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'phone',
      component: 'Input',
      label: '手機號：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'email',
      component: 'Input',
      label: '郵箱：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'wechat',
      component: 'Input',
      label: '郵箱：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'qq',
      component: 'Input',
      label: '郵箱：',
      colProps: {
        span: 8,
      },
    },
  ];
  export default defineComponent({
    components: {
      BasicModal,
      BasicForm,
      AInput: Input,
      AButton: Button,
      AForm: Form,
      AFormItem: Form.Item,
    },
    props: {
      userData: { type: Object },
    },
    emits: ['reload'],
    setup(props, { emit }) {
      const formData = ref({});
      const auditData = ref({});
      const id = ref({});
      const [registerForm, { validate }] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const formBasicData = reactive({
        memberAccount: '',
        memberID: '',
        showOK: false,
      });
      const formBasicRef = ref();
      const rules = {
        memberAccount: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 0, max: 12, message: '長度不能超過12位', trigger: 'blur' },
        ],
      };
      const [register, { setModalProps, closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });
      const formCheckSubmit = async () => {
        try {
          formBasicRef.value
            .validate()
            .then(async () => {
              const response = await checkMemberDetail({
                account: formBasicData.memberAccount,
              });
              formBasicData.memberID = response.id;

              if (response.id) formBasicData.showOK = true;
              // response.id ? ' ' : ResError();
            })
            .catch(() => {});
        } catch (e) {
          console.log(e);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };
      async function onDataReceive(data) {
        // console.log('Data Received', data);
        // setProps({
        //   model:{ field2: data.data, field1: data.info }
        // })
        formBasicData.showOK = false;
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      const handleConfirm = async () => {
        try {
          const payload = await validate();
          const param = {
            account: payload.account,
            password: payload.password,
            passwordRepeat: payload.passwordRepeat,
            memberID: formBasicData.memberID,
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            wechat: payload.wechat,
            qq: payload.qq,
            giveOffer: payload.giveOffer,
            rankGroupID: payload.rankGroupID,
          };
          const result = await setMemberToAgency(param);
          result.id ? ResSuccess() : ResError();
        } catch (e) {
          console.log(e);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };

      const ResError = () => {
        message.error(`编辑失败`);
        handleModalClose();
      };
      const ResSuccess = () => {
        message.success(`编辑成功`);
        handleModalClose();
      };
      const handleModalClose = () => {
        emit('reload');
        formBasicData.showOK = false;
        closeModal();
      };
      return {
        register,
        schemas,
        registerForm,
        model: formData,
        auditData: auditData,
        handleVisibleChange,
        handleConfirm,
        formCheckSubmit,
        rules,
        formBasicData,
        formBasicRef,
      };
    },
  });
</script>
