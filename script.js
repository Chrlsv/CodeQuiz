function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }
  
  Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
  }
  
  Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
  
    this.questionIndex++;
  }
  
  Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
  }
  
  
  function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  
  Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
  }
  
  
  function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
  
        // for loop for options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
  
        showProgress();
    }
  };
  
  function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
  };
  
  // progress of the quiz; question 1...2...3..etc
  function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  };
  
  // end of quiz; providing user their score
  function showScores() {
    var gameOverHTML = "<h1>All done!</h1>";
    gameOverHTML += "<h2 id='score'> Your final score is : " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
  };
  
  // to generate questions
  var questions = [
  
    new Question("What are variables used for in JavaScript Programs?", ["Varying randomly", "Storing numbers, dates or other values","Nothing", "None of the above"], "Storing numbers, dates or other values"),
    new Question("Which of the following are capabilities of functions in JavaScript?", ["Accept paramets and Return a value", "Return a value", "Accept parameters", "None of the above"], "Accept parameters"),
    new Question("______ tag is an extension to HTML that can enclose any number of JavaScript statements.", ["SCRIPT", "BODY","HEAD", "TITLE"], "SCRIPT"),
    new Question("Which is the correct way to write a JavaScript array?", ["var txt = new Array(1:'tim',2:'kim',3:'jim')", "var txt = new Array:1=('tim')2=('kim')3=('jim')", "var txt = new Array('tim','kim','jim')", "None of the above"], "var txt = new Array('tim','kim','jim')"),
    new Question("JavaScript entities start with _______ and end with _________", ["Semicolon, colon", "Semicolon, Ampersand", "Ampersand, colon", "Ampersand, semicolon"], "Ampersand, semicolon")
  ];
  
  // generate the quiz
  var quiz = new Quiz(questions);
  
  // display the quiz 
  populate();
  
  var sec = 65;
  var time = setInterval(myTimer, 1000);
  
  function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
      clearInterval(time);
      alert("Times up!");
    }
  }
