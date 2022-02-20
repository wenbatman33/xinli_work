<template>
  <!-- Remain add modal start -->
  <BasicModal
    :visible="visible"
    :loading="state.loading"
    title="充值"
    cancelText="取消"
    okText="确认"
    @update:visible="updateVisible"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <!-- Remain add form start -->
    <BasicForm @register="register">
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

      <!-- Form account name template start -->
      <template #accountName="{ values }">
        <div class="grid grid-cols-account-name gap-12px items-center">
          <span>{{ values['accountName'] }}</span>
          <div>
            <Tag v-if="values['bankcardType'] !== undefined" class="color-bankcard-type">
              {{ values['bankcardType'] }}
            </Tag>
          </div>
        </div>
      </template>
      <!-- Form account name template end -->
    </BasicForm>
    <!-- Remain add form end -->
  </BasicModal>
  <!-- Remain add modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Input, Tag, message } from 'ant-design-vue';
  import { postRemainAdd, getPayChannelSearch } from '/@/api/payment/payChannel';
  import { PayChannelItem } from '/@/api/payment/model/payChannelModel';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { remainAddSchemas } from './formSchemas';

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
    name: 'RemainAddModal',
    components: {
      Input,
      Tag,
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
      const [register, { validate, getFieldsValue, setFieldsValue, resetFields }] = useForm({
        labelWidth: 120,
        showResetButton: false,
        showSubmitButton: false,
        schemas: remainAddSchemas,
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

          // Validate target sn
          if (formModel.targetSN) {
            if (formModel.targetType === undefined || formModel.targetID === undefined) {
              message.error('输入的银行卡号 / 商户号不存在');
              return;
            }
          }

          // Update loading state
          state.loading = true;

          // Remain add
          const response = await postRemainAdd({
            id: props.record?.id,
            targetType: formModel.targetSN ? Number(formModel.targetType) : undefined,
            targetID: formModel.targetSN ? Number(formModel.targetID) : undefined,
            amount: Number(formModel.amount),
            fee: formModel.fee ? Number(formModel.fee) : undefined,
            thirdID: formModel.thirdID,
            note: formModel.note,
          });

          // Validate response
          if (response.success) {
            // Notify remain add success
            message.success(`${props.record?.sn} 充值成功`);

            // Reset form fields
            await resetFields();

            // Refresh pay channel list
            emit('refreshList');

            // Hide modal
            emit('update:visible', false);
          } else {
            // Notify error
            message.error(`${props.record?.sn} 充值失败`);
          }
        } catch (e) {
          // Exception handled by http utils
        } finally {
          // Revert loading state
          state.loading = false;
        }
      };

      // Handle update target sn
      const handleUpdateTargetSN = (targetSN) => {
        setFieldsValue({
          targetSN: targetSN,
          targetID: undefined,
          targetType: undefined,
          payChannelName: undefined,
          bankName: undefined,
          bankcardType: undefined,
          accountName: undefined,
        });
      };

      // Handle get target info
      const handleGetTargetInfo = async () => {
        // Get target sn
        const formModel = getFieldsValue();
        const targetSN = formModel?.targetSN;

        // Validate target sn
        if (!targetSN) {
          message.error('请输入银行卡号 / 商户号');
          return;
        }

        // Get pay channel search
        const response = await getPayChannelSearch({
          keyword: targetSN,
        });

        // Validate pay channel info
        if (response.type === 1) {
          let bankcardType = '';
          if (response.bankcardType == '1') {
            bankcardType = '出款';
          } else if (response.bankcardType == '2') {
            bankcardType = '结算';
          } else if (response.bankcardType == '3') {
            bankcardType = '中转';
          } else if (response.bankcardType == '4') {
            bankcardType = '仓库';
          }
          await setFieldsValue({
            targetType: 1,
            targetID: response.id,
            payChannelName: undefined,
            bankName: response.bankName,
            bankcardType: bankcardType,
            accountName: response.name,
          });
        } else if (response.type === 2) {
          await setFieldsValue({
            targetType: 2,
            targetID: response.id,
            payChannelName: response.name,
            bankName: undefined,
            bankcardType: undefined,
            accountName: undefined,
          });
        } else {
          message.error('输入的银行卡号 / 商户号不存在');
          await setFieldsValue({
            targetType: undefined,
            targetID: undefined,
            payChannelName: undefined,
            bankName: undefined,
            bankcardType: undefined,
            accountName: undefined,
          });
        }
      };
      return {
        state,
        register,
        updateVisible,
        handleCancel,
        handleOk,
        handleUpdateTargetSN,
        handleGetTargetInfo,
      };
    },
  });
</script>

<style lang="scss">
  .grid-cols-target-sn {
    grid-template-columns: 1fr auto;
  }

  .grid-cols-account-name {
    grid-template-columns: auto 1fr;
  }

  .gap-12px {
    column-gap: 12px;
  }

  .color-bankcard-type {
    color: #e658c2;
    border: 1px solid #e658c2;
    background: transparent;
  }
</style>
