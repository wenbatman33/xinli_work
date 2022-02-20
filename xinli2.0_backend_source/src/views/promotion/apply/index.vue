<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="appleTable">
      <template #toolbar>
        <div class="flex items-center justify-end">
          <span class="mx-2">派发总金额:{{ state.totalAmount }} </span>
          <span class="mx-2">派发总数量:{{ state.count }}</span>
        </div>
      </template>
      <template #form-sendAtStart="{ field, values }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[field])"
            @update:value="setPromotinTime(field, $event)"
            @clear="console.log('clear')"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[field])"
            @update:value="setPromotinTime(field, $event)"
            @clear="console.log('clear')"
          />
        </div>
      </template>

      <template #form-sendAtEnd="{ field, values }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[field])"
            @update:value="setPromotinTime(field, $event)"
            @clear="console.log('clear')"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[field])"
            @update:value="setPromotinTime(field, $event)"
            @clear="console.log('clear')"
          />
        </div>
      </template>
      <template #memberAccount="{ record }">
        <a :href="'/memberDetail/detail/' + record.memberID" @click.prevent="openWindow(`/memberDetail/detail/${record.memberID}`)">{{ record.memberAccount }}</a>
      </template>
      <template #status="{ record }">
        <span :style="promotionStatusColors[record.status]">
          {{ filterPromotionStatus(record.status) }}</span
        >
      </template>
      <template #promotionCondType="{ record }">
        <span>{{ filterPromotionCondType(record.promotionCondTypes) }}</span>
      </template>
      <template #batchCycle="{ record }">
        <span>{{ filterBatchCycleStatus(record.batchCycle) }}</span>
      </template>
      <template #promotionName="{ record }">
        <a @click="router.push({ path: '/promotion/list', query: { ID: record.promotionID } })">{{
          record.promotionName
        }}</a>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            { label: '操作记录', onClick: () => message.info('功能尚未开放') },
            {
              label: '查看优惠内容',
              onClick: () => router.push({ path: '/promotion/list', query: { ID: record.promotionID } }),
            },
            { label: '审核内容', onClick: () => openVerifyModal(true, {record}) },
          ]"
        />
      </template>
    </BasicTable>
    <VerifyContentModal @register="verifyModalRegister" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, reactive, onMounted } from 'vue';
  import { message, DatePicker, TimePicker } from 'ant-design-vue';
  import { useRoute, useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { tableColumns } from './components/tableData';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { searchSchemas } from './components/searchSchemas';
  import type { FormProps } from '/@/components/Form';
  import { getPromotionmMemberList } from '/@/api/promotion/member';
  import type { DropdownItem } from '/@/api/promotion/model/listModel';

  import { getPromotionDropdown } from '/@/api/promotion/list';

  import moment from 'moment';
  import { openWindow } from '/@/utils';
  import { useModal } from '/@/components/Modal';
  import VerifyContentModal from './components/VerifyContentModal.vue';

  const route = useRoute();
  const router = useRouter();
  const [verifyModalRegister, { openModal: openVerifyModal }] = useModal();
  
  const removeEmptyQuery = (queryObject: any) => {
    const query = queryObject;
    Object.keys(query).forEach((key) => {
      if (query[key] === undefined || query[key] === '') {
        delete query[key];
      } else {
        query[key] = String(query[key]);
      }
    });
    return query;
  };
  const state = reactive({
    totalAmount: 0,
    count: 0,
  });
  const promotionDropdownRes = reactive({
    promotionStatus: [] as DropdownItem[],
    promotionCondType: [] as DropdownItem[],
    cycleType: [] as DropdownItem[],
  });
  const fetchDropdownData = async () => {
    const dropdownRes = await getPromotionDropdown();
    // 线路名称
    promotionDropdownRes.promotionStatus = dropdownRes.promotionStatus || [];
    promotionDropdownRes.promotionCondType = dropdownRes.promotionCondType || [];
    promotionDropdownRes.cycleType = dropdownRes.cycleType || [];
  };
  const fetchData = async (obj: any) => {
    const query = removeEmptyQuery(Object.assign({}, obj));
    const data = await getPromotionmMemberList(query);
    state.totalAmount = data.totalAmount;
    state.count = data.count;
    await fetchDropdownData();
    return data.list || [];
  };
  const promotionStatusColors = {
    1: { color: '#ffa26b' },
    2: { color: '#F0453A' },
    3: { color: '#01A39D' },
    4: { color: '#404244' },
    5: { color: '#D0C9D6' },
    6: { color: '#D0C9D6' },
    7: { color: '#D0C9D6' },
  };

  const filterPromotionStatus = (status: string) => {
    const result = promotionDropdownRes.promotionStatus.filter((item) => {
      return Object.keys(item)[0] === String(status);
    })[0];
    return Object.values(result)[0];
  };
  const filterPromotionCondType = (status) => {
    const allStatus:number[] = Object.values(status);
    let result: string[] = [];
    allStatus.forEach((item) => {
      promotionDropdownRes.promotionCondType.forEach((types) => {
        if(Object.keys(types)[0] === String(item)){
          result.push(Object.values(types)[0]);
        }
      });
    });
    return result.toString().replaceAll(',', ' | ');
  };
  const filterBatchCycleStatus = (status: string) => {
    const result = promotionDropdownRes.cycleType.find((item) => {
      return Object.keys(item)[0] === String(status);
    });
    return result ? Object.values(result)[0] : '';
  };

  // Convert string to moment
  const convertMoment = (str?: string) => {
    if (str === '') {
      return undefined;
    }
    if (str === undefined) {
      return undefined;
    }
    try {
      return moment(str);
    } catch (e) {
      return undefined;
    }
  };

  const setPromotinTime = (field: string, value: any) => {
    if (!value) {
      getForm().setFieldsValue({ [`${field}`]: undefined });
      return;
    }
    let str;
    const fieldValue = getForm().getFieldsValue()[field];
    if (field === 'sendAtStart' && !fieldValue && value.set && value.format) {
      str = value.set('hour', 0).set('minute', 0).set('second', 0).format('YYYY-MM-DD HH:mm:ss');
    } else if (field === 'sendAtEnd' && !fieldValue && value.set && value.format) {
      str = value.set('hour', 23).set('minute', 59).set('second', 59).format('YYYY-MM-DD HH:mm:ss');
    } else if (value.format) {
      str = value.format('YYYY-MM-DD HH:mm:ss');
    } else {
      str = value.toString();
    }
    getForm().setFieldsValue({ [`${field}`]: str });
  };
  // Form config
  const formConfig = computed<FormProps>(() => {
    return {
      labelWidth: 100,
      autoAdvancedLine: 1,
      autoSubmitOnEnter: true,
      showResetButton: false,
      schemas: searchSchemas(),
    };
  });
  const [appleTable, { getForm }] = useTable({
    api: fetchData,
    columns: tableColumns,
    formConfig: formConfig,
    showIndexColumn: false,
    useSearchForm: true,
    showTableSetting: true,
    pagination: false,
    bordered: true,
    actionColumn: {
      width: 220,
      title: '操作',
      dataIndex: 'action',
      slots: {
        customRender: 'action',
      },
    },
  });

  onMounted(() => {
    if (route.query) {
      getForm().setFieldsValue({
        promotionID: route?.query?.promotionID,
      });
    }
  });
</script>
