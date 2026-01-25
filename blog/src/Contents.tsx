import { useEffect, useState } from "react";    
import styled, {keyframes} from "styled-components";

interface Post {
  id: number,
  title: string,
  summary: string,
  createdAt: string,
  tags: string[];
}

interface ContentsProps {
  selectedTags: string[];
}

const TagHoverAnimation = keyframes`
  0% {
    background-color: mediumspringgreen;
    color: black;
  }
  100% {
    background-color: darkorange;
    color: white;
  }
`;

const TagNotHoverAnimation = keyframes`
  100% {
    background-color: mediumspringgreen;
    color: black;
  }
  0% {
    background-color: darkorange;
    color: white;
  }
`;

const Body = styled.div`
  background-color: white;

  margin: 0.6rem;

  border: 0.1rem solid black;
  border-radius: 0.6rem;

  padding-bottom: 0.4rem;

  box-shadow: 0.1rem 0.1rem 0.1rem 0.05rem black;
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
  font-size: 0.95rem;
  padding-left: 0.6rem;
  line-height: 1.5;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  padding: 0.3rem 0.4rem;
  gap: 0.3rem;
`;

const Tag = styled.div<{$active: boolean}>`
  background-color: ${({$active}) => 
    $active ? "darkorange" : "mediumspringgreen"};
  color: ${({$active}) => $active ? "white" : "black"};

  border: 0.1rem, solid, black;
  border-radius: 0.5rem;

  font-size: 0.8rem;
  text-align: center;

  padding: 0.15rem 0.4rem;
  white-space: nowrap;

  &:hover {
    animation: ${TagHoverAnimation} 0.5s;
    background-color: darkorange;
    color: white;
  }

  &:not(:hover) {
    animation: ${TagNotHoverAnimation} 0.5s;
  }
`;

function Contents({selectedTags}: ContentsProps){
    const [contents, setContents] = useState<Post[]>([]);

    useEffect(() => {
      fetch("/data/contents.json")
      .then(res => res.json()) 
      .then(data => setContents(data))
      .catch(err => console.error(err));
    }, []); // 대괄호 없으면 렌더링할 때마다 content 무한 복붙됨

    // 선택한 tag들만 골라내기(필터링)
    const filteredContents = selectedTags
    ? contents.filter(post => selectedTags.every(tag => post.tags.includes(tag))) : contents;

    return (<>
    {
      filteredContents.map(post => (
        <Body key={post.id}>
          <Title>{"> " + post.title}</Title>
          <Summary>{post.summary}</Summary>
          <Date>{post.createdAt}</Date>
          
          <TagContainer>
            {post.tags.map(tag => (
              <Tag key={tag} $active={selectedTags.includes(tag)}>{tag}</Tag>
            ))}
          </TagContainer>
        </Body>
      ))
    }
    </>);
}

export default Contents;