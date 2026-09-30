'use client';

import { useEffect } from 'react';

/**
 * Custom hook to lock body scrolling and pause Lenis smooth scroll
 * whenever a modal, slide-over drawer, or overlay is open.
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    // 1. Pause Lenis smooth scroll instance
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.stop();
    }

    // 2. Lock body scroll and compensate for scrollbar shift
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;

      // Resume Lenis smooth scroll instance
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isLocked]);
}
