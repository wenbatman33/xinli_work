<template>
  <BasicModal
    :title="titleRef"
    width="900px"
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
      <template #start="{ field, values }">
        <DatePicker :value="values[field]" format="YYYY/MM/DD" @update:value="setStarField" />
        <TimePicker :value="values[field]" format="HH:mm" @update:value="setStarField" />
      </template>

      <template #end="{ field, values }">
        <DatePicker :value="values[field]" format="YYYY/MM/DD" @update:value="setEndField" />
        <TimePicker :value="values[field]" format="HH:mm" @update:value="setEndField" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { message, Upload, DatePicker, TimePicker } from 'ant-design-vue';
  import { ref, computed, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { fileUpload } from '/@/api/upload';
  import { createBanner, putBanner } from '/@/api/operator/banner';
  import { useGlobSetting } from '/@/hooks/setting';
  import type { FormSchema } from '/@/components/Table';
  import type { BannerCategoryItem } from '/@/api/operator/model/bannerModel';
  import type { DropdownItem } from '/@/api/promotion/model/listModel';
  import deeplinkType from './deeplinkType';

  const imagePath = useGlobSetting().apiUrl + '/file/';

  const props = defineProps({
    allCategory: Array as PropType<Array<BannerCategoryItem>> | [],
    dropdown: Array as PropType<Array<DropdownItem>> | [],
  });

  const emit = defineEmits(['success', 'register']);
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
      string = '新增广告';
    } else if (mode.value === 'Edit') {
      string = '编辑广告';
    }
    return string;
  });

  const setStarField = (data) => setFieldsValue({ start: data });
  const setEndField = (data) => setFieldsValue({ end: data });
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
  const bannerCategoryFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'title',
        label: '标题',
        component: 'Input',
        required: true,
        componentProps: { placeholder: '请输入广告标题' },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'bannerCategoryID',
        label: '广告分类',
        component: 'Select',
        required: true,
        componentProps: {
          placeholder: '请输入广告分类',
          options:
            props.allCategory?.map((element) => {
              return {
                label: String(element.name),
                value: String(element.bannerCategoryID),
                key: String(element.bannerCategoryID),
              };
            }) || [],
        },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'description',
        label: '广告说明',
        component: 'Input',
        required: true,
        componentProps: { placeholder: '请输入广告说明' },
        colProps: {
          span: 24,
        },
      },
      {
        field: 'sort',
        label: '排序',
        component: 'InputNumber',
        componentProps: { placeholder: '请输入排序' },
        colProps: {
          span: 12,
        },
      },
      {
        field: 'hidden',
        label: '是否隐藏',
        defaultValue: false,
        required: true,
        component: 'Switch',
        colProps: {
          span: 12,
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
        field: 'device',
        label: '上架平台',
        component: 'CheckboxGroup',
        defaultValue: [1,2,3,4],
        componentProps: {
          options:
            props.dropdown?.splice(1, 100).map((item) => {
              return {
                label: Object.values(item)[0],
                value: Number(Object.keys(item)[0]),
                key: Number(Object.keys(item)[0]),
              };
            }) || [],
        },
        colProps: {
          span: 24,
        },
      },
      {
        field: 'start',
        label: '上架时间',
        required: true,
        component: 'DatePicker',
        slot: 'start',
        colProps: {
          span: 12,
        },
      },
      {
        field: 'end',
        label: '下架时间',
        component: 'DatePicker',
        slot: 'end',
        colProps: {
          span: 12,
        },
      },
      {
        field: 'deeplinkType',
        label: '开启方式',
        component: 'Select',
        required: true,
        componentProps: {
          placeholder: '请输入开启方式',
          options:[
            {
              label: '无',
              value: 0,
              key: 0,
            },
            {
              label: '产品内',
              value: 1,
              key: 1,
            },
            {
              label: '产品内网页',
              value: 2,
              key: 2,
            },
            {
              label: '另开视窗',
              value: 3,
              key: 3,
            },
          ],
          onChange: (value) => {
            if (value === 2 || value === 3) {
              updateSchema([
                {field: 'deeplinkPage', show: false },
                {field: 'deeplinkID', show: true, componentProps: { placeholder: '请输入网址' }},
              ]);
            }else if (value === 1) {
              updateSchema([
                {field: 'deeplinkPage', show: true },
                {field: 'deeplinkID', show: false, componentProps: { placeholder: '请输入id' }},
              ]);
            }else{
              updateSchema([
                {field: 'deeplinkPage', show: false },
                {field: 'deeplinkID', show: false} ,
              ]);
            }
          },
        },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'deeplinkPage',
        component: 'Select',
        componentProps: {
          placeholder: '请输入开启页面',
          options: deeplinkType || [],
          onChange: (value) => {
            updateSchema({field: 'deeplinkID', show: value.includes('?id='), componentProps: { placeholder: '请输入id' }});
          },
        },
        colProps: {
          span: 6,
        },
        show: false,
      },
      {
        field: 'deeplinkID',
        component: 'Input',
        colProps: {
          span: 6,
        },
        show: false,
      },
      {
        field: 'context',
        label: '内容',
        component: 'Input',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'note',
        label: '备注',
        component: 'Input',
        colProps: {
          span: 24,
        },
      },
    ];
  });

  const [bannerCategoryForm, { updateSchema, setFieldsValue, resetFields, validate, setProps }] = useForm({
    labelWidth: 80,
    schemas: bannerCategoryFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const [createBannerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    mode.value = data.mode;
    state.imageH5File = data.record ? imagePath + data.record.imageH5 : '';
    state.imageWebFile = data.record ? imagePath + data.record.imageWeb : '';
    currentID.value = data?.record?.id;
    if (mode.value === 'Edit') {
      deeplinkColumn(data.record);
      setFieldsValue({ ...data.record });
      setProps({ disabled: false });
      setModalProps({ okText: '确定修改' });
    } else if (mode.value === 'Create') {
      setProps({ disabled: false });
      setModalProps({ okText: '确定新增' });
    }
  });
  const createSubmit = async () => {
    console.log('createSubmit');
    try {
      const payload = await validate();
      transformDeeplink(payload);
      const result = await createBanner(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };

  const transformDeeplink = (payload)=>{
    if (payload.deeplinkType === 1 && payload.deeplinkPage.includes('?id=')) {
      payload.deeplinkID = payload.deeplinkPage + payload.deeplinkID;
    }else if (payload.deeplinkType === 2) {
      payload.deeplinkID = 'xinli://inapp/?id=' + payload.deeplinkID;
    }else if (payload.deeplinkType === 3) {
      payload.deeplinkID = 'xinli://outapp/?id=' + payload.deeplinkID;
    }else{
      payload.deeplinkID = payload.deeplinkPage;
    }
  }
  const editSubmit = async () => {
    try {
      const payload = await validate();
      transformDeeplink(payload);
      payload.id = currentID.value;
      const result = await putBanner(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };

  const deeplinkColumn = (data) => {
    if (data.deeplinkType === 1) {
      updateSchema([
        {field: 'deeplinkPage', show: true },
        {field: 'deeplinkID', show: data.deeplinkPage.includes('?id='), componentProps: { placeholder: '请输入id' }},
      ]);
      data.deeplinkID = data.deeplinkID.split('?id=')[1];
    }else if (data.deeplinkType === 2 || data.deeplinkPage === 3){
      updateSchema([
        {field: 'deeplinkPage', show: false },
        {field: 'deeplinkID', show: true, componentProps: { placeholder: '请输入网址' }},
      ]);
      data.deeplinkID = data.deeplinkID.split('app/?id=')[1];
    }else{
      updateSchema([
        {field: 'deeplinkPage', show: false },
        {field: 'deeplinkID', show: false} ,
      ]);
    }
  }

  const handleConfirm = () => {
    if (mode.value === 'Create') {
      createSubmit();
    } else if (mode.value === 'Edit') {
      editSubmit();
    } else if (mode.value === 'ShowRowData') {
      mode.value = 'Edit';
      setProps({ disabled: false });
      setModalProps({ okText: '确定修改' });
    }
  };

  const ResError = () => {
    mode.value === 'Edit' ? message.error(`编辑广告失败`) : message.error(`新增广告失败`);
    handleModalClose();
  };
  const ResSuccess = () => {
    mode.value === 'Edit' ? message.success(`编辑广告成功`) : message.success(`新增广告成功`);
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
