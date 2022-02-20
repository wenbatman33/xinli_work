<template>
  <!-- Create otp modal start -->
  <BasicModal
    :visible="visible"
    :loading="state.loading"
    title="确定建立存款单？"
    @ok="handleOk"
    @update:visible="updateVisible"
  >
    <!-- Create otp form start -->
    <BasicForm @register="register">
      <!-- Span template start -->
      <template #span="{ field, values }">
        <span>{{ values[field] }}</span>
      </template>
      <!-- Span template end -->

      <!-- Balance date field template -->
      <template #balanceDate="{ field, values }">
        <span>{{ convertBalanceDate(values[field]) }}</span>
      </template>
      <!-- Balance date field template -->
    </BasicForm>
    <!-- Create otp form end -->
  </BasicModal>
  <!-- Create otp modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { postDeposit } from '/@/api/cashflow/deposit';
  import { PostDepositData } from '/@/api/cashflow/model/depositModel';
  import { GetServiceResponse } from '/@/api/payment/model/payChannelServiceModel';
  import { createOtpSchemas } from './formSchemas';
  import moment from 'moment';

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
    name: 'CreateOtpModal',
    components: {
      BasicModal,
      BasicForm,
    },
    props: {
      visible: {
        type: Boolean,
      },
      postData: {
        type: Object as PropType<PostDepositData>,
      },
      payChannelServices: {
        type: Array as PropType<GetServiceResponse[]>,
      },
    },
    emits: ['update:visible', 'reload', 'resetParentFields', 'hideParentModal'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        loading: false,
      });

      // Form schemas
      const schemas = computed(() => {
        return createOtpSchemas(props.postData || {}, props.payChannelServices || []);
      });

      // Form definition
      const [register, { validate, resetFields }] = useForm({
        labelWidth: 180,
        showResetButton: false,
        showSubmitButton: false,
        schemas: schemas,
      });

      // Convert balance date field
      const convertBalanceDate = (str?: string) => {
        try {
          return moment(str).format('YYYY/MM/DD HH:mm:ss');
        } catch (e) {
          return str || '';
        }
      };

      // Handle ok button clicked
      const handleOk = async () => {
        try {
          // Validate form fields
          const formModel = await validate();

          // Update loading state
          state.loading = true;

          // Post deposit
          const response = await postDeposit({
            source: 2,
            ...props.postData,
            otp: formModel.otp,
          });

          // Validate response
          if (response.success) {
            // Notify success
            message.success('新增存款单成功');

            // Reset form fields
            await resetFields();

            // Reload deposit list
            emit('reload');

            // Reset parent fields
            emit('resetParentFields');

            // Hide parent modal
            emit('hideParentModal');

            // Hide otp modal
            emit('update:visible', false);
          } else {
            // Notify error
            message.error('新增存款单失败');
          }
        } catch (e) {
          // Exception handle by http utils
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
        convertBalanceDate,
        handleOk,
        updateVisible,
      };
    },
  });
</script>
