import { ICategory } from "types/CategoryType";

interface CategoryListProps {
  [key: string]: ICategory;
}

export const categoryList:CategoryListProps = {
  "Work": {
    status: "Work",
    placeholder: "오늘 할일을 입력해라",
  },
  "Travel": {
    status: "Travel",
    placeholder: "읭?",
  },
}
  