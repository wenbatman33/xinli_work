<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 會員清單
    .row.no-gutters.px-3.py-3
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size='medium', v-model='search_time_range', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
      .col-md-3.col-12.px-1.py-1.d-flex.justify-content-center
        el-select(size='medium', v-model='search_field', clearable='', placeholder='選擇搜尋條件')
          el-option(v-for='item in field_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.px-1.py-1.d-flex.justify-content-between
        el-input(size='medium', v-model='search_min', clearable='', placeholder='輸入最低金額')
        span.tiptext.align-self-center.px-1.py-1 ～
        el-input(size='medium', v-model='search_max', clearable='', placeholder='輸入最大金額')
    .row.no-gutters.px-3.py-3
      .col-md-3.col-12.px-1.py-1.d-flex.justify-content-center
        el-select(size='medium', v-model='search_type', clearable='', placeholder='選擇搜尋條件')
          el-option( label='會員帳號', value='UserName')
          el-option( label='代理帳號', value='AgencyId')
      .col-md-3.col-12.px-1.py-1.d-flex.justify-content-center
        el-input(size='medium', v-model='search_account', clearable='', placeholder='輸入帳號')
      .col-md-1.col-12.px-1.py-1.d-flex.justify-content-center
        el-button(@click='get_data(1)', size="medium", type='primary') 搜 尋
      //- .col-md-1.col-12
        el-button(@click='newDialog = true', size="medium") 匯 出 
    //--Table
    .row.no-gutters.px-3
      .col-6
        el-button(size="medium", type='primary', @click='tagDialog = true') 標籤管理
      .col-6.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%', @sort-change='sort_table')
            el-table-column(type="selection")
            el-table-column(label='會員帳號', width='150')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='RealName', label='會員姓名', width='120')
            el-table-column(prop='AgencyId', label='代理帳號', width='120')
            el-table-column(label='手機驗證', width='120', align='center')
              template(slot-scope='scope')
                el-tag(v-if="scope.row.PhoneStatus == '完成'", type="success") {{scope.row.PhoneStatus}}
                el-tag(v-else,type="danger") {{scope.row.PhoneStatus}} 
            el-table-column(label='信箱驗證', width='120', align='center')
              template(slot-scope='scope')
                el-tag(v-if="scope.row.EmailStatus == '完成'", type="success") {{scope.row.EmailStatus}}
                el-tag(v-else,type="danger") {{scope.row.EmailStatus}} 
            el-table-column(prop='Aid', label='來源',  width='180')
            el-table-column(prop='Cash', label='錢包總額', sortable='custom', width='180')
            el-table-column(prop='BalanceAmount', label='總輸贏', sortable='custom', width='180')
            el-table-column(prop='DepositAmount', label='總存款', sortable='custom', width='180')
            el-table-column(prop='WithDrawAmount', label='總提款', sortable='custom', width='180')
            el-table-column(prop='BettingAmount', label='總流水', sortable='custom', width='180')
            el-table-column(prop='ReturnAmount', label='總返水', sortable='custom', width='180')
            el-table-column(prop='BonusAmount', label='總紅利', sortable='custom', width='180')
            el-table-column(prop='LastLogin', label='最後登入時間', width='170', sortable='custom', align='right')
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
  name: "tgMemberDealings",
  mounted() {
    this.get_data(1);
    this.get_member_tag_option();
  },
  data() {
    return {
      search_sort_field: "LastLogin",
      search_sort_type: "1",
      tableData: [],
      selected_user: [],
      member_tag_option: [],
      field_option: [
        {
          value: "",
          label: "不限條件"
        },
        {
          value: "Cash",
          label: "錢包總額"
        },
        {
          value: "BalanceAmount",
          label: "總輸贏"
        },
        {
          value: "DepositAmount",
          label: "總存款"
        },
        {
          value: "WithDrawAmount",
          label: "總提款"
        },
        {
          value: "BettingAmount",
          label: "總流水"
        },
        {
          value: "ReturnAmount",
          label: "總返水"
        }
      ],
      search_time_range: [],
      search_field: "",
      search_min: "",
      search_max: "",
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
      let formdata = {
        WalletName: self.search_field,
        MinAmount: self.search_min,
        MaxAmount: self.search_max,
        StartDT: self.search_time_range[0],
        EndDT: self.search_time_range[1],
        OrderName: self.search_sort_field,
        OrderByDesc: self.search_sort_type,
        Page: now_page,
        PageLimit: self.page_size
      };
      formdata[self.search_type] = self.search_account;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/AdminWalletMemberList",
        data: formdata
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
    },
    sort_table({ column, prop, order }) {
      this.search_sort_field = prop;
      if (order == null || order == "descending") {
        this.search_sort_type = "1";
      } else {
        this.search_sort_type = "0";
      }
      this.get_data(1);
    }
  }
};
</script>
