'use client'
import { useEffect, useRef } from 'react'
import { ChartManager } from '../utils/ChartManager'
import { Klines } from '../utils/types'
import { getKlines } from '../utils/httpClient'
import { timeStamp } from 'console'

const TradeView = ({ market }: { market: string }) => {
    const chartRef = useRef<HTMLDivElement>(null)
    const chartManagerRef = useRef<ChartManager>(null)

    const init = async () => {
        let klineData: Klines[] = []
        try {
            klineData = await getKlines(market, '1h', Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000), Math.floor(new Date().getTime() / 1000))
        } catch (e) { }
        if (chartRef) {
            if (chartManagerRef.current) {
                chartManagerRef.current.destroy()
            }
            const chartManager = new ChartManager(
                chartRef.current,
                [
                    ...klineData.map((x) => ({
                        close: parseFloat(x.close),
                        high: parseFloat(x.high),
                        low: parseFloat(x.low),
                        open: parseFloat(x.open),
                        timestamp: new Date(x.end)
                    }))
                ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
                {
                    bacground: '#0e0f14',
                    color: 'white'
                }
            )
            chartManagerRef.current = chartManager
        }

    }
    useEffect(() => {
        init()
    }, [market, chartRef])

    return (
        <>
            <div ref={chartRef} style={{ height: "520px", width: "100%", marginTop: 4 }}></div>
        </>
    )
}

export default TradeView