let selectedCards = [];

// Ir a sección 2 y generar las 12 cartas
function goToCards() {
    document.getElementById("section1").classList.remove("active");
    document.getElementById("section2").classList.add("active");

    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = "";
    selectedCards = [];

    // Generar únicamente las 12 cartas normales
    for (let i = 1; i <= 12; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<img src="${i}.png" alt="card ${i}">`;
        card.onclick = () => toggleSelect(card, i); // Pasamos solo el número
        cardsContainer.appendChild(card);
    }
}

// Selección múltiple
function toggleSelect(card, cardNumber) {
    if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        selectedCards = selectedCards.filter(c => c !== cardNumber);
    } else {
        card.classList.add("selected");
        selectedCards.push(cardNumber);
    }
}

// Ir a sección 3 (Búsqueda)
function goToSearching() {
    if (selectedCards.length === 0) {
        alert("Please select at least one card.");
        return;
    }

    document.getElementById("section2").classList.remove("active");
    document.getElementById("section3").classList.add("active");

    const playerID = document.getElementById("playerID").value;
    document.getElementById("searchingPlayer").innerText = "ID: " + playerID;

    let dots = 0;
    const loadingText = document.getElementById("loadingText");
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        loadingText.innerText = "Loading" + ".".repeat(dots);
    }, 400);

    setTimeout(() => {
        clearInterval(interval);
        document.getElementById("section3").classList.remove("active");
        document.getElementById("section4").classList.add("active");

        const finalCards = document.getElementById("finalCards");
        finalCards.innerHTML = "";

        // Mostrar solo las cartas seleccionadas (solo imágenes)
        selectedCards.forEach(num => {
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card", "selected");
            cardDiv.innerHTML = `<img src="${num}.png" alt="reward ${num}">`;
            finalCards.appendChild(cardDiv);
        });

        launchConfetti();
    }, 1500);
}

function restart() {
    document.getElementById("section4").classList.remove("active");
    document.getElementById("section1").classList.add("active");
    document.getElementById("playerID").value = "";
    selectedCards = [];
}

function launchConfetti() {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}