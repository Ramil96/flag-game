// Select elements
let countSpan = document.querySelector('.count span');
let flagImgDiv = document.querySelector('.flag-img');
let flagImg = document.querySelector('.flag-img img');
let flagOptions = document.querySelector('.flag-options ul');
let flagLis = document.querySelectorAll('.flag-options ul li');
let score = document.querySelector('h3 span');
let scoreDiv = document.querySelector('.score');
let correctAns = document.querySelector('.score .Right span'); // Adjusted to target correctly
let incorrectAns = document.querySelector('.score .incorrect span'); // Adjusted to target correctly
let btnNewGame = document.querySelector('#newGame');

let currentIndex = 0;
let rightAnswer = 0;
let wrongAnswer = 0; // Added a variable to track incorrect answers

function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);
            console.log(questions);
            // Number of questions each new game
            let qCount = 10;
            questionNum(qCount);
            // Add questions data
            addQuestionData(questions[currentIndex], qCount);

            // Add click event to each option
            flagLis.forEach((li) => {
                li.addEventListener('click', () => {
                    let correctAnswer = questions[currentIndex].right_answer; // Correct answer for the current question
                    // Remove 'active' class from all options
                    flagLis.forEach((item) => item.classList.remove('active'));
                    li.classList.add('active');
                    
                    // Increase index for the next question
                    currentIndex++;

                    // Check the answer after 500ms
                    setTimeout(() => {
                        checkAnswer(correctAnswer, li); // Passing the clicked option
                    }, 500);

                    setTimeout(() => {
                        // Remove previous image source
                        flagImg.src = '';
                        // Remove all classes (active, success, wrong)
                        li.classList.remove('active');
                        li.classList.remove('success');
                        li.classList.remove('wrong');

                        // Add next question data
                        if (currentIndex < qCount) {
                            addQuestionData(questions[currentIndex], qCount);
                        } else {
                            // Show results after the last question
                            showResults(qCount);
                        }
                    }, 1000);
                });
            });
        }
    };
    myRequest.open('GET', 'assets/data/flag_questions.json', true);
    myRequest.send();
}

getQuestions();

// Function to display the total number of questions
function questionNum(num) {
    countSpan.innerHTML = num;
}

// Function to add question data
function addQuestionData(obj, count) {
    if (currentIndex < count) {
        flagImg.src = `assets/images/${obj.img}`;
        // Create Options
        flagLis.forEach((li, i) => {
            // Give each li a dynamic ID
            li.id = `answer_${i + 1}`;
            // Create for each li a dynamic data-attribute
            li.dataset.answer = obj.options[i];
            // Inserting option in the li
            li.innerHTML = obj.options[i];
            // Clear previous classes
            li.classList.remove('active', 'success', 'wrong');
        });
    }
}

// Function to check if the chosen answer is correct or not
function checkAnswer(correctAnswer, selectedLi) {
    let chosenAnswer = selectedLi.dataset.answer;
    if (correctAnswer === chosenAnswer) {
        selectedLi.classList.add('success'); // Correct answer
        rightAnswer++; // Increment right answers count
        score.innerHTML = rightAnswer; // Update score display
    } else {
        selectedLi.classList.add('wrong'); // Incorrect answer
        wrongAnswer++; // Increment wrong answers count
    }
}

// Function to show the results (correct and incorrect answers)
function showResults(totalQuestions) {
    // Hide the flag image and options
    flagOptions.innerHTML = '';
    flagImgDiv.innerHTML = '';

    // Display the score result section
    scoreDiv.style.display = 'block'; // Show the score div
    correctAns.innerHTML = rightAnswer; // Display the correct answers count
    incorrectAns.innerHTML = wrongAnswer; // Display the incorrect answers count
}

// New game logic (optional for reset)
btnNewGame.addEventListener('click', () => {
    // Reload the page to start a new game (you can add a better reset logic)
    window.location.reload();
});
