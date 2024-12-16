import styled from "@emotion/styled";
import { FeedCard } from "./feed";
import { ArrowIcon } from "@/assets/header";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

interface Feed {
  feedId: string,
  userName: string,
  title: string,
  content: string,
  createdAt: string,
  heart: number
}

export const MainFeed = () => {
  const location = useLocation();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [selected, setSelected] = useState("추천순");
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [error, setError] = useState<string | null>();
  const handleSelect = (option: string) => {
    setSelected(option);
    if (detailsRef.current) {
      detailsRef.current.open = false; // details 요소 닫기
    }
  };

  useEffect(() => {
    const eventSource = new EventSource('https://192.168.1.38/feed');
    eventSource.onopen = () => {
      console.log('SSE 연결 성공');
      toast.success("SSE 연결 성공");
      setError(null);
    };

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        // JSON 데이터 파싱
        const feedData: Feed = JSON.parse(event.data);

        // 새로운 피드 추가
        setFeeds((prevFeeds) => [...prevFeeds, feedData]);
      } catch (err) {
        console.error("JSON 파싱 에러:", err);
        toast.error("JSON 파싱 에러");
        setError("수신한 데이터를 처리하는 데 오류가 발생했습니다.");
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE 에러:", err);
      toast.error("SSE 에러");
      setError("실시간 알림 연결에 문제가 발생했습니다.");

      // 연결 종료
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);


  const renderComponent = () => {
    if (location.pathname === "/") {
      return (
        <_ArrowWrapper>
          <ArrowMenu ref={detailsRef}>
            <summary>
              <span>{selected}</span>
              <img
                src={ArrowIcon}
                alt=""
              />
            </summary>
            <ul>
              <li onClick={() => handleSelect('추천순')}>추천순</li>
              <li onClick={() => handleSelect('최신순')}>최신순</li>
              <li onClick={() => handleSelect('인기순')}>인기순</li>
            </ul>
          </ArrowMenu>
        </_ArrowWrapper>
      );
    }
  }

  return (
    <_FeedWrapper>
      {/* {renderComponent()} */}
      {feeds.map((Feed) => (
        <FeedCard
          key={Feed.feedId}
          userName={Feed.userName}
          createdAt={Feed.createdAt}
          title={Feed.title}
          content={Feed.content}
          heart={Feed.heart}
        />
      ))}
    </_FeedWrapper>
  );
}

const _FeedWrapper = styled.ul`
  position: relative;
  display: grid;
  gap: 50px 36px;
  grid-template-columns: repeat(4, 1fr); /* 4개의 고정된 열 */
  grid-auto-rows: auto; /* 행의 높이는 컨텐츠 크기에 따라 조정 */
  /* margin-top: 125px; */
`;

const ArrowMenu = styled.details`
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
    color: #645E5E;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    & img {
      content: "";
      transition: 0.25s transform;
    }
  }
  
  &[open] img {
  transform: rotate(180deg); /* 화살표 아래로 회전 */
  }
`;

const _ArrowWrapper = styled.div`
  position: absolute;
  top: -58px; /* 부모의 위쪽 */
  left: -16px; /* 부모의 왼쪽 */
  display: flex;
  width: 110px;
  height: 34px;
  padding: 10px 14px 9px 17px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #C9C9C9;
  background: #FFF;
`;