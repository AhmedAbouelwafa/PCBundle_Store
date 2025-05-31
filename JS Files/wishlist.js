const wishlistContainer = document.querySelector(".wishlist");
const love_num = document.querySelector(".love-cart");
const wishlistItems = JSON.parse(sessionStorage.getItem("wishlist")) || [];

console.log("wishlistItems:", wishlistItems);

function renderWishlist() {
  if (!wishlistContainer) {
    console.error("Wishlist container not found!");
    return;
  }

  while (wishlistContainer.children.length > 1) {
    wishlistContainer.removeChild(wishlistContainer.lastChild);
  }
  
  if (wishlistItems.length > 0) {
    wishlistItems.forEach((item, index) => {
      console.log("Rendering wishlist item:", item);
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img class="card-logo" src="../images/logo.png" alt="">
        <a href="product_detail.html" style="display: inline-block;" class="product-link"><img class="prd-image" src="${item.image}" style="max-width: 200px;"></a>
        <p class="prd-title">${item.title}</p>
        <div class="new_price">${item.price} EGP</div>
        <button class="remove-from-wishlist" data-index="${index}">إزالة من المفضلة</button>
      `;
      wishlistContainer.appendChild(card);
    });

    // إضافة event listener لتحديث Clicked_Card
    const productLinks = document.querySelectorAll(".product-link");
    productLinks.forEach((link, index) => {
      link.addEventListener("click", function (event) {
        const item = wishlistItems[index];
        const data = {
          image: item.image || "",
          title: item.title || "",
          old_price: item.old_price || `${item.price} EGP`, // لو مافيش old_price، استخدم new_price
          new_price: `${item.price} EGP` || "",
        };
        sessionStorage.setItem("Clicked_Card", JSON.stringify(data));
        console.log("Updated Clicked_Card for wishlist item:", data);
      });
    });

    if (love_num) love_num.textContent = wishlistItems.length;
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "لا توجد منتجات في قائمة المفضلة.";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.fontSize = "1.2rem";
    emptyMessage.style.color = "#666";
    wishlistContainer.appendChild(emptyMessage);
    if (love_num) love_num.textContent = "0";
  }
}

renderWishlist();

if (wishlistContainer) {
  wishlistContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-wishlist")) {
      const index = event.target.getAttribute("data-index");
      wishlistItems.splice(index, 1);
      sessionStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      console.log("Removed item, new wishlistItems:", wishlistItems);
      renderWishlist();
    }
  });
}