<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(@click="addAppVersionItem()") 新增 App版本
      //- 分页 表格上方
    .justify-content-end
      el-pagination(
        :background="true",
        :hide-on-single-page="true",
        :pager-count="5",
        layout="sizes, prev, pager, next, jumper, total",
        :page-sizes="[20, 50, 100, 200, 300, 400, 500]",
        :page-size="pageSize",
        :total="dataTotal",
        :current-page.sync="currentPage",
        @current-change="getData",
        @size-change="size => { pageSize = size; getData() }"
      )
    .row
      el-table(:data="appVersionPE", style="width: 100%")
        el-table-column(v-if="fieldPerms.appVersionPEVersion", prop="appVersionPEVersion", label="版号", align="center")
        el-table-column(v-if="fieldPerms.appVersionPEDeviceType", prop="appVersionPEDeviceType.display", label="平台", align="center")
        el-table-column(v-if="fieldPerms.appVersionPEMinOsVersion", prop="appVersionPEMinOsVersion", label="最低相容版本", align="center")
        el-table-column(v-if="fieldPerms.appVersionPEForceUpdate", prop="appVersionPEForceUpdate.display", label="强制更新", align="center")
        el-table-column(v-if="fieldPerms.appVersionPEStatus", prop="appVersionPEStatus.display", label="状态", align="center")
        el-table-column(v-if="fieldPerms.appVersionPEEnableDateTime", prop="appVersionPEEnableDateTime", label="启用时间", align="center")
        el-table-column(v-if="fieldPerms.appVersionPENote", prop="appVersionPENote", label="备注", align="center")
        el-table-column(label="管理", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link.mx-1.text-primary(@click="editappVersionPEItem(row)") 编辑
              el-link.mx-1.text-primary(v-if="buttonPerms.sportAppVersionHasLogNeedId", @click="openUpdateLog(row.id)") 修改记录
    el-dialog(:visible.sync="appVersionPEDialogVisible", :title='appVersionPEDialogTitle')
      el-form(:model="formData", ref="form", :rules="rules", label-width="120px")
        el-form-item(label="平台", prop="device_type")
          el-radio(v-model="formData.device_type", :label="1", border) iOS
          el-radio(v-model="formData.device_type", :label="2", border) Android
        el-form-item(label="版号", prop="version")
          el-input(v-model="formData.version")
          el-alert.my-2.p-1(title="请依版号规则填写第一个值不限位数、第二个值為两位、第三个值为三位，不足位数则补0",description="範例：11.01.002", :closable="false", type="warning")
        el-form-item(label="最低相容版本", prop="min_os_version")
          el-input(v-model="formData.min_os_version")
        el-form-item(label="强制更新", prop="force_update")
          el-radio(v-model="formData.force_update", :label="0", border) No
          el-radio(v-model="formData.force_update", :label="1", border) Yes
        el-form-item(label="启用时间", prop="enable_datetime")
          el-date-picker(
            ref="inbox__datetimepick"
            v-model="formData.enable_datetime",
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss",
            placeholder="请选择发送时间",
            :clearable="false",
            :editable="false"
          )
        el-form-item(label="档案位置", prop="file_location")
          el-input(v-model="formData.file_location")
        el-form-item(label="备注", prop="file_location")
          el-input(v-model="formData.note")
        el-form-item(label="状态", prop="status")
          el-switch(
            v-model="formData.status",
            :inactive-value="0",
            inactive-text="停用",
            :active-value="1",
            active-text="启用",
          )
        el-form-item(size="large")
          el-button(type="primary", @click="submitappVersionPE", icon="el-icon-check") 储存
    //- 修改记录
    el-drawer(title="修改记录", :visible.sync="updateLogVisible", :destroyOnClose="true", direction="rtl", size="60%")
      UpdateLog(:tableId="updateLogId")
</template>

<script>
import { getAppVersionAPI, addAppVersionAPI, editAppVersionAPI } from '@/api/system/appVersion';
import UpdateLog from '@/components/UpdateLog';

export default {
  components: { UpdateLog },
  data() {
    return {
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      // 全站: 1 體育:2
      platform: 2,
      appVersionPE: [],
      updateLogVisible: false,
      updateLogId: null,
      filterList: [
        { label: '版本号', model: 'version', component: 'filterInput', props: { type: 'text' }},
        { label: '搜寻装置', model: 'device_type', component: 'filterSelect', props: { options: {  1: 'iOS', 2: 'Android' } }},
        { label: '最低相容OS版本', model: 'min_os_version', component: 'filterInput', props: { type: 'text' }},
        { label: '强制更新', model: 'force_update', component: 'filterSelect', props: { options: {  0: 'No', 1: 'Yes' } }},
        { label: '状态', model: 'status', component: 'filterSelect', props: { options: {  0: '不啟用', 1: '啟用' } }},
      ],
      formDataDefault:{
        version: '',
        device_type: 1,
        min_os_version: '',
        force_update: false,
        file_location: '',
        note: '',
        status: false,
        enable_datetime:''
      },
      formData:{},
      rules: {
        version: [{ required: true, message: '请填写版号', trigger: 'submit' }],
        min_os_version: [{ required: true, message: '请填写最低相容版本', trigger: 'submit' }]
      },
      appVersionPEDialogVisible: false,
      appVersionPEDialogType: 1,
      appVersionPEDialogTitle: '',

    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        page: this.currentPage,
        per_page: this.pageSize,
        platform: this.platform,
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getAppVersionAPI(APIParams).then(response => {
        this.appVersionPE = response.data.data
      });
    },
    addappVersionPEItem(){
      this.formData = JSON.parse(JSON.stringify(this.formDataDefault))
      this.formData.platform = this.platform;
      this.appVersionPEDialogVisible = true
      this.appVersionPEDialogTitle='新增 App版本'
      this.appVersionPEDialogType= 1
    },
    editappVersionPEItem(row){
      this.appVersionPEDialogTitle= '编辑 App版本'
      this.appVersionPEDialogType= 2
      this.formData.id = row.id

      this.$set(this.formData, 'id', row.id);
      this.$set(this.formData, 'platform', this.platform);
      this.$set(this.formData, 'version', row.appVersionPEVersion);
      this.$set(this.formData, 'device_type', row.appVersionPEDeviceType.value);
      this.$set(this.formData, 'min_os_version', row.appVersionPEMinOsVersion);
      this.$set(this.formData, 'force_update', row.appVersionPEForceUpdate.value);
      this.$set(this.formData, 'file_location', row.appVersionPEFileLocation);
      this.$set(this.formData, 'note', row.appVersionPENote);
      this.$set(this.formData, 'enable_datetime', row.appVersionPEEnableDateTime);
      this.$set(this.formData, 'status', row.appVersionPEStatus && row.appVersionPEStatus.value);

      this.appVersionPEDialogVisible = true
    },
    submitappVersionPE(){
      if(this.appVersionPEDialogType===1 ){
        addAppVersionAPI(this.formData).then(() => {
          this.appVersionPEDialogVisible = false
          this.$message({ message: '成功新增 App版本', type: 'success'})
          this.getData()
        });
      } else{
        editAppVersionAPI(this.formData.id, this.formData).then(() => {
          this.appVersionPEDialogVisible = false
          this.$message({ message: '成功编辑 App版本', type: 'success'})
          this.getData()
        });
      }
    },
    openUpdateLog(id) {
      this.updateLogId = id;
      this.updateLogVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
