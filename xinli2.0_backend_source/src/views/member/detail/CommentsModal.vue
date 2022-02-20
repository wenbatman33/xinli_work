<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="备注管理" @cancel="closeModalEvent">
    <a-row :gutter="[5, 5]">
      <BasicForm class="commentSearch" @register="registerSearchForm" @submit="handleSearch" @reset="handleSearch" />
    </a-row>
    <a-row :gutter="[5, 5]">
      <a-col :xl="{span:6, order:2}" :lg="{span:24, order:1}" >
        <BasicForm class="commentForm" @register="registerForm" @submit="handleSubmit" @reset="handleReset">
          <template #resetBefore>
            <p class="warning" v-if="isUpdate">警告，你正在编辑状态，若要离开编辑状态，请按重置</p>
          </template>
        </BasicForm>
      </a-col>
      <a-col :xl="{span:18, order:1}" :lg="{span:24, order:2}">
        <Collapse 
          v-model:activeKey="activeKey" 
          accordion
          >
          <CollapsePanel v-for="comment in filteredComments" :key="String(comment.id)" :header="`${comment.category} - ${comment.title}`">
            <Description 
              bordered
              :column="3"
              :data="comment"
              :schema="contentSchema"
            />
            <template #extra>
              <div @click.stop="handleEdit(comment.id)">
                <EditFilled />
                By：{{ comment.updator || comment.creator }}
                @ {{ comment.updatedAt || comment.createdAt }}
              </div>
            </template>
          </CollapsePanel>
        </Collapse>
      </a-col>
    </a-row>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, unref, toRaw, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { commentFormSchema, contentSchema } from './detail.data';
  import { Row, Col, Collapse } from 'ant-design-vue';
  const { Panel: CollapsePanel } = Collapse;
  import { Description } from '/@/components/Description/index';
  import { AddComment, GetComments, UpdateComment } from '/@/api/member/member';
  import { EditFilled } from '@ant-design/icons-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { cloneDeep } from 'lodash-es';
  import moment from 'moment';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'EditModal',
    components: { 
      BasicModal,
      BasicForm,
      ARow: Row, 
      ACol: Col,
      Collapse,
      CollapsePanel,
      EditFilled,
      Description
    },
    emits: ['success', 'register'],
    setup(_, {emit}) {
      const userStore = useUserStore();
      const { createMessage } = useMessage();
      const activeKey = ref([]);
      const isUpdate = ref(false);
      let filterCondition = ref({});
      let userId;
      const state = reactive({
        activeKey,
        comments: [],
      });

      const addBtn_text = computed(()=> (!unref(isUpdate) ? '新增' : '修改'));

      const filteredComments = computed(()=> {
        let finalComments = cloneDeep(toRaw(state.comments));
        let time_key = 'createdAt';
        
        const search = filterCondition.value;
        const start = search['start'] ? moment(search['start']):moment();
        const end = search['end'] ? moment(search['end']):moment();
        if (end < start){
          createMessage.error('开始时间必须小于结束时间');
          return finalComments;
        }

        for(let i in search){
          if (i === 'type'){
            time_key = (search[i] === 1) ? 'createdAt':'updatedAt';
          }else if (i === 'start'){
            finalComments = finalComments.filter(comment=>moment(comment[time_key]) >= start);
          }else if (i === 'end'){
            finalComments = finalComments.filter(comment=>moment(comment[time_key]) <= end);
          }else{
            if (search[i] !== '' && search[i] !== undefined){
              finalComments = finalComments.filter(comment=>{
                const key_content = comment[i] || '';
                return key_content.includes(search[i]);
              });
            }
          }  
        }
        return finalComments;
      });

      const commentSearchSchema: FormSchema[] = [
      {
        field: 'category',
        label: '绑定词',
        component: 'Input',
        colProps: {
          span: 4,
        },
      },
      {
        field: 'title',
        label: '简述关键字',
        component: 'Input',
        colProps: {
          span: 4,
        },
      },
      {
        field: 'content',
        label: '全文关键字',
        component: 'Input',
        colProps: {
          span: 6,
        },
      },
      {
        field: 'creator',
        label: '建立者',
        component: 'Input',
        colProps: {
          span: 4,
        },
      },
      {
        field: 'updator',
        label: '修改者',
        component: 'Input',
        colProps: {
          span: 4,
        },
      },
      {
        field: 'type',
        label: '',
        component: 'RadioButtonGroup',
        defaultValue: 1,
        componentProps: {
          options: [
            { label: '建立日期', value: 1 },
            { label: '修改日期', value: 2 },
          ],
        },
        colProps: {
          span: 3,
          offset: 1,
        },
      },
      {
        field: 'start',
        label: '开始日期',
        component: 'DatePicker',
        colProps: {
          span: 4,
        },
        componentProps: () => {
          return {
            style: {width: '100%'},
            valueFormat: 'YYYY-MM-DD',
            // onChange: (data) => {
            //   Object.assign(filterCondition.value, {start:data});
            // },
          };
        },
      },
      {
        field: 'end',
        label: '结束日期',
        component: 'DatePicker',
        colProps: {
          span: 4,
        },
        componentProps: () => {
          return {
            style: {width: '100%'},
            valueFormat: 'YYYY-MM-DD',
            // onChange: (data) => {
            //   Object.assign(filterCondition.value, {end:data});
            // },
          };
        },
      },
    ];

      const [registerSearchForm, { getFieldsValue }] = useForm({
        labelWidth: 100,
        schemas: commentSearchSchema,
        showActionButtonGroup: true,
        autoSubmitOnEnter: true,
        actionColOptions: {
          span: 10,
        },
      });

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 70,
        schemas: commentFormSchema,
        showActionButtonGroup: true,
        actionColOptions: {
          span: 23,
        },
        submitButtonOptions:{
          text: addBtn_text.value
        },
      });

      const [registerModal, { setModalProps }] = useModalInner(async (data) => {
        // console.log(data);
        resetFields();
        setModalProps({ confirmLoading: false });

        initComment(data.comments);
        userId = data.userId;
        setFieldsValue({
          commentCategory: userStore.getUserInfo.commentCategory,
        });
      });

      async function initComment(comment = false){
        resetFields();
        if (comment){
          state.comments = comment;
        }else{
          state.comments = (await GetComments(userId)).list;
        }
      }

      function handleEdit(commentID){
        const target = unref(state.comments.find(comment=>comment.id === commentID));
        setFieldsValue(toRaw(target));
        isUpdate.value = true;
      }

      function handleSearch(){
        let params = getFieldsValue();
        Object.entries(params).forEach(([key, value])=>{
          if (value === undefined){
            delete params[key];
          }
        });
        filterCondition.value = params;
      }

      function handleReset(){
        isUpdate.value = false;
      }

      function closeModalEvent(){
        // console.log(state.comments);
        emit('success', { values: state.comments });
      }
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          const params = {
            title: values.title,
            content: values.content,
          }
          if (isUpdate.value){
            Object.assign(params, {id: values.id});
            await UpdateComment(params);
            initComment();
          }else{
            Object.assign(params, {memberID: userId});
            await AddComment(params);
            initComment();
          }          
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { 
        registerModal, 
        registerForm, 
        handleSubmit, 
        closeModalEvent,
        ...toRefs(state), 
        handleEdit, 
        handleReset, 
        isUpdate, 
        registerSearchForm,
        handleSearch,
        filteredComments,
        contentSchema
      };
    },
  });
</script>
<style lang="scss" scoped>
::v-deep(.commentForm){
  position: sticky;
  top: 0px;
  .warning{
    color: #F00;
    font-size: 11px;
  }
}
</style>