import { ProfileIcon } from "@/assets/header";
import styled from "@emotion/styled";

type IProp = {
  title: string,
  content: string,
  file: string,
  userName: string,
  createdAt: string,
}

export const FeedCard = ({ userName, createdAt, file, title, content }: IProp) => {
  return (
    <_CardWrapper>
      <_UpperWrapper>
        <div>
          <img
            src={ProfileIcon}
            alt=""
            style={{
              width: "30px",
            }}
          />
          <span>{userName}</span>
        </div>
        <span>{createdAt}</span>
      </_UpperWrapper>
      <ImgDiv imageUrl={file} />
      <_TextWrapper>
        <p>{title}</p>
        <p>{content}</p>
      </_TextWrapper>
      <div></div>
    </_CardWrapper >
  );
}

const _CardWrapper = styled.li`
  width: 340px;
  height: auto;
  min-height: 214px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  gap: 20px;
  border-radius: 18px;
  border: 0.4px solid #B0B0B0;
  padding: 24px;
  cursor: pointer;

  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, .04);
  transition: box-shadow .25s ease-in, transform .25s ease-in;

  &:hover {
    transform: translateY(-8px); /* 카드가 위로 10px 올라감 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* hover 시 더 강한 그림자 */
  }

  > :last-child {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: end;
    color: #9E7042;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.28px;
    margin-top: 34px;
  }
`;

const _UpperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  > div > span { 
    color: #1B1B1B;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  > span {
    color: #969393;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const ImgDiv = styled.div<{ imageUrl: string }>`
  border-radius: 12px;
  background: ${({ imageUrl }) => `url(${imageUrl})`} lightgray 50% / cover no-repeat;
  width: 292px;
  height: 174px;
  flex-shrink: 0;
`;

const _TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  > :first-child {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    align-self: stretch;
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  > :last-child {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    align-self: stretch;
    overflow: hidden;
    color: #7D7878;
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`