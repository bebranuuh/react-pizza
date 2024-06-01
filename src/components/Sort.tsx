import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort, selectSort } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sortProperty:
    | "rating&order=desc"
    | "rating&order=asc"
    | "price&order=desc"
    | "price&order=asc"
    | "title&order=asc"
    | "title&order=desc";
};

export const sortName: SortItem[] = [
  { name: "популярности (по убыванию)", sortProperty: "rating&order=desc" },
  { name: "популярности (по возрастанию)", sortProperty: "rating&order=asc" },
  { name: "цене (по убыванию)", sortProperty: "price&order=desc" },
  { name: "цене (по возрастанию)", sortProperty: "price&order=asc" },
  { name: "алфавиту (от А до Я)", sortProperty: "title&order=asc" },
  { name: "алфавиту (от Я до А)", sortProperty: "title&order=desc" },
];

export const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);

  const [isVisiblePopup, setIsVisiblePopup] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickSortItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setIsVisiblePopup(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setIsVisiblePopup(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>
          {sort.name}
        </span>
      </div>
      {isVisiblePopup && (
        <div className="sort__popup">
          <ul>
            {sortName.map((obj, i) => (
              <li
                key={i}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
                onClick={() => onClickSortItem(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
