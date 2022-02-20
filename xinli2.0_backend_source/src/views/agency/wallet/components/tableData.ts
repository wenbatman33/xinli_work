import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue';

const statusMapping = [{
  value: 1,
  label: '成功',
  color: '#00EC00'
},{
  value: 2,
  label: '失败',
  color: '#FF0000'
},{
  value: 3,
  label: '待审核',
  color: '#FFD306'
},]

// Data table columns
export const tableColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '代理帐号',
    dataIndex: 'agencyAccount',
    width: 100,
  },
  {
    title: '异动类型',
    dataIndex: 'type',
    width: 100,
    customRender: ({text, record}) => {
      if (text === 1){
        return '特殊上分';
      }
      if (text === 2){
        return '佣金派发';
      }
      if (text === 3){
        return '会员上分';
      }
      if (text === 4){
        return '特殊扣款';
      }
    }
  },
  {
    title: '异动金额',
    dataIndex: 'amount',
    width: 100,
  },
  {
    title: '异动前馀额',
    dataIndex: 'balanceBefore',
    width: 100,
  },
  {
    title: '异动后馀额',
    dataIndex: 'balanceAfter',
    width: 100,
  },
  {
    title: '流水限额',
    dataIndex: 'turnoverLimit',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    customRender: ({ text, record }) => {
      const target = statusMapping.find(item => item.value === text) || statusMapping[2];
      return h('span', {
        style: `color: ${target.color}`,
      }, target.label);
    },
  },
  {
    title: '申请日期',
    dataIndex: 'date',
    width: 150,
  },
  {
    title: '申请人帐号',
    dataIndex: 'applyAdminAccount',
    width: 100,
  },
  {
    title: '审核日期',
    dataIndex: 'reviewDate',
    width: 150,
  },
  {
    title: '审核人帐号',
    dataIndex: 'reviewAdminAccount',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
  },
];
