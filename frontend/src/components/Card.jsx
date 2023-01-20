import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import "./styles/Card.css";
import { addItemToCart } from "./helpers/cart_helper";

const Card = ({ id, name, price, imageUrl, description }) => {
  const [redirect, setRedirect] = useState(false);
  const addItem = () => {
    addItemToCart({ id, name, price, imageUrl, description }, () =>
      setRedirect(true)
    );
  };

  const getARedirect = () => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };
  return (
    <div>
      {getARedirect(redirect)}
      <div class="container">
        <div class="card">
          <Link
            className="link"
            to={`/product/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div class="card-header">
              <img src={imageUrl} alt="rover" />
            </div>
          </Link>
          <div class="card-body">
            <h4>{name}</h4>
            <span>${price}</span>
            <p>{description.slice(0, 70)}...</p>
            <div className="add-btn">
              <button className="add-to-cart-home" onClick={addItem}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
