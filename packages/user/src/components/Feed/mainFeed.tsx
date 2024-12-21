import styled from "@emotion/styled";
import { FeedCard } from "./feed";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { openDB } from "@/hooks/openDB";

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
  const [, setError] = useState<string | null>();

  useEffect(() => {
    const fetchFeedsFromIndexedDB = async () => {
      const indexedDBFeeds = await getAllFromIndexedDB();
      setFeeds(indexedDBFeeds); // IndexedDB의 데이터를 초기 상태로 설정
    };

    fetchFeedsFromIndexedDB(); // 컴포넌트 마운트 시 IndexedDB 데이터 조회
  }, []);

  useEffect(() => {
    const eventSource = new EventSource("https://${import.meta.env.PROD_VITE_SERVER_URL}/v1/sse/subscribe");

    eventSource.onopen = () => {
      console.log("SSE 연결 성공");
      toast.success("SSE 연결 성공");
      setError(null);
    };

    eventSource.addEventListener("Sillok event", async (event: MessageEvent) => {
      try {
        const feedData: Feed = JSON.parse(event.data);

        // SSE에서 받은 데이터를 IndexedDB에 저장
        await saveFeedToIndexedDB(feedData);

        // IndexedDB에서 데이터를 다시 조회해서 상태 업데이트
        const updatedFeeds = await getAllFromIndexedDB();
        setFeeds(updatedFeeds);

        toast.success("새로운 피드 수신");
      } catch (err) {
        console.error("피드 데이터 처리 에러:", err);
        toast.error("피드 데이터 처리 실패");
        setError("피드 데이터를 처리하는 중 오류 발생");
      }
    });

    eventSource.onerror = (err) => {
      console.error("SSE 연결 오류:", err);
      toast.error("SSE 연결 실패");
      setError("실시간 알림 연결에 문제가 발생했습니다.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

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
