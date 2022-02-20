<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="titleRef"
    @visible-change="handleVisibleChange"
    @ok="handleConfirm"
    :cancelText="'返回'"
    width="50%"
  >
    <div v-if="state.mode == 'Edit'" style="margin-bottom: 16px">
      <a-input
        :addon-before="state.promotionLink"
        v-model:value="state.newpromotionLink"
        placeholder="請輸入自訂連結"
      />
    </div>
    <div v-else style="margin-bottom: 16px">
      <a-input v-model:value="state.newpromotionLink" placeholder="請輸入獨立域名" />
      <h3 :style="{ color: 'red' }">請先購買該域名後，再進行新增</h3>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, reactive, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { updateAgencyPromotionlink, createAgencyPromotionlink } from '/@/api/agency/agency';
  import { message, Input } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicModal, AInput: Input },
    props: {
      userData: { type: Object },
    },
    emits: ['reload'],
    setup(props, { emit }) {
      const titleRef = computed(() => {
        let string = '';
        if (state.mode === 'Add') {
          string = '新增特殊推廣網址';
        } else if (state.mode === 'Edit') {
          string = '編輯推廣網址';
        }
        return string;
      });
      const state = reactive({
        mode: '',
        promotionLink: '',
        newpromotionLink: '',
        id: '',
      });
      const [register, { setModalProps, closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      async function onDataReceive(data) {
        state.mode = data.mode;
        state.promotionLink = data.promotionLink;
        state.id = data.id;
        console.log(data);
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      const handleConfirm = () => {
        if (state.mode === 'Add') {
          addSubmit();
        } else if (state.mode === 'Edit') {
          editSubmit();
        }
      };
      const addSubmit = async () => {
        try {
          const param = {
            agencyID: state.id,
            type: 0,
            promotionLink: state.newpromotionLink,
          };
          const result = await createAgencyPromotionlink(param);
          result.id ? ResSuccess() : ResError();
        } catch (e) {
          console.log(e);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };
      const editSubmit = async () => {
        try {
          const param = {
            id: state.id,
            type: 0,
            promotionLink: state.newpromotionLink,
          };
          const result = await updateAgencyPromotionlink(param);
          console.log('result', result);
          result.id ? ResSuccess() : ResError();
        } catch (e) {
          console.log(e);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };
      const ResError = () => {
        message.error(`编辑失败`);
        handleModalClose();
      };
      const ResSuccess = () => {
        message.success(`编辑成功`);
        handleModalClose();
      };
      const handleModalClose = () => {
        emit('reload');
        closeModal();
      };
      return {
        register,
        titleRef,
        handleVisibleChange,
        handleConfirm,
        state,
      };
    },
  });
</script>
