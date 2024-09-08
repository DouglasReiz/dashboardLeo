document.addEventListener('DOMContentLoaded', function () {
    // Menu hamburger
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navigation = document.querySelector('.navigation');

    hamburgerMenu.addEventListener('click', function () {
        navigation.classList.toggle('show');
    });

    // Seleciona o carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');

    let currentIndex = 0;

    function showSlide(index) {
        if (index >= carouselItems.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = carouselItems.length - 1;
        } else {
            currentIndex = index;
        }

        // Remover classes de efeito antigas
        carouselInner.className = 'carousel-inner';

        // Adicionar o efeito fade
        carouselInner.classList.add('fade');

        // Atualizar o slide
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    // Tempo automático de passagem
    const carouselInterval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000); // 5000ms = 5 segundos

    // Controle de rotas
    function loadContent(page) {
        const content = document.getElementById('content');
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => {
                content.innerHTML = '<p>Page not found.</p>';
            });
    }

    function handleHashChange() {

        

        const hash = window.location.hash.substring(1);
        if (hash) {
            loadContent(hash);
        } else {
            loadContent('home');
        }

        // Exibir ou ocultar o carrossel com base na página atual
        if (hash === 'home' || hash === '') {
            if (carouselContainer) {
                
                carouselContainer.style.display = 'block';
            }
            // Reiniciar o carrossel caso ele tenha sido ocultado
            clearInterval(carouselInterval);
            setInterval(() => {
                showSlide(currentIndex + 1);
            }, 50000);
        } else {
            if (carouselContainer) {
                carouselContainer.style.display = 'none';
            }
        }
    }

    window.addEventListener('hashchange', handleHashChange);

    // Carregar a página inicial
    handleHashChange();
});
