import { Switch, Route, useLocation, useParams, Link, useRouteMatch } from "react-router-dom";
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Price from './Price';
import Chart from './Chart';
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from 'react-helmet';

interface Params {
    coinId: string;
}

interface RouteState {
    name: string;
}

interface InfoData {
    id: string; 
    name: string; 
    symbol: string; 
    rank: number; 
    is_new: boolean; 
    is_active: boolean; 
    type: string; 
    description: string; 
    message: string; 
    open_source: boolean; 
    started_at: string; 
    development_status: string; 
    hardware_wallet: boolean;
    proof_type: string; 
    org_structure: string; 
    hash_algorithm: string; 
    last_data_at: string; 
    first_data_at: string; 
}

interface PriceData {
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

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-size: 40px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.boxColor};
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child{
        font-size: 10px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 6px;
    }
`;

const Boxes = styled.div`
    margin: 20px 0px;
    gap: 20px;
`;

const Box = styled.div<{ isActive:boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: bold;
    background-color: ${props => props.theme.boxColor};
    padding: 10px 0px;
    margin: 10px 20px;
    border-radius: 10px;
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;

const Description = styled.p`
    margin: 30px 0px;
`;

const BackBtn = styled.button`
    background-color: #ff7645;
    color: white;
    border: 0;
    border-radius: 10px;
    margin: 5px 0px;
    &:hover{
        background-color: #ff5314;
    }
`;

function Coin() {
    const { coinId } = useParams<Params>();
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch('/:coinId/price');
    const chartMatch = useRouteMatch('/:coinId/chart');
    const {isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['info', coinId], () => fetchCoinInfo(coinId));
    const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(['tickers', coinId], () => fetchCoinTickers(coinId), 
    {
        refetchInterval: 5000, //백그라운드에서 app을 업데이트 할 수 있다는 장점이 있음!
    });

    // const [loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<InfoData>();
    // const [price, setPrice] = useState<PriceData>();

    // useEffect(() => {
    //     (async() => {
    //         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //         setInfo(infoData);
    //         setPrice(priceData);
    //         setLoading(false);
    //      })();
    // }, []);

    const loading = infoLoading || tickersLoading;

    return <Container>
        <Helmet>
            <title>{infoData?.name || 'Loading...'}</title>
        </Helmet>
        <Header>
            <Title>{infoData?.name || 'Loading...'}</Title>
        </Header>
        <Link to='/'>
            <BackBtn>return to home</BackBtn>
        </Link>
        { loading ? <Loader>Loading...</Loader> :

        <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>{infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Price(USD):</span>
                    <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Total Suply:</span>
                    <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Suply:</span>
                    <span>{tickersData?.max_supply}</span>
                </OverviewItem>
            </Overview>

            <Description>{infoData?.description}</Description>

            <Boxes>
                <Box isActive={priceMatch !== null}>
                    <Link to={`/${coinId}/price`}>Price</Link>
                </Box>
                <Box isActive={chartMatch !== null}>
                    <Link to={`/${coinId}/chart`}>Chart</Link>
                </Box>
            </Boxes>
            <Switch>
                <Route path={`/${coinId}/price`}>
                    <Price coinId={coinId} />
                </Route>
                <Route path={`/${coinId}/chart`}>
                    <Chart coinId={coinId} />
                </Route>
            </Switch>
        </>
        }
        </Container>;
}

export default Coin;