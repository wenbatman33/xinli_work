<template lang="pug">
.featureIconHover
  .circleImg
    i.fas(:class='fontawesomeClass')
  .circleBg
    .Bg_1
    .Bg_2
    .Bg_3
    .Bg_4
</template>
<script>
export default {
  props: ['fontawesomeClass'],
  data() {
    return {
    };
  },
  methods: {
    progress(event, progress, stepValue) {
      console.log(stepValue);
    },
    progress_end(event) {
      console.log('Circle progress end');
    },
    
  },
};
</script>
<style lang="scss" scoped>
.featureIconHover{
  width: 150px;
  height: 150px;
  margin: 0 auto;
  position: relative;
  .value{
    position: absolute;
    width: 150px;
    text-align: center;
    margin-top: 70px;
    color: white;
    font-size: 40px;
  }
  .circle{
    position: absolute;
    z-index: 2;
  }
  .progress-ring{
    position: relative;
    top:0;
    left: 0;
    .progress_ring_circle {
      stroke-dasharray: 5 10;
      opacity: .15;
    }
  }
  
}
.circleImg{
  position: absolute;
  z-index: 2;
  width: 100%;
  text-align: center;
  top: 25px;
  pointer-events: none;
  padding: 15px 0;
  i{
    font-size: 70px;
    color: white;
  }
}
.circleBg {
  position: absolute;
  z-index: 1;
  .Bg_1{
    position: absolute;
    margin: auto auto;
    width: 150px;
    height: 150px;
    padding: 0px;
    border-radius: 50%;
    transform: scale(0.8);
    transition: all 300ms ease-in-out;
    background-image: linear-gradient(90deg, $DW_greenLight 0%, $DW_skyLight_1 100%);
    opacity: .2;
  }
  .Bg_2{
    position: absolute;
    margin: auto auto;
    width: 150px;
    height: 150px;
    padding: 6px;
    border-radius: 50%;
    transform: scale(0.6);
    transition: all 300ms ease-in-out;
    background-image: linear-gradient(90deg, $DW_greenLight 0%, $DW_skyLight_1 100%);
    opacity: .4;
  }
  .Bg_3{
    position: absolute;
    margin: auto auto;
    width: 150px;
    height: 150px;
    padding: 12px;
    border-radius: 50%;
    transform: scale(0.4);
    transition: all 300ms ease-in-out;
    background-image: linear-gradient(90deg, $DW_greenLight 0%, $DW_skyLight_1 100%);
    opacity: .6;
  }
  .Bg_4{
    position: absolute;
    margin: auto auto;
    width: 150px;
    height: 150px;
    padding: 18px;
    border-radius: 50%;
    transform: scale(0.2);
    transition: all 300ms ease-in-out;
    background-image: linear-gradient(90deg, $DW_greenLight 0%, $DW_skyLight_1 100%);
    opacity: .8;
  }
  &:hover {
    .Bg_1{
      transform: scale(.9);
    }
    .Bg_2{
      transform: scale(.8);
    }
    .Bg_3{
      transform: scale(.7);
    }
    .Bg_4{
      transform: scale(.6);
    }
  }
}

</style>
