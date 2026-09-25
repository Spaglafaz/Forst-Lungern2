'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { useSite } from './MotionShell';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };

/** Interner Link mit Seitenübergang (Vorhang). Modifier-Klicks öffnen normal. */
export const TLink = forwardRef<HTMLAnchorElement, Props>(function TLink({ href, onClick, target, ...rest }, ref) {
  const { navigate } = useSite();
  return (
    <Link
      ref={ref}
      href={href}
      target={target}
      scroll={false}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || target || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
});
