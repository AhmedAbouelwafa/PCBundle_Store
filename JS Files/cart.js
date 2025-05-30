const cartContainer = document.querySelector(".carts");
const prds_num = document.querySelector(".prds-cart");
const constPrice = document.querySelector(".price");
const totalPriceElement = document.querySelector(".total-price");
const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

console.log("cartItems:", cartItems); // Check إن الـ cartItems بتتحمل

function renderCart() {
  cartContainer.innerHTML = ""; // إفراغ الـ container
  if (cartItems.length > 0) {
    cartItems.forEach((item, index) => {
      console.log("Rendering item:", item); // Check كل item
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img class="card-logo" src="../images/logo.png" alt="">
        <a href="product_detail.html" style="display: inline-block;"><img class="prd-image" src="${item.image}" style="max-width: 200px;"></a>
        <p class="prd-title">${item.title}</p>
        <div class="new_price">${item.price} EGP</div>
        <button class="remove-from-cart" data-index="${index}">إزالة من السلة</button>
      `;
      cartContainer.appendChild(card);
    });

    // تحديث العداد والسعر
    prds_num.textContent = cartItems.length;
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    constPrice.textContent = `${totalPrice.toFixed(2)} EGP`;
    totalPriceElement.textContent = `${totalPrice.toFixed(2)} EGP`;
  } else {
    cartContainer.textContent = "لا توجد منتجات في السلة.";
    prds_num.textContent = "0";
    constPrice.textContent = "0.00 EGP";
    totalPriceElement.textContent = "0.00 EGP";
  }
}

renderCart();

cartContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart")) {
    const index = event.target.getAttribute("data-index");
    cartItems.splice(index, 1); // إزالة المنتج من الـ array
    sessionStorage.setItem("cart", JSON.stringify(cartItems)); // تحديث الـ sessionStorage
    console.log("Removed item, new cartItems:", cartItems); // Check بعد الحذف
    renderCart(); // إعادة عرض السلة
  }
});