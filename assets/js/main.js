// select elements
let countSpan = document.querySelector('.count span');
let flagImgDiv = document.querySelector('.flag-img');
let flagImg = document.querySelector('.flag-img img');
let flagOptions = document.querySelector('.flag-options ul');
let flagLis = document.querySelectorAll('.flag-options ul li');
let score = document.querySelector('h3 span');
let scoreDiv = document.querySelector('.score');
let correctAns = document.querySelector('.score .right span');
let incorrectAns = document.querySelector('.score .wrong span');
let btnNewGame = document.querySelector('#newGame');

let currentIndex = 0;
let rightAnswer = 0;

function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);
            console.log(questions);
            // number of questions each new game
            let qCount = 10;
            questionNum(qCount);
            // Add questions data
            addQuestionData(questions[currentIndex], qCount);

            // Add click event to each option
            flagLis.forEach((li) => {
                li.addEventListener('click', () => {
                    let rightAnswer = questions[currentIndex].right_answer;
                    // Remove 'active' class from all options
                    flagLis.forEach((item) => item.classList.remove('active'));
                    li.classList.add('active');
                    
                    // Increase index for the next question
                    currentIndex++;

                    // Check the answer after 500ms
                    setTimeout(() => {
                        checkAnswer(rightAnswer, qCount);
                    }, 500);

                    setTimeout(() => {
                        //Remove previous image source
                        flagImg.src = '';
                        //Remove all classes (active, success, wrong)
                        li.classList.remove('active');
                        li.classList.remove('success');
                        li.classList.remove('wrong');

                        //Add question data
                        addQuestionData(questions[currentIndex], qCount);
                    }, 1000)
                });
            });
        }
    };
    myRequest.open('GET', 'assets/data/flag_questions.json', true);
    myRequest.send();
}

getQuestions();

function questionNum(num) {
    countSpan.innerHTML = num;
}

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

function checkAnswer(rAnswer, count) {
    let chosenAnswer;
    flagLis.forEach((li) => {
        if (li.classList.contains('active')) {
            chosenAnswer = li.dataset.answer;
            if (rAnswer === chosenAnswer) {
                li.classList.add('success'); // Correct answer
                rightAnswer++;
                score.innerHTML = rightAnswer; // Update score
            } else {
                li.classList.add('wrong'); // Wrong answer
            }
        }
    });
}

//Function to show result correct and wrong answer
function showResults(count) {
    if(currentIndex === count) {
        flagOptions.innerHTML = '';
        flagImgDiv.innerHTML ='';
        scoreDiv.style.display = 'block';
        correctAns.innerHTML = rightAnswer;
        incorrectAns.innerHTML = count - rightAnswer;
    }
}