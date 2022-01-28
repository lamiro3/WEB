import { useState } from 'react';
import { lightTheme, darkTheme } from './theme';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import App from './App';

const Btn = styled.button`
    background-color: red;
    color: white;
    border: 0;
    border-radius: 10px;
`;

function ThemeBtn() {
    const [ isDark, setIsDark ] = useState(darkTheme);
    const [ txt, setTxt ] = useState('dark');
    const onClick = () => {
        if (isDark === darkTheme){
            setIsDark(lightTheme);
            setTxt('light');
        } else {
            setIsDark(darkTheme);
            setTxt('dark');
        }
    }
    return <div>
        <Btn onClick={onClick}>{txt} mode</Btn>
        <ThemeProvider theme={isDark}>
            <App />
        </ThemeProvider>
    </div>
}

export default ThemeBtn;