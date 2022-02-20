<template>
  <!-- Create modal start -->
  <BasicModal
    title="充值显示管理"
    width="700px"
    @register="createModalRegister"
    @ok="handleOk"
  >
    <!-- Create form start -->
    <BasicForm @register="formRegister">
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
    </BasicForm>
    <!-- Create form end -->
  </BasicModal>
  <!-- Create modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { fileUpload } from '/@/api/upload';
  import { message, Upload } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { postFinanceCreate, putFinanceEdit } from '/@/api/payment/finance';
  import { FormSchema } from '/@/components/Form';
  // import { createSchemas } from './formSchemas';
  import { useGlobSetting } from '/@/hooks/setting';

  /**
   * Component state interface
   */
  interface State {
    /** Create loading */
    loading: boolean;
    imageH5File: string;
    imageH5Url: string;
    currentID: number;
    mode: string;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'CreateModal',
    components: {
      BasicModal,
      BasicForm,
      Upload,
    },
    emits: ['reload', 'register'],
    setup(_, { emit }) {
      const imagePath = useGlobSetting().apiUrl + '/file/';
      // Component state
      const state = reactive<State>({
        loading: false,
        imageH5File: '',
        imageH5Url: '',
        currentID: 0,
        mode: 'Create',
      });

      const createSchemas: FormSchema[] = [
        {
          field: 'name',
          component: 'Input',
          label: '名称',
          required: true,
          componentProps: {
            placeholder: '请输入名称',
          },
        },
        {
          field: 'note',
          component: 'InputTextArea',
          label: '說明',
          defaultValue: '',
        },
        {
          field: 'currency',
          component: 'RadioGroup',
          required: true,
          label: '币别',
          componentProps:{
            options: [
              { label: 'CNY', value: 1 },
              { label: 'USDT-ERC', value: 2 },
              { label: 'USDT-TRC', value: 3 },
            ],
          }
        },
        {
          field: 'nums',
          component: 'Input',
          label: '同时启用线路数量',
          required: true,
          rules: [
            {
              required: true,
            },
            {
              pattern: /^\d+$/,
              message: '数量必须是正整数',
            },
          ],
          componentProps: {
            type: 'number',
            min: 0,
          },
        },
        {
          field: 'status',
          component: 'Switch',
          label: '显示',
          required: true,
          defaultValue: 2,
          componentProps: {
            checkedValue: 1,
            unCheckedValue: 2,
          },
          colProps: {
            span: 8,
          },
        },
        {
          field: 'maintain',
          component: 'Switch',
          label: '维护',
          required: true,
          defaultValue: 1,
          componentProps: {
            checkedValue: 1,
            unCheckedValue: 2,
          },
          colProps: {
            span: 8,
          },
        },
        {
          field: 'isRecommend',
          component: 'Switch',
          label: '是否推荐',
          defaultValue: false,
          required: true,
          colProps: {
            span: 8,
          },
        },
        {
          field: 'icon',
          label: 'icon',
          component: 'Input',
          slot: 'imageH5',
        },
        {
          field: 'tooltip',
          component: 'Input',
          required: true,
          label: '推广',
        },
        {
          field: 'needRealName',
          component: 'Switch',
          label: '是否需要实名',
          defaultValue: false,
          required: true,
          colProps: {
            span: 8,
          },
        },
        {
          field: 'hasDoc',
          component: 'Switch',
          label: '是否有教学',
          required: true,
          defaultValue: false,
          colProps: {
            span: 8,
          },
          componentProps: {
            onChange: (value) => {
              if (value === true) {
                updateSchema([
                  {field: 'docTitle', show: true, required: true, },
                  {field: 'docURL', show: true, required: true, },
                ]);
              }else{
                updateSchema([
                  {field: 'docTitle', show: false, required: false, },
                  {field: 'docURL', show: false, required: false, },
                ]);
                setFieldsValue({ docTitle: '' });
                setFieldsValue({ docURL: '' });
              }
            },
          }
        },
        {
          field: 'docTitle',
          component: 'Input',
          label: '教学显示文字',
          show: false,
        },
        {
          field: 'docURL',
          component: 'Input',
          label: '教学网址',
          show: false,
        },
      ];

      const convertH5 = (data) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = (e) => (state.imageH5File = (e.target?.result as string) || '');
      };
      const uploadH5 = async (data) => {
        const formData = new FormData();
        formData.append('type', 'banner');
        formData.append('file', data.file);
        fileUpload(formData);

        const res = await fileUpload(formData);
        state.imageH5Url = res.url;
        setFieldsValue({ icon: res.url });
      };

      // Form definition
      const [formRegister, { validate, resetFields, setFieldsValue, updateSchema }] = useForm({
        labelWidth: 140,
        showResetButton: false,
        showSubmitButton: false,
        schemas: createSchemas,
      });

      const [createModalRegister, { setModalProps, closeModal }] = useModalInner((data) => {
        resetFields();
        if (data.record === false){
          state.mode = 'Create';
          state.imageH5File = '';
          setModalProps({ okText: '确定新增' });
        }else{
          state.mode = 'Edit';
          state.imageH5File = data.record ? imagePath + data.record.icon : '';
          state.currentID = data?.record?.id;
          if (data.record.hasDoc === true){
            updateSchema([
              {field: 'docTitle', show: true, required: true, },
              {field: 'docURL', show: true, required: true, },
            ]);
          }
          setFieldsValue({ ...data.record });
          setModalProps({ okText: '确定修改' });
        }

      });

      // Handle ok button clicked
      const handleOk = async () => {
        // Update loading state
        state.loading = true;

        try {
          // Validate form input
          const data = await validate();
          let response;
          if (state.mode === 'Create'){
            response = await postFinanceCreate({
              name: data.name,
              note: data.note,
              currency: data.currency,
              nums: Number(data.nums),
              status: data.status,
              maintain: data.maintain,
              icon: data.icon,
              isRecommend: data.isRecommend,
              needRealName: data.needRealName,
              tooltip: data.tooltip,
              hasDoc: data.hasDoc,
              docTitle: data.docTitle,
              docURL: data.docURL,
            });
          }else if (state.mode === 'Edit'){
            response = await putFinanceEdit({
              id: state.currentID,
              name: data.name,
              note: data.note,
              currency: data.currency,
              nums: Number(data.nums),
              status: data.status,
              maintain: data.maintain,
              icon: data.icon,
              isRecommend: data.isRecommend,
              needRealName: data.needRealName,
              tooltip: data.tooltip,
              hasDoc: data.hasDoc,
              docTitle: data.docTitle,
              docURL: data.docURL,
            });
          }

          // Validate response
          if (response.success) {
            // Notify success
            const modeText = state.mode === 'Create' ? '新增' : '修改';
            message.success(`${data.name} ${modeText}显示项目成功`);

            // Reset form fields
            await resetFields();
            state.imageH5File = '';

            // Reload finance list
            emit('reload');
            closeModal();
          } else {
            // Notify error
            const modeText = state.mode === 'Create' ? '新增' : '修改';
            message.error(`${data.name} ${modeText}显示项目失败`);
          }
        } catch (e) {
          // Handle exception by basic form and http utils
        } finally {
          // Revert loading state
          state.loading = false;
        }
      };
      return {
        state,
        formRegister,
        handleOk,
        convertH5,
        uploadH5,
        createModalRegister,
      };
    },
  });
</script>
<style lang="scss" scoped>
.thumb {
  height: 80px;
  width: 200px;
}
  </style>