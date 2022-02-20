<template lang="pug">
.container-fluid
  .container.betGameWarp.mb-5
    //- 切换选单
    .row.no-gutters.my-3
      .col-12.my-3
        .DWBreadcrumb
          router-link(to='/') 首页
          span.mx-2 /
          span 投注纪录
      bl_betMenuBtn
    .betGameType
      .betBackground
        .row
          .col-12.col-sm-12.col-md-12.col-lg-6.col-xl-6 
            el-button.m-0.mr-1(:class='{"active":(!win)}', round, size='small', @click='changeWin("")') 全部
            el-button.m-0.mr-1(:class='{"active":(win===1)}', round, size='small', @click='changeWin(1)') 主队胜
            el-button.m-0.mr-1(:class='{"active":(win===2)}', round, size='small', @click='changeWin(2)') 客队胜
            el-button.m-0.mr-1(:class='{"active":(win===3)}', round, size='small', @click='changeWin(3)') 和局
          .col-12.col-sm-12.col-md-12.col-lg-6.col-xl-6.my-2.mobileDatePicker
            el-date-picker.DatePicker(
              v-model='datePickerRange',
              type='daterange',
              range-separator='至',
              start-placeholder='开始日期',
              value-format="yyyy-MM-dd",
              end-placeholder='结束日期',
              @change='getData')
        .row
          .col-12
            el-table(:data='betGameBetLog', style='width: 100%')
              el-table-column(type='expand')
                template(slot-scope='props')
                  //- .goodGoodsItem(v-for='(subItem, subIndex) in props.row.goodsDetail.data')
                  p 日期:  {{props.row.created_at }}
                  p 赛事:  {{props.row.name}}
                  p 主队:  {{props.row.home}}
                  p 客队:  {{props.row.guest}}
                  p 胜负:  {{props.row.win.display}}

              el-table-column(v-if='isLargeSize', prop='created_at', label='日期')
              el-table-column(prop='name', label='赛事')
              el-table-column(v-if='isLargeSize', prop='home', label='主队')
              el-table-column(v-if='isLargeSize', prop='guest', label='客队')
              el-table-column(prop='point', label='投注点数')
              el-table-column(prop='team_id.display', label='投注')
              el-table-column(v-if='isLargeSize', prop='win.display', label='胜负')
</template>
<script>
import bl_betMenuBtn from '@/components/bl_bet/bl_betMenuBtn.vue';
import bl_betGameBanner from '@/components/bl_bet/bl_betGameBanner.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    bl_betMenuBtn,
    bl_betGameBanner,
  },
  data () {
    return {
      isLargeSize:false,
      datePickerRange:[this.$dayjs().subtract(1, 'months').format('YYYY-MM-DD'), this.$dayjs().format('YYYY-MM-DD')],
      isLargeSize: false,
      page: 1,
      per_page: 9999,
      win:''
    }
  },
  computed: {
    ...mapState('bet', ['betGameBetLog']),
  },
  methods: {
    changeCurrentType(val){
      this.currentType = val;
    },
    resize(){
      if(window.innerWidth >=760){
        this.isLargeSize = true
      } else{
        this.isLargeSize = false
      }
    },
    changeWin(val){
      this.win = val;
      this.getData();
    },
    getData(){
      const vm = this;
      const payload = {
        start_time: this.datePickerRange[0],
        end_time: this.datePickerRange[1],
        page: vm.page,
        per_page: vm.per_page,
        game_id: '',
        win: vm.win,
      };
      this.$store.dispatch('bet/getTaskGameBetLog', payload);
    }
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
.betGameWarp{
  min-height: 500px;
}
.betBackground{
  border-radius: 16px;
  box-shadow: 0 0 20px 0 $DW_Color;
  background-color: #ffffff;
  padding: 20px;
  border:  1px solid $whiteAlpha_30;
  @include media_xs{
    padding: 10px;
  }
  @include media_sm{
    padding: 10px;
  }
  @include media_md{
    padding: 20px;
  }
  @include media_lg{
    padding: 20px;
  }
  @include media_xl{
    padding: 20px;
  }
  p{
    font-size: 14px;
    color: $garyBlue_Darkest;
  }
}
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
.active{
  color: #ffffff;
  background-color: $DW_Color;
}
</style>
