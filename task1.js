document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".cards-wrapper");
    const templateCard = document.querySelector(".card");
    const containerElement = document.querySelector(".container");

    const addCards = (count = 3) => {
        for (let i = 0; i < count; i++) {
            const newCard = templateCard.cloneNode(true);
            container.appendChild(newCard);
        }
    };

    addCards(3);

    let isDragging = false;
    let startY, scrollStart;

    containerElement.addEventListener("mousedown", (e) => {
        isDragging = true;
        startY = e.pageY;
        scrollStart = containerElement.scrollTop;
        containerElement.style.cursor = "grabbing";
    });

    containerElement.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const y = e.pageY;
        const walk = startY - y;
        containerElement.scrollTop = scrollStart + walk;
    });

    containerElement.addEventListener("mouseup", () => {
        isDragging = false;
        containerElement.style.cursor = "default";
    });

    containerElement.addEventListener("mouseleave", () => {
        isDragging = false;
        containerElement.style.cursor = "default";
    });

    const loopCards = () => {
        const cards = document.querySelectorAll(".card");

        if (cards.length < 3) {
            addCards(3);
        }

        cards.forEach((card) => {
            let cardTop = card.offsetTop;
            let cardBottom = cardTop + card.offsetHeight;

            if (cardBottom <= containerElement.scrollTop) {
                card.remove();
                addCards(1);
            }

            if (cardTop >= containerElement.scrollHeight) {
                card.remove();
                addCards(1);
            }
        });
    };

    const zoomCenterCard = () => {
        const cards = document.querySelectorAll(".card");
        const containerCenter = containerElement.offsetHeight / 2;

        cards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + cardRect.height / 2;

            if (Math.abs(cardCenter - containerCenter) < cardRect.height / 2) {
                card.style.transform = "scale(1.4)";
                card.style.background = "rgba(255, 255, 255, 0.15)";
            } else {
                card.style.transform = "scale(1)";
                card.style.background = "rgba(69, 186, 96, 0.1)";
            }
        });
    };

    containerElement.addEventListener("scroll", () => {
        loopCards();
        zoomCenterCard();
    });

    loopCards();
    zoomCenterCard();
});
