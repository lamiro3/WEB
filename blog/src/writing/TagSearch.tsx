import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { newTag } from "../api/tag";

/* Search.tsx는 검색창을 보여주고 검색어를 입력받는 컴포넌트 */
interface Tag {
    tag_id: number;
    name: string;
}
interface SearchProps {
    searchedTerm: string;
    onSearchedTerm: React.Dispatch<React.SetStateAction<string>>;
    tags: Tag[];
}

const Body = styled.div`
  display: fixed;
  padding: 10px;

  height: 30px;
  width: 100%;

  align-items: center;
`;

const SearchBox = styled.input.attrs({required: true, placeholder: "Search"})`
  width: 50rem;
  height: 2rem;
  margin: 0 auto;
  border-radius: 10px;
`;

const Btn = styled.button`
    width: 4rem;
    height: 2rem;

    margin-left: 3rem;
    padding: 2rem auto;

    border-radius: 10px;

    color: white;
    background-color: #ff3838;

    &:hover {
        background-color: #ff5e5e;
    }
`;

function TagSearch({searchedTerm, onSearchedTerm, tags}: SearchProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // 이미 존재하는 태그인가? (대소문자 구분 X)
    const isExistedTag = (searchTerm: string) => {
        if (tags.some(t => t.name.toUpperCase() === searchTerm.toUpperCase()))
            return true;
        return false;
    }

    // 태그 검색 창에 새로 추가할 태그명 입력한 뒤 Add 버튼 누를 경우 새 태그 추가하게끔 함
    const createTag = async () => {
        try {
            if(searchTerm.trim() === "")
                alert("아무것도 입력되지 않았습니다. 다시 입력해주세요.");

            else {
                if (!isExistedTag(searchTerm)){
                // id: 현재 날짜(ms단위), name: 검색어

                    const data = await newTag(Date.now(), searchTerm);
                    localStorage.setItem('tag', JSON.stringify(data));
                } else {
                    alert("이미 존재하는 Tag 입니다! 다시 시도해주세요.");
                }
            }
        } catch (error) {
            alert("ERROR!");
        }
    }

    useEffect(() => {
        onSearchedTerm(searchTerm); // props는 읽기 전용이므로 반드시 이렇게 콜백 함수를 통해 부모 컴포넌트로 전달해야 함
    }, [searchTerm])

    return <Body>
        <SearchBox onChange={onChange}/>
        <Btn onClick={createTag}>Add</Btn>
    </Body>;
}

export default TagSearch;