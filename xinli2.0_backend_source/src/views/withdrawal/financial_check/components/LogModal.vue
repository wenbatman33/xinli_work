<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" :showOkBtn="false" :cancelText="'关闭'" title="审核内容" width="700px">
    <ul>
      <li v-for="li in notes">{{ li }}</li>
    </ul>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  export default defineComponent({
    name: 'RepeatListModal',
    components: { BasicModal },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const notes = ref([]);
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        notes.value = data.record;
      });


      return { registerModal, notes };
    },
  });
</script>

<style lang="scss" scoped>
ul{
  margin: 1rem 1rem;
  li{
    margin-bottom: 1rem;
    padding-left: 2rem;
    position: relative;
    &:before{
      content: '•';
      position: absolute;
      left: 0.5rem;
      top: -0.3rem;
      font-size: 1.5rem;
      color: #000;
    }
  }
}
</style>
