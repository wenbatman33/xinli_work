<template>
  <!-- Create name modal start -->
  <BasicModal
    :visible="visible"
    :loading="state.loading"
    title="新增商户"
    cancelText="取消"
    okText="确认"
    @update:visible="updateVisible"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <!-- Create name form start -->
    <BasicForm @register="register" />
    <!-- Create name form end -->
  </BasicModal>
  <!-- Create name modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { postPayChannelName } from '/@/api/payment/payChannel';
  import { createNameSchemas } from './formSchemas';

  /**
   * Component state interface
   */
  interface State {
    /** Create name loading */
    loading: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'CreateNameModal',
    components: {
      BasicModal,
      BasicForm,
    },
    props: {
      visible: { type: Boolean },
    },
    emits: ['update:visible', 'refreshName'],
    setup(_props, { emit }) {
      // Component state
      const state = reactive<State>({
        loading: false,
      });

      // Form definition
      const [register, { validate, resetFields }] = useForm({
        labelWidth: 120,
        showResetButton: false,
        showSubmitButton: false,
        schemas: createNameSchemas,
      });

      // Update modal visible
      const updateVisible = (visible) => {
        emit('update:visible', visible);
      };

      // Handle cancel button clicked
      const handleCancel = () => {
        emit('update:visible', false);
      };

      // Handle ok button clicked
      const handleOk = async () => {
        try {
          // Validate form fields
          const formModel = await validate();

          // Update loading state
          state.loading = true;

          // Post pay channel name
          const response = await postPayChannelName({
            name: formModel.name,
          });

          // Validate response
          if (response.success) {
            // Notify create name success
            message.success(`新增商户 ${formModel.name} 成功`);

            // Reset form fields
            await resetFields();

            // Refresh pay channel name list
            emit('refreshName');

            // Hide modal
            emit('update:visible', false);
          } else {
            // Notify error
            message.success(`新增商户 ${formModel.name} 失败`);
          }
        } catch (e) {
          // Exception handled by http utils
        } finally {
          // Revert loading state
          state.loading = false;
        }
      };
      return {
        state,
        register,
        updateVisible,
        handleCancel,
        handleOk,
      };
    },
  });
</script>
