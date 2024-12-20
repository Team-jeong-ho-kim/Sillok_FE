import styled from "@emotion/styled";
import { MainFeed, Search } from "@/components";
// import { Login } from "@/components/login/login";
import { useEffect, useRef, useState } from "react";

export const Home = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const loginRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (isLoginVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    setIsLoginVisible(!!loginRef.current);
  }, []);

  return (
    <_Wrapper>
      {/* {isLoginVisible && <_Backdrop />}
      <div ref={loginRef}>
        <Login />
      </div> */}
      <_MainContainer>
        <Search />
        {/* <SkillSearch /> */}
        <MainFeed />
      </_MainContainer>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  position: relative;
  width: 100vw;
  padding-bottom: 50px;
  overflow: hidden;
`;

// const _Backdrop = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   backdrop-filter: blur(5px);
//   background: rgba(255, 255, 255, 0.1);
//   z-index: 999;
// `;

const _MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 122px;
  margin-top: 70px;
  position: relative;
  z-index: 2;
`;
