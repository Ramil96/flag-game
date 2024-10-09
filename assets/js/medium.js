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

// Add a flag to track if results have been shown
let resultsShown = false;

// Utility function to shuffle an array
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
            // Number of questions each new game
            let qCount = 15;
            questionNum(qCount);
            // Random question each new game
            questions = questions.sort(() => Math.random() - Math.random()).slice(0, 15);
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
    myRequest.open('GET', 'assets/data/medium_flag_questions.json', true);
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
        flagImg.src = `assets/images/medium/${obj.img}`;

        // Clone and shuffle options array
        let options = shuffleArray([...obj.options]);

        // Create Options
        flagLis.forEach((li, i) => {
            // Give each li a dynamic ID
            li.id = `answer_${i + 1}`;

            // Assign the shuffled options to the li elements
            li.dataset.answer = options[i]; // Dynamic assignment of shuffled option to each li
            li.innerHTML = options[i];      // Display the shuffled option

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

        // Reset the timer because the answer is correct
        resetTimer(); 
    } else {
        selectedLi.classList.add('wrong'); // Incorrect answer
        wrongAnswer++; // Increment wrong answers count
        // Do NOT reset the timer when the answer is wrong
    }

    // Check if all questions are answered
    if (currentIndex >= 15) { // Assuming total questions are 15
        clearInterval(timerInterval); // Stop the timer when all questions are answered
        showResults(15); // Show the results screen
    }
}

// New game logic (optional for reset)
btnNewGame.addEventListener('click', () => {
    // Reload the page to start a new game (you can add a better reset logic)
    window.location.reload();
});

let timeLeft = 20; // Set the time limit (in seconds)
let timerInterval = setInterval(updateTimer, 1000); // Start the timer when the game begins

function updateTimer() {
    let timeDisplay = document.getElementById('timeLeft');
    
    // Decrease the time left by 1
    timeLeft--;
    
    // Update the time display
    timeDisplay.innerHTML = timeLeft;

    // If there are 5 seconds left, shake the screen
    if (timeLeft <= 5) {
        document.body.classList.add('shake'); // Add shake class
        // Remove the shake class after the animation completes
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500); // Duration of the shake animation
    }

    // If the time reaches 0, stop the game and show the end screen
    if (timeLeft <= 0) {
        clearInterval(timerInterval); // Stop the timer
        showTimeoutScreen(); // Trigger the timeout screen
    }
}

// Function to reset the timer on correct answers
function resetTimer() {
    clearInterval(timerInterval); // Clear the previous timer
    timeLeft = 20; // Reset time limit to 20 seconds
    timerInterval = setInterval(updateTimer, 1000); // Start a new timer
}

// Function to show the results when the user completes all questions
function showResults(totalQuestions) {
    // Check if results have already been shown
    if (resultsShown) return; // If yes, exit the function early

    resultsShown = true; // Set the flag to true to indicate results are being shown

    // Hide the flag image and options
    flagOptions.innerHTML = '';
    flagImgDiv.innerHTML = '';

    // Stop the timer when the game finishes
    clearInterval(timerInterval);

    // Display the score result section
    scoreDiv.style.display = 'block'; // Show the score div
    correctAns.innerHTML = rightAnswer; // Display the correct answers count
    incorrectAns.innerHTML = wrongAnswer; // Display the incorrect answers count

    // Determine the user level based on correct answers
    let userLevel = '';
    let message = '';

    if (rightAnswer === totalQuestions) {
        userLevel = "James Cook";
        message = "Congratulations! You are a master of geography!";
    } else if (rightAnswer > 10) {
        userLevel = "Ferdinand Magellan";
        message = "Great job! You're quite the explorer!";
    } else if (rightAnswer > 5) {
        userLevel = "Explorer";
        message = "Good effort! Keep exploring!";
    } else {
        userLevel = "Lost Wanderer";
        message = "Don't worry, every explorer has to start somewhere!";
    }

    // Display the user level and message
    const levelMessageDiv = document.createElement('div');
    levelMessageDiv.classList.add('level-message');
    levelMessageDiv.innerHTML = `
        <h3>Your Level: ${userLevel}</h3>
        <p>${message}</p>
    `;

    // Style the level message dynamically
    levelMessageDiv.style.textAlign = 'center'; // Center text
    levelMessageDiv.style.fontSize = '1.5rem'; // Font size
    levelMessageDiv.style.marginTop = '20px'; // Margin for spacing
    levelMessageDiv.style.color = 'darkgreen'; // Text color
    levelMessageDiv.style.fontFamily = "'Baloo Paaji 2', sans-serif"; // Consistent font

    // Add the level message to the score display section
    scoreDiv.appendChild(levelMessageDiv);
}

// Function to handle what happens when time runs out
function showTimeoutScreen() {
    // Hide the game content
    document.querySelector('.flags').style.display = 'none';

    // Show a message
    let timeoutMessage = document.createElement('div');
    timeoutMessage.classList.add('timeout-message');
    timeoutMessage.innerHTML = `
        <h2>Time's Up!</h2>
        <p>Unfortunately, you ran out of time. Better luck next time!</p>
        <button id="retryGame">Try Again</button>
        <button id="homeButton">Home</button>
    `;

    // Set styles for the timeout message dynamically
    timeoutMessage.style.display = 'flex';
    timeoutMessage.style.flexDirection = 'column';
    timeoutMessage.style.alignItems = 'center';
    timeoutMessage.style.textAlign = 'center';
    timeoutMessage.style.marginTop = '20px';
    timeoutMessage.style.fontFamily = "'Baloo Paaji 2', sans-serif"; // Consistent font
    timeoutMessage.style.color = 'darkred'; // Text color

    // Append the timeout message to the score div
    scoreDiv.innerHTML = ''; // Clear previous content
    scoreDiv.appendChild(timeoutMessage);

    // Add event listeners for the buttons
    document.getElementById('retryGame').addEventListener('click', () => {
        window.location.reload(); // Reload the page for a new game
    });
    document.getElementById('homeButton').addEventListener('click', () => {
        // Implement the action for the home button (e.g., redirect to home page)
        window.location.href = 'home.html'; // Adjust the path as needed
    });
}
