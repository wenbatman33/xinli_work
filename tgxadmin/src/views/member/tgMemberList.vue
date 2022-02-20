<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 會員資訊
    .row.no-gutters.px-3.py-3
      .col-md-8.col-12.offset-md-2
        el-input(placeholder='輸入内容', v-model='search_content',@keyup.enter.native="get_data(1)", clearable)
          el-select.select-input-style(v-model='search_field', slot='prepend', placeholder='選擇搜尋方式')
            el-option(label='會員姓名', value="RealName")
            el-option(label='會員帳號', value="UserName")
            el-option(label='會員編號', value="UserId")
            el-option(label='手機號碼', value="Phone")
            el-option(label='電子信箱', value="Email")
            el-option(label='來源', value="Aid")
          el-button(slot='append', icon='el-icon-search',@click="get_data(1)")
    .row.no-gutters.px-3.py-3
      .col-12.d-flex.justify-content-center.radiogroup
        el-radio-group(v-model='search_type')
          el-radio(:label="'1'") 模糊搜尋
          el-radio(:label="'2'") 精準搜尋
    //--Table
    .row.no-gutters.px-3(v-if="search_type_flag == 1")
      .col-6
        el-button(size="medium", type='primary', @click='tagDialog = true') 標籤管理
      .col-6.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%', @selection-change="(val) => {selected_user = val.map(row => row.UserName) }")
            el-table-column(type="selection")
            el-table-column(prop='UserId', label='會員編號', width='80')
            el-table-column(label='會員帳號', width='150')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='RealName', label='姓名', width='90')
            el-table-column(prop='Phone', label='手機')
            el-table-column(prop='Email', label='信箱')
            el-table-column(prop='Aid', label='來源')
            el-table-column(prop='Create_At', label='註冊時間', width='170')
            el-table-column(prop='LastLogin', label='最後登入時間', width='170')
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    //--Tab Button
    .row.no-gutters.px-3.py-3(v-if="search_type_flag == 2")
      .col-12.d-flex.justify-content-end
        el-radio-group(v-model='search_info', size='medium')
          el-radio-button(label='1') 基本資訊
          el-radio-button(label='2') 往來紀錄
          el-radio-button(label='3') 用戶印象
      template(v-if="search_info =='1' && show_null == false")
        tgMemberInfo(:user_info="this.tableData[0]", @refresh_member="get_data(1)")
      template(v-if="search_info =='2' && show_null == false")
        tgMemberLog(:user_info="this.tableData[0]", @refresh_member="get_data(1)")
      template(v-if="search_info =='3' && show_null == false")
        tgMemberImage(:user_info="this.tableData[0]", @refresh_member="get_data(1)")
    //--Null
    .row.no-gutters.px-3
      el-card.col.box-card(v-if="show_null", shadow='never')
        .null-text
          i.far.fa-frown
          span.px-2 查無資料
    el-dialog(title='標籤管理', :visible.sync='tagDialog', @close="init_dialog('tag_form')")
      el-form.mr-3(:model="tag_form", :rules="tag_rules", ref="tag_form", status-icon)
        el-form-item(label='會員標籤', prop="member_tag", label-width="88px" ,label-position='left')
          el-select.w-100(v-model='tag_form.member_tag', multiple=true, size='medium', placeholder='請選擇標籤', clearable)
            el-option-group(v-for='group in member_tag_option', :key='group.label', :label='group.label')
              el-option(v-for='item in group.options', :key='item.TagId', :label="item.TagName", :value='item.TagId')
      .dialog-footer(slot='footer')
        el-button(type='danger', @click='update_tag("Delete")',:loading='lock_btn') 刪 除	
        el-button(type='primary', @click='update_tag("Add")',:loading='lock_btn') 新 增
