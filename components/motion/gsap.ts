'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });
}

/** Bewegung ist aktiv, wenn der Head-Script die Klasse gesetzt hat (kein prefers-reduced-motion). */
export function motionEnabled() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('has-motion');
}

export function finePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, useGSAP };
