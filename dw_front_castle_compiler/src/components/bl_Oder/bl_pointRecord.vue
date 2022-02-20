<template lang="pug">
.row
  .col-12.my-2.mobileDatePicker
    el-date-picker.DatePicker(
      v-model='datePickerRange',
      type='daterange',
      range-separator='至',
      start-placeholder='开始日期',
      value-format="yyyy-MM-dd HH:mm:ss",
      :default-time='["00:00:00", "23:59:59"]',
      end-placeholder='结束日期',
      @change='getData')
  .col-12
    el-table(:data='pointRecord', style='width: 100%', @expand-change='expandChange')
      el-table-column(type='expand')
        template(slot-scope='props')
          p 交易前:  {{props.row.transBefore | commaFormatDefault}}
          p 交易后:  {{props.row.transAfter | commaFormatDefault}}
          p 备注:  {{props.row.note}}
      el-table-column(prop='date', label='日期')
      el-table-column(prop='transType', label='类型')
      el-table-column(label='金额')
        template(slot-scope='props')
          span {{props.row.transAmount | commaFormatDefault}}
      el-table-column(v-if='isLargeSize', label='交易前')
        template(slot-scope='props')
          span {{props.row.transBefore | commaFormatDefault}}
      el-table-column(v-if='isLargeSize', prop='transAfter', label='交易后')
        template(slot-scope='props')
          span {{props.row.transAfter | commaFormatDefault}}
      el-table-column(v-if='isLargeSize', prop='note', label='备注')
  .col-12.my-3(v-if='pointRecordTotal>0')
    el-pagination.float-right(background='', layout='prev, pager, next', :pager-count='5', :total='pointRecordTotal', @current-change="changeCurrentOderPage")
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      datePickerRange:[this.$dayjs().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss'), this.$dayjs().format('YYYY-MM-DD HH:mm:ss')],
      isLargeSize: false,
      page: 1,
      per_page: 10,
    };
  },
  computed: {
    ...mapState('shopping', ['pointRecord', 'pointRecordTotal']),
  },
  methods: {
    getData(){
      const vm = this;
      const payload = {
        sdate: this.datePickerRange[0],
        edate: this.datePickerRange[1],
        page: vm.page,
        per_page: vm.per_page,
      };
      this.$store.dispatch('shopping/getPointRecord', payload);
    },
    changeCurrentOderPage(val){
      this.page = val
      this.getData();
    },
    expandChange(item){
      this.$matomo_oder_ponit_record_open(item.transType);
    },
    resize(){
      if(window.innerWidth >=760){
        this.isLargeSize = true
      } else{
        this.isLargeSize = false
      }
    },
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize);
  },
  mounted() {
    this.getData();
    window.addEventListener('resize', this.resize);
    this.resize();
  },
};
</script>
<style lang="scss" scoped>
.mobileDatePicker{
  @include media_xs{
    text-align: left;
    .DatePicker{
      width: 100%;
    }
  }
  @include media_sm{
    text-align: left;
    .DatePicker{
      width: 100%;
    }
  }
  @include media_md{
    text-align: left;
    .DatePicker{
      width: 100%;
    }
  }
  @include media_lg{
    text-align: right;
    .DatePicker{
      width: 380px
    }
  }
  @include media_xl{
    text-align: right;
    .DatePicker{
      width: 380px
    }
  }
}
</style>