<template>
  <BasicModal
    v-bind="$attrs"
    :width="'1000px'"
    :centered="true"
    @register="registerModal"
    title="手动上下分"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm"></BasicForm>
    <template v-if="agencyDetail.id">
      <Description title="代理资料" :column="3" :data="agencyDetail" :schema="agencyDetailSchema" />
      <Divider orientation="left">异动金额</Divider>
      <BasicForm @register="adjustFormRegister"></BasicForm>
    </template>
    <DoubleCheckModal @register="doubleCheckRegister" @success="handleSuccess"></DoubleCheckModal>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Divider } from 'ant-design-vue';
  import { BasicModal, useModalInner, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Description } from '/@/components/Description/index';
  import { agencySearchSchema, agencyDetailSchema, adjustFromSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getAgencyList, getAgencyDetail, checkMemberNode } from '/@/api/agency/agency';
  import DoubleCheckModal from './DoubleCheckModal.vue';

  export default defineComponent({
    components: { BasicModal, Description, BasicForm, Divider, DoubleCheckModal },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const agencyDetail = ref({});
      const { createMessage } = useMessage();

      const [doubleCheckRegister, { openModal: openDoubleCheck }] = useModal();

      const [registerForm, { getFieldsValue }] = useForm({
        labelWidth: 90,
        schemas: agencySearchSchema,
        showResetButton: false,
        submitButtonOptions: { text: '查询' },
        actionColOptions: {
          span: 3,
        },
        submitFunc: async() => {
          const searchData = getFieldsValue();
          if (!searchData.agencyID && !searchData.agencyAccount) {
            createMessage.error('请输入代理ID或代理账号');
          }else{
            const searchResult = (await getAgencyList(searchData)).list;
            if (searchResult.length === 0){
              createMessage.error('无此代理，请重新输入');
            }else{
              agencyDetail.value = await getAgencyDetail({id: searchResult[0].id});
              agencyDetail.value.agencyWallet = searchResult[0].agencyWallet;
            }
          }
        },
      });

      const [adjustFormRegister, { validate }] = useForm({
        labelWidth: 90,
        schemas: adjustFromSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });       
      });

      const handleSuccess = ()=>{
        closeModal();
        emit('success');
      }


      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          // TODO custom api
          // const params = {
          //   memberIDs: records.map(li=>li.riskID),
          // }
          const payload = await validate();
          let refMember = {};
          if (payload.type === 3){
            refMember = await checkMemberNode({account: payload.refMemberAccount});
          }
          const sendDoubleCheck = Object.assign({}, agencyDetail.value, payload, {refMember});
          openDoubleCheck(true, sendDoubleCheck);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerForm,
        registerModal,
        handleSubmit,
        agencyDetailSchema,
        agencyDetail,
        adjustFormRegister,
        doubleCheckRegister,
        handleSuccess
      };
    },
  });
</script>
