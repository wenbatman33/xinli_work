<template>
  <div class="my-4">
    <Form :model="formData" :rules="rules" :labelAlign="'left'" ref="formRef">
      <div class="flex flex-row items-center">
        <div class="flex mr-8">
          <FormItem
            style="width: 300px"
            ref="gameItem"
            name="gameItem"
            label="指定游戏类型/厂商"
            :label-col="{ span: 10 }"
            :wrapper-col="{ span: 14 }"
          >
            <Cascader
              v-model:value="formData.gameItem"
              :options="state.optionList"
              placeholder="Please select"
            />
          </FormItem>
        </div>
        <div class="flex mr-4">
          <FormItem
            ref="rangeMin"
            name="rangeMin"
            :label="rangeMinLabel"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <Input
              v-model:value="formData.rangeMin"
              placeholder="請輸入正整數"
              style="width: 100%"
            />
          </FormItem>
          <div class="flex mt-4 ml-4 mr-4">~</div>
        </div>
        <div class="flex mr-4">
          <FormItem
            ref="rangeMax"
            name="rangeMax"
            :label="rangeMaxLabel"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <Input
              v-model:value="formData.rangeMax"
              placeholder="未填写则无上限"
              style="width: 100%"
            />
          </FormItem>
        </div>
        <div class="flex mr-4" style="width: 250px">
          <FormItem
            ref="bonus"
            name="bonus"
            label="回饋"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <Select
              mode="tags"
              v-model:value="formData.bonus"
              placeholder="请输入回馈数值"
              :token-separators="[',']" 
              style="width: 200px"
              @change="checkInputBonus"
            />
          </FormItem>
        </div>
        <div class="flex">
          <Icon class="cursor-pointer" icon="ant-design:delete-filled" @click="deleteCond" />
        </div>
      </div>
    </Form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted, watch } from 'vue';
  import { Form, Input, Select, Cascader } from 'ant-design-vue';
  import type { GetGameGroupRes } from '/@/api/game/model/gameModel';
  import { usePromotionStore } from '/@/store/modules/promotion';
  import { deletePromotionCond, getPromotionCondList } from '/@/api/promotion/list';
  import { Icon } from '/@/components/Icon';

  interface gameItem {
    value: number | undefined;
    label: string | undefined;
    children: gameListItem[];
  }
  interface gameListItem {
    value: number | undefined;
    label: string | undefined;
  }
  export default defineComponent({
    components: {
      Form,
      Input,
      Select,
      Cascader,
      FormItem: Form.Item,
      Icon,
    },
    props: {
      data: Object,
      gameGroupsList: Array as PropType<Array<GetGameGroupRes>>,
      bonusType: Number,
    },
    emits: ['deleteCondItem'],
    setup(props, { emit }) {
      const promotionStore = usePromotionStore();
      const bonusTypeRef = computed(() => props.bonusType);
      const state = reactive({
        optionList: [] as gameItem[],
      });

      const formData = reactive({
        ID: undefined,
        promotionID: undefined,
        type: undefined,
        gameTypeID: undefined,
        gameListID: undefined,
        gameItem: [] as number[],
        rangeMin: '',
        rangeMax: '',
        bonus: [],
      });
      const rules = {
        gameItem: { required: true, message: '请选择游戏类型/厂商' },
        rangeMin: { required: true, pattern: /^\+?[1-9][0-9]*$/, message: '请输入正整数' },
        rangeMax: { pattern: /^\+?[1-9][0-9]*$/, message: '请输入正整数或留空' },
        bonus: { required: true, message: '请输入回馈' },
      };
      const rangeLabeMinlList = {
        1: '存款金額',
        2: '流水區間',
        3: '投注額區間',
        5: '负营利区间',
      };
      const rangeLabeMaxlList = {
        1: '存款金額上限',
        2: '流水區間上限',
        3: '投注額區間上限',
        5: '负营利区间上限',
      };
      const rangeMinLabel = computed(() => rangeLabeMinlList[props?.data?.type]);
      const rangeMaxLabel = computed(() => rangeLabeMaxlList[props?.data?.type]);

      const formRef = ref();

      const checkInputBonus = () => {
        const newVal =
          bonusTypeRef.value === 1 ? formData.bonus.slice(0, 1) : formData.bonus.slice(0, 10);
        const res = newVal.filter((item) => /^[0-9\s]*$/.test(item));
        formData.bonus = res;
      };

      const deleteCond = async () => {
        if (formData.ID) {
          const res = await deletePromotionCond({ ID: Number(formData.ID) });
          res && reLoadCondList(formData.promotionID);
        } else {
          emit('deleteCondItem', props?.data?.condIndex);
        }
      };
      const reLoadCondList = async (id) => {
        const res = await getPromotionCondList({ promotionID: id });
        const condList = res.list || [];
        promotionStore.setCondList(condList);
      };
      const submit = () => {
        formRef.value
          .validate()
          .then(() => {
            let payload = {
              ID: formData.ID,
              promotionID: formData.promotionID,
              type: formData.type,
              rangeMin: formData.rangeMin,
              rangeMax: formData.rangeMax,
              bonus: formData.bonus.map(Number),
              gameTypeID: Number(formData.gameItem[0]),
              gameListID: Number(formData.gameItem[1]),
              bonusType: bonusTypeRef.value,
              beforeApply: promotionStore.beforeApply,
            };
            promotionStore.addcondListQueue(payload);
          })
          .catch(() => {
            promotionStore.clearcondListQueue();
            promotionStore.toggleSubmitAction(false);
          });
      };
      watch(
        () => bonusTypeRef.value,
        () => {
          checkInputBonus();
        },
        { deep: true }
      );

      watch(
        () => promotionStore.submitAction,
        (newVal) => {
          if (newVal === true) {
            submit();
          }
        },
        { deep: true }
      );
      onMounted(() => {
        const gameGroupsList = props?.gameGroupsList?.map((item) => {
          return {
            value: item.id,
            label: item.name,
            children: item.gameGroupList?.map((subitem) => {
              return {
                value: subitem.id,
                label: subitem.name || subitem.displayName,
              };
            }),
          };
        });
        state.optionList = gameGroupsList || [];
        promotionStore.addCondTotal();
        formData.ID = props?.data?.ID;
        formData.promotionID = props?.data?.promotionID;
        formData.type = props?.data?.type;
        formData.gameTypeID = props?.data?.gameTypeID;
        formData.gameListID = props?.data?.gameListID;
        formData.rangeMin = props?.data?.rangeMin;
        formData.rangeMax = props?.data?.rangeMax;
        formData.bonus = props?.data?.bonus;
        formData.gameItem[0] = props?.data?.gameTypeID;
        formData.gameItem[1] = props?.data?.gameListID;
      });
      return {
        state,
        promotionStore,
        bonusTypeRef,
        formData,
        rules,
        submit,
        formRef,
        rangeMinLabel,
        rangeMaxLabel,
        checkInputBonus,
        deleteCond,
        reLoadCondList,
      };
    },
  });
</script>
<style lang="scss" scoped>
  ::v-deep(.ant-form-item) {
    margin: 0;
    margin-bottom: 0;
  }
</style>
