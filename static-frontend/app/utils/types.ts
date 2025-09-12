export interface Ticker {
    firstPrice:string;
    high:string;
    lastPrice:string;
    low:string;
    priceChange:string;
    priceChangePercent:string;
    quoteVolume:string;
    symbol:string;
    trades:string;
    volume:string;
}

export interface Depth {
    asks:[string, string][];
    bids:[string,string][];
    lastUpdateId:string;
    timestamp:number;

}

export interface Klines {
    close:string;
    end:string;
    high:string;
    low:string;
    open:string;
    quoteVolume:string;
    start:string;
    trades:string;
    volume:string;
}

export interface Trades {
    id:number;
    isBuyerMaker:boolean;
    price:string;
    quantity:string;
    quoteQuantity:string;
    timestamp:number;
}