import styled from "@emotion/styled";
import React, { useState } from "react";
import { usePostFeed } from "../apis/uploadFeed/index";

export const FeedUploadPage = () => {
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null); // 파일 상태

  // Form 상태
  const [, setForm] = useState({ value: "" });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      // 이미지 파일만 선택하도록 검증
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile); // 이미지 파일을 상태에 저장
      } else {
        alert("이미지 파일만 업로드 가능합니다.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // 먼저 JSON 데이터를 추가
    const requestData = {
      title,
      content,
      userName,
      createdAt,
    };
    formData.append("request", new Blob([JSON.stringify(requestData)], {
      type: 'application/json'
    }));

    // 그 다음 파일 추가
    if (file) {
      formData.append("file", file);
    }

    // FormData 내용 확인
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    mutate(formData);
  };

  // usePostFeed 훅 사용
  const { mutate } = usePostFeed(setForm);

  // content에서 \n을 <br>로 변환하는 함수
  const formatContent = (text: string) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <_Wrapper>
      <h1>postman 노가다 재밌었엉??</h1>
      <_Form onSubmit={handleSubmit}>
        <_Input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <_Input
          type="text"
          placeholder="이름"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <_Input
          type="text"
          placeholder="날짜 (e.g., 2024-12-26)"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
        <_Textarea
          placeholder="내용.."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 이미지 파일만 업로드 가능하도록 설정 */}
        <_FileInput
          type="file"
          accept="image/*" // 오로지 이미지 파일 선택 가능
          onChange={handleFileChange}
        />

        <_SubmitButton type="submit">post!!</_SubmitButton>
      </_Form>

      <h3>입력한 내용 미리보기:</h3>
      <div>{formatContent(content)}</div>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
`;

const _Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const _Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const _Textarea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 150px;
  resize: vertical;
`;

const _FileInput = styled.input`
  margin: 10px 0;
  padding: 10px;
`;

const _SubmitButton = styled.button`
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
