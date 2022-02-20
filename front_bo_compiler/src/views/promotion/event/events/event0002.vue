<template lang="pug">
  .container-fluid
    .d-flex.align-items-center
      el-page-header.mr-4(@back="$emit('back')", content="代理线下活动")
      el-button(:type="active === 'editPage' ? 'success' : ''", @click="active = 'editPage'") 活动编辑
      el-button(:type="active === 'join' ? 'success' : ''", @click="openJoin()") 报名清单
      el-button(:type="active === 'report' ? 'success' : ''", @click="openReport()") 统计报表
    //- 活動頁面
    template(v-if="active === 'editPage'")
      .d-flex.my-2.justify-content-between.align-items-center
        .d-flex
          el-select(v-model="status", @change="getData()")
            el-option(label="全部状态", :value="null")
            el-option(label="启用", :value="1")
            el-option(label="停用", :value="0")
          el-input.ml-3(v-model="account", placeholder="请输入代理帐号", @input="debounceGetData()")
        div
          el-tag(type="info", size="large") 活动页面跳转： {{ getRedirectDisplay() }}
          i.el-icon-edit.ml-2.c-pointer(@click="editRedirect()")
        el-button(@click="addEvent()") 新增活动
      .row.my-2
        el-table(:data="tableData", border, stripe, height="calc(100vh - 260px)", key="table")
          el-table-column(label="活动编号", align="center", prop="id", width="80")
          el-table-column(label="活动名称", align="center", prop="eventName")
          el-table-column(label="代理帐号", align="center", prop="agencyAccount")
          el-table-column(label="活动状态", align="center", width="100")
            el-tag(slot-scope="{ row }", :type="row.status.value ? '' : 'danger'") {{ row.status.display }}
          el-table-column(label="活动网址", align="center")
            a(slot-scope="{ row }", :href="'//' + row.eventUrl", target="_blank") {{ row.eventUrl }}
          el-table-column(label="最后更新时间", align="center", prop="updatedAt", width="160")
          el-table-column(label="操作人", align="center", prop="updatedUser.display", width="120")
          el-table-column(label="操作", align="center", width="140")
            template(slot-scope="{ row }")
              el-link.text-primary.mr-2(@click="editEvent(row)") 修改
              el-link.text-success(v-if="row.status.value === 0", @click="editEventStatus(row, 1)") 启用
              el-link.text-danger(v-else, @click="editEventStatus(row, 0)") 停用
              el-link.text-primary.ml-2(@click="openDetail(row.id)") 活动明细
    //- 报名清单
    template(v-if="active === 'join'")
      .mt-3
        data-filter(ref="dataFilter", :filterList="filterList", @change="getJoin()")
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
          @current-change="getJoin",
          @size-change="size => { pageSize = size; getJoin() }"
        )
      el-table(:data="joinTableData", border, stripe, key="joinTable")
        el-table-column(label="日期", prop="event0002Date", align="center", width="150")
        el-table-column(label="昵称", prop="event0002Nickname", align="center")
        el-table-column(label="手机号", prop="event0002Phone", align="center")
        el-table-column(label="邮箱", prop="event0002Email", align="center", show-overflow-tooltip)
        el-table-column(label="梦工厂帐号", align="center", min-width="100")
          member-display(
            slot-scope="{ row }",
            :memberName="row.event0002Account",
            :memberId="row.event0002MemberId",
            :groups="row.event0002MemberGroupList && row.event0002MemberGroupList.map(group => group.memberGroupGroupName)",
          )
        el-table-column(label="会员密码", prop="event0002Passcode", align="center")
        el-table-column(label="活动编号", prop="event0002ActivityId", align="center")
        el-table-column(label="代理帐号", prop="event0002Agency", align="center")
        el-table-column(label="竟猜活动编号", prop="event0002TaskBetId", align="center", min-width="100")
        el-table-column(label="玩家竟猜内容", prop="event0002BetItem", align="center", min-width="100")
    //- 报表
    template(v-if="active === 'report'")
      .d-flex.my-3
        el-date-picker(
          v-model="date",
          type="daterange",
          value-format="yyyy-MM-dd",
          range-separator="至",
          start-placeholder="开始日期"
          end-placeholder="结束日期",
          :clearable="false",
          @change="getReport()",
        )
      el-table(:data="reportTableData", border, stripe, key="reportTable")
        el-table-column(label="日期", prop="date", align="center", width="160")
        el-table-column(label="线下活动数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openReportTable(row.date)") {{ row.eventNum | formatMoney }}
        el-table-column(label="活跃活动数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openReportTable(row.date)") {{ row.activeNum | formatMoney }}
        el-table-column(label="竟猜赛事数", prop="gameNum", align="center")
        el-table-column(label="竟猜人次", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openReportTable(row.date, 'bet')") {{ row.betMemberNum }}
        el-table-column(label="新注册会员数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openReportTable(row.date, 'register')") {{ row.newRegisterNum }}
        el-table-column(label="新注册会员登入数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openReportTable(row.date, 'login')") {{ row.newLoginNum }}
        el-table-column(label="注册且首存", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openReportTable(row.date, 'deposit')") {{ row.registerDepositNum }}
    //- 汇总表
    el-dialog(:visible.sync="eventReportVisible", title="活动汇总表", width="90%", :modal-append-to-body="false", @close="detailTempDate = ''")
      el-table(:data="eventReportData", border, stripe)
        el-table-column(label="活动名称", prop="eventName", align="center")
        el-table-column(label="竟猜人次", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="getDetailData('bet', row.eventId)") {{ row.betMemberNum | formatMoney }}
        el-table-column(label="新注册会员数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="getDetailData('register', row.eventId)") {{ row.newRegisterNum | formatMoney }}
        el-table-column(label="新注册会员登入数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="getDetailData('login', row.eventId)") {{ row.newLoginNum | formatMoney }}
        el-table-column(label="注册且首存", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="getDetailData('deposit', row.eventId)") {{ row.registerDepositNum | formatMoney }}
    //- 跳转设定 dialog
    el-dialog(:visible.sync="redirectDialogVisible", title="代理线下活动全域设定")
      el-form(:model="redirectData", label-width="auto", ref="redirectForm", :rules="redirectRules")
        el-form-item(label="活动页面跳转", prop="status")
          el-switch(
            v-model="redirectData.status",
            :active-value="1",
            active-text="启用",
            :inactive-value="0",
            inactive-color="red",
            inactive-text="停用",
          )
        template(v-if="redirectData.status === 1")
          el-form-item(label="跳转时间", prop="second")
            el-input(v-model.number="redirectData.second")
              template(slot="append") 秒后跳转
            span 预设为 10 秒
          el-form-item(label="跳转位置", prop="url")
            el-input(v-model="redirectData.url")
            span 预设为{{ title }}首页
        .text-right
          el-button(type="primary", @click="handleEditRedirect()") 确认
    //- 活动 dialog
    el-dialog(:visible.sync="eventDialogVisible", :title="eventDialogTitle", @close="eventDialogClose")
      el-form(:model="eventData", label-width="auto", ref="eventForm", :rules="eventRules")
        template(v-if="eventData.id")
          el-form-item(label="活动编号", prop="id")
            span {{ eventData.id }}
          el-form-item(label="代理帐号", prop="agency_account")
            span {{ eventData.agency_account }}
        el-form-item(label="活动名称", prop="event_name")
          el-input(v-model="eventData.event_name")
        el-form-item(v-if="! eventData.id", label="代理帐号", prop="agency_account")
          el-input(v-model="eventData.agency_account")
        el-form-item(label="主视觉", prop="vision_image")
          el-upload(
            :http-request="setFile",
            :on-remove="removeFile",
            ref="video_bg_pc",
            :file-list="imageList",
            list-type="picture",
            action="",
            :limit=1,
            accept="image/jpeg,image/gif,image/png",
            :on-exceed="handleExceed"
          )
            el-button(slot="trigger", size="mini") 选取图片
        el-form-item(label="表单栏位-邮箱", prop="email_field_status")
          el-radio-group(v-model="eventData.email_field_status")
            el-radio-button(:label="1") 必填
            el-radio-button(:label="2") 非必填
            el-radio-button(:label="3") 不显示
        el-form-item(label="表单栏位-梦工厂帐号", prop="account_field_status")
          el-radio-group(v-model="eventData.account_field_status")
            el-radio-button(:label="1") 必填
            el-radio-button(:label="2") 非必填
            el-radio-button(:label="3") 不显示
        el-form-item(label="活动状态", prop="status")
          el-radio-group(v-model="eventData.status")
            el-radio-button(:label="1") 开启
            el-radio-button(:label="0") 停用
        el-form-item(label="竟猜状态", prop="task_status")
          el-radio-group(v-model="eventData.task_status")
            el-radio-button(:label="1") 开启
            el-radio-button(:label="0") 停用
        .text-right
          el-button(type="primary", @click="handleSubmitEvent()") 确认
    //- 活动明细 drawer
    el-drawer(title="活动明细", :visible.sync="eventDetailVisible", :destroyOnClose="true", direction="rtl", size="60%")
      .d-flex.mx-3.my-2
        el-date-picker(
          v-model="detailDate",
          type="daterange",
          value-format="yyyy-MM-dd",
          range-separator="至",
          start-placeholder="开始日期"
          end-placeholder="结束日期",
          :clearable="false",
          @change="getDetailData()",
        )
      el-table(:data="eventDetailData", border, stripe)
        el-table-column(label="日期", prop="date", align="center", width="160")
        el-table-column(label="竟猜赛事数", prop="gameNum", align="center")
        el-table-column(label="竟猜不重复人数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="getDetailData('bet')") {{ row.betMemberNum | formatMoney }}
        el-table-column(label="新注册会员数", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="getDetailData('register')") {{ row.newRegisterNum | formatMoney }}
        el-table-column(label="注册且首存", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="getDetailData('deposit')") {{ row.registerDepositNum | formatMoney }}
    //- 注册人数 活跃人数 唯一投注人数 会员table
    el-dialog(:visible.sync="memberTableVisible", top="5vh", width="90%", :title="memberTableTitle", :modal-append-to-body="false")
      .row
        el-table(:data="members", height="80vh")
          el-table-column(v-if="fieldPerms.memberUserAccount", label="帳號", align="center", width="160")
            template(slot-scope="{ row }")
              router-link(:to="{ path: '/memberDetail', query: { title: row.memberUserAccount, id: row.id } }")
                | {{ row.memberUserAccount }}
          el-table-column(v-if="fieldPerms.backendMemberRealname", prop="backendMemberRealname", label="姓名", align="center", width="120")
          el-table-column(v-if="fieldPerms.backendMemberGroupList", label="群组", align="center", width="200")
            template(slot-scope="{ row }")
              el-tooltip(v-if="row.backendMemberGroupList.length > 3")
                div(slot="content")
                  el-tag.m-1(v-for="group in row.backendMemberGroupList", :key="group.id") {{ group.memberGroupGroupName }}
                el-badge.mt-2(:value="row.backendMemberGroupList.length", type="warning")
                  el-tag {{ row.backendMemberGroupList[0] && row.backendMemberGroupList[0].memberGroupGroupName }}
              el-tag.m-1(v-else, v-for="group in row.backendMemberGroupList", :key="group.id") {{ group.memberGroupGroupName }}
          el-table-column(v-if="fieldPerms.backendMemberIp", prop="backendMemberIp", label="IP", align="center", width="120")
          el-table-column(v-if="fieldPerms.backendMemberLastLoginAt", prop="backendMemberLastLoginAt", label="最后登入", align="center", width="180", show-overflow-tooltip)
          el-table-column(v-if="fieldPerms.backendMemberLastLoginDevice", prop="backendMemberLastLoginDevice", label="设备", align="center", width="120")
          el-table-column(v-if="fieldPerms.backendMemberLastLoginBrowser", prop="backendMemberLastLoginBrowser", label="浏览器", align="center", width="80")
          el-table-column(v-if="fieldPerms.backendMemberMemberNote", label="备注", align="center", width="220")
            template(slot-scope="{ row }")
              .member--note(v-for="note in row.backendMemberMemberNote", :key="note.id")
                .member--note--type
                  span {{ note.memberNoteType.display[0] }}
                .member--note--content
                  .member--note--datetime {{ note.memberNoteCreatedAt }}
                  line-clamp(:content="note.memberNoteNote")
</template>

<script>
import debounce from 'lodash/debounce';
import { TITLE } from '@/config/server.js';
import {
  getRedirectAPI,
  editRedirectAPI,
  getEventListAPI,
  addEventAPI,
  editEventAPI,
  getJoinListAPI,
  getReportAPI,
  getReportEventAPI,
  getEventDetailAPI,
} from '@/api/promotion/event0002.js';

export default {
  data() {
    const imageFileValid = (rule, value, callback) => {
      if (! this.eventData.id) {
        if (! this.eventData.vision_image) {
          callback(new Error('请选择档案'));
        }
      }

      callback();
    }

    return {
      active: 'editPage',
      tableData: [],
      joinTableData: [],
      title: TITLE,
      redirect: null,
      redirectDialogVisible: false,
      redirectData: {
        second: '',
        url: '',
        status: 0
      },
      redirectRules: {
        status: [{ required: true, message: '必须选择一种状态' }],
        second: [{ min: 0, type: 'integer', message: '跳转秒数必须为0或正整数', trigger: 'submit' }],
      },
      status: null,
      account: '',
      eventDialogVisible: false,
      eventDialogTitle: '',
      eventData: {
        event_name: '',
        agency_account: '',
        vision_image: '',
        email_field_status: 1,
        account_field_status: 1,
        status: 1,
        task_status: 1,
      },
      eventRules: {
        event_name: [{ required: true, message: '活动名称为必填'}],
        vision_image: [{ validator: imageFileValid }],
        email_field_status: [{ required: true, message: '必须选择一种状态' }],
        account_field_status: [{ required: true, message: '必须选择一种状态' }],
        status: [{ required: true, message: '必须选择一种状态' }],
        task_status: [{ required: true, message: '必须选择一种状态' }],
      },
      imageList: [],
      joinOpened: false,
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        { label: '日期区间', model: 'date', component: 'filterDatePicker', props: { type: 'daterange' } },
        { label: '竟猜活动编号', model: 'activity_id', component: 'filterInput', props: { type: 'text' } },
        { label: '手机号', model: 'phone', component: 'filterInput', props: { type: 'text' } },
        { label: '邮箱', model: 'email', component: 'filterInput', props: { type: 'text' } },
        { label: '代理帐号', model: 'agency', component: 'filterInput', props: { type: 'text' } },
        { label: '梦工厂帐号', model: 'account', component: 'filterInput', props: { type: 'text' } },
      ],
      reportOpened: false,
      date: [],
      reportTableData: [],
      eventReportVisible: false,
      eventReportData: [],
      memberTableVisible: false,
      members: [],
      memberTableTitle: '',
      detailDate: [],
      detailId: '',
      eventDetailVisible: false,
      eventDetailData: [],
      detailTempDate: '',
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
    this.getRedirect();

    this.debounceGetData = debounce(this.getData, 500);
  },
  methods: {
    getData() {
      getEventListAPI({
        status: this.status,
        agency_account: this.account ? this.account : null,
      })
      .then(response => {
        this.tableData = response.data.data;
      })
    },

    getRedirect() {
      getRedirectAPI().then(response => {
        // MARK: 若沒設定過 API 會完全空
        if (response.data) {
          this.redirect = response.data.data;
        }
      });
    },

    getRedirectDisplay() {
      if (! this.redirect) {
        return '尚未设定';
      }

      let result = {0: '停用', 1: '啟用'}[this.redirect.status];

      if (this.redirect.status === 1) {
        result += ` 【${this.redirect.second}秒跳转】`;
      }

      return result;
    },

    editRedirect() {
      this.redirectData.status = this.redirect && this.redirect.status;
      this.redirectData.second = this.redirect && this.redirect.second;
      this.redirectData.url = this.redirect && this.redirect.url;
      this.redirectDialogVisible = true;
    },

    handleEditRedirect() {
      this.$refs.redirectForm.validate(valid => {
        if (valid) {
          editRedirectAPI(this.redirectData).then(() => {
            this.$message.success('活动跳转设定成功！');
            this.redirectDialogVisible = false;
            this.getRedirect();
          })
        }
      })
    },

    addEvent() {
      this.eventDialogTitle = '新增活动';
      this.eventData = {
        event_name: '',
        agency_account: '',
        vision_image: '',
        email_field_status: 1,
        account_field_status: 1,
        status: 1,
        task_status: 1
      }
      this.eventDialogVisible = true;
    },

    editEvent(event) {
      const formField = JSON.parse(event.formField);
      this.eventData = {
        id: event.id,
        event_name: event.eventName,
        agency_account: event.agencyAccount,
        email_field_status: formField.email.show,
        account_field_status: formField.account.show,
        status: event.status.value,
        task_status: event.taskStatus.value,
      }

      this.imageList.push({ url: this.$options.filters.urlAddTimestamp(event.visionImage) });
      this.eventDialogTitle = '修改活动';
      this.eventDialogVisible = true;
    },

    handleSubmitEvent() {
      this.$refs.eventForm.validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append('event_name', this.eventData.event_name);
          formData.append('agency_account', this.eventData.agency_account);
          if (this.eventData.vision_image) {
            formData.append('vision_image', this.eventData.vision_image);
          }
          formData.append('email_field_status', this.eventData.email_field_status);
          formData.append('account_field_status', this.eventData.account_field_status);
          formData.append('status', this.eventData.status);
          formData.append('task_status', this.eventData.task_status);

          this.eventData.id ? this.handleUpdateEvent(this.eventData.id, formData) : this.handleAddEvent(formData);
        }
      })
    },

    handleAddEvent(formData) {
      addEventAPI(formData).then(() => {
        this.$message.success('新增活动成功');
        this.eventDialogVisible = false;
        this.getData();
      });
    },

    handleUpdateEvent(id, formData) {
      editEventAPI(id, formData).then(() => {
        this.$message.success('活动更新成功');
        this.eventDialogVisible = false;
        this.getData();
      });
    },

    setFile({ file }) {
      this.eventData.vision_image = file;
    },

    removeFile() {
      this.eventData.vision_image = ''
    },

    handleExceed() {
      this.$message.warning('请先删除当前档案');
    },

    eventDialogClose() {
      this.imageList = [];
      this.$nextTick(() => {
        this.$refs.eventForm.resetFields();
      })
    },

    editEventStatus(event, status) {
      const formField = JSON.parse(event.formField);

      editEventAPI(event.id, {
        agency_account: event.agency_account,
        email_field_status: formField.email.show,
        account_field_status: formField.account.show,
        task_status: event.taskStatus.value,
        status,
      }).then(() => {
        this.$message.success('状态更改成功');
        this.getData();
      });
    },

    openJoin() {
      if (! this.joinOpened) {
        this.getJoin();
        this.joinOpened = true;
      }

      this.active = 'join';
    },

    getJoin() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        order_by: 'created_at',
        order: 'desc',
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      if (APIParams.date) {
        APIParams.start_time = APIParams.date[0];
        APIParams.end_time = APIParams.date[1];
        delete APIParams.date;
      }

      getJoinListAPI(APIParams).then(response => {
        this.joinTableData = response.data.data;
      });
    },

    openReport() {
      if (! this.reportOpened) {
        const now = new Date();
        const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
        now.setDate(now.getDate() - 7);
        const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
        this.date = [startDate, endDate];
        this.getReport();
        this.reportOpened = true;
      }

      this.active = 'report';
    },

    getReport() {
      getReportAPI({
        type: 'D',
        start_date: this.date[0],
        end_date: this.date[1],
      })
      .then(response => {
        this.reportTableData = response.data.data;
      })
    },

    openReportTable(date, return_type = 'report') {
      this.detailTempDate = date;
      getReportEventAPI({
        start_date: date,
        end_date: date,
        return_type
      })
      .then(response => {
        if (return_type === 'report') {
          this.eventReportData = response.data.data;
          this.eventReportVisible = true
        } else {
          this.openMemberTable(response, return_type);
        }
      })
    },

    openDetail(id) {
      const now = new Date();
      const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
      now.setDate(now.getDate() - 7);
      const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
      this.detailDate = [startDate, endDate];
      this.detailId = id;
      this.getDetailData();
    },

    getDetailData(return_type = 'report', id) {
      getEventDetailAPI(id || this.detailId, {
        date_type: 'D',
        start_date: this.detailTempDate || this.detailDate[0],
        end_date: this.detailTempDate || this.detailDate[1],
        return_type,
      })
      .then(response => {
        if (return_type === 'report') {
          this.eventDetailData = response.data.data;
          this.eventDetailVisible = true;
        } else {
          this.openMemberTable(response, return_type);
        }
      });
    },

    openMemberTable(response, return_type) {
      this.members = response.data.data;
      this.memberTableTitle = {
        bet: '竟猜人次',
        register: '新注册会员数',
        login: '新注册会员登入数',
        deposit: '注册且首存',
      }[return_type]
      this.memberTableVisible = true;
    }
  },
}
</script>
