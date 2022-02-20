<template lang="pug">
//- 基礎按鈕
Button.border-none.h-auto(
  :class='[bgClass, textColorClass, textSizeClass, paddingClass, borderClass, cornerClass, alignClass]',
  :style='[bgStyle, textStyle]',
  :disabled='disabled',
  :loading='loading',
  :loading-text='t("common_processing")',
  loading-size='16px',
  loading-type='spinner'
)
  slot
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Button } from 'vant';
  import { useI18n } from 'vue-i18n';

  /**
   * Component props interface
   */
  interface Props {
    /**
     * Background color
     */
    bg?: 'gradient' | 'white20' | 'white100' | 'primary5' | 'accent100' | 'accent10' | string;

    /**
     * Text color
     */
    textColor?: 'white' | 'primary' | 'accent' | string;

    /**
     * Button size
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * Border color
     */
    border?: 'white100' | 'primary10' | 'accent100';

    /**
     * Corner radius
     */
    rounded?: 'full' | 'normal' | 'md' | 'tmd' | 'bmd';

    /**
     * Content align
     */
    content?: 'left' | 'stretch';

    /**
     * Button disabled
     */
    disabled?: boolean;

    /**
     * Button loading
     */
    loading?: boolean;
  }

  /**
   * Component props
   */
  const props = defineProps<Props>();

  /**
   * Vue i18n
   */
  const { t } = useI18n();

  /**
   * Background color classes
   */
  const bgClass = computed(() => {
    if (props.bg === 'gradient') {
      return ['bg-gradient-to-r', 'from-secondary2', 'to-gradient2'];
    } else if (props.bg === 'white20') {
      return ['bg-white20'];
    } else if (props.bg === 'white100') {
      return ['bg-white'];
    } else if (props.bg === 'primary5') {
      return ['bg-primary5'];
    } else if (props.bg === 'accent100') {
      return ['bg-accent100'];
    } else if (props.bg === 'accent10') {
      return ['bg-accent10'];
    } else {
      return ['bg-transparent'];
    }
  });

  /**
   * Background color styles
   */
  const bgStyle = computed(() => {
    if (/^#\w{6,}$/.test(props.bg || '')) {
      return { background: props.bg };
    } else if (/^rgba\(.+\)$/.test(props.bg || '')) {
      return { background: props.bg };
    } else {
      return {};
    }
  });

  /**
   * Text color classes
   */
  const textColorClass = computed(() => {
    if (props.textColor === 'white') {
      return ['text-white'];
    } else if (props.textColor === 'primary') {
      return ['text-primary'];
    } else if (props.textColor === 'accent') {
      return ['text-accent'];
    } else {
      return ['text-white'];
    }
  });

  /**
   * Text size classes
   */
  const textSizeClass = computed(() => {
    if (props.size === 'large') {
      return ['subtitle1'];
    } else if (props.size === 'medium') {
      return ['subtitle2'];
    } else {
      return [];
    }
  });

  /**
   * Text color styles
   */
  const textStyle = computed(() => {
    if (/^#\w{6,}$/.test(props.textColor || '')) {
      return { color: props.textColor };
    } else {
      return {};
    }
  });

  /**
   * Padding classes
   */
  const paddingClass = computed(() => {
    if (props.size === 'small') {
      return ['px-4', 'py-1', 'text-xs'];
    } else if (props.size === 'medium') {
      return ['px-5', 'py-2', 'text-xs'];
    } else if (props.size === 'large') {
      return ['px-14', 'py-3', 'text-sm'];
    } else {
      return ['p-0'];
    }
  });

  /**
   * Border classes
   */
  const borderClass = computed(() => {
    if (props.border === 'white100') {
      return ['border-white100'];
    } else if (props.border === 'primary10') {
      return ['border-primary10'];
    } else if (props.border === 'accent100') {
      return ['border-accent100'];
    } else {
      return ['border-transparent'];
    }
  });

  /**
   * Corner radius classes
   */
  const cornerClass = computed(() => {
    if (props.rounded === 'full') {
      return ['rounded-full'];
    } else if (props.rounded === 'normal') {
      return ['rounded'];
    } else if (props.rounded === 'md') {
      return ['rounded-md'];
    } else if (props.rounded === 'tmd') {
      return ['rounded-t-md'];
    } else if (props.rounded === 'bmd') {
      return ['rounded-b-md'];
    } else if (props.size === 'small') {
      return ['rounded'];
    } else if (props.size === 'medium') {
      return ['rounded'];
    } else if (props.size === 'large') {
      return ['rounded-md'];
    } else {
      return [];
    }
  });

  /**
   * Content align classes
   */
  const alignClass = computed(() => {
    if (props.content === 'left') {
      return ['content-left'];
    } else if (props.content === 'stretch') {
      return ['content-stretch'];
    } else {
      return ['content-center'];
    }
  });
</script>

<style scoped lang="scss">
  .bg-white20 {
    background: rgba(255, 255, 255, 0.2);
  }

  .bg-primary5 {
    background: rgba(7, 31, 68, 0.05);
  }

  .bg-accent100 {
    background: #f0453a;
  }

  .bg-accent10 {
    background: rgba(240, 69, 58, 0.1);
  }

  .border-white100 {
    border: 1px #ffffff solid;
  }

  .border-primary10 {
    border: 1px rgba(7, 31, 68, 0.1) solid;
  }

  .border-accent100 {
    border: 1px solid rgba(240, 69, 58, 0.8);
  }

  .content-left {
    ::v-deep(.van-button__content) {
      justify-content: left;
    }
    ::v-deep(.van-button__text) {
      flex-grow: 0;
    }
  }

  .content-center {
    ::v-deep(.van-button__content) {
      justify-content: center;
    }
    ::v-deep(.van-button__text) {
      flex-grow: 0;
    }
  }
  .content-stretch {
    ::v-deep(.van-button__content) {
      justify-content: stretch;
    }
    ::v-deep(.van-button__text) {
      flex-grow: 1;
    }
  }
</style>
