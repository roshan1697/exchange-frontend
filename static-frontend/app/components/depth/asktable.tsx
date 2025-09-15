
const AskTable = ({ asks }: { asks: [string, string][] }) => {
    let currentTotal = 0

    const relevantAsks = asks.slice(0, 15)
    relevantAsks.reverse()
    const askWithTotal: [string, string, number][] = []
    for (let i = relevantAsks.length - 1; i >= 0; i--) {
        const [price, quantity] = relevantAsks[i]
        askWithTotal.push([price, quantity, currentTotal += Number(quantity)])
    }
    const maxTotal = relevantAsks.reduce((acc, [_, quantity]) => acc + Number(quantity), 0)

    askWithTotal.reverse()
    return (
        <div>

            {askWithTotal.map(([price, quantity, total]) => <Asks key={price} price={price} quantity={quantity} total={total} maxTotal={maxTotal} />)}
        </div>
    )
}

export default AskTable

const Asks = ({ price, quantity, total, maxTotal }: { price: string, quantity: string, total: number, maxTotal: number }) => {
    return (
        <div
            style={{
                display: "flex",
                position: "relative",
                width: "100%",
                backgroundColor: "transparent",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${(100 * total) / maxTotal}%`,
                    height: "100%",
                    background: "rgba(228, 75, 68, 0.325)",
                    transition: "width 0.3s ease-in-out",
                }}
            ></div>
            <div className="flex justify-between text-xs w-full">
                <div>
                    {price}
                </div>
                <div>
                    {quantity}
                </div>
                <div>
                    {total?.toFixed(2)}
                </div>
            </div>
        </div>
    )
}