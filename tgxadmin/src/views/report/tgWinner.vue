<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5(style="display: inline-block;") 贏家日報
        el-tooltip(class="item" effect="light" content="勾選會員帳號前的複選框後，點擊標籤管理按鈕，可將選種會員批次加入會員標籤" placement="right")
          i(class="el-icon-info")
    .row.no-gutters.px-3.py-3
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
      .col-md-1.col-12.px-1.py-1
        el-select(size='medium', v-model='search_game_group_id', placeholder='選擇遊戲平台')
          el-option(v-for='item in gameGroup', :key='item.GroupId', :label='item.GroupName', :value='item.GroupId')
      .col-md-2.col-12.px-1.py-1
        el-input(size="medium", placeholder='輸入遊戲名稱', v-model='search_gmae', clearable)
      .col-md-2.col-12.px-1.py-1
        el-select(size='medium', v-model='search_sort', placeholder='選擇排序方式')
          el-option(label='依投注次數排序', value=1)
          el-option(label='依總流水排序', value=2)
          el-option(label='依殺數排序', value=3)
          el-option(label='依會員輸贏排序', value=4)
      .col-md-1.col-12.px-1.py-1
        el-button(@click='get_data(1)', size="medium", type='primary', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-6
        el-button(size="medium", type='primary', @click='tagDialog = true') 標籤管理
      .col-6.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', show-summary='', :summary-method="getSummaries", style='width:100%', @selection-change="(val) => {selected_user = val.map(row => row.UserName) }")
            el-table-column(type="selection", width="60", align='center')
            el-table-column(prop='Number', label='#', width='60', align='center')
            el-table-column(label='會員帳號', width='150')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='status', label='會員標籤', width='240', align='center')
              template(slot-scope='scope')
                el-tag.mx-1.my-1(v-if='scope.row.TagName' v-for='item in scope.row.TagName.split(",")', :key='item', type="primary", disable-transitions='') {{item}}
                el-tag(v-else type="primary", disable-transitions='') 無
            el-table-column(label='來源', align='right')
              template(slot-scope='scope')
                span {{scope.row.GroupName}}
            el-table-column(prop='TotalBetCount', label='投注次數', align='right')
              template(slot-scope='scope')
                span {{scope.row.TotalBetCount | commaFormat}}
            el-table-column(prop='TotalBetAmount', label='總流水', align='right')
              template(slot-scope='scope')
                span {{scope.row.TotalBetAmount | commaFormat}}
            el-table-column(prop='KillAvg', label='殺數', align='right')
              template(slot-scope='scope')
                span {{scope.row.KillAvg | commaFormat}}
            el-table-column(prop='TotalBalanceAmount', label='會員輸贏', align='right')
              template(slot-scope='scope')
                span {{scope.row.TotalBalanceAmount | commaFormat}}
            el-table-column(label='操作', width='60', align='center')
              template(slot-scope='scope')
                router-link.links(:to='{name:"tgWinAndLoss", query:{"Date_S":search_time_range[0], "Date_E":search_time_range[1], "GameGroupId":search_game_group_id, "GameGroupName":search_gmae, "UserName":scope.row.UserName}}') 查看
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
  name: "tgWinner",
  mounted() {
    this.formInit();
    this.get_game_group();
    if (this.$route.query.GameName) {
      this.search_time_range = [
        this.$route.query.Date_S,
        this.$route.query.Date_E
      ];
      this.search_game_group_id = this.$route.query.GameGroupId;
      this.search_gmae = this.$route.query.GameName;
    }
    this.get_data(1);
    this.get_member_tag_option();
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
    formInit() {
      let today = new Date();
      today = today.toLocaleDateString().replace(/\//g, "-");
      today =
        today.split("-")[0] +
        "-" +
        (today.split("-")[1] < 10
          ? "0" + today.split("-")[1]
          : today.split("-")[1]) +
        "-" +
        (today.split("-")[2] < 10
          ? "0" + today.split("-")[2]
          : today.split("-")[2]);

      this.search_time_range = [today, today];
      this.search_game_group_id = "1";
      this.search_sort = "1";
    },
    get_data(now_page) {
      this.lock_btn = true;
      let self = this;
      let payload = {
        Date_S: self.search_time_range[0],
        Date_E: self.search_time_range[1],
        GameGroupId: self.search_game_group_id,
        SortType: self.search_sort,
        Page: now_page,
        PageLimit: self.page_size
      };
      if (self.search_gmae) {
        payload.GameName = self.search_gmae;
      }
      axios
        .post(process.env.VUE_APP_APIHOST + "Admin/GetWinnerReport/", payload)
        .then(function(response) {
          if (response.data.status === 1) {
            let tmpArr = [];
            Object.keys(response.data.data.WinnerReport).forEach(function(
              item,
              index,
              array
            ) {
              response.data.data.WinnerReport[item].Number = item;
              if (self.search_gmae) {
                response.data.data.WinnerReport[item].GroupName +=
                  "-" + self.search_gmae;
              }
              tmpArr.push(response.data.data.WinnerReport[item]);
            });
            self.total = response.data.data;
            self.now_page = now_page;
            self.total_page = parseInt(response.data.data.total_rows);
            self.tableData = tmpArr;
          } else {
            self.$message.error(response.data.error_message);
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    get_game_group() {
      let self = this;
      axios
        .post(process.env.VUE_APP_APIHOST + "Web_Page/GameGroup/")
        .then(function(response) {
          response.data.data = response.data.data.filter(function(
            item,
            index,
            array
          ) {
            return item.GroupId != 4;
          });
          self.gameGroup = response.data.data;
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
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
    getSummaries(param) {
      let self = this;
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合計";
          return;
        }
        sums[index] = self.total[column.property];
        if (!Number.isNaN(sums[index]) && sums[index] !== undefined) {
          sums[index] = sums[index]
            .toString()
            .replace(
              /^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
              (all, pre, groupOf3Digital) =>
                pre + groupOf3Digital.replace(/\d{3}/g, ",$&")
            );
        }
      });
      return sums;
    }
  },
  data() {
    return {
      tableData: [],
      total: "",
      selected_user: [],
      member_tag_option: [],
      gameGroup: [],
      search_time_range: [],
      search_game_group_id: "1",
      search_gmae: "",
      search_sort: "1",
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
  }
};
</script>
