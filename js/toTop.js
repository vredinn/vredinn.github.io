document.addEventListener('DOMContentLoaded', () => {

  // Кнопка возврата на верх страницы
  const backToTop = document.getElementById('to-top');

  // Показать скрыть кнопку "на верх"
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300){
      backToTop.style.visibility = "visible";
      backToTop.style.opacity = ".5";
    } else {      
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

});
