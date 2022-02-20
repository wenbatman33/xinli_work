<template>
  <!-- Member name column start -->
  <a @click="handleClick">{{ memberName }}</a>
  <!-- Member name column end -->
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRouter } from 'vue-router';

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'MemberReportMemberName',
    props: {
      record: {
        type: Object,
      },
    },
    setup(props) {
      // Vue router
      const router = useRouter();

      // Member name
      const memberName = computed(() => {
        return props.record?.memberName || props.record?.memberID || '';
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
        memberName,
        handleClick,
      };
    },
  });
</script>
