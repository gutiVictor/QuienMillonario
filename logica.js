const questions = [
    {
        question: "¿En qué año Cristóbal Colón llegó a América?",
        options: ["1492", "1489", "1495", "1500"],
        correct: 0
    },
    {
        question: "¿Quién fue el primer emperador romano?",
        options: ["Julio César", "Augusto", "Nerón", "Calígula"],
        correct: 1
    },
    {
        question: "¿En qué año comenzó la Primera Guerra Mundial?",
        options: ["1913", "1914", "1915", "1916"],
        correct: 1
    },
    {
        question: "¿Cuál fue la capital del Imperio Azteca?",
        options: ["Tenochtitlán", "Cusco", "Machu Picchu", "Chichén Itzá"],
        correct: 0
    },
    {
        question: "¿En qué año cayó el Muro de Berlín?",
        options: ["1987", "1988", "1989", "1990"],
        correct: 2
    },
    {
        question: "¿Quién fue el primer presidente de México?",
        options: ["Benito Juárez", "Guadalupe Victoria", "Miguel Hidalgo", "Porfirio Díaz"],
        correct: 1
    },
    {
        question: "¿En qué año terminó la Segunda Guerra Mundial?",
        options: ["1944", "1945", "1946", "1947"],
        correct: 1
    },
    {
        question: "¿Cuál fue la primera civilización de la historia?",
        options: ["Egipcia", "Sumeria", "China", "India"],
        correct: 1
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        options: ["Miguel Ángel", "Leonardo da Vinci", "Rafael", "Botticelli"],
        correct: 1
    },
    {
        question: "¿En qué año se descubrió América?",
        options: ["1490", "1491", "1492", "1493"],
        correct: 2
    },
    {
        question: "¿Cuál fue la primera dinastía china?",
        options: ["Xia", "Shang", "Zhou", "Qin"],
        correct: 0
    },
    {
        question: "¿En qué año se independizó México de España?",
        options: ["1810", "1821", "1824", "1836"],
        correct: 1
    }
];

let currentQuestion = 0;
let currentPrize = 0;
const prizes = [500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];

function startGame() {
    currentQuestion = 0;
    currentPrize = 0;
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
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('pierde.mp3');

function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestion];
    if (selectedIndex === questionData.correct) {
        correctSound.play();  // Play correct sound
        currentPrize = prizes[currentQuestion];
        currentQuestion++;
        
        if (currentQuestion >= questions.length) {
            alert(`¡Felicidades! Has ganado $${currentPrize}`);
            return;
        }
        
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

function useFiftyFifty() {
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

function usePhoneFriend() {
    const lifeline = document.getElementById('phone-friend');
    if (lifeline.classList.contains('used')) return;
    
    const questionData = questions[currentQuestion];
    alert(`Tu amigo piensa que la respuesta correcta es: ${questionData.options[questionData.correct]}`);
    lifeline.classList.add('used');
}

function useAudience() {
    const lifeline = document.getElementById('audience');
    if (lifeline.classList.contains('used')) return;
    
    const questionData = questions[currentQuestion];
    const correctOption = questionData.options[questionData.correct];
    alert(`El público vota mayoritariamente por: ${correctOption}`);
    lifeline.classList.add('used');
}