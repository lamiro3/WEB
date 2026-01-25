import React, { useState } from 'react';
import styled from "styled-components";
import Contents from "./Contents";
import Tags from  "./Tags";

const Head = styled.div`
  background-color: white;
  display: flex;

  padding: 10px;
  width: 100%;
  height: 20px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; // stack 높이라고 생각하면 됨
`;

const BlogName = styled.h1`
  display: inline-block;
  font-size: 25px;
  margin:auto;
`;

/* Search */

const Search = styled.div`
  background-color: white;

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

/* Body */

const Body = styled.div`
  background-color: cornflowerblue;
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

  padding: 0.5rem;
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

function App() {
  // Tags ~ 선택한 태그들 : selectedTags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return <div>
    <Head>
      <BlogName>Taehyeon's lab ⚗️</BlogName>
    </Head>

    <Search>
        <SearchBox />
    </Search>

    <Body>
      <SideBar>
        <Menu>
        <SubTitle>Menu</SubTitle>
        <ul>
          <li>Profile</li>
          <li>Github</li>
          <li>solved.ac</li>
        </ul>
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
        <Contents selectedTags = {selectedTags}/>
      </ContentList>
    </Body>
  </div>;
}

export default App;
