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
      <BasicForm @register="registerForm" :model="model">
        <template #agencyAccount="{ model, field }">
          {{ model[field] }}
        </template>
        <template #agencyName="{ model, field }">
          {{ model[field] }}
        </template>
        <template #applyTime="{ model, field }">
          {{ model[field] }}
        </template>
        <template #childAgencyAccount="{ model, field }">
          {{ model[field] }}
        </template>
        <template #childAgencyName="{ model, field }">
          {{ model[field] }}
        </template>
        <template #reviewTime="{ model, field }">
          {{ model[field] }}
        </template>
        <template #auditStatus="{ model, field }">
          <Tag :color="statusColorMapper[model[field]]">
            {{ statusMapper[model[field]] }}
          </Tag>
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { getAgencyChildDetail } from '/@/api/agency/childapplication';
  import { Tag } from 'ant-design-vue';
  const schemas: FormSchema[] = [
    {
      field: 'agencyAccount',
      component: 'Input',
      label: '申請人代理帳號：',
      slot: 'agencyAccount',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'agencyName',
      component: 'Input',
      label: '申請人姓名：',
      slot: 'agencyName',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'applyTime',
      component: 'Input',
      label: '申請時間：',
      slot: 'applyTime',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'childAgencyAccount',
      component: 'Input',
      label: '二級代理帳號：',
      slot: 'childAgencyAccount',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'childAgencyName',
      component: 'Input',
      label: '二級代理姓名：',
      slot: 'childAgencyName',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'reviewTime',
      component: 'Input',
      label: '審核時間：',
      slot: 'reviewTime',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'auditStatus',
      component: 'Input',
      label: '審核結果：',
      colProps: {
        span: 8,
      },
      slot: 'auditStatus',
    },
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
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 8,
      },
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm, Tag },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const modelRef = ref({});
      const [
        registerForm,
        {
          // setFieldsValue,
          // setProps
        },
      ] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [register] = useModalInner((data) => {
        data && onDataReceive(data);
      });
      const statusMapper = {
        1: '待審核',
        2: '同意',
        3: '拒絕',
      };
      const statusColorMapper = {
        1: 'yellow',
        2: 'green',
        3: 'red',
      };
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
        modelRef.value = {
          agencyAccount: response.agencyAccount,
          agencyName: response.agencyName,
          applyTime: response.applyTime,
          childAgencyAccount: response.childAgencyAccount,
          childAgencyName: response.childAgencyName,
          reviewTime: response.reviewTime,
          auditStatus: response.auditStatus,
          agencyRemark: response.agencyRemark,
          remark: response.remark,
        };

        // setProps({
        //   model:{ field2: data.data, field1: data.info }
        // })
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return {
        register,
        schemas,
        registerForm,
        model: modelRef,
        handleVisibleChange,
        statusMapper,
        statusColorMapper,
      };
    },
  });
</script>
