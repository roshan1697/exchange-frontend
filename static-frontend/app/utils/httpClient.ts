import axios from "axios";
import { Depth, Ticker } from "./types";


const BASE_URL = 'https://api.backpack.exchange/api/v1'


export const getTicker = async(market:string):Promise<Ticker> => {
    const response = await axios.get(`${BASE_URL}/tickers`)
    return response.data
    
}

export const getDepth = async (market:string):Promise<Depth> => {
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`)
    return response.data

}