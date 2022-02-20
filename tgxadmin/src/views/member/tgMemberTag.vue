<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 用戶標籤
    .row.px-3.py-3
      div.px-1.py-1(:style='width="400"')
       el-date-picker(size="medium", v-model='search_time_range', type='datetimerange', range-separator='至', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']", clearable)
      div.px-1.py-1(:style='width="400"')
        el-select(size="medium" , v-model='search_group', placeholder='選擇會員群組', @change="search_tag='', get_tag_option()", clearable)
          el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
      div.px-1.py-1(:style='width="400"')
        el-select(size="medium" , v-model='search_tag', placeholder='選擇標籤', @change="get_data(1)", clearable)
          el-option(v-for='item in tag_option', :key='item.value', :label='item.label', :value='item.value')
      div.px-1.py-1(:style='width="400"')
        el-input(size="medium", placeholder='輸入操作人', v-model='search_edituser', @keyup.enter.native="get_data(1)", clearable)
          el-button(slot='append', icon='el-icon-search', @click="get_data(1)")
      // el-button(size="medium", icon='el-icon-delete')
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
            //- el-table-column(type='selection', width='48', align='center')
            //el-table-column(prop='tag', label='標籤', width='200', align='center')
              template(slot-scope='scope')
                el-tag(:type="scope.row.colortype") {{scope.row.tag}}
            el-table-column(prop='GroupName', label='群組名稱')
            el-table-column(prop='TagName', label='標籤名稱')
            el-table-column(label='會員帳號')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='EditUserName', label='操作人')
            el-table-column(prop='Update_At', label='更新日期',width='165')
            el-table-column(label='操作', width='100', align='center')
              template(slot-scope='scope')
                a.cancel(@click='handleDeleteComfirm(scope.row.Sn)', type='text') 刪除
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
  name: "tgMemberTag",
  mounted() {
    this.init();
  },
  data() {
    return {
      tableData: [],
      selected_user: [],
      member_tag_option: [],
      now_page: 1,
      page_size: 100,
      total_page: 0,
      group_option: [],
      tag_option: [],
      search_time_range: null,
      search_group: "",
      search_tag: "",
      search_edituser: "",
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
    async init() {
      await this.get_group_option();
      if (this.$route.query.tag_group) {
        this.search_group = this.$route.query.tag_group;
      }
      await this.get_tag_option();
      if (this.$route.query.tag_id) {
        this.search_tag = this.$route.query.tag_id;
      }
      this.get_data(1);
      this.get_member_tag_option();
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
    get_group_option() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.group_option.push({
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
    get_tag_option() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagList",
        data: {
          Type: "Detail",
          GroupId: self.search_group
        }
      })
        .then(function(response) {
          self.tag_option = [];
          response.data.data.data_list.forEach(function(item, index, array) {
            self.tag_option.push({
              value: item.TagId,
              label: item.TagName
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
      let self = this;
      if (self.search_time_range == null) {
        self.search_time_range = [];
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagData",
        data: {
          TagId: self.search_tag,
          EditUserName: self.search_edituser,
          StartDT: self.search_time_range[0],
          EndDT: self.search_time_range[1],
          Page: now_page,
          PageLimit: self.page_size
        }
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
    handleDeleteComfirm(user_id) {
      let self = this;
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_tag(user_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_tag(user_id) {
      let self = this;
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Member_All/UserTagDataManage/Delete",
        data: {
          Sn: user_id
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.get_data();
            self.$message({
              message: "刪除成功",
              type: "success"
            });
          } else {
            self.$message.error("刪除失敗 " + response.data.error_message);
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
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