document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll(".slider");
  const slider_areas = document.querySelectorAll(".slider__area");
  const sliderBtns = document.querySelectorAll(".slider__button");

  let isDragging = false, startX, startScrollLeft;
  let timeoutIds = new Map(); // Для хранения таймеров для каждого слайдера

  // Инициализация слайдеров
  for (let sl_area of slider_areas) {
      let firstCardWidth = sl_area.querySelector(".slider__card").offsetWidth;
      let cardPerView = Math.round(sl_area.parentElement.offsetWidth / firstCardWidth);
      let carouselChildrens = [...sl_area.children];

      // Клонируем последние и первые карточки для бесконечной прокрутки
      carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
          sl_area.insertAdjacentHTML("afterbegin", card.outerHTML);
      });

      carouselChildrens.slice(0, cardPerView).forEach(card => {
          sl_area.insertAdjacentHTML("beforeend", card.outerHTML);
      });
  }

  // Логика кнопок прокрутки
  sliderBtns.forEach(btn => {
      let firstCardWidth = btn.parentElement.querySelector(".slider__area").querySelector(".slider__card").offsetWidth;
      btn.addEventListener("click", () => {
          let sl_area = btn.parentElement.querySelector(".slider__area");
          sl_area.scrollLeft += btn.classList.contains("slider__button_prev") ? -firstCardWidth : firstCardWidth;
          infiniteScroll(sl_area);
      });
  });

  // Начало перетаскивания
  function dragStart(e, sl_area) {
      isDragging = true;
      sl_area.classList.add("slider__area_dragging");
      startX = e.pageX || e.touches[0].pageX;
      startScrollLeft = sl_area.scrollLeft;
  }

  // Логика перетаскивания
  function dragging(e, sl_area) {
      if (!isDragging) return;
      sl_area.scrollLeft = startScrollLeft - ((e.pageX || e.touches[0].pageX) - startX);
  }

  // Остановка перетаскивания
  function dragStop(sl_area) {
      isDragging = false;
      sl_area.classList.remove("slider__area_dragging");
      infiniteScroll(sl_area); // Проверяем необходимость циклической прокрутки после остановки
  }

  // Автоматическое воспроизведение слайдера
  function autoPlay(sl_area) {
      let firstCardWidth = sl_area.querySelector(".slider__card").offsetWidth;
      let id = setInterval(() => {
          sl_area.scrollLeft += firstCardWidth;
          infiniteScroll(sl_area);
      }, 2500);
      timeoutIds.set(sl_area, id); // Сохраняем таймер для каждого слайдера
  }

  // Остановка автоматического воспроизведения
  function stopAutoPlay(sl_area) {
      clearInterval(timeoutIds.get(sl_area)); // Останавливаем текущий интервал
  }

  // Бесконечная прокрутка
  function infiniteScroll(sl_area) {
      // Если слайдер прокручен до начала
      if (sl_area.scrollLeft <= 0) {
          sl_area.classList.add("slider__area_no-transition");
          sl_area.scrollLeft = sl_area.scrollWidth - (2 * sl_area.offsetWidth); // Прокручиваем к концу
          sl_area.classList.remove("slider__area_no-transition");
      }
      // Если слайдер прокручен до конца
      else if (Math.abs(sl_area.scrollLeft - (sl_area.scrollWidth - sl_area.offsetWidth)) < 2) {
          sl_area.classList.add("slider__area_no-transition");
          sl_area.scrollLeft = sl_area.offsetWidth; // Прокручиваем к началу
          sl_area.classList.remove("slider__area_no-transition");
      }
  }

  // Добавляем события для каждого слайдера отдельно
  for (let sl_area of slider_areas) {
      sl_area.addEventListener("mousedown", (e) => {
          dragStart(e, sl_area);
          function onMouseMove(e) {
              dragging(e, sl_area);
          }
          function onMouseUp() {
              dragStop(sl_area);
              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);
          }
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
      });

      // Добавляем поддержку touch-событий
      sl_area.addEventListener("touchstart", (e) => dragStart(e, sl_area));
      sl_area.addEventListener("touchmove", (e) => dragging(e, sl_area));
      sl_area.addEventListener("touchend", () => dragStop(sl_area));

      sl_area.addEventListener("scroll", () => infiniteScroll(sl_area));
  }

  // Добавляем остановку и воспроизведение при наведении/уходе курсора
  for (let slider of sliders) {
      slider.addEventListener("mouseenter", () => {
          stopAutoPlay(slider.querySelector(".slider__area"));
      });
      slider.addEventListener("mouseleave", () => {
          autoPlay(slider.querySelector(".slider__area"));
      });
  }

  // Запускаем автоматическое воспроизведение для каждого слайдера
  slider_areas.forEach(sl_area => autoPlay(sl_area));
})