import React, { useEffect, useState } from 'react';
import styled from "styled-components";

/* Search.tsx는 검색창을 보여주고 검색어를 입력받는 컴포넌트 */

interface SearchProps {
    searchedTerm: string;
    onSearchedTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Body = styled.div`
  background-color: #e2e8f0;

  border-bottom: 0.1rem solid black;

  display: flex;
  padding: 10px;
  height: 30px;
  width: 100%;

  align-items: center;

  position: fixed;
  top: 40px;
  left: 0;
  z-index: 1000;
`;

const SearchBox = styled.input.attrs({required: true, placeholder: "Search"})`
  width: 50rem;
  height: 2rem;
  margin: 0 auto;
  border-radius: 10px;
`;

function Search({searchedTerm, onSearchedTerm}: SearchProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        console.log("Search Term:", searchTerm);
        onSearchedTerm(searchTerm); // props는 읽기 전용이므로 반드시 이렇게 콜백 함수를 통해 부모 컴포넌트로 전달해야 함
    }, [searchTerm])

    return <Body>
        <SearchBox onChange={onChange}/>
    </Body>;
}

export default Search;