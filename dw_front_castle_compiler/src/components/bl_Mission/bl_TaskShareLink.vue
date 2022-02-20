<template lang="pug">
//- 任务1
.missionCollapseItem.my-3(ref='head')
  .d-flex.flex-row.justify-content-between(@click='handleChange')
    div
      span.missionIconSuccess.el-icon-success.mr-2(v-if='memberAllTasks[2].taskCount === memberAllTasks[2].completeCount')
      span.missionIcon.el-icon-circle-check.mr-2(v-else)
      span.missionName {{`${memberAllTasks[2].name} (${memberAllTasks[2].completeCount}/${memberAllTasks[2].taskCount})`}}：
      span.missionDes {{`${memberAllTasks[2].title}` }}
    div.missionType {{memberAllTasks[2].type}}
  .content(ref='inner')
    p.missionType.text-center.my-3(v-html='memberAllTasks[2].content')
    .my-3
      qrcode#QRCDOE(v-if='TaskShareLink.uuuid', :value='`${MAINDOMAIN}/?share_id=${TaskShareLink.uuuid}`' :options="{ width: 300 }")
      div.text-center.my-3
        p
          small.text-white 您的专属二维码与链结(手机长按二维码可保存至相册)
        canvas#QRCDOECanvas(@mousedown='handlemMouseDown', @mouseup='handlemMouseUp', @touchstart='handlemMouseDown', @touchend='handlemMouseUp')
      div.text-center.my-3
        input#shareUrl.w-75(:value='MAINDOMAIN+"/?share_id="+ TaskShareLink.uuuid')
      div.text-center.my-3
        el-button(type='primary', @click='saveImage') 下载 QR CDOE
        el-button(type='primary',  @click='copyText("shareUrl")') 复制网址
</template>
<script>
import Qrcode from 'vue-qrcode';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Qrcode,
  },
  data() {
    return {
      openCollapse: false,
      longTimeClick:'',
      imgData: [
        './static/img/1_image_pc.jpg',
        ],
    };
  },
  computed: {
    ...mapState('index', ['MAINDOMAIN']),
    ...mapState('mission', ['activeTask', 'memberAllTasks', 'TaskShareLink' ]),
  },
  methods: {
    handleChange() {
      const head = this.$refs['head'];
      const inner = this.$refs['inner'];
      this.openCollapse = !this.openCollapse; 
      if(this.openCollapse){
        head.style.height = (inner.offsetHeight+100)+'px';
      } else {
        head.style.height = '46px';
      }
    },
    checkAppIntro(){
      if (this.$route.query.missionType ==2) {
        this.handleChange();
      }
    },
    drawQRCode(){
      const QRCDOECanvas = window.document.getElementById('QRCDOECanvas');
      const ctx = QRCDOECanvas.getContext('2d');
      let len = this.imgData.length;
      QRCDOECanvas.width = 720;
      QRCDOECanvas.height = 254;
      ctx.rect(0, 0, QRCDOECanvas.width, QRCDOECanvas.height);
      ctx.fill();
      const imgbg = new Image();
      // 允许图片跨域 此行不能删除
      imgbg.crossOrigin = 'Anonymous';
      imgbg.src = this.imgData[Math.floor(Math.random() * this.imgData.length)];
      imgbg.onload = function() {
        ctx.drawImage(imgbg, 0, 0, 720, 254);
        const QRCDOE = window.document.getElementById("QRCDOE");
        ctx.drawImage(QRCDOE, 288, 53);
      }
    },
    handlemMouseUp(){
      // MouseUp 後 取消長按event
      clearTimeout(this.longTimeClick);
    },
    handlemMouseDown(){
      // 長按兩秒後 saveImage
      this.longTimeClick = setTimeout(() => {
        this.saveImage();
      }, 500);
    },
    saveImage(){
      const QRCDOECanvas = window.document.getElementById('QRCDOECanvas');
      QRCDOECanvas.toDataURL();
      const tempLink =  window.document.createElement('a');
      tempLink.href = QRCDOECanvas.toDataURL();
      tempLink.download = '梦工厂任务.png';
      //  for app 使用
      const base64Data= tempLink.href.split('data:image/png;base64,');
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.webImgLongPressHandler(base64Data[1]);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.webImgLongPressHandler.postMessage(base64Data[1]);
        } catch (error) {
          console.log(error);
        }
      }

      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();
      // 
    },
    copyText(id) {
      const text = window.document.getElementById(id).value;
      this.$copyText(text).then((e) => {
        this.$message({ message: '复制成功', type: 'success' });
      }).catch((err) => {
        this.$message({ message: '复制失败', type: 'error' });
      });
    },
  },
  mounted () {
    this.$store.dispatch('mission/getTaskShareLink').then((res)=>{
      this.checkAppIntro();
      // api 返回後繪圖
      this.drawQRCode();
    }).catch((err) => {
      this.checkAppIntro();
    });
    // 延迟绘制 QRCODE
  }
};
</script>

<style lang="scss" scoped>
.missiondDesTitle{
    padding: 5px 40px 2px 40px;
    font-size: 12px;
  }
  .missionName {
    font-size: 14px;
    color: white;
  }
  .missionDes {
    font-size: 14px;
    color: white;
    @include media_xs{
      display: none;
    }
    @include media_sm{
      display: inline-block;
    }
    @include media_md{
      display: inline-block;
    }
    @include media_lg{
      display: inline-block;
    }
    @include media_xl{
      display: inline-block;
    }
  }
  .missionType {
    font-size: 14px;
    color: $DW_ColorLight;
  }
  .missionIcon{
    font-size: 20px;
    color: $garyBlue_Dark;
  }
  .missionIconSuccess{
    font-size: 20px;
    color: $DW_greenMiddle;
  }
  .missionCollapseItem{
    cursor: pointer;
    height: 46px;
    border-radius: 12px;
    border: solid 1px rgba(57, 109, 238, 0.24);
    padding: 10px;
    background-color: rgba(57, 109, 238, 0.24);
    overflow: hidden;
    transition: height 0.3s;
  }
  .PersonInfoTableItem{
    width: 100%;
    min-height: 64px;
    line-height: 64px;
    border-radius: 12px;
    padding: 0 20px;
    border: solid 1px $DW_ColorLight;
    color: white;
  }
  #QRCDOECanvas{
    width: 100%;
  }
  #QRCDOE{
    display: none;
    opacity: 0;
  }
</style>
