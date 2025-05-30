fetch("../Json Files/products.json")
  .then((response) => response.json())
  .then(data => {
      const cardsContainer = document.querySelector('.cards');

      data.forEach(product => {
        
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <img class="card-logo" src="../images/logo.png" alt="">
        <a href="product_detail.html" style="display: inline-block;"><img class="prd-image" src="${product.image}" style="max-width: 200px;"></a>

        <p class = "prd-title">${product.title}</p>
        
        <div class="old_price"> ${product.old_price} EGP</div>
        <div class="new_price">${product.new_price} EGP</div>

        <a class="add-to-cartBtn" href="#">
            <span>
                إضافة إلى السلة
            </span>
              <i class="fa-solid fa-cart-plus"></i>
        </a>

         <div class="listaya">
              <i class="fa-solid fa-code-compare compare">
                  <span class="extra1"></span>
              </i>
              
              
              <i class="fa-solid fa-magnifying-glass quickview">
                  <span class="extra1"></span>
              </i>
              
              <i class="fa-solid fa-heart addfav">
                  <span class="extra1"></span>
              </i>
              
              
          </div>
        `;

        cardsContainer.appendChild(card);

      });

      const add_to_cartBtns = document.querySelectorAll('.add-to-cartBtn');
      const prd_image = document.querySelectorAll('.prd-image');

      const prds_num = document.querySelector('.prds-cart');
      const constPrice = document.querySelector('.price');

      const carticon = document.querySelector('.carticon');
      const heartIcon = document.querySelector('.heartIcon');
      
      const cartNav = document.querySelector('.cart');
      let adder = 0;
      let priceAdder = 0;

    prd_image.forEach(btn => {
      btn.addEventListener('click', function() {
        const parentCard = this.closest('.card');

        const data = {
          image: parentCard.querySelector('.prd-image')?.src || '',
          title: parentCard.querySelector('.prd-title')?.textContent.trim() || '',
          old_price: parentCard.querySelector('.old_price')?.textContent.trim() || '',
          new_price: parentCard.querySelector('.new_price')?.textContent.trim() || '',
        };

        sessionStorage.setItem("Clicked_Card", JSON.stringify(data));
        
      });
    });

      add_to_cartBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
          event.preventDefault();
          adder++;
          prds_num.textContent = adder;
          const parentCard = this.closest('.card');

          const priceElement = parentCard.querySelector('.new_price');

        let priceValue = priceElement.textContent.replace('EGP', '').trim();
        priceValue = parseFloat(priceValue); 

        if (!isNaN(priceValue)) {
          priceAdder += priceValue;
        }

        constPrice.textContent = `${priceAdder.toFixed(2)} EGP`;

        // carticon.style.color = '#666';
          
          console.log('Clicked Card:', parentCard);
           
        });
      });

      

      const addfavbtns = document.querySelectorAll('.addfav');
      const numfav = document.querySelector('.love-cart');

      let lovenum = 0;

      addfavbtns.forEach(btn => {
        
        btn.addEventListener("click", function () {
          heartIcon.style.color = 'red';
          if(btn.style.color === 'red')
          {
            btn.style.color = 'black'
            lovenum--;
          }
          else
          {
            btn.style.color = 'red'
            lovenum++;
            
          }
          console.log("add to fav");
          numfav.textContent = lovenum;
          
         

          const parentCard = this.closest('.card');
          console.log('loved Card:', parentCard);

        });
      });



  }).catch(error => console.error("error fetching data"));
