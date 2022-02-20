<template>
  <!-- Confirm modal start -->
  <BasicModal
    :visible="visible"
    :loading="state.loading"
    title="确定修改入帐日期？"
    okText="确认修改"
    @ok="handleOk"
    @update:visible="updateVisible"
  >
    <!-- Confirm form start -->
    <BasicForm @register="register">
      <!-- Span field template start-->
      <template #span="{ field, values }">
        <span>{{ values[field] }}</span>
      </template>
      <!-- Span field template end -->

      <!-- Balance date field template -->
      <template #balanceDate="{ field, values }">
        <span>{{ convertBalanceDate(values[field]) }}</span>
      </template>
      <!-- Balance date field template -->
    </BasicForm>
    <!-- Confirm form end -->
  </BasicModal>
  <!-- Confirm modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { putDepositBalanceDate } from '/@/api/cashflow/deposit';
  import { DepositItem, PutDepositBalanceDateData } from '/@/api/cashflow/model/depositModel';
  import { balanceDateConfirmSchemas } from './formSchemas';
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
    name: 'BalanceDateConfirmModal',
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
      putData: {
        type: Object as PropType<PutDepositBalanceDateData>,
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
        return balanceDateConfirmSchemas(props.record || {}, props.putData || {});
      });

      // Form definition
      const [register] = useForm({
        labelWidth: 180,
        showResetButton: false,
        showSubmitButton: false,
        schemas,
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
          // Update loading state
          state.loading = true;

          // Put balance date
          const response = await putDepositBalanceDate(props.putData);

          // Validate response
          if (response.success) {
            // Notify success
            message.success(`${props.record?.id} 修改入帐日期成功`);

            // Reload deposit list
            emit('reload');

            // Reset parent fields
            emit('resetParentFields');

            // Hide parent model
            emit('hideParentModal');

            // Hide confirm modal
            emit('update:visible', false);
          } else {
            // Notify error
            message.error(`${props.record?.id} 修改入帐日期失败`);
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
        convertBalanceDate,
        handleOk,
        updateVisible,
      };
    },
  });
</script>
