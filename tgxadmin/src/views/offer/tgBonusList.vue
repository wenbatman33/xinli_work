<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 優惠列表
      .col-6.d-flex.justify-content-end
        el-button(v-if="$store.state.member.user_page_auth.Add_Auth==1", @click='newDialog = true', size="medium", type='primary') 新增優惠 
    .row.no-gutters.px-3.py-3
      .col-md-6.col-12.py-1
        el-input(size='medium', placeholder='輸入優惠名稱', v-model='search_offerName', @keyup.enter.native="get_data(1)")
          el-button(slot='append', icon='el-icon-search', @click="get_data(1)", :loading='lock_btn')
      .col-md-1.col-12.py-1.d-flex.justify-content-center
        el-button(size='medium', type="text", v-on:click='toggletosee = !toggletosee, formInit()', transition="fade") 進階搜尋
          i.el-icon-arrow-down.el-icon--right
    //--advance search
    .row.no-gutters.px-3.pb-3.advsearch-style(v-show='toggletosee')
      .col
        .row.px-3.py-3
          .col-12.pb-3 搜尋滿足以下條件的項目：
          .col-12
            el-form(v-show='toggletosee', label-width='80px', label-position='left')
              .row
                .col-md-6.col-12
                  el-form-item(label='優惠類型')
                    el-select(size="medium", v-model='search_type', filterable='', placeholder='選擇優惠類型')
                      el-option(v-for='(item,key) in sourceoption', :key='item.value', :label='item.label', :value='item.value')
                .col-md-6.col-12
                  el-form-item(label='優惠狀態')
                    el-select(size="medium", v-model='search_status', filterable='', placeholder='選擇優惠狀態')
                      el-option(v-for='item in statusoption', :key='item.value', :label='item.label', :value='item.value')
                .col-md-6.col-12
                  el-form-item(label='優惠起始')
                    el-date-picker(size="medium", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='至', start-placeholder='開始日期', end-placeholder='結束日期')
                .col-md-6.col-12.d-flex.justify-content-end
                  el-form-item
                    el-button(size="medium", v-on:click='toggletosee = !toggletosee, formInit()') 取消
                    el-button(size="medium", type='primary', @click='get_data(1)', :loading='lock_btn') 搜尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%')
            el-table-column(prop='Sn', label='優惠代號', width='80', align='center')
            el-table-column(prop='status', label='狀態', width='80', align='center')
              template(slot-scope='scope')
                el-tag(:type="scope.row.color", disable-transitions='') {{scope.row.StateCode_str}}
            el-table-column(prop='OfferType_str', label='優惠類型', width='155')
            el-table-column(prop='OfferName', label='優惠名稱')
            el-table-column(prop='StartDate', label='開始時間', width='170')
            el-table-column(prop='EndDate', label='結束時間', width='170')
            el-table-column(prop='Update_At', label='更新時間', width='170')
            el-table-column(label='操作', width='260')
              template(slot-scope='scope')
                a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1", @click="get_offer(scope.row.Sn,'update')", type='text') 修改
                a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1 && scope.row.UserLevel == '1' ", @click="get_vip_offer(scope.row.Sn)", type='text') VIP優惠
                a.links(@click="get_offer(scope.row.Sn,'view')", type='text') 明細
                router-link.links(:to="{name:'tgBonusNames', query:{Sn:scope.row.Sn}}") 名單
                a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1 || $store.state.member.user_page_auth.Edit_Auth==1", @click="offer_sn=scope.row.Sn; editDialog = true", type='text') 新增名單
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    //--popup
    //----add
    el-dialog(title='新增優惠', :visible.sync='newDialog', @close="init_dialog('add_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='優惠類型', prop="offer_type", label-width="170px" ,label-position='left')
          el-select.button-wstyle(v-model='form.offer_type', placeholder='選擇優惠類型', clearable)
            el-option(v-if="item.value", v-for='(item,key) in sourceoption', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='優惠時間', prop="offer_date", label-width="170px" ,label-position='left')
          el-date-picker(v-model='form.offer_date', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='開始日期', end-placeholder='結束日期', :default-time="['00:00:00', '23:59:59']")
        el-form-item(label='優惠名稱', prop="offer_name", label-width="170px" ,label-position='left')
          el-input(v-model='form.offer_name', placeholder='輸入優惠名稱')
        el-form-item(label='優惠內容', prop="offer_content", label-width="170px" ,label-position='left')
          el-input.textarea-style(v-model='form.offer_content', type='textarea', placeholder='輸入優惠內容')
        el-form-item(label='優惠方式', prop="bonus_type", label-width="170px" ,label-position='left')
         el-radio-group(v-model='form.bonus_type')
            el-radio(v-for='btitem in bonus_type_option', :label='btitem.value', :key='btitem.value') {{btitem.label}}
        el-form-item(label='金額與優惠', prop="ange_data", label-width="170px" ,label-position='left')
          el-row
            el-col(:span="5" ) 最小金額
            el-col(:span="5",:offset="1") 最大金額
            el-col(:span="5",:offset="1") 優惠金額
          el-form-item(v-for='(rdata,index) in range_data' :key="index"  :prop="'range_data' + index" :rules="rules.range_data" ) 
            el-row(:style="{ marginBottom: '4px' }" )
              el-col(:span="5" )
                el-input( v-model="rdata.Above", type="number", placeholder='最小金額')
              el-col(:span="5",:offset="1")
                el-input(v-model="rdata.Below", type="number", placeholder='最大金額')
              el-col(:span="5",:offset="1")
                el-input(v-model="rdata.BonusTypeValue", type="number", placeholder='優惠金額')
              el-col(:span="5",:offset="1" v-if="index>0")
                el-button(@click='del_range_data(index)') 刪除
          el-row
            el-button(@click='add_range_data') 新增一行
        el-form-item(label='優惠單日上限', prop="max_offer", label-width="170px" ,label-position='left')
          el-input(v-model='form.max_offer', type="number", placeholder='輸入優惠單日上限')
        el-form-item(label='活動期間總優惠上限', prop="max_offer_active", label-width="170px" ,label-position='left')
          el-input(v-model='form.max_offer_active', type="number", placeholder='輸入活動期間總優惠上限')
        el-form-item(label='申請逾期天數', prop="must_use_day", label-width="170px" ,label-position='left')
          el-input(v-model='form.must_use_day', type="number", placeholder='輸入申請逾期天數')
        el-form-item(label='提款限制倍數', prop="withdraw_multiple", label-width="170px" ,label-position='left')
          el-input(v-model='form.withdraw_multiple', type="number", placeholder='輸入提款限制倍數')
        el-form-item(label='轉帳限制類型', prop="bonus_limit_type", label-width="170px" ,label-position='left')
          el-radio-group(v-model='form.bonus_limit_type')
            el-radio(v-for='item in bonus_limit_type_option', :label='item.value', :key='item.value') {{item.label}}
        el-form-item(label='轉帳限制倍數', prop="bonus_limit_multiple", label-width="170px" ,label-position='left')
          el-input(v-model='form.bonus_limit_multiple', type="number", placeholder='輸入轉帳限制倍數')
        el-form-item(label='限制轉入平台', prop="game_group", label-width="170px" ,label-position='left')
          el-checkbox-group.limit_platform(v-model='form.game_group' ,@change="checkBoxListValue('game_group')")
            el-checkbox(v-for='item in game_group_option', :label='item.value', :key='item.value') {{item.label}}
        el-form-item(label='系統審核額度', prop="auto_max_num", label-width="170px" ,label-position='left')
          el-input(v-model='form.auto_max_num', type="number", placeholder='輸入系統審核額度')
        el-form-item(label='派送數量限制', prop="deliver_limit", label-width="170px" ,label-position='left')
          el-input(v-model='form.deliver_limit', type="number", placeholder='輸入派送數量限制')
        el-form-item(label='不可同時參與優惠活動', prop="more_offer_type", label-width="170px" ,label-position='left')
          el-select.button-wstyle(v-model='form.more_offer_type', multiple, placeholder='選擇不可同時參與優惠活動', clearable)
            el-option(v-for='item in tableData', :key='item.Sn', :label='item.OfferName', :value='item.Sn')
        el-form-item(label='啟用VIP優惠', prop="use_vip_range", label-width="170px" ,label-position='left')
          el-switch(v-model='form.use_vip_range', active-color='#13ce66', inactive-color='#ff4949' , active-value='1' , inactive-value='0')
        el-form-item(label='狀態', prop="status", label-width="170px" ,label-position='left')
          el-select.button-wstyle(v-model='form.status', placeholder='選擇申請類型', clearable)
            el-option(label='下架', value='0')
            el-option(label='上架中', value='1')
            el-option(label='測試中', value='2')
        el-form-item(label='適用遊戲類型', prop="AllowGameType",label-width="170px" , label-position='left')
          el-checkbox-group.limit_platform(v-model='form.AllowGameType',@change="checkBoxListValue('AllowGameType')")
            el-checkbox(v-for='(value,key) in group_option', :label='key', :key='key')  {{value}}
        el-form-item(label='適用遊戲平台', prop="AllowGroupId", label-width="170px" ,label-position='left')
            el-checkbox-group.limit_platform(v-model='form.AllowGroupId',@change="checkBoxListValue('AllowGroupId')")
              el-checkbox(v-for='item in game_group_option', :label='item.value', :key='item.value') {{item.label}}
        el-form-item(label='適用遊戲編號', prop="AllowGameId", label-width="170px" ,label-position='left')
            el-input(v-model='form.AllowGameId', placeholder='輸入派送數量限制')
            
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_offer()', :loading='lock_btn') 確 認
    //----edit
    el-dialog(title='修改優惠', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='優惠類型', prop="offer_type", label-width="170px" ,label-position='left')
          el-select.button-wstyle(v-model='form.offer_type', placeholder='選擇優惠類型', clearable)
            el-option(v-if="item.value", v-for='(item,key) in sourceoption', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='優惠時間', prop="offer_date", label-width="170px" ,label-position='left')
          el-date-picker(v-model='form.offer_date', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='開始日期', end-placeholder='結束日期', :default-time="['00:00:00', '23:59:59']")
        el-form-item(label='優惠名稱', prop="offer_name", label-width="170px" ,label-position='left')
          el-input(v-model='form.offer_name', placeholder='輸入優惠名稱')
        el-form-item(label='優惠內容', prop="offer_content", label-width="170px" ,label-position='left')
          el-input.textarea-style(v-model='form.offer_content', type='textarea', placeholder='輸入優惠內容')
        el-form-item(label='優惠方式', prop="bonus_type", label-width="170px" ,label-position='left')
         el-radio-group(v-model='form.bonus_type')
            el-radio(v-for='item in bonus_type_option', :label='item.value', :key='item.value') {{item.label}}
        el-form-item(label='金額與優惠', prop="ange_data", label-width="170px" ,label-position='left')
          el-row
            el-col(:span="5" ) 最小金額
            el-col(:span="5",:offset="1") 最大金額
            el-col(:span="5",:offset="1") 優惠金額
          el-form-item(v-for='(rdata,index) in form.range_data' :key="index"  :prop="'range_data' + index" :rules="rules.range_data")
            el-row(:style="{ marginBottom: '4px' }" )
              el-col(:span="5" )
                el-input( v-model="rdata.Above", type="number", placeholder='最小金額')
              el-col(:span="5",:offset="1")
                el-input(v-model="rdata.Below", type="number", placeholder='最大金額')
              el-col(:span="5",:offset="1")
                el-input(v-model="rdata.BonusTypeValue", type="number", placeholder='優惠金額')
              el-col(:span="5",:offset="1" v-if="index>0")
                el-button(@click='del_range_data(index)') 刪除
          el-row
            el-button(@click='add_range_data') 新增一行
        el-form-item(label='優惠單日上限', prop="max_offer", label-width="170px" ,label-position='left')
          el-input(v-model='form.max_offer', type="number", placeholder='輸入優惠單日上限')
        el-form-item(label='活動期間總優惠上限', prop="max_offer_active", label-width="170px" ,label-position='left')
          el-input(v-model='form.max_offer_active', type="number", placeholder='輸入活動期間總優惠上限')
        el-form-item(label='申請逾期天數', prop="must_use_day", label-width="170px" ,label-position='left')
          el-input(v-model='form.must_use_day', type="number", placeholder='輸入申請逾期天數')
        el-form-item(label='提款限制倍數', prop="withdraw_multiple", label-width="170px" ,label-position='left')
          el-input(v-model='form.withdraw_multiple', type="number", placeholder='輸入提款限制倍數')
        el-form-item(label='轉帳限制類型', prop="bonus_limit_type", label-width="170px" ,label-position='left')
          el-radio-group(v-model='form.bonus_limit_type')
            el-radio(v-for='item in bonus_limit_type_option', :label='item.value', :key='item.value') {{item.label}}
        el-form-item(label='轉帳限制倍數', prop="bonus_limit_multiple", label-width="170px" ,label-position='left')
          el-input(v-model='form.bonus_limit_multiple', type="number", placeholder='輸入轉帳限制倍數')
        el-form-item(label='限制轉入平台', prop="game_group", label-width="170px" ,label-position='left')
          el-checkbox-group(v-model='form.game_group',@change="checkBoxListValue('game_group')")
            el-checkbox(v-for='item in game_group_option', :label='item.value', :key='item.value') {{item.label}}
        el-form-item(label='系統審核額度', prop="auto_max_num", label-width="170px" ,label-position='left')
          el-input(v-model='form.auto_max_num', type="number", placeholder='輸入系統審核額度')
        el-form-item(label='派送數量限制', prop="deliver_limit", label-width="170px" ,label-position='left')
          el-input(v-model='form.deliver_limit', type="number", placeholder='輸入派送數量限制')
        el-form-item(label='不可同時參與優惠活動', prop="more_offer_type", label-width="170px" ,label-position='left')
          el-select.button-wstyle(v-model='form.more_offer_type', multiple, placeholder='選擇不可同時參與優惠活動', clearable)
            el-option(v-for='item in tableData', :key='item.Sn', :label='item.OfferName', :value='item.Sn')
        el-form-item(label='啟用VIP優惠', prop="use_vip_range", label-width="170px" ,label-position='left')
          el-switch(v-model='form.use_vip_range', active-color='#13ce66', inactive-color='#ff4949' , active-value='1' , inactive-value='0')
        el-form-item(label='狀態', prop="status", label-width="170px" ,label-position='left')
          el-select.button-wstyle(v-model='form.status', placeholder='選擇申請類型', clearable)
            el-option(label='下架', value='0')
            el-option(label='上架中', value='1')
            el-option(label='測試中', value='2')
        el-form-item(label='適用遊戲類型', prop="AllowGameType",label-width="170px" , label-position='left')
          el-checkbox-group.limit_platform(v-model='form.AllowGameType',@change="checkBoxListValue('AllowGameType')")
            el-checkbox(v-for='(value,key) in group_option', :label='key', :key='key')  {{value}}
        el-form-item(label='適用遊戲平台', prop="AllowGroupId", label-width="170px" ,label-position='left')
            el-checkbox-group.limit_platform(v-model='form.AllowGroupId',@change="checkBoxListValue('AllowGroupId')")
              el-checkbox(v-for='item in game_group_option', :label='item.value', :key='item.value') {{item.label}}
        el-form-item(label='適用遊戲編號', prop="AllowGameId", label-width="170px" ,label-position='left')
            el-input(v-model='form.AllowGameId', placeholder='輸入派送數量限制')
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_offer()', :loading='lock_btn') 確 認
    //----show_form
    el-dialog(title='優惠明細', :visible.sync='viewDialog', @close="init_dialog('show_form')")
      el-form.mr-3(:model="form", ref="show_form")
        el-form-item(label='優惠類型：', prop="offer_type", label-width="170px" ,label-position='left')
          span(v-for='(item,key) in sourceoption' v-if="item.value == form.offer_type") {{item.label}}
        el-form-item(label='優惠時間：', prop="offer_date", label-width="170px" ,label-position='left')
          span {{form.offer_date[0]}} - 
          span {{form.offer_date[1]}}
        el-form-item(label='優惠名稱：', prop="offer_name", label-width="170px" ,label-position='left')
          span {{form.offer_name}}
        el-form-item(label='優惠內容：', prop="offer_content", label-width="170px" ,label-position='left')
          span {{form.offer_content}}
        el-form-item(label='優惠方式：', type="number", prop="bonus_type", label-width="170px" ,label-position='left')
          sapn  {{(form.bonus_type == 1)?"固定值":"比例(%)"}} 
        el-form-item(label='金額與優惠', prop="range_data", label-width="170px" ,label-position='left')
          el-row
            el-col(:span="5" ) 最小金額
            el-col(:span="5",:offset="1") 最大金額
            el-col(:span="5",:offset="1") 優惠金額
          el-row(v-for='rditem in form.range_data')
            el-col(:span="5" ) {{rditem.Above}}
            el-col(:span="5",:offset="1") {{rditem.Below}} 
            el-col(:span="5",:offset="1") {{rditem.BonusTypeValue}}
        el-form-item(label='優惠單日上限：', prop="max_offer", label-width="170px" ,label-position='left')
          span {{form.max_offer}}
        el-form-item(label='活動期間總優惠上限：', prop="max_offer_active", label-width="170px" ,label-position='left')
          span {{form.max_offer_active}}
        el-form-item(label='申請逾期天數：', prop="must_use_day", label-width="170px" ,label-position='left')
          span {{form.must_use_day}}
        el-form-item(v-if="form.withdraw_multiple > 50", label='提款限制：', prop="withdraw_multiple", label-width="170px" ,label-position='left')
          span {{form.withdraw_multiple}}元
        el-form-item(v-else, label='提款限制倍數：', prop="withdraw_multiple", label-width="170px" ,label-position='left')
          span {{form.withdraw_multiple}}倍
        el-form-item(label='轉帳限制類型：', prop="bonus_limit_type", label-width="170px" ,label-position='left')
          sapn  {{(form.bonus_limit_type == 1)?"流水倍數":"紅利倍數"}} 
        el-form-item(label='轉帳限制倍數：', prop="bonus_limit_multiple", label-width="170px" ,label-position='left')
          span {{form.bonus_limit_multiple}}倍
        el-form-item(label='限制轉入平台：', prop="game_group", label-width="170px" ,label-position='left')
          span(v-for='item in game_group_option' v-if="form.game_group.indexOf(item.value) != -1") {{item.label}} 
        el-form-item(label='系統審核額度：', prop="auto_max_num", label-width="170px" ,label-position='left')
          span {{form.auto_max_num}}
        el-form-item(label='派送數量限制：', prop="deliver_limit", label-width="170px" ,label-position='left')
          span(v-if="form.deliver_limit > 0") {{form.deliver_limit}}
        el-form-item(label='不可同時參與優惠活動：', prop="more_offer_type", label-width="170px" ,label-position='left')
          div(v-for='item in tableData' v-if="form.more_offer_type.indexOf(item.Sn) != -1") {{item.OfferName}}
        el-form-item(label='啟用VIP優惠：', prop="use_vip_range", label-width="170px" ,label-position='left')
          span(v-if="form.use_vip_range =='0'") 否
          span(v-if="form.use_vip_range =='1'") 是
        el-form-item(label='狀態：', prop="status", label-width="170px" ,label-position='left')
          span(v-if="form.status =='0'") 下架
          span(v-if="form.status =='1'") 上架中
          span(v-if="form.status =='2'") 測試中

        el-form-item(label='適用遊戲類型：', prop="AllowGameType", label-width="170px" ,label-position='left')
          span(v-for='item in form.AllowGameType' ) {{group_option[item]}} 
        el-form-item(label='適用遊戲平台：', prop="AllowGroupId", label-width="170px" ,label-position='left')
          span(v-for='item in game_group_option' v-if="form.AllowGroupId.indexOf(item.value) != -1") {{item.label}} 
        el-form-item(label='適用遊戲編號：', prop="AllowGameId", label-width="170px" ,label-position='left')
          span {{form.AllowGameId}}

      .dialog-footer(slot='footer')
        el-button(@click='viewDialog = false') 取 消
    //----list_form
    el-dialog(title='新增名單', :visible.sync='editDialog', @close="init_dialog('list_form')")
      el-form.mr-3(:model="list_form", :rules="list_rules", ref="list_form", status-icon)
        el-form-item(label='會員帳號', prop="username", label-width="170px" ,label-position='left')
          el-input(v-model='list_form.username', placeholder='輸入會員帳號')
        el-form-item(label='會員標籤', prop="member_tag", label-width="170px" ,label-position='left')
          el-select(v-model='list_form.member_tag', size='medium', placeholder='請選擇會員標籤', clearable)
            el-option-group(v-for='group in member_tag_option', :key='group.label', :label='group.label')
              el-option(v-for='item in group.options', :key='item.TagId', :label="item.TagName", :value='item.TagId')
        el-form-item(label='優惠金額', prop="bonus", label-width="170px" ,label-position='left')
          el-input(v-model='list_form.bonus', placeholder='輸入優惠金額')
        el-form-item(label='提款限制倍數', prop="withdraw_multiple", label-width="170px" ,label-position='left')
          el-input(v-model='list_form.withdraw_multiple', placeholder='輸入提款限制倍數')
        el-form-item(label='備註', prop="note", label-width="170px" ,label-position='left')
          el-input(v-model='list_form.note', placeholder='輸入備註')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_list()', :loading='lock_btn') 確 認
    //----vipDialog
    el-dialog(title='VIP優惠設定', :visible.sync='vipDialog', @close="init_dialog()", width="70%")
      table.table.table-bordered
        thead
          tr
            th(style="width:90px")
            th 鐵會員
            th 1★
            th 2★
            th 3★
            th 4★
            th 5★
            th 6★
            th 7★
            th 8★
        tbody
          tr
            th 紅利比例
            td
              el-input(type='number', v-model='vip_form[1].OfferRate')
            td
              el-input(type='number', v-model='vip_form[2].OfferRate')
            td
              el-input(type='number', v-model='vip_form[3].OfferRate')
            td
              el-input(type='number', v-model='vip_form[4].OfferRate')
            td
              el-input(type='number', v-model='vip_form[5].OfferRate')
            td
              el-input(type='number', v-model='vip_form[6].OfferRate')
            td
              el-input(type='number', v-model='vip_form[7].OfferRate')
            td
              el-input(type='number', v-model='vip_form[8].OfferRate')
            td
              el-input(type='number', v-model='vip_form[9].OfferRate')
          tr
            th 紅利上限
            td
              el-input(type='number', v-model='vip_form[1].MaxOffer')
            td
              el-input(type='number', v-model='vip_form[2].MaxOffer')
            td
              el-input(type='number', v-model='vip_form[3].MaxOffer')
            td
              el-input(type='number', v-model='vip_form[4].MaxOffer')
            td
              el-input(type='number', v-model='vip_form[5].MaxOffer')
            td
              el-input(type='number', v-model='vip_form[6].MaxOffer')
            td
              el-input(type='number', v-model='vip_form[7].MaxOffer')
            td
              el-input(type='number', v-model='vip_form[8].MaxOffer')
            td
              el-input(type='number', v-model='vip_form[9].MaxOffer')
      .dialog-footer(slot='footer')
        el-button(@click='vipDialog = false') 取 消
        el-button(type='primary', @click='update_vip_offer()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgBonusList",
  mounted() {
    this.formInit();
    this.get_data(1);
    this.get_game_group_option();
    this.get_member_tag_option();
    this.get_offer_type_option();
  },
  data() {
    let validateRangeData = (rule, value, callback) => {
      let isError = false;
      this.range_data.forEach(function(element) {
        if (
          typeof element.Above == "undefined" ||
          typeof element.Below == "undefined" ||
          typeof element.BonusTypeValue == "undefined" ||
          element.Above == "" ||
          element.Below == "" ||
          element.BonusTypeValue == ""
        ) {
          isError = true;
        }
      });
      if (isError) {
        callback(new Error("請輸入金額與優惠"));
      } else {
        callback();
      }
    };
    let has_user = (rule, value, callback) => {
      if (this.list_form.username == "" && this.list_form.member_tag == "") {
        callback(new Error("請輸入會員帳號或會員標籤"));
      } else {
        callback();
      }
    };

    return {
      now_page: 1,
      page_size: 30,
      total_page: 0,
      tableData: [],
      member_tag_option: [],
      sourceoption: {},
      statusoption: [
        { value: "", label: "不限" },
        { value: 0, label: "下架" },
        { value: 1, label: "上架中" },
        { value: 2, label: "測試中" }
      ],
      bonus_type_option: [
        { value: "1", label: "固定值" },
        { value: "2", label: "比例(%)" }
      ],
      range_data: [{ BonusTypeValue: "", Above: "", Below: "" }],
      bonus_limit_type_option: [
        { value: "1", label: "流水倍數" },
        { value: "2", label: "紅利倍數" }
      ],
      game_group_option: [{ value: "0", label: "不限" }],
      group_option: { 0: "不限", 1: "老虎機", 2: "捕魚", 3: "棋牌", 4: "街機" },
      statusvalue: "status0",
      toggletosee: false,
      newDialog: false,
      updateDialog: false,
      viewDialog: false,
      editDialog: false,
      vipDialog: false,
      search_time_range: [],
      search_offerName: "",
      search_status: 1,
      search_type: "",
      lock_btn: false,
      update_id: "",
      offer_sn: "",
      list_form: {
        username: "",
        member_tag: "",
        bonus: "",
        withdraw_multiple: "",
        note: ""
      },
      list_rules: {
        username: [
          {
            validator: has_user,
            trigger: "change"
          }
        ],
        member_tag: [
          {
            validator: has_user,
            trigger: "change"
          }
        ],
        bonus: [
          {
            required: true,
            message: "請輸入優惠金額",
            trigger: "change"
          }
        ],
        withdraw_multiple: [
          {
            required: true,
            message: "請輸入流水限制",
            trigger: "change"
          }
        ],
        note: [
          {
            required: true,
            message: "請輸入備註",
            trigger: "change"
          }
        ]
      },
      form: {
        offer_type: "",
        offer_date: [],
        offer_name: "",
        offer_content: "",
        bonus_type: "1",
        range_data: [{ BonusTypeValue: "", Above: "", Below: "" }],
        max_offer: "",
        max_offer_active: "",
        must_use_day: "",
        withdraw_multiple: "",
        bonus_limit_type: "1",
        bonus_limit_multiple: "",
        game_group: [],
        auto_max_num: "",
        deliver_limit: "",
        more_offer_type: [],
        use_vip_range: "0",
        status: "",
        AllowGameType: [],
        AllowGroupId: [],
        AllowGameId: ""
      },
      rules: {
        offer_type: [
          {
            required: true,
            message: "請輸入優惠類型",
            trigger: "change"
          }
        ],
        offer_date: [
          {
            required: true,
            message: "請選擇優惠時間",
            trigger: "change"
          }
        ],
        offer_name: [
          {
            required: true,
            message: "請輸入優惠名稱",
            trigger: "change"
          }
        ],
        max_offer: [
          {
            required: true,
            message: "請輸入優惠單日上限",
            trigger: "change"
          }
        ],
        must_use_day: [
          {
            required: true,
            message: "請輸入申請逾期天數",
            trigger: "change"
          }
        ],
        range_data: [
          {
            validator: validateRangeData,
            trigger: "change"
          }
        ],
        bonus_type: [
          {
            type: "enum",
            enum: ["1", "2"],
            required: true,
            message: "請選擇優惠方式",
            trigger: "change"
          }
        ],
        bonus_limit_type: [
          {
            type: "enum",
            enum: ["1", "2"],
            required: true,
            message: "請選擇轉帳限制類型",
            trigger: "change"
          }
        ],
        withdraw_multiple: [
          {
            required: true,
            message: "請輸入提款限制倍數",
            trigger: "change"
          }
        ],
        game_group: [
          {
            required: true,
            message: "請輸選擇限制轉入平台",
            trigger: "change"
          }
        ],
        auto_max_num: [
          {
            required: true,
            message: "請輸入系統審核額度",
            trigger: "change"
          }
        ],
        use_vip_range: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇啟用VIP優惠",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "請輸入會員狀態",
            trigger: "change"
          }
        ]
      },
      method: "",
      vip_form: {
        ReferSn: "",
        1: { OfferRate: "", MaxOffer: "" },
        2: { OfferRate: "", MaxOffer: "" },
        3: { OfferRate: "", MaxOffer: "" },
        4: { OfferRate: "", MaxOffer: "" },
        5: { OfferRate: "", MaxOffer: "" },
        6: { OfferRate: "", MaxOffer: "" },
        7: { OfferRate: "", MaxOffer: "" },
        8: { OfferRate: "", MaxOffer: "" },
        9: { OfferRate: "", MaxOffer: "" }
      }
    };
  },
  methods: {
    get_offer_type_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "WalletAll/GetOfferTypeList",
        data: {}
      })
        .then(function(response) {
          let temp = [];
          Object.keys(response.data.data.OfferType).map(function(
            item,
            index,
            array
          ) {
            if (item != 12) {
              temp.push({
                value: item,
                label: response.data.data.OfferType[item]
              });
            }
          });
          self.sourceoption = temp;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_member_tag_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagList",
        data: {}
      })
        .then(function(response) {
          self.member_tag_option = self.groupBy(
            response.data.data.data_list,
            function(row) {
              return [row.GroupName];
            }
          );
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    groupBy(array, get_group_by_name) {
      let groups = [];
      array.forEach(function(row_data) {
        let group_by_name = get_group_by_name(row_data);
        groups[group_by_name] = groups[group_by_name] || [];
        groups[group_by_name].push(row_data);
      });
      return Object.keys(groups).map(function(group_by_name) {
        return {
          label: group_by_name,
          options: groups[group_by_name]
        };
      });
    },
    get_game_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data = response.data.data.filter(function(
            item,
            index,
            array
          ) {
            return item.GroupId != 4;
          });
          response.data.data.forEach(function(item, index, array) {
            self.game_group_option.push({
              value: item.GroupId,
              label: item.GroupName
            });
          });
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    formInit() {
      this.search_status = 1;
      this.search_type = "";
      this.search_time_range = [];
    },
    get_data(now_page) {
      this.lock_btn = true;
      let self = this;
      if (self.search_time_range == null) {
        self.search_time_range = [];
      }
      let payload = {
        OfferName: self.search_offerName,
        Date_S: self.search_time_range[0],
        Date_E: self.search_time_range[1],
        Type: self.search_type,
        Page: now_page,
        PageLimit: self.page_size
      };
      if (!self.search_time_range[0]) {
        payload.Date_S = "2000-01-01";
      }
      if (!self.search_time_range[1]) {
        payload.Date_E = "3000-01-01";
      }
      if (this.search_status !== "") {
        payload["Status"] = this.search_status;
      }
      //取得優惠列表
      axios
        .post(process.env.VUE_APP_APIHOST + "WalletAll/GetOfferInfo", payload)
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            item["OfferType_str"] =
              response.data.other.OfferType[item["OfferType"]];
            switch (item["Status"]) {
              case "0":
                item["color"] = "info";
                item["StateCode_str"] = "下架";
                break;
              case "1":
                item["color"] = "success";
                item["StateCode_str"] = "上架";
                break;
              case "2":
                item["color"] = "warning";
                item["StateCode_str"] = "測試";
                break;
            }
            item["AllowGameType"] = item["AllowGameType"].split(",");
            item["AllowGroupId"] = item["AllowGroupId"].split(",");
          });
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    init_dialog(form) {
      if (form) {
        this.$refs[form].resetFields();
      }
      this.lock_btn = false;
      this.update_id = "";
      this.offer_sn = "";
      this.list_form.username = "";
      this.list_form.member_tag = "";
      this.list_form.bonus = "";
      this.list_form.withdraw_multiple = "";
      this.list_form.note = "";
      this.form.offer_type = "";
      this.form.offer_date = [];
      this.form.offer_name = "";
      this.form.offer_content = "";
      this.form.bonus_type = "1";
      this.range_data = this.form.range_data = [
        { BonusTypeValue: "", Above: "", Below: "" }
      ];
      this.form.max_offer = "";
      this.form.max_offer_active = "";
      this.form.must_use_day = "";
      this.form.withdraw_multiple = "";
      this.form.bonus_limit_type = "1";
      this.form.bonus_limit_multiple = "";
      this.form.game_group = [];
      this.form.auto_max_num = "";
      this.form.deliver_limit = "";
      this.form.more_offer_type = [];
      this.form.use_vip_range = "0";
      this.form.status = "";
      this.method = "";
      this.vip_form = {
        ReferSn: "",
        1: { OfferRate: "", MaxOffer: "" },
        2: { OfferRate: "", MaxOffer: "" },
        3: { OfferRate: "", MaxOffer: "" },
        4: { OfferRate: "", MaxOffer: "" },
        5: { OfferRate: "", MaxOffer: "" },
        6: { OfferRate: "", MaxOffer: "" },
        7: { OfferRate: "", MaxOffer: "" },
        8: { OfferRate: "", MaxOffer: "" },
        9: { OfferRate: "", MaxOffer: "" }
      };
    },
    add_offer() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          let data = new FormData();
          data.append("OfferName", self.form.offer_name);
          data.append("StartDate", self.form.offer_date[0]);
          data.append("EndDate", self.form.offer_date[1]);
          data.append("OfferContent", self.form.offer_content);
          data.append("WithDrawMultiple", self.form.withdraw_multiple);
          data.append("BonusLimitType", self.form.bonus_limit_type);
          if (self.form.bonus_limit_multiple) {
            data.append("BonusLimitMultiple", self.form.bonus_limit_multiple);
          }
          data.append("MaxOffer", self.form.max_offer);
          if (self.form.max_offer_active) {
            data.append("MaxOfferByActive", self.form.max_offer_active);
          }
          data.append("HaveToUseDays", self.form.must_use_day);
          data.append("OfferType", self.form.offer_type);
          data.append("GameGroupId", self.form.game_group.join(","));
          data.append("AutoMaxNum", self.form.auto_max_num);
          if (self.form.deliver_limit) {
            data.append("DeliveryLimit", self.form.deliver_limit);
          }
          data.append("MoreOfferType", self.form.more_offer_type.join(","));
          data.append(
            "CreateUserId",
            self.$store.state.member.user_info.admin_userid
          );
          data.append("UserLevel", self.form.use_vip_range);
          data.append("Status", self.form.status);
          self.form.range_data = self.range_data;
          data.append("BonusType", self.form.bonus_type);
          data.append("RangeData", JSON.stringify(self.form.range_data));

          data.append("AllowGameType", self.form.AllowGameType.join(","));
          data.append("AllowGroupId", self.form.AllowGroupId.join(","));
          data.append("AllowGameId", self.form.AllowGameId);

          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "WalletAll/OfferManage/Add",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data();
                self.$message({
                  message: "新增成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "新增失敗： " + response.data.error_message
                );
              }
              // console.log(response);
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
              // console.log(error);
            })
            .finally(function() {
              self.newDialog = false;
            });
        }
      });
    },
    get_offer(offer_id, action) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "WalletAll/GetOfferInfo",
        data: {
          Sn: offer_id
        }
      })
        .then(function(response) {
          self.update_id = response.data.data.data_list[0].Sn;
          self.form.offer_name = response.data.data.data_list[0].OfferName;
          self.form.offer_date = [
            response.data.data.data_list[0].StartDate,
            response.data.data.data_list[0].EndDate
          ];
          self.form.offer_content =
            response.data.data.data_list[0].OfferContent;
          self.form.bonus_type = response.data.data.data_list[0].BonusType;

          if (response.data.data.data_list[0].RangeData === null) {
            self.form.range_data = self.range_data;
          } else self.range_data = self.form.range_data = response.data.data.data_list[0].RangeData;
          self.form.bonus_limit_type =
            response.data.data.data_list[0].BonusLimitType;
          self.form.bonus_limit_multiple =
            response.data.data.data_list[0].BonusLimitMultiple;
          self.form.max_offer = response.data.data.data_list[0].MaxOffer;
          self.form.max_offer_active =
            response.data.data.data_list[0].MaxOfferByActive;
          self.form.must_use_day =
            response.data.data.data_list[0].HaveToUseDays;
          self.form.offer_type = response.data.data.data_list[0].OfferType;
          self.form.game_group = response.data.data.data_list[0].GameGroupId.split(
            ","
          );
          self.form.auto_max_num = response.data.data.data_list[0].AutoMaxNum;
          self.form.deliver_limit =
            response.data.data.data_list[0].DeliveryLimit;
          if (response.data.data.data_list[0].MoreOfferType) {
            self.form.more_offer_type = response.data.data.data_list[0].MoreOfferType.split(
              ","
            );
          }
          self.form.withdraw_multiple =
            response.data.data.data_list[0].WithDrawMultiple;

          self.form.use_vip_range = response.data.data.data_list[0].UserLevel;
          self.form.status = response.data.data.data_list[0].Status;
          self.form.AllowGameId = response.data.data.data_list[0].AllowGameId;
          if (self.form.AllowGameId == 0) self.form.AllowGameId = "";
          self.form.AllowGroupId = response.data.data.data_list[0].AllowGroupId.split(
            ","
          );
          self.form.AllowGameType = response.data.data.data_list[0].AllowGameType.split(
            ","
          );
          if (action == "update") {
            self.updateDialog = true;
          } else {
            self.viewDialog = true;
          }
          // console.log(response.data.data[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_offer() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("Sn", self.update_id);
          data.append("OfferName", self.form.offer_name);
          data.append("StartDate", self.form.offer_date[0]);
          data.append("EndDate", self.form.offer_date[1]);
          data.append("OfferContent", self.form.offer_content);
          data.append("WithDrawMultiple", self.form.withdraw_multiple);
          data.append("BonusLimitType", self.form.bonus_limit_type);
          if (self.form.bonus_limit_multiple) {
            data.append("BonusLimitMultiple", self.form.bonus_limit_multiple);
          }
          data.append("MaxOffer", self.form.max_offer);
          data.append("MaxOfferByActive", self.form.max_offer_active);
          data.append("HaveToUseDays", self.form.must_use_day);
          data.append("OfferType", self.form.offer_type);
          data.append("GameGroupId", self.form.game_group.join(","));
          data.append("AutoMaxNum", self.form.auto_max_num);
          data.append("DeliveryLimit", self.form.deliver_limit);
          data.append("UserLevel", self.form.use_vip_range);
          data.append("MoreOfferType", self.form.more_offer_type.join(","));
          self.form.range_data = self.range_data;
          data.append("BonusType", self.form.bonus_type);
          data.append("RangeData", JSON.stringify(self.form.range_data));
          data.append(
            "CreateUserId",
            self.$store.state.member.user_info.admin_userid
          );
          data.append("Status", self.form.status);
          data.append("AllowGameType", self.form.AllowGameType.join(","));
          data.append("AllowGroupId", self.form.AllowGroupId.join(","));
          if (self.form.AllowGameId != 0 || self.form.AllowGameId != "")
            data.append("AllowGameId", self.form.AllowGameId);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "WalletAll/OfferManage/Edit",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data();
                self.$message({
                  message: "修改成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "修改失敗： " + response.data.error_message
                );
              }
              // console.log(response);
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
              // console.log(error);
            })
            .finally(function() {
              self.updateDialog = false;
            });
        }
      });
    },
    add_list() {
      let self = this;
      this.$refs["list_form"].validate(valid => {
        if (valid) {
          let data = new FormData();
          data.append("OfferSn", self.offer_sn);
          data.append("UserNameList", self.list_form.username);
          data.append("TagIdList", self.list_form.member_tag);
          data.append("Bonus", self.list_form.bonus);
          data.append("WithDrawMultiple", self.list_form.withdraw_multiple);
          data.append("Notes", self.list_form.note);
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "WalletAll/OfferPenddingListInsert",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.$message({
                  message: "新增成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "新增失敗： " + response.data.error_message
                );
              }
              // console.log(response);
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
              // console.log(error);
            })
            .finally(function() {
              self.editDialog = false;
            });
        }
      });
    },
    get_vip_offer(offer_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "WalletAll/GetLevelOfferList",
        data: {
          ReferSn: offer_id
        }
      })
        .then(function(response) {
          self.vip_form.ReferSn = offer_id;
          if (response.data.data.length == 0) {
            self.method = "Add";
          } else {
            self.method = "Edit";
            response.data.data.forEach(function(item, index, array) {
              self.vip_form[item.Level].OfferRate = item.OfferRate;
              self.vip_form[item.Level].MaxOffer = item.MaxOffer;
              self.vip_form[item.Level].Sn = item.Sn;
            });
          }
          self.vipDialog = true;
          // console.log(response.data.data[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_vip_offer() {
      let self = this;
      let has_empty_flag = false;
      Object.keys(self.vip_form).map(function(row_key, row_index) {
        let row = self.vip_form[row_key];
        Object.keys(row).map(function(value_key, value_index) {
          let value = row[value_key];
          if (value == "") {
            has_empty_flag = true;
          }
        });
      });
      if (has_empty_flag) {
        self.$message.error("請輸入VIP各等級反水比例和上限");
        return;
      }
      self.lock_btn = true;
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST +
          "WalletAll/LevelOfferManage/" +
          self.method,
        data: {
          VIP: JSON.stringify(self.vip_form)
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.get_data();
            self.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            self.$message.error("修改失敗： " + response.data.error_message);
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        })
        .finally(function() {
          self.vipDialog = false;
        });
    },
    add_range_data() {
      this.range_data.push({
        BonusTypeValue: "",
        Above: "",
        Below: ""
      });
    },
    del_range_data(index) {
      this.range_data.splice(index, 1);
    },
    checkBoxListValue(items) {
      let list = this.form[items];
      if (list[list.length - 1] == 0) {
        list = [];
        list.push("0");
      } else {
        list.sort();
        if (list[0] == 0) list.shift();
      }
      this.form[items] = list;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-col-5 {
  text-align: center;
}
table {
  border: 1px solid #ebeef5;
  text-align: center;
  th {
    border: 1px solid #ebeef5;
    vertical-align: middle;
  }
  td {
    border: 1px solid #ebeef5;
    vertical-align: middle;
  }
}
.limit_platform {
  .el-checkbox {
    width: 5%;
  }

  .el-checkbox:first-child {
    margin-left: 30px;
  }
}
</style>
