<template>
  <!-- Reject modal start -->
  <BasicModal
    :visible="visible"
    :title="title"
    okText="通过"
    @ok="handleOk"
    @update:visible="updateVisible"
  >
    <!-- Reject form start -->
    <BasicForm @register="register">
      <!-- Form span field start -->
      <template #span="{ field, values }">
        <span>{{ values[field] }}</span>
      </template>
      <!-- Form span field end -->
    </BasicForm>
    <!-- Reject form end -->
  </BasicModal>
  <!-- Reject modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { putFinancePass } from '/@/api/cashflow/withdrawal';
  import { WithdrawalItem } from '/@/api/cashflow/model/withdrawalModel';
  import { passSchemas } from './formSchemas';

  /**
   * Component state interface
   */
  interface State {
    /** Put request loading */
    loading: Boolean;
  }

  export default defineComponent({
    name: 'PassModal',
    components: {
      BasicModal,
      BasicForm,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<WithdrawalItem>,
      },
    },
    emits: ['update:visible', 'reload'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        loading: false,
      });

      // Title
      const title = computed(() => {
        return `提款审核 \\ ${props.record?.transactionID || ''}`;
      });

      // Form schemas
      const schemas = computed(() => {
        return passSchemas(props.record || {});
      });

      // Form definition
      const [register, { validate }] = useForm({
        labelWidth: 120,
        showResetButton: false,
        showSubmitButton: false,
        schemas,
      });

      // Update visible state
      const updateVisible = (visible) => {
        emit('update:visible', visible);
      };

      // Handle ok button clicked
      const handleOk = async () => {
        const formModel = await validate();
        const response = await putFinancePass({
          orderSn: props.record?.transactionID || '',
          note: formModel.note || '',
        });
        if (response.success) {
          message.success(`${props.record?.transactionID} 通过成功`);
          emit('reload');
          emit('update:visible', false);
        } else {
          message.error(`${props.record?.transactionID} 通过失败`);
        }
      };
      return {
        state,
        title,
        register,
        updateVisible,
        handleOk,
      };
    },
  });
</script>
