import styled from "@emotion/styled";
import { FeedCard } from "./feed";
import { useEffect, useState } from "react";
import { openDB } from "@/hooks/openDB";
import { useGetFeed } from "@/apis";

interface Feed {
  id?: number;
  title: string;
  content: string;
  userName: string;
  createdAt: string;
}

export const MainFeed = () => {
  const dbName = "FeedDB";
  const storeName = "Feeds";
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const { data } = useGetFeed();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      saveFeedToIndexedDB(data);
    }

    const fetchFeedsFromIndexedDB = async () => {
      const indexedDBFeeds = await getAllFromIndexedDB();
      setFeeds(indexedDBFeeds); // IndexedDB의 데이터를 초기 상태로 설정
    };

    fetchFeedsFromIndexedDB(); // 컴포넌트 마운트 시 IndexedDB 데이터 조회
  }, [data]);

  // IndexedDB에 데이터 저장
  const saveFeedToIndexedDB = async (feeds: Feed[]) => {
    try {
      const db = await openDB(dbName, storeName);
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      feeds.forEach((feed) => {
        const request = store.add(feed);
        request.onsuccess = () => {
          console.log("IndexedDB에 저장 성공:", feed);
        };

        request.onerror = (e: any) => {
          console.error("IndexedDB 저장 오류:", e);
        };
      });
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
        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result as Feed[]);
        };

        request.onerror = (e) => {
          console.error("IndexedDB 조회 오류:", e);
          reject(e);
        };
      });
    } catch (err) {
      console.error("IndexedDB 조회 중 예외 발생:", err);
      return [];
    }
  };

  return (
    <_FeedWrapper>
      {feeds.map((feed) => (
        <FeedCard
          key={feed.createdAt}
          userName={feed.userName}
          createdAt={feed.createdAt}
          title={feed.title}
          content={feed.content}
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
