let randomNumber = Math.floor(Math.random() * 100) + 1;
let score = 100;
let highScore = 0;

// HTML elementi
const guessInput = document.getElementById('guessInput');
const submitGuessBtn = document.getElementById('submitGuessBtn');
const resultMessage = document.getElementById('resultMessage');
const currentScoreDisplay = document.getElementById('currentScore');
const highScoreDisplay = document.getElementById('highScore');
const resetBtn = document.getElementById('resetBtn');

// Provjera unosa
function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // Validacija unosa
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        resultMessage.textContent = 'Please enter a number between 1 and 100.';
        resultMessage.style.color = 'red';
        return;
    }

    // Smanjenje bodova za svaki netačan pokušaj
    score -= 1;
    currentScoreDisplay.textContent = `Current Score: ${score}`;

    // Automatsko brisanje unosa
    guessInput.value = '';

    // Razlika između unosa i traženog broja
    const difference = Math.abs(userGuess - randomNumber);

    // Tačan pogodak
    if (userGuess === randomNumber) {
        resultMessage.textContent = `You guessed the number ${randomNumber}! Congratulations!`;
        resultMessage.style.color = '#32cd32';
        resultMessage.style.animation = 'sparkle 1.5s infinite';
        
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = `High Score: ${highScore}`;
        }

        submitGuessBtn.disabled = true;
        resetBtn.style.display = 'block';
        animateVictory();
        changeBackgroundColor('#32cd32', '#ffcc00', '#ff6347');
    } 
    // Blizu pogotka (±7)
    else if (difference <= 7) {
        resultMessage.textContent = `You're close! Try ${userGuess < randomNumber ? 'higher' : 'lower'}.`;
        resultMessage.style.color = '#ffcc00';
        changeBackgroundColor('#ffcc00', '#32cd32', '#ff6347');
    }
    // Prenizak unos
    else if (userGuess < randomNumber) {
        resultMessage.textContent = 'Guess higher!';
        resultMessage.style.color = '#32cd32';
        changeBackgroundColor('#ff7e5f', '#32cd32', '#ff6347');
    }
    // Previsok unos
    else if (userGuess > randomNumber) {
        resultMessage.textContent = 'Guess lower!';
        resultMessage.style.color = '#ff6347';
        changeBackgroundColor('#ff6347', '#ff7e5f', '#feb47b');
    }
}

// Animacija za pobjedu
function animateVictory() {
    // Pulsirajući efekt na body tagu
    document.body.style.animation = 'pulse 1s infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);

    // Svjetlucanje na poruci o rezultatu
    resultMessage.style.animation = 'sparkle 1.5s infinite';
}

// Resetovanje igre
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    score = 100;
    currentScoreDisplay.textContent = `Current Score: ${score}`;
    resultMessage.textContent = '';
    resultMessage.style.animation = '';
    guessInput.value = '';
    submitGuessBtn.disabled = false;
    resetBtn.style.display = 'none';
    changeBackgroundColor('#ff7e5f', '#feb47b', '#ff7e5f');
}

// Promjena pozadine sa laganim prijelazima
function changeBackgroundColor(color1, color2, color3) {
    document.body.style.transition = 'background 5s ease-in-out';
    document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`;
}

// Event listener za pokušaj
submitGuessBtn.addEventListener('click', checkGuess);

// Event listener za resetovanje igre
resetBtn.addEventListener('click', resetGame);
