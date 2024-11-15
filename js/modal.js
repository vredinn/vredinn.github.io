document.addEventListener('DOMContentLoaded', () => {    
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
})