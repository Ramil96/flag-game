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

// shuffle array
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
            console.log(questions);
            let qCount = 10;
            questionNum(qCount);
            questions = questions.sort(() => Math.random() - Math.random()).slice(0, 10);
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
    myRequest.open('GET', 'assets/data/easy_flag_questions.json', true);
    myRequest.send();
}

getQuestions();

function questionNum(num) {
    countSpan.innerHTML = num;
}

function addQuestionData(obj, count) {
    if (currentIndex < count) {
        flagImg.src = `assets/images/easy/${obj.img}`;

        let options = shuffleArray([...obj.options]);

        flagLis.forEach((li, i) => {
            li.id = `answer_${i + 1}`;

            li.dataset.answer = options[i]; 
            li.innerHTML = options[i];      

            li.classList.remove('active', 'success', 'wrong');
        });
    }
}

function checkAnswer(correctAnswer, selectedLi) {
    let chosenAnswer = selectedLi.dataset.answer;
    if (correctAnswer === chosenAnswer) {
        selectedLi.classList.add('success'); 
        rightAnswer++; 
        score.innerHTML = rightAnswer; 
    } else {
        selectedLi.classList.add('wrong'); 
        wrongAnswer++; 
    }
}

function showResults(totalQuestions) {
    flagOptions.innerHTML = '';
    flagImgDiv.innerHTML = '';

    scoreDiv.style.display = 'block';
    correctAns.innerHTML = rightAnswer;
    incorrectAns.innerHTML = wrongAnswer;
}

btnNewGame.addEventListener('click', () => {
    window.location.reload();
});

let timeLeft = 30; 
let timerInterval = setInterval(updateTimer, 1000); 

function updateTimer() {
    let timeDisplay = document.getElementById('timeLeft');
    
    // Decrease the time left by 1
    timeLeft--;
    
    // Update the time display
    timeDisplay.innerHTML = timeLeft;

    // Shakes the screen if there are 5 seconds left
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

// Function to reset the timer on correct answers
function resetTimer() {
    clearInterval(timerInterval); // Clear the previous timer
    timeLeft = 31; 
    timerInterval = setInterval(updateTimer, 1000); // Start a new timer
}

// Modified function to check if the answer is correct or not
function checkAnswer(correctAnswer, selectedLi) {
    let chosenAnswer = selectedLi.dataset.answer;
    if (correctAnswer === chosenAnswer) {
        selectedLi.classList.add('success'); 
        rightAnswer++; 
        score.innerHTML = rightAnswer; 

        resetTimer(); 
    } else {
        selectedLi.classList.add('wrong'); // Incorrect answer
        wrongAnswer++; // Increment wrong answers
    }

    // Check if all questions are answered
    if (currentIndex >= totalQuestions) {
        clearInterval(timerInterval); 
        showResults(totalQuestions); 
    }
}

// Function to show the results when the user completes all questions
function showResults(totalQuestions) {
    flagOptions.innerHTML = '';
    flagImgDiv.innerHTML = '';

    clearInterval(timerInterval);

    scoreDiv.style.display = 'block'; // Show the score div
    correctAns.innerHTML = rightAnswer; // Display the correct answers count
    incorrectAns.innerHTML = wrongAnswer; // Display the incorrect answers count
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
    timeoutMessage.style.justifyContent = 'center'; 
    timeoutMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.9)'; 
    timeoutMessage.style.color = 'white'; 
    timeoutMessage.style.fontFamily = "'Baloo Paaji 2', sans-serif"; 
    timeoutMessage.style.fontSize = '2.5rem'; 
    timeoutMessage.style.textAlign = 'center'; 
    timeoutMessage.style.padding = '30px'; 
    timeoutMessage.style.borderRadius = '20px'; 
    timeoutMessage.style.margin = '50px auto'; 
    timeoutMessage.style.width = '80%'; 
    timeoutMessage.style.maxWidth = '600px'; 
    timeoutMessage.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)'; 
    timeoutMessage.style.position = 'relative'; 
    timeoutMessage.style.zIndex = '1000'; 
    timeoutMessage.style.transition = 'all 0.3s ease'; 

    document.querySelector('.container').appendChild(timeoutMessage);

    document.getElementById('retryGame').addEventListener('click', () => {
        window.location.reload(); 
    });

    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = './index.html'; 
    });
}