import React, { useEffect, useState } from "react";    
import styled, { keyframes } from "styled-components";

interface Tag {
    id: number,
    name: string;
}

interface TagsProps {
  selectedTags: string[];
  onSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  // Hooks event 발생 시 state update에 활용되는 함수 유형 => React.Dispatch
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

const Tag = styled.div<{$isClicked: boolean}>`
  // 
  background-color: ${({$isClicked}) => 
    $isClicked ? "darkorange" : "mediumspringgreen"};
  color: ${({$isClicked}) => $isClicked ? "white" : "black"};

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

  /* &:not(:hover) {
    animation: ${TagNotHoverAnimation} 0.5s;
  } */
`;

function Tags({ selectedTags, onSelectedTags } : TagsProps){
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        fetch("data/tags.json")
        .then(res => res.json())
        .then(data => setTags(data))
        .catch(err => console.error(err));
    }, []);

    const selectedTag = (tagName:string) => {
      // 선택한 tag 목록에 현 tag가 포함되어 있다면 
      onSelectedTags(stags => 
        stags.includes(tagName)
        ? stags.filter(t => t !== tagName) // true: 목록에서 해당 tag 삭제 <toggle event 구현하기 위해>
        : [...stags, tagName]); // false: 목록에 해당 tag 추가
    }

    return (
    <>
      {tags.map(tag => (
        <Tag key={tag.id}
            onClick={() => selectedTag(tag.name)}
            $isClicked={selectedTags.includes(tag.name)}>
          {tag.name}
        </Tag>
      ))}
    </>);
}

export default Tags;