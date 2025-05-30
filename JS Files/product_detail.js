const cardData = JSON.parse(sessionStorage.getItem('Clicked_Card'));

if (cardData) {
  const title_detail = document.querySelector('.title');
  const mainImage = document.querySelector('.main-image img');
  const old_price_detail = document.querySelector('.old_price');
  const new_price_detail = document.querySelector('.new_price');
  const btnContainer = document.querySelector('.btns-wrapper');

  if (title_detail) title_detail.textContent = cardData.title;
  if (mainImage) mainImage.src = cardData.image;
  if (old_price_detail) old_price_detail.textContent = cardData.old_price;
  if (new_price_detail) new_price_detail.textContent = cardData.new_price;
  if (btnContainer && cardData.buttonHTML) {
    btnContainer.innerHTML = cardData.buttonHTML;
  }
}

