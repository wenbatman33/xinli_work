<template>
  <BasicModal
    :visible="visible"
    title="结算"
    cancelText="取消"
    okText="确认"
    @update:visible="updateVisible"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <span>此商户已停用，确认要继续执行？</span>
  </BasicModal>
</template>

<script>
  import { BasicModal } from '/@/components/Modal';

  /**
   * Component definition
   */
  export default {
    name: 'RemainAddConfirmModal',
    components: {
      BasicModal,
    },
    props: {
      visible: {
        type: Boolean,
      },
    },
    emits: ['update:visible', 'showRemainSubModal'],
    setup(_props, { emit }) {
      // Update modal visible
      const updateVisible = (visible) => {
        emit('update:visible', visible);
      };

      // Handle cancel button clicked
      const handleCancel = () => {
        emit('update:visible', false);
      };

      // Handle ok button clicked
      const handleOk = () => {
        emit('update:visible', false);
        emit('showRemainSubModal');
      };
      return {
        updateVisible,
        handleCancel,
        handleOk,
      };
    },
  };
</script>
