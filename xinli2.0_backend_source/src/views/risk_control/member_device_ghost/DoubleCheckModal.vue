<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" title="操作确认" @ok="handleSubmit" width="350px" :min-height="50">
    <p class="modal_p">是否<span>{{ status === 1 ? '关闭' : '开启' }}</span>会员：<i>{{ memberName }}</i></p>
    <p class="modal_p">的<span>{{ checkType }}</span>功能</p>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { SetDepositStatus, SetWithdrawStatus } from '/@/api/member/member';
  import { SetStatus } from '/@/api/member/member';

  export default defineComponent({
    name: 'DoubleCheckModal',
    components: { BasicModal },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const checkMapping = {
        depositLimit: '存款',
        withdrawLimit: '提款',
        status: '登入',
        gameLogin: '游戏'
      };

      const state = reactive({
        pureType: '',
        checkType: '',
        memberName: '',
        memberID: 0,
        status: 0,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        state.pureType = data.type;
        state.checkType = checkMapping[data.type];
        state.memberName = data.record.account;
        state.memberID = data.record.memberID;
        state.status = data.record[data.type];
      });

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          // TODO custom api
          // await SetCheck();
          const commentString = '装置重复_' + (state.status === 1 ? '停用':'启用') + state.checkType;
          const params = {
            memberIDs: [state.memberID],
            status: state.status === 1 ? 2 : 1,
            comment: commentString
          }
          if (state.pureType === 'depositLimit'){
            await SetDepositStatus(params);
          }else if (state.pureType === 'withdrawLimit'){
            await SetWithdrawStatus(params);
          }else if (state.pureType === 'status'){
            await SetStatus(params);
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { ...toRefs(state), registerModal, handleSubmit };
    },
  });
</script>
<style lang="scss" scoped>
.modal_p{
  font-size: 1.2em;
  span{
    color: #F00;
  }
  i{
    color: #00F;
  }
}
</style>