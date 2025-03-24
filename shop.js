class Shop {
    constructor(player) {
        this.player = player;
        this.units = [
            { name: 'Baklava Fabriek', cost: 50, rate: 1 },
            { name: 'Baklava Winkel', cost: 100, rate: 2 },
            { name: 'Baklava Restaurant', cost: 200, rate: 3 },
            { name: 'Baklava Keten', cost: 400, rate: 4 },
            { name: 'Baklava Imperium', cost: 800, rate: 5 }
        ];
        this.upgrades = [
            { name: 'Klik Upgrade', cost: 100, multiplier: 2, type: 'click' },
            { name: 'Prod. Upgrade', cost: 200, multiplier: 2, type: 'production' }
        ];
        this.init();
    }

    init() {
        this.render('units', this.units, this.buyUnit.bind(this));
        this.render('upgrades', this.upgrades, this.buyUpgrade.bind(this));
    }

    render(containerId, items, buyFunction) {
        const container = document.getElementById(containerId);
        container.innerHTML = `<h3>${containerId === 'units' ? 'Eenheden' : 'Upgrades'}</h3>` +
            items.map((item, index) => `<button onclick="shop.${buyFunction.name}(${index})">${item.name} (${item.cost}p)</button>`).join('');
    }

    buyUnit(index) {
        let unit = this.units[index];
        if (this.player.points >= unit.cost) {
            this.player.points -= unit.cost;
            this.player.producerRate += unit.rate;
            unit.cost = Math.floor(unit.cost * 1.15);
            this.player.updateUI();
            this.render('units', this.units, this.buyUnit.bind(this));
        }
    }

    buyUpgrade(index) {
        let upgrade = this.upgrades[index];
        if (this.player.points >= upgrade.cost) {
            this.player.points -= upgrade.cost;
            this.player[upgrade.type === 'click' ? 'clickValue' : 'producerRate'] *= upgrade.multiplier;
            upgrade.cost = Math.floor(upgrade.cost * 1.15);
            this.player.updateUI();
            this.render('upgrades', this.upgrades, this.buyUpgrade.bind(this));
        }
    }
}

window.addEventListener('load', () => {
    window.shop = new Shop(player);
});
