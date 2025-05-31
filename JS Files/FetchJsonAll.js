fetch("../Json Files/products.json")
  .then((response) => response.json())
  .then((data) => {
    const cardsContainer = document.querySelector(".cards");

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
            <div class="cart-success-message">
              ✅ Added to Cart Successfully!
            </div>
        </a>
        <div class="listaya">
            <i class="fa-solid fa-code-compare compare"><span class="extra1"></span></i>
            <i class="fa-solid fa-magnifying-glass quickview"><span class="extra1"></span></i>
            <i class="fa-solid fa-heart addfav"><span class="extra1"></span></i>
        </div>
      `;

      cardsContainer.appendChild(card);
    });

    const add_to_cartBtns = document.querySelectorAll(".add-to-cartBtn");
    const prd_image = document.querySelectorAll(".prd-image");
    const prds_num = document.querySelector(".prds-cart");
    const constPrice = document.querySelector(".price");
    const carticon =
      document.querySelector(".carticon") ||
      document.querySelector(".fa-cart-plus"); // Fallback
    const heartIcon = document.querySelector(".heartIcon");

    // تحديث السلة والمفضلة عند تحميل الصفحة
    let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    let wishlistItems = JSON.parse(sessionStorage.getItem("wishlist")) || [];
    prds_num.textContent = cartItems.length;
    let totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    constPrice.textContent = `${totalPrice.toFixed(2)} EGP`;
    if (cartItems.length > 0 && carticon) {
      carticon.style.color = "rgb(229,157,3)";
    }
    const numfav = document.querySelector(".love-cart");
    numfav.textContent = wishlistItems.length;
    if (wishlistItems.length > 0 && heartIcon) {
      heartIcon.style.color = "red";
    }

    prd_image.forEach((btn) => {
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

    add_to_cartBtns.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        const parentCard = this.closest(".card");
        const cartSuccess = parentCard.querySelector(".cart-success-message");
        cartSuccess.classList.add("show");
        setTimeout(() => {
          cartSuccess.classList.remove("show");
        }, 500);

        const priceElement = parentCard.querySelector(".new_price");
        let priceValue = priceElement.textContent.replace("EGP", "").trim();
        priceValue = parseFloat(priceValue);

        const cartItem = {
          title: parentCard.querySelector(".prd-title").textContent.trim(),
          price: priceValue,
          image: parentCard.querySelector(".prd-image").getAttribute("src"),
        };

        cartItems.push(cartItem);
        sessionStorage.setItem("cart", JSON.stringify(cartItems));
        console.log("Added to cart:", cartItem);

        prds_num.textContent = cartItems.length;
        totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
        constPrice.textContent = `${totalPrice.toFixed(2)} EGP`;
        if (carticon) carticon.style.color = "rgb(229,157,3)";
      });
    });

    const addfavbtns = document.querySelectorAll(".addfav");
    addfavbtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const parentCard = this.closest(".card");
        const priceElement = parentCard.querySelector(".new_price");
        let priceValue = priceElement.textContent.replace("EGP", "").trim();
        priceValue = parseFloat(priceValue);

        const wishlistItem = {
          title: parentCard.querySelector(".prd-title").textContent.trim(),
          price: priceValue,
          image: parentCard.querySelector(".prd-image").getAttribute("src"),
        };

        // Check لو المنتج موجود بالفعل
        const itemExists = wishlistItems.some(
          (item) => item.title === wishlistItem.title
        );
        if (!itemExists) {
          wishlistItems.push(wishlistItem);
          sessionStorage.setItem("wishlist", JSON.stringify(wishlistItems));
          btn.style.color = "red";
          numfav.textContent = wishlistItems.length;
          if (heartIcon) heartIcon.style.color = "red";
          console.log("Added to wishlist:", wishlistItem);
        } else {
          const updatedWishlist = wishlistItems.filter(
            (item) => item.title !== wishlistItem.title
          );
          wishlistItems.length = 0;
          wishlistItems.push(...updatedWishlist);
          sessionStorage.setItem("wishlist", JSON.stringify(wishlistItems));
          btn.style.color = "black";
          numfav.textContent = wishlistItems.length;
          if (wishlistItems.length === 0 && heartIcon)
            heartIcon.style.color = "black";
          console.log("Removed from wishlist:", wishlistItem);
        }
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
