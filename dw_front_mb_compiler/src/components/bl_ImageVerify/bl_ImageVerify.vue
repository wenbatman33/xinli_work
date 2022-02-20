<template lang="pug">
  .bl_ImageVerify
    .verify
      .resetBtn(@click='reset')
        i.fas.fa-sync
      canvas#layer_1(width='250', height='80')
      canvas#layer_2(width='250', height='80')
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
  `${window.CDN_ASSETS}/static/img/verify_1.png`,
  `${window.CDN_ASSETS}/static/img/verify_2.png`,
  `${window.CDN_ASSETS}/static/img/verify_3.png`,
  `${window.CDN_ASSETS}/static/img/verify_4.png`,
];
let imgUrl = imgArray[Math.floor(Math.random() * imgArray.length)];
const img = new Image();
const img2 = new Image();
img2.src = imgUrl;
img.src = imgUrl;
export default {
  props: ['verifyOK'],
  data() {
    return {
      drag: false,
      dragX: 0,
      offset: [0, 0],
      canvasWidth: 250,
      canvasHeight: 80,
      dragBarBoxWidth: 50,
      dragBarBoxHeight: 50,
      rx: 0,
      ry: 0,
    };
  },
  watch: {
    // 偵聽表單驗證是否完成 返回至memberFormValidate
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
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
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
    },
    touchMove(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
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
      // 隨機位置
      vm.rx = vm.getRandom(80, vm.canvasWidth - vm.dragBarBoxWidth);
      vm.ry = vm.getRandom(10, vm.canvasHeight - vm.dragBarBoxWidth);
      img.onload = () => { vm.canvasRefresh(); };
    },
    canvasRefresh() {
      const vm = this;
      const canvas_1 = document.getElementById('layer_1');
      const canvas_2 = document.getElementById('layer_2');
      const ctx_1 = canvas_1.getContext('2d');
      const ctx_2 = canvas_2.getContext('2d');
      canvas_1.width = vm.canvasWidth;
      canvas_1.height = vm.canvasHeight;
      // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height); HTML5 canvas drawImage() 方法
      canvas_2.width = vm.canvasWidth;
      canvas_2.height = vm.canvasHeight;
      ctx_1.drawImage(img, 0, 0, img.width, img.height, 0, 0, vm.canvasWidth, vm.canvasHeight);
      ctx_2.drawImage(canvas_1, vm.rx, vm.ry, 50, 50, vm.dragX, vm.ry, 50, 50);
      // 
      ctx_1.fillStyle = '#fff';
      ctx_1.fillRect(vm.rx, vm.ry, 50, 50);
    },
    reset() {
      const vm = this;
      if (!vm.verifyOK) {
        // vm.verifyOK = false;
        vm.drag = false;
        vm.dragX = 0;
        vm.offset = [0, 0];
        vm.canvasWidth = 250;
        vm.canvasHeight = 80;
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
  width: 250px;
  height: auto;
  margin: 0 auto;
  display: inline-block;
}
.verify{
  position: relative;
  width: 100%;
  height: 80px;
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
    color: #333;
    top: 5px;
    right: 5px;
    z-index: 13;
    text-shadow: 0px 0px 10px #fff;
  }
}

.dragBar{
  position: relative;
  width: 250px;
  height: 30px;
  border-radius: 16px;
  box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.2);
  border: solid 1px $theme;
  background-color: $theme;
  
  .dragBarBox{
    cursor: pointer;
    position: absolute;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height:  30px;
    border-radius: 16px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
    border: solid 1px rgba(255, 255, 255, 0.39);
    background-image: radial-gradient(circle at 50% 50%, #ffffff, #f3e6d2);
    i{
      color: #88c86b;
    }
    .fa-align-justify{
      transform:rotate(90deg);
    }
  }
}
</style>
