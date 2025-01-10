document.addEventListener('DOMContentLoaded', () => {
    const anchors = document.querySelectorAll("a[href^='#']")

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();            
            const blockID = anchor.getAttribute('href');
            const element = document.querySelector(blockID);
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
})