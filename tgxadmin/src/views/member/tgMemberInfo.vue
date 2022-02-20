<template lang="pug">
  .container-fluid
    //--Card 會員資訊
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 會員資訊
          el-button.py-1.float-right(type='text', @click='passwordDialog = true') 重設密碼
        .row.card-text.item
          span.col-md-4.col-12.py-2 帳號：{{user_info.UserName}} 
            el-tooltip.item(effect='dark', placement='top')
              div(slot='content')
                | 晉級條件：{{vip_info.PayAmount | commaFormat}}/{{vip_info.VipFullAmount | commaFormat}}
              span.mr-1 ({{user_info.VipName}})
          span.col-md-4.col-12.py-2 編號：{{user_info.UserId}}
          span.col-md-4.col-12.py-2 姓名：{{user_info.RealName}}
            el-button.mx-2.py-1(v-if="$store.state.member.user_page_auth.Add_Auth==1 || $store.state.member.user_page_auth.Edit_Auth==1 || $store.state.member.user_page_auth.Del_Auth==1", type='primary', @click="handleResetComfirm('name')", size='medium') 重設
          span.col-md-4.col-12.py-2 生日：{{user_info.Birthday}}
            el-button.mx-2.py-1(v-if="$store.state.member.user_page_auth.Add_Auth==1 || $store.state.member.user_page_auth.Edit_Auth==1 || $store.state.member.user_page_auth.Del_Auth==1", type='primary', @click="handleResetComfirm('birthday')", size='medium') 重設	
          span.col-md-4.col-12.py-2 信箱：{{user_info.Email}}
            i.px-2.align-self-center.el-icon-success.sucess-style(v-if="user_info.EmailStatus == 1")
            i.px-2.align-self-center.el-icon-error.error-style(v-if="user_info.EmailStatus == 0")
          span.col-md-4.col-12.py-2 手機：{{user_info.Phone}}
            i.px-2.align-self-center.el-icon-success.sucess-style(v-if="user_info.PhoneStatus == 1")
            i.px-2.align-self-center.el-icon-error.error-style(v-if="user_info.PhoneStatus == 0")
            el-button.mx-2.py-1(v-if="$store.state.member.user_page_auth.Add_Auth==1 || $store.state.member.user_page_auth.Edit_Auth==1 || $store.state.member.user_page_auth.Del_Auth==1", type='primary', @click="get_user_vertify()", size='medium') 修改驗證方式
          span.col-md-4.col-12.py-2 郵編：{{user_info.Zipcode}}
          span.col-md-4.col-12.py-2 地區：{{user_info.Province}}{{user_info.City}}{{user_info.State}}
          span.col-md-4.col-12.py-2 地址：{{user_info.Address}}
          span.col-md-4.col-12.py-2 註冊時間：{{user_info.Create_At}}
          span.col-md-4.col-12.py-2 最後登入：{{user_info.LastLogin}}
          span.col-md-4.col-12.py-2 來源：{{user_info.Aid}}
            el-button.mx-2.py-1(v-if="$store.state.member.user_page_auth.Add_Auth==1 || $store.state.member.user_page_auth.Edit_Auth==1 || $store.state.member.user_page_auth.Del_Auth==1", type='primary', @click="aidDialog = true; aid_form.aid = user_info.Aid", size='medium') 修改
    //--Card 用戶標籤
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 用戶標籤
          el-button.py-1.float-right(type='text', @click='tagDialog = true') 新增標籤
        .row.card-text.item
          .col
            // el-tooltip(content='YYYY-MM-DD HH:MM:SS {#姓名}', placement='top' )
            el-tag.mx-1.my-1(v-for="item in tag_data", :key="item.Sn", closable='', :disable-transitions='false', @close="handleDeleteTagComfirm(item.Sn)") {{item.GroupName}}／{{item.TagName}}
    //--Card 會員狀態
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 會員狀態
          el-button.py-1.float-right(v-if="$store.state.member.user_page_auth.Add_Auth==1 || $store.state.member.user_page_auth.Edit_Auth==1 || $store.state.member.user_page_auth.Del_Auth==1", type='text', @click='statusDialog = true') 設定
        .row.card-text.item
          span.col-md-4.col-12.py-2 登入狀態：{{user_info.UserStatus_Web_str}}
          span.col-md-4.col-12.py-2 存款狀態：{{user_info.DepositStatus_str}}
          span.col-md-4.col-12.py-2 提款狀態：{{user_info.WithdrawStatus_str}}
          span.col-md-4.col-12.py-2 轉帳狀態：{{user_info.TransferStatus_str}}
          span.col-md-4.col-12.py-2 第三方存款狀態：{{user_info.ThirdPayStatus_str}}
    //--Card 遊戲轉帳狀態
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 遊戲轉帳狀態
          //- el-button.py-1.float-right(type='text', @click='statusDialog = true') 設定
        .row.card-text.item
          span.col-md-4.col-12.py-2(v-for='item in gameGroupList' v-if="item.TransferStatus != 0" ) {{ item.GroupName }}狀態：{{ TransferStatus[item.GroupName] }}
            el-button.mx-2.py-1(v-if="$store.state.member.user_page_auth.Add_Auth==1 || $store.state.member.user_page_auth.Edit_Auth==1 || $store.state.member.user_page_auth.Del_Auth==1", type='primary', @click='PaySetting(item.GroupId)' size='medium') 交易設定
    //--Card 銀行資訊
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 銀行資訊
          el-button.py-1.float-right(v-if="user_info.PhoneStatus == 1 && ($store.state.member.user_page_auth.Add_Auth==1 || $store.state.member.user_page_auth.Edit_Auth==1)", type='text', @click='newCardDialog = true') 新增
        .row.card-text.item
          template
            el-table(:data='bank_table_data', style='width: 100%')
              el-table-column(prop='AccountName', label='戶名', width='120')
              el-table-column(prop='AccountBank', label='開戶行', width='120')
              el-table-column(prop='address', label='分行地點')
              el-table-column(prop='AccountNo', label='銀行卡號', width='170')
              el-table-column(prop='Status_str', label='狀態', width='100', align='center')
              el-table-column(prop='Create_At', label='設定時間', width='170')
              el-table-column(label='操作', width='100')
                template(slot-scope='scope')
                  el-button.button-tablestlye(v-if="($store.state.member.user_page_auth.Add_Auth==1 || $store.state.member.user_page_auth.Edit_Auth==1)", @click='get_bank(scope.row.Sn)', type='text') 修改
                  el-button.button-tablestlye(v-if="($store.state.member.user_page_auth.Add_Auth==1 || $store.state.member.user_page_auth.Edit_Auth==1)", @click='handleDeleteComfirm(scope.row.Sn)', type='text', style='color:#ff4949') 刪除
    //--Dialog
    el-dialog(title='重設密碼', :visible.sync='passwordDialog', @close="init_dialog('password_form')")
      el-form.mr-3(:model="password_form", :rules="password_form_rules", ref="password_form", status-icon)
        el-form-item(label='新密碼', prop="new_password", label-width="100px" ,label-position='left')
          el-input(v-model='password_form.new_password', type="password", placeholder='輸入新密碼', clearable)
        el-form-item(label='確認新密碼', prop="check_new_password", label-width="100px" ,label-position='left')
          el-input(v-model='password_form.check_new_password', type="password", placeholder='再次輸入確認新密碼', clearable)
      .dialog-footer(slot='footer')
        el-button(@click='passwordDialog = false') 取 消
        el-button(type='primary', @click='reset_password()',:loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='修改來源', :visible.sync='aidDialog', @close="init_dialog('aid_form')")
      el-form.mr-3(:model="aid_form", ref="aid_form", status-icon)
        el-form-item(label='來源', label-width="100px" ,label-position='left')
          el-input(v-model='aid_form.aid', placeholder='輸入來源', clearable)
      .dialog-footer(slot='footer')
        el-button(@click='aidDialog = false') 取 消
        el-button(type='primary', @click='update_aid()',:loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='新增標籤', :visible.sync='tagDialog', @close="init_dialog('tag_form')")
      el-form.mr-3(:model="tag_form", :rules="tag_rules", ref="tag_form", status-icon)
        el-form-item(label='會員標籤', prop="member_tag", label-width="88px" ,label-position='left')
          el-select.w-100(v-model='tag_form.member_tag', multiple=true, size='medium', placeholder='請選擇標籤', clearable)
            el-option-group(v-for='group in member_tag_option', :key='group.label', :label='group.label')
              el-option(v-for='item in group.options', :key='item.TagId', :label="item.TagName", :value='item.TagId')
      .dialog-footer(slot='footer')
        el-button(@click='tagDialog = false') 取 消
        el-button(type='primary', @click='add_tag()',:loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='會員狀態設定', :visible.sync='statusDialog', @open="get_status()", @close="init_dialog('status_form')")
      el-form.mr-3(:model="status_form", :rules="status_rules", ref="status_form", status-icon)
        el-form-item(label='登入狀態', prop="user_status_web", label-width="140px" ,label-position='left')
          el-radio-group.ml-3(v-model='status_form.user_status_web')
            el-radio(label='1') 正常
            el-radio(label='0') 凍結
            el-radio(label='2') 登入鎖定
        el-form-item(v-if="status_form.user_status_web == 2", label='鎖定原因', prop="lock_type", label-width="140px" ,label-position='left')
          el-select(size="medium", v-model='status_form.lock_type', @change="set_lock_remark()" filterable='', placeholder='選擇鎖定原因', clearable)
            el-option(v-for='item in lock_type_option', :key='item.TagId', :label='item.TagName', :value='item.TagName')
        el-form-item(v-show="status_form.user_status_web == 2", label='原因預覽', prop="lock_remark", label-width="140px" ,label-position='left')
          textarea(name='editor')
        el-form-item(label='存款狀態', prop="deposit_status", label-width="140px" ,label-position='left')
          el-radio-group.ml-3(v-model='status_form.deposit_status')
            el-radio(label='1') 正常
            el-radio(label='0') 凍結
        el-form-item(label='提款狀態', prop="withdraw_status", label-width="140px" ,label-position='left')
          el-radio-group.ml-3(v-model='status_form.withdraw_status')
            el-radio(label='1') 正常
            el-radio(label='0') 凍結
        el-form-item(label='轉帳狀態', prop="transfer_status", label-width="140px" ,label-position='left')
          el-radio-group.ml-3(v-model='status_form.transfer_status')
            el-radio(label='1') 正常
            el-radio(label='0') 凍結
        el-form-item(label='第三方存款狀態', prop="thirdPay_status", label-width="140px" ,label-position='left')
          el-radio-group.ml-3(v-model='status_form.thirdPay_status')
            el-radio(label='1') 正常
            el-radio(label='0') 凍結
      .dialog-footer(slot='footer')
        el-button(@click='statusDialog = false') 取 消
        el-button(type='primary', @click='update_status()',:loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='新增銀行卡', :visible.sync='newCardDialog', @close="init_dialog('bank_add_form')")
      el-form.mr-3(:model="bank_form", :rules="bank_rules", ref="bank_add_form", status-icon)
        el-form-item(label='銀行卡號', prop="account_no", label-width="120px" ,label-position='left')
          el-input(v-model='bank_form.account_no', placeholder='請輸入銀行卡號')
        el-form-item(label='開戶行', prop="account_bank", label-width="120px" ,label-position='left')
          el-select(v-model='bank_form.account_bank', placeholder='選擇開戶行')
            el-option(v-for='(item,index) in bank_code_option', :key='index', :label='item.BankName', :value='index')
        el-form-item(label='省份', prop="province", label-width="120px" ,label-position='left')
          el-select(v-model='bank_form.province', placeholder='選擇省份', @change="bank_form.city='', bank_form.area = '' ")
            el-option(v-for='(item, index) in this.$store.state.location.province', :key='index', :label='item', :value='index')
        el-form-item(label='城市', prop="city", label-width="120px" ,label-position='left')
          el-select(v-model='bank_form.city', placeholder='選擇城市', @change="bank_form.area=''")
            el-option(v-for='(item, index) in this.$store.state.location.city[bank_form.province]', :key='index', :label='item', :value='index')
        el-form-item(label='區域', prop="area", label-width="120px" ,label-position='left')
          el-select(v-model='bank_form.area', placeholder='選擇區域')
            el-option(v-for='(item, index) in this.$store.state.location.area[bank_form.city]', :key='index', :label='item', :value='index')
        el-form-item(label='狀態', prop="status", label-width="120px" ,label-position='left')
          el-select(v-model='bank_form.status', placeholder='選擇狀態')
            el-option(label='驗證中', value="0")
            el-option(label='正常', value="1")
            el-option(label='無效', value="2")
      .dialog-footer(slot='footer')
        el-button(@click='newCardDialog = false') 取 消
        el-button(type='primary', @click='add_bank()', :loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='修改銀行卡', :visible.sync='updateCardDialog', @close="init_dialog('bank_update_form')")
      el-form.mr-3(:model="bank_form", :rules="bank_rules", ref="bank_update_form", status-icon)
        el-form-item(label='銀行卡號', prop="account_no", label-width="120px" ,label-position='left')
          el-input(v-model='bank_form.account_no', placeholder='請輸入銀行卡號')
        el-form-item(label='開戶行', prop="account_bank", label-width="120px" ,label-position='left')
          el-select(v-model='bank_form.account_bank', placeholder='選擇開戶行')
            el-option(v-for='(item,index) in bank_code_option', :key='index', :label='item.BankName', :value='index')
        el-form-item(label='省份', prop="province", label-width="120px" ,label-position='left')
          el-select(v-model='bank_form.province', placeholder='選擇省份', @change="bank_form.city='', bank_form.area = '' ")
            el-option(v-for='(item, index) in this.$store.state.location.province', :key='index', :label='item', :value='index')
        el-form-item(label='城市', prop="city", label-width="120px" ,label-position='left')
          el-select(v-model='bank_form.city', placeholder='選擇城市', @change="bank_form.area=''")
            el-option(v-for='(item, index) in this.$store.state.location.city[bank_form.province]', :key='index', :label='item', :value='index')
        el-form-item(label='區域', prop="area", label-width="120px" ,label-position='left')
          el-select(v-model='bank_form.area', placeholder='選擇區域')
            el-option(v-for='(item, index) in this.$store.state.location.area[bank_form.city]', :key='index', :label='item', :value='index')
        el-form-item(label='狀態', prop="status", label-width="120px" ,label-position='left')
          el-select(v-model='bank_form.status', placeholder='選擇狀態')
            el-option(label='驗證中', value="0")
            el-option(label='正常', value="1")
            el-option(label='無效', value="2")
      .dialog-footer(slot='footer')
        el-button(@click='updateCardDialog = false') 取 消
        el-button(type='primary', @click='update_bank()', :loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='交易設定', :visible.sync='paysettingDialog', @close="" width='30%')
      el-form.mr-3(:model="TransferInGame_form", :rules="password_form_rules", ref="TransferInGame_form", status-icon)
        el-form-item(label='轉入遊戲單筆下限', prop="", label-width="150px" ,label-position='left')
          el-input(v-model='TransferInGame_form.SingleMin', type="text", placeholder='輸入金額', clearable)
        el-form-item(label='轉入遊戲單筆上限', prop="", label-width="150px" ,label-position='left')
          el-input(v-model='TransferInGame_form.SingleMax', type="text", placeholder='輸入金額', clearable)
        el-form-item(label='轉入遊戲總上限', prop="", label-width="150px" ,label-position='left')
          el-input(v-model='TransferInGame_form.TodayMax', type="text", placeholder='輸入金額', clearable)
        el-form-item(style='text-align:right')
          el-button(type='primary', @click='setPaySetting("TransferInGame_form", TransferInGame_form, 4)',:loading='lock_btn' size='medium') 儲存
        hr
      el-form.mr-3(:model="TransferOutGame_form", :rules="password_form_rules", ref="TransferOutGame_form", status-icon)
        el-form-item(label='轉出遊戲單筆下限', prop="", label-width="150px" ,label-position='left')
          el-input(v-model='TransferOutGame_form.SingleMin', type="text", placeholder='輸入金額', clearable)
        el-form-item(label='轉出遊戲單筆上限', prop="", label-width="150px" ,label-position='left')
          el-input(v-model='TransferOutGame_form.SingleMax', type="text", placeholder='輸入金額', clearable)
        el-form-item(label='轉出遊戲總上限', prop="", label-width="150px" ,label-position='left')
          el-input(v-model='TransferOutGame_form.TodayMax', type="text", placeholder='輸入金額', clearable)
        el-form-item(style='text-align:right')
          el-button(type='primary', @click='setPaySetting("TransferOutGame_form", TransferOutGame_form, 3)',:loading='lock_btn' size='medium') 儲存
        hr
      el-form.mr-3(:model="WinAndLose_form", :rules="password_form_rules", ref="WinAndLose_form", status-icon)
        el-form-item(label='遊戲輸贏總上限', prop="", label-width="150px" ,label-position='left')
          el-input(v-model='WinAndLose_form.TodayMax', type="text", placeholder='輸入金額', clearable)
        el-form-item(style='text-align:right')
          el-button(type='primary', @click='setPaySetting("WinAndLose_form", WinAndLose_form, 5)',:loading='lock_btn' size='medium') 儲存
      .dialog-footer(slot='footer')
    el-dialog(title='驗證設定', :visible.sync='vertifyDialog', width='30%', @close="init_dialog('vertify_form')")
      el-form.mr-3(:model="vertify_form", :rules="vertify_rules", ref="vertify_form", status-icon)
        el-form-item(label='驗證方式', label-width="100px", prop="vertify_type" ,label-position='left')
          el-select(size="medium", v-model='vertify_form.vertify_type', filterable='', placeholder='選擇驗證方式', clearable)
            el-option(v-for='item in vertify_option', :key='item.Sn', :label='item.VertifyType_str + item.VertifyName', :value='item.Sn')
      .dialog-footer(slot='footer')
        el-button(@click='vertifyDialog = false') 取 消
        el-button(type='primary', @click='update_user_vertify()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgMemberInfo",
  props: ["user_info"],
  watch: {
    UserId(new_value, old_value) {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  data() {
    let self = this;
    return {
      editor: null,
      gameGroupList: "",
      vip_info: "",
      bank_table_data: [],
      tag_data: [],
      member_tag_option: [],
      bank_code_option: [],
      vertify_option: [],
      lock_type_option: [],
      lock_btn: false,
      aidDialog: false,
      passwordDialog: false,
      tagDialog: false,
      statusDialog: false,
      loginDialog: false,
      innerloginDialog: false,
      newCardDialog: false,
      updateCardDialog: false,
      // groupDialog: false,
      paysettingDialog: false,
      loginDialog: false,
      innerloginDialog: false,
      vertifyDialog: false,
      TransferInGame_form: {
        SingleMin: "",
        SingleMax: "",
        TodayMax: "",
        Sn: "",
        UserId: ""
      },
      TransferOutGame_form: {
        SingleMin: "",
        SingleMax: "",
        TodayMax: "",
        Sn: "",
        UserId: ""
      },
      WinAndLose_form: {
        TodayMax: "",
        Sn: "",
        UserId: ""
      },
      aid_form: {
        aid: ""
      },
      password_form: {
        new_password: "",
        check_new_password: ""
      },
      password_form_rules: {
        new_password: [
          {
            required: true,
            message: "請填寫新密碼",
            trigger: "change"
          }
        ],
        check_new_password: [
          {
            required: true,
            message: "請填寫確認新密碼",
            trigger: "change"
          },
          {
            validator: function(rule, value, callback) {
              if (value !== self.password_form.new_password) {
                callback(new Error("兩次輸入密碼不一致"));
              } else {
                callback();
              }
            }
          }
        ]
      },
      TransferStatus: {},
      GameGroupId: {},
      PaySettingSelected: {},
      tag_form: {
        member_tag: []
      },
      tag_rules: {
        member_tag: [
          {
            type: "array",
            required: true,
            message: "請選擇會員標籤",
            trigger: "change"
          }
        ]
      },
      status_form: {
        user_status_web: "1",
        deposit_status: "1",
        withdraw_status: "1",
        transfer_status: "1",
        thirdPay_status: "1",
        lock_type: "",
        lock_remark: ""
      },
      status_rules: {
        user_status_web: [
          {
            required: true,
            message: "請選擇登入狀態",
            trigger: "change"
          }
        ],
        deposit_status: [
          {
            required: true,
            message: "請選擇存款狀態",
            trigger: "change"
          }
        ],
        withdraw_status: [
          {
            required: true,
            message: "請選擇提款狀態",
            trigger: "change"
          }
        ],
        transfer_status: [
          {
            required: true,
            message: "請選擇轉帳狀態",
            trigger: "change"
          }
        ],
        thirdPay_status: [
          {
            required: true,
            message: "請選擇第三方存款狀態",
            trigger: "change"
          }
        ]
      },
      bank_form: {
        account_no: "",
        account_bank: "",
        province: "",
        city: "",
        area: "",
        status: "0"
      },
      bank_rules: {
        account_no: [
          {
            required: true,
            message: "請填寫銀行卡號",
            trigger: "change"
          }
        ],
        account_bank: [
          {
            required: true,
            message: "請選擇開戶行",
            trigger: "change"
          }
        ],
        province: [
          {
            required: true,
            message: "請選擇省份",
            trigger: "change"
          }
        ],
        city: [
          {
            required: true,
            message: "請選擇城市",
            trigger: "change"
          }
        ],
        status: [
          {
            type: "enum",
            enum: ["0", "1", "2"],
            required: true,
            message: "請選擇狀態",
            trigger: "change"
          }
        ]
      },
      vertify_form: {
        vertify_type: ""
      },
      vertify_rules: {
        vertify_type: [
          {
            required: true,
            message: "請選擇驗證方式",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    UserId: function() {
      return this.user_info.UserId;
    }
  },
  methods: {
    async init() {
      this.get_member_vip_info();
      this.get_tag();
      this.get_member_tag_option();
      this.get_bank_list();
      this.get_bank_code_option();
      this.getGameStatus();
      this.get_vertify_option();
      this.get_lock_type_option();
    },
    init_dialog(form) {
      this.$refs[form].resetFields();
      this.lock_btn = false;
      this.password_form.new_password = "";
      this.password_form.check_new_password = "";
      this.tag_form.member_tag = [];
      this.status_form.user_status_web = "1";
      this.status_form.deposit_status = "1";
      this.status_form.withdraw_status = "1";
      this.status_form.transfer_status = "1";
      this.status_form.thirdPay_status = "1";
      this.status_form.lock_type = "";
      this.status_form.lock_remark = "";
      this.bank_form.account_no = "";
      this.bank_form.account_bank = "";
      this.bank_form.province = "";
      this.bank_form.city = "";
      this.bank_form.area = "";
      this.bank_form.status = "0";
      this.vertify_form.vertify_type = "";
      this.aid_form.aid = "";
    },
    reset_password() {
      let self = this;
      this.$refs["password_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Member_All/MemberPasswordReset",
            data: {
              VertifyInfo: self.user_info.UserName,
              Password: self.password_form.new_password
            }
          })
            .then(function(response) {
              if (response.data.status) {
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
              self.passwordDialog = false;
            });
        }
      });
    },
    handleResetComfirm(field) {
      let self = this;
      this.$confirm("此動作將資料進行重設，確認是否繼續？", "重設確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (field == "name") {
            self.reset_name();
          } else if (field == "birthday") {
            self.reset_birthday();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重設"
          });
        });
    },
    reset_name() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberDataUpdate",
        data: {
          UserName: self.user_info.UserName,
          RealName: ""
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.$message({
              message: "修改成功",
              type: "success"
            });
            self.$emit("refresh_member");
          } else {
            self.$message.error("修改失敗： " + response.data.error_message);
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    reset_birthday() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberDataUpdate",
        data: {
          UserName: self.user_info.UserName,
          Birthday: ""
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.$message({
              message: "修改成功",
              type: "success"
            });
            self.$emit("refresh_member");
          } else {
            self.$message.error("修改失敗： " + response.data.error_message);
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_aid() {
      let self = this;
      if (!self.aid_form.aid) {
        self.aidDialog = false;
        return;
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberDataUpdate",
        data: {
          UserName: self.user_info.UserName,
          Aid: self.aid_form.aid
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.$message({
              message: "修改成功",
              type: "success"
            });
            self.$emit("refresh_member");
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
          self.aidDialog = false;
        });
    },
    get_member_vip_info() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/AdminMemberData",
        data: {
          UserName: self.user_info.UserName,
          Type: "Vip"
        }
      })
        .then(function(response) {
          self.vip_info = response.data.data;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_tag() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagData",
        data: {
          UserName: self.user_info.UserName
        }
      })
        .then(function(response) {
          self.tag_data = response.data.data.data_list;
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
    add_tag() {
      let self = this;
      this.$refs["tag_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "Member_All/UserTagDataManage/Add",
            data: {
              UserName: self.user_info.UserName,
              TagId: self.tag_form.member_tag.join(",")
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_tag();
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
              self.tagDialog = false;
            });
        }
      });
    },
    handleDeleteTagComfirm(tag_id) {
      let self = this;
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_tag(tag_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_tag(tag_id) {
      if (tag_id) {
        let self = this;
        axios({
          method: "post",
          url:
            process.env.VUE_APP_APIHOST + "Member_All/UserTagDataManage/Delete",
          data: {
            UserName: self.user_info.UserName,
            Sn: tag_id
          }
        })
          .then(function(response) {
            if (response.data.status) {
              self.get_tag();
              self.$message({
                message: "刪除成功",
                type: "success"
              });
            } else {
              self.$message.error("刪除失敗： " + response.data.error_message);
            }
            // console.log(response);
          })
          .catch(function(error) {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            // console.log(error);
          });
      }
    },
    get_status() {
      this.status_form.user_status_web = this.user_info.UserStatus_Web;
      this.status_form.deposit_status = this.user_info.DepositStatus;
      this.status_form.withdraw_status = this.user_info.WithdrawStatus;
      this.status_form.transfer_status = this.user_info.TransferStatus;
      this.status_form.thirdPay_status = this.user_info.ThirdPayStatus;
      this.init_editor();
      setTimeout(() => {
        CKEDITOR.instances.editor.setData(this.user_info.UserStatusText);
      }, 300);
    },
    set_lock_remark() {
      let self = this;
      if (self.status_form.lock_type) {
        CKEDITOR.instances.editor.setData(
          '<p dir="ltr" style="text-align:center"><span style="font-size:18px"><strong>亲爱的用户您好，由于您的帐号『 ' +
            self.status_form.lock_type +
            '』，因此目前无法使用，请点击下方联系专员，专员将尽快为您协助处理，谢谢。</strong></span></p>\n\n<p style="text-align:center">&nbsp;</p>\n\n<p dir="ltr" style="text-align:center"><span style="font-size:18px"><strong><a href="https://secure.livechatinc.com/licence/8233741/v2/open_chat.cgi?groups=4">联系专员</a></strong></span></p>\n\n<p dir="ltr" style="text-align:center"><br />\n<span style="color:#e74c3c"><span style="font-size:18px"><strong>（为确保所有用户资料保密，联系专员时请务必注明18老虎城会员帐号，以便提供服务，谢谢。）</strong></span></span></p>\n'
        );
      }
    },
    update_status() {
      let self = this;
      this.$refs["status_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Member_All/MemberStatusUpdate",
            data: {
              UserName: self.user_info.UserName,
              UserStatus_Web: self.status_form.user_status_web,
              WithdrawStatus: self.status_form.withdraw_status,
              DepositStatus: self.status_form.deposit_status,
              TransferStatus: self.status_form.transfer_status,
              ThirdPayStatus: self.status_form.thirdPay_status,
              UserStatusText: self.status_form.lock_remark
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.$message({
                  message: "修改成功",
                  type: "success"
                });
                self.$emit("refresh_member");
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
              self.statusDialog = false;
            });
        }
      });
    },
    get_bank_code_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Payment/GetUserBankList",
        data: { UserId: self.user_info.UserId }
      })
        .then(function(response) {
          self.bank_code_option = response.data.data;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_bank_list() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberBankList",
        data: {
          UserId: self.user_info.UserId
        }
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            switch (item["Status"]) {
              case "0":
                item["Status_str"] = "驗證中";
                break;
              case "1":
                item["Status_str"] = "正常";
                break;
              case "2":
                item["Status_str"] = "無效";
                break;
            }
            item["address"] = "";
            if (self.$store.state.location.province[item["Province"]]) {
              item["address"] =
                self.$store.state.location.province[item["Province"]] +
                self.$store.state.location.city[item["Province"]][item["City"]];
              if (
                self.$store.state.location.area[item["City"]] &&
                item["State"]
              ) {
                item["address"] +=
                  self.$store.state.location.area[item["City"]][item["State"]];
              }
            }
          });
          self.bank_table_data = response.data.data;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    add_bank() {
      let self = this;
      this.$refs["bank_add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "Member_All/MemberBankManage/Add",
            data: {
              UserId: self.user_info.UserId,
              AccountBank: self.bank_form.account_bank,
              AccountName: self.user_info.RealName,
              AccountNo: self.bank_form.account_no,
              Province: self.bank_form.province,
              City: self.bank_form.city,
              State: self.bank_form.area,
              Status: self.bank_form.status
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_bank_list();
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
              self.newCardDialog = false;
            });
        }
      });
    },
    get_bank(bank_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberBankList",
        data: {
          Sn: bank_id,
          UserId: self.user_info.UserId
        }
      })
        .then(async function(response) {
          self.update_id = response.data.data[0].Sn;
          self.bank_form.account_bank = response.data.data[0].AccountBank;
          self.bank_form.account_no = response.data.data[0].AccountNo;
          self.bank_form.province = response.data.data[0].Province;
          self.bank_form.city = response.data.data[0].City;
          self.bank_form.area = response.data.data[0].State;
          self.bank_form.status = response.data.data[0].Status;
          self.updateCardDialog = true;
          // console.log(response.data.data[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_bank() {
      let self = this;
      this.$refs["bank_update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "Member_All/MemberBankManage/Edit",
            data: {
              Sn: self.update_id,
              AccountBank: self.bank_form.account_bank,
              AccountName: self.user_info.RealName,
              AccountNo: self.bank_form.account_no,
              Province: self.bank_form.province,
              City: self.bank_form.city,
              State: self.bank_form.area,
              Status: self.bank_form.status
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_bank();
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
              self.updateCardDialog = false;
            });
        }
      });
    },
    handleDeleteComfirm(bank_id) {
      let self = this;
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_bank(bank_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_bank(bank_id) {
      let self = this;
      self.lock_btn = true;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberBankManage/Delete",
        data: {
          Sn: bank_id
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.get_bank_list();
            self.$message({
              type: "success",
              message: "刪除成功"
            });
          } else {
            self.$message.error("刪除失敗： " + response.data.error_message);
          }

          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    getGameStatus() {
      let vm = this;
      axios
        .post(process.env.VUE_APP_APIHOST + "Web_Page/GameGroup")
        .then(function(res) {
          // console.log(res)
          if (res.data.status === 1) {
            vm.gameGroupList = res.data.data;
            res.data.data.forEach(function(item, index, array) {
              switch (item["TransferStatus"]) {
                case "0":
                  vm.TransferStatus[item.GroupName] = "關閉";
                  break;
                case "1":
                  vm.TransferStatus[item.GroupName] = "正常";
                  break;
                case "2":
                  vm.TransferStatus[item.GroupName] = "維護中";
                  break;
              }
              vm.GameGroupId[item.GroupName] = item.GroupId;
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    PaySetting(GroupId) {
      this.PaySettingSelected["GameGroupId"] = GroupId;
      this.paysettingDialog = true;
      this.TransferInGame_form = {};
      this.TransferOutGame_form = {};
      this.WinAndLose_form = {};
      let vm = this;
      let payload = {
        UserId: this.user_info.UserId,
        GameGroupId: GroupId
      };
      axios
        .post(
          process.env.VUE_APP_APIHOST + "WalletAll/GetMemberPaySetting/",
          payload
        )
        .then(function(res) {
          if (res.data.status === 1) {
            res.data.data.forEach(function(item, index, array) {
              switch (item["SettingType"]) {
                case "4":
                  vm.TransferInGame_form = item;
                  break;
                case "3":
                  vm.TransferOutGame_form = item;
                  break;
                case "5":
                  vm.WinAndLose_form = item;
                  break;
              }
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setPaySetting(formName, form, type) {
      this.PaySettingSelected["SettingType"] = type;
      let vm = this;
      let method;
      let payload;
      if (typeof form.UserId == "undefined" || form.UserId == "") {
        method = "Add";
        payload = {
          UserId: this.user_info.UserId,
          SettingType: this.PaySettingSelected["SettingType"],
          GameGroupId: this.PaySettingSelected["GameGroupId"],
          SingleMax: form.SingleMax,
          SingleMin: form.SingleMin,
          TodayMax: form.TodayMax
        };
      } else {
        method = "Edit";
        payload = {
          Sn: form.Sn,
          SingleMax: form.SingleMax,
          SingleMin: form.SingleMin,
          TodayMax: form.TodayMax
        };
      }
      console.log(payload);

      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(
              process.env.VUE_APP_APIHOST +
                "WalletAll/UserPersonalPaySetting/" +
                method,
              payload
            )
            .then(function(res) {
              console.log(res);
              if (res.data.status === 1) {
                vm.$message({
                  message: "儲存成功",
                  type: "success"
                });
              } else {
                vm.$message({
                  message: res.data.error_message,
                  type: "error"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    get_vertify_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/VertifyCtrl",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            item["VertifyType_str"] = "";
            switch (item["VertifyType"]) {
              case "1":
                item["VertifyType_str"] = "簡訊 - ";
                break;
              case "2":
                item["VertifyType_str"] = "語音 - ";
                break;
            }
          });
          self.vertify_option = response.data.data;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_lock_type_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagList",
        data: { GroupId: 24 }
      })
        .then(function(response) {
          self.lock_type_option = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_user_vertify() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/VertifyCtrl",
        data: {
          UserId: self.user_info.UserId
        }
      })
        .then(function(response) {
          self.vertifyDialog = true;
          if (response.data.data[0]) {
            self.vertify_form.vertify_type = response.data.data[0].Sn;
          }
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_user_vertify() {
      let self = this;
      this.$refs["vertify_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/VertifyCtrlManage/Edit",
            data: {
              Sn: self.vertify_form.vertify_type,
              UserIdList: self.user_info.UserId
            }
          })
            .then(function(response) {
              if (response.data.status) {
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
              self.vertifyDialog = false;
            });
        }
      });
    },
    init_editor() {
      let self = this;
      if (self.editor == null) {
        setTimeout(() => {
          self.editor = CKEDITOR.replace("editor", {
            extraPlugins: "uploadimage",
            uploadUrl: process.env.VUE_APP_APIHOST + "Admin/ImagesUpload",
            filebrowserUploadUrl:
              process.env.VUE_APP_APIHOST + "Admin/ImagesUpload",
            on: {
              fileUploadRequest: function(evt) {
                let fileLoader = evt.data.fileLoader;
                let xhr = fileLoader.xhr;
                xhr.setRequestHeader(
                  "Authorization",
                  `Bearer ${window.localStorage.JWT_TOKEN}`
                );
                let formData = new FormData();
                formData.append("FilePath", 3);
                formData.append("Images", fileLoader.file);
                xhr.send(formData);
                evt.stop();
              },
              change: function(evt) {
                self.status_form.lock_remark = evt.editor.getData();
              }
            }
          });
          CKEDITOR.on("dialogDefinition", function(evt) {
            var diagName = evt.data.name;
            var diagDefn = evt.data.definition;

            if (diagName === "table") {
              var infoTab = diagDefn.getContents("info");

              var width = infoTab.get("txtWidth");
              width["default"] = "100%";
            }
          });
        }, 300);
      }
    }
  }
};
</script>
