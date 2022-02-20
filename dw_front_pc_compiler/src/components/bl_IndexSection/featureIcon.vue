<template lang="pug">
.featureIcon
  .value {{secs}}s
  vue-circle(:progress='Number(ProgressNum)', 
    ref='circleItem',
    :size='120', 
    :fill='fill', 
    :animation-start-value='0.0',
    :start-angle='300', 
    :thickness='12',
    line-cap='round',
    :show-percent='false',
    empty-fill='rgba(0, 0, 0, 0)')
  svg.progress-ring(width='120', height='120')
    circle.progress_ring_circle(stroke='white', stroke-width='10', fill='transparent', r='55', cx='60', cy='60')
</template>
<script>
import VueCircle from 'vue2-circle-progress';

export default {
  components: {
    VueCircle,
  },
  props: ['propsProgress', 'secs'],
  data() {
    return {
      ProgressNum: 0,
      fill: { gradient: ['#32FF7A', '#20CDFF'] },
    };
  },
  methods: {
    progress(event, progress, stepValue) {
      console.log(stepValue);
    },
    progress_end(event) {
      console.log('Circle progress end');
    },
    clickHandle() {
      console.log('circleItem');
      this.$refs.circleItem.updateProgress(10);
    },
    handleScroll() {
      const yOffset = window.pageYOffset;
      const sectionScrollTop = document.getElementById('section_2').offsetTop;
      const viewPortHeight = window.document.body.clientHeight;
      const vm = this;
      if (yOffset > (sectionScrollTop - viewPortHeight)) {
        vm.ProgressNum = Number(vm.propsProgress);
        this.$refs.circleItem.updateProgress(vm.ProgressNum);
      } else {
        vm.ProgressNum = 0;
        this.$refs.circleItem.updateProgress(vm.ProgressNum);
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>
<style lang="scss" scoped>
.featureIcon{
  width: 150px;
  height: 150px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  .value{
    position: absolute;
    width: 100%;
    text-align: center;
    margin-top: 40px;
    color: white;
    font-size: 32px;
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
</style>
