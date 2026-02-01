import { useEffect, useState } from "react";
import styled from "styled-components";
import { Head, BlogName } from "./Home";
import TagSearch from "./TagSearch";
import { Tag } from "./Tags";

interface Tag {
    id: number;
    name: string;
}

const Body = styled.div`
    width: 100vw;
    height: 100vh;

    border-top: 0.1rem solid black;

    padding: auto;
    background-color: #94a3b8;

    overflow: auto;
`;

const Subtitle = styled.div`
    font-size: 20px;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin: 5rem auto;
    width: 80vw;
    height: 10vh;

    border: 0.1rem solid black;
`;

const TitleBox = styled.input`
    width: 90%;
    height: 2rem;

    margin: auto;
`;

const TagsContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin: 0 auto;
    width: 80vw;
    height: 20vh;

    border: 0.1rem solid black;
`

const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    padding: 0.3rem 0.4rem;
    gap: 0.3rem;
`;

const TagBox = styled.div`
    display: flex;
    flex-direction: row;

    margin-top: 1rem;
`;

function Writing() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const [searchedTag, setSearchedTag] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const onChangeTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    useEffect(() => {
        fetch("/data/tags.json")
        .then(res => res.json())
        .then(data => setTags(data))
        .then(err => console.error(err));
    }, []);

    const createTag = (name: string) => {
        const newTag: Tag = {
            id: Date.now(),
            name: name,
        };

        const newTags = [...tags, newTag];
        setTags(newTags);
        setSelectedTags(tags => [...tags, newTag]);

        localStorage.setItem("tags", JSON.stringify(newTags));
    }

    const searchedTags = searchedTag
    ? tags.filter(
        tag =>
            tag.name.includes(searchedTag) &&
            !selectedTags.some(t => t.id === tag.id)
        )
    : [];

    const unsearchedTags = searchedTag
    ? tags.filter(
        tag =>
            !tag.name.includes(searchedTag) &&
            !selectedTags.some(t => t.id === tag.id)
        )
    : tags.filter(
        tag => !selectedTags.some(t => t.id === tag.id)
        );

    const select = (tag: Tag) => {
    setSelectedTags(prev =>
        prev.some(t => t.id === tag.id)
        ? prev.filter(t => t.id !== tag.id)
        : [...prev, tag]
    );};

    const isSelected = (tag: Tag) =>
        selectedTags.some(t => t.id === tag.id);

    return (<>
        <Head>
            <BlogName>Taehyeon's Blog</BlogName>
        </Head>
        <Body>
            <TitleContainer>
                <Subtitle>Title: </Subtitle>
                <TitleBox onChange={onChangeTitle}/>
            </TitleContainer>
            <TagsContainer>
                <TagSearch searchedTerm={searchedTag}
                        onSearchedTerm={setSearchedTag}/>
                <TagBox>
                    <Subtitle>Selected</Subtitle>
                    <TagList>
                        {selectedTags.map(tag => (
                            <Tag key={tag.id}
                                onClick={() => select(tag)}
                                $selected>{tag.name}</Tag>
                        ))}
                    </TagList>
                </TagBox>
                <TagBox>
                    <Subtitle>Searched</Subtitle>
                    <TagList>
                        {searchedTags.map(tag => (
                            <Tag key={tag.id}
                                onClick={() => select(tag)}
                                $selected={isSelected(tag)}
                                $searched>{tag.name}</Tag>
                        ))}
                    </TagList>
                </TagBox>
                <TagBox>
                    <Subtitle>Unsearched</Subtitle>
                    <TagList>
                        {unsearchedTags.map(tag => (
                            <Tag key={tag.id}
                                onClick={() => select(tag)}
                                $selected={isSelected(tag)}>{tag.name}</Tag>
                        ))}
                    </TagList>
                </TagBox>
            </TagsContainer>
        </Body>

    </>)
}

export default Writing;