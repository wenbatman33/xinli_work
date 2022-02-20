<template lang="pug">
  .container-fluid
    el-form(:model="formData", ref="form", label-width="180px", :rules="rules", status-icon)
      el-form-item.m-0(v-if="formData.id", label="代号")
        span {{ formData.id }}
      el-form-item(label="优惠规则")
        el-select(v-model="formData.promotion_rule_id")
          el-option(v-for="rule in promotionRules", :key="rule.id", :label="rule.value", :value="parseInt(rule.id)")
      el-form-item(label="类型", prop="promotion_type")
        el-select(v-model="formData.promotion_type")
          el-option(v-for="(type, id) in promotionTypes", :key="id", :label="type", :value="parseInt(id)")
      el-form-item(v-if="formData.promotion_type === 3", label="奖励名称")
        el-input(v-model="formData.bonus_name", placeholder="请输入奖励名称")
      el-form-item(label="标题", prop="title")
        el-input(v-model="formData.title", placeholder="请输入标题", maxlength="30", show-word-limit)
      el-form-item(label="子标题", prop="sub_title")
        el-input(v-model="formData.sub_title", placeholder="请输入子标题", maxlength="18", show-word-limit)
      el-form-item(label="内容", prop="content")
        ckeditor(v-model="formData.content")
      //- tab
      el-tabs(v-model="active_tab", type="border-card")
        //- tab 设定
        el-tab-pane(label="设定", name="config")
          el-form-item(label="申请方式", prop="apply_method")
            el-radio(v-model="formData.apply_method", :label="1", border) 自动
            el-radio(v-model="formData.apply_method", :label="2", border) 自助
          el-form-item(label="审核方式", prop="verify_method")
            el-radio(v-model="formData.verify_method", :label="1", border) 自动
            el-radio(v-model="formData.verify_method", :label="2", border) 自助
          el-form-item(label="派发方式", prop="send_method")
            el-radio(v-model="formData.send_method", :label="1", border) 自动
            el-radio(v-model="formData.send_method", :label="2", border, style="padding: 7px 20px 0 10px") 自助
              input.mx-2(v-model="formData.send_after_day")
              span 天后过期(必填，预设值为1)
            .text-danger(v-if="send_after_day_error", style="margin-left: 125px") {{ send_after_day_error }}
          el-form-item(label="存款页显示", prop="payment_status")
            el-radio(v-model="formData.payment_status", :label="0", border) 不显示
            el-radio(v-model="formData.payment_status", :label="1", border) 显示
          el-form-item(label="无法参加的会员群组")
            el-select(v-model="formData.apply_error_tags", multiple)
              el-option-group(v-for="type in memeberGroupFullList", :key="type.value", :label="type.label")
                el-option(v-for="group in type.children", :key="group.id", :label="group.label", :value="group.value")
          el-form-item(label="审核必失败的会员群组")
            el-select(v-model="formData.verify_error_tags", multiple)
              el-option-group(v-for="type in memeberGroupFullList", :key="type.value", :label="type.label")
                el-option(v-for="group in type.children", :key="group.id", :label="group.label", :value="group.value")
          el-form-item(label="必须人工审核的会员群组")
            el-select(v-model="formData.verify_byuser_tags", multiple)
              el-option-group(v-for="type in memeberGroupFullList", :key="type.value", :label="type.label")
                el-option(v-for="group in type.children", :key="group.id", :label="group.label", :value="group.value")
          el-form-item(label="活动日期", prop="rule_time")
            el-date-picker(
              v-model="formData.rule_time",
              type='datetimerange',
              value-format="yyyy-MM-dd HH:mm:ss",
              start-placeholder='开始日期',
              end-placeholder='结束日期',
              :default-time="['00:00:00', '23:59:59']"
            )
          el-form-item(label="活动周期", prop="cycle")
            el-select(v-model="formData.cycle")
              el-option(:value="0", label="无")
              el-option(:value="1", label="每日")
              el-option(:value="2", label="每周")
              el-option(:value="3", label="每月")
              el-option(:value="4", label="每年")
          el-form-item(label="次数", prop="times")
            el-input(v-model.number="formData.times")
          el-form-item(label="不可同时参加的优惠")
            el-select(v-model="formData.except_promotion_id", multiple)
              el-option(v-for="promotion in promotions", :key="promotion.id", :label="promotion.value", :value="+promotion.id")
          el-form-item(label="需先完成的优惠")
            el-select(v-model="formData.priority_promotion_id")
              el-option(label="无", :value="0")
              el-option(v-for="promotion in promotions", :key="promotion.id", :label="promotion.value", :value="+promotion.id")
        //- tab 上架资料
        el-tab-pane(label="上架资料", name="data")
          el-form-item(label="显示装置", prop="device")
            el-checkbox-group(v-model="formData.device")
              el-checkbox(v-for="(device, key) in devices", :key="key", :label="key") {{ device }}
          el-form-item(label="PC 图", prop="image_pc")
            el-upload(
              :http-request="setFile",
              :before-upload="checkPcImage",
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
              span.ml-3 档案限制 500 KB，尺寸 824 X 200
          el-form-item(label="Mobile 图", prop="image_mobile")
            el-upload(
              :http-request="setFile",
              :before-upload="checkMobileImage",
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
              span.ml-3 档案限制 300 KB，尺寸 327 X 120
          el-form-item(label="开启方式", prop="link_method")
            el-select(v-model="formData.link_method")
              el-option(:value="1", label="POP")
              el-option(:value="2", label="另开连结")
          template(v-if="formData.link_method === 2")
            el-form-item(label="PC 连结")
              el-input(v-model="formData.link_pc", placeholder="请输入连结")
            el-form-item(label="Mobile 连结")
              el-input(v-model="formData.link_mobile", placeholder="请输入连结")
          el-form-item(label="上下架日期", prop="time")
            el-date-picker(
              v-model="formData.time",
              type='datetimerange',
              value-format="yyyy-MM-dd HH:mm:ss",
              start-placeholder='开始日期',
              end-placeholder='结束日期',
              :default-time="['00:00:00', '23:59:59']"
            )
          el-form-item(label="排序")
            el-input(v-model="formData.sort", type="number", min="0")
          el-form-item(label="前台分类", prop="promotion_group_id")
            el-transfer(
              v-model="formData.promotion_group_id",
              filterable,
              filter-placeholder="请输入关键字",
              :titles="['可选分类', '选中分类']",
              :data="promotion_groups"
            )
          el-form-item(label="状态", prop="status")
            el-switch(
              v-model="formData.status",
              active-text="启用",
              :active-value="1",
              inactive-text="停用",
              :inactive-value="0",
              inactive-color="red"
            )
      el-form-item
        el-button.m-3(@click="handleSubmit()") 储存
</template>

<script>
import ckeditor from '@/components/CKEditor';
import { mapState } from 'vuex';
import {
  getPromotionAPI,
  getPromotionTypesAPI,
  getPromotionGroupsAPI,
  addPromotionAPI,
  editPromotionAPI,
  getPromotionRulesAPI,
  getCanPickPromotionsAPI
} from '@/api/promotion/promotion';
import { getMemeberGroupFullListAPI } from '@/api/member/memberGroup.js';

export default {
  components: { ckeditor },
  data() {
    const fileValid = (rule, value, callback) => {
      const field = rule.field;
      const isCreate = this.formData.id === undefined;

      if (isCreate) {
        const hasWebDevice = this.formData.device.some(device => device === '1');
        const hasMobileDevice = this.formData.device.some(device => device > 1);

        if (field === 'image_pc' && hasWebDevice && this.formData.image_pc === '') {
          callback(new Error('请选择档案'));
        }

        if (field === 'image_mobile' && hasMobileDevice && this.formData.image_mobile === '') {
          callback(new Error('请选择档案'));
        }
      }

      callback();
    }

    return {
      promotionTypes: {},
      promotion_groups: [],
      promotionRules: {},
      promotions: {},
      memeberGroupFullList: [],
      formData: {
        promotion_type: 1,
        title: '',
        sub_title: '',
        content: '',
        device: [],
        image_pc: '',
        image_mobile: '',
        link_method: 1,
        link_pc:'',
        link_mobile: '',
        time: [],
        promotion_group_id: [],
        apply_method: 1,
        verify_method: 1,
        send_method: 1,
        payment_status: 0,
        rule_time: [],
        cycle: 0,
        times: 1,
        sort: 0,
        status: 1,
        bonus_name: '',
        promotion_rule_id: 1,
        except_promotion_id: [],
        priority_promotion_id: 0,
        apply_error_tags: [],
        verify_error_tags: [],
        verify_byuser_tags: [],
        send_after_day: 1
      },
      active_tab: 'config',
      imagePcList: [],
      imageMobileList: [],
      imagePcOriginalHas: false,
      imageMobileOriginalHas: false,
      uploadField: '',
      rules: {
        title: [
          { required: true, message: '标题为必填', trigger: 'submit' }
        ],
        sub_title: [
          { required: true, message: '标题为必填', trigger: 'submit' }
        ],
        device: [
          { type: 'array', required: true, message: '请自少选取一种设备', trigger: 'submit' }
        ],
        time: [
          { required: true, message: '活动日期必须选择', trigger: 'submit' }
        ],
        rule_time: [
          { required: true, message: '上下架时间必须选择', trigger: 'submit' }
        ],
        image_pc: [
          { validator: fileValid, trigger: 'submit' }
        ],
        image_mobile: [
          { validator: fileValid, trigger: 'submit' }
        ],
        times: [
          { required: true, min: 1, type: 'integer', message: '次数必须大于1次', trigger: 'submit' }
        ]
      },
      send_after_day_error: null,
    }
  },
  computed: mapState('common', ['devices']),
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getPromotionTypesAPI().then(response => {
      this.promotionTypes = response.data.data;
    });

    getPromotionGroupsAPI().then(response => {
      this.promotion_groups = Object.keys(response.data.data).reduce((groups, key) => {
        groups.push({
          key: +key,
          label: response.data.data[key]
        })

        return groups
      }, []);
    });

    getPromotionRulesAPI().then(response => {
      this.promotionRules = response.data.data.map(rule => {
        return {
          id: rule.id,
          value: rule.promotionRuleDescription
        };
      })
    });

    getCanPickPromotionsAPI().then(response => {
      this.promotions = response.data.data.map(promotion => {
        return {
          id: promotion.id,
          value: promotion.promotionTitle
        };
      })
      .filter(promotion => {
        return promotion.id !== +this.$route.query.id;
      });
    });

    getMemeberGroupFullListAPI().then(response => {
      this.memeberGroupFullList = response.data.data;
    });

    if (this.$route.query.id) {
      getPromotionAPI(this.$route.query.id).then(response => {
        const promotion = response.data.data[0];

        this.formData.id = promotion.id;
        this.formData.promotion_type = promotion.promotionType ? promotion.promotionType.value : 1;
        this.formData.title = promotion.promotionTitle;
        this.formData.sub_title = promotion.promotionSubTitle;
        this.formData.content = promotion.promotionContent;
        this.formData.device = promotion.promotionDevice ? promotion.promotionDevice.value.split(',') : [];
        if (promotion.promotionImagePc) {
          this.imagePcOriginalHas = true;
          this.imagePcList.push({ url: this.$options.filters.urlAddTimestamp(promotion.promotionImagePc) });
        }
        if (promotion.promotionImageMobile) {
          this.imageMobileOriginalHas = true;
          this.imageMobileList.push({ url: this.$options.filters.urlAddTimestamp(promotion.promotionImageMobile) });
        }
        this.formData.link_method = promotion.promotionLinkMethod ? promotion.promotionLinkMethod.value : 1;
        this.formData.link_pc = promotion.promotionLinkPc;
        this.formData.link_mobile = promotion.promotionLinkMobile;
        this.formData.time = [promotion.promotionTimeStart, promotion.promotionTimeEnd];
        this.formData.sort = promotion.promotionSort;
        this.formData.promotion_group_id = promotion.promotionGroupId ? promotion.promotionGroupId.value.split(',').map(Number) : [];
        this.formData.apply_method = promotion.promotionApplyMethod ? promotion.promotionApplyMethod.value : 1;
        this.formData.verify_method = promotion.promotionVerifyMethod ? promotion.promotionVerifyMethod.value : 1;
        this.formData.send_method = promotion.promotionSendMethod ? promotion.promotionSendMethod.value : 1;
        this.formData.payment_status = promotion.promotionPaymentStatus ? promotion.promotionPaymentStatus.value : 0;
        this.formData.rule_time = [promotion.promotionRuleTimeStart, promotion.promotionRuleTimeEnd];
        this.formData.cycle = promotion.promotionCycle ? promotion.promotionCycle.value : 0;
        this.formData.times = +promotion.promotionTimes;
        this.formData.status = promotion.promotionStatus ? promotion.promotionStatus.value : 1;
        this.formData.bonus_name = promotion.promotionBonus;
        this.formData.promotion_rule_id = promotion.promotionRuleRelationId;
        this.formData.except_promotion_id = promotion.promotionExceptPromotionId ? promotion.promotionExceptPromotionId.split(',').map(Number) : [];
        this.formData.priority_promotion_id = promotion.promotionPriorityPromotionId;
        this.formData.apply_error_tags = promotion.promotionApplyErrorTags ? promotion.promotionApplyErrorTags.split(',').map(Number) : [];
        this.formData.verify_error_tags = promotion.promotionVerifyErrorTags ? promotion.promotionVerifyErrorTags.split(',').map(Number) : [];
        this.formData.verify_byuser_tags = promotion.promotionVerifyByuserTags ? promotion.promotionVerifyByuserTags.split(',').map(Number) : [];
        this.formData.send_after_day = promotion.promotionSendAfterDay
      })
    }
  },
  methods: {
    handleSubmit() {
      const customValid = this.validSendAfterDay();

      this.$refs.form.validate(valid => {
        if (valid && customValid) {
          const isCreate = this.formData.id === undefined;
          let formData = new FormData();

          formData.append('promotion_type', this.formData.promotion_type);
          formData.append('title', this.formData.title);
          formData.append('sub_title', this.formData.sub_title);
          formData.append('content', this.formData.content);
          formData.append('device', this.formData.device.join());
          if (! this.imagePcOriginalHas || ! this.imagePcList.length) {
            formData.append('image_pc', this.formData.image_pc);
          }
          if (! this.imageMobileOriginalHas || ! this.imageMobileList.length) {
            formData.append('image_mobile', this.formData.image_mobile);
          }
          formData.append('link_method', this.formData.link_method || 1);

          if (this.formData.link_method === 2) {
            formData.append('link_pc', this.formData.link_pc || '');
            formData.append('link_mobile', this.formData.link_mobile || '');
          } else {
            formData.append('link_pc', '');
            formData.append('link_mobile', '');
          }

          formData.append('time_start', this.formData.time[0]);
          formData.append('time_end', this.formData.time[1]);
          formData.append('sort', this.formData.sort);
          if (isCreate) {
            formData.append('promotion_group_id', this.formData.promotion_group_id.join());
          } else {
            formData.append(
              'promotion_group_id',
              this.formData.promotion_group_id.filter(id => id !== this.formData.id).join()
            );
          }

          formData.append('apply_method', this.formData.apply_method);
          formData.append('verify_method', this.formData.verify_method);
          formData.append('send_method', this.formData.send_method);
          formData.append('payment_status', this.formData.payment_status);
          formData.append('rule_time_start', this.formData.rule_time[0]);
          formData.append('rule_time_end', this.formData.rule_time[1]);
          formData.append('cycle', this.formData.cycle);
          formData.append('times', parseInt(this.formData.times));
          formData.append('status', this.formData.status);
          formData.append('bonus_name', this.formData.bonus_name);
          formData.append('promotion_rule_id', this.formData.promotion_rule_id);
          formData.append('except_promotion_id', this.formData.except_promotion_id.join());
          formData.append('priority_promotion_id', this.formData.priority_promotion_id);
          formData.append('apply_error_tags', this.formData.apply_error_tags.join());
          formData.append('verify_error_tags', this.formData.verify_error_tags.join());
          formData.append('verify_byuser_tags', this.formData.verify_byuser_tags.join());
          formData.append('send_after_day', this.formData.send_after_day);

          isCreate ? this.handleCreate(formData) : this.handleUpdate(this.formData.id, formData);
        } else {
          this.$message.error('请检查输入参数！');
        }
      })
    },
    validSendAfterDay() {
      if (this.formData.send_method === 1) {
        return true;
      } else if (isNaN(this.formData.send_after_day)) {
        this.send_after_day_error = '天数必须为数字';
        return false;
      } else if (this.formData.send_after_day < 1) {
        this.send_after_day_error = '天数必须大于1';
        return false;
      } else {
        this.send_after_day_error = null;
        return true;
      }
    },
    handleCreate(formData) {
      addPromotionAPI(formData).then(() => {
        this.$message.success('优惠-新增成功！');
        this.resetForm();
      });
    },
    handleUpdate(id, formData) {
      editPromotionAPI(id, formData).then(() => {
        this.$message.success('优惠-修改成功！');
      });
    },
    setFile(option) {
      this.formData[this.uploadField] = option.file;
    },
    checkMobileImage(file) {
      if (file.size > 300 * 1024) {
        this.$message.warning('档案超出大小');

        return false;
      }

      return true;
    },
    checkPcImage(file) {
      if (file.size > 500 * 1024) {
        this.$message.warning('档案超出大小');

        return false;
      }

      return true;
    },
    removeImagePc() {
      this.formData.image_pc = '';
      this.imagePcList = [];
    },
    removeImageMobile() {
      this.formData.image_mobile = '';
      this.imageMobileList = [];
    },
    resetForm() {
      this.$refs.image_pc.clearFiles();
      this.$refs.image_mobile.clearFiles();
      this.$refs.form.resetFields();
    },
    handleExceed() {
      this.$message.warning('请先删除当前档案');
    }
  }
}
</script>

<style lang="scss">
  .el-transfer-panel__body.is-with-footer {
    .el-transfer-panel__list {
      padding-bottom: 30px;
    }
  }
</style>

<style lang="scss" scoped>
.el-select {
  display: block;
}
</style>
