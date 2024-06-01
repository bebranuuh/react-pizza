import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Sort = {
  name: string;
  sortProperty:
    | "rating&order=desc"
    | "rating&order=asc"
    | "price&order=desc"
    | "price&order=asc"
    | "title&order=asc"
    | "title&order=desc";
};

interface FilterSliceState {
  searchValue: string;
  categoryTypeIndex: number;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryTypeIndex: 0,
  currentPage: 1,
  sort: {
    name: "популярности (по убыванию)",
    sortProperty: "rating&order=desc",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryTypeIndex(state, action: PayloadAction<number>) {
      state.categoryTypeIndex = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const selectFilterSlice = (state: RootState) => state.filterSlice;
export const selectSort = (state: RootState) => state.filterSlice.sort;
export const selectCategoryTypeIndex = (state: RootState) =>
  state.filterSlice.categoryTypeIndex;

export const { setCategoryTypeIndex, setSort, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
