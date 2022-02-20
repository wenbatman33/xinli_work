<template lang="pug">
  .bl-filter-data.d-flex.justify-content-between
    el-form(:inline="true", @submit.native.prevent)
      el-form-item(v-for="filter in filterShow", :key="filter.label")
        component(
          v-model="filterData[filter.model]",
          @input="shouldDebounce.includes(filter.component) ? debounceEmitChange() : emitChange()",
          :is="filter.component",
          :props="filter.props",
          :label="filter.label",
          @close="removeFilter(filter)"
        )
    .mb-4(style="white-space: nowrap")
      el-dropdown(v-if="filterList.length > 0", trigger="click", @command="filterAdd")
        el-button 筛选资讯
        el-dropdown-menu
          el-dropdown-item(
            v-for="filter in filterList",
            :key="filter.label",
            :command="filter"
          ) {{ filter.label }}
      slot
</template>

<script>
import debounce from 'lodash/debounce';
const table = require.context('./type', true, /\.vue$/i);

export default {
  components: table.keys().reduce(
    (result, key) => {
      result[key.split('/').pop().split('.')[0]] = table(key).default;
      return result;
    },
    {}
  ),
  data() {
    return {
      filterData: [],
      shouldDebounce: [
        'filterInput', 'filterTimePicker'
      ]
    }
  },
  props: {
    filterList: {
      type: Array,
      required: true
    },
    filterShow: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.debounceEmitChange = debounce(this.emitChange, 500);
  },
  methods: {
    emitChange() {
      this.$emit('change', this.filterData);
    },
    filterAdd(filter) {
      this.filterShow.push(
        ...this.filterList.splice(this.filterList.findIndex(item => item.model === filter.model), 1)
      )
    },
    removeFilter(filter) {
      if (this.filterData[filter.model]) {
        this.filterData[filter.model] = '';
        this.emitChange();
      }

      this.filterList.push(
        ...this.filterShow.splice(this.filterShow.findIndex(item => item.model === filter.model), 1)
      );
    },
    getFilterData() {
      let result = {};

      Object.keys(this.filterData).map(key => {
        if (this.filterData[key] === 'all') return;
        if (this.filterData[key] === 0 || this.filterData[key]) {
          result[key] = this.filterData[key];
        }
      })

      return result;
    }
  }
}
</script>

<style lang="scss">
.filter-sticky {
  border-bottom: 2px solid #adadad;
  position: relative;

  &:hover {
    border-bottom-color: rgba(0, 0, 0, 0.87);;
  }

  input, .el-input__inner {
    border: none;
  }

  .filter-sticky-label {
    position: absolute;
    font-size: 12px;
    top: -20px;
    left: 5px;
    color: #adadad;
    z-index: 1;
  }

  .close-hover.el-icon-close:hover::before {
    border-radius: 50%;
    background-color: #b4bccc;
    color: #fff;
    cursor: pointer;
  }

  .el-date-editor {
    width: 200px;
    &.is-range {
      width: 380px;
    }

    &.is-month {
      width: 140px;
      padding-left: 14px;
    }
  }

  .el-input__inner {
    padding-right: 0;
  }
}
</style>
