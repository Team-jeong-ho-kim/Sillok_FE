import styled from "@emotion/styled";
import { SearchIcon, SearchIconWhite } from "@/assets/main";

export const Search = () => {

  return (
    <_SearchContainer>
      <div style={{ width: "92%" }}>
        <img
          src={SearchIcon}
          alt=""
          width={"24px"}
        />
        <input type="text" placeholder="포스트 제목/내용을 검색해보세요" />
      </div>
      <div style={{
        display: "flex",
        gap: "4px",
        background: "#4E331F",
        borderRadius: "40px",
        color: "#FFF",
        padding: "8px 17px 8px 20px",
        cursor: "pointer"
      }}>
        <span style={{ lineHeight: "1.25" }}>검색</span>
        <img
          src={SearchIconWhite}
          alt=""
        />
      </div>
    </_SearchContainer>
  );
}

const _SearchContainer = styled.div`
  width: 74.875rem;
  border-bottom: 1px solid #B0B0B0;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  
  > div {
    display: flex;
  }
  > div > input::placeholder {
    color: #969393;
    font-family: Pretendard;
    font-size: 18px;
  }

  > div > input {
    width: 100%;
    border: transparent;
    font-size: 18px;
    padding: 6.5px 0 6.5px 1rem;
  }
`;