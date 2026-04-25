import { useEffect, useMemo, useRef, useState } from 'react';
import './ScrollFloat.css';

const getInitialPerformanceMode = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};


const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);
  const [isPerformanceMode, setIsPerformanceMode] = useState(getInitialPerformanceMode);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="scroll-float-char" key={`${char}-${index}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePerformanceMode = () => {
      setIsPerformanceMode(coarsePointer.matches || reducedMotion.matches);
    };

    updatePerformanceMode();
    coarsePointer.addEventListener('change', updatePerformanceMode);
    reducedMotion.addEventListener('change', updatePerformanceMode);

    return () => {
      coarsePointer.removeEventListener('change', updatePerformanceMode);
      reducedMotion.removeEventListener('change', updatePerformanceMode);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const charElements = el.querySelectorAll('.scroll-float-char');

    if (isPerformanceMode) {
      charElements.forEach(char => {
        char.style.opacity = '1';
        char.style.transform = 'none';
        char.style.willChange = 'auto';
      });
      return undefined;
    }

    let tween;
    let cancelled = false;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([gsapModule, scrollTriggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      tween = gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%'
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true
          }
        }
      );
    });

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, isPerformanceMode]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
