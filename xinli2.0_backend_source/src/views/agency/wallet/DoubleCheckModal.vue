<template>
  <BasicModal
    v-bind="$attrs"
    :width="'600px'"
    :centered="true"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <Description :column="2" :data="sendDetail" :schema="adjustCheckSchema" />
    <h1 v-if="warning" class="text-3xl mt-4">此会员(会员帐号)非该代理直属会员！是否确定本次操作？</h1>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description } from '/@/components/Description/index';
  import { adjustCheckSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addOperation } from '/@/api/agency/wallet';

  const getTitle = computed(() => {
    return Number(sendDetail.value.type) <= 2 ? '手动上分' : '手动下分';
  });
  const sendDetail:any = ref({});
  const warning = computed(() => {
    const parentAgencyID = sendDetail.value.refMember ? sendDetail.value.refMember.parentAgencyID : -1;
    return sendDetail.value.id !== parentAgencyID;
  });
  const { createMessage } = useMessage();
  const emit = defineEmits(['success', 'register']);

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    sendDetail.value = data;
  });


  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      // TODO custom api
      // const params = {
      //   memberIDs: records.map(li=>li.riskID),
      // }
      const params = {
        agencyID: sendDetail.value.id,
        amount: sendDetail.value.amount,
        turnoverLimit: sendDetail.value.turnoverLimit,
        remark: sendDetail.value.remark,
        type: sendDetail.value.type,
        refMemberID: sendDetail.value.refMember.id,
      }
      await addOperation(params);
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