class Player {
    constructor() {
        this.points = 0;
        this.highscore = 0;
        this.producers = 0;
        this.producerCost = 50;
        this.producerRate = 1;
        this.clickValue = 1;
        this.purchases = [];
        this.loadHighscore();
        this.baklavaClicks = 0;
    }

    addPoints(amount) {
        this.points += amount;
        this.updatePointsDisplay();

        if (this.points > this.highscore) {
            this.highscore = this.points;
            this.saveHighscore();
        }
        this.updateHighscoreDisplay();
    }

    updatePointsDisplay() {
        document.getElementById('points').innerText = `Punten: ${this.points}`;
    }

    updateHighscoreDisplay() {
        document.getElementById('highscore').innerText = `Highscore: ${this.highscore}`;
    }

    saveHighscore() {
        localStorage.setItem('highscore', this.highscore);
    }

    loadHighscore() {
        const savedHighscore = localStorage.getItem('highscore');
        if (savedHighscore !== null) {
            this.highscore = parseInt(savedHighscore, 10);
        }
        this.updateHighscoreDisplay();
    }

    addBackgroundBaklava() {
        const backgroundContainer = document.getElementById('background-baklavas');
        const baklava = document.createElement('img');
        baklava.src = 'baklava.png';
        baklava.classList.add('background-baklava');

        const size = Math.random() * 40 + 80;
        baklava.style.width = `${size}px`;
        const x = Math.random() * (window.innerWidth - size);
        baklava.style.left = `${x}px`;
        baklava.style.bottom = `-100px`;

        backgroundContainer.appendChild(baklava);

        baklava.addEventListener('animationend', () => {
            backgroundContainer.removeChild(baklava);
        });
    }

    addPurchase(name) {
        const existingPurchase = this.purchases.find(purchase => purchase.name === name);
        if (existingPurchase) {
            existingPurchase.quantity++;
        } else {
            this.purchases.push({ name: name, quantity: 1 });
        }
        this.updatePurchasesDisplay();
    }

    updatePurchasesDisplay() {
        const purchasesList = document.getElementById('purchases-list');
        purchasesList.innerHTML = '';
        this.purchases.forEach(purchase => {
            const progressPercentage = (purchase.quantity / 100) * 100; // Calculate the progress percentage based on 100 units
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${purchase.name}: ${purchase.quantity}</span>
                <div class="progress-bar"><div class="progress" style="width: ${progressPercentage}%"></div></div>
            `;
            purchasesList.appendChild(listItem);
        });
    }

    startProduction() {
        setInterval(() => {
            this.addPoints(this.producers * this.producerRate);
        }, 1000);
    }
}

const player = new Player();
const cookie = document.getElementById('cookie');

cookie.addEventListener('click', () => {
    player.baklavaClicks++;
    player.addPoints(player.clickValue);
    player.addBackgroundBaklava();
    cookie.classList.remove('cookie-clicked');
    void cookie.offsetWidth;
    cookie.classList.add('cookie-clicked');
});

player.startProduction();