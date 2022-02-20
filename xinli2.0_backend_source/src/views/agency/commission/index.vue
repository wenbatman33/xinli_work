<template>
  <PageWrapper dense contentFullHeight>
    <!-- 一代佣金 -->
    <BasicTable size="small" @register="registerTable">
      <template #action="{ record }">
        <RadioGroup @change="statusChange($event, record)" v-model:value="record.setStatus" button-style="solid">
          <RadioButton :value="2">通过</RadioButton>
          <RadioButton :value="3">拒绝</RadioButton>
        </RadioGroup>
      </template>
      <template #footer>
        <div class="footer">
          <Description
            :column="2"
            :schema="[{
              label: '派发人数',
              field: 'num',
              contentMinWidth: 150,
            },{
              label: '当月总佣金',
              field: 'amount',
              contentMinWidth: 150,
            }]"
            :data="{
              num: CommissionNum,
              amount: CommissionAmount
            }"
          />
        </div>
        <Button type="primary" v-if="commissionShow" :disabled="commissionDisabled" @click="openCheckModal(dataSource, false)">确定派发</Button>
        <p v-if="reviewAccount" class="reviewAccount">审核帐号： {{ reviewAccount }}</p>
      </template>
    </BasicTable>
    <!-- 二代佣金 -->
    <BasicTable class="table2" size="small" @register="registerTable2">
      <template #action="{ record }">
        <RadioGroup @change="statusChange2($event, record)" v-model:value="record.setStatus" button-style="solid">
          <RadioButton :value="2">通过</RadioButton>
          <RadioButton :value="3">拒绝</RadioButton>
        </RadioGroup>
      </template>
      <template #footer>
        <div class="footer2">
          <Description
            :column="3"
            :schema="[{
              label: '派发人数',
              field: 'num',
              contentMinWidth: 150,
            },{
              label: '当月总佣金',
              field: 'amount',
              contentMinWidth: 150,
            },{
              label: '当月总尊享福利',
              field: 'amount2',
              contentMinWidth: 150,
            }]"
            :data="{
              num: CommissionNum2,
              amount: CommissionAmount2,
              amount2: CommissionAmount22,
            }"
          />
        </div>
        <Button type="primary" v-if="commissionShow2" :disabled="commissionDisabled2" @click="openCheckModal(dataSource2, true)">确定派发</Button>
        <p v-if="reviewAccount2" class="reviewAccount">审核帐号： {{ reviewAccount2 }}</p>
      </template>
    </BasicTable>
    <CheckModal @register="registerModal" @success="reload" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { Description } from '/@/components/Description';
  import { Radio, Button } from 'ant-design-vue';
  import type { FormProps } from '/@/components/Table';
  import { CommissionList, ChildrenCommissionList } from '/@/api/agency/agency';
  import { tableSchema, childTableSchema } from './components/tableData';
  import CheckModal from './components/checkModal.vue';
  import moment from 'moment';
  import type { CommissionModel } from '/@/api/agency/model/agencyModel';

  const RadioGroup = Radio.Group;
  const RadioButton = Radio.Button;
  const dataSource = ref<CommissionModel[]>([]);
  const dataSource2 = ref<CommissionModel[]>([]);
  const reviewAccount = ref('');
  const reviewAccount2 = ref('');

  const [registerModal, { openModal }] = useModal();

  const CommissionNum = computed(() => {
    // console.log(dataSource.value)
    return dataSource.value.filter(item => item.setStatus === 2).length;
  });
  const CommissionAmount = computed(() => {
    const passArr:CommissionModel[] = dataSource.value.filter(item => item.setStatus === 2);
    return passArr.reduce((total, item) => {
      return total + item.totalCommission
    }, 0).toFixed(2);
  });
  const commissionDisabled = computed(() => {
    const status = dataSource.value.find(item => [1,4,5].includes(item.setStatus)) ? true : false;
    return status;
  });
  const commissionShow = computed(() => {
    const show = dataSource.value.find(item => item.status === 1) ? true : false;
    return show;
  });
  const commissionDisabled2 = computed(() => {
    const status = dataSource2.value.find(item => [1,4,5].includes(item.setStatus)) ? true : false;
    return status;
  });
  const commissionShow2 = computed(() => {
    const show = dataSource2.value.find(item => item.childStatus === 1) ? true : false;
    return show;
  });
  const CommissionNum2 = computed(() => {
    // console.log(dataSource.value)
    return dataSource2.value.filter(item => item.setStatus === 2).length;
  });
  const CommissionAmount2 = computed(() => {
    const passArr = dataSource2.value.filter(item => item.setStatus === 2);
    return passArr.reduce((total, item) => {
      return total + item.totalCommission
    }, 0).toFixed(2);
  });
  const CommissionAmount22 = computed(() => {
    const passArr = dataSource2.value.filter(item => item.setStatus === 2);
    return passArr.reduce((total, item) => {
      return total + item.childBonusAmount
    }, 0).toFixed(2);
  });

  const openCheckModal = (record, children)=> {
    const summary = {
      num: children ? CommissionNum2.value : CommissionNum.value,
      amount: children ? CommissionAmount2.value : CommissionAmount.value,
      amount2: children ? CommissionAmount22.value : '',
    };
    openModal(true, {
      date: moment(getForm().getFieldsValue().date).set('date', 1).set('hour', 0).set('minute', 0).set('second', 0).format('YYYY-MM-DD HH:mm:ss'),
      children,
      record,
      summary,
    })
  }
  
  // Form config
  const formConfig = computed<FormProps>(() => {
    return {
      showResetButton: false,
      showAdvancedButton: true,
      autoSubmitOnEnter: true,
      actionColOptions: {
        span: 1,
      },
      schemas: [{
        field: 'date',
        component: 'MonthPicker',
        label: '月份',
        defaultValue: moment(),
        colProps: {
          span: 4,
        },
      }],
      baseColProps: {
        style: {
          padding: '0px 4px',
        },
      },
    };
  });

  const [registerTable, { reload, getForm }] = useTable({
    title: '一代佣金派发',
    formConfig,
    showIndexColumn: false,
    showTableSetting: true,
    useSearchForm: true,
    bordered: true,
    columns: tableSchema,
    canResize: false,
    pagination: false,
    beforeFetch: (params) => {
      params.date = moment(params.date).set('date', 1).set('hour', 0).set('minute', 0).set('second', 0).format('YYYY-MM-DD HH:mm:ss');
      return params;
    },
    afterFetch: (data) => {
      reload2();
      const addButtonData = data;
      addButtonData.forEach((item) => {
        item.setStatus = item.status || 1;
      });
      dataSource.value = addButtonData;
      return addButtonData;
    },
    api: async (arg) => {
      const data = await CommissionList(arg);
      reviewAccount.value = data.reviewAdminAccount;
      return data.list || [];
    },
    actionColumn: {
      width: 150,
      title: 'Action',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      ifShow: commissionShow,
      fixed: 'right',
    },
  });

  const statusChange = (event, record) => {
    dataSource.value.forEach(item=>{
      if(item.id === record.id){
        item.setStatus = event.target.value;
      }
    });
  }

  //二代佣金派发
  const [registerTable2, { reload: reload2 }] = useTable({
    title: '二代佣金派发',
    showIndexColumn: false,
    showTableSetting: true,
    bordered: true,
    columns: childTableSchema,
    canResize: false,
    pagination: false,
    beforeFetch: () => {
      const date = getForm().getFieldsValue().date;
      const dateObj = {
        date: moment(date).set('date', 1).set('hour', 0).set('minute', 0).set('second', 0).format('YYYY-MM-DD HH:mm:ss')
      }
      return dateObj;
    },
    afterFetch: (data) => {
      const addButtonData = data;
      addButtonData.forEach((item) => {
        item.setStatus = item.status || 1;
      });
      dataSource2.value = addButtonData;
      return addButtonData;
    },
    api: async (arg) => {
      const data = await ChildrenCommissionList(arg);
      reviewAccount2.value = data.childReviewAdminAccount;
      return data.list || [];
    },
    actionColumn: {
      width: 150,
      title: 'Action',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      ifShow: commissionShow2,
      fixed: 'right',
    },
  });

  const statusChange2 = (event, record) => {
    dataSource2.value.forEach(item=>{
      if(item.id === record.id){
        item.setStatus = event.target.value;
      }
    });
  }

  
</script>
<style lang="scss" scoped>
::v-deep(.ant-table-footer){
  background: #FFF;
}
.footer{
  width: 600px;
  display: inline-block;
  vertical-align: middle;
}
.footer2{
  width: 900px;
  display: inline-block;
  vertical-align: middle;
}

.table2{
  padding: 16px;
}

.reviewAccount{
  display: inline-block;
  margin-left: 2rem;
}
</style>