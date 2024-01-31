// move questions?


// going to indentify how long the timer will be for the questions
var starquesIndex = 0;
var time = starques.length * 30;
var timeId;

var timeEl = document.getElementById('time');
var starquesEl = document.getElementById('question');
var optionsEl = document.getElementById('options');
var answerEl = document.getElementById('answer');
var initialsEl = document.getElementById('initial');
var beginBtn = document.getElementById('begin');
var finishBtn = document.getElementById('finish');
var eraseBtn = document.getElementById('erase');




// how the game is starting and ending
function beginQuiz() {
    var starterEl = document.getElementById('starter');
    // var starterEl = document.getElementById('starter');
    starterEl.setAttribute('class', 'hide');
    starquesEl.removeAttribute('class');
    timeId = setInterval(clockTimer, 1000);
    timeEl.textContent = time;
    showQuestion();
}



// how the questions show on the screen
function showQuestion() {
    var currentStarques = starques[starquesIndex];

    var questionEl = document.getElementById('question-display');
    questionEl.textContent = currentStarques.question;

    optionsEl.innerHTML = '';

    for (var i = 0; i < currentStarques.options.length; i++) {
        var option = currentStarques.options[i];
        var optionPicked = document.createElement('button');
        optionPicked.setAttribute('class', 'option');
        optionPicked.setAttribute('value', option);

        optionPicked.textContent = i + 1 + '.' + option;

        optionsEl.appendChild(optionPicked);
    }
}



// how the timer works
function clockTimer() {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}


//how the buttons activate
function starquesClick(event) {
    var buttonEl = event.target;

    if (buttonEl.value !== starques[starquesIndex].answer) {
        time -= 50;
        if (time < 0) {
            time = 0;
        }
        timeEl.textContent = time;
    }
    if (!buttonEl.matches('.option')) {
        return;
    }

    starquesIndex++;

    if (time <= 0 || starquesIndex === starques.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}

function endQuiz() {
    clearInterval(timeId);

    var allDoneEl = document.getElementById('all-done');
    allDoneEl.removeAttribute('class');
    optionsEl.setAttribute('class', 'hide');

    var resultEl = document.getElementById('results');

    var questionEl = document.getElementById('question-display');
    questionEl.setAttribute('class', 'hide');
    resultEl.textContent = time;
}



// how the scores get saved to the localstorage
function saveStarscore() {
    var initials = initialsEl.value.trim();

    if (initials !== '') {
        var scoreLoc = JSON.parse(window.localStorage.getItem('starscores')) || [];
        var newScore = {
            score: time,
            initials: initials,
        };

        scoreLoc.push(newScore);
        window.localStorage.setItem('starscores', JSON.stringify(scoreLoc));
        window.location.href = "starscores.html";
    }
}






finishBtn.onclick = saveStarscore;
beginBtn.onclick = beginQuiz;

optionsEl.onclick = starquesClick;


