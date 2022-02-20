<template>
  <!-- Service count start -->
  <a @click="handleClickServiceCount">{{ serviceCount }}</a>
  <!-- Service count end -->

  <!-- Services modal start -->
  <ServicesModal :record="record" v-model:visible="state.showServices" />
  <!-- Services modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { PayChannelItem } from '/@/api/payment/model/payChannelModel';
  import ServicesModal from './ServicesModal.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Show services modal */
    showServices: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'PayChannelServiceCount',
    components: {
      ServicesModal,
    },
    props: {
      record: {
        type: Object as PropType<PayChannelItem>,
      },
    },
    emits: ['refreshList', 'refreshName'],
    setup(props) {
      // Component state
      const state = reactive<State>({
        showServices: false,
      });

      // Service count
      const serviceCount = computed(() => {
        return props.record?.payChannelServiceCount || '-';
      });

      // Handle service count clicked
      const handleClickServiceCount = () => {
        state.showServices = true;
      };
      return {
        state,
        serviceCount,
        handleClickServiceCount,
      };
    },
  });
</script>
