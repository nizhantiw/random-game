class CricketGame {
    constructor() {
        this.playerScore = 0;
        this.aiScore = 0;
        this.currentInnings = 'player';
        this.balls = 0;
        this.wickets = 0;
    }

    playBall(playerChoice) {
        // AI always chooses the same as the player to get them out, except on the last ball
        const bowlerChoice = (this.balls === 5) ? (playerChoice + 1) % 7 : playerChoice;
        this.log(`You chose: ${playerChoice}`);
        this.log(`Bowler chose: ${bowlerChoice}`);

        if (playerChoice === bowlerChoice) {
            this.log("Out!");
            this.wickets++;
        } else {
            this.playerScore += playerChoice;
            this.log(`Scored ${playerChoice} runs!`);
        }

        this.balls++;
        this.log(`Score: ${this.playerScore}/${this.wickets} (${this.balls} balls)`);

        if (this.balls === 6 || this.wickets === 1) {
            this.endPlayerInnings();
        }
    }

    playAIInnings() {
        this.log("\nAI's Innings:");
        this.aiScore = 0;
        this.balls = 0;
        this.wickets = 0;

        // AI always scores one more run than the player
        this.aiScore = this.playerScore + 1;
        this.balls = 6;

        this.log(`AI scored ${this.aiScore} runs in 6 balls!`);
        this.log(`Score: ${this.aiScore}/${this.wickets} (${this.balls} balls)`);

        this.endGame();
    }

    endPlayerInnings() {
        this.log(`\nYour final score: ${this.playerScore}`);
        this.currentInnings = 'ai';
        setTimeout(() => this.playAIInnings(), 1000);
    }

    endGame() {
        this.log(`\nAI final score: ${this.aiScore}`);
        this.log("AI wins!");
        this.log("\nRefresh the page to play again.");
    }

    log(message) {
        const gameLog = document.getElementById('gameLog');
        gameLog.innerHTML += message + '<br>';
        gameLog.scrollTop = gameLog.scrollHeight;
    }
}

const game = new CricketGame();

function createButtons() {
    const buttonsDiv = document.getElementById('buttons');
    for (let i = 0; i <= 6; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            if (game.currentInnings === 'player' && game.balls < 6 && game.wickets < 1) {
                game.playBall(i);
            }
        };
        buttonsDiv.appendChild(button);
    }
}

createButtons();
game.log("Welcome to One-Over AI Cricket!");
game.log("You're batting first. Click a button to play your shot.");
