import styled from "@emotion/styled";

const categories = [
  { name: "java", text: "Java" },
  { name: "spring", text: "Spring" },
  { name: "aws", text: "AWS" },
  { name: "git", text: "Git" },
  { name: "oracle", text: "Oracle" },
  { name: "dbms/rdbms", text: "DBMS/RDBMS" },
  { name: "sales management", text: "영업관리" },
  { name: "business", text: "영업" },
  { name: "photoshop", text: "Photoshop" },
];

type Prop = {
  onSelect: (category: string) => void;
  category: string;
};

export const Categories = ({ onSelect, category }: Prop) => {
  return (
    <CategoryWrapper>
      {categories.map((v) => (
        <CategoryItem
          key={v.name}
          active={category === v.name}
          onClick={() => onSelect(v.name)}
        >
          {v.text}
        </CategoryItem>
      ))}
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div`
  display: flex;
  height: 36px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CategoryItem = styled.div<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 40px;
  border: 1px solid ${({ active }) => (active ? "#A66E38" : "#b0b0b0")};
  background-color: ${({ active }) => (active ? "#A66E38" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#645e5e")};
  cursor: pointer;
  &:hover {
    background-color: ${({ active }) => (active ? "" : "#f6f6f6")};
  }
`;
