<template lang="pug">
  .container-fluid
    .d-flex.justify-content-end
      el-button.mb-2(@click="addGoods") 新增商品
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
      el-table(:data="tableData", border, stripe, height="75vh")
        el-table-column(label="流水号", prop="id", align="center", width="150")
        el-table-column(label="类型", prop="type.display", align="center", width="100")
        el-table-column(label="商品名称", prop="name", align="center", show-overflow-tooltip)
        el-table-column(label="兑换梦基金", align="center", width="150")
          span(slot-scope="{ row }") {{ row.point | formatMoney }}
        el-table-column(label="更新时间", prop="updated_at", align="center", width="180")
        el-table-column(label="状态", prop="status.display", align="center", width="100")
        el-table-column(label="操作", align="center", width="200")
          template(slot-scope="{ row }")
            el-link.mx-1.text-primary(@click="editGoods(row)") 编辑
            el-link.mx-1.text-primary(@click="openBuyerList(row)") 查看名单
            el-link.mx-1.text-danger(v-if="row.status.value", @click="editGoodsStatus(row, 0)") 下架
            el-link.mx-1.text-success(v-else, @click="editGoodsStatus(row, 1)") 上架
    //- goods dialog
    el-dialog(
      title="梦之城商城",
      :visible.sync="dialogVisible",
      width="80%",
      top="5vh",
      @close="resetImageList",
      @closed="closeDialog",
      destroy-on-close
    )
      //- label-width auto 会导致重整会有Error (https://github.com/ElemeFE/element/issues/17617)
      el-form(:model="formData", :rules="rules", ref="goodsForm", :label-width="dialogVisible ? 'auto' : ''")
        el-form-item(label="商品类型", prop="type")
          el-select(v-model="formData.type")
            el-option(v-for="(type, index) in goodsTypes" :key="index" :label="type" :value="index")
        el-form-item(label="商品类别", prop="category")
          el-select(v-model="formData.category")
            el-option(v-for="(category, index) in goodsCategories" :key="index" :label="category" :value="index")
        el-form-item(label="商品名称", prop="name")
          el-input(v-model="formData.name", placeholder="梦工厂¥100")
        el-form-item(label="商品内容", prop="content")
          ckeditor(v-model="formData.content")
        el-form-item(label="商品图片", prop="img_path")
          el-upload(
            :http-request="uploadImage",
            action="",
            list-type="picture-card",
            :on-remove="handleRemoveImage",
            :on-preview="handleImagePreview",
            :on-success="handleSuccess",
            :file-list="imageList",
            :limit="10",
            accept="image/jpeg,image/gif,image/png",
            :on-exceed="handleExceed"
          )
            i.el-icon-plus
            el-dialog(:visible.sync="dialogImageVisible", append-to-body)
              img(width="100%", :src="dialogImageUrl")
        el-form-item(label="商品货号", prop="goods_no")
          el-input(
            v-model="formData.goods_no",
            @input="formData.goods_no = formData.goods_no.replace(/[^a-zA-Z0-9]/g, '')",
            placeholder="只接受英数字符"
          )
        el-form-item(label="兑换梦基金", prop="point")
          el-input(v-model="formData.point", type="number")
            span.text-danger(slot="append")
              span(v-if="formData.point < 1000") 输入金额过低,&nbsp;
              span 100梦基金=1元人民币
        el-form-item(label="数量")
          el-input(v-model="formData.quantity", type="number")
            span(slot="append") 不填写无限制
        el-form-item(label="上架", prop="status")
          el-switch(v-model="formData.status", :inactive-value="0", :active-value="1")
        .text-right
          el-button(@click="dialogVisible = false") 取消
          el-button(type="primary", @click="handleSubmit") 确认

</template>

<script>
import { getGoodsListAPI, addGoodsAPI, editGoodsAPI } from '@/api/dreamCity/goods';
import { uploadImageAPI } from '@/api/common';
import ckeditor from '@/components/CKEditor';

