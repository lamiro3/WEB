import { useEffect, useState } from "react";    
import styled, { keyframes } from "styled-components";

interface Tag {
    id: number,
    name: string;
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

function Tags(){
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        fetch("data/tags.json")
        .then(res => res.json())
        .then(data => setTags(data))
        .catch(err => console.error(err));
    }, []);

    return (<>
    {tags.map(tag => (<Tag key={tag.id}>{tag.name}</Tag>))}
    </>);
}

export default Tags;