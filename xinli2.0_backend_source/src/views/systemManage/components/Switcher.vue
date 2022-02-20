<template>
  <Col :xl="12" :lg="24">
    <h2 class="label">{{ swichName }}</h2>
    <Switch checked-children="ON" un-checked-children="OFF" @change="change" v-model:checked="checkValue" />
    <p class="description"> {{ description }} </p>
  </Col>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { Switch, Col } from 'ant-design-vue';
  
  export default defineComponent({
    props: ['swichName', 'description', 'checkedValue'],
    emits: ['update'],
    components: { Switch, Col },
    setup(props, { emit }) {
      const checkValue = ref(props.checkedValue);
      function change(checked) {
        emit('update', checked);
      }
      watch(
        () => props.checkedValue,
        (newVal) => {
          checkValue.value = newVal;
        },
        { immediate: true },
      );
      return { 
        checkValue,
        change
      };
    }
  });
</script>
<style lang="scss" scoped>
.label{
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 0;
  margin-right: 1.5rem;
}
.description{
  color: #999;
  margin-top: 5px;
  margin-bottom: 0;
}
</style>