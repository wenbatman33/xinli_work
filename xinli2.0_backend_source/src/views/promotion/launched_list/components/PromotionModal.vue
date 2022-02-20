<template>
  <BasicModal
    :title="'优惠上架/新增'"
    width="1000px"
    @register="createBannerModal"
    @ok="handleConfirm"
    @cancel="handleReset"
  >
    <BasicForm @register="bannerCategoryForm">
      <template #imageH5>
        <div class="flex flex-row">
          <Upload
            accept="image/*"
            :fileList="[]"
            :beforeUpload="convertH5"
            :customRequest="uploadH5"
          >
            <a-button size="small" preIcon="ant-design:upload-outlined" type="primary" />
          </Upload>
          <div
            class="mx-2 thumb"
            :style="{
              background: `url(${state.imageH5File})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
            }"
          ></div>
        </div>
      </template>
      <template #imageWeb>
        <div class="flex flex-row">
          <Upload
            accept="image/*"
            :fileList="[]"
            :beforeUpload="convertWeb"
            :customRequest="uploadWeb"
          >
            <a-button size="small" preIcon="ant-design:upload-outlined" type="primary" />
          </Upload>
          <div
            class="mx-2 thumb"
            :style="{
              background: `url(${state.imageWebFile})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
            }"
          ></div>
        </div>
      </template>

      <template #localSearch="{ model, field }">
        <ApiSelect
          :api="getPromotionList"
          :params="{status: 1}"
          mode="multiple"
          showSearch
          v-model:value="model[field]"
          :filterOption="true"
          resultField="list"
          labelField="name"
          valueField="ID"
        />
      </template>

      <template #promotionStartTime="{ field, values }">
        <DatePicker :value="values[field]" format="YYYY/MM/DD" @update:value="setStartPromotionField" />
        <TimePicker :value="values[field]" format="HH:mm" @update:value="setStartPromotionField" />
      </template>

      <template #promotionEndTime="{ field, values }">
        <DatePicker :value="values[field]" format="YYYY/MM/DD" @update:value="setEndPromotionField" />
        <TimePicker :value="values[field]" format="HH:mm" @update:value="setEndPromotionField" />
      </template>

      <template #startTime="{ field, values }">
        <DatePicker :value="values[field]" format="YYYY/MM/DD" @update:value="setStarField" />
        <TimePicker :value="values[field]" format="HH:mm" @update:value="setStarField" />
      </template>

      <template #endTime="{ field, values }">
        <DatePicker :value="values[field]" format="YYYY/MM/DD" @update:value="setEndField" />
        <TimePicker :value="values[field]" format="HH:mm" @update:value="setEndField" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, reactive, h } from 'vue';
  import { message, DatePicker, TimePicker, Upload } from 'ant-design-vue';
  import { fileUpload } from '/@/api/upload';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { createLaunched, updateLaunched } from '/@/api/promotion/launchedList';
  import { getPromotionList } from '/@/api/promotion/list';
  import { useGlobSetting } from '/@/hooks/setting';
  import type { FormSchema } from '/@/components/Table';
  import { Tinymce } from '/@/components/Tinymce/index';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/image';

  const imagePath = useGlobSetting().apiUrl + '/file/';

  const emit = defineEmits(['success', 'register']);

  const props = defineProps({
    dropdownRes: Object,
  });
  
  const state = reactive({
    record: {},
    imageH5File: '',
    imageH5Url: '',
    imageWebFile: '',
    imageWebUrl: '',
  });
  const mode = ref<String>('');

  const currentID = ref(0);
  const titleRef = computed(() => {
    let string = '';
    if (mode.value === 'Create') {
      string = '新增公告';
    } else if (mode.value === 'Edit') {
      string = '编辑公告';
    }
    return string;
  });
  const setStartPromotionField = (data) => setFieldsValue({ promotionStartTime: data });
  const setEndPromotionField = (data) => setFieldsValue({ promotionEndTime: data });
  const setStarField = (data) => setFieldsValue({ startTime: data });
  const setEndField = (data) => setFieldsValue({ endTime: data });
  const convertH5 = (data) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = (e) => (state.imageH5File = (e.target?.result as string) || '');
  };
  const convertWeb = (data) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = (e) => (state.imageWebFile = (e.target?.result as string) || '');
  };
  const uploadH5 = async (data) => {
    const formData = new FormData();
    formData.append('type', 'banner');
    formData.append('file', data.file);
    fileUpload(formData);

    const res = await fileUpload(formData);
    state.imageH5Url = res.url;
    setFieldsValue({ imageH5: res.url });
  };
  const uploadWeb = async (data) => {
    const formData = new FormData();
    formData.append('type', 'banner');
    formData.append('file', data.file);

    const res = await fileUpload(formData);
    state.imageWebUrl = res.url;
    setFieldsValue({ imageWeb: res.url });
  };
  const promotionFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'name',
        label: '上架名称',
        component: 'Input',
        required: true,
        componentProps: { placeholder: '输入名称' },
        colProps: {
          span: 24,
        },
      },
      {
        field: 'type',
        label: '类型',
        required: true,
        component: 'CheckboxGroup',
        componentProps: {
          options: props.dropdownRes?.launchedType?.map(item=>{
            return {
              label: Object.values(item)[0],
              key: Number(Object.keys(item)[0]),
              value: Number(Object.keys(item)[0]),
            }
          }),
        },
        colProps: {
          span: 24,
        },
      },
      {
        field: 'orderNo',
        label: '排序',
        required: true,
        defaultValue: 999,
        component: 'InputNumber',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'top',
        label: '置顶',
        required: true,
        defaultValue: 2,
        component: 'Switch',
        componentProps: {
          checkedValue: 1,
          unCheckedValue: 2,
        },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'display',
        label: '是否顯示',
        required: true,
        defaultValue: 1,
        component: 'Switch',
        componentProps: {
          checkedValue: 1,
          unCheckedValue: 2,
        },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'imageWeb',
        label: 'web 图',
        component: 'Input',
        slot: 'imageWeb',
        colProps: {
          span: 12,
        },
      },
      {
        field: 'imageH5',
        label: 'h5 图',
        component: 'Input',
        slot: 'imageH5',
        colProps: {
          span: 12,
        },
      },
      {
        field: 'openWay',
        label: '开启方式',
        component: 'Select',
        defaultValue: 1,
        required: true,
        componentProps: {
          options: props.dropdownRes?.openWay?.map(item=>{
            return {
              label: Object.values(item)[0],
              key: Number(Object.keys(item)[0]),
              value: Number(Object.keys(item)[0]),
            }
          }),
          onChange: (value) => {
            if (value === 2 || value === 3) {
              updateSchema([
                {field: 'openLink', show: true, required: true, },
              ]);
            }else if (value === 1) {
              updateSchema([
                {field: 'openLink', show: false, required: false, },
              ]);
              setFieldsValue({ openLink: '' });
            }
          },
        },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'openLink',
        label: '连结网址',
        component: 'Input',
        show: false,
        componentProps: { placeholder: '输入连结网址' },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'promotions',
        label: '关连优惠',
        component: 'Input',
        required: true,
        componentProps: { placeholder: '输入名称' },
        slot: 'localSearch',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'device',
        label: '上架平台',
        component: 'CheckboxGroup',
        defaultValue: [1,2,3,4],
        componentProps: {
          options: props.dropdownRes?.device?.splice(1, 100).map(item=>{
            return {
              label: Object.values(item)[0],
              key: Number(Object.keys(item)[0]),
              value: Number(Object.keys(item)[0]),
            }
          }),
        },
        colProps: {
          span: 24,
        },
      },
      {
        field: 'startTime',
        label: '上架时间',
        required: true,
        component: 'DatePicker',
        slot: 'startTime',
        colProps: {
          span: 12,
        },
      },
      {
        field: 'endTime',
        label: '下架时间',
        component: 'DatePicker',
        slot: 'endTime',
        colProps: {
          span: 12,
        },
      },
      {
        field: 'promotionStartTime',
        label: '活动开始时间',
        required: true,
        component: 'DatePicker',
        slot: 'promotionStartTime',
        colProps: {
          span: 12,
        },
      },
      {
        field: 'promotionEndTime',
        label: '活动结束时间',
        component: 'DatePicker',
        slot: 'promotionEndTime',
        colProps: {
          span: 12,
        },
      },
      {
        field: 'content',
        component: 'Input',
        label: '內容',
        defaultValue: 'defaultValue',
        rules: [{ required: true }],
        render: ({ model, field }) => {
          return h(Tinymce, {
            value: model[field],
            showImageUpload: false,
            options: {
              menubar: false,
              toolbar:
                'redo undo | table | a11ycheck | formatselect bold forecolor backcolor | bullist numlist | link | removeformat',
              plugins: ['table'],
            },
            // plugins: 'table',
            onChange: (value: string) => {
              model[field] = value;
            },
          });
        },
      },
    ];
  });

  const [bannerCategoryForm, { updateSchema, setFieldsValue, resetFields, validate, setProps }] = useForm({
    labelWidth: 100,
    schemas: promotionFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const [createBannerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    console.log(data.record)
    mode.value = data.mode;
    state.imageH5File = data.record ? imagePath + data.record.imageH5 : '';
    state.imageWebFile = data.record ? imagePath + data.record.imageWeb : '';
    currentID.value = data?.record?.ID;
    if (mode.value === 'Edit') {
      setFieldsValue({ ...data.record });
      setProps({ disabled: false });
      setModalProps({ okText: '确定修改' });
    } else if (mode.value === 'Create') {
      setProps({ disabled: false });
      setModalProps({ okText: '确定新增' });
    }
  });
  const createSubmit = async () => {
    try {
      const payload = await validate();
      const result = await createLaunched(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  const editSubmit = async () => {
    try {
      const payload = await validate();
      payload.ID = currentID.value;
      const result = await updateLaunched(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };

  const handleConfirm = () => {
    if (mode.value === 'Create') {
      createSubmit();
    } else if (mode.value === 'Edit') {
      editSubmit();
    }
  };

  const ResError = () => {
    mode.value === 'Edit' ? message.error(`编辑优惠失败`) : message.error(`新增优惠失败`);
    handleModalClose();
  };
  const ResSuccess = () => {
    mode.value === 'Edit' ? message.success(`编辑优惠成功`) : message.success(`新增优惠成功`);
    handleModalClose();
  };
  const handleModalClose = () => {
    emit('success');
    currentID.value = 0;
    state.imageH5File = '';
    state.imageWebFile = '';
    closeModal();
  };
  const handleReset = () => {
    currentID.value = 0;
    state.imageH5File = '';
    state.imageWebFile = '';
    resetFields();
  };
</script>
<style lang="scss" scoped>
  .thumb {
    height: 80px;
    width: 200px;
  }
</style>
