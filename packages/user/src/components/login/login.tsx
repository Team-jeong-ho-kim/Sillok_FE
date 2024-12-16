import { CancleIcon } from "@/assets/login";
import styled from "@emotion/styled";

export const Login = () => {
  return (
    <_Wrapper>
      <_ImgWrapper>
        <img
          src={CancleIcon}
          alt=""
          style={{ cursor: "pointer" }}

        />
      </_ImgWrapper>
      <_TextWrapper>
        <p>로고</p>
        <p>재학생은 xquare계정으로,
          <br />졸업생은 discord계정으로 로그인하세요</p>
      </_TextWrapper>
      <_FormWrapper action="">
        <div>
          <input type="text" placeholder="아이디" />
        </div>
        <div>
          <input type="password" placeholder="비밀번호" />
        </div>
      </_FormWrapper>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 999;
  width: 450px;
  height: 560px;
  border: 1px solid #969393;
  border-radius: 16px;
  background: #FFF;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  > img {
    cursor: pointer;
  }
`;

const _FormWrapper = styled.form`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  div {
    border-radius: 12px;
    border: 1px solid #969393;
    width: 350px;
    height: 55px;
    padding: 18px 0 18px 20px;
  }
  input {
    border: transparent;
    color: var(--Gray-70, #645E5E);
    font-family: Pretendard;
    width: 100%;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  input::placeholder {
    color: #645E5E;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const _TextWrapper = styled.div`
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 17px 0 31px 0;
> :first-child {
  color: #000;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
> :last-child {
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
`;

const _ImgWrapper = styled.div`
  display: flex;
  justify-content: end;
`;