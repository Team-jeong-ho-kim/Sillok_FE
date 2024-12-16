import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation(); // 현재 경로 가져오기

  const renderComponent = () => {
    if (location.pathname === "/save") {
      return (
        <>
          <Link to="/save">
            <_Tab
              isActive={location.pathname === "/save"}
              style={{
                padding: "14px 40px",
              }}
            >
              <span>임시저장</span>
            </_Tab>
          </Link>
        </>
      );
    }
    else {
      return (
        <>
          <Link to="/feed">
            <_Tab isActive={location.pathname === "/feed"}>
              <span>즐겨찾기한 포스트</span>
            </_Tab>
          </Link>
          <Link to="/feed/recent">
            <_Tab isActive={location.pathname === "/feed/recent"}>
              <span>최근에 읽은 포스트</span>
            </_Tab>
          </Link>
        </>
      );
    }
  }

  return (
    <_Wrapper>
      {renderComponent()}
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  width: 92rem;
  height: 52px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 3px solid #9F754B;
  margin-bottom: 62px;
`;

const _Tab = styled.div<{ isActive: boolean }>`
  padding: 14px 24px;
  background: ${({ isActive }) => (isActive ? "#A66E38" : "#FFF")}; /* 활성화 상태에 따라 색상 변경 */
  border-radius: 14px 14px 0px 0px;
  cursor: pointer;

  > span {
    color: ${({ isActive }) => (isActive ? "#FFF" : "#A66E38")}; /* 활성화 상태에 따라 텍스트 색상 변경 */
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
