<template lang="pug">
  .bl_ImageVerify
    .verify
      .resetBtn(@click='reset')
        i.fas.fa-sync
      canvas#layer_1(width='340', height='100')
      canvas#layer_2(width='340', height='100')
    .dragBar.my-2(
      @mousedown="mouseDown",
      @mouseup="mouseUp",
      @mousemove="mouseMove",
      @mouseleave="mouseUp",
      @touchstart="touchDown", 
      @touchend="touchUp",
      @touchmove="touchMove")
      .dragBarBox(ref='dragBarBox')
        i.fas.fa-align-justify(v-if='!verifyOK')
        i.fas.fa-check(v-else)
</template>
<script>
const imgArray = [
  '/static/img/verify_1.png', 
  '/static/img/verify_2.png',
  '/static/img/verify_3.png',
  '/static/img/verify_4.png'];
let imgUrl = imgArray[Math.floor(Math.random() * imgArray.length)];
const img = new Image();
const img2 = new Image();
img2.src = imgUrl;
img.src = imgUrl;
export default {
  props: ['verifyOK'],
  data() {
    return {
      // verifyOK:false,
      drag: false,
      dragX: 0,
      offset: [0, 0],
      canvasWidth: 340,
      canvasHeight: 100,
      dragBarBoxWidth: 50,
      dragBarBoxHeight: 50,
      rx: 0,
      ry: 0,
    };
  },
  watch: {
    // 侦听表单验证是否完成 返回至memberFormValidate
    verifyOK(val, newVal) {
      if (!val) {
        this.reset();
      }
    },
  },
  methods: {
    getRandom(min, max) {
      return Math.floor(Math.random() * ((max - min) + 1)) + min;
    },
    mouseDown(e) {
      const vm = this;
      if (!vm.verifyOK) {
        vm.drag = true;
        const elementX = Number(vm.$refs.dragBarBox.style.left.split('px')[0]);
        const elementY = Number(vm.$refs.dragBarBox.style.top.split('px')[0]);
        vm.offset = [
          elementX - e.clientX,
          elementY - e.clientY,
        ];
      }
    },
    mouseUp(e) {
      const vm = this;
      if (!vm.verifyOK) {
        vm.drag = false;
        vm.checkVerify();
      }
    },
    mouseLeave(e) {
      const vm = this;
      vm.drag = false;
    },
    mouseMove(e) {
      const vm = this;
      if (vm.drag === true && vm.verifyOK === false) {
        if ((e.clientX + vm.offset[0]) <= 0) {
          vm.dragX = 0;
        } else if ((e.clientX + vm.offset[0]) >= (vm.canvasWidth - vm.dragBarBoxWidth)) {
          vm.dragX = vm.canvasWidth - vm.dragBarBoxWidth;
        } else {
          vm.dragX = (e.clientX + vm.offset[0]);
        }
        vm.$refs.dragBarBox.style.left = `${vm.dragX}px`;
        vm.canvasRefresh();
      }
    },
    touchDown(e) {
      if (e.target.classList.contains('dragBarBox') || e.target.classList.contains('fas')) {
        const vm = this;
        if (!vm.verifyOK) {
          vm.drag = true;
          const elementX = Number(vm.$refs.dragBarBox.style.left.split('px')[0]);
          const elementY = Number(vm.$refs.dragBarBox.style.top.split('px')[0]);
          vm.offset = [
            elementX - e.changedTouches[0].clientX,
            elementY - e.changedTouches[0].clientY,
          ];
        }
      }
    },
    touchUp(e) {
      const vm = this;
      if (!vm.verifyOK) {
        vm.drag = false;
        vm.checkVerify();
      }
      // console.log(e);
    },
    touchMove(e) {
      const vm = this;
      if (vm.drag === true && vm.verifyOK === false) {
        if ((e.changedTouches[0].clientX + vm.offset[0]) <= 0) {
          vm.dragX = 0;
        } else if ((e.changedTouches[0].clientX + vm.offset[0]) >= (vm.canvasWidth - vm.dragBarBoxWidth)) {
          vm.dragX = vm.canvasWidth - vm.dragBarBoxWidth;
        } else {
          vm.dragX = (e.changedTouches[0].clientX + vm.offset[0]);
        }
        vm.$refs.dragBarBox.style.left = `${vm.dragX}px`;
        vm.canvasRefresh();
      }
    },
    checkVerify() {
      const vm = this;
      if (Math.abs(vm.dragX - vm.rx) <= 3) {
        vm.$emit('VerifySuccess', vm.verifyOK);
      }
    },
    canvasInit() {
      const vm = this;
      // 随机位置
      vm.rx = vm.getRandom(80, vm.canvasWidth - vm.dragBarBoxWidth);
      vm.ry = vm.getRandom(10, vm.canvasHeight - vm.dragBarBoxWidth);
      // vm.canvasRefresh();
      img.onload = () => { vm.canvasRefresh(); };
    },
    canvasRefresh() {
      const vm = this;
      const canvas_1 = document.getElementById('layer_1');
      const canvas_2 = document.getElementById('layer_2');
      // 
      const ctx_1 = canvas_1.getContext('2d');
      const ctx_2 = canvas_2.getContext('2d');
      // 
      canvas_1.width = vm.canvasWidth;
      canvas_1.height = vm.canvasHeight;
      // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height); HTML5 canvas drawImage() 方法
      canvas_2.width = vm.canvasWidth;
      canvas_2.height = vm.canvasHeight;
      ctx_1.drawImage(img, 0, 0, img.width, img.height, 0, 0, vm.canvasWidth, vm.canvasHeight);
      ctx_2.drawImage(canvas_1, vm.rx, vm.ry, 50, 50, vm.dragX, vm.ry, 50, 50);
      // 
      ctx_1.fillStyle = 'white';
      ctx_1.fillRect(vm.rx, vm.ry, 50, 50);
    },
    reset() {
      const vm = this;
      if (!vm.verifyOK) {
        // vm.verifyOK = false;
        vm.drag = false;
        vm.dragX = 0;
        vm.offset = [0, 0];
        vm.canvasWidth = 340;
        vm.canvasHeight = 100;
        vm.dragBarBoxWidth = 50;
        vm.dragBarBoxHeight = 50;
        vm.rx = 0;
        vm.ry = 0;
        vm.$refs.dragBarBox.style.left = `${0}px`;
        imgUrl = imgArray[Math.floor(Math.random() * imgArray.length)];
        img2.src = imgUrl;
        img.src = imgUrl;
        vm.canvasInit();
      } else {
        vm.$emit('imageVerifyReset');
      }
    },
  },
  mounted() {
    this.canvasInit();
    this.canvasRefresh();
  },
};
</script>
<style lang="scss" scoped>
.bl_ImageVerify{
  position: relative;
  width: 340px;
  height: auto;
  display: inline-block;
}
.verify{
  position: relative;
  width: 100%;
  height: 100px;
  #layer_1{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    // opacity: .3;
  }
  #layer_2{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12;
  }
  .resetBtn{
    cursor: pointer;
    position: absolute;
    color: $gray_333;
    top: 5px;
    right: 5px;
    z-index: 13;
    text-shadow: 0px 0px 10px white;
  }
}

.dragBar{
  position: relative;
  width: 340px;
  height: 30px;
  border-radius: 16px;
  box-shadow: inset 0 0 2px 1px $balckAlpha_20;
  border: solid 1px #b6aa98;
  background-color: #ece4dd;
  .dragBarBox{
    cursor: pointer;
    position: absolute;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height:  30px;
    border-radius: 16px;
    box-shadow: 0 0 4px 0 $balckAlpha_40;
    border: solid 1px $whiteAlpha_40;
    background-image: radial-gradient(circle at 50% 50%, white, #f3e6d2);
    i{
      color: $DW_greenMiddle;
    }
    .fa-align-justify{
      transform:rotate(90deg);
    }
  }
}
</style>
