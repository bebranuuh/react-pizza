import { countTotalPrice } from "./countTotalPrice";

export const getItemFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = countTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
