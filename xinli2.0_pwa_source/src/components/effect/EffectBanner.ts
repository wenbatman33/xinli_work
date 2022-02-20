/**
 * Banner swiper effect
 * @param swiper Swiper instance
 * @param extendParams Extend parameters
 * @param on On event register
 */
export default function ({ swiper, extendParams, on }: any) {
  extendParams({
    bannerEffect: {
      crossFade: false,
      transformEl: null,
    },
  });

  on('beforeInit', () => {
    swiper.classNames.push(`${swiper.params.containerModifierClass}banner`);
    const overwriteParamsResult = {
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode,
    };
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });

  on('init', () => {
    swiper.update();
  });

  on('setTranslate', () => {
    const { slides } = swiper;
    const params = swiper.params.bannerEffect;

    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = swiper.slides.eq(i);
      const offset = $slideEl[0].swiperSlideOffset;
      const progress = $slideEl[0].progress;
      const absProgress = Math.abs(progress);

      let tx;
      if (progress >= 0) {
        tx = swiper.translate;
      } else {
        tx = -offset - progress * 8;
      }

      let ty;
      if (progress >= 0) {
        ty = 0;
      } else {
        ty = -progress * 8;
      }

      let slideOpacity;
      if (progress > 0) {
        slideOpacity = 1 - progress;
      } else if (progress === 0) {
        slideOpacity = 1;
      } else if (progress < 0 && progress >= -2) {
        slideOpacity = 1;
      } else {
        slideOpacity = progress + 3;
      }

      let contrast;
      const minContrast = 50;
      const maxContrast = 100;
      if (absProgress >= 0) {
        contrast = minContrast + (1 - absProgress) * (maxContrast - minContrast);
      } else {
        contrast = minContrast;
      }

      let $targetEl;
      if (params.transformEl) {
        $targetEl = $slideEl.find(params.transformEl).css({
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        });
      } else {
        $targetEl = $slideEl;
      }

      $targetEl.css({
        opacity: slideOpacity,
        filter: `contrast(${contrast}%)`,
        transform: `translate3d(${tx}px, ${ty}px, 0px)`,
        zIndex: -Math.abs(Math.floor(progress)) + slides.length,
      });
    }
  });

  on('setTransition', (_s: any, duration: number) => {
    const { slides, $wrapperEl } = swiper;
    const { transformEl } = swiper.params.bannerEffect;
    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    $transitionElements.transition(duration);

    if (swiper.params.virtualTranslate && duration !== 0) {
      let eventTriggered = false;
      let $transitionEndTarget;
      $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
      $transitionEndTarget.transitionEnd(() => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (let i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  });
}
