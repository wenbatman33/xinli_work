<template>
  <BasicModal
    v-bind="$attrs"
    :width="'800px'"
    :centered="true"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <Description :column="3" :data="applyDetail" :schema="applyDetailSchema" />
    <BasicTable
      :showIndexColumn="false"
      :pagination="false"
      :bordered="true"
      :maxHeight="100"
      @register="registerEditTable"
    />
    <BasicTable @register="registerTable" :maxHeight="330" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref, ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Description } from '/@/components/Description/index';
  import { applyDetailSchema, applyDetailMemberColumns, editColumns } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ReviewApply } from '/@/api/risk/risk';

  export default defineComponent({
    name: 'ApplyReviewModal',
    components: { BasicTable, BasicModal, Description },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const applyDetail = ref({});
      const { createMessage } = useMessage();
      const isReviewed = ref(false);
      const applyLog = ref([]);
      const getTitle = computed(() => {
        return !isReviewed.value ? '上下分申请单审核' : '详细资料';
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        isReviewed.value = !!data?.isReviewed;
        const record = data.record;
        applyDetail.value = record;

        applyLog.value = generateLog(record);
        setLogData(applyLog.value);

        let memberList = data.record.memberList;
        if (unref(isReviewed)) {
          setTableData(memberList);
          let new_columns = getColumns();
          new_columns.forEach((item) => {
            if (item.dataIndex === 'reason') {
              item.edit = false;
              item.editable = false;
            }
            if (item.dataIndex === 'status') {
              item.customRender = ({ record }) => {
                return record.status === '1' ? '同意' : '不同意';
              };
            }
          });
          setColumns(new_columns);
        } else {
          memberList = memberList.map((item) => {
            item.status = 1;
            item.reason = '';
            return item;
          });
          setTableData(memberList);
          setColumns(applyDetailMemberColumns);
        }
      });

      const [registerEditTable, { setTableData: setLogData }] = useTable({
        columns: editColumns,
      });

      const [registerTable, { setTableData, getDataSource, getColumns, setColumns }] = useTable({
        columns: applyDetailMemberColumns,
      });

      async function handleSubmit() {
        if (unref(isReviewed)) {
          closeModal();
          return false;
        }
        try {
          setModalProps({ confirmLoading: true });
          // TODO custom api
          // const params = {
          //   memberIDs: records.map(li=>li.riskID),
          // }

          const tableData = getDataSource();
          let isPass = true;
          tableData.forEach((item) => {
            if (item.status === 2 && item.reason.trim() === '') {
              createMessage.error('不通过必须填写原因');
              isPass = false;
            }
          });
          if (!isPass) {
            return;
          } else {
            const params = {
              adjustmentID: applyDetail.value.adjustmentID,
              list: tableData,
            };
            console.log(params);
            await ReviewApply(params);
            closeModal();
            emit('success');
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      function generateLog(record) {
        const log = [
          {
            operator: record.createUser,
            updatedAt: record.createdAt,
            action: '建立申请单',
          },
        ];
        if (record.modifyData) {
          const update = record.modifyData.map((item) => {
            let action = '';
            if (item.addMember) {
              action = `加入会员：${item.addMember}`;
            }
            if (item.dropMember) {
              action === ''
                ? (action = `删除会员：${item.dropMember}`)
                : (action += `\n删除会员：${item.dropMember}`);
            }
            return {
              operator: item.modifyUser,
              updatedAt: item.modifyDate,
              action,
            };
          });
          log.push(...update);
        }
        if (record.verifyUser) {
          log.push({
            operator: record.verifyUser,
            updatedAt: record.updatedAt,
            action: '审核',
          });
        }
        return log;
      }

      return {
        getTitle,
        registerModal,
        registerTable,
        registerEditTable,
        handleSubmit,
        applyDetailSchema,
        applyDetail,
      };
    },
  });
</script>
