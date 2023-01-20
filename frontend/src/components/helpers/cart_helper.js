export const addItemToCart = (item, next) => {
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  cart.push({ ...item });
  localStorage.setItem("cart", JSON.stringify(cart));
  next();
};

export const loadCart = () => {
  if (localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart"));
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  console.log("id", productId);
  console.log(cart);

  cart.forEach((product, i) => {
    if (product.id === productId) {
      cart.splice(i, 1);
    }
  });

  console.log(cart);

  localStorage.setItem("cart", JSON.stringify(cart));
};
