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


