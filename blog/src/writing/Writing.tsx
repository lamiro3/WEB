import { useEffect, useState } from "react";
import ReactMakdown from "react-markdown"
import styled, { keyframes } from "styled-components";
import TagSearch from "./TagSearch";
import { Tag } from "../public/Tags";
import Search from "../public/Search";
import { newContent } from "../api/contents";
import getDate from "../public/getDate";
import { useNavigate } from "react-router-dom";
import ImgUploader from "./ImageUploader";

const BtnHoverAnimation = (before: string, after: string) => keyframes`
  0% {
    background-color: ${before};
  }  

  100% {
    background-color: ${after};
  }
`;

interface TagIF {
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
    overflow-y: auto;

    margin-top: 3.3rem;
    height: calc(100vh - 2rem);
    min-width: 80vw;


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
        & > span {
        display: flex;
        align-items: center;
        gap: 8.5rem;
    }
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

/* Img */

const ImgContainer = styled(Card)``;

/* post */

const PostContainer = styled(Card)`
    & > span {
        display: flex;
    }

    margin-bottom: 5rem;
    padding-bottom: 4rem;
`;

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    & > ${Subtitle} {
        margin-bottom: 2rem;
    }
`;

const PreviewContainer = styled.div`
    width: 60rem;
    min-height: 20rem;

    margin: 0 4rem 3rem 4rem;
    padding: 1rem;

    overflow-y: auto;

    border: 0.1rem solid black;
    border-radius: 10px;
`;

const PostInput = styled.textarea.attrs({placeholder: "내용을 입력하세요..."})`
    width: 60rem;
    min-height: 20rem;
    margin: 3rem 4rem;
    padding: 1rem;
    
    font-size: 15px;

    border: 0.1rem solid black;
    border-radius: 10px;
`;

const Btn = styled.button`
    width: 5rem;
    height: 2.5rem;
    border: 0.1rem solid black;
    border-radius: 0.5rem;

    float: right;

    background-color: #0044ff;
    color: white;

    &:hover {
        animation: ${BtnHoverAnimation("#0044ff", "#376cff")} 0.3s;
        background-color: #376cff;
    }

    &:not(:hover) {
        animation: ${BtnHoverAnimation("#376cff", "#0044ff")} 0.3s;
        background-color: #0044ff;
    }
`;

function Writing() {
    const navigate  = useNavigate();

    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");

    const [searchedTag, setSearchedTag] = useState("");
    const [tags, setTags] = useState<TagIF[]>([]);
    const [selectedTags, setSelectedTags] = useState<TagIF[]>([]);

    const [images, setImages] = useState<{ file: File, preview: string}[]>([]);

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
    
    // 태그 선택 toggle event
    const select = (tag: TagIF) => {
    setSelectedTags(prev =>
        prev.some(t => t.id === tag.id) 
        ? prev.filter(t => t.id !== tag.id) // 이미 선택한 태그라면 제외
        : [...prev, tag] // 선택하지 않았다면 포함
    );};

    // 태그 선택 확인 여부
    const isSelected = (tag: TagIF) =>
        selectedTags.some(t => t.id === tag.id);

    // 업로드한 사진 클릭 시 post에 사진 삽입
    const insertImageToPost = (path: string, index: number) => {
        // post에 ![img0] 꼴로 삽입
        setPost(prev => prev + `\n\n![image${index}](${path})\n\n`);
    }

    // 콘텐츠 제출 시 event (서버로 전달)
    const submitContent = async () => {
        const { year, month, day } = getDate();
        console.log(month);
        try {
            const data = await newContent(
            Date.now(), 
            title === "" ? "제목 없음" : title , 
            post, 
            post.substring(0, 30),
            `${year}-${month}-${day}`, 
            selectedTags,
            images);

            localStorage.setItem('content', JSON.stringify(data));
            navigate("/");

        } catch (error) {
            alert("ERROR!");
            console.log(error);
        }
    }

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
                        placeholder={"제목을 입력하세요..."}
                    />
            </TitleContainer>
            </Card>

            <TagsContainer>
                <span>
                    <SectionTitle>Tags</SectionTitle>
                    <TagSearch searchedTerm={searchedTag}
                            onSearchedTerm={setSearchedTag}
                            tags={tags}
                    />
                </span>

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

            <ImgContainer>
                    <Subtitle>Img</Subtitle>
                    <ImgUploader images={images} onImages={setImages} onImageClick={insertImageToPost}/>
            </ImgContainer>

            <PostContainer>
                <Subtitle>Post</Subtitle>
                <EditorContainer>
                    <PostInput value={post} onChange={((e) => setPost(e.target.value))}/>
                    <Subtitle>Preview</Subtitle>
                    <PreviewContainer>
                        <ReactMakdown urlTransform={(uri) => uri}>
                            {post}
                        </ReactMakdown>
                    </PreviewContainer>
                </EditorContainer>
                <Btn type="button" onClick={submitContent}>Submit</Btn>
            </PostContainer>
        </Body>
    </>
    );
}

export default Writing;