'use client';

import { useRef } from 'react';
import { ArrowRule } from './ArrowRule';
import { Icon } from './Icon';
import { TLink } from '../motion/TLink';
import { gsap, useGSAP, finePointer, motionEnabled } from '../motion/gsap';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'onDark' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  arrow?: boolean;
  icon?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
  className?: string;
};

const SIZES = { sm: 11, md: 12, lg: 13 };

export function Button({ children, variant = 'primary', size = 'md', arrow, icon, href, onClick, type = 'button', fullWidth, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  const fs = SIZES[size];

  // Magnetischer Hover: der Button folgt der Maus ein kleines Stück
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !finePointer() || !motionEnabled()) return;
      const inner = el.querySelector('.btn__inner');
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      const ixTo = inner ? gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3.out' }) : null;
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        xTo(dx * 0.18);
        yTo(dy * 0.3);
        ixTo?.(dx * 0.06);
      };
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
        if (inner) gsap.to(inner, { x: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    },
    { scope: ref },
  );

  const cls = ['btn', 'btn--' + variant, size !== 'md' && 'btn--' + size, fullWidth && 'btn--full', className].filter(Boolean).join(' ');
  const label =
    typeof children === 'string' ? (
      <span className="btn__label">
        <span className="btn__label-a">{children}</span>
        <span className="btn__label-b" aria-hidden>
          {children}
        </span>
      </span>
    ) : (
      <span>{children}</span>
    );
  const content = (
    <span className="btn__inner">
      {icon && <Icon name={icon} size={fs + 5} className={'btn__icon ' + (icon === 'phone' ? 'btn__icon--phone' : 'btn__icon--default')} />}
      {label}
      {arrow && <ArrowRule width={fs * 2.2} thickness={1.5} dot={false} color="currentColor" className="btn__arrow" />}
    </span>
  );

  if (href) {
    if (href.startsWith('/')) {
      return (
        <TLink ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} onClick={onClick}>
          {content}
        </TLink>
      );
    }
    const external = href.startsWith('http');
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        onClick={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} className={cls} onClick={onClick}>
      {content}
    </button>
  );
}
