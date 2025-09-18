import axios, { all } from "axios";
import { Depth, Klines, Ticker, Trades } from "./types";
import { error } from "console";


const BASE_URL = 'https://api.backpack.exchange/api/v1'


export const getTicker = async(market:string):Promise<Ticker> => {
    
    // const response = await axios.get(`${BASE_URL}/tickers`)
    const response = await axios.get('http://localhost:8080/')
    const allTicker = JSON.parse(response.data)
    const ticker = allTicker.find(d=>d.symbol === market)
    if(!ticker){
        throw new Error(`market not found for ${market}`)
    }
    return ticker
    
}

export const getDepth = async (market:string):Promise<Depth> => {
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`)
    return response.data

}

export const getKlines = async (market:string,interval:string,startTime:number,endTime:number):Promise<Klines[]> => {
    const response = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}m&startTime=${startTime}&endTime=${endTime}`) 
    return response.data
}

export const getTrades = async (market:string,limit:string):Promise<Trades[]> => {
    const response = await axios.get(`${BASE_URL}/trades?symbol=${market}&limit=${limit}`)
    return response.data
}

export const getMarkets =async ():Promise<string[]> => {
    const response = await axios.get(`${BASE_URL}/markets`)
    return response.data
}