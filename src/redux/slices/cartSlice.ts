import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getItemFromLS } from "../../utils/getItemFromLS";
import { countTotalPrice } from "../../utils/countTotalPrice";

export type TCartItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  size: number;
  count: number;
  imageUrl: string;
};

interface CartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

const cartInfo = getItemFromLS();

const initialState: CartSliceState = {
  totalPrice: cartInfo.totalPrice,
  items: cartInfo.items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const CartItemByIdSelector = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const {
  addItem,
  removeItem,
  clearCart,

  minusItem,
} = cartSlice.actions;

export default cartSlice.reducer;
