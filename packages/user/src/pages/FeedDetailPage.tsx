import { FeedDetail } from "@/components/Feed/feedDetail";
import { openDB } from "@/hooks/openDB";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

type Feed = {
  id?: number;
  title: string;
  content: string;
  userName: string;
  createdAt: string;
};

export const FeedDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [feed, setFeed] = useState<Feed | null>(null);
  const [renderedContent, setRenderedContent] = useState<string>("");

  useEffect(() => {
    const fetchFeed = async () => {
      if (!id) return;

      const db = await openDB("feedDB", "Feeds");
      const transaction = db.transaction("Feeds", "readonly");
      const store = transaction.objectStore("Feeds");

      const request = store.get(Number(id));
      request.onsuccess = () => {
        const feedData = request.result as Feed;
        setFeed(feedData);
        convertMarkdownToHtml(feedData.content); // Markdown -> HTML 변환
      };
      request.onerror = (e) => console.error("Feed 로드 중 오류:", e);
    };

    fetchFeed();
  }, [id]);

  // Markdown -> HTML 변환 함수
  const convertMarkdownToHtml = async (markdown: string) => {
    try {
      const processed = await unified()
        .use(remarkParse) // Markdown을 파싱하여 AST로 변환
        .use(remarkHtml) // AST를 HTML로 변환
        .process(markdown);

      setRenderedContent(processed.toString()); // HTML 문자열 설정
    } catch (error) {
      console.error("Markdown 변환 오류:", error);
    }
  };

  return (
    <_Container>
      <Title>{feed?.title}</Title>
      <FeedDetail
        title={feed?.title}
        userName={feed?.userName}
        createdAt={feed?.createdAt}
        content={renderedContent} // 변환된 HTML을 전달
      />
    </_Container>
  );
};

const _Container = styled.div`
  /* 스타일 정의 */
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
