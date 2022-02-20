<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="代理申請詳細"
    @visible-change="handleVisibleChange"
    :showOkBtn="false"
    :cancelText="'返回'"
    width="50%"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model">
        <template #id="{ model, field }">
          {{ model[field] }}
        </template>
        <template #memberID="{ model, field }">
          {{ model[field] }}
        </template>
        <template #agencyAccount="{ model, field }">
          {{ model[field] }}
        </template>
        <template #name="{ model, field }">
          {{ model[field] }}
        </template>
        <template #phone="{ model, field }">
          {{ model[field] }}
        </template>
        <template #qqAccount="{ model, field }">
          {{ model[field] }}
        </template>
        <template #wechatAccount="{ model, field }">
          {{ model[field] }}
        </template>
        <template #createdAt="{ model, field }">
          {{ model[field] }}
        </template>
        <template #reviewTime="{ model, field }">
          {{ model[field] }}
        </template>
        <template #adminUserID="{ model, field }">
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
  import { getAgencyDetail } from '/@/api/agency/childapplication';
  import { Tag } from 'ant-design-vue';
  const schemas: FormSchema[] = [
    {
      field: 'id',
      component: 'Input',
      label: 'ID：',
      slot: 'id',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'memberID',
      component: 'Input',
      label: '會員ID：',
      slot: 'memberID',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'agencyAccount',
      component: 'Input',
      label: '代理帳號：',
      slot: 'agencyAccount',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '姓名：',
      slot: 'name',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'phone',
      component: 'Input',
      label: '電話：',
      slot: 'phone',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'qqAccount',
      component: 'Input',
      label: 'QQ號：',
      slot: 'qqAccount',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'wechatAccount',
      component: 'Input',
      label: '微信號：',
      slot: 'wechatAccount',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'createdAt',
      component: 'Input',
      label: '申請時間：',
      slot: 'createdAt',
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
      field: 'adminUserID',
      component: 'Input',
      label: '審核人ID：',
      slot: 'adminUserID',
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
      field: 'remark',
      component: 'InputTextArea',
      label: '代理備註：',
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
        const response = await getAgencyDetail({ id: data.record.id });
        console.log('API Received', response);
        // 方式1;
        // setFieldsValue({
        //   field2: data.data,
        //   field1: data.info,
        // });

        // // 方式2
        modelRef.value = {
          ...response,
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
