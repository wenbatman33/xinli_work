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
  import { formTagSchema } from './data';

  import { CreateTag, UpdateTag } from '/@/api/tag/tag';
  import { TagList } from '/@/api/tag/model/tagModal';

  export default defineComponent({
    name: 'Modal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      let allTag;

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formTagSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        allTag = data.allTag;

        updateSchema([{
          field: 'tagGroupID',
          componentProps: { 
            options: transformOption(allTag),
            getPopupContainer: () => document.body,
          },
        }]);

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }else{
          setFieldsValue({
            tagGroupID: data.target_group.id
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增标签' : '编辑标签'));

      function transformOption(tags){ 
        return tags.map(item=>{
          return {
            value: item.id,
            label: item.name,
          }
        });
      }
      
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          let params: TagList = {
            name: values.name,
            tagGroupID: values.tagGroupID,
          }
          
          if (unref(isUpdate)){
            params.id = parseInt(values.id, 10);
            await UpdateTag(params);
          }else{
            await CreateTag(params);
          }

          closeModal();
          emit('success', {targetID: values.tagGroupID});
        } finally {
          setModalProps({ confirmLoading: false });
          updateSchema([{
            field: 'tagGroupID',
            componentProps: { 
              options: [],
            },
          }]);
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>

<style lang="scss" scoped>
::v-deep(.tagGroupIDClass){
  overflow: scroll;
}
</style>