<template>
  <!-- Sn start -->
  <a @click="handleClickSn">{{ sn }}</a>
  <!-- Sn end -->

  <!-- Detail modal start -->
  <DetailModal
    :record="record"
    :payChannelNameList="payChannelNameList"
    v-model:visible="state.showDetail"
    @refreshList="handleRefreshList"
    @refreshName="handleRefreshName"
  />
  <!-- Detail modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { PayChannelItem, PayChannelNameItem } from '/@/api/payment/model/payChannelModel';
  import DetailModal from './DetailModal.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Show detail modal */
    showDetail: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'PayChannelSn',
    components: {
      DetailModal,
    },
    props: {
      record: {
        type: Object as PropType<PayChannelItem>,
      },
      payChannelNameList: {
        type: Array as PropType<Array<PayChannelNameItem>>,
      },
    },
    emits: ['refreshList', 'refreshName'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        showDetail: false,
      });

      // Sn
      const sn = computed(() => {
        return props.record?.sn || '-';
      });

      // Handle sn clicked
      const handleClickSn = () => {
        state.showDetail = true;
      };

      // Handle refresh pay channel list
      const handleRefreshList = () => {
        emit('refreshList');
      };

      // Handle refresh name list
      const handleRefreshName = () => {
        emit('refreshName');
      };
      return {
        state,
        sn,
        handleClickSn,
        handleRefreshList,
        handleRefreshName,
      };
    },
  });
</script>
