import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contents from "./Contents";
import Tags from  "../public/Tags";
import Search from "../public/Search";
import { isLoggedIn, LogOut } from '../login/Login';

/* APP.tsx는 전체 레이아웃을 관리하는 컴포넌트*/

interface Tag{
  id: number,
  name: string
}

const BG = styled.div`
  background-color: #94a3b8;
`;

export const Head = styled.div`
  background-color: #e2e8f0;
  display: flex;

  padding: 10px;
  width: 100%;
  height: 20px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; // stack 높이라고 생각하면 됨
`;

export const BlogName = styled.h1`
  display: inline-block;
  font-size: 25px;
  letter-spacing: 0.5px;  
  margin:auto;
`;

/* Body */

const Body = styled.div`
  background-color: #94a3b8;

  display: flex;

  padding: 10px;
  width: 100%;
  height: calc(100vh - 70px);
  margin-top: 5.5rem;
`;

/* SideBar */

const SideBar = styled.div`
  position: fixed;
  top: 6.7rem;
  left: 10px;

  width: 15%;
  height: calc(100vh - 6.7rem); // 100vh = 브라우저 화면 전체 높이

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/* Menu */

const Menu = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;

  border: 0.1rem solid black;
  border-radius: 0.6rem;

  padding: 0.6rem 0.5rem;

  box-shadow: 0.1rem 0.1rem 0.1rem 0.05rem black;

  & > ul  > li {
    list-style-type: none;
    margin: 0.3rem 0;
  }
`;

const MenuList = styled.ul`
  padding: 0;
  margin: 0.3rem 0 0 0;
`;

const MenuItem = styled.li`
  list-style-type: none;
  padding: 0.45rem 0.45rem;

  font-size: clamp(0.85rem, 1.2vw, 1rem); // 최소 선호 최대 크기
  line-height: 1.4;
  
  border-radius: 0.4rem;

  cursor: pointer;

  /* 텍스트가 길어질 때 말줄임표 처리 */
  white-space : nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  transition: background-color 0.2s ease, transform 0.15s ease;
    
  &:hover {
    background-color: #e5e7eb;
    transform: translateX(2px); // 마우스 올렸을 때 약간 오른쪽으로 이동
  }
`;

/* Tag */

const SubTitle = styled.h3`
  padding-left: 0.4rem;
`;

const Taglist = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;

  border: 0.1rem solid black;
  border-radius: 0.6rem;

  padding: 0.5rem;

  box-shadow: 0.1rem 0.1rem 0.1rem 0.05rem black;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  padding: 0.3rem 0.4rem;
  gap: 0.3rem;
`;

/* Content */

const ContentList = styled.div`
  margin-left: 15%;
  width: 85%;
  height: calc(100vh - 70px);
  padding: 0 2rem;
  overflow-y: auto;
`;

function Home() {
  // Tags ~ 선택한 태그들 : selectedTags
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [serachedTerm, setSearchedTerm] = useState<string>("");

  const navigate = useNavigate();

  const variableMenu = () => {
    if (isLoggedIn()) {
      return (
        <>
          <MenuItem>Settings</MenuItem>
          <MenuItem onClick={() => {navigate("/writing")}}>Writing</MenuItem>
          <MenuItem onClick={() => {LogOut(); navigate('/')}}>Log Out</MenuItem>
        </>
      );
    }

    else {
      return <MenuItem onClick={() => {navigate('/login')}}>Log In</MenuItem>
    }
  }

  return <BG>
    <Head>
      <BlogName>Taehyeon's Blog</BlogName>
    </Head>

    <Search searchedTerm = {serachedTerm}
            onSearchedTerm = {setSearchedTerm}
            styleFor={process.env.REACT_APP_STYLE_HOME_SEARCH}
            placeholder="Search"/>

    <Body>
      <SideBar>
        <Menu>
          <SubTitle>Menu</SubTitle>
          <MenuList>
            <MenuItem>About Me</MenuItem>
            {variableMenu()}
          </MenuList>
      </Menu>

      <Taglist>
        <SubTitle>Tags</SubTitle>
        <TagContainer>
          <Tags selectedTags = {selectedTags}
                onSelectedTags = {setSelectedTags}/>
        </TagContainer>
      </Taglist>
      </SideBar>

      <ContentList>
        <Contents selectedTags = {selectedTags} searchedTerm = {serachedTerm} />
      </ContentList>
    </Body>
  </BG>;
}

export default Home;
