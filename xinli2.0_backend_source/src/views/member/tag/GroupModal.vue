<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #colorpicker="{ model, field }">
          <input type="color" v-model="model[field]">
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './data';

  import { CreateTagGroup, UpdateTagGroup } from '/@/api/tag/tag';
  import { TagList } from '/@/api/tag/model/tagModal';

  export default defineComponent({
    name: 'Modal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
          updateSchema({
            field: 'tagGroupID',
            show: false,
            required: false,
          });
        }else{
          updateSchema({
            field: 'tagGroupID',
            show: false,
            required: false,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增标签群组' : '编辑标签群组'));
      
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          let params: TagList = {
            name: values.name,
            color: values.color,
          }
          
          if (unref(isUpdate)){
            params.id = parseInt(values.id, 10);
            await UpdateTagGroup(params);
          }else{
            await CreateTagGroup(params);
          }

          closeModal();
          emit('success', {targetID: false});
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
