<template>
  <BasicModal
    :loading="state.loading"
    :visible="visible"
    title="Update Risk Status"
    okText="Submit"
    @ok="handleOk"
    @update:visible="handleUpdateVisible"
  >
    <BasicForm @register="register" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { putRiskCheck } from '/@/api/cashflow/withdrawal';
  import { WithdrawalItem } from '/@/api/cashflow/model/withdrawalModel';
  import { riskCheckSchemas } from './formSchemas';

  /**
   * Component state interface
   */
  interface State {
    /** Put risk check loading status */
    loading: Boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'RiskCheckModal',
    components: {
      BasicModal,
      BasicForm,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<WithdrawalItem>,
      },
    },
    emits: ['update:visible', 'reload'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        loading: false,
      });

      // Form definition
      const [register, { validate }] = useForm({
        labelWidth: 120,
        showResetButton: false,
        showSubmitButton: false,
        schemas: riskCheckSchemas,
      });

      // Handle ok button clicked
      const handleOk = async () => {
        try {
          // Update loading status
          state.loading = true;

          // Validate form fields
          const formModal = await validate();

          // Put risk check
          const response = await putRiskCheck({
            orderSn: props.record?.transactionID,
            status: formModal.status,
            note: formModal.note,
          });

          // Validate response
          if (response.success) {
            // Notify success
            message.success('风控审核完成');

            // Reload withdrawal list
            emit('reload');

            // Hide risk check modal
            emit('update:visible', false);
          } else {
            // Notify error
            message.error('风控审核失败');
          }
        } catch (e) {
          // Exception handled by http utils
        } finally {
          // Revert loading status
          state.loading = false;
        }
      };

      // Handle update visible status
      const handleUpdateVisible = (visible) => {
        emit('update:visible', visible);
      };
      return {
        state,
        register,
        handleOk,
        handleUpdateVisible,
      };
    },
  });
</script>
