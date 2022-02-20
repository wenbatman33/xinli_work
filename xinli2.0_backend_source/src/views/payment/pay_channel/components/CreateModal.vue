<template>
  <!-- Create modal start -->
  <BasicModal
    :visible="visible"
    :loading="state.loading"
    width="75%"
    title="新增商户号"
    cancelText="取消"
    okText="确认"
    @update:visible="updateVisible"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <!-- Create form start -->
    <DetailForm
      :editable="true"
      :payChannelNameList="payChannelNameList"
      @register="register"
      @refreshName="handleRefreshName"
    />
    <!-- Create form end -->
  </BasicModal>
  <!-- Create modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { message } from 'ant-design-vue';
  import { FormActionType } from '/@/components/Form';
  import { BasicModal } from '/@/components/Modal';
  import { PayChannelNameItem } from '/@/api/payment/model/payChannelModel';
  import { postPayChannel } from '/@/api/payment/payChannel';
  import DetailForm from './DetailForm.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Create loading */
    loading: Boolean;

    /** Form action */
    formAction?: FormActionType;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'CreateModal',
    components: {
      BasicModal,
      DetailForm,
    },
    props: {
      visible: {
        type: Boolean,
      },
      payChannelNameList: {
        type: Array as PropType<Array<PayChannelNameItem>>,
      },
    },
    emits: ['update:visible', 'refreshList', 'refreshName'],
    setup(_props, { emit }) {
      // Component state
      const state = reactive<State>({
        loading: false,
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

          // Post pay channel
          const supplyAp = formModel.supplyAp;
          const supplySp = formModel.supplySp;
          const supplyDeposit = formModel.supplyDeposit;
          const response = await postPayChannel({
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
            spLowerLimit: supplySp ? formModel.spLowerLimit : 0,
            spUpperLimit: supplySp ? formModel.spUpperLimit : 0,
            spFee: supplySp ? formModel.spFee : 0,
            spPerFee: supplySp ? formModel.spPerFee : 0,
            depositLimit: formModel.depositLimit || 0,
            depositLowerLimit: supplyDeposit ? formModel.depositLowerLimit : 0,
            depositUpperLimit: supplyDeposit ? formModel.depositUpperLimit : 0,
            depositFee: supplyDeposit ? formModel.depositFee : 0,
            depositPerFee: supplyDeposit ? formModel.depositPerFee : 0,
          });

          // Validate response
          if (response.success) {
            // Notify create pay channel success
            message.success(`新增商户号 ${formModel.sn} 成功`);

            // Reset form fields
            state.formAction?.resetFields();

            // Refresh pay channel list
            emit('refreshList');

            // Hide modal
            emit('update:visible', false);
          } else {
            // Notify error
            message.error(`新增商户号 ${formModel.sn} 失败`);
          }
        } catch (e) {
          // Exception handled by http utils
          console.error(e);
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
        register,
        updateVisible,
        handleCancel,
        handleOk,
        handleRefreshName,
      };
    },
  });
</script>
