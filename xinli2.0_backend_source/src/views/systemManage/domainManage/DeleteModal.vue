<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="deleteGroup ? '删除域名群组' : '删除域名'" @visible-change="change" :minHeight="100" :height="100">
    <p>{{ deleteMessage }}</p>
    <p v-if="deleteGroup" class="warning">※注意！删除后将失去下面所有子域名！</p>
    <template #footer>
      <a-button key="back" @click="closeModal">取消</a-button>
      <a-button key="submit" type="primary" :disabled="sec > 0" @click="handleDelete">{{ deleteBtnText }}</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { updateDomainGroup, updateDomain } from '/@/api/systemManage/systemManage';
  export default defineComponent({
    components: { BasicModal },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const deleteGroup = ref(true);
      const deleteMessage = ref('');
      let sec = ref(7);
      let target = {name: '', displayName: ''};
      let timer;
      const deleteBtnText = ref(`${sec.value}秒后可点击`);
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        deleteGroup.value = !!data?.deleteGroup;
        target = data.record;
        timer = setInterval(() => {
          sec.value--;
          deleteBtnText.value = `${sec.value}秒后可点击`;
          if (sec.value <= 0) {
            clearInterval(timer);
            deleteBtnText.value = '确认删除';
          }
        }, 1000);
        if (unref(deleteGroup)) {
          deleteMessage.value = `确定要删除『${target.name}』群组吗？`;
        } else {
          deleteMessage.value = `确定要删除域名『${target.name}』吗？`;
        }
      });

      function change(visible){
        if(!visible){
          clearInterval(timer);
          sec.value = 7;
          deleteBtnText.value = `${sec.value}秒后可点击`;
        }
      }

      async function handleDelete() {
        try {
          if (unref(deleteGroup)){
            await updateDomainGroup({
              ...target,
              setName: target.displayName,
              status: 2,
            });
          } else {
            await updateDomain({
              ...target,
              status: 2,
            });
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, handleDelete, change, closeModal, deleteBtnText, sec, deleteMessage, deleteGroup };
    },
  });
</script>
<style lang="scss" scoped>
p{
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem auto;
  &.warning{
    color: #F00;
  }
}
</style>