const cartContainer = document.querySelector(".carts");
const prds_num = document.querySelector(".prds-cart");
const constPrice = document.querySelector(".price");
const cartSummaryPrice = document.querySelector(".total-price");
const carticon = document.querySelector(".carticon") || document.querySelector(".fa-cart-plus");
let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

// دالة تحديث الإجمالي
const updateTotalPrice = () => {
  const totalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
  if (constPrice) constPrice.textContent = `${totalPrice.toFixed(2)} EGP`;
  if (cartSummaryPrice) cartSummaryPrice.textContent = `${totalPrice.toFixed(2)} EGP`;
  if (prds_num) prds_num.textContent = cartItems.length;
  if (cartItems.length > 0 && carticon) carticon.style.color = "rgb(229,157,3)";
  else if (carticon) carticon.style.color = "black";
};

// دالة عرض السلة
function renderCart() {
  if (!cartContainer) {
    console.error("Cart container not found!");
    return;
  }

  cartContainer.innerHTML = "";
  if (cartItems.length > 0) {
    cartItems.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img class="card-logo" src="../images/logo.png" alt="">
        <a href="product_detail.html" class="product-link" data-index="${index}"><img class="prd-image" src="${item.image}" style="max-width: 200px;"></a>
        <p class="prd-title">${item.title}</p>
        <div class="new_price">${item.price.toFixed(2)} EGP</div>
        <button class="remove-from-cart" data-index="${index}">إزالة من السلة</button>
      `;
      cartContainer.appendChild(card);
    });

    // إضافة حدث لصور المنتجات
    document.querySelectorAll(".product-link").forEach((link) => {
      link.addEventListener("click", function () {
        const index = link.getAttribute("data-index");
        const item = cartItems[index];
        const data = {
          image: item.image || "",
          title: item.title || "",
          old_price: item.old_price || `${item.price.toFixed(2)} EGP`,
          new_price: `${item.price.toFixed(2)} EGP`,
        };
        sessionStorage.setItem("Clicked_Card", JSON.stringify(data));
        console.log("Updated Clicked_Card:", data);
      });
    });

    updateTotalPrice();
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "لا توجد منتجات في السلة.";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.fontSize = "1.2rem";
    emptyMessage.style.color = "#666";
    cartContainer.appendChild(emptyMessage);
    updateTotalPrice();
  }
}

// تحديث cartItems عند التغيير
const updateCartItems = () => {
  cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
  renderCart();
};

// مراقبة تغييرات السلة
setInterval(updateCartItems, 1000); // تحديث كل ثانية

// عرض السلة عند التحميل
renderCart();

// إضافة حدث الإزالة
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