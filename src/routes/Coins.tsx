import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atom';

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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${props => props.theme.boxColor};
    color: ${props => props.theme.textColor};
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 15px;
    a{
        transition: color 0.25s ease-in;
        display: flex;
        padding: 20px;
        align-items: center;
    }
    &:hover {
        a {
            color:${props => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-size: 20px;
    padding-bottom: 10px;
`;

const coins = [];

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

const Btn = styled.button`
    background-color: red;
    color: white;
    border: 0;
    border-radius: 10px;
    margin: 0px 5px;
    &:hover {
        background-color: #6e1d17;
    }
`;

interface ICoin{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins() {
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins); // fetcher func이 로딩중이면 isLoading에 boolean형으로 상태 반환
    // const [coins, setCoins] = useState<ICoin[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async() => {
    //        const response = await fetch('https://api.coinpaprika.com/v1/coins');
    //        const json = await response.json();
    //        setCoins(json.slice(0, 100)); //상위 100개 까지만 이용!!
    //        setLoading(false)
    //     })();
    // }, [])
    return <Container>
        <Helmet>
            <title>COIN</title>
        </Helmet>
        <Header>
            <Title>COIN</Title>
            <Btn onClick={() => setDarkAtom((current) => !current)}>{isDark ? 'Dark' : 'Light'} mode</Btn>
        </Header>
        {isLoading ? 
            <Loader>Loading...</Loader>
        : <CoinsList>
            {data?.slice(0, 100).map(coin => <Coin key={coin.id}>
                    <Link to={{
                        pathname: `/${coin.id}`,
                        state: { name: coin.name },
                    }}>
                        <Img src= {`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                        {coin.name} &rarr; 
                    </Link>
                </Coin>)}
        </CoinsList>}
    </Container>
}


export default Coins;