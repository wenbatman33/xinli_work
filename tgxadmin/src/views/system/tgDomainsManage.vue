<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 網域管理
      .col-6.d-flex.justify-content-end
        el-button(@click='openAddForm', size="medium", type='primary') 新增網域
    .row.no-gutters.px-3.py-3.d-flex.justify-content-between
      .col-md-12.col-12
        el-form(label-width='80px', label-position='left')
          .row.no-gutters
            .col-md-5.col-12.px-1.py-1
              el-form-item.mb-0(label='顯示名稱')
                el-input(size='medium', placeholder='輸入搜尋網域顯示名稱', v-model='search_name', @keyup.enter.native="get_data()")
            .col-md-5.col-12.px-1.py-1
              el-form-item.mb-0(label='網域名稱')
                el-input(size='medium', placeholder='輸入搜尋網域名稱', v-model='search_domain', @keyup.enter.native="get_data()")
            .col-md-4.col-12.px-1.py-1
              el-form-item.mb-0(label='專案名稱')
                el-input(size='medium', placeholder='輸入搜尋專案名稱', v-model='search_project', @keyup.enter.native="get_data()")
            .col-md-3.col-12.px-1.py-1
              el-form-item.mb-0(label='網域狀態')
                el-select(size='medium', v-model='search_status', placeholder='選擇狀態')
                  el-option(v-for='item in statusGroup' :key="item.key" :label='item.value', :value='item.key')
            .col-md-3.col-12.px-1.py-1
              el-form-item.mb-0(label='網域類型')
                el-select(size='medium', v-model='search_type', placeholder='選擇類型')
                  el-option(v-for='item in typeGroup' :key="item.key" :label='item.value', :value='item.key')
            .col-md-2.col-12.px-1.py-1
              el-button(size="medium", type='primary', @click='get_data()', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data() }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%')
            el-table-column(prop='Sn', label='流水編號', width='180')
            el-table-column(prop='Name', label='網域顯示名稱', align='right')
            el-table-column(prop='Domain', label='網域名稱', align='right')
            el-table-column(prop='TrferOutPeople', label='使用狀態', align='right')
              template(slot-scope="scope" )
                span(v-if="scope.row.Status") {{ statusGroup[scope.row.Status].value }}
            el-table-column(prop='TrferOutCount', label='網域類型', align='right')
              template(slot-scope="scope" )
                span(v-if="scope.row.Type") {{ typeGroup[scope.row.Type].value }}
                span(v-else) 未使用
            el-table-column(prop='ProjectName', label='使用專案名稱', align='right')
            el-table-column(prop='Note', label='備註', align='right')
            el-table-column(label='操作', width='140', align='center')
              template(slot-scope="scope" )
                a.links( type='text', @click='getSelectData(scope.row.Sn)') 編輯
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data() }", :total='total_page')

    //--Dialog
    el-dialog(:title='DialogTitle', :visible.sync='Dialog', @close="formInit")
      el-form.mr-3(:model="form", :rules="rules", ref="edit_form", status-icon)
        el-form-item(label='網域顯示名稱', prop="name", label-width="120px" ,label-position='left')
          el-input(v-model='form.name', placeholder='輸入網域顯示名稱', clearable)
        el-form-item(label='網域名稱', prop="domain", label-width="120px" ,label-position='left')
          el-input(v-model='form.domain', placeholder='輸入網域', clearable)
        el-form-item(label='網域狀態', prop="no", label-width="120px" ,label-position='left')
          el-select(v-model='form.status', size='medium', placeholder='選擇網域狀態', clearable)
            el-option(v-for='item in statusGroup.slice(1)' :key="item.key" :label='item.value', :value='item.key')
        el-form-item(label='使用類型', prop="no", label-width="120px" ,label-position='left')
          el-select(v-model='form.type', size='medium', placeholder='選擇使用類型', clearable)
            el-option(v-for='item in typeGroup.slice(1)' :key="item.key" :label='item.value', :value='item.key')
        el-form-item(label='使用專案', prop="no", label-width="120px" ,label-position='left')
          el-input.mt-2(v-model='form.project', placeholder='輸入使用專案', clearable)
        el-form-item(label='備註', prop="no", label-width="120px" ,label-position='left')
          el-input.mt-2(type='textarea', rows='5', v-model='form.note', placeholder='輸入備註', clearable)
      .dialog-footer(slot='footer')
        el-button(@click='Dialog = false') 取 消
        el-button(type='primary', @click='submit()', :loading='lock_btn') 確 認 
