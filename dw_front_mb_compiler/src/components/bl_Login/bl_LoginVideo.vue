<template lang="pug">
div
  canvas#loginVideo(width="1080",height="1920")
  .imgLoader
    img.vImg(v-for='index in allPics', :src='cdnPath+"/upload/movies/pics/img_"+index+".jpg"', :id='"frame"+index')
</template>

<script>
export default {
  data() {
    return {
      counter: 1,
      fps: 3,
      allPics: 450,
      videoTimer: null,
      windowWidth: 0,
      windowHeight: 0,
      myCanvas: null,
      ctx: null,
      cdnPath: window.CDN_STATIC,
    };
  },
  methods: {
    animation() {
      const vm = this;
      const myCanvas = window.document.getElementById('loginVideo');
      const ctx = myCanvas.getContext('2d');
      const img = window.document.getElementById(`frame${this.counter}`);
      // console.log(img)
      ctx.drawImage(img, 0, 0);
      if (this.counter == this.allPics) {
        this.counter = 1;
      } else {
        this.counter += 1;
      }
      this.videoTimer = setTimeout(() => {
        vm.animation();
      }, 10 * this.fps);
    },
    resizeBackgroundVideo() {
      this.windowWidth = window.document.documentElement.clientWidth;
      this.windowHeight = window.document.documentElement.clientHeight; 
      window.document.getElementById('loginVideo').style.width = `${this.windowWidth}px`;
      window.document.getElementById('loginVideo').style.height = 'auto';
      const videoWidth = window.document.getElementById('loginVideo').offsetWidth;
      const videoHeight = window.document.getElementById('loginVideo').offsetHeight;
      if (videoHeight < this.windowHeight) {
        window.document.getElementById('loginVideo').style.height = `${this.windowHeight}px`;
        window.document.getElementById('loginVideo').style.width = 'auto';
      } else {
        window.document.getElementById('loginVideo').style.width = `${this.windowWidth}px`;
        window.document.getElementById('loginVideo').style.height = 'auto';
      }
    },
  },
  beforeDestroy() {
    window.document.getElementsByTagName('body')[0].style.height = '';
    window.document.getElementsByTagName('html')[0].style.height = '';
    clearTimeout(this.videoTimer);
  },
  mounted() {
    window.document.getElementsByTagName('body')[0].style.height = '100%';
    window.document.getElementsByTagName('html')[0].style.height = '100%';
    window.addEventListener('resize', this.resizeBackgroundVideo);
    setTimeout(() => {
      this.resizeBackgroundVideo();
      this.animation();
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
#loginVideo{
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: black;
}
.imgLoader{
  position: absolute;
  display: none;
  opacity: 0;
}
</style>
