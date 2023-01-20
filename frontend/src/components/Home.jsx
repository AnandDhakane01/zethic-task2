import Card from "./Card";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/products`);
        const resp = await response.json();
        if (resp.data) {
          setProducts(resp.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1 className="text-5xl m-5 flex justify-center font-bold">PRODUCTS</h1>
      <div className="flex flex-wrap justify-around">
        {products
          ? products.map((item, i) => {
              const id = item.id;
              item = item.attributes;
              return (
                <Card
                  id={id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  description={item.description}
                  category={""}
                  key={i}
                ></Card>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Home;
