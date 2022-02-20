<template lang='pug'>
.w-100
  .row.no-gutters
    .col-12.text-center
      .w-100.d-flex.justify-content-between.header.align-item-center
        .px-3.flex-grow-1.text-left.LOGO
          .d-flex.flex-column.justify-content-center.align-items-start.h-100
            router-link(to='/')
              img.logo(v-if='DeviceIsPc', :src='logo')
              img.logo_v(v-else, :src='logo_v')
        .d-flex.flex-row.px-3
          .CENTER.flex-column.align-items-start
            el-dropdown.my-2(v-if='MemberLogined', @command="handleCommand")
              span.text-white.fs13(:class='{"active": $route.path=== "/my"}')
                i.fas.fa-user
                span.mx-2 {{PersonalDetail.memberAccount}}
              el-dropdown-menu(slot='dropdown')
                el-dropdown-item(command='/my')
                  span.title
                  i.fas.fa-user.icon16
                  | 我的
                el-dropdown-item(command='/transactionLog')
                  span.title 
                  img.icon16(:src='icon_record')
                  | 交易紀錄
                el-dropdown-item(command='/withdraw')
                  span.title
                  img.icon16(:src='icon_withdraw')
                  | 提款
                el-dropdown-item(command='/deposit')
                  span.title
                  img.icon16(:src='icon_deposit')
                  | 存款
            span.fs13.my-1(v-else, :class='{"active": $route.path=== "/my"}')
              i.fas.fa-user.mr-2
              router-link(to='/login') 登錄
              span.mx-2 /
              router-link(to='/register') 註冊
            router-link.fs13.my-1(to='/my', v-if='MemberLogined && Wallet')
              i.fas.fa-wallet.mr-2
              | ¥ {{ Wallet.walletAmount+ Wallet.walletGameAmount+ Wallet.walletLockAmount | commaFormat}}
          .d-flex.flex-column.justify-content-center.align-items-center
            a(href='http://line.naver.jp/ti/p/jniBDSE60w#~' , target='_blank')
              .serverChat.mt-2.ml-3
                i.fas.fa-headset
  .row.no-gutters
    .col-12
      .news.d-flex
        span.pl-3
          i.fas.fa-volume-up.mr-3
        //- news
        span.flex-grow-1.newsContent
          //- router-link(to='/news') news_news_news_news_news
          transition(name="slide-fade")
            p.newsButton(v-for='(item, index) in NewsList', v-if='index===currentNum',:key='index' @click='gotoNews(item.id)') {{item.newsTitle}}
        .nav.cursorPointer(v-if='DeviceIsPc', @click='showNavMenu =!showNavMenu')
          i.fas.fa-bars(v-if='showNavMenu===false')
          i.fas.fa-times(v-if='showNavMenu===true')
        .NavMenu(v-if='showNavMenu && DeviceIsPc')
          .d-flex.flex-column
            router-link(to='/game')
              .NavBtn.d-flex(:class='{"active": $route.path === "/game"}')
                span.icon
                  i.fas.fa-futbol
                span.flex-grow-1 全部賽事
                span
                  i.fas.fa-chevron-right
            router-link(to='/promotion') 
              .NavBtn.d-flex(:class='{"active": $route.path === "/promotion"}')
                span.icon
                  i.fas.fa-gift
                span.flex-grow-1 優惠列表
                span
                  i.fas.fa-chevron-right
            router-link(to='/betlog')
              .NavBtn.d-flex(:class='{"active": $route.path === "/betlog"}')
                span.icon
                  i.fas.fa-clipboard-list
                span.flex-grow-1 投注記錄
                span
                  i.fas.fa-chevron-right
            router-link(to='/transactionLog')
              .NavBtn.d-flex(:class='{"active": $route.path === "/transactionLog"}')
                span.icon
                  i.fas.fa-clipboard-list
                span.flex-grow-1 交易紀錄
                span
                  i.fas.fa-chevron-right
            router-link(to='/news') 
              .NavBtn.d-flex(:class='{"active": $route.path === "/news"}')
                span.icon
                  i.fas.fa-volume-up
                span.flex-grow-1 網站公告
                span
                  i.fas.fa-chevron-right
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      showNavMenu: false,
      logo: '/static/img/logo.png',
      logo_v: '/static/img/logo_v.png',
      icon_deposit: '/static/img/icon-deposit.svg',
      icon_withdraw: '/static/img/icon-withdraw.svg',
      icon_record: '/static/img/icon-record-b.svg',
      currentNum: 0,
    };
  },
  computed: {
    ...mapState('setting', [
      'WindowWidth',
      'WindowHeight',
      'DeviceIsPc',
    ]),
    ...mapState('member', [
      'MemberLogined',
      'PersonalDetail',
      'Wallet',
    ]),
    ...mapState('index', [
      'NewsList',
    ]),
    
  },
  watch: {
    $route(to, from) {
      this.showNavMenu = false;
    },
  },
  methods: {
    handleCommand(command) {
      this.$router.push(command);
    },
    init() {
      const vm = this;
      setTimeout(() => {
        if (vm.currentNum >= (this.NewsList.length - 1)) {
          vm.currentNum = 0;
        } else {
          vm.currentNum += 1;
        }
        vm.init();
      }, 4000);
    },
    gotoNews(id) {
      this.$router.push(`/newsdetail?id=${id}`);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang='scss' scoped>
.header{
  min-height: 80px;
  // line-height: 80px;
  background:$Color_2;
  color: #fff;
}
.LOGO{
  a{
    color: white;
  }
  .logo{
    width: 170px;
  }
  .logo_v{
    width: 60px;
  }
}
.serverChat{
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  line-height: 32px;
  background-color: $Color_3;
  a{
    color: white;
  }
}

// /////////////////
.news{
  position: relative;
  width: 100%;
  height: 36px;
  color: #fff;
  line-height: 36px;
  background-color: $Color_4;
}
.newsContent{
  width: 100%;
  overflow : hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nav{
  width: 64px;
  height: 36px;
  background-color: #002642;
  text-align: center;
}
.NavMenu{
  position: absolute;
  top: 36px;
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: #002642;
  z-index: 300;
  animation-name: toastBar;
  animation-duration: .3s;
}
.NavBtn{
  height: 60px;
  line-height: 60px;
  color: white !important;
  &:hover{
    color: $Color_1 !important;
  }
  a{
    color: white !important;
    &:hover{
      color: $Color_1;
    }
  }
  .icon{
    width: 42px;
    font-size: 24px;
  }
}
.active{
  color: $Color_1 !important;
}
@keyframes toastBar{
  from{
    height: 0px;
  }
  to{
    height:100vh;
  }
}
@keyframes toast{
  from{
    bottom:-1000px;
  }
  to{
    bottom:0px;
  }
}
.active{
  color: $Color_1;
  a{
    color: $Color_1;
  }
}
.icon16{
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter{
  transform: translateX(1300px);
}
.slide-fade-enter-to, .slide-fade-leave{
  transform: translateX(0px);
}
.slide-fade-leave-to{
  transform: translateX(-500px);
}
.newsButton{
  cursor: pointer;
}
</style>
