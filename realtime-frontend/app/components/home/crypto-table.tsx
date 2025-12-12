"use client"

import { useState, useMemo } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { MiniChart } from "./mini-chart"

type SortDirection = "asc" | "desc" | null
type SortableColumn = "name" | "price" | "volume" | "metric" | "change"

interface CryptoData {
    id: string
    name: string
    symbol: string
    icon: string
    price: number
    volume: number
    metric: number
    metricLabel: string
    change: number
    chartData: number[]
}

const spotData: CryptoData[] = [
    {
        id: "1",
        name: "Solana",
        symbol: "SOL/USD",
        icon: "🟣",
        price: 136.92,
        volume: 27.7,
        metric: 76.9,
        metricLabel: "B",
        change: 5.39,
        chartData: [100, 102, 98, 103, 105, 104, 108, 110, 107, 109, 112, 115, 118, 120, 117, 119],
    },
    {
        id: "2",
        name: "Ethereum",
        symbol: "ETH/USD",
        icon: "💎",
        price: 3242.53,
        volume: 9.7,
        metric: 391.3,
        metricLabel: "B",
        change: 1.62,
        chartData: [100, 98, 99, 101, 103, 106, 109, 112, 115, 118, 120, 119, 121, 123, 120, 122],
    },
    {
        id: "3",
        name: "Bitcoin",
        symbol: "BTC/USD",
        icon: "🟠",
        price: 92221.6,
        volume: 6.2,
        metric: 1.8,
        metricLabel: "T",
        change: 2.28,
        chartData: [100, 101, 103, 105, 107, 109, 112, 114, 116, 118, 120, 122, 119, 121, 123, 125],
    },
    {
        id: "4",
        name: "USDT",
        symbol: "USDT/USD",
        icon: "🟢",
        price: 1.0002,
        volume: 2.5,
        metric: 186.1,
        metricLabel: "B",
        change: -0.02,
        chartData: [100, 100, 99, 100, 100, 101, 100, 100, 99, 100, 101, 102, 101, 100, 100, 100],
    },
    {
        id: "5",
        name: "BNB",
        symbol: "BNB/USD",
        icon: "🟡",
        price: 889.9,
        volume: 1.3,
        metric: 122.5,
        metricLabel: "B",
        change: 2.5,
        chartData: [100, 102, 103, 101, 99, 97, 95, 93, 91, 89, 88, 90, 92, 91, 89, 88],
    },
    {
        id: "6",
        name: "Sui",
        symbol: "SUI/USD",
        icon: "🔵",
        price: 1.627,
        volume: 871,
        metric: 6,
        metricLabel: "B",
        change: 4.97,
        chartData: [100, 103, 105, 108, 110, 113, 115, 118, 120, 122, 124, 126, 128, 125, 127, 129],
    },
    {
        id: "7",
        name: "Hyperliquid",
        symbol: "HYPE/USD",
        icon: "🔷",
        price: 29.384,
        volume: 532.8,
        metric: 12.6,
        metricLabel: "B",
        change: 3.21,
        chartData: [100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 85, 87, 86, 84, 83, 82],
    },
    {
        id: "8",
        name: "Stable",
        symbol: "STABLE/USD",
        icon: "⚪",
        price: 0.013999,
        volume: 386,
        metric: 0,
        metricLabel: "",
        change: -22.72,
        chartData: [100, 95, 90, 85, 80, 75, 70, 68, 66, 64, 62, 60, 58, 56, 54, 52],
    },
]

