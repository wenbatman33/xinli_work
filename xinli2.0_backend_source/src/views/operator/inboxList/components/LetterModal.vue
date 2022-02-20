<template>
  <BasicModal
    :title="titleRef"
    :cancelText="'关闭'"
    width="1000px"
    @register="registerLetterModal"
    @ok="handleConfirm"
  >
    <BasicForm @register="registerLetterForm">
      <template #memberAccounts="{ model, field }">
        <Select
          v-model:value="model[field]"
          mode="tags"
          :token-separators="[',']"
          :disabled="mode === 'read'"
        >
        </Select>
        <Row class="mt-4" :gutter="[20, 20]" v-if="mode !== 'read'">
          <Col :span="2">
            <ImpExcel @success="loadDataSuccess">
              <a-button type="primary">批次加入</a-button>
            </ImpExcel>
          </Col>
          <Col :span="2">
            <a-button @click="download()">范例下载</a-button>
          </Col>
        </Row>
      </template>
      <template #sendAt="{ field, values }">
        <DatePicker :disabled="mode === 'read'" :value="values[field]" format="YYYY/MM/DD" @update:value="setStarField" :disabled-date="disabledDate" />
        <TimePicker :disabled="mode === 'read'" :value="values[field]" format="HH:mm" @update:value="setStarField" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, reactive, h } from 'vue';
  import { message, DatePicker, TimePicker, Select, Row, Col } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { addLetter, getLetterMember, editLetter } from '/@/api/operator/inbox';
  import { ImpExcel, ExcelData, aoaToSheetXlsx } from '/@/components/Excel';
  import type { FormSchema } from '/@/components/Table';
  import { Tinymce } from '/@/components/Tinymce/index';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/image';
  import moment from 'moment';

  export default defineComponent({
    components: { BasicForm, BasicModal, Row, Col, Select, ImpExcel, DatePicker, TimePicker, Tinymce },
    emits: ['register','success'],
    setup(_, { emit }) {
      const mode = ref<String>('');
      const titleRef = computed(() => {
        let string = '';
        if (mode.value === 'Create') {
          string = '站内信管理＼新增';
        } else if (mode.value === 'Edit') {
          string = '站内信管理＼编辑';
        } else if (mode.value === 'read') {
          string = '站内信管理＼查看';
        }
        return string;
      });
      const setStarField = (data) => setFieldsValue({ sendAt: data });
      const targetID = ref(0);
      const letterFormSchema = computed<FormSchema[]>(() => {
        return [
          {
            field: 'memberAccounts',
            label: '收件人',
            component: 'Input',
            required: true,
            slot: 'memberAccounts',
          },
          {
            field: 'sendTimeType',
            label: '发送时间',
            labelWidth: 80,
            component: 'RadioGroup',
            defaultValue: 1,
            required: true,
            colProps: {
              span: 6,
            },
            componentProps: {
              options: [
                { label: '立即', value: 1 },
                { label: '预约', value: 2 },
              ],
              onChange: (e) => {
                if (e.target.value === 1) {
                  updateSchema({field: 'sendAt', show: false, required: false});
                } else if (e.target.value === 2) {
                  updateSchema({field: 'sendAt', show: true, required: true});
                }
              },
            },
          },
          {
            field: 'sendAt',
            show: false,
            component: 'DatePicker',
            slot: 'sendAt',
            colProps: {
              span: 8,
            },
          },
          {
            field: 'title',
            label: '标题',
            component: 'Input',
            required: true,
            componentProps: { placeholder: '请输入标题' },
            colProps: {
              span: 24,
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

      const [registerLetterForm, { updateSchema, getFieldsValue, setFieldsValue, resetFields, validate, setProps }] = useForm({
        labelWidth: 80,
        schemas: letterFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerLetterModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        mode.value = data.mode;
        targetID.value = 0;
        if (mode.value === 'Edit') {
          targetID.value = data.record.letterSettingId;
          const members = await (await getLetterMember({letterSettingId: data.record.letterSettingId})).list.map(item=>item.memberAccount);
          setFieldsValue({ ...data.record });
          setFieldsValue({ 
            memberAccounts: members,
            sendTimeType: 2
          });
          updateSchema({field: 'sendAt', show: true, required: true});
          setProps({ disabled: false });
          setModalProps({ okText: '确定修改' });
        } else if (mode.value === 'Create') {
          setFieldsValue({ 
            memberAccounts: [],
            sendTimeType: 1
          });
          updateSchema({field: 'sendAt', show: false, required: false});
          setProps({ disabled: false });
          setModalProps({ okText: '确定新增' });
        }

        if(data.record && data.record.status === ''){
          const readOnlySchema = letterFormSchema.value.map(item=>{
            return {
              field: item.field,
              componentProps: { disabled: true },
            }
          });
          updateSchema(readOnlySchema);
          setModalProps({ showOkBtn: false });
          mode.value = 'read';
          setTimeout(()=>{
            tinymce.activeEditor.mode.set("readonly");
          }, 500);
        }else{
          const schema = letterFormSchema.value.map(item=>{
            return {
              field: item.field,
              componentProps: { disabled: false },
            }
          });
          updateSchema(schema);
          setModalProps({ showOkBtn: true });
          setTimeout(()=>{
            tinymce.activeEditor.mode.set("design");
          }, 500);
        }
      });

      const disabledDate = (current) => {
        // Can not select days before today
        return current < moment().subtract(1, 'day').endOf('day');
      };

      function loadDataSuccess(excelDataList: ExcelData[]) {
        const results = excelDataList[0].results.map(item=>item.memberName);
        const existAccounts = getFieldsValue().memberAccounts || [];
        const finalArray = [...new Set([...existAccounts, ...results])];
        setFieldsValue({ memberAccounts: finalArray });
      }

      function download(){
        aoaToSheetXlsx({
          data: [['memberName'],['firstMember']],
          filename: 'example.xlsx',
          write2excelOpts: {
            bookType: 'xlsx',
          },
        });
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

      const createSubmit = async () => {
        try {
          let payload = await validate();
          if (payload.sendTimeType === 1){
            payload.sendAt = moment().add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');
          }else{
            if (moment(payload.sendAt) < moment()){
              message.error('预约时间不能小于当前时间');
              return;
            }else{
              payload.sendAt = moment(payload.sendAt).format('YYYY-MM-DD HH:mm:ss');
            }
          }
          const result = await addLetter(payload);
          result.success ? ResSuccess() : ResError();
        } catch (e) {
          console.log(e);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };

      const ResError = () => {
        mode.value === 'Edit' ? message.error(`编辑站内信失败`) : message.error(`新增站内信失败`);
        handleModalClose();
      };
      const ResSuccess = () => {
        mode.value === 'Edit' ? message.success(`编辑站内信成功`) : message.success(`新增站内信成功`);
        handleModalClose();
      };

      const handleModalClose = () => {
        emit('success');
        closeModal();
      };

      const editSubmit = async () => {
        try {
          const payload = await validate();
          payload.id = targetID.value;
          if (payload.sendTimeType === 1){
            payload.sendAt = moment().add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');
          }
          const result = await editLetter(payload);
          result.success ? ResSuccess() : ResError();
        } catch (e) {
          console.log(e);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };

      return {
        mode,
        titleRef,
        registerLetterModal,
        handleConfirm,
        registerLetterForm,
        loadDataSuccess,
        download,
        setStarField,
        disabledDate,
      }
    }
});
  
</script>