<template lang="pug">
  .filter-sticky
    .filter-sticky-label {{ label }}
    el-time-picker(
      :value="value",
      @input="$emit('input', $event)",
      :value-format="props.format || 'HH:mm:ss'",
      :format="props.format || 'HH:mm:ss'",
      :clearable="false",
      :editable="false"
    )
    i.el-input__icon.el-icon-close.close-hover(@click="$emit('close')")

</template>

<script>
export default {
  props: ['value', 'props', 'label']
}
</script>
