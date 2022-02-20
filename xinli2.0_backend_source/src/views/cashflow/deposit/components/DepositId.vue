<template>
  <!-- Id column start -->
  <div class="flex flex-row justify-center items-center">
    <!-- Id text start -->
    <span>{{ id }}</span>
    <!-- Id text end -->

    <!-- Copy button start -->
    <Icon class="ml-2 cursor-pointer" icon="ion:copy" size="16px" @click="handleCopy" />
    <!-- Copy button end -->
  </div>
  <!-- Id column end -->
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { message } from 'ant-design-vue';
  import Icon from '/@/components/Icon';

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'DepositId',
    components: {
      Icon,
    },
    props: {
      id: {
        type: String,
      },
    },
    setup(props) {
      // Handle copy button clicked
      const handleCopy = () => {
        const textArea = document.createElement('textarea');
        textArea.value = props.id || '';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        let success;
        try {
          success = document.execCommand('copy');
        } catch (e) {
          success = false;
        } finally {
          document.body.removeChild(textArea);
        }

        if (success) {
          message.success(`${props.id} 复制成功`);
        } else {
          message.error(`${props.id} 复制失败`);
        }
      };
      return {
        handleCopy,
      };
    },
  });
</script>
