const BASE_URL = 'https://api.coinpaprika.com/v1'

export async function fetchCoins() {
    return fetch(`${BASE_URL}/coins`)
        .then(response => response.json());
}

export async function fetchCoinInfo(coinId:string) {
    return fetch(`${BASE_URL}/coins/${coinId}`)
        .then(response => response.json());
}

export async function fetchCoinTickers(coinId:string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`)
        .then(response => response.json());
}

export function fetchCoinHistory(coinId:string) {
    const endDate = Math.floor(Date.now()/1000) //ms 단위이므로 초단위로 변경하기 위해서는 1000으로 나눠주면 됨
    const startDate = endDate - 60*60*24*7*2 //endDate 기준으로 2주일 전
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
        .then(response => response.json());
}