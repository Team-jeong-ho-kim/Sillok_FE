import styled from "@emotion/styled";

interface IProp {
  title?: string;
  content?: React.ReactNode;
  createdAt?: string;
  userName?: string;
}

export const FeedDetail = ({ title, content, createdAt, userName }: IProp) => {
  return (
    <_Wrapper>
      <_Header>
        <_Title>{title || "제목 없음"}</_Title>
        <_Meta>
          <span>{userName || "이름 없음"}</span>
          <span>{createdAt || "날짜 없음"}</span>
        </_Meta>
      </_Header>

      <_Content>{content}</_Content>
    </_Wrapper >
  );
};

const _Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
`;

const _Header = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 16px;
  margin-bottom: 20px;
  word-wrap: break-word;
  word-break: break-word;
`;

const _Title = styled.h1`
  color: #212529;
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: 48px;
`;

const _Meta = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: #666666;
  display: flex;
  gap: 16px;

  & :first-child {
    display: inline-block;
    color: #495057;
    font-weight: 700;
  }
  & :last-child {
    color: #495057;
    font-weight: 400;
  }
`;

const _Content = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #444444;
  white-space: pre-wrap; /* 줄바꿈 및 공백 유지 */
`;
