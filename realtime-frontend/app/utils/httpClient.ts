import axios, { all } from "axios";
import { Depth, KLine, Ticker, Trade } from "./types";


const BASE_URL = 'http://localhost:8080'


export const getTicker = async(market:string):Promise<Ticker> => {
    
    const response = await axios.get(`${BASE_URL}/tickers`)
    const allTicker = JSON.parse(response.data)
    const ticker = allTicker.find(d=>d.symbol === market)
    if(!ticker){
        throw new Error(`market not found for ${market}`)
    }
    return ticker
    
}

export const getDepth = async (market:string):Promise<Depth> => {
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`)
    
    return JSON.parse(response.data)

}

export const getKlines = async (market:string,interval:string,startTime:number,endTime:number):Promise<KLine[]> => {
    const response = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`) 
    return JSON.parse(response.data)
}

export const getTrades = async (market:string):Promise<Trade[]> => {
    const response = await axios.get(`${BASE_URL}/trades?symbol=${market}`)
    return JSON.parse(response.data)
}

export const getMarkets =async ():Promise<string[]> => {
    const response = await axios.get(`${BASE_URL}/markets`)
    return JSON.parse(response.data)
}