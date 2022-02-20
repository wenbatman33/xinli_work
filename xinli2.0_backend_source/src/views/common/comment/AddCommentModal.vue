<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" title="新增备注" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { commentFormSchema } from '/@/views/common/comment/data';
  import { useUserStore } from '/@/store/modules/user';
  import { AddBatchComment } from '/@/api/member/member';

  export default defineComponent({
    name: 'AddCommentModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      let records:any[] = [];
      const userStore = useUserStore();

      const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
        labelWidth: 100,
        schemas: commentFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        records = unref(data.memberIDs);
        setFieldsValue({
          commentCategory: userStore.getUserInfo.commentCategory,
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          const params = {
            memberIDs: unref(records),
            title: values.title,
            content: values.content,
          }

          await AddBatchComment(params);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, handleSubmit, records };
    },
  });
</script>
