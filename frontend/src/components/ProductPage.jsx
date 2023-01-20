import { useEffect } from "react";
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { addItemToCart } from "./helpers/cart_helper";
import "./styles/productPage.css";

const ProductPage = () => {
  const [counter, setCounter] = useState(1);
  const [product, setProduct] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/products/${id}`
        );
        const resp = await response.json();
        if (resp.data) {
          setProduct({ ...resp.data.attributes, id: id });
          console.log("product", product);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addItem = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = () => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };

  return (
    <>
      {getARedirect()}
      {product ? (
        <div className="">
          <div className="flex justify-center product-page">
            <div className="product-image">
              <img src={product.imageUrl} className="object-contain" alt="" />
            </div>
            <div className="details">
              <div>
                <h1 className="text-3xl">{product.name}</h1>
              </div>
              <div>
                <h4 className="price">${product.price}</h4>
              </div>
              <div className="price-buttons">
                <label>Size:</label>
                <select name="" className="dropdown">
                  <option value="">S</option>
                  <option value="">M</option>
                  <option value="">L</option>
                  <option value="">XL</option>
                </select>
                <div className="inline counter">
                  <button
                    onClick={() => {
                      setCounter(counter - 1);
                    }}
                  >
                    -
                  </button>
                  <span className="counter-txt">{counter}</span>
                  <button
                    onClick={() => {
                      setCounter(counter + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="add-to-cart"
                  style={{ backgroundColor: "#47bcd4", border: "none" }}
                  onClick={addItem}
                >
                  ADD TO CART
                </button>
              </div>

              <div className="description">
                <h2>DESCRIPTION</h2>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductPage;
