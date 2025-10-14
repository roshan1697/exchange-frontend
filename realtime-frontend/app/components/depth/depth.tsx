'use client';

import { WSClient } from "@/app/utils/wsClient";
import { useEffect, useState } from "react";


const Depth = ({ market }: { market: string }) => {
    const [bids, setBids] = useState<[string, string][]>()
    const [asks, setAsks] = useState<[string, string][]>()
    const [price, setPrice] = useState<string>()

    useEffect(()=>{
        WSClient.getInstance().registerCallback('depth',()=>{
            
        },`DEPTH-${market}`)
    },[])
    return (
        <div>Depth</div>
    )
}

export default Depth