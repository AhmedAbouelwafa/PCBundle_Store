const cartContainer = document.querySelector(".carts"); // افترضنا إن الـ div اسمه carts
const prds_num = document.querySelector(".prds-cart");
const constPrice = document.querySelector(".price");
const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

console.log("cartItems:", cartItems);

function renderCart() {
  if (!cartContainer) {
    console.error("Cart container not found!");
    return;
  }

  cartContainer.innerHTML = ""; // إفراغ الـ container
  
  if (cartItems.length > 0) {
    cartItems.forEach((item, index) => {
      console.log("Rendering cart item:", item);
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img class="card-logo" src="../images/logo.png" alt="">
        <a href="product_detail.html" style="display: inline-block;" class="product-link"><img class="prd-image" src="${item.image}" style="max-width: 200px;"></a>
        <p class="prd-title">${item.title}</p>
        <div class="new_price">${item.price} EGP</div>
        <button class="remove-from-cart" data-index="${index}">إزالة من السلة</button>
      `;
      cartContainer.appendChild(card);
    });

    // إضافة event listener لتحديث Clicked_Card
    const productLinks = document.querySelectorAll(".product-link");
    productLinks.forEach((link, index) => {
      link.addEventListener("click", function (event) {
        const item = cartItems[index];
        const data = {
          image: item.image || "",
          title: item.title || "",
          old_price: item.old_price || `${item.price} EGP`,
          new_price: `${item.price} EGP` || "",
        };
        sessionStorage.setItem("Clicked_Card", JSON.stringify(data));
        console.log("Updated Clicked_Card for cart item:", data);
      });
    });

    if (prds_num) prds_num.textContent = cartItems.length;
    let totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    if (constPrice) constPrice.textContent = `${totalPrice.toFixed(2)} EGP`;
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "لا توجد منتجات في السلة.";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.fontSize = "1.2rem";
    emptyMessage.style.color = "#666";
    cartContainer.appendChild(emptyMessage);
    if (prds_num) prds_num.textContent = "0";
    if (constPrice) constPrice.textContent = "0.00 EGP";
  }
}

renderCart();

if (cartContainer) {
  cartContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart")) {
      const index = event.target.getAttribute("data-index");
      cartItems.splice(index, 1);
      sessionStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("Removed item, new cartItems:", cartItems);
      renderCart();
    }
  });
}