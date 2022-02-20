<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="審核確認"
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
  import { putAgencyDetail, getAgencyDetail } from '/@/api/agency/childapplication';
  import { getAgencyRankSettingOption } from '/@/api/agency/agency';
  import { message } from 'ant-design-vue';

  const schemas: FormSchema[] = [
    {
      field: 'calculative',
      label: '是否計算傭金：',
      component: 'Select',
      defaultValue: true,
      componentProps: {
        options: [
          {
            label: '是',
            value: true,
            key: 1,
          },
          {
            label: '否',
            value: false,
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
          immediate: true,
        };
      },
      ifShow: ({ values }) => {
        return !!values.calculative;
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'remark',
      component: 'InputTextArea',
      label: '代理備註：',
      colProps: {
        span: 8,
      },
    },
  ];
  const auditSchema = [
    {
      field: 'memberID',
      label: '會員ID',
    },
    {
      field: 'agencyAccount',
      label: '代理帳號',
    },
    {
      field: 'name',
      label: '姓名',
    },
    {
      field: 'phone',
      label: '手機號',
    },
    {
      field: 'qqAccount',
      label: 'QQ號',
    },
    {
      field: 'wechatAccount',
      label: '微信號',
    },
    {
      field: 'createdAt',
      label: '申請時間',
    },
    {
      field: 'reviewTime',
      label: '審核時間',
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
        const response = await getAgencyDetail({ id: data.record.id });
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
        auditData.value = await getAgencyDetail({ id: data.record.id });
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
          console.log('WWWE', payload);
          const param = {
            id: id.value,
            auditStatus: 2,
            remark: payload.remark,
            calculative: payload.calculative,
            rankGroupID: payload.rankGroupID,
          };
          const result = await putAgencyDetail(param);
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
            auditStatus: 3,
            remark: payload.remark,
            calculative: payload.calculative,
            rankGroupID: payload.rankGroupID,
          };
          const result = await putAgencyDetail(param);
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
