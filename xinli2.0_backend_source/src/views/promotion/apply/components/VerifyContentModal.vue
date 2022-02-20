<template>
  <BasicModal v-bind="$attrs" :height="100" :min-height="100" @register="registerModal" title="审核内容" @ok="closeModal">
    <Description :column="1" :data="descriptionData" :schema="schema" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Description } from '/@/components/Description/index';
  import type { DescItem } from '/@/components/Description/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  const descriptionData = ref({
    promotionCondRange: '',
    amount: '',
  });

  const schema: DescItem[] = [
    {
      field: 'promotionCondRange',
      label: '活动规定',
      render: (text)=>{
        return text.toString().replace(',', '-');
      }
    },
    {
      field: 'amount',
      label: '实际产生',
    },
  ];

  const emit = defineEmits(['register']);
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    descriptionData.value = data.record;
  });

</script>