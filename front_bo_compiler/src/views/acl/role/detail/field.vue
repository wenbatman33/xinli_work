<template lang="pug">
  .container-fluid
    el-collapse.mb-1(v-for="(fieldArray, fieldKey) in fields", :key="fieldKey", v-model="activeName", accordion)
      el-collapse-item(:name="fieldKey")
        template(slot="title")
          div(@click.stop)
            el-checkbox(
              :indeterminate="isIndeterminate[fieldKey]",
              v-model="checkAll[fieldKey]",
              @change="handleCheckAllChange(fieldKey, $event)"
            ) {{ fieldKey }}
        el-checkbox-group(v-model="checkedFields[fieldKey]", @change="handleCheckedFieldsChange(fieldKey, $event)")
          template(v-for="field in fieldArray")
            el-checkbox(
              v-if="field.is_maskable",
              :indeterminate="mask[fieldKey][field.name]"
              :label="field.name",
              @change="handleMaskFieldsChange(fieldKey, field.name)"
            )
              el-badge(is-dot) {{ field.name_ch }}
            el-checkbox(v-else, :label="field.name") {{ field.name_ch }}
    el-button.m-4(type="success", size="mini", @click="submitFields") 送出
    el-popover(trigger="hover", placement="top")
      el-badge.mx-2(is-dot) 地址
      span 红点表示可遮蔽
      br
      hr
      span.mx-2 遮蔽资料请将选项选为
      el-checkbox(:indeterminate="true") 地址
      i.el-icon-info.h5(slot="reference")
</template>

<script>
import { getFieldsAPI } from '@/api/acl/permission';
import { getGroupAPI, editGroupAPI } from '@/api/acl/group';

export default {
  data() {
    return {
      activeName: '',
      fields: {},
      isIndeterminate: {},
      checkAll: {},
      checkedFields: {},
      mask: {},
      bug: []
    }
  },
  created() {
    getFieldsAPI()
      .then(response => {
        this.fields = response.data.data;

        Object.keys(this.fields).map(key => {
          this.$set(this.isIndeterminate, key, false);
          this.$set(this.checkAll, key, false);
          this.$set(this.checkedFields, key, []);
          this.$set(this.mask, key, {});
        })
        return getGroupAPI(this.$route.query.id);
      })
      .then(response => {
        const fields = response.data.data[0].mask_off;

        Object.keys(this.fields).map(key => {
          this.fields[key].map(field => {
            if (field.is_maskable) {
              if (fields && Object.prototype.hasOwnProperty.call(fields, field.name)) {
                this.$set(this.mask[key], field.name, fields[field.name] === 2);

                this.$set(this.bug, field.name, fields[field.name] === 2);

                if (fields[field.name] > 0 ) {
                  this.checkedFields[key].push(field.name)
                }
              } else {
                this.$set(this.mask[key], field.name, false);
              }
            } else {
              if (fields && Object.prototype.hasOwnProperty.call(fields, field.name) && fields[field.name] === 1) {
                this.checkedFields[key].push(field.name)
              }
            }
          });
          this.handleCheckedFieldsChange(key, this.checkedFields[key]);
        });
      })
  },
  methods: {
    handleCheckAllChange(key, checkAll) {
      if (checkAll) {
        this.checkedFields[key] = this.fields[key].map(field => field.name);
      } else {
        this.checkedFields[key] = [];
        this.fields[key].map(field => {
          this.mask[key][field.name] = false;
        });
      }

      this.isIndeterminate[key] = false;
    },
    handleCheckedFieldsChange(key, checked) {
      let checkedCount = checked.length;
      this.checkAll[key] = checkedCount === this.fields[key].length;
      this.isIndeterminate[key] = checkedCount > 0 && checkedCount < this.fields[key].length;
    },
    handleMaskFieldsChange(key, field) {
      // MARK: 有空整个重构
      if (! this.mask[key][field] && this.checkedFields[key].includes(field) && this.bug[field]) {
        let index = this.checkedFields[key].indexOf(field);
        this.checkedFields[key].splice(index, 1);
        this.mask[key][field] = false;
        this.bug[field] = false;
      } else if (! this.mask[key][field] && this.checkedFields[key].includes(field)) {
        this.mask[key][field] = true;
        this.bug[field] = true;
      } else if (this.mask[key][field] && ! this.checkedFields[key].includes(field)) {
        this.mask[key][field] = false;
        this.checkedFields[key].push(field);
      }
    },
    submitFields() {
      let mask_off = {};
      Object.keys(this.fields).map(key => {
        this.fields[key].map(field => {
          if (field.is_maskable && this.mask[key][field.name]) {
            mask_off[field.name] = 2;
          } else {
            mask_off[field.name] = this.checkedFields[key].includes(field.name) ? 1 : 0;
          }
        })
      })

      editGroupAPI({id: this.$route.query.id, mask_off}).then(() => {
        this.$message.success('更新成功！');
      });
    }
  }
}
</script>
