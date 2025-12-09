'use client'

import { useEffect, useRef } from "react"
import { ChartManager } from "../utils/chartmanager"
import { KLine } from "../utils/types"
import { getKlines } from "../utils/httpClient"

const TradeView = ({ market }: { market: string }) => {
    const chartRef = useRef<HTMLDivElement>(null)
    const chartManagerRef = useRef<ChartManager>(null)

    useEffect(() => {

        const init = async () => {
            let klinedata: KLine[] = []
            try {
                klinedata = await getKlines(market, '1h', Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000), Math.floor(new Date().getTime() / 1000))
            } catch (e) {

            }
            if(chartRef){
                if(chartManagerRef.current){
                    chartManagerRef.current.destroy()
                }
                
                const chartManager = new ChartManager(
                    chartRef.current,
                    [
                        ...klinedata.map((x)=>({
                            close: parseFloat(x.close),
                            high: parseFloat(x.high),
                            low: parseFloat(x.low),
                            open: parseFloat(x.open),
                            timestamp: new Date(x.end)
                        })).sort((x,y)=>(x.timestamp < y.timestamp ? -1 : 1)) || []
                    ],
                    {
                        background: "#0e0f14",
                        color: "white",
                    }
                )
                chartManagerRef.current = chartManager    
            }
        }
        init()
    }, [market,chartRef])


    return (
        <>
        <div
        ref={chartRef}
        style={
            {
                height:'520px',
                width:'100%',
                marginTop:4
            }
        }
        >

        </div>
        </>
    )
}

export default TradeView