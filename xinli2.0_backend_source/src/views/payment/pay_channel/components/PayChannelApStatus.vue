<template>
  <!-- Agent pay status start -->
  <div class="flex flex-row items-center justify-center">
    <!-- Supply agent pay start -->
    <span>{{ supply }}</span>
    <!-- Supply agent pay end -->

    <!-- Bracket start -->
    <span>(</span>
    <!-- Bracket end -->

    <!-- Agent pay active start -->
    <span :style="style">{{ active }}</span>
    <!-- Agent pay active end -->

    <!-- Bracket start -->
    <span>)</span>
    <!-- Bracket end -->
  </div>
  <!-- Agent pay status end -->
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { ColorEnum } from '/@/enums/colorEnum';
  import { PayChannelItem } from '/@/api/payment/model/payChannelModel';

  export default defineComponent({
    name: 'PayChannelApStatus',
    props: {
      record: {
        type: Object as PropType<PayChannelItem>,
      },
    },
    setup(props) {
      // Supply status text
      const supply = computed(() => {
        if (props.record?.supplyAp) {
          return 'Y';
        } else {
          return 'N';
        }
      });

      // Active status text
      const active = computed(() => {
        if (!props.record?.supplyAp) {
          return '-';
        } else if (props.record?.apStatus === 1) {
          return '正常';
        } else {
          return '停用';
        }
      });

      // Text color
      const color = computed(() => {
        if (!props.record?.supplyAp) {
          return ColorEnum.DEFAULT;
        } else if (props.record?.apStatus === 1) {
          return ColorEnum.SUCCESS;
        } else {
          return ColorEnum.ERROR;
        }
      });

      // Style
      const style = computed(() => {
        return {
          color: color.value,
        };
      });
      return {
        supply,
        active,
        style,
      };
    },
  });
</script>
