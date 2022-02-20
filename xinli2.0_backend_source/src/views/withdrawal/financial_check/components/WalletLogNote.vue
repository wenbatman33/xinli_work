<template>
  <span>{{ content }}</span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'WalletLogNote',
    props: {
      note: {
        type: String,
      },
      refID: {
        type: String,
      },
    },
    setup(props) {
      // Content text
      const content = computed(() => {
        return props?.note || '';
      });

      return {
        content,
      };
    },
  });
</script>
