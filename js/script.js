document.addEventListener('DOMContentLoaded', () => {
  
  
  const hamburger = document.getElementById('hamburger');
  const header = document.querySelector('header');
  
  const toggleHamburger = () =>{
    hamburger.classList.toggle("header__hamburger_rotate");
    header.classList.toggle("header_expand");
  }

  hamburger.addEventListener('click', toggleHamburger);
  
  //плавная прокрутка
  const anchors = document.querySelectorAll("a[href^='#']")

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const blockID = anchor.getAttribute('href')
      const element = document.querySelector(blockID)

      // Вычисляем расстояние до нужного элемента с учетом отступа
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - header.offsetHeight + 60;    

      // Плавно скроллим на рассчитанную позицию
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      if(header.classList.contains('header_expand')) toggleHamburger();
    })
  }

  // Контейнер главного раздела
  const containerMain = document.querySelector('.container_main');
  const waveMain = document.querySelector('.wave_main');
  // Вычисление высоты главного раздела
  containerMain.style.height = 'calc(100% - ' + waveMain.clientHeight*2 + 'px)';
  // Изменение высоты главного раздела при изменении размера окна
  window.addEventListener('resize', () =>{    
    containerMain.style.height = 'calc(100% - ' + waveMain.clientHeight*2 + 'px)';
  });

  // Кнопка возврата на верх страницы
  const backToTop = document.getElementById('to-top');

  // Показать скрыть кнопку
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300){
      backToTop.style.visibility = "visible";
      backToTop.style.opacity = ".5";
    } else {      
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

  // Кнопка вызова формы обратной связи и сама форма
  const orderBtns = document.querySelectorAll(".button_order");
  const modal = document.querySelector(".modal");
  const modalForm = document.querySelector(".modal__form");
  const cancelBtn = document.getElementById("order-cancel");
  const submitBtn = document.getElementById("order-submit");

  //Отображение/скрытие модального окна
  const toggleModalVisibility = () => {
    modal.classList.toggle("modal_active");
    modalForm.classList.toggle("modal__form_active");
  };

  // Закрытие модального окна при клике вне формы
  modal.addEventListener('click', (event) => {
    if (!modalForm.contains(event.target)) {
      toggleModalVisibility();
    }
  });
  //Отображение/скрытие модального окна по нажатию на кнопки
  orderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleModalVisibility();
    });
  });

  submitBtn.addEventListener('click', () => {
    toggleModalVisibility();
  });

  cancelBtn.addEventListener('click', () => {
    toggleModalVisibility();
  });



});
