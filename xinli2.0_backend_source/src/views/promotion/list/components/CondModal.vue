<template>
  <BasicModal
    :title="titleRef"
    width="1200px"
    @register="createPromotionModal"
    @ok="handleSubmit"
    @cancel="handleReset"
  >
    <div class="mb-4 flex">
      <Button v-if="fliterCondType_1" type="primary" class="mr-2" @click="addCond(1)"
        >新增存款模板</Button
      >
      <Button v-if="fliterCondType_2" type="primary" class="mr-2" @click="addCond(2)"
        >新增流水模板</Button
      >
      <Button v-if="fliterCondType_3" type="primary" class="mr-2" @click="addCond(3)"
        >新增投注模板</Button
      >
      <Button v-if="fliterCondType_5" type="primary" class="mr-2" @click="addCond(5)"
        >新增负营利模版</Button
      >
    </div>
    <Cond
      v-for="item in promotionStore.condList"
      :key="item.ID"
      :data="item"
      :dropdownData="props.dropdownData"
      :gameGroupsList="props.gameGroupsList"
      @deleteConds="handleDeleteConds"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Button, message } from 'ant-design-vue';
  import Cond from './Cond.vue';
  import { getPromotionCondList, deletePromotionCondConds } from '/@/api/promotion/list';
  import { usePromotionStore } from '/@/store/modules/promotion';
  import type { GetGameGroupRes } from '/@/api/game/model/gameModel';
  import type { DeletePromotionCondCondsParams } from '/@/api/promotion/model/listModel';

  const emit = defineEmits(['success', 'register']);
  const promotionStore = usePromotionStore();
  const props = defineProps({
    dropdownData: Object,
    gameGroupsList: Array as PropType<Array<GetGameGroupRes>>,
  });
  const promotionID = ref(0);
  const titleRef = ref('设定优惠模板');
  const addCond = (type: number) => {
    const data = {
      promotionID: promotionID.value,
      condType: type,
      condList: [
        {
          promotionID: promotionID.value,
          gameTypeID: 0,
          type: type,
          gameListID: [],
          rangeMin: '',
          rangeMax: '',
          bonusType: 1,
          bonus: [],
        },
      ],
    };
    promotionStore.updateCondList(data);
  };
  const [createPromotionModal, { closeModal }] = useModalInner((data) => {
    promotionID.value = data.record.ID;
    init(promotionID.value);
  });

  const fliterCondType_1 = computed(
    () => !(promotionStore?.condList?.filter((item) => item.condType === 1).length > 0)
  );
  const fliterCondType_2 = computed(
    () => !(promotionStore?.condList?.filter((item) => item.condType === 2).length > 0)
  );
  const fliterCondType_3 = computed(
    () => !(promotionStore?.condList?.filter((item) => item.condType === 3).length > 0)
  );
  const fliterCondType_5 = computed(
    () => !(promotionStore?.condList?.filter((item) => item.condType === 5).length > 0)
  );
  const handleDeleteConds = async (data: DeletePromotionCondCondsParams) => {
    const res = await deletePromotionCondConds(data);
    res && init(promotionID.value);
  };
  const handleReset = () => {
    promotionStore.setCondList([]);
    emit('success');
    closeModal();
  };
  const handleSubmit = () => {
    promotionStore.toggleSubmitAction(true);
  };
  const init = async (id: number) => {
    const res = await getPromotionCondList({ promotionID: id });
    const condList = res.list || [];
    promotionStore.setCondList(condList);
  };
  watch(
    () => promotionStore.fetchDone,
    (newVal) => {
      
      if (newVal === true) {
        promotionStore.resetCondList();
        closeModal();
        setTimeout(() => {
          message.success('设定完成');
          emit('success');
        }, 1000);
      }
    },
    { deep: true }
  );
</script>
