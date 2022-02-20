<template lang="pug">
  .container-fluid
    //-=== title ===
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 代理管理
      //-member action add
      .col-6.d-flex.justify-content-end
        el-button(v-if="$store.state.member.user_page_auth.Add_Auth==1", @click='getAgencyAdd()', size="medium", type='primary') 新增代理 
    //-=== search ===
    .row.no-gutters.px-3.py-3.d-flex
      el-form(ref="form.search" :model="form.search" :inline="true",label-suffix="：")
        //-input
        el-form-item(label = '代理帳號')
          el-input(size='medium', v-model='form.search.AgencyId', clearable='', placeholder='代理帳號')
        //-select
        el-form-item(label = '類型')
          el-select(v-model='form.search.AgencyType', size='medium', placeholder='選擇類型')
            el-option(label='全部', value="" ,key="")
            el-option(v-for='item in agencyTypeOption', :key='item.value', :label='item.label', :value='item.value')
        //-select
        el-form-item(label = '狀態')
          el-select(v-model='form.search.Status', size='medium', placeholder='選擇狀態')
            el-option(label='全部', value="",key="")
            el-option(v-for='item in agencyStatusOption', :key='item.value', :label='item.label', :value='item.value')
        //-date-picker
        el-form-item(label = '期間')
          el-date-picker.select-wstyle(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='form.search.Time', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
        //-button
        el-form-item
          el-button.button-wstyle(size="medium", type='primary', @click='submitSearchForm()', :loading='isLoading') 搜 尋
    //-=== main ===
    .row.no-gutters.px-3
      //-pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData() }", :total='pages.total')
      //-table list
      .col-12
        template
          el-table(:data='dataList', stripe='', border='', style='width:100%')
            el-table-column(prop='AgencyCode', label='代理編號')
            el-table-column(prop='AgencyId', label='代理帳號')
            el-table-column(prop='AgencyName', label='代理名稱')
            el-table-column(prop='PromotionLink', label='推廣連結', width='200')
            el-table-column(prop='AgencyType', label='代理類型')
              template(slot-scope='scope') {{agencyTypeLabel[scope.row.AgencyType]}}
            el-table-column(prop='Status', label='狀態')
              template(slot-scope='scope') {{agencyStatusLabel[scope.row.Status]}} 
            el-table-column(prop='Create_At', label='啟用時間')
            el-table-column(label='操作', width='260')
              template(slot-scope='scope')
                div
                  a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1",@click="getAgency(scope.row.AgencyId)") 詳細資料
                div
                  a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1", @click="getAgencyUpdate(scope.row.AgencyId)") 資料修改
                div
                  a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1", @click="getAgencyCommission(scope.row.AgencyId)") 佣金管理
                div
                  a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1 && scope.row.Status==='2'", @click="setAgencyStatus(scope.$index)") 解除鎖定 
                div
                  a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1", @click="setCashFromBack(scope.$index)") 代理錢包金額異動
      //-pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      //-=== dialog ==
      //-- dialog.agencyAdd --
      //-- form.agency --
      el-dialog(title='新增代理', :visible.sync='dialog.agencyAdd')
        el-form.mr-3(:model="form.agency", :rules="rules.agency", ref="form.agency", status-icon,label-suffix="：")
          el-form-item(label="代理編號" , prop="AgencyCode" , label-width="150px" ,:error="errorMsg.AgencyCode")
            el-input(v-model="form.agency.AgencyCode" , placeholder='輸入代理編號' )
          el-form-item(label="代理帳號" , prop="AgencyId" , label-width="150px" ,:error="errorMsg.AgencyId")
            el-input(v-model="form.agency.AgencyId" , placeholder='輸入代理帳號' )
          el-form-item(label="預設密碼" , prop="Password" , label-width="150px",:error="errorMsg.Password" )
            el-input(v-model="form.agency.Password" , placeholder='輸入預設密碼')
          el-form-item(label="代理名稱" , prop="AgencyName" , label-width="150px",:error="errorMsg.AgencyName" )
            el-input(v-model="form.agency.AgencyName" , placeholder='輸入代理名稱')
          el-form-item(label="真實姓名" , prop="AgencyRealName" , label-width="150px" ,:error="errorMsg.AgencyRealName")
            el-input(v-model="form.agency.AgencyRealName" , placeholder='輸入真實姓名' )
          el-form-item(label="信箱" , prop="Email" , label-width="150px" ,:error="errorMsg.AgencyCode")
            el-input(v-model="form.agency.Email" , placeholder='輸入信箱')
          el-form-item(label="代理類型" , prop="AgencyType" , label-width="150px" ,:error="errorMsg.AgencyType")
            el-select(v-model='form.agency.AgencyType', size='medium', placeholder='選擇類型')
              el-option(v-for='item in agencyTypeOption', :key='item.value', :label='item.label', :value='item.value')
          el-form-item(label="老虎城帳號" , prop="TigerUserName" , label-width="150px" ,:error="errorMsg.TigerUserName")
            el-input(v-model="form.agency.TigerUserName" , placeholder='輸入老虎城帳號')
          el-form-item(label="手機" , prop="Phone" , label-width="150px",:error="errorMsg.Phone" )
            el-input(v-model="form.agency.Phone" , placeholder='輸入手機')
          el-form-item(label="QQ帳號" , prop="QQAccount" , label-width="150px",:error="errorMsg.QQAccount" )
            el-input(v-model="form.agency.QQAccount" , placeholder='輸入QQ帳號')
          el-form-item(label="微信帳號" , prop="WechatAccount" , label-width="150px",:error="errorMsg.WechatAccount" )
            el-input(v-model="form.agency.WechatAccount" , placeholder='輸入微信帳號')
          el-form-item(label="推廣連結" , prop="PromotionLink" , label-width="150px" ,:error="errorMsg.PromotionLink")
            el-input(v-model="form.agency.PromotionLink" , placeholder='輸入推廣連結')
          el-form-item(label="備註" , prop="Note" , label-width="150px" ,:error="errorMsg.Note")
             el-input(v-model="form.agency.Note" , placeholder='備註',type="textarea")
          el-form-item(label="帳號狀態" , prop="Status" , label-width="150px" ,:error="errorMsg.Status")
            el-switch(v-model='form.agency.Status',  active-text="開啟",inactive-text="凍結") 
        .dialog-footer(slot='footer')
          el-button(@click='dialog.agencyAdd = false,isLoading=false') 取 消
          el-button(type='primary', @click='submitAgencyAdd()', :loading='isLoading') 確 認
      //-- dialog.agencyUpdate --
      //-- form.agency --
      el-dialog(title='資料修改', :visible.sync='dialog.agencyUpdate')
        //-- dialog.agencyPhoneDelete
        el-dialog(title='刪除手機', :visible.sync='dialog.agencyPhoneDelete',append-to-body,width="30%")
          span 確認刪除手機
          .dialog-footer(slot='footer')
            el-button(@click='dialog.agencyPhoneDelete = false') 取 消
            el-button(type='primary', @click='submitAgencyPhoneDelete()', :loading='isLoading') 確 認
        el-form.mr-3(:model="form.agencyUpdate", :rules="rules.agencyUpdate", ref="form.agencyUpdate", status-icon,label-suffix="：")
          el-form-item(label="代理編號" , label-width="150px" ,:error="errorMsg.AgencyCode" )
            span {{form.agencyUpdate.AgencyCode}}
          el-form-item(label="代理帳號", label-width="150px" ,:error="errorMsg.AgencyId")
            span {{form.agencyUpdate.AgencyId}}
          el-form-item(label="密碼" , prop="Password" , label-width="150px" ,:error="errorMsg.Password")
            el-input(v-model="form.agencyUpdate.Password" , placeholder='輸入密碼' )
          el-form-item(label="代理名稱" , prop="AgencyName" , label-width="150px" ,:error="errorMsg.AgencyName")
            el-input(v-model="form.agencyUpdate.AgencyName" , placeholder='輸入代理名稱')
          el-form-item(label="真實姓名" , prop="AgencyRealName" , label-width="150px" ,:error="errorMsg.AgencyRealName")
            el-input(v-model="form.agencyUpdate.AgencyRealName" , placeholder='輸入真實姓名' )
          el-form-item(label="信箱" , prop="Email" , label-width="150px" ,:error="errorMsg.Email")
            el-input(v-model="form.agencyUpdate.Email" , placeholder='輸入信箱')
          el-form-item(label="代理類型" , prop="AgencyType" , label-width="150px",:error="errorMsg.AgencyType" )
            span {{agencyTypeLabel[form.agencyUpdate.AgencyType]}}
          el-form-item(label="老虎城帳號" , prop="TigerUserName" , label-width="150px" ,:error="errorMsg.TigerUserName")
            el-input(v-model="form.agencyUpdate.TigerUserName" , placeholder='輸入老虎城帳號')
          el-form-item(label="手機" , prop="Phone" , label-width="150px" ,:error="errorMsg.Phone")
            span {{form.agencyUpdate.Phone}} 
            el-button(v-if="form.agencyUpdate.Phone", type="danger" ,icon="el-icon-delete", circle ,:style="padding='3px'" ,@click="dialog.agencyPhoneDelete = true" )
          el-form-item(label="QQ帳號" , prop="QQAccount" , label-width="150px",:error="errorMsg.QQAccount" )
            el-input(v-model="form.agencyUpdate.QQAccount" , placeholder='輸入QQ帳號')
          el-form-item(label="微信帳號" , prop="WechatAccount" , label-width="150px" ,:error="errorMsg.WechatAccount")
            el-input(v-model="form.agencyUpdate.WechatAccount" , placeholder='輸入微信帳號')
          el-form-item(label="推廣連結" , prop="PromotionLink" , label-width="150px" ,:error="errorMsg.PromotionLink")
            el-input(v-model="form.agencyUpdate.PromotionLink" , placeholder='輸入推廣連結')
          el-form-item(label="備註" , prop="Note" , label-width="150px" ,:error="errorMsg.Note")
             el-input(v-model="form.agencyUpdate.Note" , placeholder='備註',type="textarea")
          el-form-item( label="帳號狀態" , prop="Status" , label-width="150px" ,:error="errorMsg.Status")
            el-switch(v-if="form.agencyUpdate.Status !== '2'",v-model='form.agencyUpdate.Status',  active-text="正常",inactive-text="凍結") 
            span(v-else) {{agencyStatusLabel[form.agencyUpdate.Status]}} 
        .dialog-footer(slot='footer')
          el-button(@click='dialog.agencyUpdate = false') 取 消
          el-button(type='primary', @click='submitAgencyUpdate()', :loading='isLoading') 確 認
      //-- dialog.agencyShow --
      el-dialog(title='詳細資料', :visible.sync='dialog.agencyShow',width="80%")
        //-- dialog.agencyBankDelete
        el-dialog(title='刪除銀行卡', :visible.sync='dialog.agencyBankDelete',append-to-body,width="30%")
          span 確認刪除銀行卡
          .dialog-footer(slot='footer')
            el-button(@click='dialog.agencyBankDelete = false') 取 消
            el-button(type='primary', @click='submitAgencyBankDelete()', :loading='isLoading') 確 認
        //-- dialog.agencyBankUpdate
        el-dialog(title='修改銀行卡', :visible.sync='dialog.agencyBankUpdate', ,append-to-body,width="30%")
          el-form.mr-3(:model="form.agencyBank", :rules="rules.agencyBank", ref="form.agencyBank", status-icon)
            el-form-item(label='銀行卡號', prop="AccountNo", label-width="120px" ,label-position='left')
              el-input(v-model='form.agencyBank.AccountNo', placeholder='請輸入銀行卡號')
            el-form-item(label='開戶行', prop="AccountBank", label-width="120px" ,label-position='left')
              el-select(v-model='form.agencyBank.AccountBank', placeholder='選擇開戶行')
                el-option(v-for='(item,index) in bankCodeOption', :key='index', :label='item.BankName', :value='index')
            el-form-item(label='省份', prop="Province", label-width="120px" ,label-position='left')
              el-select(v-model='form.agencyBank.Province', placeholder='選擇省份', @change="form.agencyBank.City='', form.agencyBank.State = '' ")
                el-option(v-for='(item, index) in this.$store.state.location.province', :key='index', :label='item', :value='index')
            el-form-item(label='城市', prop="City", label-width="120px" ,label-position='left')
              el-select(v-model='form.agencyBank.City', placeholder='選擇城市', @change="form.agencyBank.State = ''")
                el-option(v-for='(item, index) in this.$store.state.location.city[form.agencyBank.Province]', :key='index', :label='item', :value='index')
            el-form-item(label='區域', prop="State", label-width="120px" ,label-position='left')
              el-select(v-model='form.agencyBank.State', placeholder='選擇區域')
                el-option(v-for='(item, index) in this.$store.state.location.area[form.agencyBank.City]', :key='index', :label='item', :value='index')
            el-form-item(label='狀態', prop="Status", label-width="120px" ,label-position='left')
              el-select(v-model='form.agencyBank.Status', placeholder='選擇狀態')
                el-option(label='驗證中', value="0")
                el-option(label='正常', value="1")
                el-option(label='無效', value="2")
          .dialog-footer(slot='footer')
            el-button(@click='dialog.agencyBankUpdate = false') 取 消
            el-button(type='primary', @click='submitAgencyBankUpdate()', :loading='isLoading') 確 認
        el-form.mr-3(:model="form.agencyShow",  ref="form.agencyShow", status-icon)
          el-form-item(label="代理編號" , label-width="150px" )
           span {{form.agencyShow.AgencyCode}}
          el-form-item(label="代理帳號"  , label-width="150px" )
           span {{form.agencyShow.AgencyId}}
          el-form-item(label="代理名稱" , prop="AgencyName" , label-width="150px" )
           span {{form.agencyShow.AgencyName}}
          el-form-item(label="真實姓名" , prop="AgencyRealName" , label-width="150px" )
           span {{form.agencyShow.AgencyRealName}}
          el-form-item(label="信箱" , prop="Email" , label-width="150px" )
           span {{form.agencyShow.Email}}
          el-form-item(label="代理類型" , prop="AgencyType" , label-width="150px" )
            span {{agencyTypeLabel[form.agencyShow.AgencyType]}}
          el-form-item(label="老虎城帳號" , prop="TigerUserName" , label-width="150px" )
           span {{form.agencyShow.TigerUserName}}
          el-form-item(label="手機" , prop="Phone" , label-width="150px" )
           span {{form.agencyShow.Phone}}
          el-form-item(label="銀行卡" ,  label-width="150px" )
            template
              el-table(:data='bankDataList', stripe='', border='', style='width:100%')
                el-table-column(prop='AccountName', label='銀行戶名', width='130')
                el-table-column(prop='AccountBank', label='開戶行', width='130')
                el-table-column(prop='address', label='分行地點', width='130')
                el-table-column(prop='AccountNo', label='銀行卡號', width='200')
                el-table-column(prop='Create_At', label='設定時間', width='130')
                el-table-column(label='操作', width='260')
                  template(slot-scope='scope')
                    div
                      a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1",@click="getAgencyBankUpdate(scope.$index)") 修改
                    div
                      a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1", @click="getAgencyBankDelete(scope.$index)") 刪除
          el-form-item(label="QQ帳號" , prop="QQAccount" , label-width="150px" )
           span {{form.agencyShow.QQAccount}}
          el-form-item(label="微信帳號" , prop="WechatAccount" , label-width="150px" )
           span {{form.agencyShow.WechatAccount}}
          el-form-item(label="推廣連結" , prop="PromotionLink" , label-width="150px" )
           span {{form.agencyShow.PromotionLink}}
          el-form-item(label="備註" , prop="Note" , label-width="150px" )
           span {{form.agencyShow.Note}}
          el-form-item(label="帳號狀態" , prop="Status" , label-width="150px" )
           span {{agencyStatusLabel[form.agencyShow.Status]}}
        .dialog-footer(slot='footer')
          el-button(@click='dialog.agencyShow = false') 關閉
      //-- dialog.agencyStatusShow --
      el-dialog(title='詳細資料', :visible.sync='dialog.agencyStatusShow')
        span 解除 {{dialog.content.AgencyId }} 代理後台登錄鎖定
        .dialog-footer(slot='footer')
            el-button(@click='dialog.agencyStatusShow = false') 取 消
            el-button(type='primary', @click='submitAgencyStatus(dialog.content.AgencyId,dialog.content.index )', :loading='isLoading') 確 認
      //-- dialog.cashFromBack --
      el-dialog(title='代理錢包金額異動', :visible.sync='dialog.cashFromBack')
        el-form.mr-3(:model="form.cashFromBack",:rules="rules.cashFromBack"  ref="form.cashFromBack", status-icon,label-suffix="：")
          el-form-item(label="代理帳號"  , label-width="150px" )
            span {{form.cashFromBack.AgencyId}}
          el-form-item(label="異動金額" , prop="ModifyCash" , label-width="150px" ,type="number")
            el-input-number(v-model="form.cashFromBack.ModifyCash" , placeholder='異動金額(正為上分，負為扣分)' ,:precision="2")
          el-form-item(label="備註" , prop="Notes" , label-width="150px" )
            el-input(v-model="form.cashFromBack.Notes" , placeholder='輸入備註' ,type="textarea")
        .dialog-footer(slot='footer')
            el-button(@click='dialog.cashFromBack = false') 取 消
            el-button(type='primary', @click='submitCashFromBack()', :loading='isLoading') 確 認
      //-- dialog.agencyAdd --
      //-- form.agency --
      el-dialog(title='佣金管理', :visible.sync='dialog.agencyCommission',width="800px")
        el-dialog(v-if="form.agencyCommission.AgencyId!=='0'",title='還原預設值', :visible.sync='dialog.agencyCommissionBack',append-to-body,width="30%")
          span 確認還原預設值
          .dialog-footer(slot='footer')
            el-button(@click='dialog.agencyCommissionBack = false') 取 消
            el-button(type='primary', @click='submitAgencyCommissionBack(form.agencyCommission.AgencyId)', :loading='isLoading') 確 認
        //-- form
        el-form.mr-3(:model="form.agencyCommission", :rules="rules.agencyCommission", ref="form.agencyCommission", status-icon,label-suffix="：")
          //- el-form-item(label="代理帳號"  , label-width="150px" )
          //-   span {{form.agencyCommission.AgencyId}}
          //-- Level 1
          el-form-item(label="階段一"  , label-width="150px" ,label-suffix="")  
          el-form-item(label="人數"  , label-width="150px"  )  
            el-row
              el-col( :span="8")
                el-form-item(  prop="ActiveNum_S_1")  
                  el-input-number(v-model.number="form.agencyCommission.ActiveNum_S_1"  ) 
              el-col(:span="1" ) ~
              el-col( :span="8")
                el-form-item(  prop="ActiveNum_E_1")  
                  el-input-number(v-model.number="form.agencyCommission.ActiveNum_E_1" )
          el-form-item(label="淨盈利"  , label-width="150px"  )  
            el-row
              el-col(:span="8" )
                el-form-item(  prop="NetEarnings_S_1")  
                  el-input-number(v-model.number="form.agencyCommission.NetEarnings_S_1" ,:precision="2") 
              el-col(:span="1" ) ~
              el-col(:span="8")
                el-form-item(  prop="NetEarnings_E_1")
                  el-input-number(v-model.number="form.agencyCommission.NetEarnings_E_1"  ,:precision="2")
          el-form-item(label="佣金比例"  , label-width="150px" ,  prop="CommPercent_1" )  
            el-row
              el-col(:span="8" )
                el-input-number(v-model.number="form.agencyCommission.CommPercent_1"  ,:precision="2") 
          //-- level 2
          el-form-item(label="階段二"  , label-width="150px" )  
          el-form-item(label="人數"  , label-width="150px"  )  
            el-row
              el-col(:span="8" )
                el-form-item(  prop="ActiveNum_S_2")  
                  el-input-number(v-model.number="form.agencyCommission.ActiveNum_S_2" ) 
              el-col(:span="1" ) ~
              el-col(:span="8")
                el-form-item(  prop="ActiveNum_E_2")  
                  el-input-number(v-model.number="form.agencyCommission.ActiveNum_E_2"  )
          el-form-item(label="淨盈利"  , label-width="150px"  )  
            el-row
              el-col(:span="8" )
                el-form-item(  prop="NetEarnings_S_2")  
                  el-input-number(v-model.number="form.agencyCommission.NetEarnings_S_2" ,:precision="2") 
              el-col(:span="1" ) ~
              el-col(:span="8")
                el-form-item(  prop="NetEarnings_E_2")
                  el-input-number(v-model.number="form.agencyCommission.NetEarnings_E_2" ,:precision="2" )
          el-form-item(label="佣金比例"  , label-width="150px" ,  prop="CommPercent_2" )  
            el-row
              el-col(:span="8" )
                el-input-number(v-model.number="form.agencyCommission.CommPercent_2"  ,:precision="2") 
          //-- level 3
          el-form-item(label="階段三"  , label-width="150px" )  
          el-form-item(label="人數"  , label-width="150px"  )  
            el-row
              el-col(:span="8" )
                el-form-item(  prop="ActiveNum_S_3")  
                  el-input-number(v-model.number="form.agencyCommission.ActiveNum_S_3" ) 
              el-col(:span="1" ) ~
              el-col(:span="8")
                el-form-item(  prop="ActiveNum_E_3")  
                  el-input-number(v-model.number="form.agencyCommission.ActiveNum_E_3" )
          el-form-item(label="淨盈利"  , label-width="150px"  )  
            el-row
              el-col(:span="8" )
                el-form-item(  prop="NetEarnings_S_3")  
                  el-input-number(v-model.number="form.agencyCommission.NetEarnings_S_3" ,:precision="2" ) 
              el-col(:span="1" ) ~
              el-col(:span="8")
                el-form-item(  prop="NetEarnings_E_3")
                  el-input-number(v-model.number="form.agencyCommission.NetEarnings_E_3" ,:precision="2")
          el-form-item(label="佣金比例"  , label-width="150px" ,  prop="CommPercent_3"  )  
            el-row
              el-col(:span="8" )
                el-input-number(v-model.number="form.agencyCommission.CommPercent_3"  ,:precision="2") 
          //-- level 3
          el-form-item(label="階段四"  , label-width="150px" )  
          el-form-item(label="人數"  , label-width="150px"  )  
            el-row
              el-col(:span="8" )
                el-form-item(  prop="ActiveNum_S_3")  
                  el-input-number(v-model.number="form.agencyCommission.ActiveNum_S_4" ) 
              el-col(:span="1" ) ~
              el-col(:span="8")
                el-form-item(  prop="ActiveNum_E_4")  
                  el-input-number(v-model.number="form.agencyCommission.ActiveNum_E_4" )
          el-form-item(label="淨盈利"  , label-width="150px"  )  
            el-row
              el-col(:span="8" )
                el-form-item(  prop="NetEarnings_S_4")  
                  el-input-number(v-model.number="form.agencyCommission.NetEarnings_S_4" ,:precision="2" ) 
              el-col(:span="1" ) ~
              el-col(:span="8")
                el-form-item(  prop="NetEarnings_E_4")
                  el-input-number(v-model.number="form.agencyCommission.NetEarnings_E_4" ,:precision="2")
          el-form-item(label="佣金比例"  , label-width="150px" ,  prop="CommPercent_4"  )  
            el-row
              el-col(:span="8" )
                el-input-number(v-model.number="form.agencyCommission.CommPercent_4"  ,:precision="2") 
          //-- fee
          el-form-item(label="平台費"  , label-width="150px" ) 
          el-form-item(label="老虎機"  , label-width="150px" ,  prop="PlatformFee_1" )  
            el-row
              el-col(:span="8" )
                el-input(v-model.number="form.agencyCommission.PlatformFee_1"  ) 
          el-form-item(label="捕魚"  , label-width="150px" ,  prop="PlatformFee_2" )  
            el-row
              el-col(:span="8" )
                el-input(v-model.number="form.agencyCommission.PlatformFee_2"  ) 
          el-form-item(label="棋牌"  , label-width="150px" ,  prop="PlatformFee_3" )  
            el-row
              el-col(:span="8" )
                el-input(v-model.number="form.agencyCommission.PlatformFee_3"  ) 
          el-form-item(label="街機"  , label-width="150px" ,  prop="PlatformFee_4" )  
            el-row
              el-col(:span="8" )
                el-input(v-model.number="form.agencyCommission.PlatformFee_4"  ) 
        .dialog-footer(slot='footer')
          el-button(@click='dialog.agencyCommission = false') 取 消
          el-button(type='primary', @click='submitAgencyCommission(dialog.content.AgencyId)', :loading='isLoading') 確 認
          el-button(v-if="form.agencyCommission.AgencyId!=='0'",type='success', @click='dialog.agencyCommissionBack = true') 還原預設值
</template>
<script>
export default {
  name: "tgAgencyList",
  data() {
    let validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入預設密碼"));
      } else {
        var regp = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
        if (!regp.test(value)) {
          return callback(new Error("預設密碼必須包含英文数字"));
        }
      }
      callback();
    };
    let validateUpdatePass = (rule, value, callback) => {
      if (typeof value !== "undefined") {
        if (value != "") {
          var regp = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
          if (!regp.test(value)) {
            return callback(new Error("預設密碼必須包含英文数字"));
          }
        }
      }

      callback();
    };

    let validatePhone = (rule, value, callback) => {
      if (typeof value !== "undefined") {
        if (value != "") {
          if (value.indexOf("+") == 0) {
            value = value.substr(1, value.length);
          }
          var regp = /^[0-9]$/;
          if (!regp.test(value)) {
            return callback(new Error("手機格式錯誤"));
          }
        }
      }

      callback();
    };

    let validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入信件"));
      }
      var regp = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/;
      if (!regp.test(value)) {
        return callback(new Error("信件格式錯誤"));
      }
      callback();
    };
    let validateAgencyName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入代理名稱"));
      }
      var regp = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{1,30}$/;
      if (!regp.test(value)) {
        return callback(new Error("代理名稱格式錯誤"));
      }
      callback();
    };

    let validateAgencyRealName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入真實姓名"));
      }
      var regp = /^[\u4e00-\u9fa5]+$/;
      if (!regp.test(value)) {
        return callback(new Error("真實姓名格式錯誤"));
      }
      callback();
    };

    return {
      isLoading: false,
      dataList: [],
      bankDataList: [],
      errorMsg: [],
      pages: {
        now: 1,
        tatal: 0,
        size: 30
      },
      agencyTypeOption: [
        { value: "1", label: "佣金" },
        { value: "2", label: "電銷" }
      ],
      agencyTypeLabel: [],
      agencyStatusOption: [
        { value: "0", label: "凍結" },
        { value: "1", label: "正常" },
        { value: "2", label: "登入鎖定" }
      ],
      bankCodeOption: [],
      agencyStatusLabel: [],
      dialog: {
        content: {},
        agencyAdd: false,
        agencyShow: false,
        agencyUpdate: false,
        agencyPhoneDelete: false,
        agencyStatusShow: false,
        cashFromBack: false,
        agencyCommission: false,
        agencyCommissionBack: false,
        agencyBankUpdate: false,
        agencyBankDelete: false
      },
      form: {
        search: {
          AgencyId: "",
          AgencyType: "",
          Status: "",
          Time: ""
        },
        agency: {
          AgencyId: "",
          Password: "",
          AgencyType: "",
          AgencyCode: "",
          AgencyName: "",
          AgencyRealName: "",
          TigerUserName: "",
          WechatAccount: "",
          QQAccount: "",
          Email: "",
          Phone: "",
          PromotionLink: "",
          Status: true
        },
        agencyShow: {},
        agencyUpdate: {},
        cashFromBack: {
          AgencyId: "",
          ModifyCash: "",
          Notes: ""
        },
        agencyCommissionCheck: {},
        agencyCommission: {
          method: "",
          AgencyId: "",
          ActiveNum_S_1: "",
          ActiveNum_E_1: "",
          NetEarnings_S_1: "",
          NetEarnings_E_1: "",
          CommPercent_1: "",
          ActiveNum_S_2: "",
          ActiveNum_E_2: "",
          NetEarnings_S_2: "",
          NetEarnings_E_2: "",
          CommPercent_2: "",
          ActiveNum_S_3: "",
          ActiveNum_E_3: "",
          NetEarnings_S_3: "",
          NetEarnings_E_3: "",
          CommPercent_3: "",
          ActiveNum_S_4: "",
          ActiveNum_E_4: "",
          NetEarnings_S_4: "",
          NetEarnings_E_4: "",
          CommPercent_4_4: "",
          PlatformFee_1: "",
          PlatformFee_2: "",
          PlatformFee_3: "",
          PlatformFee_4: ""
        },
        agencyBank: {
          AgencyId: "",
          AccountNo: "",
          AccountBank: "",
          AccountName: "",
          Province: "",
          City: "",
          State: "",
          Status: "0"
        }
      },
      rules: {
        agency: {
          AgencyId: [
            { required: true, message: "請輸入代理帳號", trigger: "change" }
          ],
          Password: [
            { validator: validatePass, trigger: "change", required: true }
          ],
          AgencyType: [
            {
              required: true,
              message: "請選擇代理類型",
              trigger: "change"
            }
          ],
          AgencyCode: [
            { required: true, message: "請輸入代理編號", trigger: "change" }
          ],
          AgencyName: [{ validator: validateAgencyName, trigger: "change" }],
          AgencyRealName: [
            { validator: validateAgencyRealName, trigger: "change" }
          ],
          Status: [
            {
              required: true
            }
          ],
          Email: [
            { validator: validateEmail, trigger: "change", required: true }
          ],
          Phone: [{ validator: validatePhone }]
        },
        agencyUpdate: {
          Password: [{ validator: validateUpdatePass, trigger: "change" }],
          AgencyCode: [
            { required: true, message: "請輸入代理編號", trigger: "change" }
          ],
          AgencyName: [{ validator: validateAgencyName, trigger: "change" }],
          AgencyRealName: [
            { validator: validateAgencyRealName, trigger: "change" }
          ],
          Status: [
            {
              required: true
            }
          ],
          Email: [
            { validator: validateEmail, trigger: "change", required: true }
          ]
        },
        cashFromBack: {
          ModifyCash: [
            { required: true, message: "請輸入異動金額", trigger: "change" },
            { type: "number", message: "異動金額為數字" }
          ],
          Notes: [{ required: true, message: "請輸入備註", trigger: "change" }],
          AgencyId: [{ required: true }]
        },
        agencyCommission: {
          method: [{ required: true }],
          AgencyId: [{ required: true }],
          ActiveNum_S_1: [
            { required: true, message: "請輸入人數", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          ActiveNum_E_1: [
            { required: true, message: "請輸入人數", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          NetEarnings_S_1: [
            { required: true, message: "請輸入淨盈利", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          NetEarnings_E_1: [
            { required: true, message: "請輸入淨盈利", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          CommPercent_1: [
            { required: true, message: "請輸入佣金比例", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          ActiveNum_S_2: [
            { required: true, message: "請輸入人數", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          ActiveNum_E_2: [
            { required: true, message: "請輸入人數", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          NetEarnings_S_2: [
            { required: true, message: "請輸入淨盈利", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          NetEarnings_E_2: [
            { required: true, message: "請輸入淨盈利", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          CommPercent_2: [
            { required: true, message: "請輸入佣金比例", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          ActiveNum_S_3: [
            { required: true, message: "請輸入人數", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          ActiveNum_E_3: [
            { required: true, message: "請輸入人數", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          NetEarnings_S_3: [
            { required: true, message: "請輸入淨盈利", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          NetEarnings_E_3: [
            { required: true, message: "請輸入淨盈利", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          CommPercent_3: [
            { required: true, message: "請輸入佣金比例", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          ActiveNum_S_4: [
            { required: true, message: "請輸入人數", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          ActiveNum_E_4: [
            { required: true, message: "請輸入人數", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          NetEarnings_S_4: [
            { required: true, message: "請輸入淨盈利", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          NetEarnings_E_4: [
            { required: true, message: "請輸入淨盈利", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          CommPercent_4: [
            { required: true, message: "請輸入佣金比例", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          PlatformFee_1: [
            { required: true, message: "請輸入平台費", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          PlatformFee_2: [
            { required: true, message: "請輸入平台費", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          PlatformFee_3: [
            { required: true, message: "請輸入平台費", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ],
          PlatformFee_4: [
            { required: true, message: "請輸入平台費", trigger: "change" },
            { type: "number", message: "請輸入數字" }
          ]
        },
        agencyBank: {
          Sn: [
            {
              required: true,
              message: "請填寫銀行卡號",
              trigger: "change"
            }
          ],
          AgencyId: [
            {
              required: true,
              message: "請填寫銀行卡號",
              trigger: "change"
            }
          ],
          AccountNo: [
            {
              required: true,
              message: "請填寫銀行卡號",
              trigger: "change"
            }
          ],
          AccountBank: [
            {
              required: true,
              message: "請選擇開戶行",
              trigger: "change"
            }
          ],
          Province: [
            {
              required: true,
              message: "請選擇省份",
              trigger: "change"
            }
          ],
          City: [
            {
              required: true,
              message: "請選擇城市",
              trigger: "change"
            }
          ],
          Status: [
            {
              type: "enum",
              enum: ["0", "1", "2"],
              required: true,
              message: "請選擇狀態",
              trigger: "change"
            }
          ]
        }
      }
    };
  },
  mounted() {
    let self = this;
    this.agencyTypeOption.forEach(function(element) {
      self.agencyTypeLabel[element.value] = element.label;
    });
    this.agencyStatusOption.forEach(function(element) {
      self.agencyStatusLabel[element.value] = element.label;
    });
    this.getData();
  },
  methods: {
    getData(now_page) {
      let self = this;
      if (now_page) self.pages.now = now_page;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryAgencyUserList/",
        data: {
          AgencyId: self.form.search.AgencyId,
          AgencyType: self.form.search.AgencyType,
          Status: self.form.search.Status,
          Date_S: self.form.search.Time[0],
          Date_E: self.form.search.Time[1],
          Page: self.pages.now,
          PageLimit: self.pages.size
        }
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.pages.total = parseInt(response.data.data.total_rows);
            self.dataList = response.data.data.data_list;
          }
          self.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    resetForm(form) {
      if (this.$refs[form]) {
        this.$refs[form].resetFields();
        this.$refs[form].clearValidate();
      }
    },
    submitSearchForm() {
      this.isLoading = true;
      this.getData();
    },
    //-- 開啟刪除代理銀行卡
    getAgencyBankDelete(index) {
      this.form.agencyBank = this.bankDataList[index];
      this.dialog.agencyBankDelete = true;
    },
    //-- 開啟修改代理銀行卡
    getAgencyBankUpdate(index) {
      // 取得使用者銀行卡管理介面銀行列表
      let self = this;
      self.bankCodeOption = [];
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_Payment/GetUserBankList",
        data: { AgencyId: self.bankDataList[index].AgencyId }
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.bankCodeOption = response.data.data;
            // 開頁面
            self.dialog.agencyBankUpdate = true;
            // 塞資料
            self.form.agencyBank = self.bankDataList[index];
          } else {
            self.$message.error(
              "使用者銀行卡管理介面取得失敗： " + response.data.error_message
            );
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    // 取得代理詳細資料
    getAgency(AgencyId) {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_Admin/GetAgencyDetail/",
        data: {
          AgencyId: AgencyId
        }
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.form.agencyShow = response.data.data;
            self.dialog.agencyShow = true;

            // 取得銀行卡資料
            return axios({
              method: "post",
              url:
                process.env.VUE_APP_APIHOST + "Agency_Payment/AgencyBankList",
              data: {
                AgencyId: AgencyId
              }
            })
              .then(function(response) {
                if (response.data.status == 1) {
                  self.bankDataList = response.data.data;
                  let address = "";
                  for (var key in self.bankDataList) {
                    if (
                      self.$store.state.location.province[
                        self.bankDataList[key].Province
                      ]
                    ) {
                      address =
                        self.$store.state.location.province[
                          self.bankDataList[key].Province
                        ];
                      if (
                        self.$store.state.location.city[
                          self.bankDataList[key].Province
                        ][self.bankDataList[key].City]
                      )
                        address +=
                          self.$store.state.location.city[
                            self.bankDataList[key].Province
                          ][self.bankDataList[key].City];
                      if (
                        self.$store.state.location.area[
                          self.bankDataList[key].City
                        ] &&
                        self.bankDataList[key].State
                      ) {
                        address +=
                          self.$store.state.location.area[
                            self.bankDataList[key].City
                          ][self.bankDataList[key].State];
                      }
                    }
                    self.bankDataList[key].address = address;
                  }
                } else {
                  self.$message.error(
                    "銀行卡資料取得失敗： " + response.data.error_message
                  );
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            self.$message.error(
              "詳細資料取得失敗： " + response.data.error_message
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAgencyUpdate(AgencyId) {
      this.resetForm("form.agencyUpdate");
      let self = this;
      this.errorMsg = {};

      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_Admin/GetAgencyDetail/",
        data: {
          AgencyId: AgencyId
        }
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.form.agencyUpdate = response.data.data;
            if (self.form.agencyUpdate.Status <= 1) {
              self.form.agencyUpdate.Status =
                self.form.agencyUpdate.Status == 1 ? true : false;
            }
            self.dialog.agencyUpdate = true;
          } else {
            self.$message.error(
              "詳細資料取得失敗： " + response.data.error_message
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAgencyCommission(AgencyId) {
      let self = this;
      this.dialog.content = {};

      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetAgencyCommission/",
        data: {
          AgencyId: AgencyId
        }
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.form.agencyCommission = response.data.data;
            for (var key in self.form.agencyCommission) {
              self.form.agencyCommissionCheck[key] =
                self.form.agencyCommission[key];
            }
            self.dialog.content.AgencyId = AgencyId;
            self.dialog.agencyCommission = true;
          } else {
            self.$message.error(
              "詳細資料取得失敗： " + response.data.error_message
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAgencyAdd() {
      this.resetForm("form.agency");
      this.dialog.agencyAdd = true;
      this.errorMsg = {};
    },
    setAgencyStatus(index) {
      this.dialog.content = {};
      this.dialog.content = this.dataList[index];
      this.dialog.content.index = index;
      this.dialog.agencyStatusShow = true;
    },
    setCashFromBack(index) {
      this.resetForm("form.cashFromBack");
      this.form.cashFromBack.AgencyId = this.dataList[index].AgencyId;
      this.dialog.cashFromBack = true;
    },
    // 修改銀行卡
    submitAgencyBankUpdate() {
      let self = this;
      this.$refs["form.agencyBank"].validate(valid => {
        if (valid) {
          let formData = new FormData();
          let updateField = [
            "Sn",
            "AccountBank",
            "AccountName",
            "AccountNo",
            "State",
            "Province",
            "City",
            "Status"
          ];
          for (var key in self.form.agencyBank) {
            if (
              self.form.agencyBank[key] !== null &&
              updateField.indexOf(key) >= 0
            ) {
              formData.append(key, self.form.agencyBank[key]);
            }
          }

          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST +
              "Agency_Payment/AgencyBankManage/Edit",
            data: formData
          })
            .then(function(response) {
              if (response.data.status) {
                self.$message({
                  message: "更新成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "更新失敗： " + response.data.error_message
                );
              }
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            })
            .finally(function() {
              self.dialog.agencyBankUpdate = false;
              self.isLoading = false;
              self.getAgency(self.form.agencyBank.AgencyId);
            });
        } else {
          this.isLoading = false;
          return false;
        }
      });
    },
    submitAgencyBankDelete() {
      let self = this;
      let formData = new FormData();
      formData.append("Sn", self.form.agencyBank["Sn"]);
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST +
          "Agency_Payment/AgencyBankManage/Delete",
        data: formData
      })
        .then(function(response) {
          if (response.data.status) {
            self.$message({
              message: "刪除銀行卡成功",
              type: "success"
            });
          } else {
            self.$message.error("刪除失敗： " + response.data.error_message);
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.dialog.agencyBankDelete = false;
          self.isLoading = false;
          self.getAgency(self.form.agencyBank.AgencyId);
        });
    },
    submitAgencyAdd() {
      let self = this;
      this.isLoading = true;
      this.$refs["form.agency"].validate(valid => {
        if (valid) {
          let formData = new FormData();
          for (var key in this.form.agency) {
            if (key == "Status") {
              let statusValue = this.form.agency[key] ? "1" : "0";
              formData.append(key, statusValue);
            } else formData.append(key, this.form.agency[key]);
          }
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Agency_Member/MemberRegister",
            data: formData
          })
            .then(function(response) {
              if (response.data.status) {
                self.$message({
                  message: "更新成功",
                  type: "success"
                });
                self.dialog.agencyAdd = false;
                self.getData();
              } else {
                self.errorMsg = {};
                console.log(response.data.error_code);
                if (response.data.error_code == "80005") {
                  response.data.other = JSON.parse(response.data.other);
                  if (response.data.other && response.data.other.length > 0) {
                    response.data.other.forEach(function(element) {
                      let elValues = Object.values(element);
                      let elValueSplit = elValues[0].split("=");
                      self.errorMsg[elValueSplit[0]] = "輸入的資料錯誤";
                    });
                  }
                } else {
                  self.$message.error(
                    "新增失敗： " + response.data.error_message
                  );
                }
              }
            })
            .catch(function(error) {
              // self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            })
            .finally(function() {
              //self.dialog.agencyAdd = false;
              self.isLoading = false;
            });
        } else {
          this.isLoading = false;
          return false;
        }
      });
    },
    submitAgencyPhoneDelete() {
      let self = this;
      this.isLoading = true;
      let formData = new FormData();
      formData.append("AgencyId", this.form.agencyUpdate.AgencyId);
      formData.append("Phone", "Del");
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/AgencyManage/",
        data: formData
      })
        .then(function(response) {
          if (response.data.status) {
            self.$message({
              message: "刪除成功",
              type: "success"
            });
          } else {
            self.$message.error("刪除失敗： " + response.data.error_message);
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.dialog.agencyPhoneDelete = false;
          self.isLoading = false;
          self.getAgencyUpdate(self.form.agencyUpdate.AgencyId);
        });
    },
    submitAgencyUpdate() {
      let self = this;
      this.isLoading = true;
      this.$refs["form.agencyUpdate"].validate(valid => {
        if (valid) {
          let formData = new FormData();
          for (var key in self.form.agencyUpdate) {
            switch (key) {
              case "Status":
                let statusValue = self.form.agencyUpdate[key];
                // statusValue = 2;
                if (statusValue != 2)
                  statusValue = self.form.agencyUpdate[key] ? "1" : "0";
                formData.append(key, statusValue);
                break;
              case "agencyCode":
              case "agencyType":
              case "AgencyManage":
                //- Unable to update these fields
                break;
              default:
                if (self.form.agencyUpdate[key] !== null) {
                  formData.append(key, self.form.agencyUpdate[key]);
                }
            }
          }
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/AgencyManage/",
            data: formData
          })
            .then(function(response) {
              if (response.data.status) {
                self.$message({
                  message: "更新成功",
                  type: "success"
                });
                self.dialog.agencyUpdate = false;
                self.getData();
              } else {
                self.errorMsg = {};
                if (response.data.error_code == "80005") {
                  response.data.other = JSON.parse(response.data.other);
                  if (response.data.other && response.data.other.length > 0) {
                    response.data.other.forEach(function(element) {
                      let elValues = Object.values(element);
                      let elValueSplit = elValues[0].split("=");
                      self.errorMsg[elValueSplit[0]] = "輸入的資料錯誤";
                    });
                  }
                } else {
                  self.$message.error(
                    "更新失敗： " + response.data.error_message
                  );
                }
              }
            })
            .catch(function(error) {
              //self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            })
            .finally(function() {
              self.isLoading = false;
            });
        } else {
          this.isLoading = false;
          return false;
        }
      });
    },
    submitAgencyStatus(AgencyId, index) {
      let self = this;
      this.isLoading = true;
      let formData = new FormData();
      formData.append("AgencyId", AgencyId);
      formData.append("Status", 1);
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/AgencyManage/",
        data: formData
      })
        .then(function(response) {
          if (response.data.status) {
            self.$message({
              message: "更新成功",
              type: "success"
            });
          } else {
            self.$message.error("更新失敗： " + response.data.error_message);
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.dataList[index].Status = 1;
          self.dialog.agencyStatusShow = false;
          self.isLoading = false;
        });
    },
    submitCashFromBack() {
      let self = this;
      this.isLoading = true;
      this.$refs["form.cashFromBack"].validate(valid => {
        if (valid) {
          let formData = new FormData();
          for (var key in self.form.cashFromBack) {
            formData.append(key, self.form.cashFromBack[key]);
          }
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "Agency_WalletAll/UserCashFromBack",
            data: formData
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
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            })
            .finally(function() {
              self.dialog.cashFromBack = false;
              self.isLoading = false;
            });
        } else {
          this.isLoading = false;
          return false;
        }
      });
    },
    submitAgencyCommission(AgencyId) {
      //- 當沒有設定時，回傳AgencyId＝0，資料為預設值
      //- 當agencyCommissionCheck.AgencyId＝0且資料agencyCommission與預設agencyCommissionCheck相同不動作
      //- 當agencyCommissionCheck.AgencyId＝0且資料agencyCommission與預設agencyCommissionCheck不同為新增
      //- 當AgencyId!=0且資料與設定資料不同為修改
      let self = this;
      let manageMethod = "";
      let manageMethodLabel = "";
      this.isLoading = true;
      if (self.form.agencyCommissionCheck.AgencyId == 0) {
        let checkData = true;
        for (var key in self.form.agencyCommission) {
          if (
            self.form.agencyCommission[key] !=
            self.form.agencyCommissionCheck[key]
          )
            checkData = false;
        }
        // 不動作
        if (checkData) {
          self.$message({
            message: "新增成功",
            type: "success"
          });
          self.dialog.agencyCommission = false;
          self.isLoading = false;
          return false;
        }
        // 新增
        else {
          manageMethod = "Add";
          manageMethodLabel = "新增";
          self.form.agencyCommission.AgencyId = AgencyId;
        }
      }
      // 編輯
      else {
        if (self.form.agencyCommissionCheck.AgencyId == AgencyId) {
          manageMethod = "Edit";
          manageMethodLabel = "修改";
        } else {
          manageMethod = "Add";
          manageMethodLabel = "新增";
          self.form.agencyCommission.AgencyId = AgencyId;
        }
      }

      this.$refs["form.agencyCommission"].validate(valid => {
        if (valid) {
          let formData = new FormData();
          for (var key in self.form.agencyCommission) {
            formData.append(key, self.form.agencyCommission[key]);
          }
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST +
              "Admin/AgencyCommissionManage/" +
              manageMethod,
            data: formData
          })
            .then(function(response) {
              if (response.data.status) {
                self.$message({
                  message: manageMethodLabel + "成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  manageMethodLabel + "失敗： " + response.data.error_message
                );
              }
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            })
            .finally(function() {
              self.dialog.agencyCommission = false;
              self.isLoading = false;
            });
        } else {
          this.isLoading = false;
          return false;
        }
      });
    },
    submitAgencyCommissionBack(AgencyId) {
      let self = this;
      this.isLoading = true;
      let formData = new FormData();
      formData.append("AgencyId", AgencyId);
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Admin/AgencyCommissionManage/Delete",
        data: formData
      })
        .then(function(response) {
          if (response.data.status) {
            self.$message({
              message: "還原成功",
              type: "success"
            });
          } else {
            self.$message.error("還原失敗： " + response.data.error_message);
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.dialog.agencyCommission = false;
          self.dialog.agencyCommissionBack = false;
          self.isLoading = false;
        });
    }
  }
};
</script>
