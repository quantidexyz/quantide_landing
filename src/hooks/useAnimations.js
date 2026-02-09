import { useEffect, useState, useCallback } from 'react';
import {
  animate,
  createTimeline,
  stagger,
  onScroll,
  createAnimatable,
  createDrawable,
  splitText,
} from 'animejs';

// ─── useReducedMotion ────────────────────────────────────────────────
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}

// ─── useHeroReveal ───────────────────────────────────────────────────
export function useHeroReveal(refs, reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    const { h1Ref, subtitleRef, ctaRef } = refs;
    if (!h1Ref?.current || !subtitleRef?.current || !ctaRef?.current) return;

    const h1El = h1Ref.current;
    const subtitleEl = subtitleRef.current;
    const ctaEl = ctaRef.current;

    // Split the H1 text into words with hidden overflow wrappers
    const splitter = splitText(h1El, {
      words: { wrap: 'hidden' },
    });

    // Hide words at their start position before revealing the h1
    splitter.words.forEach((w) => { w.style.transform = 'translateY(110%)'; });
    h1El.style.opacity = '1';

    const tl = createTimeline({
      defaults: { ease: 'outExpo' },
    });

    // H1 words (lines) slide up one by one
    tl.add(splitter.words, {
      translateY: ['110%', '0%'],
      delay: stagger(250),
      duration: 1400,
    }, 300);

    // Subtitle fades up
    tl.add(subtitleEl, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 900,
      ease: 'outQuart',
    }, '-=600');

    // CTA buttons stagger in
    const ctaButtons = ctaEl.children;
    tl.add(ctaButtons, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(120),
      duration: 700,
      ease: 'outQuart',
    }, '-=400');

    return () => {
      tl.revert();
      splitter.revert();
    };
  }, [refs, reducedMotion]);
}

// ─── useScrollReveal ─────────────────────────────────────────────────
export function useScrollReveal(ref, options = {}, reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    const el = ref?.current;
    if (!el) return;

    const {
      y = 40,
      duration = 800,
      ease = 'outQuart',
      enter = 'bottom-=100 top',
      delay = 0,
    } = options;

    const anim = animate(el, {
      translateY: [y, 0],
      opacity: [0, 1],
      duration,
      delay,
      ease,
      autoplay: onScroll({
        target: el,
        enter,
        repeat: false,
      }),
      onComplete: () => {
        el.style.willChange = 'auto';
      },
    });

    return () => {
      anim.revert();
    };
  }, [ref, reducedMotion]);
}

// ─── useStaggeredReveal ──────────────────────────────────────────────
export function useStaggeredReveal(containerRef, childSelector, options = {}, reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef?.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    const {
      y = 60,
      duration = 900,
      ease = 'outQuart',
      staggerDelay = 100,
      enter = 'bottom-=100 top',
      scale: scaleFrom = 0.97,
    } = options;

    // Set initial state on children
    children.forEach((child) => {
      child.style.opacity = '0';
      child.style.willChange = 'transform, opacity';
    });

    const anim = animate(children, {
      translateY: [y, 0],
      opacity: [0, 1],
      scale: [scaleFrom, 1],
      duration,
      delay: stagger(staggerDelay),
      ease,
      autoplay: onScroll({
        target: container,
        enter,
        repeat: false,
      }),
      onComplete: () => {
        children.forEach((child) => {
          child.style.willChange = 'auto';
        });
      },
    });

    return () => {
      anim.revert();
      children.forEach((child) => {
        child.style.opacity = '';
        child.style.willChange = '';
      });
    };
  }, [containerRef, childSelector, reducedMotion]);
}

// ─── useTextReveal ───────────────────────────────────────────────────
export function useTextReveal(ref, options = {}, reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    const el = ref?.current;
    if (!el) return;

    const {
      splitBy = 'words',
      staggerDelay = 50,
      duration = 1000,
      ease = 'outExpo',
      enter = 'bottom-=100 top',
    } = options;

    const splitParams = {};
    splitParams[splitBy] = { wrap: 'hidden' };

    const splitter = splitText(el, splitParams);
    const targets = splitter[splitBy];

    if (!targets || !targets.length) return;

    const anim = animate(targets, {
      translateY: ['110%', '0%'],
      delay: stagger(staggerDelay),
      duration,
      ease,
      autoplay: onScroll({
        target: el,
        enter,
        repeat: false,
      }),
    });

    return () => {
      anim.revert();
      splitter.revert();
    };
  }, [ref, reducedMotion]);
}

// ─── useParallax ─────────────────────────────────────────────────────
export function useParallax(ref, speed = 0.15, reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    const el = ref?.current;
    if (!el) return;

    const distance = speed * 100;

    const anim = animate(el, {
      translateY: [-distance, distance],
      ease: 'linear',
      autoplay: onScroll({
        target: el,
        sync: true,
      }),
    });

    return () => {
      anim.revert();
    };
  }, [ref, speed, reducedMotion]);
}

// ─── useMagneticButton ───────────────────────────────────────────────
export function useMagneticButton(ref, strength = 0.3, reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    const el = ref?.current;
    if (!el) return;

    // Disable on touch devices
    if ('ontouchstart' in window) return;

    const animatable = createAnimatable(el, {
      translateX: { duration: 400, ease: 'outQuart' },
      translateY: { duration: 400, ease: 'outQuart' },
    });

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      animatable.translateX(dx * strength);
      animatable.translateY(dy * strength);
    };

    const handleMouseLeave = () => {
      animatable.translateX(0);
      animatable.translateY(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      animatable.revert();
    };
  }, [ref, strength, reducedMotion]);
}

// ─── useCountUp ──────────────────────────────────────────────────────
export function useCountUp(ref, targetValue, reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    const el = ref?.current;
    if (!el) return;

    const obj = { value: 0 };

    const anim = animate(obj, {
      value: [0, targetValue],
      duration: 1500,
      ease: 'outQuart',
      autoplay: onScroll({
        target: el,
        enter: 'bottom-=100 top',
        repeat: false,
      }),
      onRender: () => {
        el.textContent = Math.round(obj.value);
      },
    });

    return () => {
      anim.revert();
    };
  }, [ref, targetValue, reducedMotion]);
}

// ─── useSvgDraw ──────────────────────────────────────────────────────
export function useSvgDraw(ref, reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    const el = ref?.current;
    if (!el) return;

    // Find the SVG path(s) inside the ref element
    const paths = el.tagName === 'path' || el.tagName === 'PATH'
      ? [el]
      : el.querySelectorAll('path');

    if (!paths.length) return;

    const drawables = createDrawable(paths);

    const anim = animate(drawables, {
      draw: ['0 0', '0 1'],
      duration: 1200,
      ease: 'outQuart',
      autoplay: onScroll({
        target: el.closest('section') || el,
        enter: 'bottom-=100 top',
        repeat: false,
      }),
    });

    return () => {
      anim.revert();
    };
  }, [ref, reducedMotion]);
}

// ─── useScrollProgress ───────────────────────────────────────────────
export function useScrollProgress(ref, reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    const el = ref?.current;
    if (!el) return;

    const anim = animate(el, {
      scaleX: [0, 1],
      ease: 'linear',
      autoplay: onScroll({
        sync: true,
      }),
    });

    return () => {
      anim.revert();
    };
  }, [ref, reducedMotion]);
}
