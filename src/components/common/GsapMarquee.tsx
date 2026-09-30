'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function GsapMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous smooth GSAP ticker loop
      const tween = gsap.to(textRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 35,
        ease: "none",
      });

      // Interactive mouse speed-up interaction
      const handleMouseMove = (e: MouseEvent) => {
        const windowWidth = window.innerWidth;
        const norm = (e.clientX / windowWidth - 0.5) * 2; // -1 to 1
        gsap.to(tween, {
          timeScale: 1 + Math.abs(norm) * 1.5,
          duration: 0.5,
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(tween, {
          timeScale: 1,
          duration: 1,
          overwrite: "auto",
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const marqueeItems = [
    "CHANGI VIP FAST-TRACK",
    "RAFFLES HOTEL PALM COURT SUITES",
    "3-STAR MICHELIN ODETTE BUYOUTS",
    "MARINA BAY SKYPARK PRIVILEGES",
    "SOUTHERN ISLANDS PRIVATE CATAMARAN",
    "CAPELLA SENTOSA CLIFTOPS",
    "PERANAKAN ROYAL HEIRLOOM FEASTS",
    "SINGAPORE TOURISM BOARD TA#03829",
    "TRANSPARENT SGD PRICING",
    "BESPOKE 24/7 CONCIERGE"
  ];

  return (
    <div
      ref={marqueeRef}
      className="relative overflow-hidden py-4 bg-primary text-luxury border-y border-luxury/20 select-none"
    >
      <div
        ref={textRef}
        className="flex whitespace-nowrap will-change-transform font-mono text-[11px] uppercase tracking-[0.3em] font-medium"
      >
        <div className="flex items-center gap-8 shrink-0 px-4">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <span key={idx} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
