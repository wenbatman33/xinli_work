<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="batchTable">
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
      <template #promotionName="{ record }">
        <a @click="router.push({ path: '/promotion/list', query: { ID: record.ID } })">{{
          record.promotionName
        }}</a>
      </template>
      <template #memberNumber="{ record }">
        <div v-if="record.memberNumber">
          <span style="color: #3bb5b1">{{ record.memberNumber }}</span>
          <span> / </span>
          <span style="color: #f66154">{{ record.memberFailNumber }}</span>
        </div>
      </template>
      <!-- <template #action="{ record }"> -->
      <template #action="{ record }">
        <TableAction
          :actions="[{ label: '领取列表', onClick: () => openWindow(`/promotion/apply?promotionID=${record.promotionID}`) }]"
          :dropDownActions="[{ label: '派发纪录', onClick: () => message.info('功能尚未开放') }]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { DatePicker, TimePicker } from 'ant-design-vue';
  import { useRoute, useRouter } from 'vue-router';

  import { PageWrapper } from '/@/components/Page';
  import { tableColumns } from './components/tableData';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { searchSchemas } from './components/searchSchemas';
  import type { FormProps } from '/@/components/Form';
  import { getPromotionmMember } from '/@/api/promotion/member';
  import { openWindow } from '/@/utils';
  import moment from 'moment';

  const route = useRoute();
  const router = useRouter();

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
  const fetchData = async (obj: any) => {
    const query = removeEmptyQuery(Object.assign({}, obj));
    const data = await getPromotionmMember(query);
    return data.list || [];
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
  const [batchTable, { getForm }] = useTable({
    api: fetchData,
    columns: tableColumns,
    formConfig: formConfig,
    showIndexColumn: false,
    useSearchForm: true,
    showTableSetting: true,
    pagination: false,
    bordered: true,
    actionColumn: {
      width: 120,
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
