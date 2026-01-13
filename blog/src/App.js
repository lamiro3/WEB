import styled, { keyframes }  from "styled-components";
import githubLogo from "./img/github.png";

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
  background: url(${githubLogo});
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
  width: 70%;
  height: 30px;
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

const Taglist = styled.div`
  background-color: tomato;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15%;

  overflow-y:auto;
`;

const TagListTitle = styled.h3`
`;

const Tag = styled.div`
  background-color: yellow;
  border-radius: 10px;
  font-size: 15px;
  text-align: center;
  margin: 5px 5px;
  width: 40px;
`;

const ContentList = styled.div`
  background-color: yellowgreen;
  display: inline-block;  
  width: 85%;
  height: 100%;
  margin: 0px 10px;
  float: right;
`;

const Content = styled.div`
  background-color: aquamarine;
  margin: 10px 10px;
  border-radius: 10px;
`;

const ConTitle = styled.h2`
  font-size: 20px;
`

const Summary = styled.div`
  font-size: 15px;
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
        <TagListTitle>Tags</TagListTitle>
        <Tag>tag</Tag>
        <Tag>tag</Tag>
        <Tag>tag</Tag>
        <Tag>tag</Tag>
        <Tag>tag</Tag>
        <Tag>tag</Tag>
      </Taglist>
      <ContentList>
        <Content>
          <ConTitle>Content title</ConTitle>
          <Summary>어떤 생각을 일정한 형식에 따라 글자로 나타낸 것. 시·소설·수필·희곡 등을 비롯하여, 
            일기·편지·논설·신문 기사 등과 같이 일정한 내용을 담은 모든 기록을 두루 이르는 말임. 세는 단위는 줄·편.
          </Summary>
          <div>2026.01.01</div>
          <Tag>tag</Tag>
        </Content>
        <Content>
          <ConTitle>Content title</ConTitle>
          <Summary>어떤 생각을 일정한 형식에 따라 글자로 나타낸 것. 시·소설·수필·희곡 등을 비롯하여, 
            일기·편지·논설·신문 기사 등과 같이 일정한 내용을 담은 모든 기록을 두루 이르는 말임. 세는 단위는 줄·편.
          </Summary>
          <div>2026.01.01</div>
          <Tag>tag</Tag>
        </Content>
        <Content>
          <ConTitle>Content title</ConTitle>
          <Summary>어떤 생각을 일정한 형식에 따라 글자로 나타낸 것. 시·소설·수필·희곡 등을 비롯하여, 
            일기·편지·논설·신문 기사 등과 같이 일정한 내용을 담은 모든 기록을 두루 이르는 말임. 세는 단위는 줄·편.
          </Summary>
          <div>2026.01.01</div>
          <Tag>tag</Tag>
        </Content>
      </ContentList>
    </Body>
  </div>;
}

export default App;
