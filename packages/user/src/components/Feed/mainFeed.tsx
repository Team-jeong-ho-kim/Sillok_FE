import styled from "@emotion/styled";
import { FeedCard } from "./feed";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { openDB } from "@/hooks/openDB";
import { Feed } from "@/pages";

interface Feed {
  id?: number;
  title: string;
  content: string;
  userName: string;
  createdAt: string;
  heart: number;
}

export const MainFeed = () => {
  const dbName = "FeedDB";
  const storeName = "Feeds";
  const [feeds, setFeeds] = useState<Feed[]>([]);

  // IndexedDB에 데이터 저장
  const saveFeedToIndexedDB = async (feed: Feed) => {
    try {
      const db = await openDB(dbName, storeName);
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      const request = store.add(feed);
      request.onsuccess = () => {
        console.log("IndexedDB에 저장 성공:", feed);
      };

      request.onerror = (e: any) => {
        console.error("IndexedDB 저장 오류:", e);
      };
    } catch (err) {
      console.error("IndexedDB 연결 실패:", err);
    }
  };

  // IndexedDB에서 데이터 조회
  const getAllFromIndexedDB = async (): Promise<Feed[]> => {
    try {
      const db = await openDB(dbName, storeName);
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);

      return new Promise((resolve, reject) => {
        const request = store.getAll(); // IndexedDB 요청

        request.onsuccess = () => {
          resolve(request.result as Feed[]); // 요청 성공 시 결과 반환
        };

        request.onerror = (e) => {
          console.error("IndexedDB 조회 오류:", e);
          reject(e); // 오류 시 Promise 거부
        };
      });
    } catch (err) {
      console.error("IndexedDB 조회 중 예외 발생:", err);
      return [];
    }
  };

  // 서버에서 데이터 수신
  const fetchFeedsFromServer = async () => {
    try {
      // 서버에서 피드 데이터를 가져온다고 가정
      const serverFeeds: Feed[] = [
        {
          id: 1,
          title: "New Feed",
          content: "This is a new feed",
          userName: "User1",
          createdAt: new Date().toISOString(),
          heart: 0,
        },
      ];

      // IndexedDB에 저장
      for (const feed of serverFeeds) {
        await saveFeedToIndexedDB(feed);
      }

      toast.success("서버에서 데이터를 받아왔습니다.");
    } catch (err) {
      console.error("서버 데이터 가져오기 실패:", err);
      toast.error("서버에서 데이터를 가져오는 중 문제가 발생했습니다.");
    }
  };

  // 컴포넌트 마운트 시 IndexedDB와 서버 데이터 동기화
  useEffect(() => {
    const fetchFeeds = async () => {
      // IndexedDB에서 데이터 가져오기
      const indexedDBFeeds = await getAllFromIndexedDB();
      setFeeds(indexedDBFeeds);

      // 서버에서 데이터 가져오기
      await fetchFeedsFromServer();

      // IndexedDB에서 업데이트된 데이터 가져오기
      const updatedFeeds = await getAllFromIndexedDB();
      setFeeds(updatedFeeds);
    };

    fetchFeeds();
  }, []);

  return (
    <_FeedWrapper>
      {feeds.map((feed) => (
        <FeedCard
          key={feed.createdAt}
          userName={feed.userName}
          createdAt={feed.createdAt}
          title={feed.title}
          content={feed.content}
          heart={feed.heart}
        />
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
`;
