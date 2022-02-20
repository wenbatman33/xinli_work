<template lang="pug">
  .vendor
    .d-flex.justify-content-around.align-items-center.mb-4
      .d-flex.justify-content-around.align-items-center
        el-radio(v-model="timeRangeType" :label='1') 日
        el-radio(v-model="timeRangeType" :label='2') 週
        el-radio(v-model="timeRangeType" :label='3') 月
      el-date-picker(
        v-if="timeRangeType === 1"
        v-model="dayDateTime",
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :clearable="false"
      )
      .d-flex(v-else-if="timeRangeType === 2")
        el-date-picker.mr-2(
          :value="weekDateTimeStart"
          @input="value => weekDateTimeStart = $options.filters.formatWeek(value)"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          :clearable="false"
        )
        el-date-picker(
          :value="weekDateTimeEnd"
          @input="value => weekDateTimeEnd = $options.filters.formatWeek(value)"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
          :clearable="false"
        )
      el-date-picker(
        v-else-if="timeRangeType === 3"
        v-model="monthDateTime",
        type="monthrange"
        value-format="yyyy-MM-dd"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        :clearable="false"
      )
      el-button(@click="getData(timeRangeType)" size="small") 搜寻
    .d-flex.justify-content-between.align-items-center
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") 時間區間：{{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-else-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) 時間區間：{{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-else-if="timeRangeType === 3 && monthDateTime.length !== 0") 時間區間：{{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      span(v-if="tableDataSummary[0]") 最後更新時間：{{ tableDataSummary[0].reportMaxUpdateAt }}
    el-table(:data="tableDataSummary" border style="width: 100%")
      el-table-column(label="合計", header-align="center", align="center", width="120")
      el-table-column(v-if="fieldPerms.repMemberSignUpCnt" label="總註冊人數", header-align="center", align="center")
        template(slot-scope="{ row }")
          el-link(type="primary" @click="openMemberSignTable(false)") {{ row.repMemberSignUpCnt }}
      el-table-column(v-if="fieldPerms.repMemberSignUpAndDepositCnt" label="總註冊且首存", header-align="center", align="center")
        template(slot-scope="{ row }")
          el-link(type="primary" @click="openMemberSignAndDepositTable(false)") {{ row.repMemberSignUpAndDepositCnt }}
      el-table-column(v-if="fieldPerms.repMemberDepositNotSignUpCnt" label="總首存非註冊", header-align="center", align="center")
        template(slot-scope="{ row }")
          el-link(type="primary" @click="openMemberDepositNotSignUpTable(false)") {{ row.repMemberDepositNotSignUpCnt }}
      el-table-column(v-if="fieldPerms.repMemberActiveCnt" label="總活躍人數", header-align="center", align="center")
        template(slot-scope="{ row }")
          el-link(type="primary" @click="openMemberActiveTable(false)") {{ row.repMemberActiveCnt }}
      el-table-column(v-if="fieldPerms.repMemberRetentionRate" label="次留存", header-align="center", align="center")
      el-table-column(v-if="fieldPerms.repMemberPhoneAuthCnt" label="總手機認證", header-align="center", align="center")
        template(slot-scope="{ row }")
          span {{ row.repMemberPhoneAuthCnt }}
      el-table-column(v-if="fieldPerms.repMemberEmailAuthCnt" label="總郵箱認證", header-align="center", align="center")
        template(slot-scope="{ row }")
          span {{ row.repMemberEmailAuthCnt }}
    el-table(:data="tableData" border style="width: 100%")
      el-table-column(label="日期", header-align="center", align="center", width="120")
        template(slot-scope="{ row }")
          span {{ row.reportDate }}
      el-table-column(v-if="fieldPerms.repMemberSignUpCnt" label="註冊人數", header-align="center", align="center")
        template(slot-scope="{ row }")
          el-link(type="primary" @click="openMemberSignTable(row)") {{ row.repMemberSignUpCnt }}
      el-table-column(v-if="fieldPerms.repMemberSignUpAndDepositCnt" label="註冊且首存", header-align="center", align="center")
        template(slot-scope="{ row }")
          el-link(type="primary" @click="openMemberSignAndDepositTable(row)") {{ row.repMemberSignUpAndDepositCnt }}
      el-table-column(v-if="fieldPerms.repMemberDepositNotSignUpCnt" label="首存非註冊", header-align="center", align="center")
        template(slot-scope="{ row }")
          el-link(type="primary" @click="openMemberDepositNotSignUpTable(row)") {{ row.repMemberDepositNotSignUpCnt }}
      el-table-column(v-if="fieldPerms.repMemberActiveCnt" label="活躍人數", header-align="center", align="center")
        template(slot-scope="{ row }")
          el-link(type="primary" @click="openMemberActiveTable(row)") {{ row.repMemberActiveCnt }}
      el-table-column(v-if="fieldPerms.repMemberRetentionRate" header-align="center", align="center")
        template(slot="header")
          span(@click="openImage") 次留存%
            i.el-icon-data-analysis
        template(slot-scope="{ row }")
          span {{ row.repMemberRetentionRate }}%
      el-table-column(v-if="fieldPerms.repMemberPhoneAuthCnt" label="手機認證", header-align="center", align="center")
        template(slot-scope="{ row }")
          span {{ row.repMemberPhoneAuthCnt }}
      el-table-column(v-if="fieldPerms.repMemberEmailAuthCnt" label="郵箱認證", header-align="center", align="center")
        template(slot-scope="{ row }")
          span {{ row.repMemberEmailAuthCnt }}
    el-dialog(:visible.sync="allMemberSignTable", title="玩家報表/註冊玩家清單", width="90%", top="5vh", :modal-append-to-body="false")
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") {{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) {{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") {{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      el-table(:data="detailTable", height="75vh")
        el-table-column(label="编号", prop="id", align="center")
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
        el-table-column(v-if="fieldPerms.backendMemberReferer", prop="backendMemberReferer", label="域名", align="center", width="160", show-overflow-tooltip)
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
    el-dialog(:visible.sync="allMemberSignAndDepositTable", title="玩家報表/註冊且首存玩家清單", width="90%", top="5vh", :modal-append-to-body="false")
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") {{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) {{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") {{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      el-table(:data="detailTable", height="75vh")
        el-table-column(label="编号", prop="id", align="center")
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
        el-table-column(v-if="fieldPerms.backendMemberReferer", prop="backendMemberReferer", label="域名", align="center", width="160", show-overflow-tooltip)
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
    el-dialog(:visible.sync="allMemberDepositNotSignUpTable", title="玩家報表/首存非註冊玩家清單", width="90%", top="5vh", :modal-append-to-body="false")
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") {{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) {{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") {{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      el-table(:data="detailTable", height="75vh")
        el-table-column(label="编号", prop="id", align="center")
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
        el-table-column(v-if="fieldPerms.backendMemberReferer", prop="backendMemberReferer", label="域名", align="center", width="160", show-overflow-tooltip)
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
    el-dialog(:visible.sync="allMemberActiveTable", title="玩家報表/活躍玩家清單", width="90%", top="5vh", :modal-append-to-body="false")
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") {{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) {{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") {{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      el-table(:data="detailTable", height="75vh")
        el-table-column(label="编号", prop="id", align="center")
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
        el-table-column(v-if="fieldPerms.backendMemberReferer", prop="backendMemberReferer", label="域名", align="center", width="160", show-overflow-tooltip)
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
    el-dialog(:visible.sync="memberSignTable", title="玩家報表/註冊玩家清單", width="90%", top="5vh", :modal-append-to-body="false")
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") {{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) {{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") {{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      el-table(:data="detailTable", height="75vh")
        el-table-column(label="编号", prop="id", align="center")
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
        el-table-column(v-if="fieldPerms.backendMemberReferer", prop="backendMemberReferer", label="域名", align="center", width="160", show-overflow-tooltip)
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
    el-dialog(:visible.sync="memberSignAndDepositTable", title="玩家報表/註冊且首存玩家清單", width="90%", top="5vh", :modal-append-to-body="false")
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") {{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) {{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") {{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      el-table(:data="detailTable", height="75vh")
        el-table-column(label="编号", prop="id", align="center")
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
        el-table-column(v-if="fieldPerms.backendMemberReferer", prop="backendMemberReferer", label="域名", align="center", width="160", show-overflow-tooltip)
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
    el-dialog(:visible.sync="memberDepositNotSignUpTable", title="玩家報表/首存非註冊玩家清單", width="90%", top="5vh", :modal-append-to-body="false")
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") {{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) {{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") {{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      el-table(:data="detailTable", height="75vh")
        el-table-column(label="编号", prop="id", align="center")
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
        el-table-column(v-if="fieldPerms.backendMemberReferer", prop="backendMemberReferer", label="域名", align="center", width="160", show-overflow-tooltip)
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
    el-dialog(:visible.sync="memberActiveTable", title="玩家報表/活躍玩家清單", width="90%", top="5vh", :modal-append-to-body="false")
      span(v-if="timeRangeType === 1 && dayDateTime.length !== 0") {{ dayDateTime[0] }} ~ {{ dayDateTime[1] }}
      span(v-if="timeRangeType === 2 && weekDateTimeStart !== '' && weekDateTimeEnd !== ''"  ) {{ weekDateTimeStart }} ~ {{ weekDateTimeEnd }}
      span(v-if="timeRangeType === 3 && monthDateTime.length !== 0") {{ monthDateTime[0] }} ~ {{ monthDateTime[1] }}
      el-table(:data="detailTable", height="75vh")
        el-table-column(label="编号", prop="id", align="center")
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
        el-table-column(v-if="fieldPerms.backendMemberReferer", prop="backendMemberReferer", label="域名", align="center", width="160", show-overflow-tooltip)
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
    el-dialog(:visible.sync="memberRetentionRateTable", width="90%", top="5vh", :modal-append-to-body="false")
      ve-histogram(:data="chartTableData" :settings="chartSettings" :extend="extend" :tooltip-visible="false")
</template>

<script>
import {
  getMemberReportAPI,
  getMemberReportTotalAPI,
  getMemberReportSignUpMemberAPI,
  getMemberReportSignUpDepositMemberAPI,
  getMemberReportNotSignUpDepositMemberAPI,
  getMemberReportActiveMember
} from '@/api/reports/member.js';

export default {
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  data() {
    this.extend = {
      'xAxis.0.axisLabel.rotate': 45,
      'yAxis.0.splitNumber': 4,
      'yAxis.1.splitNumber': 4,
    }
    this.chartSettings = {
      'showLine': 'repMemberRetentionRate',
      axisSite: { right: ['repMemberRetentionRate'] },
      labelMap: {
        'repMemberSignUpCnt': '註冊人數',
        'repMemberRetentionRate': '次留存%',
      },
      yAxisType: ['KMB', 'percent'],
    }
    return {
      timeRangeType: 1,
      dayDateTime: [],
      weekDateTimeStart: '',
      weekDateTimeEnd: '',
      monthDateTime: [],
      tableData: [],
      tableDataSummary: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      detailTable: [],
      memberSignTable: false,
      allMemberSignTable: false,
      memberSignAndDepositTable: false,
      allMemberSignAndDepositTable: false,
      memberDepositNotSignUpTable: false,
      allMemberDepositNotSignUpTable: false,
      memberActiveTable: false,
      allMemberActiveTable: false,
      memberRetentionRateTable: false,
      chartTableData: {},
    }
  },
  methods: {
    getData(datepickertype) {
      let temp = {};
      let params;
      if (datepickertype === 1) {
        params = {
          dateType: 'D',
          startDate: this.dayDateTime[0],
          endDate: this.dayDateTime[1],
        };
        Object.keys(params).map(key => {
          if (params[key]) {
            temp[key] = params[key]
          }
        })
      } else if (datepickertype === 2) {
        params = {
          dateType: 'W',
          startDate: this.weekDateTimeStart > this.weekDateTimeEnd ? this.weekDateTimeEnd : this.weekDateTimeStart,
          endDate: this.weekDateTimeStart > this.weekDateTimeEnd ? this.weekDateTimeStart : this.weekDateTimeEnd,
        };
        Object.keys(params).map(key => {
          if (params[key]) {
            temp[key] = params[key]
          }
        })
      } else if (datepickertype === 3) {
        params = {
          dateType: 'M',
          startDate: this.monthDateTime[0],
          endDate: this.monthDateTime[1],
        };
        Object.keys(params).map(key => {
          if (params[key]) {
            temp[key] = params[key]
          }
        });
      }
      getMemberReportAPI(temp).then(res => {
        this.tableData = res.data.data;
      }).catch(() => {});
      getMemberReportTotalAPI(temp).then(res => {
        this.tableDataSummary = res.data.data;
      }).catch(() => {});
    },
    openMemberSignTable(data) {
      if (data) {
        this.memberSignTable = true;
        if (this.timeRangeType === 1) {
          getMemberReportSignUpMemberAPI({
            dateType: 'D',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else if (this.timeRangeType === 2) {
          getMemberReportSignUpMemberAPI({
            dateType: 'W',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else {
          getMemberReportSignUpMemberAPI({
            dateType: 'M',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        }
      } else {
        this.allMemberSignTable = true;
        if (this.timeRangeType === 1) {
          getMemberReportSignUpMemberAPI({
            dateType: 'D',
            startDate: this.dayDateTime[0],
            endDate: this.dayDateTime[1],
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else if (this.timeRangeType === 2) {
          getMemberReportSignUpMemberAPI({
            dateType: 'W',
            startDate: this.weekDateTimeStart,
            endDate: this.weekDateTimeEnd,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else {
          getMemberReportSignUpMemberAPI({
            dateType: 'M',
            startDate: this.monthDateTime[0],
            endDate: this.monthDateTime[1],
          }).then(res => {
            this.detailTable = res.data.data;
          });
        }
      }
    },
    openMemberSignAndDepositTable(data) {
      if (data) {
        this.memberSignAndDepositTable = true;
        if (this.timeRangeType === 1) {
          getMemberReportSignUpDepositMemberAPI({
            dateType: 'D',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else if (this.timeRangeType === 2) {
          getMemberReportSignUpDepositMemberAPI({
            dateType: 'W',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else {
          getMemberReportSignUpDepositMemberAPI({
            dateType: 'M',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        }
      } else {
        this.allMemberSignAndDepositTable = true;
        if (this.timeRangeType === 1) {
          getMemberReportSignUpDepositMemberAPI({
            dateType: 'D',
            startDate: this.dayDateTime[0],
            endDate: this.dayDateTime[1],
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else if (this.timeRangeType === 2) {
          getMemberReportSignUpDepositMemberAPI({
            dateType: 'W',
            startDate: this.weekDateTimeStart,
            endDate: this.weekDateTimeEnd,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else {
          getMemberReportSignUpDepositMemberAPI({
            dateType: 'M',
            startDate: this.monthDateTime[0],
            endDate: this.monthDateTime[1],
          }).then(res => {
            this.detailTable = res.data.data;
          });
        }
      }
    },
    openMemberDepositNotSignUpTable(data) {
      if (data) {
        this.memberDepositNotSignUpTable = true;
        if (this.timeRangeType === 1) {
          getMemberReportNotSignUpDepositMemberAPI({
            dateType: 'D',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else if (this.timeRangeType === 2) {
          getMemberReportNotSignUpDepositMemberAPI({
            dateType: 'W',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else {
          getMemberReportNotSignUpDepositMemberAPI({
            dateType: 'M',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        }
      } else {
        this.allMemberDepositNotSignUpTable = true;
        if (this.timeRangeType === 1) {
          getMemberReportNotSignUpDepositMemberAPI({
            dateType: 'D',
            startDate: this.dayDateTime[0],
            endDate: this.dayDateTime[1],
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else if (this.timeRangeType === 2) {
          getMemberReportNotSignUpDepositMemberAPI({
            dateType: 'W',
            startDate: this.weekDateTimeStart,
            endDate: this.weekDateTimeEnd,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else {
          getMemberReportNotSignUpDepositMemberAPI({
            dateType: 'M',
            startDate: this.monthDateTime[0],
            endDate: this.monthDateTime[1],
          }).then(res => {
            this.detailTable = res.data.data;
          });
        }
      }
    },
    openMemberActiveTable(data) {
      if (data) {
        this.memberActiveTable = true;
        if (this.timeRangeType === 1) {
          getMemberReportActiveMember({
            dateType: 'D',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else if (this.timeRangeType === 2) {
          getMemberReportActiveMember({
            dateType: 'W',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else {
          getMemberReportActiveMember({
            dateType: 'M',
            startDate: data.reportDate,
            endDate: data.reportDate,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        }
      } else {
        this.allMemberActiveTable = true;
        if (this.timeRangeType === 1) {
          getMemberReportActiveMember({
            dateType: 'D',
            startDate: this.dayDateTime[0],
            endDate: this.dayDateTime[1],
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else if (this.timeRangeType === 2) {
          getMemberReportActiveMember({
            dateType: 'W',
            startDate: this.weekDateTimeStart,
            endDate: this.weekDateTimeEnd,
          }).then(res => {
            this.detailTable = res.data.data;
          });
        } else {
          getMemberReportActiveMember({
            dateType: 'M',
            startDate: this.monthDateTime[0],
            endDate: this.monthDateTime[1],
          }).then(res => {
            this.detailTable = res.data.data;
          });
        }
      }
    },
    openImage() {
      this.chartTableData = {};
      this.memberRetentionRateTable = true;
      Object.assign(this.chartTableData, {
        columns: ['reportDate', 'repMemberSignUpCnt', 'repMemberRetentionRate'],
        rows: this.tableData,
      });
    },
  },
  mounted() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 7);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.dayDateTime = [startDate, endDate];

    getMemberReportTotalAPI({
      dateType: 'D',
      startDate: this.dayDateTime[0],
      endDate: this.dayDateTime[1],
    }).then(res => {
      this.tableDataSummary = res.data.data;
    })
    getMemberReportAPI({
      dateType: 'D',
      startDate: this.dayDateTime[0],
      endDate: this.dayDateTime[1],
    }).then(res => {
      this.tableData = res.data.data;
    });
  },
}
</script>

<style lang="scss" scoped>
.member--note {
  display: flex;
  .member--note--type {
    flex: 0 0 15px;
    span {
      border: 1px solid;
      padding: 1px;
    }
  }
  .member--note--content {
    flex: 0 0 160px;
    .member--note--datetime {
      color: #909399;
      font-size: 13px;
    }
  }
}
</style>
