<template>
  <!-- Balance modal start -->
  <BasicModal
    :visible="visible"
    title="修改存款单入帐日"
    width="50%"
    okText="确认修改"
    @ok="handleOk"
    @update:visible="updateVisible"
  >
    <!-- Balance form start -->
    <BasicForm @register="register">
      <!-- Span field template start -->
      <template #span="{ field, values }">
        <span>{{ values[field] }}</span>
      </template>
      <!-- Span field template end -->

      <!-- Create at field template -->
      <template #createAt="{ field, values }">
        <span>{{ convertCreateAt(values[field]) }}</span>
      </template>
      <!-- Create at field template -->

      <!-- Date field template start -->
      <template #date="{ field, values }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[field])"
            @update:value="setFieldValue(field, $event)"
          />
          <Button type="primary" class="ml-2" @click="handleToday">今天</Button>
        </div>
      </template>
      <!-- Date field template end -->
    </BasicForm>
    <!-- Balance form end -->
  </BasicModal>
  <!-- Balance modal end -->

  <!-- Confirm modal start -->
  <BalanceDateConfirmModal
    v-model:visible="state.showConfirm"
    :record="record"
    :putData="state.putData"
    @reload="handleReload"
    @resetParentFields="handleResetParentFields"
    @hideParentModal="handleHideParentModal"
  />
  <!-- Confirm modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { Button, DatePicker, message } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { GetServiceResponse } from '/@/api/payment/model/payChannelServiceModel';
  import { PutDepositBalanceDateData, DepositItem } from '/@/api/cashflow/model/depositModel';
  import { balanceDateSchemas } from './formSchemas';
  import BalanceDateConfirmModal from './BalanceDateConfirmModal.vue';
  import moment from 'moment';

  /**
   * Component state interface
   */
  interface State {
    /** Show confirm modal */
    showConfirm: Boolean;

    /** Put balance date data */
    putData: PutDepositBalanceDateData;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'BalanceDateModal',
    components: {
      Button,
      DatePicker,
      BasicModal,
      BasicForm,
      BalanceDateConfirmModal,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<DepositItem>,
      },
      payChannelServices: {
        type: Array as PropType<GetServiceResponse[]>,
      },
    },
    emits: ['update:visible', 'reload'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        showConfirm: false,
        putData: {},
      });

      // Form schemas
      const schemas = computed(() => {
        return balanceDateSchemas(props.record || {}, props.payChannelServices || []);
      });

      // Form definition
      const [register, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 180,
        showResetButton: false,
        showSubmitButton: false,
        schemas,
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

      // Convert create at field
      const convertCreateAt = (str?: string) => {
        try {
          return moment(str).format('YYYY/MM/DD HH:mm:ss');
        } catch (e) {
          return str || '';
        }
      };

      // Set field value
      const setFieldValue = (field: string, value: any) => {
        let str;
        if (value.format) {
          str = value.format('YYYY-MM-DD');
        } else {
          str = value.toString();
        }
        setFieldsValue({ [`${field}`]: str });
      };

      // Handle today button clicked
      const handleToday = () => {
        setFieldsValue({ balanceDate: moment().format('YYYY-MM-DD') });
      };

      // Handle ok button clicked
      const handleOk = async () => {
        try {
          // Validate form fields
          const formModel = await validate();

          // Validate balance date
          const balanceDate = moment(`${formModel.balanceDate} 00:00:00`, 'YYYY-MM-DD HH:mm:ss');
          const today = moment(`${moment().format('YYYY-MM-DD')} 00:00:00`, 'YYYY-MM-DD HH:mm:ss');
          if (balanceDate.isAfter(today)) {
            message.error('入帐日期不可晚于目前时间');
            return;
          }

          // Update put data
          state.putData = {
            id: props.record?.id,
            balanceDate: formModel.balanceDate,
            note: formModel.note,
          };

          // Show confirm modal
          state.showConfirm = true;
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
        emit('update:visible', visible);
      };
      return {
        state,
        register,
        convertMoment,
        convertCreateAt,
        setFieldValue,
        handleToday,
        handleOk,
        handleReload,
        handleResetParentFields,
        handleHideParentModal,
        updateVisible,
      };
    },
  });
</script>