export default {
  components: { ckeditor },
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      dialogVisible: false,
      goodsTypes: ['虚拟', '实体'],
      goodsCategories: ['现金', '电话卡'],
      formData: {
        type: 0,
        category: 0,
        name: '',
        content: '',
        goods_no: '',
        point: 0,
        quantity: 0,
        status: 1,
        img_path: []
      },
      rules: {
        type: [
          { required: true, message: '必须选择一种商品类型', trigger: 'submit'}
        ],
        category: [
          { required: true, message: '必须选择一种商品类别', trigger: 'submit' }
        ],
        name: [
          { required: true, message: '商品名称为必填', trigger: 'submit' }
        ],
        content: [
          { required: true, message: '商品内容为必填', trigger: 'submit' }
        ],
        goods_no: [
          { required: true, message: '商品货号为必填', trigger: 'submit' }
        ],
        point: [
          { required: true, message: '兑换梦基金为必填', trigger: 'submit' }
        ],
        status: [
          { required: true, message: '上下架为必填', trigger: 'submit' }
        ],
        img_path: [
          { required: true, message: '必须上传商品图片', trigger: 'submit' }
        ],
      },
      dialogImageVisible: false,
      dialogImageUrl: '',
      imageList: [],
      blobUrl: {}
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getGoodsListAPI({
        per_page: this.pageSize,
        page: this.currentPage,
      }).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    addGoods() {
      this.dialogVisible = true;
    },
    handleImagePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },
    handleRemoveImage(file) {
      this.formData.img_path = this.formData.img_path.filter(url => {
        return ! (url === file.url || url === file.realUrl)
      })
    },
    uploadImage(option) {
      let formData = new FormData();
      formData.append('path', 'goods');
      formData.append('images', option.file);

      uploadImageAPI(formData).then(response => {
        option.onSuccess(response);
      }, () => {
        this.$message.error('图片上传失败, 请洽相关人员！');
        option.onError();
      });
    },
    handleSuccess(response, file) {
      file.realUrl = response.data.url;
      this.blobUrl[response.data.url] = file.url;
      this.formData.img_path.push(response.data.url);
    },
    handleExceed() {
      this.$message.warning('最多上传10张图片');
    },
    handleSubmit() {
      this.$refs.goodsForm.validate(valid => {
        if (valid) {
          const request = this.formData.id ? this.handleEditGoods : this.handleAddGoods;
          this.formData.quantity = this.formData.quantity || 0;

          request()
        }
      })
    },
    handleAddGoods() {
      return addGoodsAPI(this.formData).then(response => {
        this.tableData.unshift(response.data.data[0]);
        this.dialogVisible = false;
        this.$message.success('新增商品成功');
      });
    },
    handleEditGoods() {
      return editGoodsAPI(this.formData.id, this.formData).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(goods => goods.id === response.data.data[0].id),
          response.data.data[0]
        );
        this.dialogVisible = false;
        this.$message.success('编辑商品成功');
      })
    },
    editGoodsStatus(goods, status) {
      editGoodsAPI(goods.id, { status }).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(goods => goods.id === response.data.data[0].id),
          response.data.data[0]
        )
        this.$swal('成功！', `商品【${goods.name}】已成功${['下架', '上架'][status]}`, 'success');
      })
    },
    editGoods(goods) {
      this.formData = {...goods};
      this.formData.type = this.formData.type.value;
      this.formData.category = this.formData.category.value;
      this.formData.status = this.formData.status.value;
      this.imageList = this.formData.img_path.map(url => {
        if (this.blobUrl[url]) {
          return {
            url: this.blobUrl[url],
            realUrl: url
          }
        }

        return { realUrl: url, url: this.$options.filters.urlAddTimestamp(url) };
      });
      this.dialogVisible = true;
    },
    closeDialog() {
      this.formData = {
        type: 0,
        category: 0,
        name: '',
        content: '',
        goods_no: '',
        point: 0,
        quantity: 0,
        status: 1,
        img_path: []
      }
    },
    resetImageList() {
      this.imageList = [];
    },
    openBuyerList({ id, name }) {
      this.$router.push({
        path: '/goodsBuyer',
        query: { id, title: name + ' 兑换名单' }
      });
    }
  }
}
</script>
