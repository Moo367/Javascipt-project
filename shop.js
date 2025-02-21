class Shop {
    constructor(player) {
        this.player = player;
        this.units = [
            { name: 'Eenheid', cost: 50, rate: 1 },
            // Voeg hier meer eenheden toe indien gewenst
        ];
        this.upgrades = [
            { name: 'Klik Upgrade', cost: 100, multiplier: 2, type: 'click' },
            { name: 'Prod. Upgrade', cost: 200, multiplier: 2, type: 'production' },
            // Voeg hier meer upgrades toe indien gewenst
        ];
        this.init();
    }

    init() {
        this.renderUnits();
        this.renderUpgrades();
    }

    renderUnits() {
        const unitsContainer = document.getElementById('units');
        unitsContainer.innerHTML = '<h3>Eenheden</h3>';
        this.units.forEach((unit, index) => {
            const unitButton = document.createElement('button');
            unitButton.innerText = `${unit.name} (${unit.cost}p)`;
            unitButton.addEventListener('click', () => this.buyUnit(index));
            unitsContainer.appendChild(unitButton);
        });
    }

    renderUpgrades() {
        const upgradesContainer = document.getElementById('upgrades');
        upgradesContainer.innerHTML = '<h3>Upgrades</h3>';
        this.upgrades.forEach((upgrade, index) => {
            const upgradeButton = document.createElement('button');
            upgradeButton.innerText = `${upgrade.name} (${upgrade.cost}p)`;
            upgradeButton.addEventListener('click', () => this.buyUpgrade(index));
            upgradesContainer.appendChild(upgradeButton);
        });
    }

    buyUnit(index) {
        const unit = this.units[index];
        if (this.player.points >= unit.cost) {
            this.player.points -= unit.cost;
            this.player.producers++;
            this.player.producerRate += unit.rate;
            unit.cost = Math.floor(unit.cost * 1.15); // Verhoog de kosten voor de volgende aankoop
            this.player.addPurchase(unit.name); // Add the purchase to the player's list
            this.player.updatePointsDisplay();
            this.renderUnits();
        }
    }

    buyUpgrade(index) {
        const upgrade = this.upgrades[index];
        if (this.player.points >= upgrade.cost) {
            this.player.points -= upgrade.cost;
            if (upgrade.type === 'click') {
                this.player.clickValue *= upgrade.multiplier;
            } else if (upgrade.type === 'production') {
                this.player.producerRate *= upgrade.multiplier;
            }
            upgrade.cost = Math.floor(upgrade.cost * 2); // Verhoog de kosten voor de volgende aankoop
            this.player.addPurchase(upgrade.name); // Add the purchase to the player's list
            this.player.updatePointsDisplay();
            this.renderUpgrades();
        }
    }
}

// Initieer de winkel bij het laden van de pagina
window.addEventListener('load', () => {
    const shop = new Shop(player);
});