<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 認證紀錄
    .row.no-gutters.px-3.py-3
      .col-md-3.col-12.px-1.py-1
        el-input(size='medium', v-model='search_account', placeholder='輸入會員帳號', clearable)
      .col-md-3.col-12.px-1.py-1
        el-select(size='medium', v-model='search_type', placeholder='選擇認證類型', clearable, @change="get_data(1)")
          el-option(label='不限類型', value="1,2")
          el-option(label='信箱認證', value="1")
          el-option(label='手機認證', value="2")
      .col-md-4.col-12.px-1.py-1
        el-date-picker(size='medium', v-model='search_time_range', type='daterange', align='right', value-format="yyyy-MM-dd", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
      .col-md-1.col-6.px-1.py-1.d-flex.justify-content-end
        el-button(@click='get_data(1)', size="medium", type='primary', :loading='lock_btn') 搜 尋
      .col-md-1.col-6.px-1.py-1.d-flex.justify-content-start
        el-button(@click='newDialog = true', size="medium", type='') 匯 出
    //--Table
    .row.no-gutters.px-3
      .col-6
        el-button(size="medium", type='primary', @click='tagDialog = true') 標籤管理
      .col-6.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%', @selection-change="(val) => {selected_user = val.map(row => row.UserName) }")
            el-table-column(type="selection")
            el-table-column(label='會員帳號')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='Phone', label='認證手機', v-if="search_type != 1")
            el-table-column(prop='VertifyPhoneTime', label='手機認證時間', width='170', v-if="search_type != 1")
            el-table-column(prop='Email', label='認證信箱', v-if="search_type != 2")
            el-table-column(prop='VertifyEmailTime', label='信箱認證時間', width='170', v-if="search_type != 2")
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
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
export default {
  name: "tgVerificationList",
  mounted() {
    this.get_data(1);
    this.get_member_tag_option();
  },
  data() {
    return {
      tableData: [],
      selected_user: [],
      member_tag_option: [],
      search_account: "",
      search_type: "1,2",
      search_time_range: null,
      now_page: 1,
      page_size: 100,
      total_page: 0,
      tagDialog: false,
      lock_btn: false,
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
      let self = this;
      self.lock_btn = true;
      if (self.search_time_range == null) {
        self.search_time_range = [];
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberVertifyList",
        data: {
          Method: "Group",
          UserName: self.search_account,
          Type: self.search_type,
          Date_S: self.search_time_range[0],
          Date_E: self.search_time_range[1],
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {});
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        })
        .finally(function() {
          self.lock_btn = false;
        });
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