// Select elements
let countSpan = document.querySelector('.count span');
let flagImgDiv = document.querySelector('.flag-img');
let flagImg = document.querySelector('.flag-img img');
let flagOptions = document.querySelector('.flag-options ul');
let flagLis = document.querySelectorAll('.flag-options ul li');
let score = document.querySelector('h3 span');
let scoreDiv = document.querySelector('.score');
let correctAns = document.querySelector('.score .Right span'); 
let incorrectAns = document.querySelector('.score .incorrect span');
let btnNewGame = document.querySelector('#newGame');

let currentIndex = 0;
let rightAnswer = 0;
let wrongAnswer = 0; 

let resultsShown = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);
            let qCount = 15;
            questionNum(qCount);
            questions = questions.sort(() => Math.random() - Math.random()).slice(0, 15);
            addQuestionData(questions[currentIndex], qCount);

            flagLis.forEach((li) => {
                li.addEventListener('click', () => {
                    let correctAnswer = questions[currentIndex].right_answer; 
                    flagLis.forEach((item) => item.classList.remove('active'));
                    li.classList.add('active');
                    
                    currentIndex++;

                    setTimeout(() => {
                        checkAnswer(correctAnswer, li); 
                    }, 500);

                    setTimeout(() => {
                        flagImg.src = '';
                        li.classList.remove('active');
                        li.classList.remove('success');
                        li.classList.remove('wrong');

                        if (currentIndex < qCount) {
                            addQuestionData(questions[currentIndex], qCount);
                        } else {
                            showResults(qCount);
                        }
                    }, 1000);
                });
            });
        }
    };
    myRequest.open('GET', 'assets/data/medium_flag_questions.json', true);
    myRequest.send();
}

getQuestions();

function questionNum(num) {
    countSpan.innerHTML = num;
}

function addQuestionData(obj, count) {
    if (currentIndex < count) {
        flagImg.src = `assets/images/medium/${obj.img}`;

        let options = shuffleArray([...obj.options]);

        flagLis.forEach((li, i) => {
            li.id = `answer_${i + 1}`;

            li.dataset.answer = options[i]; 
            li.innerHTML = options[i];  

            li.classList.remove('active', 'success', 'wrong');
        });
    }
}

// Check if the chosen answer is correct or not
function checkAnswer(correctAnswer, selectedLi) {
    let chosenAnswer = selectedLi.dataset.answer;
    if (correctAnswer === chosenAnswer) {
        selectedLi.classList.add('success'); 
        rightAnswer++; 
        score.innerHTML = rightAnswer; 
        resetTimer(); 
    } else {
        selectedLi.classList.add('wrong'); 
        wrongAnswer++; 
    }

    if (currentIndex >= 15) { 
        clearInterval(timerInterval); 
        showResults(15); 
    }
}

// New game logic
btnNewGame.addEventListener('click', () => {
    window.location.reload();
});

let timeLeft = 20; 
let timerInterval = setInterval(updateTimer, 1000); 

function updateTimer() {
    let timeDisplay = document.getElementById('timeLeft');
    timeLeft--;
    timeDisplay.innerHTML = timeLeft;

    if (timeLeft <= 5) {
        document.body.classList.add('shake'); 
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
    }

    if (timeLeft <= 0) {
        clearInterval(timerInterval); 
        showTimeoutScreen(); 
    }
}

// Reset timer on correct answers
function resetTimer() {
    clearInterval(timerInterval); 
    timeLeft = 20; 
    timerInterval = setInterval(updateTimer, 1000); 
}

// Show the results based on the score
function showResults(totalQuestions) {
    if (resultsShown) return; 
    resultsShown = true; 

    flagOptions.innerHTML = '';
    flagImgDiv.innerHTML = '';

    clearInterval(timerInterval);

    // Stop the timer when the game is finished
    clearInterval(timerInterval);

    scoreDiv.style.display = 'block'; 
    correctAns.innerHTML = rightAnswer;
    incorrectAns.innerHTML = wrongAnswer; 

    let userLevel = '';
    let message = '';
    let imageUrl = ''; 

    if (rightAnswer === totalQuestions) {
        userLevel = "James Cook";
        message = "Congratulations! You are a master of geography!";
        imageUrl = 'assets/images/jc.jpg'; 
    } else if (rightAnswer > 12) {
        userLevel = "Ferdinand Magellan";
        message = "Great job! You're quite the explorer!";
        imageUrl = 'assets/images/fm.jpg'; 
    } else if (rightAnswer > 8) {
        userLevel = "Explorer";
        message = "Good effort! Keep exploring!";
        imageUrl = ''; 
    } else {
        userLevel = "Lost Wanderer";
        message = "Don't worry, every explorer has to start somewhere!";
        imageUrl = ''; 
    }

    const levelMessageDiv = document.createElement('div');
    levelMessageDiv.classList.add('level-message');
    levelMessageDiv.innerHTML = `
        <h3>Your Level: ${userLevel}</h3>
        <p>${message}</p>
    `;

    levelMessageDiv.style.textAlign = 'center'; 
    levelMessageDiv.style.fontSize = '2rem';  
    levelMessageDiv.style.marginTop = '20px'; 
    levelMessageDiv.style.color = 'darkgreen'; 
    levelMessageDiv.style.fontFamily = "'Baloo Paaji 2', sans-serif"; 

    scoreDiv.appendChild(levelMessageDiv);

    if (imageUrl) {
        const descriptionDiv = document.createElement('p');
        descriptionDiv.innerHTML = userLevel === "James Cook" 
            ? "James Cook was a British explorer, navigator, and cartographer who mapped the Pacific." 
            : "Ferdinand Magellan was a Portuguese explorer who led the first circumnavigation of the Earth.";
        descriptionDiv.style.textAlign = 'center';
        descriptionDiv.style.color = 'darkblue';
        descriptionDiv.style.fontSize = '1.5rem';  
        descriptionDiv.style.marginTop = '10px';

        const explorerImage = document.createElement('img');
        explorerImage.src = imageUrl;
        explorerImage.alt = userLevel;
        explorerImage.style.maxWidth = '300px';  
        explorerImage.style.marginTop = '10px'; 
        explorerImage.style.borderRadius = '8px'; 

        scoreDiv.appendChild(descriptionDiv); 
        scoreDiv.appendChild(explorerImage); 
    }
}

function showTimeoutScreen() {
    document.querySelector('.flags').style.display = 'none';

    let timeoutMessage = document.createElement('div');
    timeoutMessage.classList.add('timeout-message');
    timeoutMessage.innerHTML = `
        <h2>Time's Up!</h2>
        <p>Unfortunately, you ran out of time. Better luck next time!</p>
        <button id="retryGame">Try Again</button>
        <button id="homeButton">Home</button>
    `;

    timeoutMessage.style.display = 'flex';
    timeoutMessage.style.flexDirection = 'column';
    timeoutMessage.style.alignItems = 'center';
    timeoutMessage.style.textAlign = 'center';
    timeoutMessage.style.marginTop = '20px';
    timeoutMessage.style.fontFamily = "'Baloo Paaji 2', sans-serif";
    timeoutMessage.style.color = 'darkred';

    scoreDiv.innerHTML = ''; 
    scoreDiv.appendChild(timeoutMessage);

    document.getElementById('retryGame').addEventListener('click', () => {
        window.location.reload(); 
    });
    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = './index.html'; 
    });
}
