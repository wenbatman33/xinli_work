<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable size="small" @register="promotionTable">
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
      <template #name="{ record }">
        <a @click="handleShowRowData(record)">{{ record.name }}</a>
      </template>
      <template #promotionCondTypes="{ record }">
        <p v-for="item in record.promotionCondTypes" :key="item.id" style="margin: 0">
          {{ promotionCondTypesList[item] }}
        </p>
      </template>
      <template #status="{ record }">
        <span v-if="record.status === 1" style="color: #01a29d">启用</span>
        <span v-if="record.status === 2" style="color: #979797">停用</span>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[{ label: record.status === 1 ? '停用':'启用', onClick: () => handleStatus(record) },]"
          :dropDownActions="[
            { label: '优惠设定', onClick: () => handleEdit(record) },
            { label: '模板设定', onClick: () => handleEditCon(record) },
            { label: '批次派发', onClick: () => openWindow(`/promotion/batch?promotionID=${record.ID}`) },
            { label: '申请清单', onClick: () => openWindow(`/promotion/apply?promotionID=${record.ID}`) },
            // { label: '上架设定', onClick: () => message.info('功能尚未开放') },
            { label: '删除', onClick: () => handleDelete(record) },
            { label: '操作记录', onClick: () => handleLog(record) },
          ]"
        />
      </template>
    </BasicTable>
    <PromotionModal
      :dropdownData="promotionDropdownRes"
      @register="editPromotionModal"
      @success="handleSuccess"
    />
    <CondModal
      :dropdownData="promotionDropdownRes"
      :gameGroupsList="state.gameGroupsList"
      @register="editCondModal"
      @success="handleSuccess"
    />
    <LogModal @register="logModalRegister"></LogModal>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, reactive, onMounted, createVNode, toRaw } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import { message, Modal } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { tableColumns } from './components/tableData';
  import { DatePicker, TimePicker } from 'ant-design-vue';
  import { searchSchemas } from './components/searchSchemas';
  // import { getGameGroups } from '/@/api/game/gamegroup';
  import { getGameGroupByGameType } from '/@/api/game/gamegroup';
  import { getTagGroup } from '/@/api/tag/tag';
  import { getChannelDropdown } from '/@/api/payment/payChannelService';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getPromotionList, getPromotionDropdown, deletePromotion, putPromotion } from '/@/api/promotion/list';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

  import type { FormProps } from '/@/components/Form';
  import type { EditRecordRow } from '/@/components/Table';
  import type { GetGameGroupRes } from '/@/api/game/model/gameModel';
  import type { DropdownItem } from '/@/api/promotion/model/listModel';

  import PromotionModal from './components/PromotionModal.vue';
  import CondModal from './components/CondModal.vue';
  import OtpModal from '/@/views/common/otp/otpModal.vue';
  import moment from 'moment';
  import { openWindow } from '/@/utils';
import LogModal from './components/LogModal.vue';

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
  const state = reactive({
    gameGroupsList: [] as GetGameGroupRes[],
  });
  const promotionDropdownRes = reactive({
    status: [] as DropdownItem[],
    promotionCondType: [] as DropdownItem[],
    cycleType: [] as DropdownItem[],
    way: [] as DropdownItem[],
    approveCycle: [] as DropdownItem[],
    device: [] as DropdownItem[],
    serviceCode: [] as unknown[],
    tags: [] as unknown[],
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
  const promotionCondTypesList = {
    1: '存款模板',
    2: '流水模板',
    3: '投注模板',
    5: '负营利模版',
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

  const fetchDropdownData = async () => {
    const dropdownRes = await getPromotionDropdown();
    const res = await getChannelDropdown();
    // 线路名称
    promotionDropdownRes.status = dropdownRes.status || [];
    promotionDropdownRes.promotionCondType = dropdownRes.promotionCondType || [];
    promotionDropdownRes.cycleType = dropdownRes.cycleType || [];
    promotionDropdownRes.way = dropdownRes.way || [];
    promotionDropdownRes.approveCycle = dropdownRes.approveCycle || [];
    promotionDropdownRes.device = dropdownRes.device || [];
    promotionDropdownRes.serviceCode = res.serviceCode || [];
  };
  const fetchData = async (obj: any) => {
    const query = removeEmptyQuery(Object.assign({}, route.query, obj));

    let data;
    if (JSON.stringify(route.query) !== JSON.stringify(query)) {
      delete query.ID;
      router.push({ query: query });
    } else {
      data = await getPromotionList(query);
      await fetchDropdownData();
      const tags = await getTagGroup();
      promotionDropdownRes.tags = tags.list;
    }
    return data.list || [];
  };
  const [editPromotionModal, { openModal: openPromotionModal }] = useModal();
  const [editCondModal, { openModal: openCondModal }] = useModal();
  const [logModalRegister, { openModal: openLogModal }] = useModal();
  
  // 重整资料
  const handleSuccess = () => reload();
  const handleCreate = () => openPromotionModal(true, { mode: 'Create' });
  const handleEdit = (record: EditRecordRow) => openPromotionModal(true, { record, mode: 'Edit' });
  const handleShowRowData = (record: EditRecordRow) =>
    openPromotionModal(true, { record, mode: 'ShowRowData' });
  const handleEditCon = (record: EditRecordRow) => openCondModal(true, { record });
  const handleDelete = async (record: EditRecordRow) => {
    showConfirm(record);
  };
  const showConfirm = (record: EditRecordRow) => {
    Modal.confirm({
      title: '确认删除?',
      icon: createVNode(ExclamationCircleOutlined),
      onOk() {
        openOTP(true, { record, mode: 'Delete' });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const handleStatus = (record: EditRecordRow) => {
    openOTP(true, { record: toRaw(record), mode: 'Status' });
  };

  const handleLog = (record: EditRecordRow) => {
    openLogModal(true, { record });
  };

  const otpSuccess = (callback: any) => {
    const mode = callback.payload.mode;
    const record = JSON.parse(JSON.stringify(callback.payload.record));
    if (mode === 'Delete'){
      deletePromotion({ ID: record.ID }).then(() => {
        message.success('删除成功');
        reload();
      });
    }else if (mode === 'Status'){
      record.status = record.status === 1 ? 2 : 1;
      putPromotion(record).then((res:any) => {
        if (res.success === true){
          message.success('操作成功');
          reload();
        }
      });
    }   
  };
  // Form config
  const formConfig = computed<FormProps>(() => {
    const { status, promotionCondType } = promotionDropdownRes;
    return {
      labelWidth: 90,
      autoAdvancedLine: 1,
      autoSubmitOnEnter: true,
      showResetButton: false,
      schemas: searchSchemas(status, promotionCondType),
    };
  });
  const [promotionTable, { getForm, reload }] = useTable({
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
  const getGameGroupsList = async () => {
    // const response = await getGameGroups();
    const response = await getGameGroupByGameType();
    state.gameGroupsList = response.list;
  };
  onMounted(() => {
    if (route.query) {
      getForm().setFieldsValue({
        ID: route?.query?.ID,
        name: route?.query?.name,
        promotionCondType: route?.query?.promotionCondType,
        status: route?.query?.status,
        startTime: route?.query?.startTime,
        endTime: route?.query?.endTime,
        field: route?.query?.field,
        order: route?.query?.order,
      });
    }
    getGameGroupsList();
  });
</script>
