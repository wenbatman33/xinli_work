<template lang="pug">
  .filter-sticky
    el-checkbox.m-0(:value="value", @input="$emit('input', $event)") {{ label }}
    
    span(:data-label="label")
    i(class="el-input__icon el-icon-close close-hover", @click="$emit('close')")
</template>

<script>
export default {
  props: ['value', 'props', 'label']
}
</script>
