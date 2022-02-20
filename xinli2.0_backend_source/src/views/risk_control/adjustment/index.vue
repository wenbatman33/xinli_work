<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" ref="tableRef">
      <template #toolbar>
        <a-button v-if="hasPermission(['__btn_oprattion'])" type="primary" @click="handleApply()">申请</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          v-if="hasPermission(['__btn_oprattion'])"
          :actions="[
            {
              label: '详细资料',
              ifShow: record.status !== '3',
              onclick: () => {
                this.handleReview(record, true);
              },
            },
            {
              label: '编辑',
              ifShow: record.status === '3',
              onclick: () => {
                this.handleApply(record, true);
              },
            },
            {
              label: '删除',
              ifShow: record.status === '3',
              popConfirm: {
                title: '是否删除？',
                confirm: handleDelete.bind(null, record),
              },
            },
            {
              label: '审核',
              ifShow: record.status === '3',
              onclick: () => {
                this.handleReview(record);
              },
            },
          ]" 
        />
      </template>
    </BasicTable>
    <ApplyModal @register="ApplyModal" @success="handleSuccess()"/>
    <ReviewModal @register="ReviewModal" @success="handleSuccess()"/>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction, TableActionType } from '/@/components/Table';
  import { adjustmentList, DeleteAdjustmentApply } from '/@/api/risk/risk';

  import { useModal } from '/@/components/Modal';
  import ApplyModal from './ApplyModal.vue';
  import ReviewModal from './ReviewModal.vue';
  import { columns } from './data';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';


  export default defineComponent({
    name: 'Adjustment',
    components: { PageWrapper, BasicTable, TableAction, ApplyModal, ReviewModal },
    setup() {
      const { createMessage } = useMessage();
      const { hasPermission } = usePermission();
      const [ApplyModal, { openModal: openApplyModal }] = useModal();
      const [ReviewModal, { openModal: openReviewModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '',
        api: adjustmentList,
        columns,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
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

      function handleApply(record?, isUpdate? = false){
        openApplyModal(true, {
          record,
          isUpdate,
        });
      }

      function handleReview(record, isUpdate = false){
        openReviewModal(true, {
          record,
          isReviewed: isUpdate,
        });
      }

      function handleDelete(record){
        DeleteAdjustmentApply(record.adjustmentID).then(() => {
          createMessage.success('删除成功');
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }


      return {
        tableRef,
        hasPermission,
        registerTable,
        openApplyModal,
        handleSuccess,
        ApplyModal,
        ReviewModal,
        handleApply,
        handleReview,
        handleDelete,
      };
    },
  });
</script>
