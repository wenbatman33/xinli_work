<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="設定會員轉線"
    @visible-change="handleVisibleChange"
    :showOkBtn="false"
    :cancelText="'返回'"
    width="50%"
  >
    <div class="pt-3px pr-3px">
      <a-form :layout="'vertical'" :rules="rules" :model="formBasicData" ref="formBasicRef">
        <a-form-item label="會員帳號：" name="memberAccount" :style="'margin-bottom: 4px'">
          <a-input v-model:value="formBasicData.memberAccount" placeholder="請輸入會員帳號" />
        </a-form-item>
        <a-form-item>
          <a-button round type="primary" @click="formCheckSubmit">檢查</a-button>
        </a-form-item>
      </a-form>
      <div v-if="formBasicData.showMemberOK">
        <a-row :gutter="[16, 16]">
          <a-col :span="8">會員ID： {{ formMemberData.id }}</a-col>
          <a-col :span="8">會員姓名： {{ formMemberData.name }}</a-col>
          <a-col :span="8">手機號： {{ formMemberData.phone }}</a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :span="8">本月流水： {{ formMemberData.totalAmount }}</a-col>
          <a-col :span="8">本月輸贏： {{ formMemberData.betAmount }}</a-col>
          <a-col :span="8">本月存款： {{ formMemberData.depositAmount }}</a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :span="8">代理ID：{{ formMemberData.parentAgencyID }} </a-col>
          <a-col :span="8">代理姓名：{{ formMemberData.parentAgencyName }} </a-col>
          <a-col :span="8">代理帳號：{{ formMemberData.parentAgencyAccount }} </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :span="24"
            >會員標籤：
            <Tag v-for="tag in SelectedTags" :key="tag.id" :color="tag.color" :closable="false">
              {{ tag.name }}
            </Tag>
          </a-col>
        </a-row>
        <a-form :layout="'vertical'" :rules="rules" :model="formBasicData" ref="formBasicRef">
          <a-form-item label="轉線至代理帳號：" name="agencyAccount" :style="'margin-bottom: 4px'">
            <a-input
              v-model:value="formBasicData.agencyAccount"
              placeholder="請輸入欲轉入之代理帳號"
            />
          </a-form-item>
          <a-form-item>
            <a-button round type="primary" @click="formAgencyCheckSubmit">檢查</a-button>
          </a-form-item>
        </a-form>
        <div v-if="formBasicData.showAgencyOK">
          <a-row :gutter="[16, 16]">
            <a-col :span="8">代理ID： {{ formAgencyData.id }}</a-col>
            <a-col :span="8">代理姓名： {{ formAgencyData.name }}</a-col>
            <a-col :span="8">代理帐号： {{ formAgencyData.account }}</a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col :span="24">
              <BasicForm @register="registerForm" :model="formData" />
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <template #insertFooter>
      <a-button
        v-if="formBasicData.showMemberOK && formBasicData.showAgencyOK"
        type="primary"
        @click="handleConfirm"
      >
        確認
      </a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, nextTick, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { checkMemberNode, checkAgencyNode, updateAgencyNode } from '/@/api/agency/agency';
  import { message, Form, Input, Button, Row, Col, Tag } from 'ant-design-vue';
  import { memberNodeSchemas } from './data';

  export default defineComponent({
    components: {
      BasicModal,
      BasicForm,
      AInput: Input,
      AButton: Button,
      AForm: Form,
      AFormItem: Form.Item,
      ARow: Row,
      ACol: Col,
      Tag,
    },
    props: {
      userData: { type: Object },
    },
    emits: ['reload'],
    setup(props, { emit }) {
      const formData = ref({});
      const SelectedTags: any = ref([]);
      const [registerForm, { validate }] = useForm({
        // labelWidth: 120,
        schemas: memberNodeSchemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const formBasicData = reactive({
        memberAccount: '',
        agencyAccount: '',
        memberID: '',
        toParentAgencyID: '',
        showMemberOK: false,
        showAgencyOK: false,
      });
      const formMemberData = reactive({
        account: '',
        betAmount: '',
        depositAmount: '',
        id: '',
        memberTags: [],
        name: '',
        parentAgencyAccount: '',
        totalAmount: '',
        parentAgencyID: '',
        parentAgencyName: '',
        phone: '',
      });
      const formAgencyData = reactive({
        id: '',
        name: '',
        account: '',
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
              const response = await checkMemberNode({
                account: formBasicData.memberAccount,
              });
              formBasicData.memberID = response.id;
              //set object to reactive
              Object.assign(formMemberData, response);
              SelectedTags.value = response.memberTags;
              if (response.id) formBasicData.showMemberOK = true;
              // response.id ? ' ' : ResError();
            })
            .catch(() => {});
        } catch (e) {
          console.log(e);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };
      const formAgencyCheckSubmit = async () => {
        try {
          formBasicRef.value
            .validate()
            .then(async () => {
              const response = await checkAgencyNode({
                account: formBasicData.agencyAccount,
              });
              formBasicData.toParentAgencyID = response.id;
              //set object to reactive
              Object.assign(formAgencyData, response);
              if (response.id) formBasicData.showAgencyOK = true;
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
        formBasicData.showMemberOK = false;
        formBasicData.showAgencyOK = false;
      }
      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      const handleConfirm = async () => {
        try {
          const payload = await validate();
          const param = {
            memberID: formBasicData.memberID,
            toParentAgencyID: formBasicData.toParentAgencyID,
            remark: payload.remark,
          };
          const result = await updateAgencyNode(param);
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
        formBasicData.showMemberOK = false;
        formBasicData.showAgencyOK = false;
        closeModal();
      };
      return {
        register,
        memberNodeSchemas,
        registerForm,
        formData,
        handleVisibleChange,
        handleConfirm,
        formCheckSubmit,
        formAgencyCheckSubmit,
        rules,
        formBasicData,
        formBasicRef,
        formMemberData,
        formAgencyData,
        SelectedTags,
      };
    },
  });
</script>
