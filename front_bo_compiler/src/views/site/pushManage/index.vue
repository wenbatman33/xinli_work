<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(@click="addPushManageItem()") 新增推播

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
        @size-change="size => { pageSize = size; getData() }")

    .row
      el-table(:data="pushManageList", style="width: 100%")
        el-table-column(v-if="fieldPerms.id", prop="id", label="编号", align="center")
        el-table-column(v-if="fieldPerms.pushManageReserviePushDatetime", label="推播时间", align="center")
          template(slot-scope="{ row }")
            span(v-if="row.pushManageReserviePushDatetime === '0000-00-00 00:00:00'") 立即
            span(v-else) {{ row.pushManageReserviePushDatetime }}
        el-table-column(v-if="fieldPerms.pushManagePushDateTime", prop="pushManagePushDateTime", label="系统推播时间", align="center")
        el-table-column(v-if="fieldPerms.pushManagePushType", prop="pushManagePushType.display", label="类型", align="center")
        el-table-column(v-if="fieldPerms.pushManagePushMessage", prop="pushManagePushMessage", label="讯息", align="center", show-overflow-tooltip)
        el-table-column(v-if="fieldPerms.pushManagePushPosition", prop="pushManagePushPosition", label="连结", align="center", show-overflow-tooltip)
        el-table-column(v-if="fieldPerms.pushManagePushDevice", prop="pushManagePushDevice", label="装置", align="center")
          template(slot-scope="{ row }")
            el-tag.m-1(type="success", v-for='(item, key) in row.pushManagePushDevice') {{item.display}}
        el-table-column(v-if="fieldPerms.pushManageUpdatedUser", prop="pushManageUpdatedUser.display", label="操作人", align="center")
        el-table-column(v-if="fieldPerms.pushManagePushStatus", prop="pushManagePushStatus.display", label="状态", align="center")
        el-table-column(label="管理", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              //- 待派發狀態
              template(v-if="row.pushManagePushStatus.value===0")
                el-link.mx-1.text-primary(@click="submitDeletePushManage(row)") 删除
                span |
                el-link.mx-1.text-primary(@click="editPushManageItem(row)") 编辑
              //- 已派發狀態 記錄API需要再確認
              template(v-else)
                el-link.mx-1.text-primary(@click="editPushManageItem(row)") 查看
                span |
                el-link.mx-1.text-primary(@click="openPushManageReportDialog(row)") 纪录
              template(v-if="buttonPerms.pushManageHasLogNeedId")
                span |
                el-link.mx-1.text-primary(@click="openUpdateLog(row.id)") 修改记录
    el-dialog(:visible.sync="pushManageReportDialogVisible", title='推播纪录')
      el-table(:data="pushManageReportData.pushManageStiatisticsReport", style="width: 100%")
        el-table-column(prop="iOSReceived", label="iOS 接收数", align="center")
        el-table-column(prop="iOSPushed", label="iOS 发送数", align="center")
        el-table-column(prop="androidReceived", label="Android 接收数", align="center")
        el-table-column(prop="androidPushed", label="Android 发送数", align="center")

    el-dialog(:visible.sync="pushManageDialogVisible", :title='pushManageDialogTitle', top="3%")
      el-form(:model="formData", ref="form", :rules="rules", label-width="120px")
        el-form-item(label="推播时间", prop="reservie_push_datetime")
          el-radio(v-model="formData.push_time_type", :label="1", border) 立即
          el-radio(v-model="formData.push_time_type", :label="2", border) 預約
          el-date-picker(
            v-if="formData.push_time_type===2"
            ref="inbox__datetimepick"
            v-model="formData.reservie_push_datetime",
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss",
            placeholder="请选择发送时间",
            :clearable="false",
            :editable="false"
          )

        el-form-item(label="类型", prop="push_type")
          el-radio(v-model="formData.push_type", :label="1", border) 优惠
          el-radio(v-model="formData.push_type", :label="2", border) 系统

        el-form-item(label="装置", prop="push_device")
          el-checkbox-group(v-model="formData.push_device")
            //- WEB 目前没做推播 先隐藏
            el-checkbox(v-for="(device, key) in devices", :key="key", v-if="key > 2", :label="+key") {{ device }}

        el-form-item(label="讯息", prop="push_message")
          el-input(v-model="formData.push_message", type="textarea", rows="5")

        el-form-item(label="推播对象", prop="push_target_type")
          el-radio-group(v-model.number="formData.push_target_type", @change='change_push_target_type')
            el-radio-button(label=1) All
            el-radio-button(label=2) 使用者 群组/分类
            el-radio-button(label=3) 使用者帐号

        el-form-item(v-if="formData.push_target_type == 2", label="使用者 群组/分类", prop="Group")
          el-cascader.w-100(
            v-model="formData.push_target",
            :props="{ multiple: true }",
            :options="memberGroupFullList",
            popper-class="inbox__edit--cascader"
          )

        el-form-item(v-if="formData.push_target_type == 3", label="使用者帐号", prop="Member")
          el-select(
            v-model="formData.push_target",
            filterable,
            remote,
            reserve-keyword,
            placeholder="请输入帐号",
            :remote-method="searchMemberAccount",
            :loading="loading"
          )
            el-option(v-for="member in memberList" :key="member", :value="member")

        el-form-item(label="转跳位置", prop="push_position_type")
          el-select(v-model="formData.push_position_type")
            el-option(v-for="(categroy, id) in deepLinkCategoriesNoGame", :key="id", :value="+id", :label="categroy")

        el-form-item(v-if="needID", label="ID", prop="push_position")
          el-input(v-model="formData.push_position", placeholder="请输入目标 ID")

        el-form-item(v-if="needURL", label="网址", prop="push_position")
          el-input(v-model="formData.push_position", placeholder="请输入目标 URL")

        el-form-item(v-if='formData.pushManageStiatisticsReport.length === 0', label="状态", prop="status")
          el-switch(
            v-model="formData.status",
            :inactive-value="0",
            inactive-text="停用",
            :active-value="1",
            active-text="启用",
          )

        el-form-item(v-if='formData.pushManageStiatisticsReport.length>0', label="极光编号", prop="pushManageStiatisticsReport")
          el-tag.m-1(type="success", v-for='(item, key) in formData.pushManageStiatisticsReport') {{item}}

        el-form-item(size="large")
          //- 代派發時顯示
          el-button(v-if='formData.pushManagePushStatus!==1', type="primary", @click="submitPushManage", icon="el-icon-check") 确认
    //- 修改记录
    el-drawer(title="修改记录", :visible.sync="updateLogVisible", :destroyOnClose="true", direction="rtl", size="60%")
      UpdateLog(:tableId="updateLogId")
</template>

<script>
import { mapState } from 'vuex';
import { getPushManageAPI, addPushManageAPI, deletePushManageAPI, editPushManageAPI } from '@/api/site/pushManage';
import { getMemeberGroupFullListAPI } from '@/api/member/memberGroup';
import { searchMemberAPI } from '@/api/member/member';
import UpdateLog from '@/components/UpdateLog';

export default {
  components: { UpdateLog },
  data() {
    return {
      // 全站: 1 體育:2
      platform: 1,
      //
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      //
      pushManageList:[],
      updateLogVisible: false,
      updateLogId: null,
      filterList: [
        { label: '​​类型', model: 'push_type', component: 'filterSelect', props: { options: {  1: '优惠', 2: '系统' } }},
        { label: '状态', model: 'push_status', component: 'filterSelect', props: { options: {  0: '待发送', 1: '已发送' } }},
      ],
      memberGroupFullList: [],
      memberList: [],
      id: 0,
      loading: false,
      pushManageDialogVisible:false,
      pushManageReportDialogVisible:false,
      pushManageReportData:[],
      pushManageDialogTitle:'',
      pushManageDialogType: 1,

      formDataDefault:{
        push_time_type: 1,
        reservie_push_datetime: '',
        push_type: 1,
        push_device: [],
        push_message: '',
        push_target_type: 1,
        push_target: '',
        push_position_type: 1,
        push_position: '',
        pushManageStiatisticsReport: [],
        status: 0,
      },
      formData:{
        pushManageStiatisticsReport: [],
      },
      rules: {
        push_type: [{ required: true, message: '请选取推播类型' }],
        push_device: [{ type: 'array', required: true, message: '请自少选取一种设备' }],
        push_message: [{ required: true, message: '​​请输入内容' }],
        push_target: [{ required: true, message: '请选取推播对象' }],
        push_position: [{ required: true, message: '请输入指定目标' }],
      }

    }
  },
  computed: {
    ...mapState('common', [
      'devices',
      'deepLinkNeedURLList',
      'deepLinkNeedIDList',
    ]),
    deepLinkCategoriesNoGame() {
      return this.$store.getters['common/deepLinkCategoriesNoGame'];
    },
    needID() {
      return this.deepLinkNeedIDList.includes(this.formData.push_position_type);
    },
    needURL() {
      return this.deepLinkNeedURLList.includes(this.formData.push_position_type);
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getMemeberGroupFullListAPI().then(response => {
      this.memberGroupFullList = response.data.data;
    });
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        page: this.currentPage,
        per_page: this.pageSize,
        push_platform: this.platform,
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getPushManageAPI(APIParams).then(response => {
        this.pushManageList = response.data.data
      })
    },

    addPushManageItem(){
      // 清空表單
      if(this.$refs['form']) this.$refs['form'].resetFields();

      this.formData = JSON.parse(JSON.stringify(this.formDataDefault))
      this.formData.push_platform = this.platform
      this.pushManageDialogVisible = true
      this.pushManageDialogTitle ='新增推播'
      this.pushManageDialogType = 1
    },
    editPushManageItem(row){
      this.$set(this.formData, 'id', row.id);
      this.$set(this.formData, 'push_platform', this.platform);
      this.$set(this.formData, 'push_time_type', row.pushManagePushTimeType.value);
      this.$set(this.formData, 'reservie_push_datetime', row.pushManageReserviePushDatetime);
      this.$set(this.formData, 'push_type', row.pushManagePushType.value);
      this.$set(this.formData, 'push_device', Object.values(row.pushManagePushDevice).map(item => item.value));
      this.$set(this.formData, 'push_message', row.pushManagePushMessage);
      this.$set(this.formData, 'push_target_type', row.pushManagePushTargetType.value);
      if (this.formData.push_target_type === 2) {
        const target = row.pushManagePushTarget.split(',').map(Number);
        this.formData.push_target = []
        target.map(groupId => {
          for (let index = 0; index < this.memberGroupFullList.length; index++) {
            const type = this.memberGroupFullList[index];
            type.children.some(group => {
              if (group.value === groupId) {
                this.formData.push_target.push([type.value, groupId]);
                return true;
              }
            })
          }
        });
      } else {
        this.$set(this.formData, 'push_target', row.pushManagePushTarget);
      }
      this.$set(this.formData, 'push_position_type', row.pushManagePushPositionType.value);
      this.$set(this.formData, 'push_position', row.pushManagePushPosition);
      this.$set(this.formData, 'pushManagePushStatus', row.pushManagePushStatus.value);
      this.$set(this.formData, 'pushManageStiatisticsReport', Object.values(row.pushManageStiatisticsReport).map(item => item.messageId));
      this.$set(this.formData, 'status', row.pushManageStatus.value);

      this.pushManageDialogVisible = true
      this.pushManageDialogTitle='编辑推播'
      this.pushManageDialogType = 2
    },
    searchMemberAccount(keyword) {
      if (keyword !== '') {
        this.loading = true;

        searchMemberAPI(keyword).then(response => {
          this.memberList = response.data.data;
        }).finally(() => {
          this.loading = false;
        });
      } else {
        this.memberList = [];
      }
    },
    change_push_target_type(){
      if(this.formData.push_target_type === 1){
        this.formData.push_target = 'All'
      } else {
        this.formData.push_target = ''
      }
    },

    openPushManageReportDialog(row){
      this.pushManageReportDialogVisible = true;
      this.pushManageReportData = row;
    },
    submitDeletePushManage(row){
      deletePushManageAPI(row.id).then(() => {
        this.$message({ message: '成功删除推拨', type: 'success'})
        this.getData()
      });
    },
    submitPushManage(){
      this.$refs.form.validate(valid => {
        if (! valid) return;
        const data = {
          id: this.formData.id,
          push_platform: this.formData.push_platform,
          push_time_type:this.formData.push_time_type,
          reservie_push_datetime:this.formData.reservie_push_datetime,
          push_type:this.formData.push_type,
          push_message:this.formData.push_message,
          push_position_type:this.formData.push_position_type,
          push_position:this.formData.push_position,
          pushManagePushStatus:this.formData.pushManagePushStatus,
          status:this.formData.status,
          push_target_type: this.formData.push_target_type,
          push_target:this.formData.push_target,
          push_device:this.formData.push_device,
        }

        if (data.reservie_push_datetime === '0000-00-00 00:00:00' || ! data.reservie_push_datetime) {
          delete data.reservie_push_datetime;
        }

        if (this.formData.push_target_type === 2) {
          data.push_target = data.push_target.map(item => item[1]).join();
        }

        //- WEB 目前没做推播
        data.push_device = this.formData.push_device.filter(device => device > 2).toString();
        (this.pushManageDialogType === 1)  ? this.handleCreate(data) : this.handleUpdate(data.id, data);
      });
    },
    handleCreate(formData){
      addPushManageAPI(formData).then(() => {
        this.pushManageDialogVisible = false
        this.$message({ message: '成功新增推播', type: 'success'})
        this.getData()
      });

    },
    handleUpdate(id, formData) {
      editPushManageAPI(id, formData).then(() => {
        this.pushManageDialogVisible = false
        this.$message({ message: '成功编辑推播', type: 'success'})
        this.getData()
      });
    },
    openUpdateLog(id) {
      this.updateLogId = id;
      this.updateLogVisible = true;
    }
  }
}
</script>
