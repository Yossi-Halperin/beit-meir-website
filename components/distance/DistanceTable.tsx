// Spec §7.1 & §6.3: DistanceTable — full 8-destination table for /location page

interface Distance {
  destination: string;
  km: string;
  time: string;
  featured?: boolean;
}

interface DistanceTableProps {
  distances: Distance[];
  isRTL?: boolean;
  headingKm?: string;
  headingTime?: string;
  headingDestination?: string;
}

export default function DistanceTable({
  distances,
  isRTL = false,
  headingKm = "Distance",
  headingTime = "Drive Time",
  headingDestination = "Destination",
}: DistanceTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-border" dir={isRTL ? "rtl" : "ltr"}>
      {/* Table header */}
      <div className="grid grid-cols-3 bg-bg-tertiary border-b border-border-strong px-6 py-3">
        <span className="text-overline text-text-tertiary">{headingDestination}</span>
        <span className="text-overline text-text-tertiary text-center">{headingKm}</span>
        <span className="text-overline text-text-tertiary text-right">{headingTime}</span>
      </div>

      {/* Table rows */}
      <div className="divide-y divide-border">
        {distances.map((d, i) => (
          <div
            key={i}
            className={`
              grid grid-cols-3 px-6 py-4 items-center transition-colors
              ${d.featured
                ? "bg-bg-tertiary/80 relative"
                : "hover:bg-bg-secondary/30"
              }
            `}
          >
            {/* Featured left accent bar */}
            {d.featured && (
              <div className={`absolute top-0 bottom-0 ${isRTL ? "right-0" : "left-0"} w-0.5 bg-accent`} />
            )}

            {/* Destination */}
            <div className="flex items-center gap-3">
              {d.featured && (
                <div className="w-1.5 h-1.5 bg-accent rotate-45 flex-shrink-0" />
              )}
              <span
                className={`text-sm ${
                  d.featured
                    ? "text-accent font-medium"
                    : "text-text-primary"
                }`}
              >
                {d.destination}
              </span>
            </div>

            {/* KM */}
            <div className="text-center">
              <span
                className={`text-sm tabular-nums ${
                  d.featured ? "text-accent" : "text-text-secondary"
                }`}
              >
                {d.km} km
              </span>
            </div>

            {/* Time */}
            <div className="text-right">
              <span
                className={`text-sm tabular-nums font-medium ${
                  d.featured ? "text-accent" : "text-text-primary"
                }`}
              >
                {d.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
