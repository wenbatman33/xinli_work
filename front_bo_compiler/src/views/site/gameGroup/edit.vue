<template lang="pug">
  .container-fluid
    el-form(:model="formData", ref="form", label-width="160px", :rules="rules", status-icon)
      el-form-item(label="游戏类型")
        | {{ displayData.gameType }}
      el-form-item(label="游戏型态")
        | {{ displayData.playMode }}
      el-form-item(label="游戏代号")
        | {{ displayData.companyTag }}
      el-form-item(label="游戏公司名")
        | {{ displayData.companyName }}
      el-form-item(label="厂商显示名称", prop="name")
        el-input(v-model="formData.name", placeholder="请输入厂商显示名称")
      //- Mobile 入口图
      el-form-item(label="Mobile入口图", prop="vi_before")
        el-upload(
          :http-request="setFile",
          :on-remove="removeViBefore",
          ref="vi_before",
          :file-list="viBeforeList",
          list-type="picture",
          action="",
          :limit=1,
          accept="image/jpeg,image/gif,image/png",
          :on-exceed="handleExceed"
        )
          el-button(slot="trigger", size="mini", @click="uploadField = 'vi_before'") 选取图片
          span.ml-3 档案限制 1 MB
      //- 厂商推荐 logo
      el-form-item(label="推荐 Logo 图", prop="logo_recommend")
        el-upload(
          :http-request="setFile",
          :on-remove="removeLogoRecommend",
          ref="logo_recommend",
          :file-list="logoRecommendList",
          list-type="picture",
          action="",
          :limit=1,
          accept="image/jpeg,image/gif,image/png",
          :on-exceed="handleExceed"
        )
          el-button(slot="trigger", size="mini", @click="uploadField = 'logo_recommend'") 选取图片
          span.ml-3 档案限制 1 MB
      //- 厂商图 PC 用
      el-form-item(label="PC 厂商图", prop="company_images_pc")
        el-upload(
          :http-request="setFile",
          :on-remove="removeCompanyImagesPc",
          ref="company_images_pc",
          :file-list="companyImagesPcList",
          list-type="picture",
          action="",
          :limit=1,
          accept="image/jpeg,image/gif,image/png",
          :on-exceed="handleExceed"
        )
          el-button(slot="trigger", size="mini", @click="uploadField = 'company_images_pc'") 选取图片
          span.ml-3 档案限制 1 MB
      el-form-item(label="排序", prop="sort")
        el-input(type="number", v-model="formData.sort")
      el-form-item(label="开启方式", prop="game_open_mode")
        el-select(v-model="formData.game_open_mode")
          el-option(:value="1", label="iframe")
          el-option(:value="2", label="另开")
      el-form-item(label="状态", prop="status")
        el-select(v-model="formData.status")
          el-option(
            v-for="(status, id) in statusList",
            :key="id",
            :label="status",
            :value="+id"
          )
        el-date-picker.ml-3(
          v-if="formData.status === 2",
          v-model="formData.maintainTime"
          type="datetimerange",
          :default-time="['00:00:00', '23:59:59']",
          value-format="yyyy-MM-dd HH:mm:ss"
        )
      el-form-item(label="转帐状态", prop="transfer_status")
        el-select(v-model="formData.transfer_status")
          el-option(
            v-for="(status, id) in statusList",
            :key="id",
            :label="status",
            :value="parseInt(id)"
          )
      el-form-item(label="开启推荐", prop="recommend")
        el-switch(
          v-model="formData.recommend",
          active-text="开启",
          :active-value="1",
          inactive-text="关闭",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item
        el-button(@click="handleSubmit()") 储存
</template>

<script>
import { getGameGroupAPI, editGameGroupAPI } from '@/api/site/gameGroup';

export default {
  data() {
    return {
      statusList: {
        0: '关闭',
        1: '正常',
        2: '维护'
      },
      formData: {
        id: 0,
        name: '',
        status: 0,
        transfer_status: 0,
        recommend: 0,
        sort: 0,
        logo_recommend: '',
        company_images_pc: '',
        vi_before: '',
        game_open_mode: 1,
        maintainTime: [],
      },
      displayData: {
        gameType: '',
        playMode: '',
        companyTag: '',
        companyName: '',
      },
      logoRecommendList: [],
      companyImagesPcList: [],
      viBeforeList: [],
      uploadField: '',
      rules: {
        name: [
          { required: true, message: '厂商显示名称为必填' }
        ],
      }
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (! this.$route.query.id) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      this.$message.error('无此游戏厂商');
    }

    getGameGroupAPI(this.$route.query.id).then(response => {
      this.initGameGroup(response.data.data[0]);
    })
  },
  methods: {
    initGameGroup(gameGroup) {
      this.formData.id = gameGroup.id;
      this.formData.name = gameGroup.gameManGroupName;
      this.formData.status = gameGroup.gameManGroupStatus ? gameGroup.gameManGroupStatus.value : 0;
      this.formData.transfer_status = gameGroup.gameManGroupTransferStatus ? gameGroup.gameManGroupTransferStatus.value : 0;
      this.formData.recommend = gameGroup.gameManGroupRecommend ? gameGroup.gameManGroupRecommend.value : 0;
      this.formData.sort = gameGroup.sort;
      this.formData.game_open_mode = gameGroup.gameManGroupGameOpenMode ? gameGroup.gameManGroupGameOpenMode.value : 1;

      if (gameGroup.gameManGroupMaintainStart && gameGroup.gameManGroupMaintainStart !== '0000-00-00 00:00:00') {
        this.formData.maintainTime = [gameGroup.gameManGroupMaintainStart, gameGroup.gameManGroupMaintainEnd];
      }

      if (gameGroup.gameManGroupLogoRecommend) {
        this.logoRecommendList = [{ url: this.$options.filters.urlAddTimestamp(gameGroup.gameManGroupLogoRecommend) }];
      }
      if (gameGroup.gameManGroupCompanyImagesPc) {
        this.companyImagesPcList = [{ url: this.$options.filters.urlAddTimestamp(gameGroup.gameManGroupCompanyImagesPc) }];
      }
      if (gameGroup.gameManGroupViBefore) {
        this.viBeforeList = [{ url: this.$options.filters.urlAddTimestamp(gameGroup.gameManGroupViBefore) }];
      }

      this.displayData.gameType = gameGroup.gameManGroupGameType ? gameGroup.gameManGroupGameType.display : '';
      this.displayData.playMode = gameGroup.gameManGroupPlayMode ? gameGroup.gameManGroupPlayMode.display : '';
      this.displayData.companyTag = gameGroup.gameManGroupCompanyTag;
      this.displayData.companyName = gameGroup.gameManGroupCompanyName;
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let formData = new FormData();

          formData.append('name', this.formData.name);
          formData.append('status', this.formData.status);
          formData.append('transfer_status', this.formData.transfer_status);
          formData.append('recommend', this.formData.recommend);
          formData.append('sort', this.formData.sort);
          formData.append('logo_recommend', this.formData.logo_recommend);
          formData.append('company_images_pc', this.formData.company_images_pc);
          formData.append('vi_before', this.formData.vi_before);
          formData.append('game_open_mode', this.formData.game_open_mode);

          if (this.formData.status === 2 && this.formData.maintainTime && this.formData.maintainTime.length) {
            formData.append('maintain_start', this.formData.maintainTime[0]);
            formData.append('maintain_end', this.formData.maintainTime[1]);
          } else {
            formData.append('maintain_start', '0000-00-00 00:00:00');
            formData.append('maintain_end', '0000-00-00 00:00:00');
          }

          editGameGroupAPI(this.formData.id, formData).then(response => {
            this.initGameGroup(response.data.data[0]);
            this.$message.success('游戏厂商-修改成功！');
          });
        }
      })
    },
    setFile(option) {
      this.formData[this.uploadField] = option.file;
    },
    removeLogoRecommend() {
      this.formData.logo_recommend = '';
    },
    removeCompanyImagesPc() {
      this.formData.company_images_pc = '';
    },
    removeViBefore() {
      this.formData.vi_before = '';
    },
    handleExceed() {
      this.$message.warning('请先删除当前档案');
    }
  }
}
</script>
