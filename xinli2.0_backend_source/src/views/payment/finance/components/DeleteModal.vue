<template>
  <!-- Delete table start -->
  <BasicModal
    :visible="visible"
    :loading="state.loading"
    title="请确认"
    @ok="handleOk"
    @update:visible="updateVisible"
  >
    <!-- Content text start -->
    <span>{{ content }}</span>
    <!-- Content text end -->
  </BasicModal>
  <!-- Delete table end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { deleteFinance } from '/@/api/payment/finance';
  import { FinanceRecord } from './tableData';

  /**
   * Component state interface
   */
  interface State {
    /** Create loading */
    loading: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'DeleteModal',
    components: {
      BasicModal,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<FinanceRecord>,
      },
    },
    emits: ['reload', 'update:visible', 'register'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        loading: false,
      });

      // Content text
      const content = computed(() => {
        return `是否要删除显示项目 ${props.record?.name}?`;
      });

      // Handle ok button clicked
      const handleOk = async () => {
        // Prevent duplicate request
        if (state.loading) {
          return;
        }
        try {
          // Update loading state
          state.loading = true;

          // Delete finance
          const response = await deleteFinance({
            financeID: props.record?.id,
          });

          // Validate response
          if (response.success) {
            // Notify success
            message.success(`${props.record?.name} 删除成功`);

            // Hide delete modal
            emit('update:visible', false);

            // Reload finance list
            emit('reload');
          } else {
            // Notify error
            message.error(`${props.record?.name} 删除失败`);
          }
        } catch (e) {
          // Exception handled by http utils
        } finally {
          // Revert loading state
          state.loading = false;
        }
      };

      // Update modal visible property
      const updateVisible = (visible: Boolean) => {
        emit('update:visible', visible);
      };
      return {
        state,
        content,
        handleOk,
        updateVisible,
      };
    },
  });
</script>
