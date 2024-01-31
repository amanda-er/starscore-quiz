// how the highscores appear
function starScoreShow() {
    var scoreEl = JSON.parse(window.localStorage.getItem('starscores')) || [];

    scoreEl.sort(function (a, b) {
        return b.score - a.score;
    });
    

    for (let i = 0; i < scoreEl.length; i += 1) {
        var orderEl = document.createElement('li');
        orderEl.textContent = scoreEl[i].initials + ' --> ' + scoreEl[i].score;
        var displayEl = document.getElementById('starscores');
        displayEl.appendChild(orderEl);
    }
}


// how the to delete the scores
function eraseStarscore() {
    window.localStorage.removeItem('starscores');
    window.location.reload();
}

document.getElementById('erase').onclick = eraseStarscore;
starScoreShow();