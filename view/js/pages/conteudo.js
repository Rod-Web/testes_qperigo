
document.addEventListener('DOMContentLoaded', function() {
   const swiper = new Swiper('.swiper', {
    loop: false,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 20,
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 25
            }
            },
            on: {
            init: function() {
                updateActiveSlide(this);
            },
            slideChange: function() {
                updateActiveSlide(this);
            }
            }
        });

        // Atualiza o slide ativo e desativa os outros
        function updateActiveSlide(swiperInstance) {
            document.querySelectorAll('.swiper-slide').forEach(slide => {
            const texto = slide.querySelector('.texto');
            const readMore = slide.querySelector('.read-more');
            
            if (slide.classList.contains('swiper-slide-active')) {
                // Expande o texto do slide ativo
                if (texto) {
                texto.style.maxHeight = 'none';
                texto.style.transition = 'max-height 0.5s ease-in-out';
                }
                if (readMore) readMore.style.display = 'none';
            } else {
                // Recolhe o texto dos slides inativos
                if (texto) {
                texto.style.maxHeight = '120px';
                texto.style.transition = 'max-height 0.3s ease-in-out';
                }
                if (readMore) readMore.style.display = 'block';
            }
            });
        }

        // Botão "Leia mais" - expande o texto do slide clicado
        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', function(e) {
            e.preventDefault();
            const slide = this.closest('.swiper-slide');
            const texto = slide.querySelector('.texto');
            
            if (texto.style.maxHeight === 'none' || texto.classList.contains('expanded')) {
                texto.style.maxHeight = '120px';
                texto.classList.remove('expanded');
            } else {
                texto.style.maxHeight = 'none';
                texto.classList.add('expanded');
                this.style.display = 'none';
                
                // Rola para o slide se não estiver totalmente visível
                slide.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            });
        });

    });