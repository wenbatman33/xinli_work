<template>
  <!-- Post note modal start -->
  <BasicModal
    :visible="visible"
    :loading="state.loading"
    title="新增备注"
    okText="确认新增"
    @ok="handleOk"
    @update:visible="updateVisible"
  >
    <!-- Note form start -->
    <BasicForm @register="register" />
    <!-- Note form end -->
  </BasicModal>
  <!-- Post note modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { postDepositNote } from '/@/api/cashflow/deposit';
  import { DepositItem } from '/@/api/cashflow/model/depositModel';
  import { noteSchemas } from './formSchemas';

  /**
   * Component state interface
   */
  interface State {
    /** Create loading */
    loading: Boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'PostNoteModal',
    components: {
      BasicModal,
      BasicForm,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<DepositItem>,
      },
    },
    emits: ['update:visible', 'reload'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        loading: false,
      });

      // Form definition
      const [register, { validate, resetFields }] = useForm({
        labelWidth: 180,
        showResetButton: false,
        showSubmitButton: false,
        schemas: noteSchemas,
      });

      // Handle ok button clicked
      const handleOk = async () => {
        try {
          // Validate form fields
          const formModel = await validate();

          // Update loading state
          state.loading = true;

          // Post deposit note
          const response = await postDepositNote({
            id: props.record?.id,
            note: formModel.note,
          });

          // Validate response
          if (response.success) {
            // Notify success
            message.success(`${props.record?.id} 新增备注成功`);

            // Reset form fields
            await resetFields();

            // Reload deposit list
            emit('reload');

            // Hide note modal
            emit('update:visible', false);
          } else {
            // Notify error
            message.error(`${props.record?.id} 新增备注失败`);
          }
        } catch (e) {
          // Exception handled by http utils
        } finally {
          // Revert loading state
          state.loading = false;
        }
      };

      // Update visible state
      const updateVisible = (visible) => {
        emit('update:visible', visible);
      };
      return {
        state,
        register,
        handleOk,
        updateVisible,
      };
    },
  });
</script>
