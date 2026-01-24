import React from 'react';
import styled from "styled-components";
import Contents from "./Contents";
import Tags from  "./Tags";

const Head = styled.div`
  background-color: skyblue;
  display: flex;

  margin: auto;
  padding: 10px 10px;
  width: 100%;
  height: 20px;
`;

const BlogName = styled.h1`
  display: inline-block;
  font-size: 20px;
  margin:auto;
`;

const HeadBtn = styled.button`
  display: inline-block; // 가로 방향으로 나열되도록
  float: right; // 우측으로 정렬

  height: 24px;
  width: 24px;
`;

/* Search */

const Search = styled.div`
  background-color: orange;
  display: flex;
  padding: 10px 10px;
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

/* Body */

const Body = styled.div`
  background-color: cornflowerblue;
  display: flex;
  padding: 10px 10px;
  width: 100%;
  height: 90%;
  margin: auto;
`;

/* Tag */

const TagTitle = styled.h3`
  padding-left: 0.4rem;
`;

const Taglist = styled.div`
  display: flex;
  flex-direction: column;

  border: 0.1rem, solid, black;
  border-radius: 0.6rem;

  height: 100%;
  width: 15%;
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
  display: inline-block;  
  width: 85%;
  height: 100%;
  padding: 0 2rem;
  float: right;
`;

function App() {
  return <div>
    <Head>
      <BlogName>Taehyeon's Blog</BlogName>
      <HeadBtn></HeadBtn>
      <HeadBtn></HeadBtn>
    </Head>
    <Search>
        <SearchBox />
    </Search>
    <Body>
      <Taglist>
        <TagTitle>Tags</TagTitle>
        
        <TagContainer>
          <Tags />
        </TagContainer>
      </Taglist>
      <ContentList>
        <Contents />
      </ContentList>
    </Body>
  </div>;
}

export default App;
