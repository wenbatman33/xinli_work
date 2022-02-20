<template lang="pug">
  .container-fluid
    el-form(:model="insertData", ref="insertForm", label-width="140px", :rules="rules", status-icon)
      el-form-item(label="位置", prop="banner_group_id")
        el-select(v-model="insertData.banner_group_id", :filterable="true", no-match-text="无符合项目")
          el-option(
            v-for="(group, id) in bannerGroup",
            :key="id",
            :label="group",
            :value="parseInt(id)"
          )
        el-tooltip
          i.el-icon-info.ml-3(style="font-size: 1.4rem")
          template(slot="content")
            p 主页：档案限制 200KB，尺寸 1328 x 420
            p 注册完成页、登入影片、盖版广告、游戏介绍页无作用
      el-form-item(label="标题", prop="title")
        el-input(v-model="insertData.title", placeholder="请输入标题")
      el-form-item(label="类型", prop="banner_type")
        el-select(v-model.number="insertData.banner_type")
          el-option(:value="1", label="图片")
          el-option(:value="2", label="影片")
      el-form-item(label="显示装置", prop="device")
        el-checkbox-group(v-model="insertData.device")
          el-checkbox(v-for="(device, key) in devices", :key="key", :label="key") {{ device }}
      .bg-light(v-show="insertData.banner_type === 1")
        el-form-item(label="PC 图", prop="image_pc")
          el-upload(
            :http-request="setFile",
            :on-remove="removeImagePc",
            ref="image_pc",
            :file-list="imagePcList",
            list-type="picture",
            action="",
            :limit=1,
            accept="image/jpeg,image/gif,image/png",
            :on-exceed="handleExceed"
          )
            el-button(slot="trigger", size="mini", @click="uploadField = 'image_pc'") 选取图片
        el-form-item(label="Mobile 图", prop="image_mobile")
          el-upload(
            :http-request="setFile",
            :on-remove="removeImageMobile",
            ref="image_mobile",
            :file-list="imageMobileList",
            list-type="picture",
            action="",
            :limit=1,
            accept="image/jpeg,image/gif,image/png",
            :on-exceed="handleExceed"
          )
            el-button(slot="trigger", size="mini", @click="uploadField = 'image_mobile'") 选取图片
      .bg-light(v-show="insertData.banner_type === 2")
        el-form-item(label="PC 背景", prop="video_bg_pc")
          el-upload(
            :http-request="setFile",
            :on-remove="removeVideoBgPc",
            ref="video_bg_pc",
            :file-list="videoBgPcList",
            list-type="picture",
            action="",
            :limit=1,
            accept="image/jpeg,image/gif,image/png",
            :on-exceed="handleExceed"
          )
            el-button(slot="trigger", size="mini", @click="uploadField = 'video_bg_pc'") 选取图片
        el-form-item(label="PC 影片网址1", prop="video_pc")
          el-input(v-model="insertData.video_pc", placeholder="请输入连结，格式mp4，建议影片长度不超过8秒")
        el-form-item(label="PC 影片网址2")
          el-input(v-model="insertData.video_pc2", placeholder="请输入连结，格式webm，建议影片长度不超过8秒)")
        el-form-item(label="Mobile 背景", prop="video_bg_mobile")
          el-upload(
            :http-request="setFile",
            :on-remove="removeVideoBgMobile",
            ref="video_bg_mobile",
            :file-list="videoBgMobileList",
            list-type="picture",
            action="",
            :limit=1,
            accept="image/jpeg,image/gif,image/png",
            :on-exceed="handleExceed"
          )
            el-button(slot="trigger", size="mini", @click="uploadField = 'video_bg_mobile'") 选取图片
        el-form-item(label="Mobile 影片网址1", prop="video_mobile")
          el-input(v-model="insertData.video_mobile", placeholder="请输入连结，格式mp4，建议影片长度不超过8秒")
        el-form-item(label="Mobile 影片网址2")
          el-input(v-model="insertData.video_mobile2", placeholder="请输入连结，格式webm，建议影片长度不超过8秒)")
      el-form-item(label="转跳位置", prop="link_type")
        el-select(v-model="insertData.link_type")
          el-option(v-for="(categroy, id) in deepLinkCategories", :key="id", :value="+id", :label="categroy")
      el-form-item(v-if="needID", label="ID", prop="banner_link_pc")
        el-input(v-model="insertData.banner_link_pc", placeholder="请输入目标 ID")
      el-form-item(v-if="needURL", label="网址", prop="banner_link_pc")
        el-input(v-model="insertData.banner_link_pc", placeholder="请输入目标 URL")
      template(v-if="needGame")
        el-form-item(label="厂商", prop="game_group_id")
          el-select(v-model="insertData.game_group_id")
            el-option(v-for="group in gameGroups", :key="group.id", :value="group.id", :label="group.gameManGroupName")
        el-form-item(v-if="needGameId", label="游戏", prop="game_id")
          el-input(v-model="insertData.game_id", placeholder="请输入目标游戏id")
      el-form-item(label="上下架日期", prop="time")
        el-date-picker(
          v-model="insertData.time",
          type='datetimerange',
          value-format="yyyy-MM-dd HH:mm:ss",
          start-placeholder='开始日期',
          end-placeholder='结束日期',
          :default-time="['00:00:00', '23:59:59']"
        )
      el-form-item(label="排序")
        el-input(v-model="insertData.sort", type="number")
      el-form-item(label="状态")
        el-switch(
          v-model="insertData.status",
          active-text="启用",
          :active-value="1",
          inactive-text="停用",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item
        el-button(@click="handleSubmit()") 储存
</template>

<script>
import { mapState } from 'vuex';
import { getBannerGroupAPI, getBannerAPI, addBannerAPI, editBannerAPI } from '@/api/site/banner';
import { getGameGroupsAPI } from '@/api/site/gameGroup';

export default {
  data() {
    const imageFileValid = (rule, value, callback) => {
      if (this.insertData.banner_type === 2) {
        return callback();
      }

      const field = rule.field;
      const isCreate = this.insertData.id === undefined;

      if (isCreate) {
        const hasWebDevice = this.insertData.device.some(device => device === '1');
        const hasMobileDevice = this.insertData.device.some(device => device > 1);

        if (field === 'image_pc' && hasWebDevice && this.insertData.image_pc === '') {
          callback(new Error('请选择档案'));
        }

        if (field === 'image_mobile' && hasMobileDevice && this.insertData.image_mobile === '') {
          callback(new Error('请选择档案'));
        }
      }

      callback();
    }

    const videoFileValid = (rule, value, callback) => {
      if(this.insertData.banner_type === 1 || this.insertData.id !== undefined) {
        return callback();
      }

      const field = rule.field;
      const hasWebDevice = this.insertData.device.indexOf('1') !== -1 || this.insertData.device.indexOf('2') !== -1;
      const hasMobileDevice = this.insertData.device.indexOf('3') !== -1 || this.insertData.device.indexOf('4') !== -1;

      if (hasWebDevice) {
        if (field === 'video_bg_pc' && this.insertData.video_bg_pc === '') {
          callback(new Error('请选择档案'));
        }

        if (field === 'video_pc' && this.insertData.video_pc === '' && this.insertData.video_pc2 === '') {
          callback(new Error('最少需要一部影片网址'));
        }
      }

      if (hasMobileDevice) {
        if (field === 'video_bg_mobile' && this.insertData.video_bg_mobile === '') {
          callback(new Error('请选择档案'));
        }

        if (field === 'video_mobile' && this.insertData.video_mobile === '' && this.insertData.video_mobile2 === '') {
          callback(new Error('最少需要一部影片网址'));
        }
      }

      callback();
    }

    return {
      bannerGroup: {},
      insertData: {
        banner_group_id: 1,
        title: '',
        banner_type: 1,
        device: [],
        image_pc: '',
        image_mobile: '',
        video_bg_pc: '',
        video_bg_mobile: '',
        video_pc: '',
        video_pc2: '',
        video_mobile: '',
        video_mobile2: '',
        link_type: 1,
        banner_link_pc: '',
        link_method: 1,
        time: [],
        sort: 0,
        status: 0,
        game_group_id: '',
        game_id: '',
      },
      imagePcList: [],
      imageMobileList: [],
      videoBgPcList: [],
      videoBgMobileList: [],
      uploadField: '',
      rules: {
        banner_group_id: [
          { required: true, message: '位置为必填' }
        ],
        title: [
          { required: true, message: '标题为必填' }
        ],
        device: [
          { type: 'array', required: true, message: '请自少选取一种设备' }
        ],
        banner_type: [
          { required: true, message: '标题为必填' }
        ],
        time: [
          { required: true, message: '上下架时间必须选择' }
        ],
        image_pc: [
          { validator: imageFileValid }
        ],
        image_mobile: [
          { validator: imageFileValid }
        ],
        video_bg_pc: [
          { validator: videoFileValid }
        ],
        video_bg_mobile: [
          { validator: videoFileValid }
        ],
        video_pc: [
          { type: 'url', message: '不是有效的连结', trigger: 'submit' },
          { validator: videoFileValid }
        ],
        video_mobile: [
          { type: 'url', message: '不是有效的连结', trigger: 'submit' },
          { validator: videoFileValid }
        ],
        banner_link_pc: [{ required: true, message: '请输入指定目标' }],
        game_group_id: [{ required: true, message: '请输入指定目标' }],
        game_id: [{ required: true, message: '请输入指定目标' }],
      },
      ValidFileCondition: {
        1: ['image_pc', 'image_mobile'],
        2: ['video']
      },
      gameGroups: [],
    }
  },
  computed: {
    ...mapState('common', [
      'devices',
      'deepLinkCategories',
      'deepLinkNeedURLList',
      'deepLinkNeedIDList',
      'deepLinkNeedGameList',
    ]),
    needID() {
      return this.deepLinkNeedIDList.includes(this.insertData.link_type);
    },
    needURL() {
      return this.deepLinkNeedURLList.includes(this.insertData.link_type);
    },
    needGame() {
      return this.deepLinkNeedGameList.includes(this.insertData.link_type);
    },
    needGameId() {
      const nowGame = this.gameGroups.find(group => group.id === this.insertData.game_group_id);
      // play mode 2 => 遊戲列表 要包含遊戲id
      return nowGame && nowGame.gameManGroupPlayMode && nowGame.gameManGroupPlayMode.value === 2;
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getBannerGroupAPI().then(response => {
      this.bannerGroup = response.data.data;
    });

    getGameGroupsAPI().then(response => {
      this.gameGroups = this.fieldPerms.gameManGroupStatus
        ? response.data.data.filter(group => group.gameManGroupStatus.value === 1)
        : response.data.data;
    });

    if (this.$route.query.id) {
      getBannerAPI(this.$route.query.id).then(response => {
        const banner = response.data.data[0];

        this.insertData.id = banner.id;
        this.insertData.banner_group_id = banner.bannerMallGroupId ? banner.bannerMallGroupId.value : 1;
        this.insertData.title = banner.bannerMallTitle;
        this.insertData.banner_type = banner.bannerMallType;
        this.insertData.device = banner.bannerMallDevice ? banner.bannerMallDevice.value.split(',') : [];
        if (banner.bannerMallImagePc) {
          this.imagePcList.push({ url: this.$options.filters.urlAddTimestamp(banner.bannerMallImagePc) });
        }
        if (banner.bannerMallImageMobile) {
          this.imageMobileList.push({ url: this.$options.filters.urlAddTimestamp(banner.bannerMallImageMobile) });
        }
        if (banner.bannerMallVideoBgPc) {
          this.videoBgPcList.push({ url: this.$options.filters.urlAddTimestamp(banner.bannerMallVideoBgPc) });
        }
        if (banner.bannerMallVideoBgMobile) {
          this.videoBgMobileList.push({ url: this.$options.filters.urlAddTimestamp(banner.bannerMallVideoBgMobile) });
        }
        this.insertData.video_pc = banner.bannerMallVideoPc;
        this.insertData.video_pc2 = banner.bannerMallVideoPc2;
        this.insertData.video_mobile = banner.bannerMallVideoMobile;
        this.insertData.video_mobile2 = banner.bannerMallVideoMobile2;
        this.insertData.link_type = banner.bannerMallLinkType || 1;
        this.insertData.banner_link_pc = banner.bannerMallLinkPc || '';
        this.insertData.time = [banner.bannerMallTimeStart, banner.bannerMallTimeEnd];
        this.insertData.sort = banner.bannerMallSort;
        this.insertData.status = banner.bannerMallStatus ? banner.bannerMallStatus.value : 0;
        this.insertData.game_group_id = banner.bannerMallGameGroupId;
        this.insertData.game_id = banner.bannerMallGameId;
      })
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.insertForm.validate(valid => {
        if (valid) {
          const isCreate = this.insertData.id === undefined;
          let formData = new FormData();

          formData.append('platform', 3);
          formData.append('banner_group_id', this.insertData.banner_group_id);
          formData.append('title', this.insertData.title);
          formData.append('banner_type', this.insertData.banner_type);
          formData.append('device', this.insertData.device.join());
          formData.append('link_type', this.insertData.link_type || 1);
          formData.append('banner_link_pc', this.insertData.banner_link_pc);
          formData.append('link_method', this.insertData.link_method || 1);
          formData.append('sort', this.insertData.sort);
          formData.append('time_start', this.insertData.time[0]);
          formData.append('time_end', this.insertData.time[1]);
          formData.append('status', this.insertData.status);
          formData.append('game_group_id', this.insertData.game_group_id);
          formData.append('game_id', this.insertData.game_id);

          if (this.insertData.banner_type === 1) {
            formData.append('image_pc', this.insertData.image_pc);
            formData.append('image_mobile', this.insertData.image_mobile);
            formData.append('video_bg_pc', '');
            formData.append('video_bg_mobile', '');
            formData.append('video_pc', '');
            formData.append('video_pc2', '');
            formData.append('video_mobile', '');
            formData.append('video_mobile2', '');
          } else if (this.insertData.banner_type === 2) {
            formData.append('image_pc', '');
            formData.append('image_mobile', '');
            formData.append('video_bg_pc', this.insertData.video_bg_pc);
            formData.append('video_bg_mobile', this.insertData.video_bg_mobile);
            formData.append('video_pc', this.insertData.video_pc);
            formData.append('video_pc2', this.insertData.video_pc2);
            formData.append('video_mobile', this.insertData.video_mobile);
            formData.append('video_mobile2', this.insertData.video_mobile2);
          }

          isCreate ? this.handleCreate(formData) : this.handleUpdate(this.insertData.id, formData);
        }
      })
    },
    handleCreate(formData) {
      addBannerAPI(formData).then(() => {
        this.$message.success('新增 Banner 成功！');
        this.resetForm();
      });
    },
    handleUpdate(id, formData) {
      editBannerAPI(id, formData).then(() => {
        this.$message.success('修改 Banner 成功！');
        this.$store.dispatch('menu/refreshTab');
      });
    },
    setFile(option) {
      this.insertData[this.uploadField] = option.file;
    },
    removeImagePc() {
      this.insertData.image_pc = '';
    },
    removeImageMobile() {
      this.insertData.image_mobile = '';
    },
    removeVideoBgPc() {
      this.insertData.video_bg_pc = '';
    },
    removeVideoBgMobile() {
      this.insertData.video_bg_mobile = '';
    },
    resetForm() {
      this.$refs.image_pc.clearFiles();
      this.$refs.image_mobile.clearFiles();
      this.$refs.video_bg_pc.clearFiles();
      this.$refs.video_bg_mobile.clearFiles();
      this.insertData.video_pc2 = '';
      this.insertData.video_mobile2 = '';
      this.$refs.insertForm.resetFields();
    },
    handleExceed() {
      this.$message.warning('请先删除当前档案');
    }
  }
}
</script>
