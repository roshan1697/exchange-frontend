'use client';

import { getDepth, getTicker, getTrades } from "@/app/utils/httpClient";
import { WSClient } from "@/app/utils/wsClient";
import { useEffect, useState } from "react";
import AskTable from "./asktable";
import BidTable from "./bidtable";


const Depth = ({ market }: { market: string }) => {
    const [bids, setBids] = useState<[string, string][]>()
    const [asks, setAsks] = useState<[string, string][]>()
    const [price, setPrice] = useState<string>()

    useEffect(() => {
        WSClient.getInstance().registerCallback('depth', (data: any) => {
            setBids((originalBids) => {
                const updatedBids = [...(originalBids || [])]

                for (let i = 0; i < updatedBids?.length; i++) {
                    for (let j = 0; j < data.bids.length; j++) {
                        if (updatedBids[i][0] === data.bids[j][0]) {
                            updatedBids[i][1] = data.bids[j][1]
                            break
                        }
                    }
                }
                return updatedBids
            })

            setAsks((originalAsks) => {
                const updatedAsks = [...(originalAsks || [])]

                for (let i = 0; i < updatedAsks.length; i++) {
                    for (let j = 0; i < data.asks.length; j++) {
                        if (updatedAsks[i][0] === data.asks[j][0]) {
                            updatedAsks[i][1] = data.asks[j][1]
                            break
                        }
                    }
                }

                return updatedAsks
            })


            // setBids((originalBids) => {
            //     const current = [...(originalBids ?? [])];

            //     // Index data.bids by price for O(1) lookups
            //     const qtyByPrice = new Map(
            //         (data?.bids ?? []).map(([price, qty]) => [price, qty])
            //     );

            //     // Copy and update quantities where price matches
            //     const bidsAfterUpdate = current.map(([price, qty]) => {
            //         const newQty = qtyByPrice.get(price);
            //         return newQty !== undefined ? [price, newQty] : [price, qty];
            //     });

            //     return bidsAfterUpdate;
            // });





















        }, `DEPTH-${market}`)

        WSClient.getInstance().sendMessage({'method':'SUBSCRIBE','params':[`depth.${market}`]})
        getDepth(market).then(d=>{
            setBids(d.bids.reverse())
            setAsks(d.asks)
        })
        getTicker(market).then(d=>setPrice(d.lastPrice))
        getTrades(market).then(d=>setPrice(d[0].price))
        return () => {
            WSClient.getInstance().sendMessage({'method':'UNSUBSCRIBE','params':[`depth.200ms.${market}`]})
            WSClient.getInstance().deregisterCallback('depth', `DEPTH-${market}`)
        }
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

const TableHeader = ()=> {
    return <div className="flex justify-between text-xs">
    <div className="text-white">Price</div>
    <div className="text-slate-500">Size</div>
    <div className="text-slate-500">Total</div>
</div>
}