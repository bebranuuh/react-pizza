import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get(
          "https://663a30f01ae792804bee69ba.mockapi.io/items/" + id
        );
        setPizza(res.data);
      } catch (error) {
        console.log(error);
        alert("Проищошла ошибка. Переходим на главную...");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <h1>{pizza.title}</h1>
      <img src={pizza.imageUrl} alt="pizzaImg" />
      <h2>{pizza.price} ₽</h2>
    </div>
  );
};

export default FullPizza;
