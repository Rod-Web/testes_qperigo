
    const carousel = document.getElementById('carousel');
    const cards = Array.from(carousel.children);
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    
    let index = 0; // Começa no primeiro card

    const mod = (n, m) => ((n % m) + m) % m;

    function update() {
        cards.forEach((card, i) => {
            card.classList.remove('center', 'left', 'right', 'expanded');
            const left = mod(index - 1, cards.length);
            const center = index;
            const right = mod(index + 1, cards.length);

            if (i === center) {
                card.classList.add('center');
            } else if (i === left) {
                card.classList.add('left');
            } else if (i === right) {
                card.classList.add('right');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        index = mod(index - 1, cards.length);
        update();
    });

    nextBtn.addEventListener('click', () => {
        index = mod(index + 1, cards.length);
        update();
    });

const toggleButtons = document.querySelectorAll('.toggle');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const isExpanded = card.classList.contains('expanded');

        // Fecha qualquer outro card aberto
        document.querySelectorAll('.card.expanded').forEach(openCard => {
            openCard.classList.remove('expanded');
            openCard.querySelector('.toggle').textContent = 'Ver mais';
        });

        if (!isExpanded) {
            card.classList.add('expanded');
            button.textContent = 'Fechar card';
        } else {
            card.classList.remove('expanded');
            button.textContent = 'Ver mais';
        }
    });
});


    update();
