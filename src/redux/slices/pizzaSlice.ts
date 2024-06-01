import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Sort } from "./filterSlice";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type FetchPizzasParams = {
  categoryTypeIndex: number;
  sort: Sort;
  currentPage: number;
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasParams>(
  "pizza/fetchPizzaStatus",
  async (params) => {
    const { categoryTypeIndex, sort, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://663a30f01ae792804bee69ba.mockapi.io/items?page=${currentPage}&limit=5&${
        categoryTypeIndex > 0 ? `category=${categoryTypeIndex}` : ""
      }&sortBy=${sort.sortProperty}`
    );
    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<Pizza[]>) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectorPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
