<template>
  <div class="grid grid-cols-chart items-center">
    <div ref="chartRef" style="height: 24px"></div>
    <span class="text-deposit-limit" :style="textStyle">{{ depositLimit }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, computed, onMounted } from 'vue';
  import { PayChannelItem } from '/@/api/payment/model/payChannelModel';
  import { ColorEnum } from '/@/enums/colorEnum';
  import { useECharts } from '/@/hooks/web/useECharts';

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'PayChannelDepositRatio',
    props: {
      record: {
        type: Object as PropType<PayChannelItem>,
      },
    },
    setup(props) {
      // Chart ref
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      // Deposit limit
      const depositLimit = computed(() => {
        try {
          return Number(props?.record?.depositLimit || 0).toLocaleString();
        } catch (e) {
          return props?.record?.depositLimit || 0;
        }
      });

      // Text color
      const color = computed(() => {
        const ratio = props?.record?.depositRatio || 0;
        if (ratio < 0.3) {
          return ColorEnum.SUCCESS;
        } else if (ratio < 0.7) {
          return '#5555FF';
        } else {
          return ColorEnum.ERROR;
        }
      });

      // Text style
      const textStyle = computed(() => {
        return {
          color: color.value,
        };
      });

      // On component mounted
      onMounted(() => {
        setOptions({
          backgroundColor: '#E7E7E7',
          grid: {
            left: '0px',
            right: '0px',
            top: '0px',
            bottom: '0px',
          },
          xAxis: [
            {
              show: false,
              max: props?.record?.depositLimit || 0,
            },
          ],
          yAxis: [
            {
              show: false,
              data: [0],
            },
          ],
          series: [
            {
              type: 'bar',
              xAxisIndex: 0,
              yAxisIndex: 0,
              barWidth: '100%',
              itemStyle: { color: color.value },
              label: {
                show: true,
                position: 'inside',
                color: '#ffffff',
                formatter: () => {
                  const remainAmount = props?.record?.remainAmount || 0;
                  const depositLimit = props?.record?.depositLimit || 0;
                  const percentage = Math.floor((remainAmount / depositLimit) * 100);
                  if (depositLimit == 0 || percentage <= 0) {
                    return '';
                  } else {
                    return `${percentage}%`;
                  }
                },
              },
              data: [props?.record?.remainAmount || 0],
            },
          ],
        });
      });
      return {
        chartRef,
        depositLimit,
        textStyle,
      };
    },
  });
</script>

<style scoped lang="scss">
  .grid-cols-chart {
    column-gap: 12px;
    grid-template-columns: 1fr auto;
  }

  .text-deposit-limit {
    white-space: nowrap;
    width: 70px;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
