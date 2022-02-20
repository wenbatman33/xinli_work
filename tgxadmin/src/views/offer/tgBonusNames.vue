<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-md-6.pt-1
        h5(v-if="offerInfo.GameGroupId  > 0") 優惠名單 ({{ other[offerInfo.GameGroupId] }} - {{ offerInfo.OfferName }} )
        h5(v-else) 優惠名單 ( {{ offerInfo.OfferName }} )
      .col-6.d-flex.justify-content-end(v-if="$store.state.member.user_page_auth.Add_Auth==1")
        el-button(size="medium",type='primary', @click='show_batch_fail()') 批次失敗
        el-button(size="medium",type='primary', @click='show_batch_verify()') 批次審核
        el-button(size="medium",type='primary', @click='dispatchDialog = true') 派發優惠
      .col-md-6.pt-1
        span  優惠人數：{{ OfferCount.totalCnt }} 
    .row.no-gutters.px-3.py-3
      .col-md-2.col-12.d-flex 待審核：
        span.px-1.warning-style {{ OfferCount.applyCnt }}
        span 人
      .col-md-2.col-12.d-flex 未申請：
        span.px-1.info-style {{ OfferCount.un_applyCnt }}
        span 人
      .col-md-2.col-12.d-flex 待派發：
        span.px-1.sucess-style {{ OfferCount.passCnt }}
        span 人
      .col-md-2.col-12.d-flex 已拒絕：
        span.px-1.error-style {{ OfferCount.rejectCnt }}
        span 人
      .col-md-2.col-12.d-flex  已派送：
        span.px-1.blue-style {{ OfferCount.deliveryCnt }}
        span 人
      .col-md-2.col-12.d-flex  已逾期：
        span.px-1.purple-style {{ OfferCount.expireCnt }}
        span 人
    .row.no-gutters.px-3.py-3.d-flex.justify-content-between
      .col-md-4.col-12.py-1
        el-select(size="medium", v-model='search_status', filterable='', placeholder='選擇優惠狀態' ,@change='getOfferApplyList(1)')
          el-option(v-for='item in statusoption', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.py-1
        el-input(size='medium', v-model='search_tag', placeholder='輸入會員標籤', clearable, @keyup.enter.native="getOfferApplyList(1)")
      .col-md-4.col-12.py-1
        el-input(size="medium", placeholder='輸入會員帳號搜尋', v-model='search_userName', @keyup.enter.native="getOfferApplyList(1)")
          el-button(slot='append', icon='el-icon-search', @click="getOfferApplyList(1)", :loading='lock_btn')
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='getOfferApplyList', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; getOfferApplyList(1) }", :total='total_page')
      .col-12
        template
          el-table(ref='multipleTable', :data='tableData', border='', style='width: 100%', @selection-change="(val)=>{this.selected_row = val}", show-summary='', :summary-method="getSummaries")
            //el-table-column.checkbox-clear(fixed='left',type='selection', width='60', align='center')
            el-table-column(type='selection', width='60', align='center')
            el-table-column(prop='ApplyDate', label='申請時間', width='170')
            el-table-column(prop='Status', label='狀態', width='90', align='center')
              template(slot-scope='scope')
                el-tag(:type="scope.row.color", disable-transitions='') {{scope.row.StateCode_str}}
            el-table-column(label='會員帳號', width='120')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='TagName', label='會員標籤', align='right')
            el-table-column(v-if="bonusType != 'bonus'", prop='GameGroupIdName', label='平台', align='right')
            el-table-column(prop='CalcCash', label='計算金額', align='right')
            el-table-column(prop='ModifyCash', label='優惠金額', align='right')
            el-table-column(prop='', label='優惠比例', width='80', align='center')
              template(slot-scope='scope')
                span {{scope.row.OfferRate}}%
            el-table-column(prop='approval', label='審核方式', width='80', align='center') 
              template(slot-scope='scope')
                span(v-if='scope.row.ApproveUserId == "9"') 系統審核 
                span(v-else-if='scope.row.ApproveUserId == "0"') 尚未審核
                span(v-else) 人工審核
            el-table-column(prop='CalcDate', label='計算日期', width='120') 
            el-table-column(prop='DeliveryDate', label='派發時間', width='170') 
            el-table-column(prop='Update_At', label='更新時間', width='170') 
            el-table-column(prop='AdminUserName', label='審核人', width='100', align='center')
              template(slot-scope='scope')
                span(v-if='scope.row.AdminUserName != null') {{ scope.row.AdminUserName }}
                span(v-else) 尚未審核
            el-table-column(prop='time', label='審核', width='100', align='center')
              template(slot-scope='scope')
                el-button(v-if='scope.row.ProcessStaff != 0 && scope.row.ProcessStaff != null' @click='ProcessBonus(scope.row)',size='medium', type='primary') 處理中
                el-button(v-else-if='scope.row.Status == 1' @click='ProcessBonus(scope.row)',size='medium', type='primary') 處理
                el-button(v-else, @click='dealDialog = true, selectedBonusData = scope.row',size='medium', type='info') 檢視
      .col-12.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='getOfferApplyList', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; getOfferApplyList(1) }", :total='total_page')
    //- div {{offerInfo}}
    //- br
    //- div {{selectedBonusData}}
    //- br
    //- div {{ OfferCount }}
    //- 優惠可被處理
    el-dialog.withd-dialog(title='優惠活動處理', top='30vh', :visible.sync='dealDialog', :before-close='handleClose', @close='ChangeProcess("0")')
      el-form.mr-3
        h6.dialog-title 申請資訊
        .row.pt-2
          span.col-sm-12.col-md-3.mb-3.d-flex 申請時間：{{ selectedBonusData.ApplyDate }}
          span.col-sm-12.col-md-3.mb-3.d-flex 優惠期限：{{ offerInfo.EndDate }}
          span.col-sm-12.col-md-3.mb-3.d-flex 會員帳號：{{ selectedBonusData.UserName }}
          span.col-sm-12.col-md-3.mb-3.d-flex 狀態：
            span.ml-2.warning-style {{ selectedBonusData.StateCode_str }}
          span.col-sm-12.col-md-3.mb-3.d-flex 計算金額：{{ selectedBonusData.CalcCash }}
          span.col-sm-12.col-md-3.mb-3.d-flex {{ offerInfo.bonusTypeStr }}金額：{{ selectedBonusData.ModifyCash }}
          span.col-sm-12.col-md-3.mb-3.d-flex 優惠比例：{{ offerInfo.OfferRate }}%
          span.col-sm-12.col-md-3.mb-3.d-flex(v-if="offerInfo.WithDrawMultiple > 200") 提款限制：{{ offerInfo.WithDrawMultiple }}元
          span.col-sm-12.col-md-3.mb-3.d-flex(v-else) 提款倍數：{{ offerInfo.WithDrawMultiple }}倍
        h6.dialog-title 審核資訊
        .row.pt-2
          span.col-sm-12.col-md-3.mb-3.d-flex 更新時間：{{ selectedBonusData.Update_At }}
          span.col-sm-12.col-md-3.mb-3.d-flex(v-if='selectedBonusData.ApproveUserId == 9') 審核方式：系統審核
          span.col-sm-12.col-md-3.mb-3.d-flex(v-else-if='selectedBonusData.ApproveUserId == 0 || selectedBonusData.ApproveUserId == null') 審核方式：尚未審核
          span.col-sm-12.col-md-3.mb-3.d-flex(v-else) 審核方式：人工審核
          span.col-sm-12.col-md-3.mb-3.d-flex(v-if='selectedBonusData.AdminUserName == 0 || selectedBonusData.AdminUserName == null') 審核人：尚未審核
          span.col-sm-12.col-md-3.mb-3.d-flex(v-else) 審核人：{{ selectedBonusData.AdminUserName }}
        h6.dialog-title 備註
        .row.pt-2
          span.col-sm-12.col-md-3.mb-3.d-flex {{ selectedBonusData.Notes }}
      //- 確認
      el-dialog(title="請確認是否送出處理結果？", width='30%', top='40vh', :visible.sync='dealcomfirm', append-to-body='')
        el-form.mr-3
          el-form-item
            el-checkbox(v-if="submitType==4", v-model='finger_batch_reject') 拒絕同指紋帳號
        .dialog-footer(slot='footer')
          el-button(@click='dealcomfirm = false') 取 消
          el-button(type='primary', @click='VerifyOffer(submitType); dealDialog = false; dealcomfirm = false') 確 認
      //- 確認
      .dialog-footer(v-if="$store.state.member.user_page_auth.Add_Auth==1", slot='footer')
        el-button(v-if="selectedBonusData.Status == 2", type='danger', @click='submitType = 4; dealcomfirm = true') 失 敗
        el-button(v-if="selectedBonusData.Status == 1", type='danger', @click='submitType = 4; dealcomfirm = true') 拒 絕
        el-button(v-if="selectedBonusData.Status == 1", type='success', @click='submitType = 3; dealcomfirm = true') 通 過
    //- 優惠已被處理
    el-dialog(title='處理優惠', width='30%', top='35vh', :visible.sync='dealedDialog')
      i.pr-2.el-icon-info
      span 交易目前由 {{ dealedUserName }} 處理中
      .dialog-footer(slot='footer')
        el-button(type='primary', @click='ChangeProcess(1)') 接手處理
        el-button(type='', @click='dealedDialog = false') 取 消
    //- 派發優惠
    el-dialog(title='派發優惠', top='35vh', :visible.sync='dispatchDialog')
      span 即將派發
      span.ml-1.blue-style {{ OfferCount.passCnt }}
      span.ml-1 人，共派發
      span.ml-1.blue-style {{ OfferCount.readyToDeliveryMoney }}
      span.ml-1 元。
      el-dialog(width='30%', top='35vh', :visible.sync='dispatchcomfirm', append-to-body='')
        span 確認是否派發優惠？
        .dialog-footer(slot='footer')
          el-button(@click='dispatchcomfirm = false; dispatchDialog = false') 取 消
          el-button(type='primary', @click='dispatchDialog = false ; dispatchcomfirm = false ; deliveryOffer()') 確 認
      .dialog-footer(slot='footer')
        el-button(@click='dispatchDialog = false') 取消
        el-button(type='success', @click='dispatchcomfirm = true') 通 過
    //- 批次審核
    el-dialog(title='批次審核',top='35vh', width="30%", :visible.sync='verifyDialog')
      el-form.mr-3
        el-form-item(label='審核結果', label-width="88px" ,label-position='left')
          el-select(v-model='submitType', placeholder='請選擇審核結果')
            el-option(label='通過', value='3')
            el-option(label='拒絕', value='4')
      .dialog-footer(slot='footer')
        el-button(@click='verifyDialog = false') 取消
        el-button(type='success', @click='verifycomfirm = true') 確 認
      el-dialog(top='35vh',width='30%', :visible.sync='verifycomfirm', append-to-body='')
        h4
          span 確認審核結果為： 
          span(style="color:red") {{ (submitType==3) ? '通過': (submitType==4) ? '拒絕': '' }}
        .dialog-footer(slot='footer')
          el-button(@click='verifycomfirm = false; verifyDialog = false') 取 消
          el-button(type='primary', @click='batch_verifyOffer()') 確 認
