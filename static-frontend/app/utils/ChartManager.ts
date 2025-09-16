import { CandlestickSeries, ColorType, createChart, CrosshairMode, ISeriesApi, UTCTimestamp } from "lightweight-charts";

export class ChartManager {
    private chart
    private lastUpdateTime:number = 0
    private currentBar:{
        open: number | null;
        high:number | null;
        low:number|null;
        close:number|null;
    } = {
        open: null,
        high:null,
        low:null,
        close:null
    }
    private candleSeries:ISeriesApi<'Candlestick'>

    constructor(
        ref:any,
        initialData:any[],
        layout:{bacground:string,color:string}
    ){
        const chart = createChart(ref,{
            autoSize:true,
            overlayPriceScales:{
                ticksVisible:true,
                borderVisible:true,
            },
            crosshair:{
                mode: CrosshairMode.Normal,
            },
            rightPriceScale: {
                visible:true,
                ticksVisible:true,
                entireTextOnly:true,

            },
            grid:{
                horzLines:{
                    visible:false,
                },
                vertLines:{
                    visible:false,
                }
            },
            layout: {
                background:{
                    type:ColorType.Solid,
                    color:layout.bacground,
                },
                textColor:'white',
            },
        })
        this.chart = chart
        this.candleSeries = chart.addSeries(CandlestickSeries)
        this.candleSeries.setData(
            initialData.map((data)=>({
                ...data,
                time:(data.timestamp/1000) as UTCTimestamp
            }))
        )
    }

    public update = (updatePrice:any) =>{   
        if(!this.lastUpdateTime){
            this.lastUpdateTime = new Date().getTime()
        }
        this.candleSeries.update({
            time:(this.lastUpdateTime/1000) as UTCTimestamp,
            close:updatePrice.close,
            low:updatePrice.low,
            high:updatePrice.high,
            open:updatePrice.open
        })
        if(updatePrice.newCandleInitiated){
            this.lastUpdateTime = updatePrice.time
        }
    }
    public destroy = () =>{
        this.chart.remove()
    }
}