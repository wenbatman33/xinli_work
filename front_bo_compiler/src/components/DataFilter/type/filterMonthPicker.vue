<template lang="pug">
  .filter-sticky
    .filter-sticky-label {{ label }}
    el-date-picker.is-month(
      :value="value",
      @input="$emit('input', $event)",
      type="month",
      value-format="yyyy-MM",
      :clearable="false",
      :editable="false",
      format="yyyy年 MM月"
    )
    i.el-input__icon.el-icon-close.close-hover(@click="$emit('close')")

</template>

<script>
export default {
  props: ['value', 'props', 'label']
}
</script>
