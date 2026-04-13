// Spec §7.1: DistanceList — 4-key destinations preview for home page
// Spec §6.1 Section 3: Kotel row is featured/centered visually

interface Distance {
  destination: string;
  km: string;
  time: string;
  featured?: boolean;
}

interface DistanceListProps {
  distances: Distance[];
  isRTL?: boolean;
}

export default function DistanceList({ distances, isRTL = false }: DistanceListProps) {
  return (
    <div className="flex flex-col gap-0 divide-y divide-border">
      {distances.map((d, i) => (
        <div
          key={i}
          className={`
            relative flex items-center justify-between py-5 px-4 transition-colors
            ${d.featured
              ? "bg-bg-tertiary/60 border-l-2 border-accent"
              : "hover:bg-bg-secondary/40"
            }
          `}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Featured diamond ornament */}
          {d.featured && (
            <div
              className={`absolute top-3 ${isRTL ? "right-0" : "left-0"} -translate-x-1/2 w-2 h-2 bg-accent rotate-45`}
              style={isRTL ? { right: "-1px", left: "auto", transform: "translateX(50%) rotate(45deg)" } : {}}
            />
          )}

          {/* Destination label */}
          <div className="flex-1">
            <p
              className={`text-sm tracking-wide ${
                d.featured ? "text-accent font-medium" : "text-text-secondary"
              }`}
            >
              {d.destination}
            </p>
            <p className={`text-xs mt-0.5 ${d.featured ? "text-accent/70" : "text-text-tertiary"}`}>
              {d.km} km
            </p>
          </div>

          {/* Time */}
          <div className={`text-right ${isRTL ? "text-left" : "text-right"}`}>
            <p
              className={`text-lg font-light tabular-nums ${
                d.featured ? "text-accent" : "text-text-primary"
              }`}
            >
              {d.time}
            </p>
          </div>

          {/* Featured underline */}
          {d.featured && (
            <div className="absolute bottom-0 left-4 right-4 h-px bg-accent/30" />
          )}
        </div>
      ))}
    </div>
  );
}
