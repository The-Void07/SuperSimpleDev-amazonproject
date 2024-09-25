import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHtml = "";

products.forEach((product) => {
  productsHtml += ` <div class="product-container">
    <div class="product-image-container">
      <img
        class="product-image"
        src=${product.image}
      />
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars" src="images/ratings/rating-${
        product.rating.stars * 10
      }.png" />
      <div class="product-rating-count link-primary">${
        product.rating.count
      }</div>
    </div>

    <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">
          1
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">Add to Cart</button>
  </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHtml;

function itemsInCart() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function addedNotification(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add("add-Opacity");

  const addedMessageTimeouts = {};
  const previousTimeoutId = addedMessageTimeouts[productId];

  if (previousTimeoutId) {
    console
      .log
      // `Previous Timeout for product ${productId}: ${previousTimeoutId}`
      ();
    clearTimeout(previousTimeoutId);
    // console.log(`Timeout for product ${productId} cleared.`);
  }

  const startTimeOutId = setTimeout(() => {
    addedMessage.classList.remove("add-Opacity");
  }, 2000);

  addedMessageTimeouts[productId] = startTimeOutId;
  //console.log(`New Timeout for product ${productId}: ${startTimeOutId}`);
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const selectedValue = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const quantity = Number(selectedValue.value);

    addToCart(productId, quantity);
    itemsInCart();
    addedNotification(productId);
  });
});
