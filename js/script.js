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
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 60;
      
      if(header.classList.contains('header_expand')) toggleHamburger();

      // Плавно скроллим на рассчитанную позицию
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    })
  }

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
