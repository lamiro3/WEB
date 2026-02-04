import { useEffect, useState } from "react";    
import styled from "styled-components";
import { Tag } from "../public/Tags";

/* Contents.tsx는 포스트 목록(태그 및 검색 기반 필터링)을 보여주는 컴포넌트 */
interface Tag {
  id: number,
  name: string
}
interface Content {
  content_id: number,
  title: string,
  post: string,
  summary: string,
  createdAt: string,
  tags: Tag[];
}

interface ContentsProps {
  selectedTags: Tag[];
  searchedTerm: string;
}

// 검색어 하이라이트 함수
function highlightText(text: string, term: string){
  // 검색란 비어있을 땐 hightlight 처리 X
  if(!term) return text;

  const start = text.search(term);
  if(start === -1) return text;

  const end = start + term.length;

  console.log("Highlighting:", text, term, start, end);

  return <>{text.substring(0, start)}
        <Matched>{text.substring(start, end)}</Matched>
        {text.substring(end)}
        </>;
}

const NotFound = styled.div`
  font-size: 10rem;
  font-weight: bold;

  text-align: center;
  margin-top: 10rem;
`;

const Body = styled.div`
  background-color: white;

  margin: 0.6rem;

  border: 0.1rem solid black;
  border-radius: 0.6rem;

  padding-bottom: 0.4rem;

  box-shadow: 0.1rem 0.1rem 0.1rem 0.05rem black;

  transition: background-color 0.2s ease, transform 0.3s ease;
  
  &:hover {
    background-color: #e5e7eb;
    transform: translateX(4px); // 마우스 올렸을 때 약간 오른쪽으로 이동
  }
`;

const Title = styled.h2`
  padding: 0.3rem 0 0.2rem 0.4rem;

  font-size: clamp(1.1rem, 2vw, 1.25rem);

  border-bottom: 0.1rem solid black;
`;

const Summary = styled.div`
  font-size: 0.95rem;
  padding-left: 0.6rem;
  line-height: 1.5;
`;

const Date = styled.div`
  font-size: 0.8rem;

  margin: 0.3rem 0.4rem;
  padding: 0.15rem 0.4rem;

  width: fit-content;
  height: fit-content;

  line-height: 1.5;

  color: white;
  background-color: #ff5555;

  border: 0.1rem, solid, black;
  border-radius: 0.5rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  padding: 0.3rem 0.4rem;
  gap: 0.3rem;
`;

// 하이라이트된 검색어 스타일
const Matched = styled.span`
  background-color: yellow;
  border: 0.1rem solid black;
  border-radius: 0.3rem;

  color: blue;
  font-weight: bold;
`;

function Contents({selectedTags, searchedTerm}: ContentsProps){
    const [contents, setContents] = useState<Content[]>([]);

    useEffect(() => {
      fetch("/data/contents.json")
      .then(res => res.json()) 
      .then(data => setContents(data))
      .catch(err => console.error(err));
    }, []); // 대괄호 없으면 렌더링할 때마다 content 무한 복붙됨

    // 선택한 tag들만 골라내기(필터링)
    const filteredContents = selectedTags.length > 0
    ? contents.filter(content => selectedTags.every(seltag => content.tags.some(tag => tag.id === seltag.id))) : contents;

    // 검색어 필터링(앞서 선택한 tag들 필터링된 결과에서 다시 검색어로 필터링) + <추후에 contents에 "내용"도 추가할 예정이지만> 임시방편으로 title과 summary에서만 검색
    const searchedContents = searchedTerm
    ? filteredContents.filter(content => content.title.includes(searchedTerm) || content.summary.includes(searchedTerm))
    : filteredContents;

    return (<>
    {
      searchedContents.length === 0 ?
      <NotFound>Not Found</NotFound>
      : searchedContents.map(content => (
        <Body key={content.content_id}>
          
          <Title>{"> "}{highlightText(content.title, searchedTerm)}</Title>
          <Summary>{highlightText(content.summary, searchedTerm)}{"..."}</Summary>
          <Date>{content.createdAt}</Date>
          
          <TagContainer>
            {content.tags.map(tag => (
              <Tag key={tag.id} $selected={selectedTags.some(t => t.id === tag.id)}>{tag.name}</Tag>
            ))}
          </TagContainer>
        </Body>
      ))
    }
    </>);
}

export default Contents;