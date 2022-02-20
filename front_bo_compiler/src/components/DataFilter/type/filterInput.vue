<template lang="pug">
  .filter-input
    input(
      :type="props.type",
      :class="{'focus': focus || value}",
      @focus="focus = true",
      @blur="removeFocusClass",
      :value="value",
      @input="$emit('input', $event.target.value)"
    )
    span(:data-label="label")
    i(class="el-input__icon el-icon-close close-hover", @click="$emit('close')")
</template>

<script>
export default {
  data() {
    return {
      focus: false
    }
  },
  props: ['value', 'props', 'label'],
  methods: {
    removeFocusClass() {
      if (! this.value) {
        this.focus = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.close-hover.el-icon-close:hover::before {
  border-radius: 50%;
  background-color: #b4bccc;
  color: #fff;
  cursor: pointer;
}

.filter-input {
  border-bottom: 2px solid #adadad;
  position: relative;

  &:hover {
    border-bottom-color: rgba(0, 0, 0, 0.87);;
  }

  input {
    position: relative;
    font-size: 14px;
    color: #333;
    border: none;
    outline: none;
    background: none;
    height: 40px;
    padding: 0 5px;
    z-index: 10;
  }

  span::before {
    content: attr(data-label);
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    transition: .3s;
    color: #adadad;
    z-index: 1;
  }

  .focus + span::before {
    top: -3px;
    font-size: 12px;
  }
}
</style>

