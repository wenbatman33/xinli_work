<template lang="pug">
  .filter-sticky
    .filter-sticky-label {{ label }}
    el-date-picker(
      :value="value",
      @input="$emit('input', $event)",
      :class="{ 'is-range': props.type.indexOf('range') !== -1 }",
      :type="props.type",
      :value-format="props.type.indexOf('datetime') === -1 ? 'yyyy-MM-dd': 'yyyy-MM-dd HH:mm:ss' ",
      :default-time="props.type.indexOf('time') === -1 ? [] : ['00:00:00', '23:59:59']",
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
