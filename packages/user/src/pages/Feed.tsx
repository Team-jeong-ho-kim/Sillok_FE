import { MainFeed } from "@/components/Feed/mainFeed";
import { NavBar } from "@/components/Feed/navBar"
import styled from "@emotion/styled";

export const Feed = () => {
  return (
    <_Wrapper>
      <_MainContainer>
        <NavBar />
        <MainFeed />
      </_MainContainer>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  width: 100vw;
`;

const _MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 18px;
  margin-top: 70px;
`;