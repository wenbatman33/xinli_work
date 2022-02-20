<template lang="pug">
.pageContainer
  .container
    h1 Design
    .my-4
      a-button.mx-1(type='primary') 按钮樣式
      a-button.mx-1(type='primary' disabled) 按钮樣式
      a-button.mx-1(type='primary' loading) 按钮樣式
    .my-4
      a-button.mx-1.xBlueBtn(type='primary') 按钮樣式
      a-button.mx-1.xBlueBtn(type='primary' disabled) 按钮樣式
      a-button.mx-1.xBlueBtn(type='primary' loading) 按钮樣式
    .my-4
      a-button.mx-1.xRedBtn(type='primary') 按钮樣式
      a-button.mx-1.xRedBtn(type='primary' disabled) 按钮樣式
      a-button.mx-1.xRedBtn(type='primary' loading) 按钮樣式
    .my-4 
      a-button.mx-1(danger) 按钮樣式
      a-button.mx-1(danger disabled) 按钮樣式
      a-button.mx-1(danger loading) 按钮樣式
    .my-4
      a-button.mx-1(type='primary' danger) 按钮樣式
      a-button.mx-1(type='primary' danger disabled) 按钮樣式
      a-button.mx-1(type='primary' danger loading) 按钮樣式
    .my-4
      a-button.mx-1.BG_GRADIENT_1(type='primary' danger) 按钮樣式
      a-button.mx-1.BG_GRADIENT_1(type='primary' danger disabled) 按钮樣式
      a-button.mx-1.BG_GRADIENT_1(type='primary' danger loading) 按钮樣式
    .my-4.bg-gray-600.p-2
      a-button.mx-1.BG_GRADIENT_1(ghost) 按钮樣式
      a-button.mx-1.BG_GRADIENT_1(ghost disabled) 按钮樣式
      a-button.mx-1.BG_GRADIENT_1(ghost loading) 按钮樣式
    .my-8.p-2
      a-button.primaryBtn.mx-1 按钮樣式
      a-button.cancelBtn.mx-1 按钮樣式
    .my-8.p-2.bg-white
      a-button.primaryBtn.mx-1(disabled) 按钮樣式
      a-button.cancelBtn.mx-1(disabled) 按钮樣式
      a-button.cancelBtn.mx-1(loading ) 按钮樣式
</template>

<script setup lang="ts">
	import { ref, defineProps } from 'vue';
</script>

<style scoped lang="scss"></style>
