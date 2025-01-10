document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const header = document.querySelector('header');

    

    const toggleHamburger = () =>{
        hamburger.classList.toggle("header__hamburger_rotate");
        header.classList.toggle("header_expand");
    }

    hamburger.addEventListener('click', toggleHamburger);
})