<template>
  <!-- Edit modal start -->
  <BasicModal
    :title="title"
    :visible="visible"
    :loading="state.loading"
    width="75%"
    cancelText="取消"
    okText="确认"
    @update:visible="updateVisible"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <!-- Edit form start -->
    <DetailForm
      :editable="true"
      :payChannelItem="record"
      :payChannelNameList="payChannelNameList"
      @register="register"
      @refreshName="handleRefreshName"
    />
    <!-- Edit form end -->
  </BasicModal>
  <!-- Edit modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { FormActionType } from '/@/components/Form';
  import { BasicModal } from '/@/components/Modal';
  import { putPayChannel } from '/@/api/payment/payChannel';
  import { PayChannelItem, PayChannelNameItem } from '/@/api/payment/model/payChannelModel';
  import DetailForm from './DetailForm.vue';

  /**
   * Component state
   */
  interface State {
    /** Edit loading */
    loading: boolean;

    /** Form action */
    formAction?: FormActionType;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'EditModal',
    components: {
      BasicModal,
      DetailForm,
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
        loading: false,
      });

      // Modal title
      const title = computed(() => {
        return `编辑商户号/${props.record?.sn}`;
      });

      // Register form
      const register = (formAction: FormActionType) => {
        state.formAction = formAction;
      };

      // Update model visible
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
          const formModel = await state.formAction?.validate();

          // Validate ap fee
          if (formModel.supplyAp && !formModel.apFee && !formModel.apPerFee) {
            message.error('代付资讯未完整');
            return;
          }

          // Update loading state
          state.loading = true;

          // Edit pay channel
          const supplyAp = formModel.supplyAp;
          const supplySp = formModel.supplySp;
          const supplyDeposit = formModel.supplyDeposit;
          const response = await putPayChannel({
            id: props.record?.id,
            status: formModel.status,
            payChannelNameID: formModel.payChannelNameID,
            sn: formModel.sn,
            settleStime: formModel.settleStime || '',
            settleEtime: formModel.settleEtime || '',
            method: formModel.method,
            notifyUrl: formModel.notifyUrl || '',
            note: formModel.note || '',
            supplyAp: supplyAp,
            apLowerLimit: supplyAp ? formModel.apLowerLimit : 0,
            apUpperLimit: supplyAp ? formModel.apUpperLimit : 0,
            apDayLimit: supplyAp ? formModel.apDayLimit : 0,
            eighteenApLowerLimit: supplyAp ? formModel.eighteenApLowerLimit : 0,
            eighteenApUpperLimit: supplyAp ? formModel.eighteenApUpperLimit : 0,
            apFee: supplyAp ? formModel.apFee : 0,
            apPerFee: supplyAp ? formModel.apPerFee : 0,
            apStatus: props.record?.apStatus,
            spLowerLimit: supplySp ? formModel.spLowerLimit : 0,
            spUpperLimit: supplySp ? formModel.spUpperLimit : 0,
            spFee: supplySp ? formModel.spFee : 0,
            spPerFee: supplySp ? formModel.spPerFee : 0,
            depositLimit: formModel.depositLimit || 0,
            depositLowerLimit: supplyDeposit ? formModel.depositLowerLimit : 0,
            depositUpperLimit: supplyDeposit ? formModel.depositUpperLimit : 0,
            depositFee: supplyDeposit ? formModel.depositFee : 0,
            depositPerFee: supplyDeposit ? formModel.depositPerFee : 0,
            balanceUrl: props.record?.balanceUrl,
            orderQueryUrl: props.record?.orderQueryUrl,
            requestUrl: props.record?.requestUrl,
          });

          // Validate response
          if (response.success) {
            // Notify create pay channel success
            message.success(`${formModel.sn} 编辑成功`);

            // Reset form fields
            state.formAction?.resetFields();

            // Refresh pay channel list
            emit('refreshList');

            // Hide modal
            emit('update:visible', false);
          } else {
            // Notify error
            message.error(`${formModel.sn} 编辑失败`);
          }
        } catch (e) {
          // Exception handled by http utils
        } finally {
          // Revert loading state
          state.loading = false;
        }
      };

      // Handle refresh name
      const handleRefreshName = () => {
        emit('refreshName');
      };
      return {
        state,
        title,
        register,
        updateVisible,
        handleCancel,
        handleOk,
        handleRefreshName,
      };
    },
  });
</script>
