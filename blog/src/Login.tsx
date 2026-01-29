import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

/* Login.tsx는 로그인 폼을 보여주는 컴포넌트 */

interface AccountProps {
    username: string;
    password: string;  
};

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #94a3b8;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
`;

const Box = styled.div`
    width: 20rem;
    height: 30rem;

    background-color: white;
    border: 0.1rem solid black;
    border-radius: 0.5rem;

    box-shadow: 0.2rem 0.2rem 0.2rem 0.1rem gray;
`;

const Title = styled.h1`
  display: flex;
  font-size: 25px;
  justify-content: center;
`;

const Icon = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem auto;

    width: 8rem;
    height: 8rem;
    
    background-color: gray;

    border: 0.3rem solid gray;
    border-radius: 4rem;
`;

const Head = styled.div`
    display: flex;
    margin:auto;

    width: 4em;
    height: 4em;
    
    background-color: lightgray;
    border-radius: 2em;
`;

const Upper = styled.div`
    display: flex;
    margin:auto;

    width: 6em;
    height: 3em;
    
    background-color: lightgray;
    border-radius: 3em;

    top: 5em;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Username = styled.div`
    margin-bottom: 1rem;
`;

const Password = styled.div`
    margin-bottom: 1rem;
`;

const Enter = styled.input`
    width: 20em;
    height: 2em;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
`;

const Btn = styled.button`
    width: 5rem;
    height: 2.5rem;
    border: 0.1rem solid black;
    border-radius: 0.5rem;

    background-color: #0044ff;
    color: white;

    &:hover {
        background-color: #376cff;
    }
`;

function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [accounts, setAccounts] = useState<AccountProps[]>([]);

    const onChangeUserName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        fetch('/data/accounts.json')
        .then(res => res.json())
        .then(data => setAccounts(data))
        .catch(err => console.error(err));
    });

    useEffect(() => {
        console.log("Username:", username);
        console.log("Password:", password);
    }, [username, password]);

    const onSubmit = () => {
        const isThere = accounts.find(acc => acc.username === username && acc.password === password);
        console.log(isThere ? "Login successful" : "Login failed");
    };

    return (<Body>
        <Box>
            <Title>Log In</Title>
            <Icon>
                <Head/>
                <Upper/>
            </Icon>
            <Form>
                <Username>
                    <div>Your Username</div>
                    <Enter type="text" onChange={onChangeUserName} />
                </Username>
                <Password>
                    <div>Password</div>
                    <Enter type="password" onChange={onChangePassword} />
                </Password>
                <Btn type="submit" onClick={onSubmit}>Log In</Btn>
            </Form>
        </Box>
    </Body>);
}

export default Login;