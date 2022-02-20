<template>
  <BasicModal
    :visible="visible"
    title="系统提示"
    okText="关闭"
    @ok="handleOk"
    @update:visible="updateVisible"
  >
    {{ content }}
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { BasicModal } from '/@/components/Modal';

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'ReviewingModal',
    components: {
      BasicModal,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<WithdrawalItem>,
      },
    },
    emits: ['update:visible'],
    setup(props, { emit }) {
      // Modal content
      const content = computed(() => {
        return `此提款单已由${props.record?.updatedBy} 审核中`;
      });

      // Update visible state
      const updateVisible = (visible) => {
        emit('update:visible', visible);
      };
      // Handle ok button clicked
      const handleOk = async () => {
        emit('update:visible', false);
      };
      return {
        content,
        updateVisible,
        handleOk,
      };
    },
  });
</script>
