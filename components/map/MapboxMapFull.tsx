"use client";
// Spec §6.3: Full interactive Mapbox map for /location page
// Dark style, zoom 12, single brass pin, no attribution

import MapboxMap from "./MapboxMap";

interface MapboxMapFullProps {
  className?: string;
}

export default function MapboxMapFull({ className = "" }: MapboxMapFullProps) {
  return (
    <div className={`w-full aspect-[16/7] ${className}`}>
      <MapboxMap interactive={true} className="w-full h-full" />
    </div>
  );
}
