<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" :onCancel="onCancel">
    <BasicForm @register="registerForm">
      <template #deptSelect="{ model, field }">
        <Select 
          v-model:value="model[field]"
          :allowClear="true" 
          :options="deptList"
        />
      </template>
      <template #roleSelect="{ model, field }">
        <Select 
          v-model:value="model[field]"
          :allowClear="true" 
          :options="roleList"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { CreateAccount, UpdateAccount } from '/@/api/authSystem/system';
  import { RoleUserCreateParams } from '/@/api/authSystem/model/systemModel';
  import { Select } from 'ant-design-vue';
  const defaultOption = [{
    label: '不属于任何群组',
    value: 0,
    key: 0,
  }];

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm, Select },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const raw_depts = ref([]);
      const raw_roles = ref([]);

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        raw_depts.value = data.selectItems.depts;
        raw_roles.value = data.selectItems.fnGroups;


        updateSchema([
          {
            field: 'adminID',
            show: unref(isUpdate),
          },
          {
            field: 'email',
            show: !unref(isUpdate),
          },
          {
            field: 'account',
            show: !unref(isUpdate),
          },
          {
            field: 'password',
            show: !unref(isUpdate),
            required: !unref(isUpdate),
          },
          {
            field: 'password2',
            show: !unref(isUpdate),
            required: !unref(isUpdate),
          }
        ]);

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          const fnRole = data.record.roles.length > 0 ? Number(data.record.roles[0].roleID) : '';
          setFieldsValue({
            ...data.record,
            deptID: Number(data.record.deptID),
            fnRole: fnRole,
            password: '1234',
            password2: '1234',
          });
        }

      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));
      const deptList = computed(() => {
        return raw_depts.value.map(dept=>{ return {value: dept.deptID, label: dept.deptName, key:dept.deptID}});
      });
      const roleList = computed(() => {
        return defaultOption.concat(raw_roles.value.map(role=>{ return {value: role.roleID, label: role.roleName, key:role.roleID}}));
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          if (unref(isUpdate)){
            const params: RoleUserCreateParams = {
              adminID: values.adminID,
              name: values.name,
              deptID: values.deptID || 0,
              title: values.title,
              vpnIP: values.vpnIP,
              commentCategory: values.commentCategory,
              status: values.status,
              roleID: values.fnRole || 0,
            }
            await UpdateAccount(params);
          }else{
            const params: RoleUserCreateParams = {
              account: values.account,
              name: values.name,
              password: values.password,
              email: values.email,
              status: 2,
              deptID: values.deptID,
              title: values.title,
              vpnIP: values.vpnIP,
              commentCategory: values.commentCategory,
              roleID: values.fnRole || 0,
            }
            await CreateAccount(params);
          }
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      function onCancel(){
        resetFields();
      }

      return { registerModal, registerForm, getTitle, handleSubmit, deptList, roleList, onCancel };
    },
  });
</script>
