<template>
  <!-- Frozen sub modal start -->
  <BasicModal
    :visible="visible"
    :loading="state.loading"
    title="解除冻结"
    cancelText="取消"
    okText="确认"
    @update:visible="updateVisible"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <!-- Frozen sub form start -->
    <BasicForm @register="register" />
    <!-- Frozen sub form end -->
  </BasicModal>
  <!-- Frozen sub modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { message } from 'ant-design-vue';
  import { postFrozenSub } from '/@/api/payment/payChannel';
  import { PayChannelItem } from '/@/api/payment/model/payChannelModel';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { frozenSubSchemas } from './formSchemas';

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
    name: 'FrozenSubModal',
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
        schemas: frozenSubSchemas,
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

          // Frozen sub
          const response = await postFrozenSub({
            id: props.record?.id,
            amount: Number(formModel.amount),
            note: formModel.note,
          });

          // Validate response
          if (response.success) {
            // Notify frozen sub success
            message.success(`${props.record?.sn} 解冻成功`);

            // Reset form fields
            await resetFields();

            // Refresh pay channel list
            emit('refreshList');

            // Hide modal
            emit('update:visible', false);
          } else {
            // Notify error
            message.error(`${props.record?.sn} 解冻失败`);
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
