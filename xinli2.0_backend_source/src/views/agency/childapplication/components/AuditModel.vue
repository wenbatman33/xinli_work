<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="二代申請詳細"
    @visible-change="handleVisibleChange"
    :showOkBtn="false"
    :cancelText="'返回'"
    width="50%"
  >
    <div class="pt-3px pr-3px">
      <Description :column="3" :data="auditData" :schema="auditSchema" />
      <br />
      <BasicForm @register="registerForm" :model="model" />
    </div>
    <template #insertFooter>
      <a-button type="primary" @click="handleConfirm('deny')">拒絕</a-button>
      <a-button
        type="primary"
        :style="{ background: 'green', 'border-color': 'green' }"
        @click="handleConfirm('permit')"
        >通過</a-button
      >
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { Description } from '/@/components/Description/index';
  import {
    putAgencyChildPermit,
    putAgencyChildDeny,
    getAgencyChildDetail,
  } from '/@/api/agency/childapplication';
  import { message } from 'ant-design-vue';

  const schemas: FormSchema[] = [
    {
      field: 'agencyRemark',
      component: 'InputTextArea',
      label: '申請人代理備註：',
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'remark',
      component: 'InputTextArea',
      label: '二級代理備註：',
      colProps: {
        span: 8,
      },
    },
  ];
  const auditSchema = [
    {
      field: 'agencyAccount',
      label: '申請人代理ID',
    },
    {
      field: 'agencyAccount',
      label: '申請人代理帳號',
    },
    {
      field: 'agencyName',
      label: '申請人姓名',
    },
    {
      field: 'applyTime',
      label: '申請時間',
    },
    {
      field: 'childAgencyAccount',
      label: '二級代理帳號',
    },
    {
      field: 'childAgencyName',
      label: '二級代理姓名',
    },
    {
      field: 'reviewTime',
      label: '審核時間',
    },
    {
      field: 'childAgencyApplyTime',
      label: '二代申請代理時間',
    },
    {
      field: 'childAgencyReviewTime',
      label: '二代成為代理時間',
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm, Description },
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

      const [register, { setModalProps, closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      async function onDataReceive(data) {
        console.log('Data Received', data);
        const response = await getAgencyChildDetail({ id: data.record.id });
        console.log('API Received', response);
        // 方式1;
        // setFieldsValue({
        //   field2: data.data,
        //   field1: data.info,
        // });

        // // 方式2
        id.value = data.record.id;
        formData.value = {
          agencyRemark: response.agencyRemark,
          remark: response.remark,
        };
        auditData.value = await getAgencyChildDetail({ id: data.record.id });
        // setProps({
        //   model:{ field2: data.data, field1: data.info }
        // })
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      const handleConfirm = (value) => {
        if (value === 'permit') {
          permitSubmit();
        } else if (value === 'deny') {
          denySubmit();
        }
      };
      const permitSubmit = async () => {
        try {
          const payload = await validate();
          const param = {
            id: id.value,
            remark: payload.remark,
          };
          const result = await putAgencyChildPermit(param);
          result.id ? ResSuccess() : ResError();
        } catch (e) {
          console.log(e);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };
      const denySubmit = async () => {
        try {
          const payload = await validate();
          const param = {
            id: id.value,
            remark: payload.remark,
          };
          const result = await putAgencyChildDeny(param);
          console.log('result', result);
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
        closeModal();
      };
      return {
        register,
        schemas,
        registerForm,
        model: formData,
        auditData: auditData,
        auditSchema,
        handleVisibleChange,
        handleConfirm,
      };
    },
  });
</script>
