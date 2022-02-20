<template lang="pug">
  .vipSetting
    el-table(
      :data="tableData"
      style="width: 100%"
    )
      el-table-column(
        prop="vipLevel"
        label="等级"
      )
      el-table-column(
        label="等级名称"
      )
        template(slot-scope="{ row }")
          p {{ getLevelName(row.memberGroupGroup, row.memberGroupListGroup) }}
      el-table-column(
        label="对应群组"
      )
        template(slot-scope="{ row }")
          el-tag {{ getGroupName(row.memberGroupGroup, row.memberGroupListGroup) }}
      el-table-column(
        prop="vipDepositSum"
        label="累计存款"
      )
      el-table-column(
        prop="vipBetSum"
        label="累计流水"
      )
      el-table-column(
        prop="vipKeepBetSum"
        label="保级流水"
      )
      el-table-column(
        prop="vipNote"
        label="备注"
      )
      el-table-column(
        prop="vipUpdatedAt"
        label="最后修改时间"
      )
      el-table-column(
        prop="vipUpdatedUser.display"
        label="操作人"
      )
      el-table-column(
        label="操作"
      )
        template(slot-scope="{ row }")
          router-link(
            :to="{ path: 'vipSettingEdit', query: { title: `VIP${row.vipLevel}设定`, id: row.id }}"
          ) 編輯
</template>

<script>
import { getAllVipSetting } from '@/api/vip';

export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getLevelName(groupData, id) {
      const result = groupData.data.filter((item) => item.id === id);
      return result[0].memberGroupGroupNote;
    },
    getGroupName(groupData, id) {
      const result = groupData.data.filter((item) => item.id === id);
      return result[0].memberGroupGroupName;
    },
  },
  created() {
    getAllVipSetting().then((res) => {
      this.tableData = res.data.data;
    })
  }
};
</script>