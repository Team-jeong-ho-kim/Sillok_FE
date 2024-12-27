import styled from "@emotion/styled";
import { FeedCard } from "./feed";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db-hook";
import { useGetFeed } from "@/apis/feed";

type IProp = {
  feedId: number;
  title: string;
  content: string;
  userName: string;
  createdAt: string;
  file: string;
};

export const MainFeed = () => {
  const { getAll, add } = useIndexedDB("feed"); // IndexedDB 데이터 관리
  const [feeds, setFeeds] = useState<IProp[]>([]); // 피드 데이터 상태
  const { data: serverFeeds, isLoading: serverLoading, isError } = useGetFeed(); // 서버 데이터 가져오기
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  // IndexedDB에서 데이터 가져오기
  useEffect(() => {
    setLoading(true);
    getAll()
      .then((localFeeds: IProp[]) => {
        setFeeds(localFeeds); // IndexedDB 데이터 설정
      })
      .catch((error) => {
        console.error("Error fetching local feeds:", error);
      })
      .finally(() => {
        setLoading(false); // 로딩 종료
      });
  }, [getAll]);

  // 서버 데이터를 IndexedDB에 저장
  useEffect(() => {
    if (serverFeeds && serverFeeds.length > 0) {
      serverFeeds.forEach((feed) => {
        add(feed).catch((error) =>
          console.error(`Error adding feed (ID: ${feed.feedId}) to IndexedDB:`, error)
        );
      });
      setFeeds(serverFeeds as IProp[]); // 최신 데이터로 상태 업데이트
    }
  }, [serverFeeds, add]);

  if (loading || serverLoading) {
    return <p>Loading...</p>; // 로딩 중일 때 표시
  }

  if (isError) {
    return <p>Error loading feed data.</p>; // 에러 발생 시 표시
  }

  return (
    <_FeedWrapper>
      {feeds.map((feed) => (
        <li key={feed.feedId}>
          <Link to={`/feed/${feed.feedId}`}>
            <FeedCard
              userName={feed.userName}
              file={feed.file}
              createdAt={feed.createdAt}
              title={feed.title}
              content={feed.content}
            />
          </Link>
        </li>
      ))}
    </_FeedWrapper>
  );
};

const _FeedWrapper = styled.ul`
  position: relative;
  display: grid;
  gap: 50px 36px;
  grid-template-columns: repeat(4, 1fr); /* 4개의 고정된 열 */
  grid-auto-rows: auto; /* 행의 높이는 컨텐츠 크기에 따라 조정 */
  list-style: none;
  padding: 0;
  margin: 0;
`;
