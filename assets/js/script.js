// Variables
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Questions for the quiz
var quizQuestions = [{
    question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
    choiceA: "alert( )",
    choiceB: "sort( )",
    choiceC: "push( )",
    choiceD: "last( )",
    correctAnswer: "c"},
  {
    question: "When is localStorage cleared?",
    choiceA: "When you refresh your page",
    choiceB: "When you exit your browser",
    choiceC: "When you restart your computer",
    choiceD: "There is no expiration time.",
    correctAnswer: "d"},
   {
    question: "What is mainly used to add and manipulate styling to a web page?",
    choiceA: "Javascript",
    choiceB: "JSON",
    choiceC: "CSS",
    choiceD: "JQuery",
    correctAnswer: "c"},
    {
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;script&gt;",
    choiceB: "&lt;button&gt;",
    choiceC: "&lt;link&gt;",
    choiceD: "&lt;div&gt;",
    correctAnswer: "a"},
    {
    question: "Which function of String object combines the text of two strings and returns a new string?",
    choiceA: "concat ( )",
    choiceB: "sort ( )",
    choiceC: "append ( )",
    choiceD: "start ( )",
    correctAnswer: "a"},  
    {
    question: "What does HTTPS stand for?",
    choiceA: "Hotel Tango Tango Papa Sierra",
    choiceB: "Hyperbole Text Procedure Synchronization",
    choiceC: "Highfrequency Trading Transit Parsed System",
    choiceD: "Hypertext Transfer Protocol Secure",
    correctAnswer: "d"},
    {
    question: "What HTML attribute references an external file?",
    choiceA: "src",
    choiceB: "meta",
    choiceC: "id",
    choiceD: "link",
    correctAnswer: "a"},
        
    
    ];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// This function generates the qustions to be answered, and the answers to be chosen.
function createQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// This function starts the Timer, removes visibility from of the start button, and shows the first question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    createQuizQuestion();

    // Timer for the quiz
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Remaining Time: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
        // If timer reaches 0 due to penalty, the quiz is over.
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

// This will show you the end of the quiz and will also show you the score obtained.
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "Final score is " + score + " out of " + quizQuestions.length + " correct!";
}

// When submit button is clicked, the function highscore saves and stringifies the high scores 
// already saved in local storage. It also pushes the new initials and score into local storage. 
// Then it runs the function to show high scores.

submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("You cannot leave this area blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This will clear the list of high scores and will generate a new list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This will display the high scores page. 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This will clear the local storage of high scores as well as clear the text from the high score page.
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This sets the variables back to the original values and displays the home page to try again.
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This checks the chosen answer. 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That is the correct answer!");
        currentQuestionIndex++;
        createQuizQuestion();
        // This also has a time reduction penalty.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That is not the correct answer.")
        timeLeft -=15;
        currentQuestionIndex++;
        createQuizQuestion();
        
    }else{
        showScore();
    }
}

// Starts the quiz.
startQuizButton.addEventListener("click",startQuiz);