const futuresData: CryptoData[] = [
    {
        id: "1",
        name: "BTC",
        symbol: "PERP",
        icon: "🟠",
        price: 92169.4,
        volume: 386.3,
        metric: 98.8,
        metricLabel: "M",
        change: 2.25,
        chartData: [100, 102, 105, 107, 110, 113, 115, 118, 120, 122, 125, 127, 130, 128, 131, 133],
    },
    {
        id: "2",
        name: "ETH",
        symbol: "PERP",
        icon: "💎",
        price: 3242.68,
        volume: 217.9,
        metric: 32.8,
        metricLabel: "M",
        change: 1.6,
        chartData: [100, 98, 99, 101, 104, 107, 110, 113, 116, 119, 122, 125, 128, 130, 128, 130],
    },
    {
        id: "3",
        name: "SOL",
        symbol: "PERP",
        icon: "🟣",
        price: 136.9,
        volume: 102.7,
        metric: 32.6,
        metricLabel: "M",
        change: 5.38,
        chartData: [100, 98, 96, 94, 96, 98, 100, 102, 104, 106, 104, 102, 100, 98, 96, 94],
    },
    {
        id: "4",
        name: "HYPE",
        symbol: "PERP",
        icon: "🔷",
        price: 29.383,
        volume: 37.2,
        metric: 6.4,
        metricLabel: "M",
        change: 3.17,
        chartData: [100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70],
    },
    {
        id: "5",
        name: "BNB",
        symbol: "PERP",
        icon: "🟡",
        price: 889.46,
        volume: 198.3,
        metric: 3.1,
        metricLabel: "M",
        change: 2.43,
        chartData: [100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 84, 86, 88, 90, 88, 86],
    },
    {
        id: "6",
        name: "PAXG",
        symbol: "PERP",
        icon: "🟨",
        price: 4278.48,
        volume: 31.2,
        metric: 2.4,
        metricLabel: "M",
        change: 1.37,
        chartData: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115],
    },
    {
        id: "7",
        name: "ASTER",
        symbol: "PERP",
        icon: "🔶",
        price: 0.9558,
        volume: 3.7,
        metric: 1.8,
        metricLabel: "M",
        change: 3.06,
        chartData: [100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70],
    },
    {
        id: "8",
        name: "ZEC",
        symbol: "PERP",
        icon: "🟧",
        price: 457.78,
        volume: 12.4,
        metric: 1.1,
        metricLabel: "M",
        change: 12.67,
        chartData: [100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130],
    },
    {
        id: "9",
        name: "ENA",
        symbol: "PERP",
        icon: "⚫",
        price: 0.2631,
        volume: 1.3,
        metric: 1.1,
        metricLabel: "M",
        change: 5.58,
        chartData: [100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70],
    },
]

const lendData: CryptoData[] = [
    {
        id: "1",
        name: "USDC",
        symbol: "Lend",
        icon: "🔵",
        price: 1.0001,
        volume: 145.2,
        metric: 4.5,
        metricLabel: "%",
        change: 0.01,
        chartData: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    },
    {
        id: "2",
        name: "USDT",
        symbol: "Lend",
        icon: "🟢",
        price: 1.0002,
        volume: 98.3,
        metric: 4.2,
        metricLabel: "%",
        change: -0.01,
        chartData: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    },
    {
        id: "3",
        name: "DAI",
        symbol: "Lend",
        icon: "🟡",
        price: 0.9999,
        volume: 67.5,
        metric: 3.8,
        metricLabel: "%",
        change: 0.02,
        chartData: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    },
]


