import React, { useEffect, useState } from "react";    
import styled, { keyframes } from "styled-components";

/* Tags.tsx는 태그 목록을 보여주고 태그 필터링을 하는 컴포넌트 */
interface _Tag {
    id: number,
    name: string;
}
interface TagsProps {
  selectedTags: _Tag[];
  onSelectedTags: React.Dispatch<React.SetStateAction<_Tag[]>>;
  // Hooks event 발생 시 state update에 활용되는 함수 유형 => React.Dispatch
  // ?: Optional을 의미함
}

export const TagHoverAnimation = keyframes<{$searched:boolean}>`
  0% {
    background-color: ${({$searched}) => ($searched ? "#ef3d5b" : "mediumspringgreen")};
    color: ${({$searched}) => ($searched ? "white" : "black")};
  }
  100% {
    background-color: darkorange;
    color: white;
  }
`;

export const TagNotHoverAnimation = keyframes<{$searched:boolean}>`
  100% {
    background-color: ${({$searched}) => ($searched ? "#ef3d5b" : "mediumspringgreen")};
    color: ${({$searched}) => ($searched ? "white" : "black")};
  }
  0% {
    background-color: darkorange;
    color: white;
  }
`;

export const Tag = styled.div<{$selected?: boolean, $searched?: boolean}>`
  // 
  background-color: ${({$selected, $searched}) => 
    $selected ? "darkorange" : ($searched ? "#ef3d5b" : "mediumspringgreen")};
  color: ${({$selected, $searched}) => $selected ? "white" : ($searched ? "white" : "black")};

  border: 0.1rem, solid, black;
  border-radius: 0.5rem;

  font-size: clamp(0.4rem, 1.2vw, 0.8rem);
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

function Tags({ selectedTags, onSelectedTags } : TagsProps){
    const [tags, setTags] = useState<_Tag[]>([]);

    useEffect(() => {
        fetch("data/tags.json")
        .then(res => res.json())
        .then(data => setTags(data))
        .catch(err => console.error(err));
    }, []);

    const isThere = (tags:_Tag[], tgt:string):boolean => {
      for (let idx=0; idx<tags.length; idx++){
        if (tags[idx].name == tgt)
          return true;
      }
      return false;
    }

    const selectedTag = (tgt:_Tag) => {
      // 선택한 tag 목록에 현 tag가 포함되어 있다면 
      onSelectedTags(tags => 
        isThere(tags, tgt.name)
        ? tags.filter(t => t.name !== tgt.name) // true: 목록에서 해당 tag 삭제 <toggle event 구현하기 위해>
        : [...tags, tgt]); // false: 목록에 해당 tag 추가
    }

    return (
    <>
      {tags.map(tag => (
        <Tag key={tag.id}
            onClick={() => selectedTag(tag)}
            $selected={selectedTags.includes(tag)}>
          {tag.name}
        </Tag>
      ))}
    </>);
}

export default Tags;