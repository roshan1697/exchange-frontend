import { CryptoIcon } from "./crypto-icon"

const newListings = [
    { symbol: "STABLE", pair: "PERP", price: "$0.016628", change: "+1.27%", positive: true },
    { symbol: "MON", pair: "PERP", price: "$0.026636", change: "-0.59%", positive: false },
    { symbol: "ZRO", pair: "PERP", price: "$1.47", change: "+6.56%", positive: true },
    { symbol: "PAXG", pair: "PERP", price: "$4,211.21", change: "+0.51%", positive: true },
    { symbol: "MET", pair: "PERP", price: "$0.3269", change: "+1.90%", positive: true },
]

const topMovers = [
    { symbol: "WIF", pair: "PERP", price: "$0.4262", change: "+11.89%", positive: true },
    { symbol: "XPL", pair: "PERP", price: "$0.1745", change: "+8.86%", positive: true },
    { symbol: "ADA", pair: "PERP", price: "$0.4617", change: "+8.23%", positive: true },
    { symbol: "PENGU", pair: "PERP", price: "$0.012405", change: "+7.82%", positive: true },
    { symbol: "AVAX", pair: "PERP", price: "$14.59", change: "+7.02%", positive: true },
]

const popular = [
    { symbol: "BTC", pair: "PERP", price: "$92,572.80", change: "+2.62%", positive: true },
    { symbol: "ETH", pair: "PERP", price: "$3,319.86", change: "+6.58%", positive: true },
    { symbol: "BNB", pair: "PERP", price: "$892.25", change: "+0.44%", positive: true },
    { symbol: "SOL", pair: "PERP", price: "$138.85", change: "+4.70%", positive: true },
    { symbol: "MON", pair: "PERP", price: "$0.026636", change: "-0.59%", positive: false },
]

interface MarketTableProps {
    title: string
    data: typeof newListings
}

function MarketTable({ title, data }: MarketTableProps) {
    return (
        <div className="flex-1 min-w-[300px]  bg-[#0f0f0f] p-2 rounded-2xl">
            <div className="flex items-center justify-between mb-4 px-4">
                <h3 className="text-white font-medium p-2">{title}</h3>
                <span className="text-gray-500 text-sm">24h Change</span>
            </div>
            <div className="space-y-1">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3 hover:bg-[#1a1a1a] rounded-lg transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <CryptoIcon symbol={item.symbol} />
                            <span className="text-white font-medium">
                                {item.symbol}
                                <span className="text-gray-500">-{item.pair}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-8">
                            <span className="text-white font-mono">{item.price}</span>
                            <span className={`font-mono w-20 text-right ${item.positive ? "text-emerald-400" : "text-red-400"}`}>
                                {item.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function MarketTables() {
    return (
        <div className="mx-6 mb-6">
            <div className="flex gap-2 divide-x divide-[#2a2a2a]   py-4">
                <MarketTable title="New" data={newListings} />
                <MarketTable title="Top Movers" data={topMovers} />
                <MarketTable title="Popular" data={popular} />
            </div>
        </div>
    )
}
