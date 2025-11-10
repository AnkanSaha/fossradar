"use client";

interface RadarChartProps {
  data: {
    label: string;
    value: number;
  }[];
  maxValue?: number;
  className?: string;
}

export function RadarChart({ data, maxValue, className = "" }: RadarChartProps) {
  // Ensure we have exactly 6 data points for hexagon
  const chartData = [...data];
  while (chartData.length < 6) {
    chartData.push({ label: "", value: 0 });
  }
  const hexagonData = chartData.slice(0, 6);

  const max = maxValue || Math.max(...hexagonData.map(d => d.value), 1);
  const center = 200;
  const radius = 150;
  const levels = 5;

  // Calculate hexagon points
  const getPoint = (index: number, scale: number = 1) => {
    const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
    const x = center + Math.cos(angle) * radius * scale;
    const y = center + Math.sin(angle) * radius * scale;
    return { x, y };
  };

  // Generate path for data
  const dataPath = hexagonData
    .map((d, i) => {
      const scale = d.value / max;
      const point = getPoint(i, scale);
      return i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`;
    })
    .join(" ") + " Z";

  // Generate background hexagon levels
  const backgroundLevels = Array.from({ length: levels }, (_, i) => {
    const scale = (i + 1) / levels;
    return hexagonData
      .map((_, index) => {
        const point = getPoint(index, scale);
        return index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`;
      })
      .join(" ") + " Z";
  });

  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ maxHeight: "400px" }}
      >
        <defs>
          {/* Gradient for data fill */}
          <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>

          {/* Gradient for data stroke */}
          <linearGradient id="radar-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Background grid levels */}
        {backgroundLevels.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2,2"
            className="text-gray-300 dark:text-gray-700"
            opacity={0.3}
          />
        ))}

        {/* Axis lines */}
        {hexagonData.map((_, i) => {
          const point = getPoint(i, 1);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-300 dark:text-gray-700"
              opacity={0.3}
            />
          );
        })}

        {/* Data area */}
        <path
          d={dataPath}
          fill="url(#radar-gradient)"
          stroke="url(#radar-stroke-gradient)"
          strokeWidth="2"
          className="transition-all duration-500"
        />

        {/* Data points */}
        {hexagonData.map((d, i) => {
          const scale = d.value / max;
          const point = getPoint(i, scale);
          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="url(#radar-stroke-gradient)"
              className="transition-all duration-500"
            />
          );
        })}

        {/* Labels */}
        {hexagonData.map((d, i) => {
          const labelPoint = getPoint(i, 1.2);
          const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
          const isTop = angle < -Math.PI * 0.75 || angle > Math.PI * 0.75;
          const isLeft = angle > Math.PI * 0.25 && angle < Math.PI * 0.75;

          let textAnchor: "start" | "middle" | "end" = "middle";
          if (!isTop) {
            textAnchor = isLeft ? "end" : "start";
          }

          return (
            <g key={i}>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor={textAnchor}
                className="text-xs font-semibold fill-gray-700 dark:fill-gray-300"
              >
                {d.label}
              </text>
              {d.value > 0 && (
                <text
                  x={labelPoint.x}
                  y={labelPoint.y + 14}
                  textAnchor={textAnchor}
                  className="text-xs font-bold fill-blue-600 dark:fill-blue-400"
                >
                  {d.value}
                </text>
              )}
            </g>
          );
        })}

        {/* Center point */}
        <circle cx={center} cy={center} r="3" className="fill-gray-400 dark:fill-gray-600" />
      </svg>
    </div>
  );
}
