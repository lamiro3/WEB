import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
`;

function App() {
    return (<BrowserRouter>
        <GlobalStyle />
        <Router />
    </BrowserRouter>);
}

export default App;