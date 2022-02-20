<template lang="pug">
//- 站內信導覽欄
BasicNav.bg-white(:title='t(`letter`)')
  //- 左側
  template(#left)
    //- 返回
    BackButton

  //- 右側
  template(#right)
    //- 返回
    BasicButton(size='small', textColor='primary', @click='handleEditClick')
      span(v-if='editMode') {{ t("common_done") }}
      span(v-else) {{ t("common_edit") }}
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { useI18n } from 'vue-i18n';
  import BasicNav from '@/components/nav/BasicNav.vue';
  import BackButton from '@/components/button/BackButton.vue';
  import BasicButton from '@/components/button/BasicButton.vue';

  /**
   * Component props interfcae
   */
  interface Props {
    /**
     * Edit mode
     */
    editMode?: boolean;
  }

  /**
   * Component emits interface
   */
  interface Emits {
    /**
     * Update edit mode
     */
    (e: 'update:editMode', editMode?: boolean): void;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Component emits
   */
  const emit = defineEmits<Emits>();

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Handle edit button clicked
   */
  const handleEditClick = () => {
    emit('update:editMode', !props.editMode);
  };
</script>
