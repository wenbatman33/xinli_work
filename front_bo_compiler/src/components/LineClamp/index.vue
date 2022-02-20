<template lang="pug">
  el-popover(trigger="manual", v-model="visible")
    span(v-html="content")
    template(slot="reference")
      .bl-line-clamp(
        :style="{ 'max-height': `${line * 23}px`,  '-webkit-line-clamp': line}",
        v-html="content",
        ref="lineclamp",
        @mouseover="shouldShowPopover()",
        @mouseleave="visible = false"
      )
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    shouldShowPopover() {
      this.visible = this.$refs.lineclamp.scrollHeight - 16 > this.$refs.lineclamp.clientHeight;
    }
  },
  props: {
    content: {
      type: String
    },
    line: {
      type: Number,
      default: 2
    }
  },
}
</script>

<style lang="scss" scoped>
.bl-line-clamp {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  width: 100%;
  overflow-wrap: break-word;
}
</style>
