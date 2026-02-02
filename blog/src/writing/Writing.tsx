import { useEffect, useState } from "react";
import styled from "styled-components";
import TagSearch from "./TagSearch";
import { Tag } from "../public/Tags";
import Search from "../public/Search";

interface Tag {
    id: number;
    name: string;
}

export const Head = styled.div`
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  width: 100%;
  height: 2rem;

  border-bottom: 1.5px solid black;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100; // stack 높이라고 생각하면 됨
`;

const BlogName = styled.h1`
    font-size: 25px;
    display: inline-block;
`;

const Body = styled.div`
    margin-top: 3.3rem;
    min-height: calc(100vh - 2rem);
    width: 100vw;


    background-color: #94a3b8;
    padding: 3rem 0;
`;

const Card = styled.section`
    background-color: #f8fafc;
    width: 70rem;
    margin: 0 auto 2rem auto;
    padding: 1.5rem 2rem;

    border: 0.1rem solid black;
    border-radius: 16px;
    box-shadow: 0.1rem 0.1rem 0.1rem 0.05rem black;
`;

/* Title */

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Subtitle = styled.span`
font-size: 1.1rem;
font-weight: 600;
color: #334155;
`;

/* tags */

const TagsContainer = styled(Card)`
`;

const SectionTitle = styled.h2`
    font-size: 1rem;
    font-weight: 700;
    margin: 1.5rem 0 0.5rem 0;
    color: #475569;
`;

const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
`;

/* post */

const PostContainer = styled(Card)`
    
`;


function Writing() {
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");

    const [searchedTag, setSearchedTag] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    useEffect(() => {
        fetch("/data/tags.json")
        .then(res => res.json())
        .then(data => setTags(data))
        .then(err => console.error(err));
    }, []);

    // 검색한 태그의 후보군
    const searchedTags = searchedTag
    ? tags.filter(
        tag =>
            tag.name.toUpperCase()
            .includes(searchedTag.toUpperCase()) &&
            !selectedTags.some(t => t.id === tag.id)
        )
    : [];

    // 그 외의 후보군
    const unsearchedTags = searchedTag
    ? tags.filter(
        tag =>
            !tag.name.toUpperCase()
            .includes(searchedTag.toUpperCase()) &&
            !selectedTags.some(t => t.id === tag.id)
        )
    : tags.filter(
        tag => !selectedTags.some(t => t.id === tag.id)
        );

    const select = (tag: Tag) => {
    setSelectedTags(prev =>
        prev.some(t => t.id === tag.id) 
        ? prev.filter(t => t.id !== tag.id) // 이미 선택한 태그라면 제외
        : [...prev, tag] // 선택하지 않았다면 포함
    );};

    const isSelected = (tag: Tag) =>
        selectedTags.some(t => t.id === tag.id);

    return (<>
        <Head>
            <BlogName>Taehyeon's Blog - Writing</BlogName>
        </Head>
        <Body>
            <Card>
                <TitleContainer>
                    <Subtitle>Title</Subtitle>
                    <Search 
                        searchedTerm={title}
                        onSearchedTerm={setTitle}
                        styleFor={process.env.REACT_APP_STYLE_WRITING_SEARCH}
                    />
            </TitleContainer>
            </Card>

            <TagsContainer>
                <TagSearch searchedTerm={searchedTag}
                        onSearchedTerm={setSearchedTag}
                        tags={tags}
                />

                <SectionTitle>Selected</SectionTitle>
                <TagList>
                    {selectedTags.map(tag => (
                        <Tag key={tag.id}
                            onClick={() => select(tag)}
                            $selected>{tag.name}</Tag>
                    ))}
                </TagList>

                <SectionTitle>Searched</SectionTitle>
                <TagList>
                    {searchedTags.map(tag => (
                        <Tag key={tag.id}
                            onClick={() => select(tag)}
                            $selected={isSelected(tag)}
                            $searched>{tag.name}</Tag>
                    ))}
                </TagList>
                
                <SectionTitle>Others</SectionTitle>
                <TagList>
                    {unsearchedTags.map(tag => (
                        <Tag key={tag.id}
                            onClick={() => select(tag)}
                            $selected={isSelected(tag)}>{tag.name}</Tag>
                    ))}
                </TagList>
            </TagsContainer>

            <PostContainer>
                
            </PostContainer>
        </Body>
    </>
    );
}

export default Writing;