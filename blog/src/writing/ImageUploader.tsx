import styled, { keyframes }from "styled-components";

const BtnHoverAnimation = (before: string, after: string) => keyframes`
  0% {
    background-color: ${before};
  }  

  100% {
    background-color: ${after};
  }
`;

interface ImgProps {
    images: {file:File, preview:string}[];
    onImages: React.Dispatch<React.SetStateAction<{file:File, preview:string}[]>>;
    onImageClick: (path: string, index: number) => void; // 이미지 클릭할 때 post에 삽입하는 callback func
}

const Uploader = styled.input.attrs({type:'file', // 파일 get
                                    accept:'image/jpg, image/png, image/jpeg, image/gif' // 업로드 가능한 확장자 유형
                                    })`
    display: none;
`;

const UploadBtn = styled.label`
    display: flex;
    float: right;

    width: 1.5rem;
    height: 1.5rem;

    padding: auto;
    margin-left: 3rem;

    align-items: center;
    justify-content: center;    

    font-size: 13px;
    font-weight: 2px;

    border-radius: 0.5rem;
    border: 2px solid black;

    color: white;
    background-color: #ff3838;

    &:hover {
        animation: ${BtnHoverAnimation("#ff3838", "#ff5e5e")} 0.3s;
        background-color: #ff5e5e;
    }

    &:not(:hover) {
        animation: ${BtnHoverAnimation("#ff5e5e", "#ff3838")} 0.3s;
        background-color: #ff3838;
    }
`;

const Body = styled.div`
    overflow-y: auto;
    margin-top: 3rem;
`;

const ImgContainer = styled.div`
    position: relative; // z-index 기준점
    display: flex;

    width: 8rem;
    height: 6rem;

    margin-right: 1rem;

    border: 2px solid black;
    border-radius: 6px;
    
    overflow: hidden;
    float: left;
`;

const ImgList = styled.div`
    margin: 0 auto;
`;

const Img = styled.img`
    width: 100%;
    height:100%;

    object-fit: contain;
    z-index:100;

    cursor: pointer; // 클릭 가능
    transition: filter 0.2s ease;

    &:hover {
        filter: brightness(0.7);
    }
`;

const DeleteBtn = styled.button`
    display: flex;
    position: absolute;

    width: 1rem;
    height: 1rem;

    background-color: red;
    color: white;

    font-size: 10px;
    align-items: center;
    justify-content: center;

    border: 2px solid white;
    border-radius: 0.5rem;
    z-index: 150;
`;

function ImgUploader({images, onImages, onImageClick}:ImgProps){
    const addImages = (event:React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        // null일 수도 있으므로
        if (!files) return;

        const newImages = Array.from(files).map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        onImages(prev => [...prev, ...newImages]);

        if (images.length > 20) {
            alert("첨부 사진 개수는 최대 20개 입니다!");
            images.slice(0, 20);
        }
    }

    const deleteImages = (id:number) => {
        onImages(images.filter((_, idx) => idx !== id));
    }
    
    return (<>
        <Uploader id="imageUpload" multiple onChange={addImages}/>
        <UploadBtn htmlFor="imageUpload">+</UploadBtn>
        <Body>
            <ImgList>
                {images.map((imgObj, id) => (
                <ImgContainer key={id}>
                    <Img src={imgObj.preview} alt={`${imgObj.preview}-${id}`} onClick={() => onImageClick(imgObj.preview, id)}/>
                    <DeleteBtn onClick={() => deleteImages(id)}>X</DeleteBtn>
                </ImgContainer>
                ))}
            </ImgList>
        </Body>
    </>
    );
}

export default ImgUploader;