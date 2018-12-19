$(document).ready(function() {

var correctAnswer = 0;
var wrongAnswer = 0;
var timeRemaining = 30;
var indexIncrement = 0;
var intervalId;
var clockRunning = false;
var questionsArray = [{question: "A canine's sense of smell is 100,000x stronger than a human's", answer: "True"}, { question: "Three dogs survived the sinking of the Titanic", answer: "True"},{question: "Dalmations are born with spots", answer: "False"}, {question: "Dogs’eyes contain a special membrane, which allows them to see in the dark.", answer: "True"}, {question: "Dogs have only two eyelids, just like us", answer: "False"}, {question: "Dogs are colorblind.", answer: "False"}, {question: "Dogs only sweat through the pads of their feet", answer: "True"}, {question: "Dogs that have not been spayed or neutered live longer", answer: "False"}, {question: "Every single U.S. President has owned a dog", answer: "False"}, {question: "The shape of a dog’s face suggests its longevity: A long face means a longer life.", answer: "True"}, {question: "Game Over"}];
var randGif;

function startGame(){
    clearTimeout(intervalId);
    clockRunning = false;
    $("#timer").hide();
    $("#trueButton").hide();
    $("#falseButton").hide();
    $("#question").text("There are 10 true or false questions that all have to do with man's best friend. You will have 30 seconds to answer each question. Good Luck!")
}

function displayQuestion(){
    $("#startButton").hide();
    $("#tryAgainButton").hide();
    $("#timer").show();
    $("#gifPic").html("");
    $("#trueButton").show();
    $("#falseButton").show();
    clockRunning = true;
    intervalId = setInterval(timerCountdown, 1000);
    console.log("number of wins " + correctAnswer);
    console.log("number of losses " + wrongAnswer);
    randGif = Math.floor(Math.random() * 20);
    $("#question").text(questionsArray[indexIncrement].question);
}

function nextQuestion(){
    $("trueButton").data('clicked', false);
    $("#startButton").hide();
    randGif = Math.floor(Math.random() * 20);
    timeRemaining = 30;
    intervalId = setInterval(timerCountdown, 1000);
    clockRunning = true;
    $("#trueButton").show();
    $("#falseButton").show();
    $("#gifPic").html("");
    $("#answer").text("");
    indexIncrement++;
    $("#question").text(questionsArray[indexIncrement].question);
    $("#falseButton").one("click", determineFalseAnswer);
    $("#trueButton").one("click", determineTrueAnswer);
    
    if(questionsArray[indexIncrement].question === "Game Over"){
        clockRunning = false;
        endGame();
    }
}
   
   
function timerCountdown() {
    if (clockRunning = false || timeRemaining === 0) {
      clearTimeout(intervalId);
      $("#answer").text("Time's Up!");
      $("#timer").text("0 Seconds Remaining");
      $("#trueButton").hide();
      $("#falseButton").hide();
      $("#startButton").hide()
      $.ajax({
          url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
          method: "GET"
      }).then(function(response) {
          $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
      });
      wrongAnswer++;
      clockRunning = false;
      setTimeout(nextQuestion, 5000);
    } else {
        var converted = timeConverter(timeRemaining);
        $("#timer").text(converted + " Seconds Remaining");
        timeRemaining--;
        clockRunning = true;
    }
  }

function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  }

function endGame(){
    clearTimeout(intervalId);
    clockRunning = false;
    $("#question").html("Correct Answers: " + correctAnswer + "\n" + "Incorrect Answers: " + wrongAnswer).wrap('<pre />');
    $("#timer").text("");
    $("#trueButton").hide();
    $("#falseButton").hide();
    $("#startButton").hide()
    $("#tryAgainButton").show();
    $("#tryAgainButton").text("Try Again");
    timeRemaining = 30;
    indexIncrement = 0;
    correctAnswer = 0;
    wrongAnswer = 0;
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
        method: "GET"
      }).then(function(response) { 
          $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
      });
  }


function determineFalseAnswer(){
    $("#trueButton").off('click');
    if(questionsArray[indexIncrement].answer === "False" ){
        $("#answer").text("Correct");
        correctAnswer++;
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
            method: "GET"
          }).then(function(response) { 
              $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
          });
        clearInterval(intervalId);
        setTimeout(nextQuestion, 5000);
    } else {
        $("#answer").text("Wrong! The correct answer is " + questionsArray[indexIncrement].answer);
        
        wrongAnswer++;
            $.ajax({
                url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
                method: "GET"
            }).then(function(response) { 
                $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
            });
            
            clearInterval(intervalId);
            setTimeout(nextQuestion, 5000);
    }
}

function determineTrueAnswer(){
    $("#falseButton").off('click');
    if(questionsArray[indexIncrement].answer === "True" ){
        $("#answer").text("Correct!");
        correctAnswer++;

        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
            method: "GET"
          }).then(function(response) {
              $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");  
          });
          
        clearInterval(intervalId);
        setTimeout(nextQuestion, 5000);
        } else {
            $("#answer").text("Wrong! The correct answer is " + questionsArray[indexIncrement].answer);
            wrongAnswer++;

            $.ajax({
                url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
                method: "GET"
            }).then(function(response) {  
                $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
            }); 
            
            clearInterval(intervalId);
            setTimeout(nextQuestion, 5000);
        }
}

//----Game Play----//

startGame();

$("#startButton").one("click", function(){
    displayQuestion();
});

$("#tryAgainButton").on("click", function(){
    displayQuestion();
});


$("#trueButton").one("click", function(){
    $("#falseButton").off("click");
    if(questionsArray[indexIncrement].answer === "True" ){
    $("#answer").text("Correct!");
    correctAnswer++;

    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
        method: "GET"
      }).then(function(response) {
          $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");  
      });
      
    clearInterval(intervalId);
    setTimeout(nextQuestion, 5000);
    
    } else {
        $("#answer").text("Wrong! The correct answer is " + questionsArray[indexIncrement].answer);
        wrongAnswer++;
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
            method: "GET"
        }).then(function(response) {  
            $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
        }); 
        
        clearInterval(intervalId);
        setTimeout(nextQuestion, 5000);
    }
});

$("#falseButton").one("click", function(){
    $("#trueButton").off("click");
    if(questionsArray[indexIncrement].answer === "False" ){
    $("#answer").text("Correct");
    correctAnswer++;

    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
        method: "GET"
      }).then(function(response) { 
          $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
      });
      
    clearInterval(intervalId);
    setTimeout(nextQuestion, 5000);

    } else {
        $("#answer").text("Wrong! The correct answer is " + questionsArray[indexIncrement].answer);
        
        wrongAnswer++;
          $.ajax({
              url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
              method: "GET"
            }).then(function(response) {
                $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
            });
            
          clearInterval(intervalId);
          setTimeout(nextQuestion, 5000);
    }
    
});

});