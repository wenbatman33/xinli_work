<template lang="pug">
  .container-fluid
    .row.mb-3
      el-input(v-model="params.analysisStr", placeholder="请键入分析字串", @input="debounceGetData()", clearable)
        el-select(v-model="params.type", slot="prepend", style="width: 160px", @change="changeType()")
          el-option(label="用户名", :value="1")
          el-option(label="装置ID", :value="2")
    .row
      el-table(:data="tableData", border, stripe)
        el-table-column(v-if="fieldPerms.loginLogRealname", label="用户名", prop="loginLogRealname", align="center")
        el-table-column(v-if="fieldPerms.memberUserAccount", label="帐号", align="center")
          member-display(
            slot-scope="{ row }"
            :memberName="row.memberUserAccount",
            :memberId="row.memberId",
            :groups="row.backendMemberGroupList && row.backendMemberGroupList.map(group => group.memberGroupGroupName)",
          )
        el-table-column(v-if="fieldPerms.backendMemberSignupIp", label="注册IP", prop="backendMemberSignupIp", align="center")
        el-table-column(v-if="fieldPerms.loginLogIp", label="最后登入IP", prop="loginLogIp", align="center", min-width="100")
        el-table-column(v-if="fieldPerms.loginLogLogIn", label="登入地点", prop="loginLogLogIn", align="center")
        el-table-column(v-if="fieldPerms.loginLogLastLoginAt", label="最后登入", prop="loginLogLastLoginAt", align="center", width="170")
        el-table-column(v-if="fieldPerms.loginLogDevice", label="设备", prop="loginLogDevice", align="center")
        el-table-column(v-if="fieldPerms.loginLogBrowser", label="浏览器", prop="loginLogBrowser", align="center")
        el-table-column(v-if="fieldPerms.loginLogFinger", label="装置ID", prop="loginLogFinger", align="center")
        el-table-column(v-if="fieldPerms.loginLogSignAt", label="注册时间", prop="loginLogSignAt", align="center", width="170")
        el-table-column(v-if="fieldPerms.memberAgency", label="代理来源", prop="memberAgency", align="center")
</template>

<script>
import debounce from 'lodash/debounce';
import { getRelationAPI } from '@/api/risk/memberRelation.js';

export default {
  data() {
    return {
      tableData: [],
      params: {
        analysisStr: '',
        type: 1,
      },
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  mounted() {
    this.getData();
    this.debounceGetData = debounce(this.getData, 500);
  },
  methods: {
    getData() {
      if (this.params.analysisStr) {
        getRelationAPI(this.params).then(response => {
          this.tableData = response.data.data;
        })
      } else {
        this.tableData = [];
      }
    },

    changeType() {
      if (this.params.analysisStr) {
        this.getData();
      }
    }
  },
}
</script>
