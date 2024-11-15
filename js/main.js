document.addEventListener('DOMContentLoaded', () => {
    // Контейнер главного раздела
    const containerMain = document.querySelector('.container_main');
    const waveMain = document.querySelector('.wave_main');
    // Вычисление высоты главного раздела
    containerMain.style.height = 'calc(100% - ' + waveMain.clientHeight*2 + 'px)';
    // Изменение высоты главного раздела при изменении размера окна
    window.addEventListener('resize', () =>{    
        containerMain.style.height = 'calc(100% - ' + waveMain.clientHeight*2 + 'px)';
    });
})

  