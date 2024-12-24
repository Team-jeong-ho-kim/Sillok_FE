import { FeedDetail } from "@/components/Feed/feedDetail";
import { openDB } from "@/hooks/openDB";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Feed = {
  id?: number,
  title: string,
  content: string,
  userName: string,
  createdAt: string,
}

export const FeedDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [feed, setFeed] = useState<Feed | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      if (!id) return;

      const db = await openDB("feedDB", "Feeds");
      const transaction = db.transaction("Feeds", "readonly");
      const store = transaction.objectStore("Feeds");

      const request = store.get(Number(id));
      request.onsuccess = () => setFeed(request.result as Feed);
      request.onerror = (e) => console.error("Feed 로드 중 오류:", e);
    };

    fetchFeed();
  }, [id]);

  return (
    <_Container>
      <Title></Title>
      <FeedDetail title={feed?.title} userName={feed?.userName} createdAt={feed?.createdAt} content={feed?.content} />
    </_Container>
  );
};

const _Container = styled.div`
  
`;

const Title = styled.div`
  font-size: 3rem;
  line-height: 1.5;
  letter-spacing: -0.004em;
  margin-top: 0px;
  font-weight: 800;
  color: #000;
  margin-bottom: 2rem;
  word-break: keep-all;
  overflow-wrap: break-word;
`;