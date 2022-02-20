<template>
  <BasicModal
    v-bind="$attrs"
    :width="'600px'"
    :centered="true"
    @register="registerModal"
    :title="getTitle"
    cancelText="关闭"
    :showOkBtn="false"
  >
    <Description :column="2" :data="sendDetail" :schema="adjustReviewSchema" />
    <h1 v-if="warning" class="text-3xl mt-4">此会员(会员帐号)非该代理直属会员!</h1>
    <div class="mt-4 text-center" v-if="!readOnly">
      <Button type="default" class="ml-2" @click="review(false)">拒绝</Button>
      <Button type="primary" class="ml-2" @click="review(true)">核准</Button>
    </div>
    
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  // import { Form, Col } from 'ant-design-vue';
  import { Button } from '/@/components/Button';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description } from '/@/components/Description/index';
  import { adjustReviewSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addOperation, permit, deny } from '/@/api/agency/wallet';
  import { checkMemberNode } from '/@/api/agency/agency';

  const getTitle = computed(() => {
    return Number(sendDetail.value.type) <= 2 ? '手动上分' : '手动下分';
  });
  const sendDetail:any = ref({});
  const readOnly = ref(true);
  const refMember:any = ref({});
  const warning = computed(() => {
    if (sendDetail.value.type === 3){
      const parentAgencyID = refMember.value.parentAgencyID ? refMember.value.parentAgencyID : -1;
      return sendDetail.value.agencyID !== parentAgencyID;
    }else{
      return false;
    }
  });
  const { createMessage } = useMessage();
  const emit = defineEmits(['success', 'register']);

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    sendDetail.value = data.record;
    readOnly.value = data.readOnly;
    if (data.record.type === 3){
      refMember.value = await checkMemberNode({account: data.record.refMemberAccount});
    }
  });

  const review = async (pass) => {
    try {
      setModalProps({ confirmLoading: true });
      const id = sendDetail.value.id;
      if (pass === true){
        await permit({id});
      }else{
        await deny({id});
      }
      createMessage.success('操作成功');
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  
</script>
<style scoped>
h1{
  color: #F00;
  text-align: center;
}
</style>