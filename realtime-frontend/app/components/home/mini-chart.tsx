"use client"

export function MiniChart({ data, isPositive }: { data: number[]; isPositive: boolean }) {
    const width = 120
    const height = 40
    const padding = 4

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    const points = data
        .map((value, index) => {
            const x = (index / (data.length - 1)) * (width - padding * 2) + padding
            const y = height - padding - ((value - min) / range) * (height - padding * 2)
            return `${x},${y}`
        })
        .join(" ")

    return (
        <div className="flex justify-end">
            <svg width={width} height={height} className="overflow-visible">
                <polyline
                    points={points}
                    fill="none"
                    stroke={isPositive ? "#22c55e" : "#ef4444"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}