</template>
<script>
export default {
  name: "tgDomainsManage",
  mounted() {
    this.get_data();
  },
  methods: {
    formInit() {
      this.$refs["edit_form"].resetFields();
      this.form.name = "";
      this.form.domain = "";
      this.form.type = "";
      this.form.project = "";
      this.form.note = "";
      this.form.status = "";
      this.form.sn = "";
    },
    get_data(now_page = null) {
      this.lock_btn = true;
      let self = this;
      self.now_page = now_page == null ? self.now_page : now_page;
      let payload = {
        Domain: self.search_domain,
        Name: self.search_name,
        Status: self.search_status,
        Type: self.search_type,
        ProjectName: self.search_project,
        Page: now_page,
        PageLimit: self.page_size
      };
      axios
        .post(process.env.VUE_APP_APIHOST + "Admin/GetDomainsList/", payload)
        .then(function(response) {
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
    openAddForm() {
      this.form.sn = "";
      this.DialogTitle = "新增網域";
      this.Dialog = true;
      this.Method = "Add";
    },
    getSelectData(Sn) {
      let tmpData;
      this.tableData.forEach(function(item, index, array) {
        if (item.Sn == Sn) {
          tmpData = item;
          return false;
        }
      });

      this.form.sn = Sn;
      this.form.name = tmpData.Name;
      this.form.domain = tmpData.Domain;
      this.form.type = tmpData.Type != null ? parseInt(tmpData.Type) : "";
      this.form.project = tmpData.ProjectName;
      this.form.note = tmpData.Note;
      this.form.status = tmpData.Type != null ? parseInt(tmpData.Status) : "";
      this.DialogTitle = "修改網域";
      this.Dialog = true;
      this.Method = "Edit";
    },
    submit() {
      this.lock_btn = true;
      let self = this;
      let payload = {
        Domain: self.form.domain,
        Name: self.form.name,
        Status: self.form.status,
        Type: self.form.type,
        ProjectName: self.form.project,
        Note: self.form.note
      };
      if (self.Method == "Edit") {
        payload["Sn"] = self.form.sn;
      }
      axios
        .post(
          process.env.VUE_APP_APIHOST + "Admin/DomainsManage/" + self.Method,
          payload
        )
        .then(function(response) {
          if (response.data.status == 1) {
            self.$message({
              message: "處理成功",
              type: "success"
            });
          } else {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.get_data();
          self.lock_btn = false;
          self.Dialog = false;
        });
    }
  },
  data() {
    return {
      tableData: [],
      lock_btn: false,
      now_page: 1,
      total_page: 0,
      page_size: "30",

      statusGroup: [
        { key: "", value: "不限" },
        { key: 1, value: "使用中網域" },
        { key: 2, value: "備用網域" },
        { key: 3, value: "庫存網域" },
        { key: 4, value: "停用網域" }
      ],
      typeGroup: [
        { key: "", value: "不限" },
        { key: 1, value: "主推" },
        { key: 2, value: "次推" },
        { key: 3, value: "主推portal" },
        { key: 4, value: "次推portal" },
        { key: 5, value: "廠商遊戲頁" },
        { key: 6, value: "API Proxy" },
        { key: 7, value: "靜態頁" },
        { key: 8, value: "API" },
        { key: 9, value: "管理後台" },
        { key: 10, value: "活動頁" }
      ],
      search_type: "",
      search_status: 1,
      search_name: "",
      search_domain: "",
      search_project: "",
      Dialog: false,
      DialogTitle: "",
      Method: "",

      form: {
        name: "",
        domain: "",
        type: "",
        project: "",
        note: "",
        status: "",
        sn: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "請輸入網域顯示名稱",
            trigger: "change"
          }
        ],
        domain: [
          {
            required: true,
            message: "請輸入網域名稱",
            trigger: "change"
          }
        ]
      }
    };
  }
};
</script>