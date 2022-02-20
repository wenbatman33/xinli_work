<template lang="pug">
//- 滾動數字物件
.relative
  .z-10.invisible {{ textList[0] }}
  .z-20.absolute(:style='rollStyle')
    p(v-for='item in textList') {{ item }}
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Number text
     */
    text: string;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Number list
   */
  const numberList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  /**
   * Text list
   */
  const textList = computed(() => {
    if (numberList.indexOf(props.text) >= 0) {
      return numberList;
    } else {
      return [props.text];
    }
  });

  /**
   * Roll style
   */
  const rollStyle = computed(() => {
    return `
	transition-property: top; 
	transition-duration: 0.08s; 
	top: -${textList.value.indexOf(props.text) * 100}%`;
  });
</script>