</template>
<script>
import tgMemberInfo from "@/views/member/tgMemberInfo";
import tgMemberLog from "@/views/member/tgMemberLog";
import tgMemberImage from "@/views/member/tgMemberImage";
export default {
  name: "tgMemberList",
  components: {
    tgMemberInfo,
    tgMemberLog,
    tgMemberImage
  },
  mounted() {
    setTimeout(() => {
      if (this.$route.query.user_name) {
        this.search_field = "UserName";
        this.search_content = this.$route.query.user_name;
        this.search_type = "2";
      }
      this.get_data(1);
      this.get_member_tag_option();
    }, 200);
  },
  data() {
    return {
      tableData: [],
      selected_user: [],
      member_tag_option: [],
      search_content: "",
      search_field: "UserName",
      search_type: "1",
      search_type_flag: "",
      search_info: "1",
      tagDialog: false,
      lock_btn: false,
      now_page: 1,
      total_page: 0,
      page_size: 100,
      show_null: false,
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
      }
    };
  },
  computed: {},
  methods: {
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
    get_data(now_page) {
      if (!now_page) now_page = this.now_page;
      if (this.search_type == "2" && this.search_content == "") {
        this.$message.error("請先搜尋會員");
      } else {
        let self = this;
        let field = "";
        axios({
          method: "post",
          url: process.env.VUE_APP_APIHOST + "Member_All/AdminSearchMemberList",
          data: {
            [self.search_field]: self.search_content,
            SearchBy: self.search_type,
            Page: now_page,
            PageLimit: self.page_size
          }
        })
          .then(function(response) {
            if (self.search_type == "2") {
              self.search_type_flag = 2;
              if (response.data.data.total_rows > 0) {
                self.show_null = false;
                if (response.data.data.total_rows > 1)
                  self.search_type_flag = 1;
              } else {
                self.show_null = true;
                return;
              }

              response.data.data.data_list.forEach(function(
                item,
                index,
                array
              ) {
                switch (item["UserStatus_Web"]) {
                  case "0":
                    item["UserStatus_Web_str"] = "凍結";
                    break;
                  case "1":
                    item["UserStatus_Web_str"] = "正常";
                    break;
                  case "2":
                    item["UserStatus_Web_str"] = "登入鎖定";
                    break;
                }
                switch (item["DepositStatus"]) {
                  case "0":
                    item["DepositStatus_str"] = "凍結";
                    break;
                  case "1":
                    item["DepositStatus_str"] = "正常";
                    break;
                }
                switch (item["TransferStatus"]) {
                  case "0":
                    item["TransferStatus_str"] = "凍結";
                    break;
                  case "1":
                    item["TransferStatus_str"] = "正常";
                    break;
                }
                switch (item["ThirdPayStatus"]) {
                  case "0":
                    item["ThirdPayStatus_str"] = "凍結";
                    break;
                  case "1":
                    item["ThirdPayStatus_str"] = "正常";
                    break;
                }
                switch (item["WithdrawStatus"]) {
                  case "0":
                    item["WithdrawStatus_str"] = "凍結";
                    break;
                  case "1":
                    item["WithdrawStatus_str"] = "正常";
                    break;
                }
              });
            } else {
              self.search_type_flag = 1;
            }
            self.now_page = now_page;
            self.total_page = parseInt(response.data.data.total_rows);
            self.tableData = response.data.data.data_list;
            // console.log(response.data.data);}
          })
          .catch(function(error) {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            // console.log(error);
          });
      }
    },
    init_dialog(form) {
      this.$refs[form].resetFields();
      this.lock_btn = false;
      this.tag_form.member_tag = [];
    },
    update_tag(method) {
      let self = this;
      if (self.selected_user.length == 0) {
        self.$message.error("請先選擇會員	");
        return;
      }
      this.$refs["tag_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST +
              "Member_All/UserTagDataManage/" +
              method,
            data: {
              UserName: self.selected_user.join(","),
              TagId: self.tag_form.member_tag.join(",")
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data(1);
                self.$message({
                  message: "更新成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "更新失敗： " + response.data.error_message
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
    }
  }
};
</script>