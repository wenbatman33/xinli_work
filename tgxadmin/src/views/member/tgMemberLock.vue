<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 會員凍結
      .col-6.d-flex.justify-content-end
        el-button(@click='newDialog = true', size="medium",type='primary') 新增批次凍結
    .row.no-gutters.px-3.py-3
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size='medium', v-model='search_time_range', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
      .col-md-3.col-12.px-1.py-1
        el-input(size='medium', v-model='search_admin', placeholder='輸入操作者後台帳號', clearable)
      //--Search
      .col-md-1.col-12.px-1.py-1
        el-button(@click='get_data(1)', size="medium",type='primary', :loading='lock_btn') 搜 尋
    //--Table
    .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    .col-12
      template
        el-table(:data='tableData', border='', style='width: 100%')
          el-table-column(prop='Sn', label='序號', width="60")
          el-table-column(prop='UserName', label='會員帳號')
          el-table-column(prop='TagName', label='標籤', width="240")
          el-table-column(prop='Create_At', label='凍結時間', width="170")
          el-table-column(prop='EditUserName', label='操作人', width='100')
          el-table-column(prop='Note', label='備註', show-overflow-tooltip='')
    .col-12.py-3.d-flex.justify-content-end  
      el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    //--Dialog
    el-dialog(title='批次凍結會員', :visible.sync='newDialog', @close="init_dialog('form')")
      el-form.mr-3(:model="form", :rules="rules", ref="form", status-icon)
        el-form-item(label='會員標籤', prop="member_tag", label-width="88px" ,label-position='left')
          el-select.w-100(v-model='form.member_tag', size='medium', placeholder='請選擇標籤', clearable)
            el-option-group(v-for='group in member_tag_option', :key='group.label', :label='group.label')
              el-option(v-for='item in group.options', :key='item.TagId', :label="item.TagName", :value='item.TagId')
        el-form-item(label='備註類型', prop="remark_group" , label-width="88px" ,label-position='left')
          el-select(v-model='form.remark_group', placeholder='請選擇備註類型', clearable)
            el-option(v-for='item in remark_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='備註內容', prop="remark" , label-width="88px" ,label-position='left')
          el-input(v-model='form.remark', placeholder='輸入備註內容', type='textarea', clearable)
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_lock()', :loading='lock_btn') 確 認 
</template>
<script>
export default {
  name: "tgMemberLock",
  mounted() {
    this.get_data(1);
    this.get_member_tag_option();
    this.get_remark_group_option();
  },
  data() {
    let today = new Date();
    let last;
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    let date_s = y + "-" + m + "-" + d + " 00:00:00";
    let date_e = y + "-" + m + "-" + d + " 23:59:59";
    return {
      now_page: 1,
      page_size: 100,
      total_page: 0,
      tableData: [],
      member_tag_option: [],
      remark_group_option: [],
      search_time_range: [date_s, date_e],
      search_admin: "",
      lock_btn: false,
      newDialog: false,
      form: {
        member_tag: "",
        remark_group: "",
        remark: ""
      },
      rules: {
        member_tag: [
          {
            required: true,
            message: "請選擇會員標籤",
            trigger: "change"
          }
        ],
        remark_group: [
          {
            required: true,
            message: "請填寫備註類型",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: true,
            message: "請填寫備註內容",
            trigger: "change"
          }
        ]
      }
    };
  },
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
    get_remark_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserNoteGroup",
        data: {
          Status: 1
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            self.remark_group_option.push({
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
    get_data(now_page) {
      if (this.search_time_range == null) {
        this.$message.error("請選擇搜尋日期範圍");
        return;
      }
      let self = this;
      var data = new FormData();
      if (self.search_time_range[0]) {
        data.append("StartDT", self.search_time_range[0]);
      }
      if (self.search_time_range[1]) {
        data.append("EndDT", self.search_time_range[1]);
      }
      data.append("EditUserName", self.search_admin);
      data.append("Page", now_page);
      data.append("PageLimit", self.page_size);
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/FreezeAccountList",
        data: data
      })
        .then(function(response) {
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    init_dialog(form) {
      this.$refs[form].resetFields();
      this.lock_btn = false;
    },
    add_lock() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Member_All/FreezeAccountManage",
            data: {
              TagId: self.form.member_tag,
              GroupId: self.form.remark_group,
              Note: self.form.remark
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data(1);
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
    }
  }
};
</script>