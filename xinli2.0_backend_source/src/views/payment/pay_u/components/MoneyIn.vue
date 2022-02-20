<template>
  <!-- Remain sub modal start -->
  <BasicModal
    :width="550"
    @register="MoneyInModalRegister"
    title="商户下发"
    cancelText="取消"
    okText="确定"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <!-- Remain sub form start -->
    <BasicForm @register="formRegister">
      <!-- Form target sn template start -->
      <template #targetSN="{ field, values }">
        <div class="grid grid-cols-target-sn gap-12px items-center">
          <Input :value="values[field]" @update:value="handleUpdateTargetSN" />
          <a-button type="primary" @click="handleGetTargetInfo">取得资讯</a-button>
        </div>
      </template>
      <!-- Form target sn template end -->

      <!-- Form span template start -->
      <template #span="{ field, values }">
        <span>{{ values[field] }}</span>
      </template>
      <!-- Form span template end -->
    </BasicForm>
    <!-- Remain sub form end -->
  </BasicModal>
  <!-- Remain sub modal end -->
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Input, message } from 'ant-design-vue';
  import { getPayChannelSearch } from '/@/api/payment/payChannel';
  import { UcardMoneyIn } from '/@/api/payment/payU';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { moneyInSchemas } from './formSchemas';

  /**
   * Component definition
   */
  export default defineComponent({
    components: {
      Input,
      BasicModal,
      BasicForm,
    },
    emits: ['success','register'],
    setup(_, { emit }) {
      const currentID = ref(0);

      // Form definition
      const [formRegister, { validate, getFieldsValue, setFieldsValue, resetFields }] = useForm({
        labelWidth: 120,
        showResetButton: false,
        showSubmitButton: false,
        schemas: moneyInSchemas,
      });

      const [MoneyInModalRegister, { setModalProps, closeModal }] = useModalInner((data) => {
        resetFields();
        currentID.value = data.record.id;
      });


      // Handle cancel button clicked
      const handleCancel = () => {
        closeModal();
      };

      // Handle ok button clicked
      const handleOk = async () => {
        try {
          // Validate form fields
          const formModel = await validate();

          // Validate target sn
          if (formModel.targetSN) {
            if (formModel.targetID === undefined) {
              message.error('输入的商户号不存在');
              return;
            }
          }

          const response = await UcardMoneyIn({
            id: currentID.value,
            targetID: Number(formModel.targetID),
            amount: formModel.amount,
            exchangeRate: formModel.exchangeRate,
            exchangeAmount: formModel.exchangeAmount,
            fee: formModel.fee,
          });

          // Validate response
          if (response.success) {
            // Notify remain sub success
            message.success(`结算成功`);

            // Reset form fields
            await resetFields();

            emit('success');
            closeModal();
          } else {
            // Notify error
            message.error(`结算失败`);
          }
        } catch (e) {
          // Exception handled by http utils
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };

      // Handle update target sn
      const handleUpdateTargetSN = (targetSN) => {
        setFieldsValue({
          targetSN: targetSN,
          targetID: undefined,
          payChannelName: undefined,
        });
      };

      // Handle get target info
      const handleGetTargetInfo = async () => {
        // Get target sn
        const formModel = getFieldsValue();
        const targetSN = formModel?.targetSN;

        // Validate target sn
        if (!targetSN) {
          message.error('请输入商户号');
          return;
        }

        // Get pay channel search
        const response = await getPayChannelSearch({
          keyword: targetSN,
        });

        // Validate pay channel info
        if (response.type === 2) {
          await setFieldsValue({
            targetID: response.id,
            payChannelName: response.name,
          });
        } else {
          message.error('输入的商户号不存在');
          await setFieldsValue({
            targetID: undefined,
            payChannelName: undefined,
          });
        }
      };
      return {
        formRegister,
        MoneyInModalRegister,
        handleCancel,
        handleOk,
        handleUpdateTargetSN,
        handleGetTargetInfo,
      };
    },
  });
</script>
<style lang="scss" scoped>
.grid-cols-target-sn {
  grid-template-columns: 1fr auto;
}
</style>