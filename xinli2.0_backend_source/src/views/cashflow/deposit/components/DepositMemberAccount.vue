<template>
  <!-- Member account column start -->
  <a @click="handleClick">{{ memberAccount }}</a>
  <!-- Member account column end -->
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { DepositItem } from '/@/api/cashflow/model/depositModel';

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'DepositMemberAccount',
    props: {
      record: {
        type: Object as PropType<DepositItem>,
      },
    },
    setup(props) {
      // Vue router
      const router = useRouter();

      // Member account
      const memberAccount = computed(() => {
        return props.record?.memberAccount || '';
      });

      // Handle member account clicked
      const handleClick = () => {
        if (props.record?.memberID) {
          const routeLocation = router.resolve({
            path: `/memberDetail/detail/${props.record?.memberID}`,
          });
          window.open(routeLocation.href, '_blank');
        }
      };
      return {
        memberAccount,
        handleClick,
      };
    },
  });
</script>
