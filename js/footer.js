<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');

    window.addEventListener('resize', footerToBottom())

    footerToBottom();

    function footerToBottom(){
    if(document.body.offsetHeight <= window.screen.height){
        footer.classList.toggle('footer_fixed-bottom');
    }
    }
})


=======
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');

    window.addEventListener('resize', footerToBottom())

    console.log(document.body.offsetHeight);

    footerToBottom();

    function footerToBottom(){
    if(document.body.offsetHeight <= window.screen.height){
        footer.classList.toggle('footer_fixed-bottom');
    }
    }
})


>>>>>>> a940222b0f55891dfc6bb54d86bf6cb0428b9c96
