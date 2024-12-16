import styled from "@emotion/styled";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { PostButtonIcon, BellIcon, ProfileIcon, ArrowIcon, Logo } from "@/assets/header";
import { toast } from "react-toastify";

export const Header = () => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [, setVisibility] = useState<boolean>(false);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const handleSelect = (option: string) => {
    navigate(option)
    setSelected(option);
    if (detailsRef.current) {
      detailsRef.current.open = false; // details 요소 닫기
    }
  };

  return (
    <>
      <HeaderWrapper>
        <UpperHeader></UpperHeader>
        <UnderHeader>
          <Link
            onClick={() => setVisibility(false)}
            to="/"
            style={{
              width: "104px",
              height: "42px",
              margin: "auto 0"
            }}
          >
            <img
              src={Logo}
              alt=""
            />
            <div style={{ width: "180px", backgroundColor: "#000" }}></div>
          </Link>
          {/* <div>
            <Link to="">
              <PostButton>
                <img
                  src={PostButtonIcon}
                  alt=""
                />
                <p>
                  포스트 작성
                </p>
              </PostButton>
            </Link>
            <Link to="">
              <img
                src={BellIcon}
                alt=""
              />
            </Link>
            <ProfileDiv>
              <Link to="">
                <img
                  src={ProfileIcon}
                  alt=""
                />
              </Link>
              <ProfileDetails ref={detailsRef}>
                <summary>
                  <img
                    src={ArrowIcon}
                    alt=""
                  />
                </summary>
                <ul>
                  <li onClick={() => handleSelect("feed")}>피드</li>
                  <li>마이페이지</li>
                  <li onClick={() => handleSelect("save")}>임시저장</li>
                  <li>설정</li>
                  <li>로그아웃</li>
                </ul>
              </ProfileDetails>
            </ProfileDiv>
          </div> */}
        </UnderHeader>
      </HeaderWrapper>
      <Outlet />
    </>
  );
}

const HeaderWrapper = styled.div`
  width: 100vw;
`;

const UpperHeader = styled.div`
  width: 100%;
  height: 41px;
  flex-shrink: 0;
  background: #A66E38;
`;

const UnderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 71px;
  border-bottom: 1px solid #E3E3E3;
  background: #FFF;
  padding: 0 11.875em;
  > div {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;

const PostButton = styled.div`
  display: flex;
  width: 160px;
  height: 40px;
  padding: 6px 18px 5px 15px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 20px;
  border: 1.5px solid #969393;
`;

const ProfileDetails = styled.details`
  position: relative;
  display: inline-block;
  cursor: pointer;

  ul {
    position: absolute;
    top: calc(100% + 20px); /* summary 아래에 8px 간격 */
    left: 50%; /* 부모(summary) 기준 가로 중앙 정렬 */
    transform: translateX(-50%);
    display: flex;
    width: 110px;
    padding: 10px;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
    z-index: 1000; /* 드롭다운이 다른 요소 위에 표시되도록 */
    border-radius: 6px;
    border: 1px solid #E3E3E3;
    background: #FFF;

    & > li {
      padding: 4px;
      color: var(--Gray-70, #645E5E);
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    & > li:hover {
      border-radius: 2px;
      background: #F6F6F6;
    }
  }

  summary {
    list-style: none; /* 기본 화살표 제거 */
    cursor: pointer;
    position: relative;
    & img {
      content: "";
      position: absolute;
      top: -0.4em;
      transition: 0.25s transform;
    }
  }
  
  &[open] img {
  transform: rotate(180deg); /* 화살표 아래로 회전 */
  }
`;

const ProfileDiv = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;