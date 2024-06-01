import { TCartItem } from "../redux/slices/cartSlice";

export const countTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum: number, item: any) => sum + item.count, 0);
};
