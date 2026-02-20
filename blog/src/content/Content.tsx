import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import ReactMarkdown from "react-markdown";

interface TagIF {
  id: number,
  name: string
}
interface ContentIF {
  id: number,
  title: string,
  post: string,
  summary: string,
  createdAt: string,
  tags: TagIF[];
}

const Box = styled.section`
    background-color: #f8fafc;
    width: 80rem;
    margin: 0 auto 2rem auto;
    padding: 1rem 2rem;

    border: 0.1rem solid black;
    border-radius: 7px;
    box-shadow: 0.1rem 0.1rem 0.1rem 0.05rem black;
`

const Head = styled.div`
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
    margin-left: auto;
    margin-right: auto;
    margin-top: 4rem;
    width: 3rem 0;

    background-color: #94a3b8;
    min-height: 100vh;
    overflow-y: auto;
`;

const PostContainer = styled(Box)`
    margin-top: 2rem;
`;

function Content() {
    const { id } = useParams<{id: string}>();
    const [data, setData] = useState<ContentIF | null>(null);
    const [loading, setLoading] = useState(true);

    const serverURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch("/data/contents.json")
        .then(res => res.json())
        .then((contents: ContentIF[]) => {
            const tgt = contents.find(item => item.id === Number(id));
            setData(tgt || null);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);

    if (loading)
        return <Body>Loading...</Body>;

    if (!data)
        return <Body>포스트를 찾을 수 없습니다...</Body>

    return (<>
    <Head>
        <BlogName>{data.title}</BlogName>
    </Head>
    <Body>
        <PostContainer>
            <ReactMarkdown 
                urlTransform={(uri) => 
                uri.startsWith('/img')
                ? `${serverURL}${uri}`
                : uri}>
                {data.post}
            </ReactMarkdown>
        </PostContainer>
    </Body>

    </>);
}

export default Content;