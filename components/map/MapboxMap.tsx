"use client";
// Spec §7.1: MapboxMap — dark style, brass pin, static preview or interactive
// Spec §6.3: Centered on Beit Meir (lat: 31.7898, lng: 35.0356), zoom 12

import { useEffect, useRef } from "react";

interface MapboxMapProps {
  interactive?: boolean;
  className?: string;
}

const BEIT_MEIR_LNG = 35.0356;
const BEIT_MEIR_LAT = 31.7898;

export default function MapboxMap({ interactive = false, className = "" }: MapboxMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !mapRef.current) return;

    let mapInstance: { remove: () => void } | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import("mapbox-gl").then((mapboxgl: any) => {
      const mapboxModule = mapboxgl.default || mapboxgl;
      mapboxModule.accessToken = token;

      const map = new mapboxModule.Map({
        container: mapRef.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [BEIT_MEIR_LNG, BEIT_MEIR_LAT],
        zoom: interactive ? 12 : 11,
        interactive,
        attributionControl: false,
      });

      mapInstance = map;

      map.on("load", () => {
        // Brass-colored pulsing marker
        const el = document.createElement("div");
        el.style.cssText = `
          position: relative;
          width: 16px;
          height: 16px;
          background: #B8924A;
          border: 2px solid #D1A85C;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(184,146,74,0.25), 0 0 12px rgba(184,146,74,0.4);
          cursor: pointer;
        `;

        // Add pulse keyframe if not already present
        if (!document.getElementById("mapbox-pulse-style")) {
          const style = document.createElement("style");
          style.id = "mapbox-pulse-style";
          style.textContent = `
            @keyframes mapboxPulse {
              0% { transform: scale(1); opacity: 0.8; }
              100% { transform: scale(2.5); opacity: 0; }
            }
            .mapbox-pulse-ring {
              position: absolute;
              top: -8px;
              left: -8px;
              width: 32px;
              height: 32px;
              border: 1px solid rgba(184,146,74,0.5);
              border-radius: 50%;
              animation: mapboxPulse 2s ease-out infinite;
            }
          `;
          document.head.appendChild(style);
        }

        const pulse = document.createElement("div");
        pulse.className = "mapbox-pulse-ring";
        el.appendChild(pulse);

        new mapboxModule.Marker(el)
          .setLngLat([BEIT_MEIR_LNG, BEIT_MEIR_LAT])
          .addTo(map);
      });
    });

    return () => {
      if (mapInstance) mapInstance.remove();
    };
  }, [token, interactive]);

  // Graceful fallback when no Mapbox token
  if (!token) {
    return (
      <div
        className={`relative w-full h-full rounded-sm overflow-hidden border border-border ${className}`}
        style={{
          background: "linear-gradient(135deg, #1A1815 0%, #252220 50%, #2D3320 100%)",
        }}
      >
        {/* Topographic contour lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 800 500"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {[500, 400, 300, 200, 120, 60].map((r, i) => (
            <ellipse
              key={i}
              cx="400"
              cy="250"
              rx={r}
              ry={r * 0.45}
              stroke="#B8924A"
              strokeWidth="0.6"
            />
          ))}
          <path d="M0 200 Q200 180 400 250 Q600 320 800 280" stroke="#6B5D4A" strokeWidth="2" />
          <path d="M400 0 Q390 125 400 250 Q410 375 400 500" stroke="#6B5D4A" strokeWidth="1.5" />
        </svg>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute w-full border-t border-text-tertiary" style={{ top: `${(i + 1) * 12.5}%` }} />
          ))}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute h-full border-l border-text-tertiary" style={{ left: `${(i + 1) * 10}%` }} />
          ))}
        </div>
        {/* Brass pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-accent border-2 border-accent-hover shadow-[0_0_0_4px_rgba(184,146,74,0.25),0_0_12px_rgba(184,146,74,0.4)]" />
            <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full border border-accent/40 animate-ping" />
          </div>
        </div>
        {/* Labels */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <p className="text-accent text-xs font-medium tracking-widest uppercase">בית מאיר</p>
          <p className="text-text-tertiary text-[10px] tracking-wider mt-0.5">31.7898°N 35.0356°E</p>
        </div>
        <div className="absolute top-3 right-3 text-[9px] text-text-tertiary/40 tracking-wide uppercase">
          Mapbox token required
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`w-full h-full rounded-sm overflow-hidden ${className}`}
    />
  );
}