export default function Table() {
    const [activeTab, setActiveTab] = useState<"spot" | "futures" | "lend">("spot")

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8 mx-6 mb-6 rounded-2xl">
            <div className="mx-auto p-2">
                {/* Tabs */}
                <div className="flex gap-8 mb-8 border-b border-zinc-800">
                    <button
                        onClick={() => setActiveTab("spot")}
                        className={`pb-4 px-2 text-lg font-medium transition-colors ${activeTab === "spot" ? "text-white border-b-2 border-white" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                    >
                        Spot
                    </button>
                    <button
                        onClick={() => setActiveTab("futures")}
                        className={`pb-4 px-2 text-lg font-medium transition-colors ${activeTab === "futures" ? "text-white border-b-2 border-white" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                    >
                        Futures
                    </button>
                    <button
                        onClick={() => setActiveTab("lend")}
                        className={`pb-4 px-2 text-lg font-medium transition-colors ${activeTab === "lend" ? "text-white border-b-2 border-white" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                    >
                        Lend
                    </button>
                </div>

                {/* Table Content */}
                <CryptoTable activeTab={activeTab} />
            </div>
        </div>
    )
}














//crypto table
function CryptoTable({ activeTab }: { activeTab: "spot" | "futures" | "lend" }) {
    const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null)
    const [sortDirection, setSortDirection] = useState<SortDirection>(null)

    const data = activeTab === "spot" ? spotData : activeTab === "futures" ? futuresData : lendData
    const metricLabel = activeTab === "spot" ? "Market Cap" : activeTab === "futures" ? "Open Interest" : "APY"

    const handleSort = (column: SortableColumn) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc")
            if (sortDirection === "desc") {
                setSortColumn(null)
            }
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedData = useMemo(() => {
        if (!sortColumn || !sortDirection) return data

        return [...data].sort((a, b) => {
            let aValue: string | number
            let bValue: string | number

            switch (sortColumn) {
                case "name":
                    aValue = a.name.toLowerCase()
                    bValue = b.name.toLowerCase()
                    break
                case "price":
                    aValue = a.price
                    bValue = b.price
                    break
                case "volume":
                    aValue = a.volume
                    bValue = b.volume
                    break
                case "metric":
                    aValue = a.metric
                    bValue = b.metric
                    break
                case "change":
                    aValue = a.change
                    bValue = b.change
                    break
                default:
                    return 0
            }

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
            }

            return sortDirection === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
        })
    }, [data, sortColumn, sortDirection])

    const formatPrice = (price: number) => {
        if (price >= 1000)
            return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        if (price >= 1) return `$${price.toFixed(2)}`
        if (price >= 0.01) return `$${price.toFixed(4)}`
        return `$${price.toFixed(6)}`
    }

    const formatVolume = (volume: number, unit?: string) => {
        if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}B`
        if (volume >= 1) return `$${volume.toFixed(1)}M`
        return `$${(volume * 1000).toFixed(0)}K`
    }

    const formatMetric = (metric: number, label: string) => {
        if (label === "%") return `${metric.toFixed(1)}%`
        if (label === "T") return `$${metric.toFixed(1)}T`
        if (label === "B") return `$${metric.toFixed(1)}B`
        if (label === "M") return `$${metric.toFixed(1)}M`
        if (metric === 0) return "-"
        return `$${metric.toFixed(1)}${label}`
    }

    const SortIcon = ({ column }: { column: SortableColumn }) => {
        if (sortColumn !== column) {
            return <ArrowDown className="w-4 h-4 text-zinc-600" />
        }
        return sortDirection === "asc" ? (
            <ArrowUp className="w-4 h-4 text-zinc-400" />
        ) : (
            <ArrowDown className="w-4 h-4 text-zinc-400" />
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-zinc-500 text-sm border-b border-zinc-800">
                        <th className="text-left py-4 px-4 font-medium">
                            <button
                                onClick={() => handleSort("name")}
                                className="flex items-center gap-2 hover:text-zinc-300 transition-colors"
                            >
                                Name
                            </button>
                        </th>
                        <th className="text-right py-4 px-4 font-medium">
                            <button
                                onClick={() => handleSort("price")}
                                className="flex items-center gap-2 ml-auto hover:text-zinc-300 transition-colors"
                            >
                                Price
                            </button>
                        </th>
                        <th className="text-right py-4 px-4 font-medium">
                            <button
                                onClick={() => handleSort("volume")}
                                className="flex items-center gap-2 ml-auto hover:text-zinc-300 transition-colors"
                            >
                                <SortIcon column="volume" />
                                24h Volume
                            </button>
                        </th>
                        <th className="text-right py-4 px-4 font-medium">
                            <button
                                onClick={() => handleSort("metric")}
                                className="flex items-center gap-2 ml-auto hover:text-zinc-300 transition-colors"
                            >
                                {metricLabel}
                            </button>
                        </th>
                        <th className="text-right py-4 px-4 font-medium">
                            <button
                                onClick={() => handleSort("change")}
                                className="flex items-center gap-2 ml-auto hover:text-zinc-300 transition-colors"
                            >
                                24h Change
                            </button>
                        </th>
                        <th className="text-right py-4 px-4 font-medium">Last 7 Days</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((crypto) => (
                        <tr key={crypto.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">{crypto.icon}</div>
                                    <div>
                                        <div className="font-medium text-white">{crypto.name}</div>
                                        <div className="text-sm text-zinc-500">{crypto.symbol}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="text-right py-4 px-4 text-white font-medium">{formatPrice(crypto.price)}</td>
                            <td className="text-right py-4 px-4 text-white">{formatVolume(crypto.volume)}</td>
                            <td className="text-right py-4 px-4 text-white">{formatMetric(crypto.metric, crypto.metricLabel)}</td>
                            <td className="text-right py-4 px-4">
                                <span className={crypto.change >= 0 ? "text-green-500" : "text-red-500"}>
                                    {crypto.change >= 0 ? "+" : ""}
                                    {crypto.change.toFixed(2)}%
                                </span>
                            </td>
                            <td className="py-4 px-4">
                                <MiniChart data={crypto.chartData} isPositive={crypto.change >= 0} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

