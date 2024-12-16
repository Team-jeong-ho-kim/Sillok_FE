import { ReSearchIcon, SearchIconGray } from "@/assets/main";
import styled from "@emotion/styled";
import { SetStateAction, useState } from "react";
import { useCallback } from "react";
import { Categories } from "./categories";

export const SkillSearch = () => {
  const [category, setCategory] = useState('')
  const onSelect = useCallback((Category: SetStateAction<string>) => setCategory(Category), [])
  return (
    <_Wrapper>
      <p style={{
        color: "#645E5E",
      }}>&lt;/&gt;기술스택</p>
      <div
        style={{
          width: "204px",
          padding: "8px 24px 8px 16px",
          display: "flex",
          justifyContent: "center",
          border: "1px solid #B0B0B0",
          borderRadius: "40px",
          gap: "5px"
        }}
      >
        <img
          src={SearchIconGray}
          alt=""
        />
        <input
          type="text"
          placeholder="직무 스킬을 검색해보세요"
        />
      </div>
      <Categories category={category} onSelect={onSelect} />
      <div
        style={{
          padding: "6px 6px 6px 8px",
          width: "36px",
          height: "36px",
          justifyContent: "center",
          border: "1px solid #645E5E",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          flexShrink: "0",
          cursor: "pointer"
        }}
      >
        <img
          src={ReSearchIcon}
          alt=""
        />
      </div>
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  width: 74.625rem;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 125px;
  input {
    border: transparent;
  }
  input::placeholder {
    color: #B0B0B0;
  }
`;