</template>
<script>
export default {
  name: "tgBonusNames",
  mounted() {
    this.getOfferInfo();
  },
  methods: {
    handleClose(done) {
      if (this.selectedBonusData.Status == 1) {
        this.$confirm("確認放棄處理，該筆提款仍維持「待處理」？", {
          confirmButtonText: "確 認",
          cancelButtonText: "取 消",
          type: "warning"
        })
          .then(() => {
            done();
          })
          .catch(() => {});
      } else {
        done();
      }
    },
    handleDeleteComfirm() {
      this.$confirm("此動作將永久刪除，請確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "刪除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    getOfferInfo() {
      let self = this;
      if (typeof this.$route.query.Sn == "undefined") {
        this.$router.push("/tgBonusList");
      }

      let payload = { Sn: this.$route.query.Sn };
      axios
        .post(process.env.VUE_APP_APIHOST + "WalletAll/GetOfferInfo", payload)
        .then(function(res) {
          if (res.data.status == 1) {
            // console.log(res.data.data.data_list)
            self.offerInfo = res.data.data.data_list[0];
            self.bonusType =
              res.data.other.OfferTbType[self.offerInfo["OfferType"]];
            self.offerInfo.bonusTypeStr =
              res.data.other.OfferType[self.offerInfo["OfferType"]];
          } else {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          }
        })
        .finally(function() {
          self.getOfferApplyList(1);
          self.getAllOfferApplyList();
        });
    },
    getOfferApplyList(now_page) {
      this.lock_btn = true;
      let self = this;
      let payload = {
        Sn: this.$route.query.Sn,
        UserName: this.search_userName,
        Tag: this.search_tag,
        Page: now_page,
        PageLimit: this.page_size,
        Type: this.bonusType
      };
      if (this.search_status != 999) {
        payload["Status"] = this.search_status;
      }
      axios
        .post(
          process.env.VUE_APP_APIHOST + "WalletAll/GetOfferLogList",
          payload
        )
        .then(function(res) {
          if (res.data.status == 1) {
            // self.offerInfo = res.data.data.data_list[0]
            self.other = res.data.other.GameGroupIdName;
            res.data.data.data_list.forEach(function(item, index, array) {
              item["GameGroupIdName"] =
                res.data.other.GameGroupIdName[item["GameGroupId"]];
              item["StateCode_str"] =
                res.data.other.OfferStatus[item["Status"]];
              switch (item["Status"]) {
                case "1":
                  item["color"] = "warning";
                  break;
                case "2":
                  item["color"] = "info";
                  break;
                case "3":
                  item["color"] = "success";
                  break;
                case "4":
                  item["color"] = "danger";
                  break;
                case "5":
                  item["color"] = "primary";
                  break;
                case "6":
                  item["color"] = "primary";
                  break;
              }
            });
            self.now_page = now_page;
            self.total_page = parseInt(res.data.data.total_rows);
            self.tableData = res.data.data.data_list;
          } else {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          }
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    getAllOfferApplyList() {
      let self = this;
      let payload = {
        Sn: this.$route.query.Sn,
        Page: 1,
        PageLimit: "999999",
        Type: this.bonusType
      };
      axios
        .post(
          process.env.VUE_APP_APIHOST + "WalletAll/GetOfferLogList",
          payload
        )
        .then(function(res) {
          if (res.data.status == 1) {
            let bonusCount = {
              totalCnt: res.data.data.data_list.length,
              applyCnt: 0,
              un_applyCnt: 0,
              passCnt: 0,
              rejectCnt: 0,
              deliveryCnt: 0,
              expireCnt: 0,
              readyToDeliveryStr: "",
              readyToDeliveryMoney: 0
            };
            self.other = res.data.other.GameGroupIdName;
            res.data.data.data_list.forEach(function(item, index, array) {
              switch (item["Status"]) {
                case "1":
                  bonusCount.applyCnt += 1;
                  break;
                case "2":
                  bonusCount.un_applyCnt += 1;
                  break;
                case "3":
                  bonusCount.passCnt += 1;
                  bonusCount.readyToDeliveryStr += item.Sn + ",";
                  bonusCount.readyToDeliveryMoney += parseInt(item.ModifyCash);
                  break;
                case "4":
                  bonusCount.rejectCnt += 1;
                  break;
                case "5":
                  bonusCount.deliveryCnt += 1;
                  break;
                case "6":
                  bonusCount.expireCnt += 1;
                  break;
              }
            });
            bonusCount.readyToDeliveryStr = bonusCount.readyToDeliveryStr.substring(
              0,
              bonusCount.readyToDeliveryStr.length - 1
            );
            self.OfferCount = bonusCount;
          } else {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          }
        });
    },
    ProcessBonus(data) {
      this.selectedBonusData = data;
      // console.log(data.Sn)
      this.CheckOfferProcess(data.Sn);
    },
    CheckOfferProcess(Sn) {
      let self = this;
      let payload = {
        Sn: Sn
      };
      axios
        .post(
          process.env.VUE_APP_APIHOST +
            "WalletAll/QueryOfferProcess/" +
            this.bonusType,
          payload
        )
        .then(function(res) {
          if (res.data.status == 1) {
            if (
              res.data.data.admin_userid == null ||
              res.data.data.admin_userid == 0
            ) {
              self.dealDialog = true;
              //寫入處理人員
              let payload = {
                Sn: Sn,
                Lock: 1
              };
              axios
                .post(
                  process.env.VUE_APP_APIHOST +
                    "WalletAll/UpdateOfferProcess/" +
                    self.bonusType,
                  payload
                )
                .then(function(res) {
                  if (res.data.status != 1) {
                    if (res.data.error_code != 70019) {
                      self.$message.error(
                        "很抱歉，系統出錯，請聯絡客服人員協助"
                      );
                    }
                  }
                });
            } else {
              self.dealedDialog = true;
              self.dealedUserName = res.data.data.admin_username;
            }
          } else {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          }
        });
    },
    ChangeProcess(lock) {
      //如果狀態拒絕 已派發 跳出func
      if (
        this.selectedBonusData.Status == 2 ||
        this.selectedBonusData.Status == 4 ||
        this.selectedBonusData.Status == 5
      ) {
        return false;
      }
      let self = this;
      //寫入處理人員
      let payload = {
        Sn: this.selectedBonusData.Sn,
        Lock: lock
      };
      axios
        .post(
          process.env.VUE_APP_APIHOST +
            "WalletAll/UpdateOfferProcess/" +
            self.bonusType,
          payload
        )
        .then(function(res) {
          if (res.data.status == 1) {
            self.dealedDialog = false;
            if (lock === 1) {
              self.dealDialog = true;
            }
          } else {
            self.dealedDialog = false;
            if (res.data.error_code != 70019) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            }
          }
        });
    },
    VerifyOffer(type) {
      // 3通過 4不通過 5派送
      let self = this;
      let url = "";
      let payload = {};
      if (self.finger_batch_reject) {
        url = "WalletAll/BatchRejectSameFinger/";
        payload = {
          UserId: this.selectedBonusData.UserId,
          ReferSn: this.$route.query.Sn
        };
      } else {
        url = "WalletAll/VerifyOffer/";
        payload = {
          UserId: this.selectedBonusData.UserId,
          Sn: this.selectedBonusData.Sn,
          Status: type
        };
      }
      //寫入處理人員
      axios
        .post(process.env.VUE_APP_APIHOST + url + self.bonusType, payload)
        .then(function(res) {
          if (res.data.status == 1) {
            console.log(res);
            self.$message.success("處理完成");
            self.getOfferApplyList(1);
          } else {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          }
        })
        .finally(function() {
          self.finger_batch_reject = false;
        });
    },
    deliveryOffer() {
      //派送優惠
      let self = this;
      //寫入處理人員
      let payload = {
        SnString: this.OfferCount.readyToDeliveryStr,
        Status: 5
      };
      axios
        .post(
          process.env.VUE_APP_APIHOST +
            "WalletAll/BatchDeliveryOffer/" +
            self.bonusType,
          payload
        )
        .then(function(res) {
          if (res.data.status == 1) {
            console.log(res);
            self.$message.success("處理完成");
            self.getOfferApplyList(1);
          } else {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          }
        });
    },
    show_batch_verify() {
      let self = this;
      if (self.selected_row.length == 0) {
        self.$message.error("請先勾選名單人員");
        return;
      }
      let warning_flag = false;
      self.selected_row.forEach(function(item, index, array) {
        if (item.Status != 1) {
          warning_flag = true;
          self.$refs.multipleTable.toggleRowSelection(item);
        }
      });
      if (warning_flag) {
        this.$message({
          message:
            "唯有待审核状态才能进行批次审核，已取消勾选不符合名单，请再次确认审核用户",
          type: "warning"
        });
        return;
      } else {
        self.submitType = "3";
        self.verifyDialog = true;
      }
    },
    batch_verifyOffer() {
      let self = this;
      let sn_string = this.selected_row.map(function(item, index, array) {
        return item.Sn;
      });
      sn_string = sn_string.join(",");

      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST +
          "WalletAll/BatchDeliveryOffer/" +
          self.bonusType,
        data: {
          Status: self.submitType,
          SnString: sn_string
        }
      })
        .then(function(response) {
          self.getOfferApplyList(1);
          if (response.data.status) {
            self.$message({
              message: "審核成功",
              type: "success"
            });
          } else {
            self.$message.error("審核失敗： " + response.data.error_message);
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.submitType = "";
          self.verifyDialog = false;
          self.verifycomfirm = false;
        });
    },
    show_batch_fail() {
      let self = this;
      if (self.selected_row.length == 0) {
        self.$message.error("請先勾選名單人員");
        return;
      }
      let warning_flag = false;
      self.selected_row.forEach(function(item, index, array) {
        if (item.Status != 2) {
          warning_flag = true;
          self.$refs.multipleTable.toggleRowSelection(item);
        }
      });
      if (warning_flag) {
        this.$message({
          message:
            "唯有未申请状态才能进行批次失敗，已取消勾选不符合名单，请再次确认审核用户",
          type: "warning"
        });
        return;
      } else {
        this.$confirm("请确认是否进行批次失败？", {
          confirmButtonText: "確認",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            self.submitType = "4";
            self.batch_verifyOffer();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消批次失敗"
            });
          });
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合計";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (index === 5 || index === 6) {
              return (parseFloat(prev) + parseFloat(curr)).toFixed(2);
            }
          }, 0);
          if (!Number.isNaN(sums[index]) && sums[index] !== undefined) {
            sums[index] = sums[index]
              .toString()
              .replace(
                /^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
                (all, pre, groupOf3Digital) =>
                  pre + groupOf3Digital.replace(/\d{3}/g, ",$&")
              );
          }
        }
      });
      return sums;
    }
  },
  data() {
    return {
      search_tag: "",
      search_userName: "",
      search_status: 999,
      bonusType: "",
      selected_row: [],
      now_page: 1,
      total_page: 0,
      page_size: 100,
      lock_btn: false,
      offerInfo: "",
      selectedBonusData: "",
      submitType: "",
      OfferCount: "",
      other: "",
      tableData: [],
      statusoption: [
        { value: 999, label: "不限狀態" },
        { value: 1, label: "待審核" },
        { value: 2, label: "未申請" },
        { value: 3, label: "待派發" },
        { value: 4, label: "已拒絕" },
        { value: 5, label: "已派送" },
        { value: 6, label: "已逾期" }
      ],
      dealDialog: false,
      dealcomfirm: false,
      dealedDialog: false,
      dealedUserName: "",
      dispatchDialog: false,
      dispatchcomfirm: false,
      verifyDialog: false,
      verifycomfirm: false,
      finger_batch_reject: false
    };
  }
};
</script>
