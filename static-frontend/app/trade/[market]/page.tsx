'use client'

import { useParams } from "next/navigation"

const Page = () => {
    const {market} = useParams()
    return (
        <div>{market}</div>
)
}

export default Page