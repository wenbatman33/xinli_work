<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" title="申请" @ok="handleSubmit" width="1000px">
    <ARow :gutter="[20, 20]">
      <ACol :xl="12" :lg="24">
        <BasicForm @register="registerForm">
          <template #reason="{ model, field }">
            <Select 
              v-model:value="model[field]"
              :allowClear="true" 
              :options="adjustReason"
              :disabled="isUpdate"
            />
          </template>
        </BasicForm>
      </ACol>
      <ACol :xl="12" :lg="24">
        <ARow :gutter="[20, 20]">
          <ACol :span="12">
            <Input style="width: 150px" v-model:value="addAccount" placeholder="请输入会员帐号"></Input>
            <a-button type="primary" @click="addNew()">加入</a-button>
          </ACol>
          <ACol :span="4">
            <ImpExcel @success="loadDataSuccess">
              <a-button type="primary">批次加入</a-button>
            </ImpExcel>
          </ACol>
          <ACol :span="4">
            <a-button type="primary" @click="download()">范例下载</a-button>
          </ACol>
        </ARow>
        <BasicTable @register="registerTable">
          <template #action="{ record }">
            <TableAction
              stopButtonPropagation
              :actions="[
                {
                  label: '删除',
                  icon: 'ic:outline-delete-outline',
                  onClick: handleDelete.bind(null, record),
                },
              ]"
            />
          </template>
        </BasicTable>
      </ACol>
    </ARow>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref, ref } from 'vue';
  import { SelectTypes } from 'ant-design-vue/es/select';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { memberColumns, applyFormSchema, adjustReasonOptions } from './data';
  import { Row, Col, Input, Select } from 'ant-design-vue';
  import { ImpExcel, ExcelData, aoaToSheetXlsx } from '/@/components/Excel';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { CreateAdjustmentApply, UpdateAdjustmentApply } from '/@/api/risk/risk';


  export default defineComponent({
    name: 'ApplyModal',
    components: { BasicTable, BasicForm, BasicModal, ARow: Row, ACol: Col, Input, Select, ImpExcel, TableAction },
    emits: ['register','success'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const addAccount = ref<string>('');
      const adjustReason = ref<SelectTypes['options']>(adjustReasonOptions);
      const applyMemberList = ref<any[]>([]);
      const isUpdate = ref(false);
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        addAccount.value = '';
        
        setProps({
          disabled: isUpdate.value,
        });

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
          applyMemberList.value = data.record.memberList;
        }else{
          resetFields();
          applyMemberList.value = [];
        }
        updateMemberTable();
      });

      const [registerForm, { resetFields, setFieldsValue, validate, setProps }] = useForm({
        labelWidth: 90,
        schemas: applyFormSchema,
        showActionButtonGroup: false,
      });

      const [registerTable, { setTableData, redoHeight }] = useTable({
        title: '',
        columns: memberColumns,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        maxHeight: 400,
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      async function handleSubmit(){
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (applyMemberList.value.length === 0) {
            setModalProps({ confirmLoading: false });
            createMessage.error('申请单至少需要一名玩家');
            return;
          }else{
            // TODO custom api
            
            let params = {
              ...values,
              memberList: applyMemberList.value.map(item=>item.memberAccount),
            };
            if (unref(isUpdate)){
              Object.assign(params, {
                id: params.adjustmentID,
              });
              await UpdateAdjustmentApply(params);
            }else{
              await CreateAdjustmentApply(params);
            }

            closeModal();
            emit('success');
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      function addNew(){
        if(addAccount.value){
          applyMemberList.value.push({memberAccount: addAccount.value});
          addAccount.value = '';
          updateMemberTable();
        }
      }

      function updateMemberTable(){
        setTableData(applyMemberList.value);
        setTimeout(redoHeight, 300);
      }

      function loadDataSuccess(excelDataList: ExcelData[]) {
        const results = excelDataList[0].results;
        for (const result of results) {
            applyMemberList.value.push({memberAccount: result.memberName});
        }
        updateMemberTable();
      }

      function handleDelete(record: any){
        applyMemberList.value = applyMemberList.value.filter((item) => item.memberAccount !== record.memberAccount);
        updateMemberTable();
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


      return { 
        isUpdate,
        registerModal, 
        registerTable, 
        handleSubmit,
        registerForm, 
        loadDataSuccess,
        addAccount,
        adjustReason,
        addNew,
        handleDelete,
        download,
      };
    },
  });
</script>
