import axios from "axios";
import { Depth, Klines, Ticker, Trades } from "./types";


const BASE_URL = 'https://api.backpack.exchange/api/v1'


export const getTicker = async(market:string):Promise<Ticker> => {
    const response = await axios.get(`${BASE_URL}/tickers`)
    return response.data
    
}

export const getDepth = async (market:string):Promise<Depth[]> => {
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`)
    return response.data

}

export const getKlines = async (market:string,interval:string,time:string):Promise<Klines[]> => {
    const response = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}m&startTime=${time}`) 
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