interface CryptoIconProps {
    symbol: string
}

const iconColors: Record<string, { bg: string; text: string }> = {
    STABLE: { bg: "bg-cyan-500", text: "text-white" },
    MON: { bg: "bg-purple-500", text: "text-white" },
    ZRO: { bg: "bg-violet-600", text: "text-white" },
    PAXG: { bg: "bg-yellow-500", text: "text-black" },
    MET: { bg: "bg-rose-500", text: "text-white" },
    WIF: { bg: "bg-amber-600", text: "text-white" },
    XPL: { bg: "bg-teal-500", text: "text-white" },
    ADA: { bg: "bg-blue-500", text: "text-white" },
    PENGU: { bg: "bg-pink-400", text: "text-white" },
    AVAX: { bg: "bg-red-500", text: "text-white" },
    BTC: { bg: "bg-orange-500", text: "text-white" },
    ETH: { bg: "bg-indigo-400", text: "text-white" },
    BNB: { bg: "bg-yellow-400", text: "text-black" },
    SOL: { bg: "bg-gradient-to-br from-purple-500 to-teal-400", text: "text-white" },
}

export function CryptoIcon({ symbol }: CryptoIconProps) {
    const colors = iconColors[symbol] || { bg: "bg-gray-500", text: "text-white" }

    return (
        <div
            className={`w-6 h-6 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs font-bold`}
        >
            {symbol.charAt(0)}
        </div>
    )
}
