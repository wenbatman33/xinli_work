<template>
  <BasicModal
    :title="titleRef"
    width="1000px"
    @register="registerLetterModal"
    @ok="handleConfirm"
  >
    <BasicForm @register="registerLetterForm">
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, h } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { editInboxSetting } from '/@/api/operator/inbox';
  import type { FormSchema } from '/@/components/Table';
  import { Tinymce } from '/@/components/Tinymce/index';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/image';

  export default defineComponent({
    components: { BasicForm, BasicModal },
    emits: ['register','success'],
    setup(_, { emit }) {
      const targetID = ref(0);
      const titleRef = '编辑系统站内信';

      const letterFormSchema = computed<FormSchema[]>(() => {
        return [
          {
            field: 'title',
            label: '标题',
            component: 'Input',
            required: true,
            componentProps: { placeholder: '请输入标题' },
            colProps: {
              span: 24,
            },
          },
          {
            field: 'content',
            component: 'Input',
            label: '內容',
            defaultValue: 'defaultValue',
            rules: [{ required: true }],
            render: ({ model, field }) => {
              return h(Tinymce, {
                value: model[field],
                showImageUpload: false,
                options: {
                  menubar: false,
                  toolbar:
                    'redo undo | table | a11ycheck | formatselect bold forecolor backcolor | bullist numlist | link | removeformat',
                  plugins: ['table'],
                },
                // plugins: 'table',
                onChange: (value: string) => {
                  model[field] = value;
                },
              });
            },
          },
        ];
      });

      const [registerLetterForm, { setFieldsValue, resetFields, validate, setProps }] = useForm({
        labelWidth: 80,
        schemas: letterFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerLetterModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        targetID.value = data.id;
        setFieldsValue({ ...data });
        setProps({ disabled: false });
        setModalProps({ okText: '确定修改' });
      });

      const handleConfirm = () => {
        editSubmit();
      };

      const ResError = () => {
        message.error(`编辑站内信失败`)
        handleModalClose();
      };
      const ResSuccess = () => {
        message.success(`编辑站内信成功`)
        handleModalClose();
      };

      const handleModalClose = () => {
        emit('success');
        closeModal();
      };



      const editSubmit = async () => {
        try {
          const payload = await validate();
          payload.id = targetID.value;
          const result = await editInboxSetting(payload);
          result.success ? ResSuccess() : ResError();
        } catch (e) {
          console.log(e);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };

      return {
        titleRef,
        registerLetterModal,
        handleConfirm,
        registerLetterForm,
      }
    }
});
  
</script>
