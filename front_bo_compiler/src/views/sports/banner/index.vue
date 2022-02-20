<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.sportAddBanner", @click="$router.push('/sportBannerCreate?title=新增 Banner')") 新增 Banner
    //- 分页 表格上方
    .justify-content-end
      el-pagination(
        :background="true",
        :hide-on-single-page="true",
        :pager-count="5",
        layout="sizes, prev, pager, next, jumper, total",
        :page-sizes="[20, 50, 100, 200, 300, 400, 500]",
        :page-size="pageSize",
        :total="dataTotal",
        :current-page.sync="currentPage",
        @current-change="getData",
        @size-change="size => { pageSize = size; getData() }"
      )
    .row
      el-table(:data="tableData", height="75vh")
        el-table-column(v-if="fieldPerms.bannerPEGroupId", label="位置", align="center", width="100")
          template(slot-scope="{ row }")
            span {{ row.bannerPEGroupId.display }}
        el-table-column(v-if="fieldPerms.bannerPEType", label="类型", align="center", width="80")
          template(slot-scope="{ row }")
            span {{ bannerType[row.bannerPEType] }}
        el-table-column(v-if="fieldPerms.bannerPEDevice", label="设备", align="center", width="120")
          template(slot-scope="{ row }")
            span(v-for="device in row.bannerPEDevice.display.split(',')") {{ device }}<br>
        el-table-column(v-if="fieldPerms.bannerPETitle", prop="bannerPETitle", label="标题", align="center")
        el-table-column(label="图片 / 影片", width="180", align="center")
          template(slot-scope="{ row }")
            img.v-100.w-100(
              v-if="row.bannerPEType === 1",
              :src="(row.bannerPEImagePc || row.bannerPEImageMobile) | urlAddTimestamp"
            )
            video.w-100(v-if="row.bannerPEType === 2", autoplay)
              source(:src="row.bannerPEVideo")
        el-table-column(v-if="fieldPerms.bannerPELinkType",label="跳转位置", width="120", align="center")
          span(slot-scope="{ row }") {{ deepLinkCategories[row.bannerPELinkType] }}
        el-table-column(
          v-if="fieldPerms.bannerPETimeStart || fieldPerms.bannerPETimeEnd",
          label="上下架时间",
          width="180",
          align="center"
        )
          template(slot-scope="{ row }")
            span {{ row.bannerPETimeStart || '--' }}
            br
            span ~
            br
            span {{ row.bannerPETimeEnd || '--' }}
        el-table-column(v-if="fieldPerms.bannerPEStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.bannerPEStatus.value === 0", type="danger") {{ row.bannerPEStatus.display }}
            el-tag(v-if="row.bannerPEStatus.value === 1", type="success") {{ row.bannerPEStatus.display }}
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link.text-danger(v-if="buttonPerms.sportDeleteBanner", @click="deleteBanner(row)") 删除
              template(v-if="buttonPerms.sportEditBannerStatus && fieldPerms.bannerPEStatus")
                el-link.mx-1.text-success(
                  v-if="row.bannerPEStatus.value === 0",
                  @click="enableBanner(row.id)"
                ) 启用
                el-link.mx-1(
                  v-if="row.bannerPEStatus.value === 1",
                  @click="disableBanner(row.id)"
                ) 停用
              el-link
                router-link.links.mx-1(
                  :to="{ path:'sportBannerCreate', query: { title: `Banner - ${row.bannerPETitle}`, id: row.id } }"
                ) 编辑
</template>

<script>
import { getBannersAPI, deleteBannerAPI, editBannerAPI, getBannerGroupAPI } from '@/api/site/banner';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      bannerType: { 1: '图片', 2: '影片'},
      filterList: [
        {
          label: '类型',
          model: 'banner_type',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 1: '图片 Image', 2: '影片 Video' },
          },
        },
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '关闭', 1: '开启' },
          },
        },
        { label: '标题', model: 'title', component: 'filterInput', props: { type: 'text' }},
      ]
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
    getBannerGroupAPI().then(response => {
      const options = response.data.data;
      delete options[3];

      this.filterList.push({
        label: '位置',
        model: 'banner_group_id',
        component: 'filterSelect',
        props: { options }
      });
    });
  },
  computed: {
    deepLinkCategories() {
      return this.$store.state.common.deepLinkCategories;
    }
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        platform: 2
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getBannersAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    deleteBanner(banner) {
      this.$swal({
        title: '确定删除？',
        text: `您即将删除 ${banner.bannerPETitle || 'Banner'}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认删除！',
        cancelButtonText: '取消'
      })
        .then(result => {
          if (result.value) {
            return deleteBannerAPI(banner.id);
          }

          return Promise.reject();
        })
        .then(() => {
          this.getData();
          this.$message.success('Banner 删除成功！');
        })
        .catch(() => {})
    },
    disableBanner(id) {
      editBannerAPI(id, { status: 0 }).then(response => {
        const responseBanner = response.data.data[0];
        this.tableData.find(banner => banner.id === responseBanner.id).bannerPEStatus = responseBanner.bannerPEStatus;
      })
    },
    enableBanner(id) {
      editBannerAPI(id, { status: 1 }).then(response => {
        const responseBanner = response.data.data[0];
        this.tableData.find(banner => banner.id === responseBanner.id).bannerPEStatus = responseBanner.bannerPEStatus;
      })
    }
  }
}
</script>
