<template lang='pug'>
.HeroBoardItem
  .pic
    img(src='/static/img/pic-game-tiger.png')
  .info
    p
      span.channel 等你来挑战
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
.playBtn{
  cursor: pointer;
}
.HeroBoardItem{
  display: flex;
  border-bottom: #d9d9d9 1px solid;
  .pic{
    cursor: pointer;
    width: 60px;
    height: 60px;
    margin: 20px 0;
    overflow: hidden;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius:50%;
    img{
      height: 60px;
      width: auto;
    }
  }
  .info{
    flex: 1;
    flex-direction:column;
    display:flex;
    justify-content: center;
    padding: 10px 15px;

    .channel{
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: left;
      color: #8c8c8c;
    }
    .bonus{
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
      letter-spacing: normal;
      text-align: left;
      color: #faad14;
    }
    .gameWhere{
      cursor: pointer;
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
      letter-spacing: normal;
      text-align: left;
      color: #001b47;
    }
  }
}
</style>
