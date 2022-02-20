<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div class="formBlock">
      <Form
        layout="inline"
        :model="formState"
      >
        <FormItem>
          <Input id="memberNameForCopy" v-model:value="formState.memberName" placeholder="Member Name">
            <!-- <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template> -->
          </Input>
        </FormItem>
        <FormItem>
          <Input v-model:value="formState.deviceID" placeholder="Device ID">
            <!-- <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template> -->
          </Input>
        </FormItem>
        <a-button class="formBtn" type="primary" @click="handleSearch" :disabled="formState.memberName === '' && formState.deviceID === ''">查询</a-button>
        <a-button class="formBtn" type="primary" @click="resetForm">重置</a-button>
        <a-button class="formBtn" type="primary" @click="handleRepeatView">近期可疑装置</a-button>
      </Form>
      <div class="info">
        <p>装置ID：{{ resultDeviceID }}</p>
        <p>设备：</p>
      </div>
      <div class="actions">
        <a-button class="formBtn" type="primary" @click="remarkMulti">全部标记为多重帐号</a-button>
        <a-button class="formBtn" type="primary" @click="copyToClipBoard" :disabled="formState.memberName === ''">复制帐号至剪贴簿</a-button>
      </div>
    </div>
    <BasicTable @register="registerTable" ref="tableRef">
      <template #account="{ record }">
        <a href="#" @click.prevent="openURL(record)">{{ record.account }}</a>
      </template>
      <template #tags="{ record }">
        <Tag
          v-for="tag in record.tags" 
          class="tag"
          @click="handleTag(record)" 
          :key="tag.id" 
          :color="tagColor.find(group=>group.id === tag.tagGroupID).color" 
        >
          {{tag.name}}
        </Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          v-if="hasPermission(['__btn_oprattion'])"
          :actions="[
            {
              label: '存',
              onClick: handleCheckEvent.bind(null, record, 'depositLimit'),
              color: record.depositLimit === 1 ? 'success' : 'error_grey',
              auth: '__btn_RC_disable_deposit'
            },
            {
              label: '提',
              onClick: handleCheckEvent.bind(null, record, 'withdrawLimit'),
              color: record.withdrawLimit === 1 ? 'success' : 'error_grey',
              auth: '__btn_RC_disable_withdraw'
            },
            {
              label: '登',
              onClick: handleCheckEvent.bind(null, record, 'status'),
              color: record.status === 1 ? 'success' : 'error_grey',
              auth: '__btn_RC_disable_login'
            },
            {
              label: '游',
              onClick: handleCheckEvent.bind(null, record, 'gameLogin'),
              color: record.gameLogin === 1 ? 'success' : 'error_grey',
              auth: '__btn_RC_disable_game'
            },
          ]"
        />
      </template>
    </BasicTable>
    <RepeatListModal @register="RepeatListModal" @success="handleRepeatListModalSearch" />
    <CheckModal @register="CheckModal" @success="handleSearch" />
    <AddTagModal @register="AddTagModal" @success="handleSearch" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, reactive, UnwrapRef, toRaw, toRefs } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction, TableActionType } from '/@/components/Table';
  import { GetMemberDeviceGhostList, SetMultiAccount } from '/@/api/risk/risk';
  import RepeatListModal from './RepeatList.vue';
  import CheckModal from './DoubleCheckModal.vue';
  import AddTagModal from '/@/views/common/tag/AddTagModal.vue';

  import { useModal } from '/@/components/Modal';
  import { columns, searchFormSchema } from './data';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getTagGroup } from '/@/api/tag/tag';

  import { Form, Input, Tag } from 'ant-design-vue';

  interface FormState {
    memberName?: string;
    deviceID?: string;
    pageSize?: number;
  }

  export default defineComponent({
    name: 'DeviceGhost',
    components: { 
      PageWrapper, 
      BasicTable, 
      TableAction, 
      Form,
      FormItem: Form.Item,
      Input,
      RepeatListModal,
      CheckModal,
      Tag,
      AddTagModal,
    },
    setup() {
      const formState: UnwrapRef<FormState> = reactive({
        memberName: '',
        deviceID: '',
      });
      const state = reactive({
        tagColor: [],
        resultDeviceID: '',
      });
      const { createMessage } = useMessage();
      const { hasPermission } = usePermission();
      const [RepeatListModal, { openModal: openRepeatListModal }] = useModal();
      const [CheckModal, { openModal: openCheckModal }] = useModal();
      const [AddTagModal, { openModal: openTagModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '',
        api: GetMemberDeviceGhostList,
        columns,
        showTableSetting: false,
        bordered: true,
        immediate: false,
        showIndexColumn: false,
        beforeFetch(params) {
          if (formState.memberName !== '' && formState.memberName !== undefined) {
            params.memberName = formState.memberName;
          }
          if (formState.deviceID !== '' && formState.deviceID !== undefined) {
            params.deviceID = formState.deviceID;
          }
          params.pageSize = 1000;
          return params;
        },
        afterFetch: (res)=>{
          if (res.length > 0){
            state.resultDeviceID = res[0].loginDevice;
          }else{
            state.resultDeviceID = '';
          }
        },
        actionColumn: {
          width: 130,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      initTag();
      async function initTag(){
        state.tagColor = (await getTagGroup()).list;
      }

      const tableRef = ref<Nullable<TableActionType>>(null);

      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }

      function resetForm(){
        formState.memberName = '';
        formState.deviceID = '';
      }
      
      function handleCheckEvent(record: Recordable, type){
        if (type === 'gameLogin'){
          alert('游戏功能暂未开放');
          return false;
        }
        openCheckModal(true,{
          record: toRaw(record),
          type,
        })
      }

      function handleCheckModal(){
        openCheckModal(true);
      }
      function handleRepeatView(){
        openRepeatListModal(true);
      }

      function handleRepeatListModalSearch(record){
        setForm({
          memberName: '',
          deviceID: record.deviceID
        });
      }

      function setForm(params){
        formState.memberName = params.memberName;
        formState.deviceID = params.deviceID;
        handleSearch();
      }

      function setSearchParams() {
        const params = toRaw(formState);
        if (params.memberName === '') delete params.memberName;
        if (params.deviceID === '') delete params.deviceID;
        params.pageSize = 1000;
        return {searchInfo: params};
      }

      function handleSearch() {
        const search = setSearchParams();
        reload(search);
      }

      function copyToClipBoard(){
        // 建立 Range 物件
        const range = document.createRange();
        // 將指定元素內容加到 Range 中
        const texts = document.querySelector('#memberNameForCopy');
        range.selectNode(texts);
        // 取得 Selection 物件
        const selection = window.getSelection();
        // 先清空當前選取範圍
        selection.removeAllRanges();
        // 加入 Range 
        selection.addRange(range);
        
        document.execCommand('copy');
        selection.removeAllRanges();

        createMessage.success('已复制帐号：' + formState.memberName);
      }

      function openURL(record){
        window.open('/memberDetail/detail/' + record.memberID);
      }

      async function remarkMulti(){
        const record = getTableAction().getDataSource();
        if (record.length > 0){
          const params = { memberIDs: record.map(item=>item.memberID) };
          await SetMultiAccount(params);
          createMessage.success('設定成功');
        }else{
          createMessage.error('列表中没有用户');
        }
      }

      function handleTag(record){
        const tags = record.tags.map(tag=>{
          tag.color = state.tagColor.find(group=>group.id === tag.tagGroupID).color;
          return toRaw(tag);
        })
        const params = {
          userId: record.memberID,
          tag: tags,
        }
        openTagModal(true, params);
      }


      return {
        ...toRefs(state),
        tableRef,
        searchFormSchema,
        formState,
        resetForm,
        getTableAction,
        hasPermission,
        registerTable,
        setForm,
        handleSearch,
        handleRepeatView,
        handleCheckModal,
        RepeatListModal,
        CheckModal,
        copyToClipBoard,
        handleCheckEvent,
        openURL,
        handleRepeatListModalSearch,
        remarkMulti,
        handleTag,
        AddTagModal,
      };
    },
  });
</script>

<style lang="scss" scoped>
.formBlock{
  padding: 10px 20px;
  background: #FFF;
  position: relative;
  .formBtn{
    margin-right: 10px;
    &[disabled]{
      background: #f5f5f5;
      border-color: #EEEEEE;
      &:hover{
        color: #999 !important;
      }
    }
  }
  .info{
    margin-top: 10px;
    p{
      display: inline-block;
      margin-right: 20px;
    }
  }
  .actions{
    position: absolute;
    top: 10px; 
    right: 20px;
    .formBtn{
      display: block;
      margin-bottom: 10px;
    }
  }
}
.tag{
  cursor: pointer;
  margin-bottom: 5px;
}

::v-deep(.ant-btn-error_grey){
  color: #666 !important;
}
</style>