import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import Apexchart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atom';

interface ChartProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({coinId}: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 10000,
    });
    const isDark = useRecoilValue(isDarkAtom);
    return <div>
        {isLoading ? 'Loading chart...' : 
        <Apexchart 
            type="candlestick"
            series={[
                {
                    name: 'Price',
                    data: data?.map((price) => {
                        return {
                            x: price.time_close,
                            y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)]
                        }
                    }),
                },
            ]}
            options={{
                theme: {
                    mode: isDark ? 'dark' : 'light',
                },
                chart: {
                    height: 500,
                    type: 'candlestick',
                    toolbar: {
                        show: false,
                    },
                    background: 'transparent',
                },
                stroke: {
                    curve: 'smooth',
                    width: 4,
                },
                yaxis: {
                    show: false,
                },
                xaxis: {
                    labels: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                    type: 'datetime',
                    categories: data?.map(price => price.time_close),
                },
                //colors: ['#03fc56'],
                tooltip: {
                    y: {
                        formatter: (value) => `$${value.toFixed(2)}`,
                    }
                }
            }}
        />}
    </div>
}

export default Chart;