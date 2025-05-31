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



const scroll_up = document.querySelector('.scroll_up');

window.addEventListener("scroll", function() {
    if (window.scrollY >= 200) {
        scroll_up.classList.add('show');
    } else {
        scroll_up.classList.remove('show');
    }
});

scroll_up.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "auto"
    });
});




const slider = document.querySelector('.slides');
    const originalSlides = document.querySelectorAll('.slide');
    const bulletsContainer = document.querySelector('.bullets');
    let position = 0;
    let currentIndex = 0;
    const speed = 1; // سرعة التحريك
    let animationFrame;
    const slideWidth = originalSlides[0].offsetWidth + 20; // العرض + المارجن

    // كرر الـ slides 3 مرات عشان نضمن إن الـ slider دايمًا مليان
    for (let i = 0; i < 2; i++) {
      originalSlides.forEach(slide => {
        slider.appendChild(slide.cloneNode(true));
      });
    }

    const slides = document.querySelectorAll('.slide'); // تحديث قائمة الـ slides بعد التكرار

    // إنشاء الـ bullets ديناميكيًا
    originalSlides.forEach((_, index) => {
      const bullet = document.createElement('div');
      bullet.classList.add('bullet');
      if (index === 0) bullet.classList.add('active');
      bullet.addEventListener('click', () => {
        stopAutoPlay();
        currentIndex = index;
        position = -currentIndex * slideWidth;
        slider.style.transition = 'none';
        slider.style.transform = `translateX(${position}px)`;
        updateBullets();
        setTimeout(() => {
          slider.style.transition = 'transform 0.3s ease-in-out';
          startAutoPlay();
        }, 50);
      });
      bulletsContainer.appendChild(bullet);
    });

    function updateSlider() {
      position -= speed;
      slider.style.transform = `translateX(${position}px)`;

      // لما نوصل لنص الـ slides المكررة، نرجع للصفر
      if (Math.abs(position) >= slideWidth * originalSlides.length) {
        position = 0;
        slider.style.transition = 'none';
        slider.style.transform = `translateX(0px)`;
        currentIndex = 0;
        updateBullets();
        setTimeout(() => {
          slider.style.transition = 'transform 0.3s ease-in-out';
        }, 50);
      }

      currentIndex = Math.floor(Math.abs(position) / slideWidth) % originalSlides.length;
      updateBullets();

      animationFrame = requestAnimationFrame(updateSlider);
    }

    function updateBullets() {
      document.querySelectorAll('.bullet').forEach((bullet, index) => {
        bullet.classList.toggle('active', index === currentIndex);
      });
    }

    function startAutoPlay() {
      animationFrame = requestAnimationFrame(updateSlider);
    }

    function stopAutoPlay() {
      cancelAnimationFrame(animationFrame);
    }

    // وقف الأوتو-بلاي لما الماوس ييجي فوق الـ slider
    document.querySelector('.slider').addEventListener('mouseenter', stopAutoPlay);
    document.querySelector('.slider').addEventListener('mouseleave', startAutoPlay);

    // ابدأ الأوتو-بلاي من أول ما الصفحة تتحمل
    startAutoPlay();