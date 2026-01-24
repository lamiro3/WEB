import { useEffect, useState } from "react";    
import styled, {keyframes} from "styled-components";

interface Post {
  id: number,
  title: string,
  summary: string,
  createdAt: string,
  tags: string[];
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

  border: 0.1rem, solid, black;
  border-radius: 0.6rem;

  padding-bottom: 0.4rem;
`;

const Title = styled.h2`
  padding-top: 0.3rem;
  padding-left: 0.4rem;
  font-size: clamp(1.1rem, 2vw, 1.25rem);
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

const Tag = styled.div`
  background-color: mediumspringgreen;

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

function Contents(){
    const [contents, setContents] = useState<Post[]>([]);


    useEffect(() => {
      fetch("/data/contents.json")
      .then(res => res.json()) 
      .then(data => setContents(data))
      .catch(err => console.error(err));

      // fetch("/data/tags.json")

    }, []);


    return (<>
    {
      contents.map(post => (
        <Body key={post.id}>
          <Title>{post.title}</Title>
          <Summary>{post.summary}</Summary>
          <Date>{post.createdAt}</Date>
          
          <TagContainer>
            {post.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagContainer>
        </Body>
      ))
    }
    </>);
}

export default Contents;