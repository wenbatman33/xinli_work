<template>
  <!-- Create modal start -->
  <BasicModal
    :visible="visible"
    width="50%"
    title="新增存款单 Create New Transaction"
    okText="确认新增"
    @ok="handleOk"
    @update:visible="updateVisible"
  >
    <!-- Create form start -->
    <BasicForm @register="register">
      <!-- Date template start -->
      <template #date="{ field, values }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[field])"
            @update:value="setFieldValue(field, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[field])"
            @update:value="setFieldValue(field, $event)"
          />
        </div>
      </template>
      <!-- Date template end -->

      <!-- Fee template start -->
      <template #fee="{ field, values }">
        <div class="flex flex-row items-center">
          <Input
            :value="values[field]"
            type="number"
            class="flex-grow"
            @update:value="setFieldValue(field, $event)"
          />
          <Button
            :loading="state.computingFee"
            type="primary"
            class="ml-2"
            @click="handleComputeFee"
          >
            计算手续费
          </Button>
        </div>
      </template>
      <!-- Fee template end -->
    </BasicForm>
    <!-- Create form end -->
  </BasicModal>
  <!-- Create modal end -->

  <!-- OTP modal start -->
  <CreateOtpModal
    v-if="state.showOtp"
    v-model:visible="state.showOtp"
    :postData="state.postData"
    :payChannelServices="payChannelServices"
    @reload="handleReload"
    @resetParentFields="handleResetParentFields"
    @hideParentModal="handleHideParentModal"
  />
  <!-- OTP modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { DatePicker, TimePicker, Input, Button, message } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { postDepositFee } from '/@/api/cashflow/deposit';
  import { PostDepositData } from '/@/api/cashflow/model/depositModel';
  import { GetServiceResponse } from '/@/api/payment/model/payChannelServiceModel';
  import { createSchemas } from './formSchemas';
  import CreateOtpModal from './CreateOtpModal.vue';
  import moment from 'moment';

  /**
   * Component state interface
   */
  interface State {
    /** Fee value computing */
    computingFee: Boolean;

    /** Show OTP modal */
    showOtp: Boolean;

    /** Post deposit data */
    postData: PostDepositData;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'CreateModal',
    components: {
      BasicModal,
      BasicForm,
      DatePicker,
      TimePicker,
      Input,
      Button,
      CreateOtpModal,
    },
    props: {
      visible: {
        type: Boolean,
      },
      payChannelServices: {
        type: Array as PropType<GetServiceResponse[]>,
      },
    },
    emits: ['update:visible', 'reload'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        computingFee: false,
        showOtp: false,
        postData: {},
      });

      // Form schemas
      const schemas = computed(() => {
        return createSchemas(props.payChannelServices || []);
      });

      // Form definition
      const [register, { setFieldsValue, getFieldsValue, validate, resetFields }] = useForm({
        labelWidth: 180,
        showResetButton: false,
        showSubmitButton: false,
        schemas: schemas,
      });

      // Convert string to moment
      const convertMoment = (str?: string) => {
        if (str === '') {
          return undefined;
        }
        if (str === undefined) {
          return undefined;
        }
        try {
          return moment(str);
        } catch (e) {
          return undefined;
        }
      };

      // Set field value
      const setFieldValue = (field: string, value: any) => {
        let formattedValue = value;
        if (value.format) {
          formattedValue = value.format('YYYY-MM-DD HH:mm:ss');
        }
        setFieldsValue({ [`${field}`]: formattedValue });
      };

      // Handle compute fee button clicked
      const handleComputeFee = async () => {
        try {
          // Validate amount
          const formModel = getFieldsValue();
          const amount = formModel?.amount;
          if (!amount) {
            message.error('请输入存款金额');
            return;
          }

          // Validate pay channel service id
          const payChannelServiceID = formModel?.payChannelServiceID;
          if (!payChannelServiceID) {
            message.error('请选择线路');
            return;
          }

          // Update computing state
          state.computingFee = true;

          // Compute fee
          const response = await postDepositFee({
            payChannelServiceID: payChannelServiceID,
            amount: amount,
          });

          // Update fee field
          setFieldValue('fee', response.fee);
        } catch (e) {
          // Exception handled by http utils
        } finally {
          // Revert computing state
          state.computingFee = false;
        }
      };

      // Handle ok button clicked
      const handleOk = async () => {
        try {
          // Validate form fields
          const formModel = await validate();

          // Validate balance date
          const balanceDate = moment(formModel.balanceDate);
          const today = moment();
          if (balanceDate.isAfter(today)) {
            message.error('入帐日期不可晚于目前时间');
            return;
          }

          // Update post data
          state.postData = {
            memberAccount: formModel.memberAccount,
            balanceDate: formModel.balanceDate,
            amount: formModel.amount,
            payChannelServiceID: formModel.payChannelServiceID,
            fee: formModel.fee,
            thirdID: formModel.thirdID,
            note: `${formModel.notePrefix} ${formModel.noteSuffix}`,
          };

          // Show otp modal
          state.showOtp = true;
        } catch (e) {
          // Exception handle by form component
        }
      };

      // Handle reload deposit list
      const handleReload = () => {
        emit('reload');
      };

      // Handle reset parent fields
      const handleResetParentFields = () => {
        resetFields();
      };

      // Handle hide parent modal
      const handleHideParentModal = () => {
        emit('update:visible', false);
      };

      // Update visible state
      const updateVisible = (visible) => {
        if (!visible) {
          resetFields();
        }
        emit('update:visible', visible);
      };
      return {
        state,
        register,
        resetFields,
        convertMoment,
        setFieldValue,
        handleComputeFee,
        handleOk,
        handleReload,
        handleResetParentFields,
        handleHideParentModal,
        updateVisible,
      };
    },
  });
</script>
