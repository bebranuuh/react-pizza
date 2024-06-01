import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import {
  Categories,
  Sort,
  PizzaBlock,
  Skeleton,
  Pagination,
} from "../components";

import { useSelector } from "react-redux";
import { setCurrentPage, selectFilterSlice } from "../redux/slices/filterSlice";
import { fetchPizzas, selectorPizza } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectorPizza);
  const { categoryTypeIndex, sort, currentPage, searchValue } =
    useSelector(selectFilterSlice);

  const isMounted = React.useRef(false);

  const getPizzas = async () => {
    dispatch(fetchPizzas({ categoryTypeIndex, sort, currentPage }));

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryTypeIndex, sort, currentPage, searchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryTypeIndex,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryTypeIndex, sort, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить данные</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(5)].map((_, i) => <Skeleton key={i} />)
            : items
                .filter((obj: any) =>
                  obj.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      )}

      <Pagination
        onChangePage={(number: number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};

export default Home;
