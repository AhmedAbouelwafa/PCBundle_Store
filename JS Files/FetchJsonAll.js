fetch("../Json Files/products.json")
  .then((response) => response.json())
  .then((data) => {
    const cardsContainer = document.querySelector(".cards");
    const prds_num = document.querySelector(".prds-cart");
    const constPrice = document.querySelector(".price");
    const cartSummaryPrice = document.querySelector(".total-price"); // إضافة الـ cart-summary
    const carticon =
      document.querySelector(".carticon") ||
      document.querySelector(".fa-cart-plus");
    const heartIcon = document.querySelector(".heartIcon");
    const numfav = document.querySelector(".love-cart");

    let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    let wishlistItems = JSON.parse(sessionStorage.getItem("wishlist")) || [];

    // دالة تحديث الإجمالي
    const updateTotalPrice = () => {
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + (parseFloat(item.price) || 0),
        0
      );
      if (constPrice) constPrice.textContent = `${totalPrice.toFixed(2)} EGP`;
      if (cartSummaryPrice)
        cartSummaryPrice.textContent = `${totalPrice.toFixed(2)} EGP`;
      if (prds_num) prds_num.textContent = cartItems.length;
      if (cartItems.length > 0 && carticon)
        carticon.style.color = "rgb(229,157,3)";
      else if (carticon) carticon.style.color = "black";
    };

    // تحديث الإجمالي عند التحميل
    updateTotalPrice();
    if (numfav) numfav.textContent = wishlistItems.length;
    if (wishlistItems.length > 0 && heartIcon) heartIcon.style.color = "red";

    // مراقبة تغييرات السلة
    const updateCartItems = () => {
      cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
      updateTotalPrice();
    };
    setInterval(updateCartItems, 1000); // تحديث كل ثانية

    // عرض المنتجات
    data.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img class="card-logo" src="../images/logo.png" alt="">
        <a href="product_detail.html" style="display: inline-block;"><img class="prd-image" src="${product.image}" style="max-width: 200px;"></a>
        <p class="prd-title">${product.title}</p>
        <div class="old_price">${product.old_price} EGP</div>
        <div class="new_price">${product.new_price} EGP</div>
        <a class="add-to-cartBtn" href="#">
            <span>إضافة إلى السلة</span>
            <i class="fa-solid fa-cart-plus"></i>
            <div class="cart-success-message">✅ Added to Cart Successfully!</div>
        </a>
        <div class="listaya">
            <i class="fa-solid fa-code-compare compare"><span class="extra1"></span></i>
            <i class="fa-solid fa-magnifying-glass quickview"><span class="extra1"></span></i>
            <i class="fa-solid fa-heart addfav"><span class="extra1"></span></i>
        </div>
      `;
      cardsContainer.appendChild(card);
    });

    // إضافة حدث لصور المنتجات
    document.querySelectorAll(".prd-image").forEach((btn) => {
      btn.addEventListener("click", function () {
        const parentCard = this.closest(".card");
        const data = {
          image: parentCard.querySelector(".prd-image")?.src || "",
          title:
            parentCard.querySelector(".prd-title")?.textContent.trim() || "",
          old_price:
            parentCard.querySelector(".old_price")?.textContent.trim() || "",
          new_price:
            parentCard.querySelector(".new_price")?.textContent.trim() || "",
        };
        sessionStorage.setItem("Clicked_Card", JSON.stringify(data));
      });
    });

    // إضافة حدث لزر "إضافة إلى السلة"
    document.querySelectorAll(".add-to-cartBtn").forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        const parentCard = this.closest(".card");
        const cartSuccess = parentCard.querySelector(".cart-success-message");

        cartSuccess.classList.add("show");
        setTimeout(() => cartSuccess.classList.remove("show"), 500);

        const priceElement = parentCard.querySelector(".new_price");
        let priceValue = priceElement.textContent
          .replace("EGP", "")
          .replace(",", "")
          .trim();
        priceValue = parseFloat(priceValue);

        if (isNaN(priceValue)) {
          console.error(
            "Invalid price for product:",
            parentCard.querySelector(".prd-title").textContent
          );
          return;
        }

        const cartItem = {
          title: parentCard.querySelector(".prd-title").textContent.trim(),
          price: priceValue,
          image: parentCard.querySelector(".prd-image").getAttribute("src"),
        };

        cartItems.push(cartItem);
        sessionStorage.setItem("cart", JSON.stringify(cartItems));
        console.log("Added to cart:", cartItem);
        updateTotalPrice();
      });
    });

    // إضافة حدث لزر "إضافة إلى المفضلة"
    document.querySelectorAll(".addfav").forEach((btn) => {
      btn.addEventListener("click", function () {
        const parentCard = this.closest(".card");
        const priceElement = parentCard.querySelector(".new_price");
        let priceValue = priceElement.textContent
          .replace("EGP", "")
          .replace(",", "")
          .trim();
        priceValue = parseFloat(priceValue);

        const wishlistItem = {
          title: parentCard.querySelector(".prd-title").textContent.trim(),
          price: priceValue,
          image: parentCard.querySelector(".prd-image").getAttribute("src"),
        };

        const itemExists = wishlistItems.some(
          (item) => item.title === wishlistItem.title
        );
        if (!itemExists) {
          wishlistItems.push(wishlistItem);
          btn.style.color = "red";
          if (heartIcon) heartIcon.style.color = "red";
        } else {
          wishlistItems = wishlistItems.filter(
            (item) => item.title !== wishlistItem.title
          );
          btn.style.color = "black";
          if (wishlistItems.length === 0 && heartIcon)
            heartIcon.style.color = "black";
        }

        sessionStorage.setItem("wishlist", JSON.stringify(wishlistItems));
        if (numfav) numfav.textContent = wishlistItems.length;
        console.log(
          itemExists ? "Removed from wishlist:" : "Added to wishlist:",
          wishlistItem
        );
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
