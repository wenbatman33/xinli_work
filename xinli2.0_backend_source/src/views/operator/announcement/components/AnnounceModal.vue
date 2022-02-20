<template>
  <BasicModal
    :title="titleRef"
    width="1000px"
    @register="createBannerModal"
    @ok="handleConfirm"
    @cancel="handleReset"
  >
    <BasicForm @register="bannerCategoryForm">
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
  import { ref, computed, reactive, h } from 'vue';
  import { message, DatePicker, TimePicker } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { createAnnouncement, putAnnouncement } from '/@/api/operator/announcement';
  import { useGlobSetting } from '/@/hooks/setting';
  import type { FormSchema } from '/@/components/Table';
  import { Tinymce } from '/@/components/Tinymce/index';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/image';

  const imagePath = useGlobSetting().apiUrl + '/file/';

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
      string = '新增公告';
    } else if (mode.value === 'Edit') {
      string = '编辑公告';
    }
    return string;
  });

  const setStarField = (data) => setFieldsValue({ start: data });
  const setEndField = (data) => setFieldsValue({ end: data });
  const bannerCategoryFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'title',
        label: '标题',
        component: 'Input',
        required: true,
        componentProps: { placeholder: '请输入公告标题' },
        colProps: {
          span: 24,
        },
      },
      {
        field: 'sort',
        label: '排序',
        required: true,
        defaultValue: 999,
        component: 'InputNumber',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'hidden',
        label: '是否隐藏',
        required: true,
        component: 'Switch',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'top',
        label: '置顶',
        required: true,
        component: 'Checkbox',
        colProps: {
          span: 8,
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
        field: 'context',
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

  const [bannerCategoryForm, { setFieldsValue, resetFields, validate, setProps }] = useForm({
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
      const result = await createAnnouncement(payload);
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
      payload.id = currentID.value;
      const result = await putAnnouncement(payload);
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
    } else if (mode.value === 'ShowRowData') {
      mode.value = 'Edit';
      setProps({ disabled: false });
      setModalProps({ okText: '确定修改' });
    }
  };

  const ResError = () => {
    mode.value === 'Edit' ? message.error(`编辑公告失败`) : message.error(`新增公告失败`);
    handleModalClose();
  };
  const ResSuccess = () => {
    mode.value === 'Edit' ? message.success(`编辑公告成功`) : message.success(`新增公告成功`);
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
