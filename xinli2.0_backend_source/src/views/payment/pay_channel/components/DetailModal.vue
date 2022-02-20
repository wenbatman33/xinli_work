<template>
  <!-- Detail modal start -->
  <BasicModal
    :visible="visible"
    :title="title"
    width="75%"
    cancelText="关闭"
    okText="编辑"
    @update:visible="updateVisible"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <!-- Detail form start -->
    <DetailForm
      :editable="false"
      :payChannelItem="record"
      :payChannelNameList="payChannelNameList"
      @refreshName="handleRefreshName"
    />
    <!-- Detail form end -->
  </BasicModal>
  <!-- Detail modal end -->

  <!-- Edit modal start -->
  <EditModal
    :record="record"
    :payChannelNameList="payChannelNameList"
    v-model:visible="state.showEdit"
    @refreshList="handleRefreshList"
    @refreshName="handleRefreshName"
  />
  <!-- Edit modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import { PayChannelItem, PayChannelNameItem } from '/@/api/payment/model/payChannelModel';
  import DetailForm from './DetailForm.vue';
  import EditModal from './EditModal.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Show edit modal */
    showEdit: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'DetailModal',
    components: {
      BasicModal,
      DetailForm,
      EditModal,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<PayChannelItem>,
      },
      payChannelNameList: {
        type: Array as PropType<Array<PayChannelNameItem>>,
      },
    },
    emits: ['update:visible', 'refreshList', 'refreshName'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        showEdit: false,
      });

      // Modal title
      const title = computed(() => {
        return `查看商户号/${props.record?.sn}`;
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
      const handleOk = () => {
        state.showEdit = true;
        emit('update:visible', false);
      };

      // Handle refresh pay channel list
      const handleRefreshList = () => {
        emit('refreshList');
      };

      // Handle refresh name list
      const handleRefreshName = () => {
        emit('refreshName');
      };
      return {
        state,
        title,
        updateVisible,
        handleCancel,
        handleOk,
        handleRefreshList,
        handleRefreshName,
      };
    },
  });
</script>
