var cat = document.getElementsByClassName("categories")[0];
var tasafa7 = document.getElementsByClassName("observe-btn")[0];

var div_tasafa7 = document.getElementsByClassName("collapse-tasafa7")[0];

tasafa7.addEventListener("click", function () {
  if (cat.style.display === "none" || cat.style.display === "") {
    cat.style.display = "block";
    div_tasafa7.style.transform = "rotate(270deg)";
  } else {
    cat.style.display = "none";
    div_tasafa7.style.transform = "rotate(180deg)";
  }
});




// const prd_image = document.querySelectorAll('prd-image');

// prd_image.forEach(btn => {
//   btn.addEventListener('click', function(event) {
//     event.preventDefault();
//     const parentCard = this.closest('.card');

//     console.log('Clicked Card:', parentCard);
//   });
// });







window.addEventListener('scroll', function() {
  const myDiv = document.querySelector('.navbar');

  if (window.scrollY >= 200) {
    myDiv.classList.add('fixed');
  } else {
    myDiv.classList.remove('fixed');
  }
});