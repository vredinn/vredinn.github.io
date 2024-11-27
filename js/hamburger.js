<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const header = document.querySelector('header');

    

    const toggleHamburger = () =>{
        hamburger.classList.toggle("header__hamburger_rotate");
        header.classList.toggle("header_expand");
    }

    hamburger.addEventListener('click', toggleHamburger);
=======
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const header = document.querySelector('header');
    
    const toggleHamburger = () =>{
        hamburger.classList.toggle("header__hamburger_rotate");
        header.classList.toggle("header_expand");
    }

    hamburger.addEventListener('click', toggleHamburger);
>>>>>>> a940222b0f55891dfc6bb54d86bf6cb0428b9c96
})