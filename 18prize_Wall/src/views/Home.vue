<template lang="pug">
  .home
    .hover
    .container-fluid.h-100
      .main
        el-carousel(v-if='show', indicator-position='none',hover='false', trigger='none' :loop='loop', :interval='interval', arrow='arrow')
          el-carousel-item(v-for='(item, index) in tempArray', :key='index', v-if='item.length>0')
            .content(v-if='index==0 || index==11')
              .row.h-100
                .col-4
                .col-8
                  .h-100
                    .row.h-100.align-items-center.justify-content-end.p-5
                      .col-4(v-for='(user, num) in item', :key='num') 
                        .PrizPluseMember
                          span.gid {{user.member.gid}} 
                          span.memberName {{replace(user.member.name)}} 
                          span.plusPrize {{user.plusPrize}}
            .content(v-else)
              .PrizeTitle
                img(:src='imgUrl(index)')
              .PrizeList.d-flex.justify-content-center.align-content-center.flex-column
                //- .PrizeMember.my-2(v-for='(user, num) in 20', :key='num') 模擬10則
                .PrizeMember.my-3(v-for='(user, num) in item', :key='num') 
                  span.gid {{user.member.gid}} 
                  span.memberName {{replace(user.member.name)}} 
                  span.plusPrize {{user.plusPrize}}
            .bg.prizeBG(:class='"p"+index')
</template>
<script>
import { db } from '../main';

export default {
  data () {
    return {
      firestorePrizeTitle:['加碼獎','1獎','2獎','3獎','4獎','5獎','6獎','7獎','8獎','9獎','10獎','新生買回'],
      firestorePrize:{},
      tempArray:[],
      loop: true,
      interval:6000,
      arrow: 'never',
      show:true,
      iType:1
    }
  },
  firestore () {
    return {
      firestorePrize: db.collection('prize').orderBy('time','desc'),
    }
  },
  watch: {
    firestorePrize(val){
      this.tempArray =[];
      setTimeout(() => {
        this.tempArray = this.getData();
      }, 300);
      
    }
  },
  methods: {
    replace(name){
      let str = name ;
      return str = str.replace("_", " ");
    },
    imgUrl(id){
      return 'https://wenbatman33.github.io/prize_wall/static/img/t_'+id+'.png';
    },
    getData(){
      const vm =this;
      let array=[];
      let userResult;
      this.firestorePrizeTitle.forEach(element => {
        userResult = this.firestorePrize.filter(user =>user.prizeTitle.indexOf(element)!= -1)
        array.push(userResult);
      });
      vm.show=true;
      vm.tempArray = array;
      return array;
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss'>
@import '../assets/css/img.css';

.main{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content{
  width: 100%;
  height: 100%;
  color:#fff;
  position: relative;
  z-index: 2;
}
.el-carousel{
  height: 100vh;
}
.el-carousel__container{
  height: 100% !important;
}
.el-carousel__item {
  height: 100vh;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  margin: 0;
}
.el-carousel__item:nth-child(3n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(3n+1) {
  background-color: #d3dce6;
}
.el-carousel__item:nth-child(3n+2) {
  background-color: #f90;
}
@keyframes zoomout {
  0% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes zoom {
  0% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1.2, 1.2);
  }
}
@keyframes zoom {
  0% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1.2, 1.2);
  }
}
.bg{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
}
.prizeBG{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 1;
  animation: zoomout 8s forwards;
}

@keyframes moveTop {
  0%   {
    top: 55%;
    opacity:0;
  }
  100% {
    top: 45%;
    opacity:1;
  }
}
.PrizeTitle{
  position: absolute;
  width: 20%;
  top: 45%;
  left: 40%;
  // background: #ccc;
  // height: 100%;
  z-index: 10;
  opacity:0;
  img{
    max-width: 100%;
    height: auto;
  }
}
.PrizeList{
  position: absolute;
  width: 40%;
  height: 100%;
  left: 60%;
  // background: #f90;
  padding: 10px;

}
.PrizeMember{
  padding: 12px;
  background: rgba(255,255,255,.2);
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  font-size: 24px;
  span{
    text-shadow: 0 0 0.2em rgba(0,0,0,.3), 0 0 0.2em rgba(0,0,0,.3);
  }
}
.is-active{
  .prizeBG{
    // transform: scale(1.5);
    animation: zoom 8s forwards;
  }
  .PrizeTitle{
    animation-delay: 1s;
    animation: moveTop 1s forwards;
  }
}
.titleDiv{
  img{
    width: 100%;
    height: auto;
  }
}
.hover{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(255,255,255,.02);
  z-index: 300;
}


.PrizeMember{
  padding: 12px;
  background: rgba(255,255,255,.2);
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  font-size: 24px;
  span{
    text-shadow: 0 0 0.2em rgba(0,0,0,.3), 0 0 0.2em rgba(0,0,0,.3);
  }
  .gid{
    font-size: 16px;
  }
  .memberName{
    font-weight: bold;
  }
  .plusPrize{
    color: #FFF;
    opacity: .8;
    font-weight: 300;
  }
}

.PrizPluseMember{
  padding: 12px;
  background: rgba(255,255,255,.2);
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  font-size: 24px;
  span{
    text-shadow: 0 0 0.2em rgba(0,0,0,.3), 0 0 0.2em rgba(0,0,0,.3);
  }
  .gid{
    font-size: 12px;
  }
  .memberName{
    font-weight: bold;
  }
  .plusPrize{
    font-size: 16px;
    color: #FFF;
    opacity: .8;
    font-weight: 300;
  }
}
</style>