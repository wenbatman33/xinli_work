<template>
  <!-- Member column start -->
  <a @click="handleClick">{{ memberValue }}</a>
  <!-- Member column end -->
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { MemberKeyValueItem } from '/@/api/cashflow/model/withdrawalModel';

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'WithdrawalMember',
    props: {
      member: {
        type: Object as PropType<MemberKeyValueItem>,
      },
    },
    setup(props) {
      // Vue router
      const router = useRouter();

      // Member value
      const memberValue = computed(() => {
        return props.member?.value?.account || '';
      });

      // Handle member account clicked
      const handleClick = () => {
        if (props.member?.key) {
          const routeLocation = router.resolve({
            path: `/memberDetail/detail/${props.member?.key}`,
          });
          window.open(routeLocation.href, '_blank');
        }
      };
      return {
        memberValue,
        handleClick,
      };
    },
  });
</script>
