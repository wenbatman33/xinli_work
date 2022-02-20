<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="reportTable">
      <template #toolbar>
        <div class="flex items-center justify-end">
          <a-button v-if="total.xlsxData.length > 0" type="primary" @click="exportXlsx"
            >汇出</a-button
          >
          <span class="mx-2">数量:{{ total.count }} </span>
          <span class="mx-2">( 收入:{{ total.countIn }} </span>
          <span class="mx-2"> 支出:{{ total.countOut }} )</span>
        </div>
      </template>

      <template #form-date="{ values, schema }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.logTimeStart])"
            @update:value="setFieldValue(schema.componentProps.logTimeStart, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.logTimeStart])"
            @update:value="setFieldValue(schema.componentProps.logTimeStart, $event)"
          />
          <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.logTimeEnd])"
            @update:value="setFieldValue(schema.componentProps.logTimeEnd, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.logTimeEnd])"
            @update:value="setFieldValue(schema.componentProps.logTimeEnd, $event)"
          />
        </div>
      </template>

      <template #subjectID="{ record }">
        <p>{{ filterSubject(record.subjectID) }}</p>
      </template>

      <template #note="{ record }">
        <div class="flex justify-between truncate">
          <div class="flex justify-center flex-grow truncate">{{ record.note }}</div>
          <Icon
            icon="ant-design:edit-outlined"
            class="flex flex-shrink-0 cursor-pointer"
            @click="handleEditNote(record)"
          />
        </div>
      </template>

      <!-- <template #footer>
        <div class="flex w-full">
          <span class="text-center" style="width: 196px">合计 : </span>
          <span style="width: 102px"> </span>
          <span style="width: 102px"> </span>
          <span style="width: 102px"> </span>
          <span class="text-center truncate" style="width: 106px"> {{ total.totalFee }} </span>
        </div>
      </template> -->
    </BasicTable>
    <NoteModal @register="editNoteModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { DatePicker, TimePicker } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { tableColumns } from './components/tableData';
  import { BasicTable, useTable } from '/@/components/Table';
  // api
  import { searchSchemas } from './components/searchSchemas';
  import { getBankCardLog } from '/@/api/payment/payBankCard';
  import { useAppStore } from '/@/store/modules/app';
  import { jsonToSheetXlsx } from '/@/components/Excel';

  import type { FormProps } from '/@/components/Form';
  import NoteModal from './components/NoteModal.vue';
  import { getChannelDropdown } from '/@/api/payment/payChannelService';

  import moment from 'moment';

  const route = useRoute();
  const router = useRouter();

  const [editNoteModal, { openModal: openEditNoteModal }] = useModal();
  const appStore = useAppStore();
  const state = reactive({
    subjectList: [] as any[],
  });
  const total = reactive({
    count: 0,
    countIn: 0,
    countOut: 0,
    totalFee: 0,
    xlsxData: [] as any[],
  });

  const exportXlsx = () => {
    jsonToSheetXlsx({
      data: total.xlsxData,
      filename: '银行卡明细.xlsx',
      write2excelOpts: { bookType: 'xlsx' },
    });
  };
  const handleEditNote = (record) => {
    openEditNoteModal(true, { record });
  };
  const handleSuccess = () => {
    reload();
  };
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
  const fetchData = async (obj: any) => {
    const query = removeEmptyQuery(Object.assign({}, route.query, obj));
    let data;
    if (JSON.stringify(route.query) !== JSON.stringify(query)) {
      router.push({ query: query });
    } else {
      data = await getBankCardLog(query);
      const ChannelDropdown = await getChannelDropdown();
      state.subjectList = ChannelDropdown.subjects;
    }

    const totalFee = data.list.reduce((prev, next) => {
      prev += next.fee;
      return prev;
    }, 0);
    total.totalFee = totalFee;

    total.count = data.count;
    total.countIn = data.countIn;
    total.countOut = data.countOut;
    total.xlsxData = data.list;
    return data.list || [];
  };
  // Convert string to moment
  // Set field value
  const setFieldValue = (field: string, value: any) => {
    if (!value) {
      getForm().setFieldsValue({ [`${field}`]: undefined });
      return;
    }
    let str = moment(new Date(value)).format('YYYY-MM-DD HH:mm');

    getForm().setFieldsValue({ [`${field}`]: str });
  };

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

  // Form config
  const formConfig = computed<FormProps>(() => {
    return {
      labelWidth: 100,
      autoAdvancedLine: 1,
      autoSubmitOnEnter: true,
      schemas: searchSchemas,
    };
  });
  const handleSummary = (tableData: Recordable[]) => {
    const totalIn = tableData.reduce((prev, next) => {
      const IN = next.type === 1 ? next.amount : 0;
      prev += IN;
      return prev;
    }, 0);
    const totalOut = tableData.reduce((prev, next) => {
      const OUT = next.type === 2 ? next.amount : 0;
      prev += OUT;
      return prev;
    }, 0);
    return [
      {
        logTime: '合计 :',
        in: totalIn,
        out: totalOut,
        fee: total.totalFee,
      },
    ];
  };
  const [reportTable, { getForm, reload }] = useTable({
    api: fetchData,
    columns: tableColumns,
    formConfig: formConfig,
    showIndexColumn: false,
    useSearchForm: true,
    showTableSetting: true,
    pagination: false,
    bordered: true,
    showSummary: true,
    summaryFunc: handleSummary,
    scroll: { y: 400 },
  });
  const filterSubject = (id) => {
    const result = state.subjectList.filter((item) => item.subjectID == id)[0];
    return result ? result.name : '';
  };
  const init = () => {
    const defaultLogTimeStart = moment()
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .format('YYYY-MM-DD HH:mm');
    const defaultLogTimeEnd = moment()
      .set('hour', 23)
      .set('minute', 59)
      .set('second', 59)
      .format('YYYY-MM-DD HH:mm');

    if (route.query) {
      getForm().setFieldsValue({
        logTimeStart: route?.query?.logTimeStart || defaultLogTimeStart,
        logTimeEnd: route?.query?.logTimeEnd || defaultLogTimeEnd,
        cardNo: route?.query?.cardNo,
        field: route?.query?.field,
        order: route?.query?.order,
      });
    }
    // 进入报表页面 左侧选单缩到最小尺寸
    appStore.setProjectConfig({ menuSetting: { collapsed: true } });
  };
  onMounted(() => {
    init();
  });
</script>
