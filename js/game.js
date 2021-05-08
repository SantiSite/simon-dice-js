const btnStart = document.getElementById('btnStart');
const blue = document.getElementById('blue');
const violet = document.getElementById('violet');
const orange = document.getElementById('orange');
const green = document.getElementById('green');
const LastLevel = 10;

class Game {
    constructor() {
        this.initialize = this.initialize.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.initialize();
        this.generateSequence();
        setTimeout(() => (this.nextLevel()), 500);
    }

    toggleBtnStart() {
        if (btnStart.classList.contains('hide')) {
            btnStart.classList.remove('hide');
        } else {
            btnStart.classList.add('hide');
        }
    }

    initialize() {
        this.toggleBtnStart();
        this.level = 1;
        this.colors = {
            blue,
            violet,
            orange,
            green,
        }
    }

    generateSequence() {
        this.sequence = new Array(LastLevel).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    nextLevel() {
        this.subLevel = 0;
        this.illuminateSequence();
        this.addEventClick();
    }

    transformNumberToColor(number) {
        switch (number) {
            case 0:
                return 'blue';
            case 1:
                return 'violet';
            case 2:
                return 'orange';
            case 3:
                return 'green';
        }
    }

    transformColorToNumber(color) {
        switch (color) {
            case 'blue':
                return 0;
            case 'violet':
                return 1;
            case 'orange':
                return 2;
            case 'green':
                return 3;
        }
    }

    illuminateSequence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformNumberToColor(this.sequence[i]);
            setTimeout(() => (this.illuminateColor(color)), 1000 * i);
        }
    }

    illuminateColor(color) {
        this.colors[color].classList.add('light');
        setTimeout(() => (this.turnOffColor(color)), 300);
    }

    turnOffColor(color) {
        this.colors[color].classList.remove('light');
    }

    addEventClick() {
        this.colors.blue.addEventListener('click', this.selectColor);
        this.colors.violet.addEventListener('click', this.selectColor);
        this.colors.green.addEventListener('click', this.selectColor);
        this.colors.orange.addEventListener('click', this.selectColor);
    }

    removeEventsClick() {
        this.colors.blue.removeEventListener('click', this.selectColor);
        this.colors.violet.removeEventListener('click', this.selectColor);
        this.colors.green.removeEventListener('click', this.selectColor);
        this.colors.orange.removeEventListener('click', this.selectColor);
    }

    wonGame() {
        swal({
            title: 'FIN DEL JUEGO',
            text: '¡Felicitaciones has ganado!',
            icon: 'success',
            button: 'Volver a jugar',
        }).then(() => (this.initialize()));
    }

    lostGame() {
        swal({
            title: 'FIN DEL JUEGO',
            text: 'Buen intento. La próxima lo lograras.',
            icon: 'error',
            button: 'Volver a jugar',
        }).then(() => {
            this.removeEventsClick();
            this.initialize();
        });
    }

    selectColor(e) {
        const colorName = e.target.dataset.color;
        const colorNumber = this.transformColorToNumber(colorName);
        this.illuminateColor(colorName);
        if (colorNumber === this.sequence[this.subLevel]) {
            this.subLevel++;
            if (this.subLevel === this.level) {
                this.level++;
                this.removeEventsClick()
                if (this.level === (LastLevel + 1)) {
                    this.wonGame();
                } else {
                    setTimeout(this.nextLevel, 1200);
                }
            }
        } else {
            this.lostGame();
        }
    }
}

function startGame() {
    window.game = new Game();
}
