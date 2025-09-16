'use client'

import { getDepth, getTicker } from "@/app/utils/httpClient"
import { useEffect, useState } from "react"
import AskTable from "./asktable"
import BidTable from "./bidtable"

const Depth = ({ market }: { market: string }) => {
    const [bids, setBids] = useState<[string, string][]>()
    const [asks, setAsks] = useState<[string, string][]>()
    const [price, setPrice] = useState<string>()

    useEffect(() => {
        getDepth(market).then(d => {
            setBids(d.bids.reverse())
            setAsks(d.asks)
        })
        getTicker(market).then(t => setPrice(t.lastPrice))
    }, [])

    return (
        <div>
            <TableHeader />
            {asks && <AskTable asks={asks} />}
            {price && <div>{price}</div>}
            {bids && <BidTable bids={bids} />}
        </div>
    )
}

export default Depth

const TableHeader = () => {
    return (
        <div className="flex justify-between text-xs">
            <div className="text-white">Price</div>
            <div className="text-slate-500">Size</div>
            <div className="text-slate-500">Total</div>
        </div>
    )
}