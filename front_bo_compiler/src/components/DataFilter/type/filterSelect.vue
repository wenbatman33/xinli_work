<template lang="pug">
  .filter-sticky
    .filter-sticky-label {{ label }}
    el-select(:value="value", @input="$emit('input', $event)")
      el-option(
        v-for="(option, index) in props.options",
        :key="index",
        :value="index"
        :label="option"
      )
    i.el-input__icon.el-icon-close.close-hover(@click="$emit('close')")

</template>

<script>
export default {
  props: ['value', 'props', 'label']
}
</script>
