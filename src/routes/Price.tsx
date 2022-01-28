import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from 'styled-components';

interface PriceProp {
    coinId: string;
}

interface ITickers {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d:  number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d:  number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    }
}

const PerChanges = styled.ul`
    background-color: ${props => props.theme.boxColor};
    color: ${props => props.theme.textColor} ;
    border-radius: 10px;
    div {
        text-align: center;
        font-weight: bold;
        padding: 10px;
    }
`;

const Perchange = styled.li`
    padding: 20px 6px;
    font-weight: bold;
`;

const AllTimeHigh = styled.div`
    background-color: ${props => props.theme.boxColor};
    color: ${props => props.theme.textColor} ;
    border-radius: 10px;
    font-weight: bold;
    text-align: center;
    padding: 10px 0px;
    margin: 10px 0px;
`;

function Price({ coinId }:PriceProp) {
    const {isLoading, data} = useQuery<ITickers>(['prices', coinId], () => fetchCoinTickers(coinId), {
        refetchInterval: 10000,
    })
    
    return <div>
        { isLoading ? 'Loading price...' : <>
        <AllTimeHigh>Maximum price: ${data?.quotes.USD.ath_price.toFixed(2)}</AllTimeHigh>
        <PerChanges>
            <div>{`Percentage price change of ${coinId}`}</div>
            <Perchange>change in last 12h: {data?.quotes.USD.percent_change_12h}%</Perchange>
            <Perchange>change in last 1d: {data?.quotes.USD.percent_change_24h}%</Perchange>
            <Perchange>change in last 1w: {data?.quotes.USD.percent_change_7d}%</Perchange>
            <Perchange>change in last 1m: {data?.quotes.USD.percent_change_30d}%</Perchange>
            <Perchange>change in last 1y: {data?.quotes.USD.percent_change_1y}%</Perchange>
        </PerChanges>
        </>}
    </div>
}

export default Price;