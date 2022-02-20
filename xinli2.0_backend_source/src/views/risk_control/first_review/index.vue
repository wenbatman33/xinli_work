<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" ref="tableRef">
      <template #toolbar>
        <a-button v-if="hasPermission(['__btn_oprattion'])" type="primary" @click="handleBatchReview()">批次确认</a-button>
        <a-button v-if="hasPermission(['__btn_oprattion'])" type="primary" @click="handleBatchComment()">批次加入备注</a-button>
      </template>
      <template #account="{ record }">
        <a href="#" @click.prevent="handleAccountView(record)">{{ record.account }}</a>
      </template>
      <template #registerIp="{ record }">
        <a href="#" @click.prevent="handleIPView(record)">{{ record.registerIp }}</a>
      </template>
      <template #registerDevice="{ record }">
        <a href="#" @click.prevent="handleDeviceView(record)">{{ record.registerDevice }}</a>
      </template>
      <template #action="{ record }">
        <TableAction
          v-if="hasPermission(['__btn_oprattion'])"
          :actions="[
            {
              label: '确认',
              onClick: handleReview.bind(null, record),
            },
            {
              label: '加入备注',
              onClick: handleComment.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <AddCommentModal @register="AddCommentModal" />
    <ReviewModal @register="ReviewModal" @success="handleSuccess" />
    <IPListModal @register="IPListModal" :defaultFullscreen="true" :showOkBtn="false" :showCancelBtn="false" />
    <DeviceListModal @register="DeviceListModal" :defaultFullscreen="true" :showOkBtn="false" :showCancelBtn="false" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction, TableActionType } from '/@/components/Table';
  import { GetCheckList } from '/@/api/risk/risk';

  import { useModal } from '/@/components/Modal';
  import AddCommentModal from '/@/views/common/comment/AddCommentModal.vue';
  import IPListModal from './IPList.vue';
  import DeviceListModal from './DeviceList.vue';
  import ReviewModal from './ReviewModal.vue';
  import { columns } from './data';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'MemberRiskCheck',
    components: { PageWrapper, BasicTable, TableAction, AddCommentModal, IPListModal, DeviceListModal, ReviewModal },
    setup() {
      const { createMessage } = useMessage();
      const atLeast1:string = '请至少选择一名玩家';
      const { hasPermission } = usePermission();
      const [AddCommentModal, { openModal: openAddCommentModal }] = useModal();
      const [IPListModal, { openModal: openIPListModal }] = useModal();
      const [DeviceListModal, { openModal: openDeviceListModal }] = useModal();
      const [ReviewModal, { openModal: openReviewModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '',
        api: GetCheckList,
        columns,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        rowSelection: {type: 'checkbox'},
        actionColumn: {
          width: 130,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      const tableRef = ref<Nullable<TableActionType>>(null);

      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }

      function handleComment(record: Recordable) {
        openAddCommentModal(true, {
          memberIDs: [record.memberID],
        });
      }
      function handleBatchComment(){
        const record = getTableAction().getSelectRows();
        const memberIDs = record.map(data=>data.memberID);
        if (record.length > 0){
          openAddCommentModal(true, {
            memberIDs,
          });
        }else{
          createMessage.error(atLeast1);
        }
      }

      function handleIPView(record: Recordable){
        openIPListModal(true, {
          record,
        });
      }
      function handleDeviceView(record: Recordable){
        openDeviceListModal(true, {
          record,
        });
      }
      function handleReview(record){
        openReviewModal(true, {
          record: [record],
        });
      }
      function handleBatchReview(){
        const record = getTableAction().getSelectRows();
        if (record.length > 0){
          openReviewModal(true, {
            record,
          });
        }else{
          createMessage.error(atLeast1);
        }
      }

      function handleAccountView(record: Recordable){
        window.open('/memberDetail/detail/' + record.memberID);
      }

      function handleSuccess() {
        reload();
      }


      return {
        tableRef,
        hasPermission,
        registerTable,
        AddCommentModal,
        IPListModal,
        DeviceListModal,
        ReviewModal,
        handleComment,
        handleSuccess,
        handleBatchComment,
        handleIPView,
        handleDeviceView,
        handleReview,
        handleBatchReview,
        handleAccountView,
      };
    },
  });
</script>
