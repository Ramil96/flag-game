// select elements
let countSpan = document.querySelector('.count span')
let flagImgDiv = document.querySelector('.flag-img')
let flagImg = document.querySelector('.flag-img img')
let flagOptions = document.querySelector('.flag-options ul');
let flagLis = document.querySelectorAll('.flag-options ul li');

let currentIndex = 0;

function getQuestions(){
    let myRequest = new XMLHttpRequest()
    myRequest.onreadystatechange = function (){
        if(this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);
            console.log(questions);
            // number of questions each new game
            let qCount = 10;
            questionNum(qCount);
        }
    }
    myRequest.open("GET", "assets/data/flag_questions.json", true)
    myRequest.send();
}

getQuestions();

function questionNum(num) {
    countSpan.innerHTML = num;
}

function addQuestionData(obj, count) {
    if(currentIndex < count) {
        flagImg.src = `assets/images/${obj.img}`;
        //Create Options
        flagLis.forEach((li, i) => {
            //Give each Li a dynamic Id
            li.id = `answer_${i+1}`;
            //Create for each Li a dynamic data-attribute
            li.dataset.answer=obj[`options`][i];
        })
    }
}
