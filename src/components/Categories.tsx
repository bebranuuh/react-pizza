import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryTypeIndex,
  selectCategoryTypeIndex,
} from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const categoryTypeIndex = useSelector(selectCategoryTypeIndex);

  const onClickCategory: (index: number) => void = React.useCallback(
    (index) => {
      dispatch(setCategoryTypeIndex(index));
    },
    []
  );

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={categoryTypeIndex === index ? "active" : ""}
            key={index}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
