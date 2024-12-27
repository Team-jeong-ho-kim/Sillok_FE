import { FeedDetail } from "@/components/Feed/feedDetail";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { useIndexedDB } from "react-indexed-db-hook";
import { FeedResponse } from "@/apis/feed/type";
import DOMPurify from "dompurify";

export const FeedDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getByID } = useIndexedDB("feed");
  const [feed, setFeed] = useState<FeedResponse | null>(null);
  const [renderedContent, setRenderedContent] = useState<string>("");

  useEffect(() => {
    const fetchFeed = async () => {
      if (!id) return;

      try {
        const feedData = await getByID(Number(id));
        if (!feedData) {
          console.error("Feed 데이터를 찾을 수 없습니다.");
          return;
        }
        setFeed(feedData);
        await convertMarkdownToHtml(feedData.content);
      } catch (error) {
        console.error("Feed 데이터를 로드하는 중 오류 발생:", error);
      }
    };

    fetchFeed();
  }, [id, getByID]);

  const convertMarkdownToHtml = async (markdown: string) => {
    try {
      const processed = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(markdown);

      const sanitizedHtml = DOMPurify.sanitize(processed.toString());
      setRenderedContent(sanitizedHtml);
    } catch (error) {
      console.error("Markdown 변환 오류:", error);
    }
  };

  if (!feed) {
    return <p>Loading...</p>;
  }

  return (
    <_Container>
      <FeedDetail
        title={feed.title}
        userName={feed.userName}
        createdAt={feed.createdAt}
        content={
          <_Content
            dangerouslySetInnerHTML={{
              __html: renderedContent
            }}
          />
        }
      />
    </_Container>
  );
};

const _Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const _Content = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 1.5em 0 0.5em;
  }

  /* p {
    margin: 1em 0;
  } */

  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 0.8em;
  }
`;