<template lang="pug">
  .container-fluid
    el-form(:model="formData", ref="form", label-width="160px", :rules="rules", status-icon)
      el-form-item(label="PC 名称 (中)", prop="name_pc")
        el-input(v-model="formData.name_pc", placeholder="请输入名称")
      el-form-item(label="Mobile 名称 (中)", prop="name_mobile")
        el-input(v-model="formData.name_mobile", placeholder="请输入名称")
      el-form-item(label="Mobile Logo Active", prop="background_mobile_active")
        el-upload(
          :http-request="setFile",
          :on-remove="removeBackgroundMobileActive",
          ref="background_mobile_active",
          :file-list="backgroundMobileActiveList",
          list-type="picture",
          action="",
          :limit=1,
          accept="image/jpeg,image/gif,image/png",
          :on-exceed="handleExceed"
        )
          el-button(slot="trigger", size="mini", @click="uploadField = 'background_mobile_active'") 选取图片
          span.ml-3 档案限制 1 MB，尺寸 1110 X 1000
      el-form-item(label="Mobile Logo Unactive", prop="background_mobile_unactive")
        el-upload(
          :http-request="setFile",
          :on-remove="removeBackgroundMobileUnactive",
          ref="background_mobile_unactive",
          :file-list="backgroundMobileUnactiveList",
          list-type="picture",
          action="",
          :limit=1,
          accept="image/jpeg,image/gif,image/png",
          :on-exceed="handleExceed"
        )
          el-button(slot="trigger", size="mini", @click="uploadField = 'background_mobile_unactive'") 选取图片
          span.ml-3 档案限制 1 MB，尺寸 1110 X 1000
      el-divider(content-position="left")
        | 推荐区
      el-form-item(label="推荐名称 (中文)", prop="recommend_name_ch")
        el-input(v-model="formData.recommend_name_ch", placeholder="请输入名称")
      el-form-item(label="推荐名称 (英文)", prop="recommend_name_en")
        el-input(v-model="formData.recommend_name_en", placeholder="请输入名称")
      el-form-item(label="推荐背景图", prop="recommend_background")
        el-upload(
          :http-request="setFile",
          :on-remove="removeRecommendBackground",
          ref="recommend_background",
          :file-list="recommendBackgroundList",
          list-type="picture",
          action="",
          :limit=1,
          accept="image/jpeg,image/gif,image/png",
          :on-exceed="handleExceed"
        )
          el-button(slot="trigger", size="mini", @click="uploadField = 'recommend_background'") 选取图片
          span.ml-3 档案限制 1 MB，尺寸 1110 X 1000
      el-form-item(label="推荐主视觉", prop="recommend_role")
        el-upload(
          :http-request="setFile",
          :on-remove="removeRecommendRole",
          ref="recommend_role",
          :file-list="recommendRoleList",
          list-type="picture",
          action="",
          :limit=1,
          accept="image/jpeg,image/gif,image/png",
          :on-exceed="handleExceed"
        )
          el-button(slot="trigger", size="mini", @click="uploadField = 'recommend_role'") 选取图片
          span.ml-3 档案限制 1 MB，尺寸 1110 X 1000
      el-form-item
        el-button(@click="handleSubmit()") 储存
</template>

<script>
import { getGameTypeAPI, editGameTypeAPI } from '@/api/site/gameType';

export default {
  data() {
    return {
      formData: {
        id: 0,
        name_pc: '',
        name_mobile: '',
        recommend_name_ch: '',
        recommend_name_en: '',
        background_mobile_active: '',
        background_mobile_unactive: '',
        recommend_background: '',
        recommend_role: '',
      },
      backgroundMobileActiveList: [],
      backgroundMobileUnactiveList: [],
      recommendBackgroundList: [],
      recommendRoleList: [],
      uploadField: '',
      rules: {
        name_pc: [
          { required: true, message: 'PC 分类名称为必填' }
        ],
        name_mobile: [
          { required: true, message: 'Mobile 分类名称为必填' }
        ],
        recommend_name_ch: [
          { required: true, message: '推荐名称(中)为必填' }
        ],
        recommend_name_en: [
          { required: true, message: '推荐名称(英)为必填' }
        ]
      }
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (! this.$route.query.id) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      this.$message.error('无此游戏分类');
    }

    getGameTypeAPI(this.$route.query.id).then(response => {
      this.initGameType(response.data.data[0]);
    })
  },
  methods: {
    initGameType(gameType) {
      this.formData.id = gameType.id;
      this.formData.name_pc = gameType.gameManTypeNamePc;
      this.formData.name_mobile = gameType.gameManTypeNameMobile;
      this.formData.recommend_name_ch = gameType.gameManTypeRecommendNameCh;
      this.formData.recommend_name_en = gameType.gameManTypeRecommendNameEn;
      if (gameType.gameManTypeBackgroundMobileActive) {
        this.backgroundMobileActiveList = [{ url: this.$options.filters.urlAddTimestamp(gameType.gameManTypeBackgroundMobileActive) }];
      }
      if (gameType.gameManTypeBackgroundMobileUnactive) {
        this.backgroundMobileUnactiveList = [{ url: this.$options.filters.urlAddTimestamp(gameType.gameManTypeBackgroundMobileUnactive) }];
      }
      if (gameType.gameManTypeRecommendBackground) {
        this.recommendBackgroundList = [{ url: this.$options.filters.urlAddTimestamp(gameType.gameManTypeRecommendBackground) }];
      }
      if (gameType.gameManTypeRecommendRole) {
        this.recommendRoleList = [{ url: this.$options.filters.urlAddTimestamp(gameType.gameManTypeRecommendRole) }];
      }
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let formData = new FormData();

          formData.append('name_pc', this.formData.name_pc);
          formData.append('name_mobile', this.formData.name_mobile);
          formData.append('recommend_name_ch', this.formData.recommend_name_ch);
          formData.append('recommend_name_en', this.formData.recommend_name_en);
          formData.append('background_mobile_active', this.formData.background_mobile_active);
          formData.append('background_mobile_unactive', this.formData.background_mobile_unactive);
          formData.append('recommend_background', this.formData.recommend_background);
          formData.append('recommend_role', this.formData.recommend_role);

          editGameTypeAPI(this.formData.id, formData).then(response => {
            this.initGameType(response.data.data[0]);
            this.$message.success('游戏类型-修改成功！');
          });
        }
      })
    },
    setFile(option) {
      this.formData[this.uploadField] = option.file;
    },
    removeBackgroundMobileActive() {
      this.formData.background_mobile_active = '';
    },
    removeBackgroundMobileUnactive() {
      this.formData.background_mobile_unactive = '';
    },
    removeRecommendBackground() {
      this.formData.recommend_background = '';
    },
    removeRecommendRole() {
      this.formData.recommend_role = '';
    },
    handleExceed() {
      this.$message.warning('请先删除当前档案');
    }
  }
}
</script>
