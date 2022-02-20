<template  lang="pug">
  qrcode-vue(:value="value" :size="size" level="H")
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'Qrcode',
  components: {
    QrcodeVue
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 200
    }
  }
}
</script>

