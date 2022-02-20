<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="launchedTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增优惠</a-button>
      </template>
      <template #form-startTime="{ field, values }">
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

      <template #form-endTime="{ field, values }">
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
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: record.display === 1 ? '隐藏' : '显示',
              onClick: () => handleDisplay(record),
            },
          ]"
          :dropDownActions="[
            { label: '编辑', onClick: () => handleEdit(record) },
            // { label: '删除', onClick: () => message.info('功能尚未开放') },
            { label: '操作记录', onClick: () => message.info('功能尚未开放') },
          ]"
        />
      </template>
      <template #type="{ record }">
        <p
          style="margin: 0"
          v-for="(item, index) in record.type.split(',')"
          :key="'type_' + index"
        >
          {{ filterType(item) }}
        </p>
      </template>
      <!-- <template #device="{ record }">
        <p
          style="margin: 0"
          v-for="(item, index) in record.device.split(',')"
          :key="'device_' + index"
        >
          {{ filterDevice(item) }}
        </p>
      </template> -->
      <template #imageWeb="{ record }">
        <div
          class="flex items-center justify-center overflow-hidden rounded"
          style="width: 100px; height: 100px"
        >
          <Image
            v-if="record.imageWeb"
            style="width: 100%; border-radius: 4px"
            :src="imagePath + record.imageWeb"
            :fallback="errorImg"
          />
          <span v-else>--</span>
        </div>
      </template>

      <template #imageH5="{ record }">
        <div
          class="flex items-center justify-center overflow-hidden"
          style="width: 100px; height: 100px"
        >
          <Image
            v-if="record.imageH5"
            style="width: 100%; border-radius: 4px"
            :src="imagePath + record.imageH5"
            :fallback="errorImg"
          />
          <span v-else>--</span>
        </div>
      </template>
      <template #promotions="{ record }">
        <p v-for="item in record.promotions" :key="item.id">
          <a :href="`/promotion/list?name=${item.name}`" target="_blank">{{ item.name }}</a>
        </p>
      </template>
    </BasicTable>
    <PromotionModal @register="promotionModalRegister" :dropdownRes="promotionDropdownRes" @success="reload"/>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { message, Image } from 'ant-design-vue';
  import { DatePicker, TimePicker } from 'ant-design-vue';

  import { PageWrapper } from '/@/components/Page';
  import { tableColumns } from './components/tableData';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { searchSchemas } from './components/searchSchemas';
  import type { FormProps } from '/@/components/Form';
  import { getLaunchedList, updateLaunched } from '/@/api/promotion/launchedList';
  import { getPromotionDropdown } from '/@/api/promotion/list';
  import { useGlobSetting } from '/@/hooks/setting';
  import type { DropdownItem } from '/@/api/promotion/model/listModel';
  import moment from 'moment';
  import PromotionModal from './components/PromotionModal.vue';
  import { useModal } from '/@/components/Modal';

  const promotionDropdownRes = reactive({
    status: [] as DropdownItem[],
    device: [] as DropdownItem[],
    display: [] as DropdownItem[],
    launchedType: [] as DropdownItem[],
    openWay: [] as DropdownItem[],
  });
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
    if (field === 'startTime' && !fieldValue && value.set && value.format) {
      str = value.set('hour', 0).set('minute', 0).set('second', 0).format('YYYY-MM-DD HH:mm:ss');
    } else if (field === 'endTime' && !fieldValue && value.set && value.format) {
      str = value.set('hour', 23).set('minute', 59).set('second', 59).format('YYYY-MM-DD HH:mm:ss');
    } else if (value.format) {
      str = value.format('YYYY-MM-DD HH:mm:ss');
    } else {
      str = value.toString();
    }
    getForm().setFieldsValue({ [`${field}`]: str });
  };
  const imagePath = useGlobSetting().apiUrl + '/file/';
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
  const fetchDropdownData = async () => {
    const dropdownRes = await getPromotionDropdown();
    // 线路名称
    promotionDropdownRes.status = dropdownRes.status || [];
    promotionDropdownRes.device = dropdownRes.device || [];
    promotionDropdownRes.display = dropdownRes.display || [];
    promotionDropdownRes.launchedType = dropdownRes.promotionLaunchedType || [];
    promotionDropdownRes.openWay = dropdownRes.openWay || [];
  };
  // const filterDevice = (key: string) => {
  //   const re = promotionDropdownRes.device.filter((item) => key === Object.keys(item)[0]);
  //   return Object.values(re)[0][key];
  // };
  const filterType = (key: string) => {
    const re = promotionDropdownRes.launchedType.filter((item) => key === Object.keys(item)[0]);
    return Object.values(re)[0][key];
  };
  const fetchData = async (obj: any) => {
    const query = removeEmptyQuery(Object.assign({}, obj));
    const data = await getLaunchedList(query);
    await fetchDropdownData();
    return data.list || [];
  };
  // Form config
  const formConfig = computed<FormProps>(() => {
    const { status, device, display } = promotionDropdownRes;
    return {
      labelWidth: 100,
      autoAdvancedLine: 1,
      autoSubmitOnEnter: true,
      showResetButton: false,
      schemas: searchSchemas(status, device, display),
    };
  });
  const [launchedTable, { getForm, reload }] = useTable({
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

  const [promotionModalRegister, { openModal: openPromotionModal }] = useModal();
  const handleCreate = () => {
    openPromotionModal(true, {
      promotionDropdownRes,
      mode: 'Create',
    })
  };
  const handleEdit = (record) => {
    openPromotionModal(true, {
      promotionDropdownRes,
      mode: 'Edit',
      record: transformRecord(record),
    })
  };
  const transformRecord = (record) => {
    return {
      ID: record.ID,
      content: record.content,
      device: record.device.split(',').map((item) => Number(item)),
      display: record.display,
      endTime: record.endTime,
      imageH5: record.imageH5,
      imageWeb: record.imageWeb,
      name: record.name,
      openLink: record.openLink,
      openWay: record.openWay,
      orderNo: record.orderNo,
      promotions: record.promotions.map(item=>item.ID),
      startTime: record.startTime,
      top: record.top,
      type: record.type.split(',').map((item) => Number(item)),
    };
  }

  const handleDisplay = (record) => {
    let payload = transformRecord(record);
    payload.display = payload.display === 1 ? 2 : 1;
    updateLaunched(payload).then(() => {
      message.success('更新成功');
      reload();
    });
  }

  const errorImg =
    'data:image/png;base64,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';
</script>
