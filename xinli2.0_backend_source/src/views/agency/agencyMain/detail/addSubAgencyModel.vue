<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="新增所屬二級代理"
    @visible-change="handleVisibleChange"
    :cancelText="'取消'"
    :showOkBtn="false"
    width="50%"
  >
    <div class="pt-3px pr-3px">
      <a-form layout="vertical" :rules="rules" :model="formBasicData" ref="formBasicRef">
        <a-form-item label="新增所屬二級代理帳號：" name="agencyAccount">
          <a-input
            v-model:value="formBasicData.agencyAccount"
            placeholder="請輸入欲榜定的二級帳號"
          />
        </a-form-item>
        <a-form-item>
          <a-button round type="primary" @click="formCheckSubmit">檢查</a-button>
        </a-form-item>
      </a-form>
      <BasicForm @register="registerForm" :model="model">
        <template #id="{ model, field }">
          {{ model[field] }}
        </template>
        <template #name="{ model, field }">
          {{ model[field] }}
        </template>
        <template #account="{ model, field }">
          {{ model[field] }}
        </template>
        <template #phone="{ model, field }">
          {{ model[field] }}
        </template>
        <template #email="{ model, field }">
          {{ model[field] }}
        </template>
        <template #reivewAgencyTime="{ model, field }">
          {{ model[field] }}
        </template>
        <template #parentAgencyID="{ model, field }">
          {{ model[field] }}
        </template>
        <template #parentAgencyAccount="{ model, field }">
          {{ model[field] }}
        </template>
        <template #parentAgencyName="{ model, field }">
          {{ model[field] }}
        </template>
      </BasicForm>
    </div>
    <template #insertFooter>
      <a-button v-if="formBasicData.showOK" type="primary" @click="handleConfirm">確認</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { checkAgencyDetail, changeAgency } from '/@/api/agency/agency';
  import { Row, Col, Input, Button, message, Form } from 'ant-design-vue';
  import { subAgencySchemas } from './detail.data';
  export default defineComponent({
    components: {
      BasicModal,
      BasicForm,
      // ARow: Row,
      // ACol: Col,
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
      const modelRef = ref({});
      const formBasicData = reactive({
        agencyID: '',
        agencyAccount: '',
        parentAgencyID: '',
        showOK: false,
      });
      const formBasicRef = ref();
      const [registerForm] = useForm({
        labelWidth: 120,
        schemas: subAgencySchemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register, { setModalProps, closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });
      async function onDataReceive(data) {
        console.log('Data Received', data);
        formBasicData.agencyID = data.id;
        formBasicData.showOK = false;
      }
      const rules = {
        agencyAccount: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 0, max: 12, message: '長度不能超過12位', trigger: 'blur' },
        ],
      };

      const handleConfirm = async () => {
        try {
          console.warn(formBasicData);
          const param = {
            agencyID: formBasicData.agencyID,
            parentAgencyID: formBasicData.parentAgencyID,
          };
          const result = await changeAgency(param);
          result.id == 0 ? ResSuccess() : ResError();
        } catch (e) {
          console.log(e);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };
      const formCheckSubmit = async () => {
        try {
          formBasicRef.value
            .validate()
            .then(async () => {
              const response = await checkAgencyDetail({
                agencyAccount: formBasicData.agencyAccount,
              });
              formBasicData.parentAgencyID = response.parentAgencyID;
              // console.log('API Received', response);
              modelRef.value = {
                ...response,
              };
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
      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return {
        register,
        registerForm,
        model: modelRef,
        handleVisibleChange,
        formBasicData,
        rules,
        handleConfirm,
        formCheckSubmit,
        formBasicRef,
      };
    },
  });
</script>
