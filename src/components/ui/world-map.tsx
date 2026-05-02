'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import DottedMap from 'dotted-map';
import Image from 'next/image';

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({ dots = [], lineColor = '#CCFF00' }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Always dark — matches the site's #0A0A0A background
  const map = new DottedMap({ height: 100, grid: 'diagonal' });
  const svgMap = map.getSVG({
    radius: 0.22,
    color: 'rgba(255,255,255,0.12)',
    shape: 'circle',
    backgroundColor: '#0A0A0A',
  });

  const projectPoint = (lat: number, lng: number) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] rounded-xl relative font-sans" style={{ background: '#0A0A0A' }}>
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)',
        }}
        alt="Arabia Cab service map"
        height={495}
        width={1056}
        draggable={false}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng);
          const e = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(s, e)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.4 * i, ease: 'easeOut' }}
              />
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng);
          const e = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`points-group-${i}`}>
              {/* Start dot */}
              <circle cx={s.x} cy={s.y} r="2" fill={lineColor} />
              <circle cx={s.x} cy={s.y} r="2" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="2" to="7" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
              {/* End dot */}
              <circle cx={e.x} cy={e.y} r="2" fill={lineColor} />
              <circle cx={e.x} cy={e.y} r="2" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="2" to="7" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
