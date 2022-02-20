<template>
  <!-- Frozen add modal start -->
  <BasicModal
    :visible="visible"
    :loading="state.loading"
    title="冻结金额"
    cancelText="取消"
    okText="确认"
    @update:visible="updateVisible"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <!-- Frozen add form start -->
    <BasicForm @register="register" />
    <!-- Frozen add form end -->
  </BasicModal>
  <!-- Frozen add modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { message } from 'ant-design-vue';
  import { postFrozenAdd } from '/@/api/payment/payChannel';
  import { PayChannelItem } from '/@/api/payment/model/payChannelModel';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { frozenAddSchemas } from './formSchemas';

  /**
   * Component state interface
   */
  interface State {
    /** Remain add loading */
    loading: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'FrozenAddModal',
    components: {
      BasicModal,
      BasicForm,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<PayChannelItem>,
      },
    },
    emits: ['update:visible', 'refreshList'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        loading: false,
      });

      // Form definition
      const [register, { validate, resetFields }] = useForm({
        labelWidth: 120,
        showResetButton: false,
        showSubmitButton: false,
        schemas: frozenAddSchemas,
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

          // Frozen add
          const response = await postFrozenAdd({
            id: props.record?.id,
            amount: Number(formModel.amount),
            note: formModel.note,
          });

          // Validate response
          if (response.success) {
            // Notify frozen add success
            message.success(`${props.record?.sn} 冻结成功`);

            // Reset form fields
            await resetFields();

            // Refresh pay channel list
            emit('refreshList');

            // Hide modal
            emit('update:visible', false);
          } else {
            // Notify error
            message.success(`${props.record?.sn} 冻结失败`);
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
