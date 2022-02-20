<template>
  <div class="p-4 my-2" :style="currentStyle">
    <p class="flex justify-between">
      <b>{{ currentTitle }}</b>
      <Icon class="cursor-pointer" icon="ant-design:close-outlined" @click="deleteConds" />
    </p>
    <div class="my-4">
      <Checkbox class="flex-grow text-right" @change="beforeApplyChange" v-model:checked="beforeApply">审核计算的标的，为申请前最后一次执行的行为(ex存款活动，审核标的为申请前最后一次存款金额)</Checkbox>
    </div>
    <div class="my-4">
      <RadioGroup v-model:value="bonusType" button-style="solid">
        <RadioButton :value="1">%</RadioButton>
        <RadioButton :value="2">隨機固定金額(最多10選1)</RadioButton>
      </RadioGroup>
      <span style="background: #eee" class="p-2 mx-2 text-xs bg-gray-500">
        輸入整數,最多10組,以小寫逗號分隔, 如: 10,12,14
      </span>
    </div>
    <!-- <p>{{ data?.condList }}</p> -->
    <CondFormItem
      v-for="item in data?.condList"
      :key="'cond_' + item?.ID"
      :data="item"
      :bonusType="bonusType"
      :gameGroupsList="props.gameGroupsList"
    />
    <!-- 新增的遊戲廠商區塊 -->
    <CondFormItem
      v-for="newitem in state.createCondList"
      :key="'newitem_' + newitem.condIndex"
      :data="newitem"
      :bonusType="bonusType"
      :gameGroupsList="props.gameGroupsList"
      @deleteCondItem="deleteCondItem"
    />
    <Button type="primary" @click="addCond">+</Button>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import { Radio, Button, Checkbox } from 'ant-design-vue';
  const { Group: RadioGroup, Button: RadioButton } = Radio;
  import type { GetGameGroupRes } from '/@/api/game/model/gameModel';
  import CondFormItem from './CondFormItem.vue';
  import { Icon } from '/@/components/Icon';
  import { usePromotionStore } from '/@/store/modules/promotion';

  const emit = defineEmits(['deleteConds']);
  const props = defineProps({
    data: Object,
    gameGroupsList: Array as PropType<Array<GetGameGroupRes>>,
  });
  const promotionStore = usePromotionStore();
  const bonusType = ref(props.data?.condList[0].bonusType || 1);
  const beforeApply = ref(props.data?.condList[0].beforeApply === 1 ? true : false);
  const condTypeColor = [
    { type: 1, bgColor: '#FFE9EB', title: '存款模板' },
    { type: 2, bgColor: '#FEF5CE', title: '流水模板' },
    { type: 3, bgColor: '#EAFAFF', title: '投注额模板' },
    { type: 5, bgColor: '#ccffce', title: '负营利模板' },
  ];

  const state = reactive({
    createCondList: [] as any[],
  });

  const deleteConds = () => {
    emit('deleteConds', {
      promotionID: props?.data?.promotionID,
      type: props?.data?.condType,
    });
  };
  const deleteCondItem = (val: number) => {
    const newCondList = state.createCondList.filter((item) => {
      return item.condIndex !== val;
    });
    console.log(newCondList);
    state.createCondList = newCondList;
  };
  let condIndexNumber = 0;

  const addCond = () => {
    const emptyData = {
      condIndex: condIndexNumber,
      promotionID: props?.data?.promotionID,
      type: props?.data?.condType,
      gameTypeID: '',
      gameListID: '',
      gameItem: '',
      rangeMin: '',
      rangeMax: '',
      bonusType: bonusType.value,
      bonus: [],
      beforeApply: beforeApply.value,
    };
    state.createCondList.push(emptyData);
    condIndexNumber += 1;
  };
  const currentStyle = computed(() => {
    const currentType = condTypeColor.filter((item) => item.type === props?.data?.condType);
    return props?.data?.condType ? `background:${currentType[0].bgColor}` : '';
  });
  const currentTitle = computed(() => {
    const currentType = condTypeColor.filter((item) => item.type === props?.data?.condType);
    return currentType[0].title;
  });

  const beforeApplyChange = (e) => {
    if (e.target.checked === true){
      promotionStore.setBeforeApply(true);
    } else {
      promotionStore.setBeforeApply(false);
    }
  }
</script>
