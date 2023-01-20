import { useEffect } from "react";
import { useState } from "react";
import { loadCart, removeItemFromCart } from "./helpers/cart_helper";

// eslint-disable-next-line no-unused-vars
const CardForCartPage = ({
  id,
  imageUrl,
  name,
  price,
  description,
  setReload,
  reload,
}) => {
  const removeItem = () => {
    removeItemFromCart(id);
    setReload(!reload);
  };
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <img src={imageUrl} alt="rover" />
        </div>
        <div className="card-body">
          <h4>{name}</h4>
          <span>${price}</span>
          <p>{description.slice(0, 70)}...</p>
          <button
            className="bg-red-700 text-white px-1 rounded-full"
            onClick={removeItem}
          >
            &#10005;
          </button>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setCartItems(loadCart());
  }, [reload]);

  const createOrder = async () => {
    const items = JSON.parse(localStorage.getItem("cart"));
    items.map(async (item) => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { product_id: item.id, user_id: 1 } }),
      };
      try {
        const response = await fetch(
          `http://localhost:1337/api/orders`,
          requestOptions
        );
        const resp = await response.json();

        // empty the local storage
        localStorage.removeItem("cart");
        setReload(!reload);
        return resp;
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <>
      <h1 className="text-5xl flex justify-center m-5 font-bold">Your Bag</h1>
      <div className="flex justify-center">
        {cartItems
          ? cartItems.map((item, i) => {
              return (
                <CardForCartPage
                  id={item.id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  description={item.description}
                  category={""}
                  key={i}
                  setReload={setReload}
                  reload={reload}
                ></CardForCartPage>
              );
            })
          : ""}
      </div>
      <div className="flex justify-center">
        <button className="add-to-cart" onClick={createOrder}>
          PLACE ORDER
        </button>
      </div>
    </>
  );
};

export default CartPage;
