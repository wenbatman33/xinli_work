<template>
  <BasicModal @register="groupModal" :title="titleRef" width="50%" @ok="handleSubmit">
    <div class="CENTER_C">
      <Transfer
        :data-source="allGroups"
        :titles="['所有线路组别', '现有组别']"
        :selected-keys="selectedKeys"
        :target-keys="targetKeys"
        :render="(item) => item.label"
        @change="handleChange"
        @selectChange="handleSelectChange"
        :list-style="{ width: '250px', height: '380px' }"
      />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Transfer, message } from 'ant-design-vue';
  import { putServiceGroups } from '/@/api/payment/payChannelService';

  const emit = defineEmits(['success', 'register']);

  const titleRef = computed(() => '組別設定');
  const rowId = ref(0);
  const rowGroups = ref<any[]>([]);
  const allGroups = ref<any[]>([]);
  const targetKeys = ref<any[]>([]);
  const selectedKeys = ref<any[]>([]);

  const handleSubmit = async () => {
    // const numberArray = targetKeys.value.filter(function (val) {return rowGroups.value.indexOf(val) <= -1;}).map((item) => Number(item));
    const numberArray = targetKeys.value.map((item) => Number(item));
    const payload = {
      id: Number(rowId.value),
      ids: numberArray,
    };
    const result = await putServiceGroups(payload);
    result.success ? ResSuccess() : ResError();
    closeModal();
  };

  const ResError = () => {
    message.error(`设定组别失败`);
    emit('success');
    closeModal();
  };
  const ResSuccess = () => {
    message.success(`设定组别成功`);
    emit('success');
    closeModal();
  };

  const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
    targetKeys.value = nextTargetKeys;
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };
  const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    selectedKeys.value = [...sourceSelectedKeys, ...targetSelectedKeys];
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };
  const [groupModal, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({ minHeight: 400 });
    rowId.value = data.record.id;
    rowGroups.value = data?.rowGroups?.map((item) => String(item.key)) || [];
    allGroups.value = data?.allGroups?.map((item) => {
      return {
        title: item.value,
        label: item.value,
        value: item.value,
        key: String(item.key),
      };
    });
    targetKeys.value = rowGroups.value;
  });
</script>
