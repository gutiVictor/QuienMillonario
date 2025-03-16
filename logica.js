import { questions } from './questions.js';

let currentQuestion = 0;
let currentPrize = 0;
const prizes = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function startGame() {
    currentQuestion = 0;
    currentPrize = 0;
    shuffleArray(questions);
    updatePrizeLadder();
    showQuestion();
}

function showQuestion() {
    const questionData = questions[currentQuestion];
    document.getElementById('question').textContent = questionData.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
}

// Add these lines at the top of your file, after the questions array
const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/pierde.mp3');

function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestion];
    if (selectedIndex === questionData.correct) {
        correctSound.play();  // Play correct sound
        currentPrize = prizes[currentQuestion];
        
        if (currentQuestion >= questions.length - 1) {
            alert(`¡Felicidades! Has ganado el juego! Premio final: $${currentPrize}`);
            // Reset lifelines before starting new game
            document.querySelectorAll('.lifeline').forEach(lifeline => {
                lifeline.classList.remove('used');
                lifeline.style.display = 'block';
            });
            // Add a slight delay before restarting
            setTimeout(() => {
                startGame();
            }, 1500);
            return;
        }
        
        currentQuestion++;
        updatePrizeLadder();
        showQuestion();
    } else {
        wrongSound.play();  // Play wrong sound
        alert(`Juego terminado. Te llevas $${currentPrize}`);
        startGame();
    }
}

function updatePrizeLadder() {
    const prizeLevels = document.querySelectorAll('.prize-level');
    prizeLevels.forEach((level, index) => {
        level.classList.remove('current');
        if (prizes[index] === prizes[currentQuestion]) {
            level.classList.add('current');
        }
    });
}

export function useFiftyFifty() {
    const lifeline = document.getElementById('fifty-fifty');
    if (lifeline.classList.contains('used')) return;
    
    const questionData = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    let eliminated = 0;
    
    options.forEach((option, index) => {
        if (index !== questionData.correct && eliminated < 2) {
            option.style.display = 'none';
            eliminated++;
        }
    });
    
    lifeline.classList.add('used');
}

export function usePhoneFriend() {
    const lifeline = document.getElementById('phone-friend');
    if (lifeline.classList.contains('used')) return;
    
    const questionData = questions[currentQuestion];
    alert(`Tu amigo piensa que la respuesta correcta es: ${questionData.options[questionData.correct]}`);
    lifeline.classList.add('used');
}

export function useAudience() {
    const lifeline = document.getElementById('audience');
    if (lifeline.classList.contains('used')) return;
    
    const questionData = questions[currentQuestion];
    const correctOption = questionData.options[questionData.correct];
    alert(`El público vota mayoritariamente por: ${correctOption}`);
    lifeline.classList.add('used');
}