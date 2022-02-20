<template>
  <!-- Detail form start -->
  <BasicForm @register="register">
    <!-- Create name template start -->
    <template #createName="{ values }">
      <div class="flex flex-row justify-center">
        <Icon
          class="cursor-pointer"
          icon="ion:add-circle"
          color="#F286A0"
          size="28px"
          @click="setFieldsValue('createName', true)"
        />
      </div>
      <CreateNameModal
        :visible="values.createName"
        @update:visible="setFieldsValue('createName', $event)"
        @refreshName="handleRefreshName"
      />
    </template>
    <!-- Create name template end -->

    <!-- Settle time template start -->
    <template #settle="{ values, schema }">
      <div class="flex flex-row items-center">
        <TimePicker
          v-if="schema.componentProps.editable"
          format="HH:mm"
          class="flex-grow"
          :value="convertSettleTime(values.settleStime)"
          @update:value="setFieldsValue('settleStime', $event.format('HH:mm'))"
        />
        <span v-else>{{ convertSettleTime(values.settleStime).format('HH:mm') }}</span>
        <span class="px-4 flex-shrink-0">～</span>
        <TimePicker
          v-if="schema.componentProps.editable"
          format="HH:mm"
          class="flex-grow"
          :value="convertSettleTime(values.settleEtime)"
          @update:value="setFieldsValue('settleEtime', $event.format('HH:mm'))"
        />
        <span v-else>{{ convertSettleTime(values.settleEtime).format('HH:mm') }}</span>
      </div>
    </template>
    <!-- Settle time template end -->

    <!-- Limit amount template start -->
    <template #limit="{ values, schema }">
      <div class="flex flex-row items-center">
        <Input
          v-if="schema.componentProps.editable"
          type="number"
          :value="values[schema.componentProps.lowerField]"
          @update:value="setFieldsValue(schema.componentProps.lowerField, $event)"
        />
        <span v-else>{{ toLocaleString(values[schema.componentProps.lowerField]) }}</span>
        <span class="px-4 flex-shrink-0">～</span>
        <Input
          v-if="schema.componentProps.editable"
          type="number"
          :value="values[schema.componentProps.upperField]"
          @update:value="setFieldsValue(schema.componentProps.upperField, $event)"
        />
        <span v-else>{{ toLocaleString(values[schema.componentProps.upperField]) }}</span>
      </div>
    </template>
    <!-- Limit amount template end -->

    <!-- Fee amount template start -->
    <template #fee="{ values, schema }">
      <div class="flex flex-row items-center">
        <span class="px-4 flex-shrink-0">金额 x</span>
        <Input
          v-if="schema.componentProps.editable"
          type="number"
          :value="values[schema.componentProps.feeField]"
          @update:value="setFieldsValue(schema.componentProps.feeField, $event)"
        />
        <span v-else>{{ values[schema.componentProps.feeField] }}</span>
        <span class="px-4 flex-shrink-0">‰ ＋ 单笔</span>
        <Input
          v-if="schema.componentProps.editable"
          type="number"
          :value="values[schema.componentProps.perFeeField]"
          @update:value="setFieldsValue(schema.componentProps.perFeeField, $event)"
        />
        <span v-else>{{ toLocaleString(values[schema.componentProps.perFeeField]) }}</span>
      </div>
    </template>
    <!-- Fee amount template end -->

    <!-- Span template start -->
    <template #span="{ field, values }">
      <span>{{ values[field] }}</span>
    </template>
    <!-- Span template end -->
  </BasicForm>
  <!-- Detail form end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, onMounted } from 'vue';
  import { TimePicker, Input } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { BasicForm, useForm } from '/@/components/Form';
  import { PayChannelItem, PayChannelNameItem } from '/@/api/payment/model/payChannelModel';
  import { detailSchemas } from './formSchemas';
  import CreateNameModal from './CreateNameModal.vue';
  import moment from 'moment';

  /**
   * Component state
   */
  interface State {
    /** Show create name modal */
    showCreateName: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    components: {
      BasicForm,
      Icon,
      TimePicker,
      Input,
      CreateNameModal,
    },
    props: {
      editable: {
        type: Boolean,
      },
      payChannelItem: {
        type: Object as PropType<PayChannelItem>,
      },
      payChannelNameList: {
        type: Array as PropType<Array<PayChannelNameItem>>,
      },
    },
    emits: ['register', 'refreshName'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        showCreateName: false,
      });

      // Form schemas
      const schemas = computed(() => {
        return detailSchemas(props?.editable, props?.payChannelNameList, props?.payChannelItem);
      });

      // Form definition
      const [register, formAction] = useForm({
        labelWidth: 120,
        showResetButton: false,
        showSubmitButton: false,
        schemas: schemas,
      });

      // Convert settle time to moment
      const convertSettleTime = (time: String) => {
        try {
          const hour = Number(time.substring(0, 2));
          const minute = Number(time.substring(3, 5));
          return moment({ hour, minute });
        } catch (e) {
          return moment({ hour: 0, minute: 0 });
        }
      };

      // Set field value
      const setFieldsValue = (field: String, value: any) => {
        formAction.setFieldsValue({
          [`${field}`]: value,
        });
      };

      // Convert value to locale string
      const toLocaleString = (value?: string | number) => {
        try {
          return Number(value || '0').toLocaleString();
        } catch (e) {
          return value;
        }
      };

      // Handle refresh name event
      const handleRefreshName = () => {
        emit('refreshName');
      };

      // On component mounted
      onMounted(() => {
        emit('register', formAction);
      });
      return {
        state,
        register,
        convertSettleTime,
        setFieldsValue,
        toLocaleString,
        handleRefreshName,
      };
    },
  });
</script>
