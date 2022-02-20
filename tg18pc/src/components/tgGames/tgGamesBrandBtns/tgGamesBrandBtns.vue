<template lang='pug'>
.container-fluid
  .container
    .row.my-3.gamesProvider.d-flex(v-if='currentGameType==1 && slotProvider.length>0')
      .text-center.p-2.mx-2(v-for="item in slotProvider", v-if='item.Status!=0', v-bind:class="[getQuery===item.GroupName ? 'active': '']")
        router-link.providerLink(:to='"/"+currentGameTypeName+"?game="+item.GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
          p.providerImage(:style='{background:item.ColorCode}')
            img(:src='item.Images')
          p.providerName.text-center.my-0 {{item.CompanyName}}
    .row.my-3.gamesProvider(v-if='currentGameType==2 && fishingProvider.length>0')
      .text-center.p-2.mx-2(v-for="item in fishingProvider", v-if='item.Status!=0' , v-bind:class="[getQuery===item.GroupName ? 'active': '']")
        router-link.providerLink(:to='"/"+currentGameTypeName+"?game="+item.GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
          p.providerImage(:style='{background:item.ColorCode}')
            img(:src='item.Images')
          p.providerName.text-center.my-0 {{item.CompanyName}}
    .row.my-3.gamesProvider(v-if='currentGameType==3 && boardProvider.length>0')
      .text-center.p-2.mx-2(v-for="item in boardProvider", v-if='item.Status!=0' , v-bind:class="[getQuery===item.GroupName ? 'active': '']")
        router-link.providerLink(:to='"/"+currentGameTypeName+"?game="+item.GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
          p.providerImage(:style='{background:item.ColorCode}')
            img(:src='item.Images')
          p.providerName.text-center.my-0 {{item.CompanyName}}
    .row.my-3.gamesProvider(v-if='currentGameType==4 && arcadeProvider.length>0')
      .text-center.p-2.mx-2(v-for="item in arcadeProvider", v-if='item.Status!=0' , v-bind:class="[getQuery===item.GroupName ? 'active': '']")
        router-link.providerLink(:to='"/"+currentGameTypeName+"?game="+item.GroupName' , v-on:click.native='GA_home_platform(item.GroupId)')
          p.providerImage(:style='{background:item.ColorCode}')
            img(:src='item.Images')
          p.providerName.text-center.my-0 {{item.CompanyName}}
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('index', [
      'slotProvider',
      'fishingProvider',
      'boardProvider',
      'arcadeProvider',
    ]),
    ...mapState('game', [
      'currentGameTypeName',
      'currentGameType',
    ]),
    getQuery() {
      const query = this.$route.query.game;
      return query;
    },
  },
};
</script>
<style lang="scss" scoped>
.gamesProvider{
  height: auto;
  .providerLink{
    color: #262626;
    text-decoration: none;
  }
  .active{
    border-radius: 24px;
    border: solid 1px #1890ff;
    color: #1890ff !important;
    background-color: rgba(24, 144, 255, 0.12);
    .providerLink{
      color: #1890ff;
      text-decoration: none;
    }
  }
}
.provideActive{
  border: solid 2px #fadb14 !important;
}
.triangle{
  position: absolute;
  right: 0;
  bottom: 0;
  border-style: solid;
  border-width: 0 0 48px 48px;
  border-color: transparent transparent #fadb14 transparent;
}
.tgBrandCard{
    position: relative;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    background-color: #ffffff;
    border: solid 1px #e4e7ed;
    overflow: hidden;
    .title{
      color:#fff;
      font-size:14px;
      height: 38px;
      background-color: rgba(0, 0, 0, 0.8);
      position: absolute;
      width: 100%;
      bottom: 0;
      text-align: center;
      line-height:38px;
    }
    img{
      width:100%;
    }
  }
.providerImage{
  width: 100%;
  margin-right: 0;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  line-height: 50px;
  img{
    margin: 0;
    width: 30px;
    height: 30px;
  }
}
.gamesPageTab{
    height:45px;
    line-height:45px;
    background:#fff;
    border-bottom: 1px solid #e8e8e8;
  }
  ul{
    li{
      display: inline-block;
      cursor: pointer;
      line-height:41px;
      margin-right: 20px;
      font-size: 14px;
      color: #595959;
      text-decoration: none;
      border-bottom: 2px solid rgba(255,255,255,0);
      a{
        display: block;
        line-height:41px;
        color: #595959;
        padding: 0 10px;
        text-decoration: none;
        &:hover{
          color: #faad14;
          border-bottom: 2px solid #faad14;
        }
      }
      .router-link-active{
        color: #faad14;
        border-bottom: 2px solid #faad14;
      }
    }
  }
</style>
