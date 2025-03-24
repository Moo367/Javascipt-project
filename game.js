class Player {
    constructor() {
        this.points = 0;
        this.highscore = 0;
        this.producers = 0;
        this.producerCost = 50;
        this.producerRate = 1; // Points per second per producer
        this.clickValue = 1; // Points per click
        this.purchases = []; // Array to keep track 
        this.loadHighscore();
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
            const progressPercentage = (purchase.quantity / 100) * 100; 
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
    player.addPoints(player.clickValue);
    cookie.classList.remove('cookie-clicked');
    void cookie.offsetWidth;
    cookie.classList.add('cookie-clicked');
});

player.startProduction();