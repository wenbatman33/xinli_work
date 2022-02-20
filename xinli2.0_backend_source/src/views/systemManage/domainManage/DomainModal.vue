<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #group="{ model, field }">
        <Select 
          v-model:value="model[field]"
          :options="groupList"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { domainSchema } from './data';
  import { Select } from 'ant-design-vue';

  import { createDomain, updateDomain } from '/@/api/systemManage/systemManage';
  export default defineComponent({
    components: { BasicModal, BasicForm, Select },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const groupList = ref([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 150,
        schemas: domainSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        groupList.value = data?.groupList || [];
        console.log(data);
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
            // groupID: groupList.value.find((item) => item.value == data.record.groupID)?.label,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增域名' : '编辑域名'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          let params = {
            groupID: values.groupID,
            name: values.name,
            sort: values.sort,
            displayName: values.displayName,
            domain: values.domain,
            note: values.note,
          }

          if (unref(isUpdate)){
            Object.assign(params, {
              id: parseInt(values.id, 10),
            })
            console.log(params);
            await updateDomain(params);
          }else{
            await createDomain(params);
          }

          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit, groupList };
    },
  });
</script>
