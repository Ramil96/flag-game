// select elements
let countSpan = document.querySelector('.count span')
function getQuestions(){
    let myRequest = new XMLHttpRequest()
    myRequest.onstatechange = function (){
        if(this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);
            console.log(questions);
            // number of questions each new game
            let qCount = 10;
        }
    }
    myRequest.open("GET", "assets/data/flag_questions.json", true)
    myRequest.send();
}

getQuestions();